/**
 * TabManager.js
 * 
 * نظام إدارة التبويبات المرن
 * كل صفحة مستقلة تماماً ويمكن نقلها بسهولة
 */

class TabManager {
    constructor() {
        this.tabs = [];
        this.activeTab = null;
        this.pages = {}; // Store page instances
    }

    /**
     * Initialize Tab Manager
     */
    async init() {
        // Load tabs from Firebase or use defaults
        await this.loadTabs();
        this.renderTabs();

        // استعادة الصفحة الأخيرة من localStorage
        let lastActiveTab = null;
        try {
            if (typeof getSecureStorage === 'function') {
                lastActiveTab = getSecureStorage('lastActiveTab');
            } else if (typeof getStorageItem === 'function') { // Fallback check
                lastActiveTab = getStorageItem('lastActiveTab');
            } else {
                lastActiveTab = localStorage.getItem('lastActiveTab');
            }
        } catch (e) {
            console.warn('Error reading lastActiveTab:', e);
        }

        // التحقق من أن الصفحة المحفوظة موجودة في التبويبات المتاحة
        const tabExists = lastActiveTab && this.tabs.some(tab => tab.id === lastActiveTab);

        // تفعيل الصفحة المحفوظة أو أول تبويب
        if (tabExists) {
            this.switchTab(lastActiveTab);
        } else if (this.tabs.length > 0) {
            this.switchTab(this.tabs[0].id);
        }
    }

    /**
     * Load tabs from Firebase
     */
    async loadTabs() {
        // Default tabs (4 tabs) - Updated to remove Cashbox and Seasons
        const allTabs = [
            { id: 'pricing', label: 'منظومة التسعير', icon: '💰', order: 1 },
            { id: 'matching', label: 'تنسيق بوكينج', icon: '🔍', order: 2 },
            { id: 'booking-nazeel-compare', label: 'المقارنة', icon: '🎯', order: 3 },
            // { id: 'monthly-yearly', label: 'يومي و شهري و سنوي مختلط', icon: '📊', order: 6 }
        ];

        // Get user's selected departments
        let userDepartments = [];
        try {
            if (typeof getSecureStorage === 'function') {
                userDepartments = getSecureStorage('userDepartments') || [];
            } else if (typeof getStorageItem === 'function') { // Fallback for legacy
                userDepartments = getStorageItem('userDepartments') || [];
            } else {
                const stored = localStorage.getItem('userDepartments');
                if (stored) {
                    try {
                        userDepartments = JSON.parse(stored);
                    } catch (e) {
                        console.warn('Error parsing userDepartments:', e);
                        userDepartments = [];
                    }
                }
            }
        } catch (e) {
            console.error('Error accessing storage:', e);
            userDepartments = [];
        }

        // Ensure userDepartments is an array
        if (!Array.isArray(userDepartments)) {
            userDepartments = [];
        }

        // Filter tabs based on user's selected departments
        const defaultTabs = userDepartments.length > 0
            ? allTabs.filter(tab => userDepartments.includes(tab.id))
            : allTabs; // If no selection, show all (fallback)

        // DIRECT LOCAL MODE: Bypass Firebase completely
        console.log('Switching to Local-First Mode: Ignoring Firebase config');
        this.tabs = defaultTabs;

        // Ensure we have at least one tab
        if (this.tabs.length === 0) {
            this.tabs = allTabs; // Fallback to all tabs
        }

        // No need to save to Firebase in Local Mode
    }

    /**
     * Save tabs to Firebase
     */
    async saveTabs() {
        try {
            const db = firebase.firestore();
            const batch = db.batch();
            this.tabs.forEach(tab => {
                const ref = db.collection('management_tabs').doc(tab.id);
                batch.set(ref, tab);
            });
            await batch.commit();
        } catch (error) {
            // Error saving tabs - silent fail
        }
    }

    /**
     * Render tabs in sidebar
     */
    renderTabs() {
        const tabList = document.getElementById('tab-list');
        if (!tabList) return;

        // Clear using textContent for safety
        while (tabList.firstChild) {
            tabList.removeChild(tabList.firstChild);
        }

        this.tabs.forEach(tab => {
            const tabItem = document.createElement('div');
            tabItem.className = 'tab-item';
            tabItem.dataset.tabId = tab.id;

            // Use DOM manipulation instead of innerHTML
            const iconSpan = document.createElement('span');
            iconSpan.className = 'tab-icon';
            iconSpan.textContent = tab.icon;

            const labelSpan = document.createElement('span');
            labelSpan.textContent = tab.label;

            tabItem.appendChild(iconSpan);
            tabItem.appendChild(labelSpan);
            tabItem.addEventListener('click', () => this.switchTab(tab.id));
            tabList.appendChild(tabItem);
        });
    }

    /**
     * Switch to a tab
     */
    async switchTab(tabId) {
        // Prevent switching to the same tab
        if (this.activeTab === tabId) return;

        this.activeTab = tabId;

        // حفظ الصفحة النشطة في localStorage
        try {
            if (typeof setSecureStorage === 'function') {
                setSecureStorage('lastActiveTab', tabId);
            } else if (typeof setStorageItem === 'function') {
                setStorageItem('lastActiveTab', tabId);
            } else {
                localStorage.setItem('lastActiveTab', tabId);
            }
        } catch (e) {
            console.warn('Error saving lastActiveTab:', e);
        }

        // Update sidebar with smooth transition
        document.querySelectorAll('.tab-item').forEach(item => {
            item.classList.remove('active');
            if (item.dataset.tabId === tabId) {
                item.classList.add('active');
            }
        });

        // Show global loader
        const globalLoader = document.getElementById('global-loader');
        if (globalLoader) {
            globalLoader.classList.remove('hidden');
        }

        // Show loading state
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.style.opacity = '0.5';
        }

