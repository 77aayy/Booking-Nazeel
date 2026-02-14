/**
 * app.js
 *
 * Initialize application — Local storage only (no Firebase)
 */

// Initialize Tab Manager
let tabManager;

document.addEventListener('DOMContentLoaded', () => {
    // Direct access - No auth check needed

    try {
        tabManager = new TabManager();
        tabManager.init().catch(err => {
            console.error('TabManager init failed:', err);
            document.body.innerHTML = `<div style="padding: 20px; color: red; text-align: center;">
                <h1>⚠️ خطأ في النظام</h1>
                <p>حدث خطأ أثناء تحميل النظام. يرجى تحديث الصفحة.</p>
                <p style="color: #666; font-size: 0.8em;">${typeof sanitizeText === 'function' ? sanitizeText(err.message) : (err.message || '').replace(/[<>"&]/g, '')}</p>
                <button onclick="localStorage.clear(); window.location.reload();" style="padding: 10px 20px; background: #022A3A; color: white; border: none; border-radius: 5px; cursor: pointer; margin-top: 20px;">مسح الذاكرة المؤقتة وإعادة المحاولة</button>
            </div>`;
        });

        // Export globally
        window.tabManager = tabManager;

        // Initialize Mobile Menu Toggle
        initMobileMenu();
    } catch (e) {
        console.error('App init failed:', e);
        // Fallback UI
        document.body.innerHTML = `<div style="padding: 20px; color: red; text-align: center;">
            <h1>⚠️ خطأ غير متوقع</h1>
            <p>${typeof sanitizeText === 'function' ? sanitizeText(e.message) : (e.message || '').replace(/[<>"&]/g, '')}</p>
            <button onclick="localStorage.clear(); window.location.reload();" style="padding: 10px 20px; background: #022A3A; color: white; border: none; border-radius: 5px; cursor: pointer; margin-top: 20px;">إصلاح المشكلة</button>
        </div>`;
    }

    // Application initialized
});

/**
 * Initialize Mobile Menu Toggle
 */
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');

    if (!mobileMenuToggle || !sidebar || !sidebarOverlay) return;

    // Toggle sidebar
    function toggleSidebar() {
        sidebar.classList.toggle('active');
        sidebarOverlay.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
        document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
    }

    // Open/Close sidebar
    mobileMenuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleSidebar();
    });

    // Close sidebar when clicking overlay
    sidebarOverlay.addEventListener('click', () => {
        toggleSidebar();
    });

    // Close sidebar when clicking a tab (on mobile)
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 1023) {
            if (e.target.closest('.tab-item') && sidebar.classList.contains('active')) {
                toggleSidebar();
            }
        }
    });

    // Close sidebar on window resize (if resized to desktop)
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1023) {
            sidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}



