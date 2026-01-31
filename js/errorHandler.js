/**
 * Error Handler Utilities
 * معالجة الأخطاء والمراقبة
 */

/**
 * Error types
 */
const ErrorTypes = {
    NETWORK: 'NETWORK_ERROR',
    VALIDATION: 'VALIDATION_ERROR',
    PERMISSION: 'PERMISSION_ERROR',
    UNKNOWN: 'UNKNOWN_ERROR'
};

/**
 * Error handler class
 */
class ErrorHandler {
    constructor() {
        this.errors = [];
        this.maxErrors = 100;
    }

    /**
     * Log error
     * @param {Error|string} error - Error object or message
     * @param {string} context - Context where error occurred
     * @param {string} type - Error type
     */
    log(error, context = 'Unknown', type = ErrorTypes.UNKNOWN) {
        const errorInfo = {
            message: error instanceof Error ? error.message : String(error),
            stack: error instanceof Error ? error.stack : null,
            context,
            type,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href
        };

        this.errors.push(errorInfo);
        
        // Keep only last N errors
        if (this.errors.length > this.maxErrors) {
            this.errors.shift();
        }

        // Display user-friendly message
        this.showUserMessage(errorInfo);
    }

    /**
     * Show user-friendly error message
     * @param {Object} errorInfo - Error information
     */
    showUserMessage(errorInfo) {
        if (!errorInfo) {
            return; // Skip if errorInfo is null/undefined
        }

        const messages = {
            [ErrorTypes.NETWORK]: 'تعذر الاتصال بالخادم. تحقق من اتصالك بالإنترنت.',
            [ErrorTypes.VALIDATION]: 'البيانات المدخلة غير صحيحة. يرجى التحقق والمحاولة مرة أخرى.',
            [ErrorTypes.PERMISSION]: 'ليس لديك صلاحية للقيام بهذا الإجراء.',
            [ErrorTypes.UNKNOWN]: 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.'
        };

        const message = messages[errorInfo.type] || messages[ErrorTypes.UNKNOWN];
        const errorMessage = errorInfo.message || 'خطأ غير معروف';
        
        // Use toast if available, otherwise alert
        if (typeof showToast === 'function') {
            showToast(message, 'error');
        } else if (typeof window.showToast === 'function') {
            window.showToast(message, 'error');
        } else {
            // Fallback to console - only log if message exists
            if (errorMessage && errorMessage !== 'null') {
                console.error(`[${errorInfo.context || 'Unknown'}] ${errorMessage}`);
            }
        }
    }

    /**
     * Get all errors
     * @returns {Array} Array of errors
     */
    getErrors() {
        return [...this.errors];
    }

    /**
     * Clear all errors
     */
    clearErrors() {
        this.errors = [];
    }

    /**
     * Get error count
     * @returns {number} Number of errors
     */
    getErrorCount() {
        return this.errors.length;
    }
}

// Global error handler instance
const errorHandler = new ErrorHandler();

// Global error handler
window.addEventListener('error', (event) => {
    const error = event.error || event.message || 'Unknown error';
    errorHandler.log(error, 'Global', ErrorTypes.UNKNOWN);
});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason || 'Unhandled promise rejection';
    errorHandler.log(reason, 'Unhandled Promise Rejection', ErrorTypes.UNKNOWN);
});

// Export
if (typeof window !== 'undefined') {
    window.ErrorHandler = ErrorHandler;
    window.errorHandler = errorHandler;
    window.ErrorTypes = ErrorTypes;
}

