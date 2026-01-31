/**
 * Security Utilities
 * دوال الأمان والحماية من XSS
 */

/**
 * تنظيف النص من HTML tags و characters خطيرة
 * @param {string} text - النص المراد تنظيفه
 * @returns {string} - النص النظيف
 */
function sanitizeText(text) {
    if (!text || typeof text !== 'string') return '';
    
    // إزالة HTML tags
    const div = document.createElement('div');
    div.textContent = text;
    return div.textContent || div.innerText || '';
}

/**
 * تنظيف HTML بشكل آمن (للحالات التي تحتاج HTML)
 * @param {string} html - HTML المراد تنظيفه
 * @returns {string} - HTML النظيف
 */
function sanitizeHTML(html) {
    if (!html || typeof html !== 'string') return '';
    
    // إزالة script tags و event handlers
    return html
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
        .replace(/on\w+\s*=\s*[^\s>]*/gi, '')
        .replace(/javascript:/gi, '')
        .replace(/<iframe/gi, '&lt;iframe');
}

/**
 * تنظيف البيانات قبل إدراجها في innerHTML
 * @param {string} data - البيانات المراد تنظيفها
 * @param {boolean} allowHTML - السماح بـ HTML (افتراضي: false)
 * @returns {string} - البيانات النظيفة
 */
function sanitizeForHTML(data, allowHTML = false) {
    if (data === null || data === undefined) return '';
    if (typeof data !== 'string') data = String(data);
    
    if (allowHTML) {
        return sanitizeHTML(data);
    } else {
        return sanitizeText(data);
    }
}

/**
 * إنشاء element آمن من HTML string
 * @param {string} html - HTML string
 * @returns {HTMLElement} - Element آمن
 */
function createElementFromHTML(html) {
    const template = document.createElement('template');
    const sanitized = sanitizeHTML(html);
    template.innerHTML = sanitized.trim();
    return template.content.firstChild;
}

/**
 * تنظيف اسم المستخدم أو أي نص من المستخدم
 * @param {string} userInput - إدخال المستخدم
 * @returns {string} - نص نظيف وآمن
 */
function sanitizeUserInput(userInput) {
    if (!userInput) return '';
    if (typeof userInput !== 'string') userInput = String(userInput);
    
    // إزالة HTML tags و characters خطيرة
    return sanitizeText(userInput)
        .replace(/[<>]/g, '') // إزالة < و >
        .trim()
        .substring(0, 100); // حد أقصى 100 حرف
}

/**
 * تنظيف رقم أو قيمة رقمية
 * @param {any} value - القيمة المراد تنظيفها
 * @returns {number} - رقم نظيف
 */
function sanitizeNumber(value) {
    if (value === null || value === undefined) return 0;
    const num = parseFloat(String(value).replace(/[^0-9.-]/g, ''));
    return isNaN(num) ? 0 : num;
}

// Export للاستخدام في الملفات الأخرى
if (typeof window !== 'undefined') {
    window.sanitizeText = sanitizeText;
    window.sanitizeHTML = sanitizeHTML;
    window.sanitizeForHTML = sanitizeForHTML;
    window.createElementFromHTML = createElementFromHTML;
    window.sanitizeUserInput = sanitizeUserInput;
    window.sanitizeNumber = sanitizeNumber;
}