        // Load page content
        try {
            await this.loadPage(tabId);

            // Hide global loader after page loads
            if (globalLoader) {
                setTimeout(() => {
                    globalLoader.classList.add('hidden');
                    if (mainContent) {
                        mainContent.style.opacity = '1';
                    }
                }, 500);
            }
        } catch (error) {
            // Hide loader on error
            if (globalLoader) {
                globalLoader.classList.add('hidden');
            }
            if (mainContent) {
                // Use DOM manipulation for error message
                mainContent.innerHTML = '';
                const errorCard = document.createElement('div');
                errorCard.className = 'card';
                const errorTitle = document.createElement('h2');
                errorTitle.className = 'card-title';
                errorTitle.textContent = '⚠️ خطأ في تحميل الصفحة';
                const errorMsg = document.createElement('p');
                errorMsg.textContent = typeof sanitizeText === 'function' ? sanitizeText(error.message) : error.message;
                errorCard.appendChild(errorTitle);
                errorCard.appendChild(errorMsg);
                mainContent.appendChild(errorCard);
            }
        } finally {
            // Restore opacity
            if (mainContent) {
                window.requestAnimationFrame(() => {
                    mainContent.style.opacity = '1';
                });
            }
        }
    }

    /**
     * Load page content
     */
    async loadPage(tabId) {
        const mainContent = document.getElementById('main-content');
        if (!mainContent) return;

        // Check if page class exists
        const pageClassName = this.getPageClassName(tabId);
        const PageClass = window[pageClassName];

        if (!PageClass) {
            // Use DOM manipulation for error message
            mainContent.innerHTML = '';
            const errorCard = document.createElement('div');
            errorCard.className = 'card';
            const errorTitle = document.createElement('h2');
            errorTitle.className = 'card-title';
            errorTitle.textContent = '⚠️ الصفحة غير موجودة';
            const errorMsg = document.createElement('p');
            const safeTabId = typeof sanitizeText === 'function' ? sanitizeText(tabId) : tabId;
            errorMsg.textContent = `الصفحة "${safeTabId}" غير متوفرة`;
            errorCard.appendChild(errorTitle);
            errorCard.appendChild(errorMsg);
            mainContent.appendChild(errorCard);
            return;
        }

        // Create or get page instance
        if (!this.pages[tabId]) {
            this.pages[tabId] = new PageClass();
        }

        // Export page instance globally for easy access
        if (tabId === 'matching') {
            window.matchingPage = this.pages[tabId];
        } else if (tabId === 'pricing') {
            window.pricingPage = this.pages[tabId];
        }

        // Render page with error handling
        try {
            const content = await this.pages[tabId].render();
            mainContent.innerHTML = content;

            // Initialize page after render with error handling
            if (this.pages[tabId].init) {
                // Use requestAnimationFrame for smooth initialization
                window.requestAnimationFrame(() => {
                    try {
                        this.pages[tabId].init();
                    } catch (error) {
                        // Silent error handling - page might still work
                    }
                });
            }
        } catch (error) {
            // Use DOM manipulation for error message
            mainContent.innerHTML = '';
            const errorCard = document.createElement('div');
            errorCard.className = 'card';
            const errorTitle = document.createElement('h2');
            errorTitle.className = 'card-title';
            errorTitle.textContent = '⚠️ خطأ في تحميل الصفحة';
            const errorMsg = document.createElement('p');
            errorMsg.textContent = typeof sanitizeText === 'function' ? sanitizeText(error.message) : error.message;
            errorCard.appendChild(errorTitle);
            errorCard.appendChild(errorMsg);
            mainContent.appendChild(errorCard);
        }
    }

    /**
     * Get page class name from tab ID
     */
    getPageClassName(tabId) {
        const mapping = {
            'monthly-yearly': 'MonthlyYearlyPage',
            'matching': 'MatchingPage',
            'pricing': 'PricingPage',
            'seasons': 'SeasonsPage',
            'cashbox': 'CashBoxPage',
            'booking-nazeel-compare': 'BookingNazeelComparePage'
        };
        return mapping[tabId] || `${tabId.charAt(0).toUpperCase() + tabId.slice(1)}Page`;
    }

    /**
     * Add new tab
     */
    async addTab(tabConfig) {
        const newTab = {
            id: tabConfig.id || `tab-${Date.now()}`,
            label: tabConfig.label,
            icon: tabConfig.icon || '📋',
            order: tabConfig.order || this.tabs.length + 1
        };

        this.tabs.push(newTab);
        this.tabs.sort((a, b) => (a.order || 0) - (b.order || 0));

        await this.saveTabs();
        this.renderTabs();

        return newTab;
    }

    /**
     * Remove tab
     */
    async removeTab(tabId) {
        this.tabs = this.tabs.filter(tab => tab.id !== tabId);
        delete this.pages[tabId];

        await this.saveTabs();
        this.renderTabs();

        // Switch to first tab if current tab was removed
        if (this.activeTab === tabId && this.tabs.length > 0) {
            this.switchTab(this.tabs[0].id);
        }
    }
}

// Export globally
window.TabManager = TabManager;

