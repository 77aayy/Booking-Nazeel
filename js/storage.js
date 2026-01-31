/**
 * Secure Storage Utilities
 * دوال التخزين الآمن مع تشفير اختياري
 */

/**
 * Encrypt data (simple base64 encoding - for basic obfuscation)
 * Note: For production, use proper encryption library
 * @param {string} data - Data to encrypt
 * @returns {string} - Encrypted data
 */
function encryptData(data) {
    if (!data) return '';
    try {
        return btoa(encodeURIComponent(JSON.stringify(data)));
    } catch (e) {
        return '';
    }
}

/**
 * Decrypt data
 * @param {string} encryptedData - Encrypted data
 * @returns {any} - Decrypted data
 */
function decryptData(encryptedData) {
    if (!encryptedData) return null;
    try {
        return JSON.parse(decodeURIComponent(atob(encryptedData)));
    } catch (e) {
        return null;
    }
}

/**
 * Set secure storage with optional encryption
 * @param {string} key - Storage key
 * @param {any} value - Value to store
 * @param {boolean} encrypt - Whether to encrypt (default: false for performance)
 */
function setSecureStorage(key, value, encrypt = false) {
    if (!key) return;
    
    try {
        const dataToStore = encrypt ? encryptData(value) : JSON.stringify(value);
        localStorage.setItem(key, dataToStore);
    } catch (e) {
        // Storage quota exceeded or other error
        console.warn('Storage error:', e);
    }
}

/**
 * Get secure storage with optional decryption
 * @param {string} key - Storage key
 * @param {boolean} encrypted - Whether data is encrypted (default: false)
 * @returns {any} - Stored value or null
 */
function getSecureStorage(key, encrypted = false) {
    if (!key) return null;
    
    try {
        const stored = localStorage.getItem(key);
        if (!stored) return null;
        
        if (encrypted) {
            return decryptData(stored);
        } else {
            return JSON.parse(stored);
        }
    } catch (e) {
        // Invalid data or decryption error
        return null;
    }
}

/**
 * Remove secure storage
 * @param {string} key - Storage key
 */
function removeSecureStorage(key) {
    if (!key) return;
    localStorage.removeItem(key);
}

/**
 * Clear all secure storage
 */
function clearSecureStorage() {
    localStorage.clear();
}

// Export for global use
if (typeof window !== 'undefined') {
    window.encryptData = encryptData;
    window.decryptData = decryptData;
    window.setSecureStorage = setSecureStorage;
    window.getSecureStorage = getSecureStorage;
    window.removeSecureStorage = removeSecureStorage;
    window.clearSecureStorage = clearSecureStorage;
}

