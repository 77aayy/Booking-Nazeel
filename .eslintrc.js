/**
 * ESLint Configuration
 * قواعد فحص الكود
 */
module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: false
    },
    extends: ['eslint:recommended'],
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module'
    },
    rules: {
        // Errors
        'no-console': 'warn',
        'no-debugger': 'error',
        'no-unused-vars': ['warn', { 
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_'
        }],
        'no-var': 'error',
        'prefer-const': 'error',
        'prefer-arrow-callback': 'warn',
        
        // Best Practices
        'eqeqeq': ['error', 'always'],
        'no-eval': 'error',
        'no-implied-eval': 'error',
        'no-new-func': 'error',
        'no-script-url': 'error',
        
        // Style
        'indent': ['warn', 4, { SwitchCase: 1 }],
        'quotes': ['warn', 'single', { avoidEscape: true }],
        'semi': ['error', 'always'],
        'comma-dangle': ['warn', 'never'],
        'no-trailing-spaces': 'warn',
        'eol-last': ['warn', 'always'],
        
        // Variables
        'no-undef': 'error',
        'no-use-before-define': ['warn', { functions: false }]
    },
    globals: {
        'XLSX': 'readonly',
        'TabManager': 'readonly',
        'BookingNazeelComparePage': 'readonly'
    }
};

