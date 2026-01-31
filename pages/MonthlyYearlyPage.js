/**
 * MonthlyYearlyPage.js
 * صفحة منظومه شهري و سنوي مختلط
 * تضمين المشروع من C:\Users\77aay\Desktop\fahd
 */

class MonthlyYearlyPage {
    async render() {
        return `
            <div class="page-header">
                <h1 class="page-title">🗓️ نظام الإيجار المتكامل</h1>
                <p class="page-description">منظومة الإيجار اليومي والشهري والسنوي المختلط</p>
            </div>
            <div class="iframe-container">
                <iframe 
                    src="monthly-yearly/index.html" 
                    class="embedded-iframe"
                    frameborder="0"
                    allowfullscreen>
                </iframe>
            </div>
        `;
    }

    init() {
        // No specific JS initialization needed for embedded iframe, it runs its own scripts.
    }
}

window.MonthlyYearlyPage = MonthlyYearlyPage;

