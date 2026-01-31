/**
 * Utility Functions
 * دوال مساعدة للأداء والمساعدة العامة
 */

/**
 * Debounce function - تأخير تنفيذ الدالة حتى ينتهي المستخدم من الإدخال
 * @param {Function} func - الدالة المراد تأخيرها
 * @param {number} wait - وقت الانتظار بالميلي ثانية
 * @param {boolean} immediate - تنفيذ فوري في البداية
 * @returns {Function} - الدالة المبطنة
 * @example
 * const debouncedSearch = debounce(filterTable, 300);
 * searchInput.addEventListener('input', debouncedSearch);
 */
function debounce(func, wait = 300, immediate = false) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func.apply(this, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(this, args);
    };
}

/**
 * Throttle function - تحديد عدد مرات تنفيذ الدالة
 * @param {Function} func - الدالة المراد تحديدها
 * @param {number} limit - الحد الأقصى بالميلي ثانية
 * @returns {Function} - الدالة المحددة
 * @example
 * const throttledScroll = throttle(handleScroll, 100);
 * window.addEventListener('scroll', throttledScroll);
 */
function throttle(func, limit = 100) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Memoization - تخزين نتائج الدوال المكلفة
 * @param {Function} fn - الدالة المراد حفظ نتائجها
 * @param {Function} keyGenerator - دالة توليد المفتاح (اختياري)
 * @returns {Function} - الدالة المحفوظة
 * @example
 * const memoizedLevenshtein = memoize(levenshtein);
 * memoizedLevenshtein('hello', 'hallo'); // calculates
 * memoizedLevenshtein('hello', 'hallo'); // returns cached
 */
function memoize(fn, keyGenerator = null) {
    const cache = new Map();
    return function(...args) {
        const key = keyGenerator 
            ? keyGenerator(...args) 
            : JSON.stringify(args);
        
        if (cache.has(key)) {
            return cache.get(key);
        }
        
        const result = fn.apply(this, args);
        cache.set(key, result);
        
        // Limit cache size to prevent memory leaks
        if (cache.size > 1000) {
            const firstKey = cache.keys().next().value;
            cache.delete(firstKey);
        }
        
        return result;
    };
}

/**
 * Safe Request Animation Frame wrapper for smooth animations
 * Uses native requestAnimationFrame if available, with fallback
 * @param {Function} callback - الدالة المراد تنفيذها
 * @returns {number} - Animation frame ID
 */
function safeRequestAnimationFrame(callback) {
    if (typeof window !== 'undefined' && window.requestAnimationFrame) {
        return window.requestAnimationFrame(callback);
    }
    return setTimeout(callback, 16); // Fallback to 60fps
}

/**
 * Safe Cancel Animation Frame wrapper
 * @param {number} id - Animation frame ID
 */
function safeCancelAnimationFrame(id) {
    if (typeof window !== 'undefined' && window.cancelAnimationFrame) {
        return window.cancelAnimationFrame(id);
    }
    clearTimeout(id);
}

/**
 * Deep clone object
 * @param {any} obj - الكائن المراد نسخه
 * @returns {any} - نسخة عميقة من الكائن
 */
function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj.getTime());
    if (obj instanceof Array) return obj.map(item => deepClone(item));
    if (typeof obj === 'object') {
        const clonedObj = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                clonedObj[key] = deepClone(obj[key]);
            }
        }
        return clonedObj;
    }
}

/**
 * Format number with thousand separators
 * @param {number} num - الرقم المراد تنسيقه
 * @param {string} locale - اللغة (افتراضي: ar-EG)
 * @returns {string} - الرقم المنسق
 */
function formatNumber(num, locale = 'ar-EG') {
    if (isNaN(num)) return '0';
    return new Intl.NumberFormat(locale).format(num);
}

/**
 * Parse number from formatted string
 * @param {string} str - النص المنسق
 * @returns {number} - الرقم
 */
function parseFormattedNumber(str) {
    if (!str) return 0;
    return parseFloat(String(str).replace(/[^\d.-]/g, '')) || 0;
}

/**
 * Check if element is in viewport
 * @param {HTMLElement} element - العنصر المراد التحقق منه
 * @param {number} threshold - النسبة المئوية (0-1)
 * @returns {boolean} - true إذا كان العنصر مرئي
 */
function isInViewport(element, threshold = 0) {
    if (!element) return false;
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;
    
    return (
        rect.top >= -threshold * rect.height &&
        rect.left >= -threshold * rect.width &&
        rect.bottom <= windowHeight + threshold * rect.height &&
        rect.right <= windowWidth + threshold * rect.width
    );
}

/**
 * Lazy load image
 * @param {HTMLImageElement} img - عنصر الصورة
 * @param {string} src - رابط الصورة
 */
function lazyLoadImage(img, src) {
    if (!img || !src) return;
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                img.src = src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    imageObserver.observe(img);
}

/**
 * Get query parameter from URL
 * @param {string} name - اسم المعامل
 * @returns {string|null} - قيمة المعامل
 */
function getQueryParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
}

/**
 * Set query parameter in URL
 * @param {string} name - اسم المعامل
 * @param {string} value - قيمة المعامل
 */
function setQueryParam(name, value) {
    const url = new URL(window.location);
    url.searchParams.set(name, value);
    window.history.pushState({}, '', url);
}

/**
 * Copy text to clipboard
 * @param {string} text - النص المراد نسخه
 * @returns {Promise<boolean>} - true إذا نجح النسخ
 */
async function copyToClipboard(text) {
    try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(text);
            return true;
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.opacity = '0';
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            return true;
        }
    } catch (err) {
        return false;
    }
}

/**
 * Download file
 * @param {string} content - محتوى الملف
 * @param {string} filename - اسم الملف
 * @param {string} mimeType - نوع الملف (افتراضي: text/plain)
 */
function downloadFile(content, filename, mimeType = 'text/plain') {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

/**
 * Measure performance
 * @param {string} label - تسمية القياس
 * @param {Function} fn - الدالة المراد قياسها
 * @returns {any} - نتيجة الدالة
 */
async function measurePerformance(label, fn) {
    const start = performance.now();
    const result = await fn();
    const end = performance.now();
    const duration = end - start;
    
    if (typeof console !== 'undefined' && console.log) {
        console.log(`⏱️ ${label}: ${duration.toFixed(2)}ms`);
    }
    
    return result;
}

// Export for global use
if (typeof window !== 'undefined') {
    window.debounce = debounce;
    window.throttle = throttle;
    window.memoize = memoize;
    window.deepClone = deepClone;
    window.formatNumber = formatNumber;
    window.parseFormattedNumber = parseFormattedNumber;
    window.isInViewport = isInViewport;
    window.lazyLoadImage = lazyLoadImage;
    window.getQueryParam = getQueryParam;
    window.setQueryParam = setQueryParam;
    window.copyToClipboard = copyToClipboard;
    window.downloadFile = downloadFile;
    window.measurePerformance = measurePerformance;
    window.safeRequestAnimationFrame = safeRequestAnimationFrame;
    window.safeCancelAnimationFrame = safeCancelAnimationFrame;
}

