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
        await this.loadTabs();
        this.renderTabs();

        // استعادة الصفحة الأخيرة من localStorage (تخزين محلي)
        let lastActiveTab = null;
        try {
            if (typeof getSecureStorage === 'function') {
                lastActiveTab = getSecureStorage('lastActiveTab');
            } else {
                lastActiveTab = localStorage.getItem('lastActiveTab');
            }
        } catch (e) {
            console.warn('Error reading lastActiveTab:', e);
        }

        // التحقق من أن الصفحة المحفوظة موجودة في التبويبات المتاحة
        const tabExists = lastActiveTab && this.tabs.some(tab => tab.id === lastActiveTab);

        // الفتح الافتراضي: المقارنة فقط؛ وإلا الصفحة المحفوظة أو أول تبويب
        const defaultTabId = 'booking-nazeel-compare';
        const hasCompare = this.tabs.some(tab => tab.id === defaultTabId);
        if (tabExists) {
            this.switchTab(lastActiveTab);
        } else if (this.tabs.length > 0) {
            this.switchTab(hasCompare ? defaultTabId : this.tabs[0].id);
        }
    }

    /**
     * Load tabs — تخزين محلي فقط (localStorage)
     */
    async loadTabs() {
        const allTabs = [
            { id: 'booking-nazeel-compare', label: 'مراجعة المقارنة (بوكينج ↔ نزيل)', icon: '🎯', order: 1 }
        ];

        let userDepartments = [];
        try {
            if (typeof getSecureStorage === 'function') {
                userDepartments = getSecureStorage('userDepartments') || [];
            } else {
                const stored = localStorage.getItem('userDepartments');
                if (stored) {
                    try {
                        userDepartments = JSON.parse(stored);
                    } catch (e) {
                        userDepartments = [];
                    }
                }
            }
        } catch (e) {
            userDepartments = [];
        }
        if (!Array.isArray(userDepartments)) userDepartments = [];

        this.tabs = userDepartments.length > 0
            ? allTabs.filter(tab => userDepartments.includes(tab.id))
            : allTabs;
        if (this.tabs.length === 0) this.tabs = allTabs;
    }

    /**
     * Save tabs — غير مستخدم (تبويب واحد ثابت، تخزين محلي)
     */
    async saveTabs() {
        // لا حاجة لحفظ — التبويبات محلية
    }

    /**
     * Render tabs in sidebar (no-op when لا شريط جانبي — tab-list غير موجود في الـ DOM)
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

        // حفظ الصفحة النشطة في localStorage (تخزين محلي)
        try {
            if (typeof setSecureStorage === 'function') {
                setSecureStorage('lastActiveTab', tabId);
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

        // Export page instance globally for easy access (مشروع المقارنة فقط)

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
        if (tabId === 'booking-nazeel-compare') return 'BookingNazeelComparePage';
        return `${tabId.charAt(0).toUpperCase() + tabId.slice(1)}Page`;
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

