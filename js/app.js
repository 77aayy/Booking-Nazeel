/**
 * app.js
 * 
 * Initialize application
 */

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyD1rY9BUciB0ir1b8begsPozpJzgwnR-Z0",
    authDomain: "adora-staff5255.firebaseapp.com",
    projectId: "adora-staff5255",
    storageBucket: "adora-staff5255.firebasestorage.app",
    messagingSenderId: "96309381730",
    appId: "1:96309381730:web:d24e0d275255347e43df3b"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Enable offline persistence
try {
    firebase.firestore().enablePersistence().catch(err => {
        if (err.code == 'failed-precondition') {
            // Multiple tabs open, persistence can only be enabled in one tab at a a time.
            console.warn('Persistence failed: Multiple tabs open');
        } else if (err.code == 'unimplemented') {
            // The current browser does not support all of the features required to enable persistence
            console.warn('Persistence not supported');
        }
    });
} catch (e) { console.warn('Persistence error:', e); }

// Try Silent/Anonymous Auth to satisfy security rules
try {
    firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
            firebase.auth().signInAnonymously().catch((error) => {
                console.warn("Anonymous auth failed:", error);
            });
        }
    });
} catch (e) { console.warn('Auth init error:', e); }

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
                <p style="color: #666; font-size: 0.8em;">${err.message}</p>
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
            <p>${e.message}</p>
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



