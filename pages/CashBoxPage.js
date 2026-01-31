/**
 * CashBoxPage.js
 * صفحة الصندوق - نسخة كاملة مع جميع المعادلات والتنسيق
 * تم استخراجها من الكود المرفق مع تعديل الألوان لتتناسب مع الثيم العام
 */

class CashBoxPage {
    async render() {
        return `
            <style>
                /* =========================================================
                   CASHBOX STYLES - Adapted to Main Theme
                   ========================================================= */
                #cashbox-container {
                    background: radial-gradient(1200px 600px at 10% 10%, rgba(44, 177, 225, 0.08), transparent 60%),
                                radial-gradient(1200px 600px at 90% 0%, rgba(44, 177, 225, 0.07), transparent 60%),
                                linear-gradient(135deg, #022A3A 0%, #001219 60%, #022A3A 100%);
                    color: #FFFFFF;
                    min-height: 90vh;
                    padding: 20px;
                    border-radius: 12px;
                    border: 1px solid rgba(100, 200, 255, 0.15);
                }
                
                @media screen and (max-width: 768px) {
                    #cashbox-container {
                        padding: 10px;
                        border-radius: 8px;
                    }
                }
                
                .box-header {
                    background: linear-gradient(180deg, rgba(2, 42, 58, 0.95), rgba(1, 18, 25, 0.7));
                    backdrop-filter: blur(10px);
                    border-bottom: 1px solid rgba(100, 200, 255, 0.15);
                    padding: 14px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    border-radius: 12px;
                    margin-bottom: 20px;
                }
                
                .box-metrics {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 12px;
                    margin-bottom: 20px;
                }
                
                .metric-card {
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(100, 200, 255, 0.15);
                    border-radius: 16px;
                    padding: 15px;
                    text-align: center;
                }
                
                .metric-val {
                    font-size: 24px;
                    font-weight: 900;
                    color: #2CB1E1;
                }
                
                @media screen and (max-width: 768px) {
                    .box-metrics {
                        grid-template-columns: repeat(2, 1fr);
                        gap: 8px;
                    }
                    
                    .metric-card {
                        padding: 10px;
                    }
                    
                    .metric-val {
                        font-size: 18px;
                    }
                    
                    .box-header {
                        flex-direction: column;
                        gap: 10px;
                        align-items: stretch;
                    }
                    
                    .box-header > div:last-child {
                        display: flex;
                        flex-direction: column;
                        gap: 8px;
                    }
                    
                    .btn-box {
                        width: 100%;
                        font-size: 0.85rem;
                        padding: 10px;
                    }
                }
                
                .box-table-wrap {
                    overflow-x: auto;
                    -webkit-overflow-scrolling: touch;
                    background: rgba(255, 255, 255, 0.02);
                    border-radius: 18px;
                    padding: 10px;
                    border: 1px solid rgba(100, 200, 255, 0.15);
                    margin-bottom: 20px;
                    position: relative;
                    scrollbar-width: thin;
                    scrollbar-color: rgba(100, 200, 255, 0.3) rgba(255, 255, 255, 0.05);
                }
                
                .box-table-wrap::-webkit-scrollbar {
                    height: 8px;
                }
                
                .box-table-wrap::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 4px;
                }
                
                .box-table-wrap::-webkit-scrollbar-thumb {
                    background: rgba(100, 200, 255, 0.3);
                    border-radius: 4px;
                }
                
                .box-table-wrap::-webkit-scrollbar-thumb:hover {
                    background: rgba(100, 200, 255, 0.5);
                }
                
                /* Scroll indicator for mobile */
                .box-table-wrap::after {
                    content: '← اسحب للتمرير →';
                    position: absolute;
                    bottom: -25px;
                    left: 50%;
                    transform: translateX(-50%);
                    font-size: 0.75rem;
                    color: rgba(255, 255, 255, 0.5);
                    pointer-events: none;
                    display: none;
                }
                
                @media screen and (max-width: 768px) {
                    .box-table-wrap::after {
                        display: block;
                    }
                }
                
                table.box-table {
                    width: 100%;
                    min-width: 750px;
                    border-collapse: collapse;
                    color: #fff;
                }
                
                table.box-table th,
                table.box-table td {
                    border: 1px solid rgba(100, 200, 255, 0.15);
                    padding: 6px 4px;
                    text-align: center;
                    font-size: 0.8rem;
                }
                
                table.box-table th {
                    background: rgba(255, 255, 255, 0.05);
                    color: #2CB1E1;
                    white-space: nowrap;
                    font-weight: 700;
                    position: sticky;
                    top: 0;
                    z-index: 10;
                    font-size: 0.75rem;
                    padding: 8px 4px;
                }
                
                /* Sticky first column (م/تحديد) */
                table.box-table th:first-child,
                table.box-table td:first-child {
                    position: sticky;
                    left: 0;
                    background: rgba(1, 18, 25, 0.98);
                    z-index: 5;
                    border-right: 2px solid rgba(100, 200, 255, 0.3);
                }
                
                table.box-table th:first-child {
                    z-index: 15;
                    background: rgba(255, 255, 255, 0.08);
                }
                
                /* Sticky last column (أوامر) on mobile */
                table.box-table th:last-child,
                table.box-table td:last-child {
                    position: sticky;
                    right: 0;
                    background: rgba(1, 18, 25, 0.98);
                    z-index: 5;
                    border-left: 2px solid rgba(100, 200, 255, 0.3);
                }
                
                table.box-table th:last-child {
                    z-index: 15;
                    background: rgba(255, 255, 255, 0.08);
                }
                
                table.box-table td[contenteditable] {
                    background: rgba(0, 0, 0, 0.25);
                    border: 1px solid rgba(100, 200, 255, 0.1);
                    color: #fff;
                    min-width: 50px;
                    cursor: text;
                }
                
                /* Optimize column widths */
                table.box-table th:nth-child(1),
                table.box-table td:nth-child(1) {
                    min-width: 35px;
                    max-width: 40px;
                }
                
                table.box-table th:nth-child(2),
                table.box-table td:nth-child(2) {
                    min-width: 60px;
                    max-width: 75px;
                }
                
                table.box-table th:nth-child(3),
                table.box-table td:nth-child(3),
                table.box-table th:nth-child(4),
                table.box-table td:nth-child(4),
                table.box-table th:nth-child(5),
                table.box-table td:nth-child(5),
                table.box-table th:nth-child(6),
                table.box-table td:nth-child(6),
                table.box-table th:nth-child(7),
                table.box-table td:nth-child(7),
                table.box-table th:nth-child(8),
                table.box-table td:nth-child(8),
                table.box-table th:nth-child(9),
                table.box-table td:nth-child(9) {
                    min-width: 50px;
                    max-width: 65px;
                }
                
                table.box-table th:nth-child(10),
                table.box-table td:nth-child(10) {
                    min-width: 65px;
                    max-width: 80px;
                }
                
                table.box-table th:nth-child(11),
                table.box-table td:nth-child(11) {
                    min-width: 55px;
                    max-width: 70px;
                }
                
                table.box-table th:nth-child(12),
                table.box-table td:nth-child(12) {
                    min-width: 50px;
                    max-width: 65px;
                }
                
                table.box-table th:nth-child(13),
                table.box-table td:nth-child(13) {
                    min-width: 60px;
                    max-width: 75px;
                }
                
                table.box-table td[contenteditable]:focus {
                    border-color: #2CB1E1;
                    outline: none;
                    background: rgba(44, 177, 225, 0.1);
                }
                
                /* حاسبة الكاش - تصميم مميز */
                #tblCashCalc {
                    min-width: auto !important;
                    width: 100% !important;
                    font-size: 0.85rem !important;
                    border-collapse: separate;
                    border-spacing: 0;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.25);
                }
                
                #tblCashCalc th,
                #tblCashCalc td {
                    padding: 6px 8px !important;
                    font-size: 0.9rem !important;
                    min-width: auto !important;
                    max-width: none !important;
                    border: none !important;
                }
                
                #tblCashCalc th {
                    font-size: 0.95rem !important;
                    padding: 8px 8px !important;
                    background: linear-gradient(135deg, rgba(44, 177, 225, 0.2), rgba(44, 177, 225, 0.15)) !important;
                    color: #2CB1E1 !important;
                    font-weight: 900 !important;
                    text-align: center;
                    border-bottom: 2px solid rgba(44, 177, 225, 0.3) !important;
                }
                
                #tblCashCalc tbody tr {
                    background: rgba(0, 0, 0, 0.2);
                    transition: all 0.3s ease;
                    border-bottom: 1px solid rgba(100, 200, 255, 0.1);
                }
                
                #tblCashCalc tbody tr:hover {
                    background: rgba(44, 177, 225, 0.1);
                    transform: translateX(4px);
                }
                
                #tblCashCalc tbody tr:last-child {
                    border-bottom: none;
                }
                
                #tblCashCalc td:first-child {
                    background: rgba(0, 0, 0, 0.3) !important;
                    border-right: 2px solid rgba(100, 200, 255, 0.2) !important;
                    font-weight: 700 !important;
                }
                
                #tblCashCalc td:first-child:focus {
                    background: rgba(44, 177, 225, 0.15) !important;
                    border-right-color: #2CB1E1 !important;
                    outline: 2px solid rgba(44, 177, 225, 0.3);
                    outline-offset: -2px;
                }
                
                #tblCashCalc td:last-child {
                    background: linear-gradient(135deg, rgba(44, 177, 225, 0.1), rgba(44, 177, 225, 0.05)) !important;
                    color: #2CB1E1 !important;
                    font-weight: 800 !important;
                    font-size: 0.95rem !important;
                    text-align: center;
                }
                
                #tblCashCalc td[contenteditable] {
                    min-width: 70px !important;
                    font-size: 0.9rem !important;
                    text-align: center;
                    border-radius: 6px;
                    transition: all 0.3s ease;
                }
                
                #tblCashCalc td[contenteditable]:empty::before {
                    content: '0';
                    color: rgba(255, 255, 255, 0.3);
                }
                
                /* Mobile Optimizations */
                @media screen and (max-width: 768px) {
                    .box-table-wrap {
                        padding: 5px;
                        margin: 0 -10px 20px -10px;
                        border-radius: 12px;
                    }
                    
                    table.box-table {
                        min-width: 800px;
                        font-size: 0.7rem;
                    }
                    
                    table.box-table th,
                    table.box-table td {
                        padding: 5px 3px;
                        font-size: 0.7rem;
                    }
                    
                    table.box-table th {
                        font-size: 0.65rem;
                        padding: 6px 3px;
                    }
                    
                    /* Hide less important columns on mobile */
                    table.box-table th:nth-child(4),
                    table.box-table td:nth-child(4),
                    table.box-table th:nth-child(7),
                    table.box-table td:nth-child(7) {
                        display: none;
                    }
                    
                    /* Make important columns optimized */
                    table.box-table th:first-child,
                    table.box-table td:first-child {
                        min-width: 35px;
                        max-width: 40px;
                        padding: 5px 4px;
                    }
                    
                    table.box-table th:nth-child(2),
                    table.box-table td:nth-child(2) {
                        min-width: 60px;
                        max-width: 75px;
                    }
                    
                    table.box-table th:nth-child(3),
                    table.box-table td:nth-child(3),
                    table.box-table th:nth-child(5),
                    table.box-table td:nth-child(5),
                    table.box-table th:nth-child(6),
                    table.box-table td:nth-child(6),
                    table.box-table th:nth-child(8),
                    table.box-table td:nth-child(8),
                    table.box-table th:nth-child(9),
                    table.box-table td:nth-child(9) {
                        min-width: 50px;
                        max-width: 65px;
                    }
                    
                    table.box-table th:nth-child(10),
                    table.box-table td:nth-child(10) {
                        min-width: 65px;
                        max-width: 80px;
                    }
                    
                    table.box-table th:nth-child(11),
                    table.box-table td:nth-child(11) {
                        min-width: 55px;
                        max-width: 70px;
                    }
                    
                    table.box-table th:nth-child(12),
                    table.box-table td:nth-child(12) {
                        min-width: 50px;
                        max-width: 65px;
                    }
                    
                    table.box-table th:last-child,
                    table.box-table td:last-child {
                        min-width: 60px;
                        max-width: 75px;
                    }
                }
                
                @media screen and (max-width: 480px) {
                    table.box-table {
                        min-width: 700px;
                        font-size: 0.65rem;
                    }
                    
                    table.box-table th,
                    table.box-table td {
                        padding: 5px 3px;
                        font-size: 0.7rem;
                    }
                    
                    /* Hide more columns on very small screens */
                    table.box-table th:nth-child(5),
                    table.box-table td:nth-child(5),
                    table.box-table th:nth-child(8),
                    table.box-table td:nth-child(8),
                    table.box-table th:nth-child(9),
                    table.box-table td:nth-child(9) {
                        display: none;
                    }
                }
                
                .closed-row {
                    background: rgba(255, 255, 255, 0.04);
                    opacity: 0.8;
                    font-style: italic;
                }
                
                /* تمييز الصف الأول النشط - مثل صندوق الملاحظات */
                table.box-table tbody tr.active-row {
                    border: 2px solid rgba(100, 200, 255, 0.3);
                    box-shadow: 0 4px 12px rgba(44, 177, 225, 0.2),
                                0 0 0 1px rgba(100, 200, 255, 0.1) inset;
                    background: rgba(0, 0, 0, 0.1);
                    transition: all 0.3s ease;
                }
                
                table.box-table tbody tr.active-row:hover {
                    border-color: rgba(100, 200, 255, 0.4);
                    box-shadow: 0 6px 20px rgba(44, 177, 225, 0.3),
                                0 0 0 2px rgba(44, 177, 225, 0.15) inset;
                    background: rgba(0, 0, 0, 0.15);
                }
                
                table.box-table tbody tr.active-row td {
                    background: transparent;
                }
                
                table.box-table tbody tr.active-row td[contenteditable] {
                    background: rgba(0, 0, 0, 0.25);
                }
                
                table.box-table tbody tr.active-row td[contenteditable]:focus {
                    border-color: #2CB1E1;
                    background: rgba(44, 177, 225, 0.1);
                    box-shadow: 0 0 0 1px rgba(44, 177, 225, 0.2);
                }
                
                /* تأثير الترحيل - Highlight effect */
                .transfer-highlight {
                    animation: transferPulse 3s ease-out !important;
                    position: relative !important;
                }
                
                @keyframes transferPulse {
                    0% {
                        background: linear-gradient(135deg, rgba(44, 177, 225, 0.8), rgba(44, 177, 225, 0.8)) !important;
                        box-shadow: 
                            0 0 20px rgba(44, 177, 225, 0.8),
                            0 0 40px rgba(44, 177, 225, 0.6),
                            inset 0 0 20px rgba(44, 177, 225, 0.3) !important;
                        transform: scale(1.05) !important;
                        border: 2px solid #2CB1E1 !important;
                    }
                    50% {
                        background: linear-gradient(135deg, rgba(44, 177, 225, 0.5), rgba(44, 177, 225, 0.5)) !important;
                        box-shadow: 
                            0 0 15px rgba(44, 177, 225, 0.6),
                            0 0 30px rgba(44, 177, 225, 0.4),
                            inset 0 0 15px rgba(44, 177, 225, 0.2) !important;
                        transform: scale(1.02) !important;
                        border: 2px solid rgba(44, 177, 225, 0.8) !important;
                    }
                    100% {
                        background: rgba(0, 0, 0, 0.25) !important;
                        box-shadow: none !important;
                        transform: scale(1) !important;
                        border: 1px solid rgba(100, 200, 255, 0.1) !important;
                    }
                }
                
                .transfer-highlight::before {
                    content: '✓' !important;
                    position: absolute !important;
                    top: 50% !important;
                    left: 50% !important;
                    transform: translate(-50%, -50%) !important;
                    font-size: 24px !important;
                    color: #2CB1E1 !important;
                    font-weight: 900 !important;
                    z-index: 10 !important;
                    animation: checkmarkFade 1.5s ease-out !important;
                    pointer-events: none !important;
                }
                
                @keyframes checkmarkFade {
                    0% {
                        opacity: 1 !important;
                        transform: translate(-50%, -50%) scale(1.5) !important;
                    }
                    50% {
                        opacity: 1 !important;
                        transform: translate(-50%, -50%) scale(1) !important;
                    }
                    100% {
                        opacity: 0 !important;
                        transform: translate(-50%, -50%) scale(0.8) !important;
                    }
                }
                
                .pagination-controls {
                    display: flex;
                    justify-content: center;
                    gap: 5px;
                    margin-top: 20px;
                    flex-wrap: wrap;
                }
                
                .page-btn {
                    padding: 8px 15px;
                    background: rgba(255, 255, 255, 0.1);
                    border: 1px solid rgba(100, 200, 255, 0.2);
                    color: #fff;
                    cursor: pointer;
                    border-radius: 6px;
                    font-weight: bold;
                    min-width: 40px;
                }
                
                .page-btn.active {
                    background: #2CB1E1;
                    color: #000;
                }
                
                .page-btn:hover:not(.active) {
                    background: rgba(255, 255, 255, 0.2);
                }
                
                .page-nav-arrow {
                    padding: 8px 12px;
                    background: linear-gradient(135deg, rgba(239, 68, 68, 0.8), rgba(220, 38, 38, 0.9));
                    border: 1px solid rgba(239, 68, 68, 0.5);
                    color: #fff;
                    cursor: pointer;
                    border-radius: 6px;
                    font-weight: bold;
                    font-size: 16px;
                    min-width: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                    box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3);
                }
                
                .page-nav-arrow:hover {
                    background: linear-gradient(135deg, rgba(239, 68, 68, 1), rgba(220, 38, 38, 1));
                    transform: translateX(-2px);
                    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.5);
                }
                
                .page-nav-arrow.right {
                    background: linear-gradient(135deg, rgba(44, 177, 225, 0.8), rgba(26, 143, 184, 0.9));
                    border: 1px solid rgba(44, 177, 225, 0.5);
                    box-shadow: 0 2px 8px rgba(44, 177, 225, 0.3);
                }
                
                .page-nav-arrow.right:hover {
                    background: linear-gradient(135deg, rgba(44, 177, 225, 1), rgba(26, 143, 184, 1));
                    transform: translateX(2px);
                    box-shadow: 0 4px 12px rgba(44, 177, 225, 0.5);
                }
                
                .page-nav-arrow:disabled {
                    opacity: 0.3;
                    cursor: not-allowed;
                    transform: none !important;
                }
                
                @media screen and (max-width: 768px) {
                    .pagination-controls {
                        gap: 4px;
                        margin-top: 15px;
                    }
                    
                    .page-btn {
                        padding: 6px 12px;
                        font-size: 0.85rem;
                        min-width: 35px;
                    }
                }
                
                .calc-container {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 16px;
                    justify-content: center;
                    margin: 15px 0;
                }
                
                .calc-box {
                    width: 340px;
                    max-width: 100%;
                    background: linear-gradient(145deg, rgba(1, 18, 25, 0.95) 0%, rgba(2, 42, 58, 0.9) 100%);
                    border: 2px solid rgba(100, 200, 255, 0.25);
                    border-radius: 16px;
                    padding: 16px;
                    box-shadow: 
                        0 8px 24px rgba(0, 0, 0, 0.5),
                        0 0 0 1px rgba(100, 200, 255, 0.1) inset,
                        0 2px 12px rgba(44, 177, 225, 0.12);
                    position: relative;
                    overflow: hidden;
                }
                
                .calc-box::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 3px;
                    background: linear-gradient(90deg, #2CB1E1, #5bc0de, #2CB1E1);
                    background-size: 200% 100%;
                    animation: shimmer 3s ease-in-out infinite;
                }
                
                @media screen and (max-width: 768px) {
                    .calc-container {
                        flex-direction: column;
                        gap: 15px;
                    }
                    
                    .calc-box {
                        width: 100%;
                        padding: 14px;
                    }
                    
                    .calc-btn {
                        padding: 10px 6px;
                        font-size: 14px;
                    }
                    
                    .calc-display {
                        font-size: 20px;
                        padding: 10px 12px;
                    }
                    
                    #tblCashCalc th,
                    #tblCashCalc td {
                        padding: 8px 6px !important;
                        font-size: 0.85rem !important;
                    }
                }
                
                .calc-display {
                    width: 100%;
                    background: linear-gradient(135deg, rgba(0, 0, 0, 0.7), rgba(1, 18, 25, 0.8));
                    color: #2CB1E1;
                    border: 2px solid rgba(44, 177, 225, 0.3);
                    padding: 12px 14px;
                    font-size: 22px;
                    font-weight: 900;
                    text-align: right;
                    margin-bottom: 12px;
                    border-radius: 12px;
                    font-family: 'Courier New', monospace;
                    box-shadow: 
                        0 3px 12px rgba(44, 177, 225, 0.15),
                        inset 0 1px 6px rgba(0, 0, 0, 0.4);
                    letter-spacing: 1px;
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                }
                
                .calc-display:focus {
                    outline: none;
                    border-color: #2CB1E1;
                    box-shadow: 
                        0 4px 18px rgba(44, 177, 225, 0.3),
                        inset 0 1px 8px rgba(0, 0, 0, 0.5),
                        0 0 0 3px rgba(44, 177, 225, 0.15);
                    transform: translateY(-1px);
                }
                
                .calc-display::placeholder {
                    color: rgba(44, 177, 225, 0.4);
                }
                
                .calc-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 6px;
                }
                
                .calc-btn {
                    padding: 12px 8px;
                    border-radius: 10px;
                    border: 2px solid transparent;
                    font-weight: 800;
                    font-size: 15px;
                    cursor: pointer;
                    background: linear-gradient(145deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.06));
                    color: #fff;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                    overflow: hidden;
                    box-shadow: 
                        0 2px 8px rgba(0, 0, 0, 0.25),
                        inset 0 1px 0 rgba(255, 255, 255, 0.1);
                }
                
                .calc-btn::before {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 0;
                    height: 0;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.2);
                    transform: translate(-50%, -50%);
                    transition: width 0.4s, height 0.4s;
                }
                
                .calc-btn:active::before {
                    width: 300px;
                    height: 300px;
                }
                
                .calc-btn:hover {
                    background: linear-gradient(145deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.12));
                    transform: translateY(-2px) scale(1.03);
                    box-shadow: 
                        0 4px 14px rgba(0, 0, 0, 0.35),
                        inset 0 1px 0 rgba(255, 255, 255, 0.2),
                        0 0 0 1px rgba(255, 255, 255, 0.1);
                }
                
                .calc-btn:active {
                    transform: translateY(0) scale(1);
                }
                
                .calc-btn.op {
                    background: linear-gradient(135deg, #2CB1E1, #1a8fb8);
                    color: #fff;
                    border-color: rgba(44, 177, 225, 0.4);
                    box-shadow: 
                        0 4px 15px rgba(44, 177, 225, 0.3),
                        inset 0 1px 0 rgba(255, 255, 255, 0.2);
                }
                
                .calc-btn.op:hover {
                    background: linear-gradient(135deg, #3ea8ff, #2CB1E1);
                    box-shadow: 
                        0 6px 25px rgba(44, 177, 225, 0.5),
                        inset 0 1px 0 rgba(255, 255, 255, 0.3),
                        0 0 0 2px rgba(44, 177, 225, 0.3);
                }
                
                .calc-btn.eq {
                    background: linear-gradient(135deg, #2CB1E1, #1a8fb8);
                    color: #fff;
                    border-color: rgba(44, 177, 225, 0.5);
                    box-shadow: 
                        0 4px 15px rgba(44, 177, 225, 0.4),
                        inset 0 1px 0 rgba(255, 255, 255, 0.3);
                    font-weight: 900;
                }
                
                .calc-btn.eq:hover {
                    background: linear-gradient(135deg, #5bc0de, #2CB1E1);
                    box-shadow: 
                        0 6px 25px rgba(44, 177, 225, 0.6),
                        inset 0 1px 0 rgba(255, 255, 255, 0.4),
                        0 0 0 2px rgba(44, 177, 225, 0.4);
                }
                
                .calc-btn.clr {
                    background: linear-gradient(135deg, #ef4444, #dc2626);
                    color: #fff;
                    border-color: rgba(239, 68, 68, 0.5);
                    box-shadow: 
                        0 4px 15px rgba(239, 68, 68, 0.3),
                        inset 0 1px 0 rgba(255, 255, 255, 0.2);
                }
                
                .calc-btn.clr:hover {
                    background: linear-gradient(135deg, #f87171, #ef4444);
                    box-shadow: 
                        0 6px 25px rgba(239, 68, 68, 0.5),
                        inset 0 1px 0 rgba(255, 255, 255, 0.3),
                        0 0 0 2px rgba(239, 68, 68, 0.3);
                }
                
                .calc-btn.transfer {
                    background: linear-gradient(135deg, #10b981, #059669);
                    color: #fff;
                    grid-column: span 2;
                    border-color: rgba(16, 185, 129, 0.5);
                    box-shadow: 
                        0 2px 10px rgba(16, 185, 129, 0.25),
                        inset 0 1px 0 rgba(255, 255, 255, 0.2);
                    font-size: 13px;
                    font-weight: 800;
                }
                
                .calc-btn.transfer:hover {
                    background: linear-gradient(135deg, #34d399, #10b981);
                    box-shadow: 
                        0 6px 25px rgba(16, 185, 129, 0.5),
                        inset 0 1px 0 rgba(255, 255, 255, 0.3),
                        0 0 0 2px rgba(16, 185, 129, 0.3);
                }
                
                #lblCashSum {
                    color: #fff !important;
                    font-weight: 900;
                    font-size: 1.1rem !important;
                    background: linear-gradient(135deg, #2CB1E1, #5bc0de) !important;
                    padding: 6px 12px !important;
                    border-radius: 10px !important;
                    border: 2px solid rgba(44, 177, 225, 0.5) !important;
                    box-shadow: 
                        0 3px 10px rgba(44, 177, 225, 0.3),
                        inset 0 1px 0 rgba(255, 255, 255, 0.3);
                    display: inline-block;
                    min-width: 60px;
                    text-align: center;
                }
                
                .btn-box {
                    border: none;
                    border-radius: 10px;
                    padding: 8px 16px;
                    font-weight: 800;
                    cursor: pointer;
                    transition: 0.2s;
                    color: #fff;
                }
                
                .btn-box-blue {
                    background: linear-gradient(135deg, #2CB1E1, #1a8fb8);
                    color: #fff;
                    transition: all 0.3s ease;
                }
                
                .btn-box-blue:hover {
                    background: linear-gradient(135deg, #3ea8ff, #2CB1E1);
                    transform: translateY(-2px) scale(1.02);
                    box-shadow: 
                        0 6px 20px rgba(44, 177, 225, 0.4),
                        0 0 0 2px rgba(44, 177, 225, 0.2);
                }
                
                .btn-box-blue:active {
                    transform: translateY(0) scale(0.98);
                    box-shadow: 
                        0 2px 10px rgba(44, 177, 225, 0.3),
                        inset 0 2px 5px rgba(0, 0, 0, 0.2);
                }
                
                /* تأثير خاص لزر إغلاق الصندوق */
                #btnCloseShift {
                    position: relative;
                    overflow: hidden;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                
                #btnCloseShift::before {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 0;
                    height: 0;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.3);
                    transform: translate(-50%, -50%);
                    transition: width 0.6s, height 0.6s;
                }
                
                #btnCloseShift:hover {
                    background: linear-gradient(135deg, #3ea8ff, #2CB1E1) !important;
                    transform: translateY(-3px) scale(1.02);
                    box-shadow: 
                        0 8px 25px rgba(44, 177, 225, 0.5),
                        0 0 0 3px rgba(44, 177, 225, 0.3),
                        inset 0 2px 10px rgba(255, 255, 255, 0.2);
                }
                
                #btnCloseShift:hover::before {
                    width: 300px;
                    height: 300px;
                }
                
                #btnCloseShift:active {
                    background: linear-gradient(135deg, #1a8fb8, #2CB1E1) !important;
                    transform: translateY(-1px) scale(0.98);
                    box-shadow: 
                        0 4px 15px rgba(44, 177, 225, 0.4),
                        0 0 0 2px rgba(44, 177, 225, 0.5),
                        inset 0 3px 8px rgba(0, 0, 0, 0.2);
                }
                
                #btnCloseShift:active::before {
                    width: 400px;
                    height: 400px;
                    background: rgba(255, 255, 255, 0.5);
                }
                
                #btnCloseShift:focus {
                    outline: 3px solid rgba(44, 177, 225, 0.5);
                    outline-offset: 2px;
                }
                
                .btn-box-red {
                    background: linear-gradient(135deg, #ef4444, #dc2626);
                }
                
                .btn-box:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                    filter: grayscale(1);
                }
                
                #txtShiftNotes {
                    width: 100%;
                    max-width: 400px;
                    background: rgba(0, 0, 0, 0.3);
                    border: 2px solid rgba(100, 200, 255, 0.3);
                    color: #fff;
                    border-radius: 12px;
                    padding: 12px;
                    margin-top: 10px;
                    font-family: inherit;
                    font-size: 0.9rem;
                    box-shadow: 0 4px 12px rgba(44, 177, 225, 0.2),
                                0 0 0 1px rgba(100, 200, 255, 0.1) inset;
                    transition: all 0.3s ease;
                }
                
                #txtShiftNotes:focus {
                    outline: none;
                    border-color: #2CB1E1;
                    box-shadow: 0 6px 20px rgba(44, 177, 225, 0.3),
                                0 0 0 2px rgba(44, 177, 225, 0.15) inset;
                    background: rgba(0, 0, 0, 0.4);
                }
                
                #txtShiftNotes::placeholder {
                    color: rgba(255, 255, 255, 0.5);
                }
                
                @media screen and (max-width: 768px) {
                    #txtShiftNotes {
                        max-width: 100%;
                        font-size: 0.85rem;
                        padding: 10px;
                    }
                }
                
                .undo-container {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    margin-right: 8px;
                    padding: 6px 10px;
                    background: rgba(239, 68, 68, 0.1);
                    border: 1px solid rgba(239, 68, 68, 0.3);
                    border-radius: 8px;
                }
                
                .undo-container button {
                    font-size: 0.8rem;
                    padding: 6px 12px;
                    white-space: nowrap;
                }
                
                .undo-container #undoTimer {
                    font-weight: 900;
                    color: #2CB1E1;
                    font-size: 0.9rem;
                }
                
                @media screen and (max-width: 768px) {
                    .undo-container {
                        flex-direction: column;
                        gap: 4px;
                        padding: 4px 8px;
                        margin-right: 4px;
                    }
                    
                    .undo-container button {
                        font-size: 0.75rem;
                        padding: 5px 10px;
                    }
                }
                
                .calc-history {
                    margin-top: 10px;
                    max-height: 100px;
                    overflow-y: auto;
                    font-size: 11px;
                    line-height: 1.5;
                    background: linear-gradient(135deg, rgba(1, 18, 25, 0.7), rgba(2, 42, 58, 0.6));
                    border-radius: 10px;
                    padding: 8px;
                    border: 2px solid rgba(100, 200, 255, 0.25);
                    box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.3);
                }
                
                .calc-history::-webkit-scrollbar {
                    width: 6px;
                }
                
                .calc-history::-webkit-scrollbar-track {
                    background: rgba(0, 0, 0, 0.2);
                    border-radius: 3px;
                }
                
                .calc-history::-webkit-scrollbar-thumb {
                    background: rgba(44, 177, 225, 0.5);
                    border-radius: 3px;
                }
                
                .calc-history::-webkit-scrollbar-thumb:hover {
                    background: rgba(44, 177, 225, 0.7);
                }
                
                .calc-history-entry {
                    opacity: 0.95;
                    padding: 6px 8px;
                    margin-bottom: 4px;
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 6px;
                    border-left: 3px solid rgba(44, 177, 225, 0.5);
                    transition: all 0.2s ease;
                }
                
                .calc-history-entry:hover {
                    background: rgba(44, 177, 225, 0.1);
                    border-left-color: #2CB1E1;
                    transform: translateX(4px);
                }
                
                /* --- PRINT STYLES --- */
                #printArea {
                    display: none;
                    position: fixed;
                    left: -9999px;
                    top: -9999px;
                    width: 210mm;
                    min-height: 297mm;
                    background: #fff;
                    color: #000;
                }
                
                @media print {
                    @page {
                        size: A4 landscape;
                        margin: 5mm 5mm 15mm 5mm;
                    }
                    
                    * {
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                        color-adjust: exact !important;
                    }
                    
                    html, body {
                        width: 100% !important;
                        height: auto !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        background: #fff !important;
                        overflow: visible !important;
                    }
                    
                    /* إخفاء كل شيء ما عدا printArea */
                    body > *:not(#printArea) {
                        display: none !important;
                        visibility: hidden !important;
                    }
                    
                    /* إظهار printArea فقط - إزالة transform في الطباعة */
                    #printArea {
                        display: block !important;
                        position: relative !important;
                        left: 0 !important;
                        top: 0 !important;
                        width: 100% !important;
                        height: auto !important;
                        min-height: auto !important;
                        background: #fff !important;
                        color: #000 !important;
                        padding: 0 !important;
                        margin: 0 !important;
                        z-index: 1 !important;
                        visibility: visible !important;
                        opacity: 1 !important;
                        overflow: visible !important;
                    }
                    
                    
                    /* إظهار كل محتويات printArea */
                    #printArea * {
                        visibility: visible !important;
                    }
                    
                    #printArea table {
                        display: table !important;
                    }
                    
                    #printArea tr {
                        display: table-row !important;
                    }
                    
                    #printArea td,
                    #printArea th {
                        display: table-cell !important;
                    }
                    
                    #printArea thead {
                        display: table-header-group !important;
                    }
                    
                    #printArea tbody {
                        display: table-row-group !important;
                    }
                    
                    #printArea div {
                        display: block !important;
                    }
                    
                    /* إصلاح عرض الجداول */
                    #printArea table {
                        display: table !important;
                        width: 100% !important;
                    }
                    
                    #printArea tr {
                        display: table-row !important;
                    }
                    
                    #printArea td,
                    #printArea th {
                        display: table-cell !important;
                    }
                    
                    #printArea thead {
                        display: table-header-group !important;
                    }
                    
                    #printArea tbody {
                        display: table-row-group !important;
                    }
                    
                    .prof-report-container {
                        width: 100% !important;
                        margin: 0 auto !important;
                        border: 2px solid #000 !important;
                        border-radius: 4px !important;
                        padding: 12px !important;
                        box-sizing: border-box !important;
                        position: relative !important;
                        background: #fff !important;
                        min-height: auto !important;
                        max-height: none !important;
                        height: auto !important;
                        overflow: visible !important;
                        page-break-inside: auto !important;
                    }
                    
                    .prof-report-container::before {
                        content: '' !important;
                        position: absolute !important;
                        top: 0 !important;
                        left: 0 !important;
                        right: 0 !important;
                        bottom: 0 !important;
                        border: 1px solid #666 !important;
                        border-radius: 4px !important;
                        pointer-events: none !important;
                    }
                    
                    .prof-header {
                        text-align: center !important;
                        margin-bottom: 12px !important;
                        border-bottom: 1px solid #000 !important;
                        padding-bottom: 8px !important;
                    }
                    
                    .prof-header h1 {
                        font-size: 16px !important;
                        margin: 0 0 4px 0 !important;
                        font-weight: 900 !important;
                        color: #000 !important;
                    }
                    
                    .prof-header-info {
                        display: flex !important;
                        justify-content: space-between !important;
                        align-items: center !important;
                        font-size: 11px !important;
                        margin-top: 4px !important;
                        flex-wrap: wrap !important;
                        gap: 8px !important;
                    }
                    
                    .prof-header-info span {
                        margin: 0 4px !important;
                    }
                    
                    .prof-header h2 {
                        display: none !important;
                    }
                    
                    .prof-header p {
                        display: none !important;
                    }
                    
                    table.prof-table {
                        width: 100% !important;
                        border-collapse: collapse !important;
                        font-size: 10px !important;
                        margin-bottom: 8px !important;
                        page-break-inside: auto !important;
                        table-layout: auto !important;
                    }
                    
                    table.prof-table th,
                    table.prof-table td {
                        border: 1px solid #000 !important;
                        padding: 4px 3px !important;
                        text-align: center !important;
                        font-weight: bold !important;
                        color: #000 !important;
                        word-wrap: break-word !important;
                        overflow-wrap: break-word !important;
                    }
                    
                    table.prof-table th {
                        background: #e0e0e0 !important;
                        font-size: 10px !important;
                        font-weight: 900 !important;
                    }
                    
                    /* السماح بتقسيم الجدول على صفحات متعددة */
                    table.prof-table thead {
                        display: table-header-group !important;
                    }
                    
                    table.prof-table tbody {
                        display: table-row-group !important;
                    }
                    
                    /* تكرار رأس الجدول في كل صفحة */
                    table.prof-table thead tr {
                        page-break-after: avoid !important;
                    }
                    
                    /* السماح بتقسيم الصفوف على صفحات متعددة */
                    table.prof-table tbody tr {
                        page-break-inside: auto !important;
                        page-break-after: auto !important;
                    }
                    
                    /* منع تقسيم الخلية الواحدة بين صفحتين */
                    table.prof-table td {
                        page-break-inside: avoid !important;
                    }
                    
                    /* تحديد عرض الأعمدة لتتناسب مع المحتوى */
                    table.prof-table th:nth-child(1),
                    table.prof-table td:nth-child(1) {
                        width: 3% !important;
                    }
                    table.prof-table th:nth-child(2),
                    table.prof-table td:nth-child(2) {
                        width: 8% !important;
                    }
                    table.prof-table th:nth-child(3),
                    table.prof-table td:nth-child(3) {
                        width: 7% !important;
                    }
                    table.prof-table th:nth-child(4),
                    table.prof-table td:nth-child(4) {
                        width: 8% !important;
                    }
                    table.prof-table th:nth-child(5),
                    table.prof-table td:nth-child(5) {
                        width: 12% !important;
                    }
                    table.prof-table th:nth-child(6),
                    table.prof-table td:nth-child(6) {
                        width: 7% !important;
                    }
                    table.prof-table th:nth-child(7),
                    table.prof-table td:nth-child(7) {
                        width: 8% !important;
                    }
                    table.prof-table th:nth-child(8),
                    table.prof-table td:nth-child(8) {
                        width: 7% !important;
                    }
                    table.prof-table th:nth-child(9),
                    table.prof-table td:nth-child(9) {
                        width: 7% !important;
                    }
                    table.prof-table th:nth-child(10),
                    table.prof-table td:nth-child(10) {
                        width: 10% !important;
                    }
                    table.prof-table th:nth-child(11),
                    table.prof-table td:nth-child(11) {
                        width: 8% !important;
                    }
                    table.prof-table th:nth-child(12),
                    table.prof-table td:nth-child(12) {
                        width: 15% !important;
                    }
                    
                    .prof-summary-grid {
                        display: grid !important;
                        grid-template-columns: 1fr 1fr !important;
                        gap: 20px !important;
                        margin-top: 30px !important;
                        page-break-inside: avoid !important;
                    }
                    
                    .prof-box {
                        border: 2px solid #000 !important;
                        padding: 15px !important;
                        background: #fff !important;
                    }
                    
                    .prof-box h3 {
                        margin-top: 0 !important;
                        border-bottom: 1px solid #000 !important;
                        padding-bottom: 5px !important;
                        color: #000 !important;
                    }
                    
                    .prof-footer {
                        margin-top: 8px !important;
                        display: flex !important;
                        justify-content: center !important;
                        padding-top: 6px !important;
                        border-top: 1px solid #000 !important;
                        page-break-inside: avoid !important;
                    }
                    
                    .prof-footer div {
                        width: 50% !important;
                        text-align: center !important;
                        font-weight: 900 !important;
                        font-size: 11px !important;
                        color: #000 !important;
                    }
                    
                    /* توقيع المطور في كل صفحة - يظهر في أسفل كل صفحة */
                    .prof-developer-signature-fixed {
                        display: none !important;
                    }
                    
                    @media print {
                        .prof-developer-signature-fixed {
                            display: block !important;
                            position: fixed !important;
                            bottom: 5mm !important;
                            left: 0 !important;
                            right: 0 !important;
                            width: 100% !important;
                            text-align: center !important;
                            font-size: 8px !important;
                            color: #000 !important;
                            font-weight: 600 !important;
                            border-top: 1px solid #000 !important;
                            padding-top: 4px !important;
                            background: #fff !important;
                            z-index: 1000 !important;
                            page-break-inside: avoid !important;
                        }
                    }
                }
                
                /* iOS Toast & Modal */
                #toastContainer {
                    position: fixed;
                    top: 15px;
                    left: 15px;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    z-index: 100002;
                }
                
                .toast-ios {
                    min-width: 260px;
                    max-width: 340px;
                    background: rgba(1, 18, 25, 0.95);
                    color: #e5e7eb;
                    border-radius: 18px;
                    padding: 10px 14px;
                    display: flex;
                    align-items: flex-start;
                    gap: 8px;
                    box-shadow: 0 18px 45px rgba(0, 0, 0, 0.55);
                    backdrop-filter: blur(14px);
                    font-size: 14px;
                    animation: toastSlide 0.25s ease-out;
                }
                
                .toast-ios-success {
                    border: 1px solid rgba(34, 197, 94, 0.7);
                }
                
                .toast-ios-error {
                    border: 1px solid rgba(248, 113, 113, 0.7);
                }
                
                .toast-ios-info {
                    border: 1px solid rgba(44, 177, 225, 0.7);
                }
                
                .toast-ios-icon {
                    font-size: 18px;
                    margin-top: 1px;
                }
                
                .toast-ios-text {
                    flex: 1;
                }
                
                .toast-ios-close {
                    border: none;
                    background: transparent;
                    color: #9ca3af;
                    cursor: pointer;
                    font-size: 16px;
                    padding: 0 4px;
                }
                
                @keyframes toastSlide {
                    from {
                        opacity: 0;
                        transform: translateY(-10px) translateX(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) translateX(0);
                    }
                }
                
                /* Modal */
                .ios-modal-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(1, 18, 25, 0.55);
                    display: none;
                    align-items: center;
                    justify-content: center;
                    z-index: 100003;
                    backdrop-filter: blur(4px);
                }
                
                .ios-modal-box {
                    background: rgba(1, 18, 25, 0.98);
                    color: #e5e7eb;
                    padding: 20px;
                    border-radius: 24px;
                    width: min(420px, 90vw);
                    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.7);
                    border: 1px solid rgba(100, 200, 255, 0.15);
                }
                
                .ios-modal-title {
                    font-weight: 800;
                    margin-bottom: 6px;
                    font-size: 16px;
                }
                
                .ios-modal-body {
                    font-size: 14px;
                    margin-bottom: 18px;
                    line-height: 1.6;
                }
                
                .ios-modal-actions {
                    display: flex;
                    gap: 8px;
                    justify-content: flex-end;
                }
                
                .btn-modal {
                    border: none;
                    border-radius: 999px;
                    padding: 8px 18px;
                    font-weight: 600;
                    cursor: pointer;
                    font-size: 13px;
                }
                
                .btn-modal-secondary {
                    background: rgba(148, 163, 184, 0.22);
                    color: #e5e7eb;
                }
                
                .btn-modal-primary {
                    background: #22c55e;
                    color: #022c22;
                }
                
                .choice-btn {
                    width: 100%;
                    margin-bottom: 8px;
                    text-align: right;
                    padding: 12px;
                    background: rgba(255, 255, 255, 0.1);
                    color: #fff;
                    border-radius: 8px;
                    border: 1px solid rgba(100, 200, 255, 0.15);
                    cursor: pointer;
                    font-weight: bold;
                }
                
                .choice-btn:hover {
                    background: rgba(255, 255, 255, 0.2);
                }
                
                #modalNoteInput {
                    width: 100%;
                    margin-top: 10px;
                    padding: 10px;
                    border-radius: 8px;
                    border: 1px solid rgba(100, 200, 255, 0.2);
                    background: rgba(0, 0, 0, 0.3);
                    color: #fff;
                    font-family: inherit;
                }
                
                /* ============================================
                   تصميم مميز لنافذة الطباعة المخصصة
                   ============================================ */
                .custom-print-modal-container {
                    background: linear-gradient(145deg, rgba(1, 18, 25, 0.98) 0%, rgba(2, 42, 58, 0.95) 100%);
                    border-radius: 20px;
                    width: min(450px, 90vw);
                    max-width: 450px;
                    box-shadow: 
                        0 20px 60px rgba(0, 0, 0, 0.8),
                        0 0 0 1px rgba(100, 200, 255, 0.2),
                        inset 0 1px 0 rgba(255, 255, 255, 0.1);
                    border: 2px solid rgba(44, 177, 225, 0.3);
                    overflow: hidden;
                    position: relative;
                }
                
                .custom-print-modal-container::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 4px;
                    background: linear-gradient(90deg, #2CB1E1, #5bc0de, #2CB1E1);
                    background-size: 200% 100%;
                    animation: shimmer 3s ease-in-out infinite;
                }
                
                @keyframes shimmer {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                
                /* Header */
                .custom-print-header {
                    background: linear-gradient(135deg, rgba(44, 177, 225, 0.15) 0%, rgba(44, 177, 225, 0.1) 100%);
                    padding: 18px 20px;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    border-bottom: 2px solid rgba(100, 200, 255, 0.2);
                    position: relative;
                }
                
                .custom-print-header::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 1px;
                    background: linear-gradient(90deg, transparent, rgba(44, 177, 225, 0.5), transparent);
                }
                
                .custom-print-header-icon {
                    font-size: 32px;
                    filter: drop-shadow(0 4px 8px rgba(44, 177, 225, 0.4));
                    animation: float 3s ease-in-out infinite;
                }
                
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-5px); }
                }
                
                .custom-print-header-text {
                    flex: 1;
                }
                
                .custom-print-title {
                    font-size: 18px;
                    font-weight: 900;
                    background: linear-gradient(135deg, #2CB1E1 0%, #5bc0de 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    margin-bottom: 3px;
                    text-shadow: 0 2px 10px rgba(44, 177, 225, 0.3);
                }
                
                .custom-print-subtitle {
                    font-size: 11px;
                    color: rgba(255, 255, 255, 0.6);
                    font-weight: 500;
                }
                
                /* أزرار الفترات السريعة */
                .custom-print-quick-buttons {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 8px;
                    padding: 16px 20px;
                    background: rgba(0, 0, 0, 0.2);
                }
                
                .quick-date-btn {
                    background: linear-gradient(145deg, rgba(44, 177, 225, 0.12), rgba(44, 177, 225, 0.05));
                    border: 2px solid rgba(44, 177, 225, 0.25);
                    border-radius: 12px;
                    padding: 12px 8px;
                    color: #fff;
                    cursor: pointer;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    font-weight: 600;
                    text-align: center;
                    position: relative;
                    overflow: hidden;
                }
                
                .quick-date-btn::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
                    transition: left 0.5s;
                }
                
                .quick-date-btn:hover::before {
                    left: 100%;
                }
                
                .quick-date-btn:hover {
                    background: linear-gradient(145deg, rgba(44, 177, 225, 0.25), rgba(44, 177, 225, 0.15));
                    border-color: #2CB1E1;
                    transform: translateY(-4px) scale(1.02);
                    box-shadow: 
                        0 8px 24px rgba(44, 177, 225, 0.4),
                        0 0 0 2px rgba(44, 177, 225, 0.2) inset;
                }
                
                .quick-date-btn:active {
                    transform: translateY(-2px) scale(1);
                }
                
                .quick-btn-icon {
                    font-size: 24px;
                    margin-bottom: 4px;
                    filter: drop-shadow(0 2px 4px rgba(44, 177, 225, 0.5));
                }
                
                .quick-btn-label {
                    font-size: 12px;
                    font-weight: 700;
                    margin-bottom: 4px;
                    color: #2CB1E1;
                }
                
                .quick-btn-badge {
                    font-size: 9px;
                    background: rgba(44, 177, 225, 0.2);
                    padding: 2px 6px;
                    border-radius: 6px;
                    color: rgba(255, 255, 255, 0.8);
                    display: inline-block;
                }
                
                /* قسم التواريخ */
                .custom-print-dates-section {
                    padding: 18px 20px;
                    background: rgba(0, 0, 0, 0.15);
                }
                
                .date-input-wrapper {
                    margin-bottom: 16px;
                }
                
                .date-input-label {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    margin-bottom: 10px;
                    font-weight: 700;
                    font-size: 13px;
                }
                
                .date-label-icon {
                    font-size: 16px;
                    filter: drop-shadow(0 2px 4px rgba(44, 177, 225, 0.4));
                }
                
                .date-label-text {
                    background: linear-gradient(135deg, #2CB1E1 0%, #5bc0de 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                
                .date-input-container {
                    position: relative;
                }
                
                .custom-date-input {
                    width: 100%;
                    padding: 12px 16px;
                    border-radius: 12px;
                    border: 2px solid rgba(100, 200, 255, 0.3);
                    background: rgba(0, 0, 0, 0.5);
                    color: #fff;
                    font-size: 14px;
                    font-weight: 600;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    font-family: inherit;
                    position: relative;
                    z-index: 1;
                }
                
                .custom-date-input:focus {
                    outline: none;
                    border-color: #2CB1E1;
                    background: rgba(0, 0, 0, 0.6);
                    box-shadow: 
                        0 0 0 4px rgba(44, 177, 225, 0.2),
                        0 8px 24px rgba(44, 177, 225, 0.3);
                    transform: translateY(-2px);
                }
                
                .date-input-glow {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    border-radius: 14px;
                    background: linear-gradient(135deg, rgba(44, 177, 225, 0.1), rgba(44, 177, 225, 0.1));
                    opacity: 0;
                    transition: opacity 0.4s;
                    pointer-events: none;
                    z-index: 0;
                }
                
                .custom-date-input:focus + .date-input-glow {
                    opacity: 1;
                }
                
                .custom-date-input::-webkit-calendar-picker-indicator {
                    filter: invert(1) brightness(1.5) drop-shadow(0 0 4px rgba(44, 177, 225, 0.5));
                    cursor: pointer;
                    opacity: 0.9;
                    padding: 6px;
                    border-radius: 6px;
                    transition: all 0.3s;
                    width: 24px;
                    height: 24px;
                }
                
                .custom-date-input::-webkit-calendar-picker-indicator:hover {
                    opacity: 1;
                    background: rgba(44, 177, 225, 0.2);
                    filter: invert(1) brightness(1.8) drop-shadow(0 0 8px rgba(44, 177, 225, 0.8));
                    transform: scale(1.1);
                }
                
                /* تحسين عرض التقويم */
                .custom-date-input::-webkit-datetime-edit {
                    color: #fff;
                    font-weight: 600;
                    padding: 2px;
                    display: flex;
                    align-items: center;
                    gap: 4px;
                }
                
                .custom-date-input::-webkit-datetime-edit-fields-wrapper {
                    background: transparent;
                    display: flex;
                    align-items: center;
                }
                
                /* تمييز التاريخ عن الوقت */
                .custom-date-input::-webkit-datetime-edit-month-field,
                .custom-date-input::-webkit-datetime-edit-day-field,
                .custom-date-input::-webkit-datetime-edit-year-field {
                    color: #2CB1E1 !important;
                    font-weight: 700;
                    padding: 3px 6px;
                    border-radius: 6px;
                    background: rgba(44, 177, 225, 0.15) !important;
                    margin: 0 2px;
                }
                
                .custom-date-input::-webkit-datetime-edit-hour-field,
                .custom-date-input::-webkit-datetime-edit-minute-field {
                    color: #2CB1E1 !important;
                    font-weight: 700;
                    padding: 3px 6px;
                    border-radius: 6px;
                    background: rgba(44, 177, 225, 0.15) !important;
                    margin: 0 2px;
                }
                
                .custom-date-input::-webkit-datetime-edit-text {
                    color: rgba(255, 255, 255, 0.5) !important;
                    padding: 0 3px;
                    font-weight: 600;
                }
                
                /* فاصل واضح بين التاريخ والوقت */
                .custom-date-input::-webkit-datetime-edit-ampm-field {
                    color: #2CB1E1 !important;
                    font-weight: 700;
                    padding: 3px 6px;
                    border-radius: 6px;
                    background: rgba(44, 177, 225, 0.2) !important;
                    margin-left: 4px;
                }
                
                .custom-date-input::-webkit-datetime-edit-month-field:focus,
                .custom-date-input::-webkit-datetime-edit-day-field:focus,
                .custom-date-input::-webkit-datetime-edit-year-field:focus {
                    background: rgba(44, 177, 225, 0.3) !important;
                    color: #fff !important;
                    outline: 2px solid #2CB1E1;
                }
                
                .custom-date-input::-webkit-datetime-edit-hour-field:focus,
                .custom-date-input::-webkit-datetime-edit-minute-field:focus {
                    background: rgba(44, 177, 225, 0.3) !important;
                    color: #fff !important;
                    outline: 2px solid #2CB1E1;
                }
                
                .date-connector {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin: 12px 0;
                    position: relative;
                }
                
                .connector-line {
                    width: 2px;
                    height: 20px;
                    background: linear-gradient(180deg, rgba(44, 177, 225, 0.5), rgba(44, 177, 225, 0.5));
                    border-radius: 2px;
                }
                
                .connector-arrow {
                    color: #2CB1E1;
                    font-size: 18px;
                    margin-top: 4px;
                    animation: bounce 2s ease-in-out infinite;
                }
                
                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(4px); }
                }
                
                /* معلومات الفترة */
                .custom-print-info-card {
                    margin: 0 20px 18px;
                    background: linear-gradient(135deg, rgba(44, 177, 225, 0.15), rgba(44, 177, 225, 0.1));
                    border: 2px solid rgba(44, 177, 225, 0.3);
                    border-radius: 12px;
                    padding: 14px 16px;
                    position: relative;
                    overflow: hidden;
                }
                
                .custom-print-info-card::before {
                    content: '';
                    position: absolute;
                    top: -50%;
                    right: -50%;
                    width: 200%;
                    height: 200%;
                    background: radial-gradient(circle, rgba(44, 177, 225, 0.1) 0%, transparent 70%);
                    animation: rotate 10s linear infinite;
                }
                
                @keyframes rotate {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                
                .info-card-header {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    margin-bottom: 10px;
                    position: relative;
                    z-index: 1;
                }
                
                .info-icon {
                    font-size: 18px;
                }
                
                .info-title {
                    color: #2CB1E1;
                    font-size: 14px;
                    font-weight: 700;
                }
                
                .info-card-content {
                    position: relative;
                    z-index: 1;
                }
                
                .info-text {
                    color: rgba(255, 255, 255, 0.9);
                    font-size: 13px;
                    font-weight: 600;
                    line-height: 1.6;
                }
                
                /* أزرار الإجراءات */
                .custom-print-actions {
                    display: flex;
                    gap: 10px;
                    padding: 16px 20px 20px;
                    background: rgba(0, 0, 0, 0.2);
                }
                
                .custom-action-btn {
                    flex: 1;
                    padding: 12px 18px;
                    border-radius: 12px;
                    border: none;
                    font-size: 14px;
                    font-weight: 700;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 6px;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                    overflow: hidden;
                }
                
                .cancel-btn {
                    background: rgba(148, 163, 184, 0.2);
                    color: rgba(255, 255, 255, 0.9);
                    border: 2px solid rgba(148, 163, 184, 0.3);
                }
                
                .cancel-btn:hover {
                    background: rgba(148, 163, 184, 0.3);
                    border-color: rgba(148, 163, 184, 0.5);
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(148, 163, 184, 0.3);
                }
                
                .print-btn {
                    background: linear-gradient(135deg, #2CB1E1 0%, #1a8fb8 100%);
                    color: #fff;
                    border: 2px solid rgba(44, 177, 225, 0.5);
                    box-shadow: 0 4px 15px rgba(44, 177, 225, 0.3);
                }
                
                .print-btn:hover {
                    background: linear-gradient(135deg, #5bc0de 0%, #2CB1E1 100%);
                    transform: translateY(-3px) scale(1.02);
                    box-shadow: 
                        0 8px 30px rgba(44, 177, 225, 0.5),
                        0 0 0 2px rgba(44, 177, 225, 0.3) inset;
                }
                
                .print-btn:active {
                    transform: translateY(-1px) scale(1);
                }
                
                .btn-icon {
                    font-size: 18px;
                }
                
                .btn-text {
                    font-weight: 800;
                }
                
                .btn-shine {
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
                    transition: left 0.5s;
                }
                
                .print-btn:hover .btn-shine {
                    left: 100%;
                }
                
                @media screen and (max-width: 768px) {
                    .custom-print-modal-container {
                        width: 90vw;
                        max-width: 450px;
                    }
                    
                    .custom-print-quick-buttons {
                        grid-template-columns: 1fr;
                        gap: 10px;
                    }
                    
                    .custom-print-actions {
                        flex-direction: column;
                    }
                }
            </style>
            
            <div id="cashbox-container">
                <div class="box-header">
                    <div>
                        <div style="font-size:20px; font-weight:800; color:#2CB1E1">🏛 نظام تقفيلة الصندوق</div>
                        <div style="font-size:13px; color:#9fb3c8" id="boxGreet">...</div>
                    </div>
                    <div>
                        <button class="btn-box btn-box-blue" onclick="exportBoxExcel()">📥 تصدير Excel</button>
                        <button class="btn-box btn-box-blue" onclick="printLastShift()">🖨️ طباعة آخر تقفيلة</button>
                        <button class="btn-box" style="background:#fff; color:#000" onclick="printSelectedShifts()">🖨️ طباعة المحدد</button>
                        <button class="btn-box" style="background:linear-gradient(135deg, #8b5cf6, #7c3aed); color:#fff;" onclick="showCustomPrintModal()">📅 طباعة مخصصة</button>
                    </div>
                </div>

                <div class="box-metrics">
                    <div class="metric-card">
                        <div style="color:#aaa; font-size:13px">💰 الإيراد (البرنامج)</div>
                        <div class="metric-val" id="metRev">0</div>
                    </div>
                    <div class="metric-card">
                        <div style="color:#aaa; font-size:13px">💵 الكاش + الاحتياطي</div>
                        <div class="metric-val" id="metCash">0</div>
                    </div>
                    <div class="metric-card">
                        <div style="color:#aaa; font-size:13px">💳 شبكة + تحويل</div>
                        <div class="metric-val" id="metNet">0</div>
                    </div>
                    <div class="metric-card">
                        <div style="color:#aaa; font-size:13px">📉 مصروفات</div>
                        <div class="metric-val" id="metExp">0</div>
                    </div>
                    <div class="metric-card">
                        <div style="color:#aaa; font-size:13px">⚖️ الانحراف</div>
                        <div class="metric-val" id="metVar">0</div>
                    </div>
                </div>

                <div class="box-table-wrap">
                    <table class="box-table" id="tblBox">
                        <thead>
                            <tr>
                                <th>
                                    <input type="checkbox" id="selectAllCheckbox" title="تحديد/إلغاء تحديد الكل" style="margin-left: 5px; cursor: pointer; width: 18px; height: 18px;">
                                    <br>م
                                </th>
                                <th>الموظف</th>
                                <th>احتياطي</th>
                                <th>مصروف</th>
                                <th>الوقت</th>
                                <th>كاش</th>
                                <th>مؤقت</th>
                                <th>شبكة</th>
                                <th>تحويل</th>
                                <th>ايراد</th>
                                <th>انحراف</th>
                                <th>ملاحظات</th>
                                <th>أوامر</th>
                            </tr>
                        </thead>
                        <tbody id="tbodyBox"></tbody>
                    </table>
                </div>
                <div class="pagination-controls" id="paginationControls"></div>

                <div style="display:flex; flex-direction:column; align-items:center; margin-bottom:20px; margin-top:20px;">
                    <button id="btnCloseShift" class="btn-box btn-box-blue" style="width:100%; max-width:400px; padding:15px; font-size:18px;" onclick="closeShift()" tabindex="0" onkeydown="handleCloseShiftKeydown(event)">🏛 إغلاق الصندوق</button>
                    <textarea id="txtShiftNotes" placeholder="اكتب ملاحظات التقفيلة هنا..."></textarea>
                </div>

                <div class="calc-container">
                    <div class="calc-box">
                        <div style="text-align: center; margin-bottom: 12px;">
                            <div style="font-size: 16px; font-weight: 900; background: linear-gradient(135deg, #2CB1E1, #5bc0de); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 4px;">
                                🧮 حاسبة الأرقام
                            </div>
                            <div style="width: 40px; height: 2px; background: linear-gradient(90deg, transparent, rgba(44, 177, 225, 0.5), transparent); margin: 0 auto; border-radius: 2px;"></div>
                        </div>
                        <input type="text" class="calc-display" id="cDisp" oninput="validateCalcInput(this)" placeholder="0">
                        <div class="calc-grid" id="cGrid">
                            <button class="calc-btn" onclick="cApp('7')">7</button>
                            <button class="calc-btn" onclick="cApp('8')">8</button>
                            <button class="calc-btn" onclick="cApp('9')">9</button>
                            <button class="calc-btn op" onclick="cApp('/')">÷</button>
                            <button class="calc-btn" onclick="cApp('4')">4</button>
                            <button class="calc-btn" onclick="cApp('5')">5</button>
                            <button class="calc-btn" onclick="cApp('6')">6</button>
                            <button class="calc-btn op" onclick="cApp('*')">×</button>
                            <button class="calc-btn" onclick="cApp('1')">1</button>
                            <button class="calc-btn" onclick="cApp('2')">2</button>
                            <button class="calc-btn" onclick="cApp('3')">3</button>
                            <button class="calc-btn op" onclick="cApp('-')">-</button>
                            <button class="calc-btn" onclick="cApp('0')">0</button>
                            <button class="calc-btn" onclick="cApp('.')">.</button>
                            <button class="calc-btn clr" onclick="cApp('C')">C</button>
                            <button class="calc-btn op" onclick="cApp('+')">+</button>
                            <button class="calc-btn transfer" onclick="transferCalcResult()">⬇️ ترحيل للجدول</button>
                            <button class="calc-btn eq" onclick="cApp('=')">=</button>
                        </div>
                        <div id="calcHistory" class="calc-history"></div>
                    </div>
                    <div class="calc-box">
                        <div style="text-align: center; margin-bottom: 12px; position: relative;">
                            <h3 style="color:#2CB1E1; text-align:center; margin:0 0 6px 0; font-size: 16px; font-weight: 900; text-shadow: 0 2px 6px rgba(44, 177, 225, 0.4);">
                                💰 حاسبة الكاش
                            </h3>
                            <div style="width: 40px; height: 2px; background: linear-gradient(90deg, transparent, #2CB1E1, transparent); margin: 0 auto; border-radius: 2px;"></div>
                        </div>
                        <table class="box-table" id="tblCashCalc">
                            <thead>
                                <tr>
                                    <th>الكمية</th>
                                    <th>القيمة (ر.س)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td contenteditable oninput="validateCashInput(this); recalcCash();"></td>
                                    <td>500</td>
                                </tr>
                                <tr>
                                    <td contenteditable oninput="validateCashInput(this); recalcCash();"></td>
                                    <td>200</td>
                                </tr>
                                <tr>
                                    <td contenteditable oninput="validateCashInput(this); recalcCash();"></td>
                                    <td>100</td>
                                </tr>
                                <tr>
                                    <td contenteditable oninput="validateCashInput(this); recalcCash();"></td>
                                    <td>50</td>
                                </tr>
                                <tr>
                                    <td contenteditable oninput="validateCashInput(this); recalcCash();"></td>
                                    <td>10</td>
                                </tr>
                                <tr>
                                    <td contenteditable oninput="validateCashInput(this); recalcCash();"></td>
                                    <td>5</td>
                                </tr>
                                <tr>
                                    <td contenteditable oninput="validateCashInput(this); recalcCash();"></td>
                                    <td>1</td>
                                </tr>
                            </tbody>
                        </table>
                        <div style="text-align:center; margin-top: 10px; padding: 8px 16px; background: linear-gradient(135deg, rgba(44, 177, 225, 0.15), rgba(44, 177, 225, 0.1)); border-radius: 10px; border: 2px solid rgba(44, 177, 225, 0.3); display: flex; align-items: center; justify-content: space-between; gap: 12px;">
                            <div style="font-weight:700; font-size:12px; color:rgba(255, 255, 255, 0.9);">
                                المجموع:
                            </div>
                            <div style="font-size: 20px; font-weight: 900; flex: 1; text-align: center;">
                                <span id="lblCashSum">0</span> <span style="font-size: 14px; color: rgba(255, 255, 255, 0.7);">ر.س</span>
                            </div>
                        </div>
                        <button class="btn-box btn-box-blue" style="width:100%; margin-top:12px; padding:10px; font-size:13px; font-weight:800; box-shadow: 0 3px 10px rgba(44, 177, 225, 0.25);" onclick="transferToCash()">
                            <span style="font-size: 14px; margin-left: 4px;">🔽</span>
                            ترحيل للكاش
                        </button>
                    </div>
                </div>
            </div>

            <div id="printArea"></div>

            <div id="toastContainer"></div>

            <div id="modalOverlay" class="ios-modal-overlay">
                <div class="ios-modal-box">
                    <div class="ios-modal-title" id="modalTitle">تنبيه</div>
                    <div class="ios-modal-body" id="modalBody"></div>
                    <div class="ios-modal-actions" id="modalActions"></div>
                </div>
            </div>
            
            <!-- Modal للطباعة المخصصة -->
            <div id="customPrintModal" class="ios-modal-overlay" style="display: none;">
                <div class="custom-print-modal-container">
                    <!-- Header مع تدرج ذهبي -->
                    <div class="custom-print-header">
                        <div class="custom-print-header-icon">📅</div>
                        <div class="custom-print-header-text">
                            <div class="custom-print-title">طباعة مخصصة</div>
                            <div class="custom-print-subtitle">اختر الفترة المطلوبة للطباعة</div>
                        </div>
                    </div>
                    
                    <!-- أزرار الفترات السريعة -->
                    <div class="custom-print-quick-buttons">
                        <button class="quick-date-btn premium" onclick="setQuickDate('today')" title="اليوم">
                            <div class="quick-btn-icon">📆</div>
                            <div class="quick-btn-label">اليوم</div>
                            <div class="quick-btn-badge">سريع</div>
                        </button>
                        <button class="quick-date-btn premium" onclick="setQuickDate('week')" title="آخر 7 أيام">
                            <div class="quick-btn-icon">📅</div>
                            <div class="quick-btn-label">أسبوع</div>
                            <div class="quick-btn-badge">7 أيام</div>
                        </button>
                        <button class="quick-date-btn premium" onclick="setQuickDate('month')" title="آخر 30 يوم">
                            <div class="quick-btn-icon">🗓️</div>
                            <div class="quick-btn-label">شهر</div>
                            <div class="quick-btn-badge">30 يوم</div>
                        </button>
                    </div>
                    
                    <!-- قسم التواريخ -->
                    <div class="custom-print-dates-section">
                        <div class="date-input-wrapper">
                            <div class="date-input-label">
                                <span class="date-label-icon">⏰</span>
                                <span class="date-label-text">من تاريخ ووقت</span>
                            </div>
                            <div class="date-input-container">
                                <input type="datetime-local" id="customPrintStartDate" class="custom-date-input premium">
                                <div class="date-input-glow"></div>
                            </div>
                        </div>
                        
                        <div class="date-connector">
                            <div class="connector-line"></div>
                            <div class="connector-arrow">↓</div>
                        </div>
                        
                        <div class="date-input-wrapper">
                            <div class="date-input-label">
                                <span class="date-label-icon">⏰</span>
                                <span class="date-label-text">إلى تاريخ ووقت</span>
                            </div>
                            <div class="date-input-container">
                                <input type="datetime-local" id="customPrintEndDate" class="custom-date-input premium">
                                <div class="date-input-glow"></div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- معلومات الفترة -->
                    <div class="custom-print-info-card">
                        <div class="info-card-header">
                            <span class="info-icon">ℹ️</span>
                            <span class="info-title">معلومات الفترة</span>
                        </div>
                        <div class="info-card-content">
                            <div id="customPrintInfo" class="info-text">
                                اختر الفترة المطلوبة
                            </div>
                        </div>
                    </div>
                    
                    <!-- أزرار الإجراءات -->
                    <div class="custom-print-actions">
                        <button class="custom-action-btn cancel-btn" onclick="hideCustomPrintModal()">
                            <span class="btn-icon">✖️</span>
                            <span class="btn-text">إلغاء</span>
                        </button>
                        <button class="custom-action-btn print-btn" onclick="executeCustomPrint()">
                            <span class="btn-icon">🖨️</span>
                            <span class="btn-text">طباعة</span>
                            <div class="btn-shine"></div>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    init() {
        // CASHBOX LOGIC V9 - Final
        let allBoxData = [];
        const BOX_KEY = 'cashboxData';
        const SELECTED_PRINT_IDS_KEY = 'cashboxSelectedPrintIds';
        let undoTimer = null;
        let currentPage = 1;
        const ITEMS_PER_PAGE = 5;
        let lastVarianceToastTime = 0;
        let selectedPrintIds = new Set(); // حفظ الصفوف المحددة للطباعة

        function formatNumber(val) {
            const num = parseFloat(val);
            if (!isFinite(num) || Math.abs(num) < 1e-9) return '0';
            if (Number.isInteger(num)) return num.toString();
            let s = num.toString();
            if (!s.includes('.')) return s;
            s = s.replace(/0+$/, '').replace(/\.$/, '');
            return s;
        }

        function loadBoxData() {
            const raw = localStorage.getItem(BOX_KEY);
            if (!raw) {
                allBoxData = [];
                createNewRowObj();
            } else {
                allBoxData = JSON.parse(raw);
                if (allBoxData.length === 0) createNewRowObj();
            }
            if (allBoxData.length > 0 && allBoxData[allBoxData.length - 1].closed) {
                createNewRowObj();
            }
            
            // تحميل الصفوف المحددة للطباعة
            const savedSelected = localStorage.getItem(SELECTED_PRINT_IDS_KEY);
            if (savedSelected) {
                try {
                    const ids = JSON.parse(savedSelected);
                    selectedPrintIds = new Set(ids.map(id => parseInt(id)));
                } catch (e) {
                    selectedPrintIds = new Set();
                }
            }
            
            renderBoxTable();
            
            // استكمال العد التنازلي للتراجع بعد refresh (بعد renderBoxTable)
            setTimeout(() => {
                allBoxData.forEach(row => {
                    if (row.isUndoActive && row.undoEndTime) {
                        const now = Date.now();
                        const timeLeft = Math.max(0, Math.ceil((row.undoEndTime - now) / 1000));
                        if (timeLeft > 0) {
                            // استكمال العد
                            startUndoTimer(row.id, timeLeft);
                        } else {
                            // انتهى الوقت - تنظيف كامل
                            row.isUndoActive = false;
                            row.undoEndTime = null; // تنظيف undoEndTime
                            saveData();
                            renderBoxTable();
                        }
                    } else if (row.isUndoActive && !row.undoEndTime) {
                        // حالة غير صحيحة - تنظيف
                        row.isUndoActive = false;
                        saveData();
                        renderBoxTable();
                    }
                });
            }, 100);
        }

        function createNewRowObj() {
            allBoxData.push({
                id: allBoxData.length + 1,
                employee: "",
                reserve: 0,
                exp: 0,
                time: "--:--",
                cash: 0,
                tempExp: 0,
                network: 0,
                transfer: 0,
                prog: 0,
                note: "",
                closed: false
            });
            saveData();
        }

        function renderBoxTable() {
            const tbody = document.getElementById('tbodyBox');
            if (!tbody) return;
            tbody.innerHTML = '';
            const viewData = [...allBoxData].reverse();
            const totalPages = Math.ceil(viewData.length / ITEMS_PER_PAGE);
            if (currentPage > totalPages) currentPage = totalPages > 0 ? totalPages : 1;
            const start = (currentPage - 1) * ITEMS_PER_PAGE;
            const end = start + ITEMS_PER_PAGE;
            const pageItems = viewData.slice(start, end);

            pageItems.forEach((row, index) => {
                const tr = document.createElement('tr');
                tr.dataset.id = row.id;
                if (row.closed) {
                    tr.classList.add('closed-row');
                } else if (index === 0) {
                    // الصف الأول النشط (غير المغلق) - الصف الحالي للعمل
                    tr.classList.add('active-row');
                }

                const v = (parseFloat(row.cash) || 0) + (parseFloat(row.network) || 0) + (parseFloat(row.transfer) || 0) + (parseFloat(row.exp) || 0) + (parseFloat(row.tempExp) || 0) + (parseFloat(row.reserve) || 0) - (parseFloat(row.prog) || 0);
                const varColor = v === 0 ? '#4ade80' : (v < 0 ? '#f87171' : '#2CB1E1');

                const ev = `contenteditable onfocus="handleCellFocus(this)" onblur="handleCellBlur(${row.id}, this)" oninput="updateRow(${row.id}, this)" onkeydown="handleCellKeydown(event, ${row.id}, this)"`;
                const empEv = `contenteditable onfocus="if(this.innerText==='اكتب اسمك')this.innerText='';" onblur="updateRow(${row.id}, this)" oninput="validateNameInput(this); updateRow(${row.id}, this)"`;

                const employeeDisp = row.employee && row.employee !== "" ? row.employee : (row.closed ? "" : "اكتب اسمك");
                const cashAttr = row.isCalcCash ? 'data-from-calc="true"' : '';

                const isChecked = selectedPrintIds.has(row.id);
                const chk = row.closed ? `<input type="checkbox" class="print-chk" value="${row.id}" ${isChecked ? 'checked' : ''}> ${row.id}` : `<span style="opacity:0.6;">${row.id}</span>`;
                const noteHtml = row.note ? `<span onclick="showNote(${row.id})" style="cursor:pointer; font-size:20px;">📖</span>` : '';

                let actionHtml = '';
                if (row.closed) {
                    // التحقق من أن undoEndTime موجود وصالح
                    if (row.isUndoActive && row.undoEndTime) {
                        const now = Date.now();
                        const timeLeft = Math.max(0, Math.ceil((row.undoEndTime - now) / 1000));
                        if (timeLeft > 0) {
                            // حساب الوقت المتبقي
                            actionHtml = `<div class="undo-container"><button class="btn-box btn-box-red" onclick="undoClose(${row.id})">تراجع (<span id="undoTimer-${row.id}">${timeLeft}</span>)</button></div>🔒 مغلق`;
                        } else {
                            // انتهى الوقت - تنظيف
                            row.isUndoActive = false;
                            row.undoEndTime = null;
                            actionHtml = '🔒 مغلق';
                        }
                        } else {
                            // انتهى الوقت - تنظيف
                            row.isUndoActive = false;
                            row.undoEndTime = null;
                            saveData(); // حفظ التغييرات
                            actionHtml = '🔒 مغلق';
                        }
                }

                tr.innerHTML = `<td>${chk}</td>
                        <td ${row.closed ? '' : empEv} data-field="employee">${employeeDisp}</td>
                        <td ${row.closed ? '' : ev} data-field="reserve">${formatNumber(row.reserve)}</td>
                        <td ${row.closed ? '' : ev} data-field="exp">${formatNumber(row.exp)}</td>
                        <td>${row.time}</td>
                        <td ${row.closed ? '' : ev} data-field="cash" ${cashAttr}>${formatNumber(row.cash)}</td>
                        <td ${row.closed ? '' : ev} data-field="tempExp">${formatNumber(row.tempExp)}</td>
                        <td ${row.closed ? '' : ev} data-field="network">${formatNumber(row.network)}</td>
                        <td ${row.closed ? '' : ev} data-field="transfer">${formatNumber(row.transfer)}</td>
                        <td ${row.closed ? '' : ev} data-field="prog">${formatNumber(row.prog)}</td>
                        <td style="font-weight:bold; color:${varColor}">${formatNumber(v)}</td>
                        <td>${noteHtml}</td>
                        <td>${actionHtml}</td>`;
                tbody.appendChild(tr);
            });
            renderPagination(totalPages);
            if (viewData[0]) updateCards(viewData[0]);
            
            // إضافة event listeners للـ checkboxes بعد إعادة الرسم
            document.querySelectorAll('.print-chk').forEach(checkbox => {
                checkbox.addEventListener('change', function() {
                    const rowId = parseInt(this.value);
                    if (this.checked) {
                        selectedPrintIds.add(rowId);
                    } else {
                        selectedPrintIds.delete(rowId);
                    }
                    // حفظ الحالة في localStorage
                    localStorage.setItem(SELECTED_PRINT_IDS_KEY, JSON.stringify(Array.from(selectedPrintIds)));
                    // تحديث حالة checkbox الرئيسي
                    updateSelectAllCheckbox();
                });
            });
            
            // إضافة event listener لـ checkbox الرئيسي
            const selectAllCheckbox = document.getElementById('selectAllCheckbox');
            if (selectAllCheckbox) {
                selectAllCheckbox.onchange = function() {
                    toggleSelectAll(this.checked);
                };
                // تحديث حالة checkbox الرئيسي
                updateSelectAllCheckbox();
            }
        }
        
        function toggleSelectAll(checked) {
            // الحصول على جميع الصفوف المغلقة
            const closedRows = allBoxData.filter(r => r.closed);
            
            if (checked) {
                // تحديد جميع الصفوف المغلقة
                closedRows.forEach(row => {
                    selectedPrintIds.add(row.id);
                });
            } else {
                // إلغاء تحديد جميع الصفوف
                closedRows.forEach(row => {
                    selectedPrintIds.delete(row.id);
                });
            }
            
            // حفظ الحالة
            localStorage.setItem(SELECTED_PRINT_IDS_KEY, JSON.stringify(Array.from(selectedPrintIds)));
            
            // إعادة رسم الجدول لتحديث checkboxes
            renderBoxTable();
        }
        
        function updateSelectAllCheckbox() {
            const selectAllCheckbox = document.getElementById('selectAllCheckbox');
            if (!selectAllCheckbox) return;
            
            // الحصول على جميع الصفوف المغلقة
            const closedRows = allBoxData.filter(r => r.closed);
            
            if (closedRows.length === 0) {
                selectAllCheckbox.checked = false;
                selectAllCheckbox.indeterminate = false;
                return;
            }
            
            // التحقق من عدد الصفوف المحددة
            const selectedCount = closedRows.filter(r => selectedPrintIds.has(r.id)).length;
            
            if (selectedCount === 0) {
                selectAllCheckbox.checked = false;
                selectAllCheckbox.indeterminate = false;
            } else if (selectedCount === closedRows.length) {
                selectAllCheckbox.checked = true;
                selectAllCheckbox.indeterminate = false;
            } else {
                selectAllCheckbox.checked = false;
                selectAllCheckbox.indeterminate = true; // حالة وسطية (بعض الصفوف محددة)
            }
        }

        window.showNote = function (id) {
            const row = allBoxData.find(r => r.id === id);
            const txt = row && row.note ? row.note : 'لا توجد ملاحظات مسجلة لهذا الصف.';
            const overlay = document.getElementById('modalOverlay');
            if (!overlay) {
                alert(txt);
                return;
            }
            document.getElementById('modalTitle').innerText = 'ملاحظة التقفيلة';
            document.getElementById('modalBody').innerText = txt;
            const actions = document.getElementById('modalActions');
            actions.innerHTML = '';
            const okBtn = document.createElement('button');
            okBtn.className = 'btn-modal btn-modal-primary';
            okBtn.innerText = 'إغلاق';
            okBtn.onclick = hideModal;
            actions.appendChild(okBtn);
            overlay.style.display = 'flex';
        };

        function renderPagination(total) {
            const container = document.getElementById('paginationControls');
            if (!container) return;
            container.innerHTML = '';
            if (total <= 1) return;
            
            // إذا كان عدد الصفحات 5 أو أقل، اعرض كل الصفحات
            if (total <= 5) {
                for (let i = 1; i <= total; i++) {
                    const btn = document.createElement('button');
                    btn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
                    btn.innerText = i;
                    btn.onclick = () => {
                        currentPage = i;
                        renderBoxTable();
                    };
                    container.appendChild(btn);
                }
                return;
            }
            
            // إذا كان عدد الصفحات أكثر من 5، اعرض 5 صفحات مع أسهم
            const PAGES_TO_SHOW = 5;
            let startPage = Math.max(1, currentPage - Math.floor(PAGES_TO_SHOW / 2));
            let endPage = Math.min(total, startPage + PAGES_TO_SHOW - 1);
            
            // تعديل startPage إذا كنا في النهاية
            if (endPage - startPage < PAGES_TO_SHOW - 1) {
                startPage = Math.max(1, endPage - PAGES_TO_SHOW + 1);
            }
            
            // سهم للرجوع (السابق)
            if (startPage > 1) {
                const prevArrow = document.createElement('button');
                prevArrow.className = 'page-nav-arrow';
                prevArrow.innerHTML = '◀';
                prevArrow.title = 'الصفحات السابقة';
                prevArrow.onclick = () => {
                    currentPage = Math.max(1, startPage - PAGES_TO_SHOW);
                    renderBoxTable();
                };
                container.appendChild(prevArrow);
            }
            
            // عرض الصفحات
            for (let i = startPage; i <= endPage; i++) {
                const btn = document.createElement('button');
                btn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
                btn.innerText = i;
                btn.onclick = () => {
                    currentPage = i;
                    renderBoxTable();
                };
                container.appendChild(btn);
            }
            
            // سهم للمتابعة (التالي)
            if (endPage < total) {
                const nextArrow = document.createElement('button');
                nextArrow.className = 'page-nav-arrow right';
                nextArrow.innerHTML = '▶';
                nextArrow.title = 'الصفحات التالية';
                nextArrow.onclick = () => {
                    currentPage = Math.min(total, endPage + 1);
                    renderBoxTable();
                };
                container.appendChild(nextArrow);
            }
        }

        window.handleCellFocus = function (el) {
            el.dataset.oldVal = el.innerText;
            if (el.dataset.field === 'cash' && el.dataset.fromCalc === 'true') {
                showConfirm('هذه القيمة تم جلبها من الحاسبة. هل تود تغيير المبلغ يدوياً؟', function () {
                    el.dataset.fromCalc = 'false';
                    const rowId = el.parentElement.dataset.id;
                    const row = allBoxData.find(r => r.id == rowId);
                    if (row) {
                        row.isCalcCash = false;
                        saveData();
                    }
                    el.focus();
                });
                el.blur();
                return;
            }
            el.innerText = '';
        };

        window.handleCellBlur = function (id, el) {
            if (el.innerText.trim() === '') el.innerText = el.dataset.oldVal || '0';
            updateRow(id, el);
        };
        
        // معالجة Enter و Tab في الخلايا - الانتقال لزر إغلاق الصندوق من خانة الإيراد
        window.handleCellKeydown = function (e, id, el) {
            const field = el.dataset.field;
            
            // إذا كانت الخانة هي "ايراد البرنامج" (prog)
            if (field === 'prog') {
                if (e.key === 'Enter' || e.key === 'Tab') {
                    e.preventDefault();
                    // حفظ التغييرات أولاً
                    updateRow(id, el);
                    // الانتقال إلى زر إغلاق الصندوق
                    setTimeout(() => {
                        const closeBtn = document.getElementById('btnCloseShift');
                        if (closeBtn) {
                            closeBtn.focus();
                            // إذا كان Tab، فقط الانتقال (لا إغلاق)
                            // إذا كان Enter، نضع علامة للـ Enter التالي يغلق الصندوق
                            if (e.key === 'Enter') {
                                // وضع علامة على الزر أنه جاهز للإغلاق عند Enter التالي
                                closeBtn.dataset.readyToClose = 'true';
                            } else if (e.key === 'Tab') {
                                // عند Tab، إزالة أي علامة سابقة
                                closeBtn.dataset.readyToClose = 'false';
                            }
                        }
                    }, 50);
                }
            }
        };

        // معالجة Enter في زر إغلاق الصندوق
        window.handleCloseShiftKeydown = function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                e.stopPropagation();
                // إذا كان الزر جاهز للإغلاق (من Enter السابق في خانة الإيراد)
                if (e.target.dataset.readyToClose === 'true') {
                    e.target.dataset.readyToClose = 'false';
                    window.closeShift();
                } else {
                    // إذا كان Enter عادي، فقط إغلاق الصندوق
                    window.closeShift();
                }
            }
        };
        
        window.validateNameInput = function (el) {
            const val = el.innerText;
            if (/[0-9]/.test(val)) {
                el.innerText = val.replace(/[0-9]/g, '');
                const range = document.createRange();
                const sel = window.getSelection();
                range.selectNodeContents(el);
                range.collapse(false);
                sel.removeAllRanges();
                sel.addRange(range);
            }
        };

        window.updateRow = function (id, el) {
            const row = allBoxData.find(r => r.id === id);
            if (!row) return;
            const field = el.dataset.field;
            if (field === 'employee') {
                row.employee = el.innerText.trim() === 'اكتب اسمك' ? '' : el.innerText.trim();
                if (row.employee) {
                    localStorage.setItem('cashboxEmployee', row.employee);
                    boxGreet();
                }
                saveData();
                return;
            }
            if (field) row[field] = el.innerText;
            saveData();
            updateCards(row);
            const tr = el.parentElement;
            if (tr && tr.cells && tr.cells[10]) {
                const v = (parseFloat(row.cash) || 0) + (parseFloat(row.network) || 0) + (parseFloat(row.transfer) || 0) + (parseFloat(row.exp) || 0) + (parseFloat(row.tempExp) || 0) + (parseFloat(row.reserve) || 0) - (parseFloat(row.prog) || 0);
                tr.cells[10].innerText = formatNumber(v);
                tr.cells[10].style.color = v === 0 ? '#4ade80' : (v < 0 ? '#f87171' : '#2CB1E1');
                // تم إزالة notifyVariance من هنا - سيظهر فقط عند إغلاق الصندوق
            }
        };

        function notifyVariance(v) {
            const now = Date.now();
            if (now - lastVarianceToastTime < 3500) return;
            lastVarianceToastTime = now;

            if (v === 0) {
                showToast(`🎉 ممتاز! الانحراف صفر.`, 'success');
            } else if (v > 0) {
                showToast(`⚠️ تنبيه: يوجد زيادة (فائض) في الصندوق بمقدار ${formatNumber(v)}`, 'info');
            } else {
                showToast(`⚠️ تنبيه: يوجد عجز في الصندوق بمقدار ${formatNumber(Math.abs(v))}`, 'error');
            }
        }

        function updateCards(row) {
            if (!row) return;
            const d = row;
            const metRev = document.getElementById('metRev');
            const metCash = document.getElementById('metCash');
            const metNet = document.getElementById('metNet');
            const metExp = document.getElementById('metExp');
            const metVar = document.getElementById('metVar');
            
            if (metRev) metRev.innerText = formatNumber(d.prog);
            if (metCash) metCash.innerText = formatNumber((parseFloat(d.cash) || 0) + (parseFloat(d.reserve) || 0));
            if (metNet) metNet.innerText = formatNumber((parseFloat(d.network) || 0) + (parseFloat(d.transfer) || 0));
            if (metExp) metExp.innerText = formatNumber((parseFloat(d.exp) || 0) + (parseFloat(d.tempExp) || 0));
            const v = (parseFloat(d.cash) || 0) + (parseFloat(d.network) || 0) + (parseFloat(d.transfer) || 0) + (parseFloat(d.exp) || 0) + (parseFloat(d.tempExp) || 0) + (parseFloat(d.reserve) || 0) - (parseFloat(d.prog) || 0);
            if (metVar) metVar.innerText = formatNumber(v);
        }

        window.closeShift = function () {
            const rowsDOM = document.querySelectorAll('#tbodyBox tr');
            if (rowsDOM.length === 0) return;
            const activeTR = rowsDOM[0];
            if (activeTR.classList.contains('closed-row')) return;

            const rowId = parseInt(activeTR.dataset.id);
            const row = allBoxData.find(r => r.id === rowId);
            if (!row) return;

            const empName = row.employee ? row.employee.trim() : "";
            if (!empName || !/[a-zA-Z\u0600-\u06FF]/.test(empName)) {
                showToast("⚠️ يجب كتابة اسم الموظف (أحرف) قبل الإغلاق.", "error");
                return;
            }
            const progVal = parseFloat(row.prog);
            if (!progVal || progVal <= 0) {
                showToast("⚠️ يجب إدخال إيراد البرنامج قبل الإغلاق.", "error");
                return;
            }

            // حساب الانحراف وعرض التنبيه
            const v = (parseFloat(row.cash) || 0) + (parseFloat(row.network) || 0) + (parseFloat(row.transfer) || 0) + (parseFloat(row.exp) || 0) + (parseFloat(row.tempExp) || 0) + (parseFloat(row.reserve) || 0) - (parseFloat(row.prog) || 0);
            notifyVariance(v);

            let currentNote = document.getElementById('txtShiftNotes') ? document.getElementById('txtShiftNotes').value : '';
            const isNoteEmpty = !currentNote || currentNote.trim() === "";

            const overlay = document.getElementById('modalOverlay');
            if (!overlay) return;
            document.getElementById('modalTitle').innerText = 'تأكيد العملية';

            let bodyHtml = 'هل تريد إغلاق الصندوق؟';
            if (isNoteEmpty) {
                bodyHtml += '<br><div style="margin-top:10px; font-size:12px; color:#bbb;">ملاحظات سريعة على التقفيلة:</div><textarea id="modalNoteInput"></textarea>';
            }
            document.getElementById('modalBody').innerHTML = bodyHtml;

            const actions = document.getElementById('modalActions');
            actions.innerHTML = '';
            const cancelBtn = document.createElement('button');
            cancelBtn.className = 'btn-modal btn-modal-secondary';
            cancelBtn.innerText = 'رجوع';
            cancelBtn.onclick = hideModal;

            const okBtn = document.createElement('button');
            okBtn.className = 'btn-modal btn-modal-primary';
            okBtn.innerText = 'تأكيد';
            okBtn.onclick = function () {
                if (isNoteEmpty) {
                    const modalNote = document.getElementById('modalNoteInput');
                    row.note = modalNote ? modalNote.value : '';
                } else {
                    row.note = currentNote;
                }
                const txtNotes = document.getElementById('txtShiftNotes');
                if (txtNotes) txtNotes.value = "";
                hideModal();
                performClose(row);
            };
            actions.appendChild(cancelBtn);
            actions.appendChild(okBtn);
            overlay.style.display = 'flex';
        };

        function startUndoTimer(rowId, initialTime) {
            const row = allBoxData.find(r => r.id === rowId);
            if (!row) return;
            
            // حفظ وقت انتهاء العد
            if (!row.undoEndTime) {
                row.undoEndTime = Date.now() + (initialTime * 1000);
                saveData();
            }
            
            // إلغاء أي timer سابق
            if (undoTimer) {
                clearInterval(undoTimer);
                undoTimer = null;
            }
            
            // حساب الوقت المتبقي الفعلي
            const now = Date.now();
            let timeLeft = Math.max(0, Math.ceil((row.undoEndTime - now) / 1000));
            
            // تحديث العرض فوراً
            const timerSpan = document.getElementById(`undoTimer-${rowId}`);
            if (timerSpan) timerSpan.innerText = timeLeft;
            
            undoTimer = setInterval(() => {
                const currentRow = allBoxData.find(r => r.id === rowId);
                if (!currentRow || !currentRow.isUndoActive) {
                    clearInterval(undoTimer);
                    undoTimer = null;
                    return;
                }
                
                // حساب الوقت المتبقي من undoEndTime
                const currentTime = Date.now();
                timeLeft = Math.max(0, Math.ceil((currentRow.undoEndTime - currentTime) / 1000));
                
                const timerElement = document.getElementById(`undoTimer-${rowId}`);
                if (timerElement) timerElement.innerText = timeLeft;
                
                if (timeLeft <= 0) {
                    clearInterval(undoTimer);
                    undoTimer = null;
                    // التأكد من تنظيف كل شيء
                    const finalRow = allBoxData.find(r => r.id === rowId);
                    if (finalRow && finalRow.isUndoActive) {
                        finalizeClose(rowId);
                    }
                }
            }, 1000);
        }

        function performClose(row) {
            row.closed = true;
            row.isUndoActive = true;
            const now = new Date();
            row.time = now.toLocaleDateString('en-GB') + ' ' + now.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });
            row.undoEndTime = Date.now() + (30 * 1000); // 30 ثانية من الآن
            saveData();
            createNewRowObj();
            renderBoxTable();
            startUndoTimer(row.id, 30);
        }

        function finalizeClose(id) {
            clearInterval(undoTimer);
            const row = allBoxData.find(r => r.id === id);
            if (row) {
                row.isUndoActive = false;
                row.undoEndTime = null; // تنظيف undoEndTime
                saveData();
                renderBoxTable();
            }
        }

        window.undoClose = function (id) {
            clearInterval(undoTimer);
            undoTimer = null;
            allBoxData.pop();
            const row = allBoxData.find(r => r.id === id);
            if (row) {
                row.closed = false;
                row.isUndoActive = false;
                row.undoEndTime = null; // تنظيف undoEndTime
            }
            saveData();
            renderBoxTable();
            showToast("تم التراجع عن إغلاق التقفيلة.", "info");
        };

        function saveData() {
            localStorage.setItem(BOX_KEY, JSON.stringify(allBoxData));
        }

        let calcHistory = [];
        function addCalcHistory(exp, result) {
            const cleanExp = (exp || "").toString().replace(/\s+/g, '');
            calcHistory.unshift(`${cleanExp} = ${result}`);
            if (calcHistory.length > 10) calcHistory.pop();
            const box = document.getElementById('calcHistory');
            if (box) box.innerHTML = calcHistory.map(line => `<div class="calc-history-entry">${line}</div>`).join('');
        }

        window.validateCalcInput = function (el) {
            const val = el.value;
            if (!/^[0-9\+\-\*\/\.\(\)\s]*$/.test(val)) {
                el.value = val.slice(0, -1);
            }
        };

        window.cApp = function (v) {
            const disp = document.getElementById('cDisp');
            if (!disp) return;
            if (v === 'C') {
                disp.value = "";
                calcHistory = [];
                const historyBox = document.getElementById('calcHistory');
                if (historyBox) historyBox.innerHTML = "";
            } else if (v === '=') {
                try {
                    const safeExp = disp.value.replace(/[^0-9\+\-\*\/\.\(\)]/g, '');
                    if (!safeExp) return;
                    const res = eval(safeExp);
                    if (!isNaN(res)) {
                        addCalcHistory(disp.value, formatNumber(res));
                        disp.value = parseFloat(res.toFixed(2));
                    } else {
                        disp.value = "Error";
                    }
                } catch {
                    disp.value = "Error";
                }
            } else {
                disp.value += v;
            }
        };

        window.transferCalcResult = function () {
            const disp = document.getElementById('cDisp');
            if (!disp) return;
            let val = disp.value;

            try {
                const safeExp = val.toString().replace(/[^0-9\+\-\*\/\.\(\)]/g, '');
                if (!safeExp) {
                    showToast("⚠️ لا توجد قيمة للترحيل", "error");
                    return;
                }
                const calculated = eval(safeExp);
                if (isNaN(calculated) || !isFinite(calculated)) throw new Error("Invalid");
                val = parseFloat(calculated.toFixed(2)).toString();
            } catch (e) {
                showToast("⚠️ تأكد من العملية الحسابية أولاً", "error");
                return;
            }

            if (!val || isNaN(parseFloat(val))) {
                showToast("لا توجد قيمة صالحة للترحيل", "error");
                return;
            }

            const activeRowIndex = allBoxData.length - 1;
            const activeRow = allBoxData[activeRowIndex];
            if (activeRow.closed) {
                showToast("لا يوجد صندوق مفتوح للترحيل", "error");
                return;
            }

            const resultVal = formatNumber(val);

            showChoiceModal('ترحيل النتيجة', `اختر الخانة التي تريد ترحيل المبلغ النهائي (${resultVal}) إليها:`, [
                { label: '💳 شبكة', action: () => updateAndSave(activeRow, 'network', resultVal) },
                { label: '🏦 تحويل', action: () => updateAndSave(activeRow, 'transfer', resultVal) },
                { label: '📉 مصروف رسمي', action: () => updateAndSave(activeRow, 'exp', resultVal) },
                { label: '⏳ مصروف مؤقت', action: () => updateAndSave(activeRow, 'tempExp', resultVal) },
                { label: '💵 الكاش (تنبيه: سيستبدل القيمة)', action: () => updateAndSave(activeRow, 'cash', resultVal) }
            ]);
        };

        function updateAndSave(row, field, val) {
            row[field] = val;
            if (field === 'cash') row.isCalcCash = true;
            saveData();
            renderBoxTable();
            
            // إظهار تأثير الترحيل في الخانة المستهدفة
            setTimeout(() => {
                highlightTransferCell(row.id, field);
            }, 100);
            
            window.cApp('C');
            showToast(`تم ترحيل ${val} إلى ${field} وتصفير الحاسبة`, 'success');
        }
        
        // دالة لإظهار تأثير الترحيل في الخانة المستهدفة
        function highlightTransferCell(rowId, field) {
            const tr = document.querySelector(`tr[data-id="${rowId}"]`);
            if (!tr) return;
            
            const cell = tr.querySelector(`td[data-field="${field}"]`);
            if (!cell) return;
            
            // إضافة class للتأثير
            cell.classList.add('transfer-highlight');
            
            // إزالة class بعد 3 ثوانٍ
            setTimeout(() => {
                cell.classList.remove('transfer-highlight');
            }, 3000);
        }

        window.validateCashInput = function (el) {
            const regex = /[^0-9\u0660-\u0669\.]/g;
            if (regex.test(el.innerText)) {
                el.innerText = el.innerText.replace(regex, '');
            }
            window.recalcCash();
        };

        window.recalcCash = function () {
            let sum = 0;
            const rows = document.querySelectorAll('#tblCashCalc tr');
            rows.forEach(r => {
                let txtQty = r.cells[0].innerText;
                txtQty = txtQty.replace(/[٠-٩]/g, d => "٠١٢٣٤٥٦٧٨٩".indexOf(d));
                const qty = parseFloat(txtQty) || 0;
                const val = parseFloat(r.cells[1].innerText) || 0;
                sum += qty * val;
            });
            const lblCashSum = document.getElementById('lblCashSum');
            if (lblCashSum) lblCashSum.innerText = formatNumber(sum);
        };
        
        // دالة للانتقال للخانة السفلى في حاسبة الكاش
        window.moveToNextCashCell = function(currentCell) {
            const allCells = Array.from(document.querySelectorAll('#tblCashCalc td[contenteditable]'));
            const currentIndex = allCells.indexOf(currentCell);
            if (currentIndex >= 0 && currentIndex < allCells.length - 1) {
                const nextCell = allCells[currentIndex + 1];
                nextCell.focus();
                // تحديد النص إذا كان فارغاً أو يحتوي على 0
                if (nextCell.innerText === '0' || nextCell.innerText === '') {
                    const range = document.createRange();
                    range.selectNodeContents(nextCell);
                    const sel = window.getSelection();
                    sel.removeAllRanges();
                    sel.addRange(range);
                }
            }
        };
        
        // دالة لإعداد event listeners للـ Enter و Tab في حاسبة الكاش
        function setupCashCalcKeyboard() {
            const cashCells = document.querySelectorAll('#tblCashCalc td[contenteditable]');
            cashCells.forEach(cell => {
                // التحقق من وجود event listener مسبقاً
                if (cell.dataset.hasKeyboardListener === 'true') return;
                
                // إضافة event listener
                cell.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' || e.key === 'Tab') {
                        e.preventDefault();
                        window.moveToNextCashCell(this);
                    }
                });
                
                // وضع علامة لتجنب إضافة event listener مرة أخرى
                cell.dataset.hasKeyboardListener = 'true';
            });
        }
        
        // إعداد event listeners بعد تحميل الصفحة
        setTimeout(() => {
            setupCashCalcKeyboard();
        }, 500);

        window.transferToCash = function () {
            const lblCashSum = document.getElementById('lblCashSum');
            if (!lblCashSum) return;
            const sum = lblCashSum.innerText;
            if (parseFloat(sum) === 0) {
                showToast("المجموع صفر، لا يمكن الترحيل.", "info");
                return;
            }
            const activeRowIndex = allBoxData.length - 1;
            const row = allBoxData[activeRowIndex];
            if (!row || row.closed) {
                showToast("لا يوجد صف مفتوح للترحيل.", "info");
                return;
            }
            row.cash = sum;
            row.isCalcCash = true;
            saveData();
            renderBoxTable();
            
            // إظهار تأثير الترحيل في خانة الكاش
            setTimeout(() => {
                highlightTransferCell(row.id, 'cash');
            }, 100);
            
            document.querySelectorAll('#tblCashCalc td[contenteditable]').forEach(td => td.innerText = '');
            lblCashSum.innerText = '0';
            showToast("تم ترحيل المجموع للكاش وتصفير الحاسبة.", "success");
        };

        window.exportBoxExcel = function () {
            if (typeof XLSX === 'undefined') {
                showToast("مكتبة Excel غير محملة. يرجى الانتظار قليلاً.", "error");
                return;
            }
            const closed = allBoxData.filter(r => r.closed);
            if (closed.length === 0) {
                showToast("لا توجد تقفيلات مغلقة للتصدير.", "info");
                return;
            }
            try {
                const wb = XLSX.utils.book_new();
                
                // بيانات التقفيلات
                const data = [
                    ["تقرير التقفيلات المحاسبي - نظام الصندوق"],
                    ["تاريخ التصدير: " + new Date().toLocaleDateString('ar-SA')],
                    [""],
                    ["م", "الموظف", "الاحتياطي", "مصروف رسمي", "الوقت", "كاش", "مصروف مؤقت", "شبكة", "تحويل", "ايراد البرنامج", "الانحراف", "ملاحظات"]
                ];
                
                closed.forEach(r => {
                    const v = (parseFloat(r.cash) || 0) + (parseFloat(r.network) || 0) + (parseFloat(r.transfer) || 0) + (parseFloat(r.exp) || 0) + (parseFloat(r.tempExp) || 0) + (parseFloat(r.reserve) || 0) - (parseFloat(r.prog) || 0);
                    data.push([
                        r.id, 
                        r.employee || "", 
                        formatNumber(r.reserve), 
                        formatNumber(r.exp), 
                        r.time, 
                        formatNumber(r.cash), 
                        formatNumber(r.tempExp), 
                        formatNumber(r.network), 
                        formatNumber(r.transfer), 
                        formatNumber(r.prog), 
                        formatNumber(v), 
                        r.note || ""
                    ]);
                });
                
                // إضافة صف الإجماليات
                const totalCash = closed.reduce((sum, r) => sum + (parseFloat(r.cash) || 0) + (parseFloat(r.reserve) || 0), 0);
                const totalBank = closed.reduce((sum, r) => sum + (parseFloat(r.network) || 0) + (parseFloat(r.transfer) || 0), 0);
                const totalExp = closed.reduce((sum, r) => sum + (parseFloat(r.exp) || 0) + (parseFloat(r.tempExp) || 0), 0);
                const totalProg = closed.reduce((sum, r) => sum + (parseFloat(r.prog) || 0), 0);
                const totalVariance = totalCash + totalBank + totalExp - totalProg;
                
                data.push([""]);
                data.push(["الإجماليات", "", "", "", "", "", "", "", "", "", "", ""]);
                data.push([
                    "إجمالي النقدية", 
                    "", 
                    "", 
                    "", 
                    "", 
                    formatNumber(totalCash), 
                    "", 
                    "", 
                    "", 
                    "", 
                    "", 
                    ""
                ]);
                data.push([
                    "إجمالي البنك", 
                    "", 
                    "", 
                    "", 
                    "", 
                    "", 
                    "", 
                    formatNumber(totalBank), 
                    "", 
                    "", 
                    "", 
                    ""
                ]);
                data.push([
                    "إجمالي المصروفات", 
                    "", 
                    "", 
                    formatNumber(totalExp), 
                    "", 
                    "", 
                    "", 
                    "", 
                    "", 
                    "", 
                    "", 
                    ""
                ]);
                data.push([
                    "إجمالي الإيراد", 
                    "", 
                    "", 
                    "", 
                    "", 
                    "", 
                    "", 
                    "", 
                    "", 
                    formatNumber(totalProg), 
                    "", 
                    ""
                ]);
                data.push([
                    "إجمالي الانحراف", 
                    "", 
                    "", 
                    "", 
                    "", 
                    "", 
                    "", 
                    "", 
                    "", 
                    "", 
                    formatNumber(totalVariance), 
                    ""
                ]);
                
                const ws = XLSX.utils.aoa_to_sheet(data);
                
                // تحديد عرض الأعمدة بشكل أفضل
                ws['!cols'] = [
                    { wch: 5 },   // م
                    { wch: 15 },  // الموظف
                    { wch: 12 },  // الاحتياطي
                    { wch: 12 },  // مصروف رسمي
                    { wch: 20 },  // الوقت
                    { wch: 12 },  // كاش
                    { wch: 12 },  // مصروف مؤقت
                    { wch: 12 },  // شبكة
                    { wch: 12 },  // تحويل
                    { wch: 15 },  // ايراد البرنامج
                    { wch: 12 },  // الانحراف
                    { wch: 30 }   // ملاحظات
                ];
                
                // تنسيق صف العنوان (الصف 1)
                if (ws['A1']) {
                    if (!ws['A1'].s) ws['A1'].s = {};
                    ws['A1'].s.font = { bold: true, sz: 18, color: { rgb: "FFFFFF" } };
                    ws['A1'].s.fill = { fgColor: { rgb: "2E75B6" } };
                    ws['A1'].s.alignment = { horizontal: "center", vertical: "center" };
                    ws['A1'].s.border = {
                        top: { style: "medium", color: { rgb: "000000" } },
                        bottom: { style: "medium", color: { rgb: "000000" } },
                        left: { style: "medium", color: { rgb: "000000" } },
                        right: { style: "medium", color: { rgb: "000000" } }
                    };
                    if (!ws['!merges']) ws['!merges'] = [];
                    ws['!merges'].push({ s: { r: 0, c: 0 }, e: { r: 0, c: 11 } });
                    if (!ws['!rows']) ws['!rows'] = [];
                    ws['!rows'][0] = { hpt: 30 };
                }
                
                // تنسيق صف التاريخ (الصف 2)
                if (ws['A2']) {
                    if (!ws['A2'].s) ws['A2'].s = {};
                    ws['A2'].s.font = { bold: true, sz: 12, color: { rgb: "333333" } };
                    ws['A2'].s.fill = { fgColor: { rgb: "E7E6E6" } };
                    ws['A2'].s.alignment = { horizontal: "center", vertical: "center" };
                    ws['A2'].s.border = {
                        top: { style: "thin", color: { rgb: "000000" } },
                        bottom: { style: "thin", color: { rgb: "000000" } },
                        left: { style: "thin", color: { rgb: "000000" } },
                        right: { style: "thin", color: { rgb: "000000" } }
                    };
                    if (!ws['!merges']) ws['!merges'] = [];
                    ws['!merges'].push({ s: { r: 1, c: 0 }, e: { r: 1, c: 11 } });
                    if (!ws['!rows']) ws['!rows'] = [];
                    ws['!rows'][1] = { hpt: 22 };
                }
                
                // تنسيق الصف الفارغ (الصف 3) - إخفاء الحدود
                if (ws['A3'] && ws['A3'].v === "") {
                    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'].forEach((col) => {
                        const cellRef = col + '3';
                        if (ws[cellRef]) {
                            if (!ws[cellRef].s) ws[cellRef].s = {};
                            ws[cellRef].s.fill = { fgColor: { rgb: "FFFFFF" } };
                        }
                    });
                    if (!ws['!rows']) ws['!rows'] = [];
                    ws['!rows'][2] = { hpt: 8 };
                }
                
                // تنسيق العناوين (الصف 4 - رؤوس الأعمدة)
                const headerRow = 4;
                ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'].forEach((col) => {
                    const cellRef = col + headerRow;
                    if (ws[cellRef]) {
                        if (!ws[cellRef].s) ws[cellRef].s = {};
                        ws[cellRef].s.font = { bold: true, sz: 12, color: { rgb: "FFFFFF" } };
                        ws[cellRef].s.fill = { fgColor: { rgb: "4472C4" } };
                        ws[cellRef].s.alignment = { horizontal: "center", vertical: "center", wrapText: true };
                        ws[cellRef].s.border = {
                            top: { style: "medium", color: { rgb: "000000" } },
                            bottom: { style: "medium", color: { rgb: "000000" } },
                            left: { style: "thin", color: { rgb: "FFFFFF" } },
                            right: { style: "thin", color: { rgb: "FFFFFF" } }
                        };
                    }
                });
                if (!ws['!rows']) ws['!rows'] = [];
                ws['!rows'][headerRow - 1] = { hpt: 25 };
                
                // تنسيق صف البيانات - ألوان متناوبة
                const totalRowStart = data.length - 5; // بداية صفوف الإجماليات
                for (let row = headerRow + 1; row < totalRowStart; row++) {
                    const isEven = (row - headerRow) % 2 === 0;
                    const bgColor = isEven ? "FFFFFF" : "F2F2F2";
                    
                    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'].forEach((col) => {
                        const cellRef = col + row;
                        if (ws[cellRef]) {
                            if (!ws[cellRef].s) ws[cellRef].s = {};
                            ws[cellRef].s.fill = { fgColor: { rgb: bgColor } };
                            ws[cellRef].s.border = {
                                top: { style: "thin", color: { rgb: "CCCCCC" } },
                                bottom: { style: "thin", color: { rgb: "CCCCCC" } },
                                left: { style: "thin", color: { rgb: "CCCCCC" } },
                                right: { style: "thin", color: { rgb: "CCCCCC" } }
                            };
                            
                            // تنسيق خاص للأعمدة النصية
                            if (col === 'A') {
                                ws[cellRef].s.alignment = { horizontal: "center", vertical: "center" };
                                ws[cellRef].s.font = { bold: true, sz: 11 };
                            } else if (col === 'B' || col === 'E' || col === 'L') {
                                ws[cellRef].s.alignment = { horizontal: "right", vertical: "center" };
                                ws[cellRef].s.font = { sz: 11 };
                            }
                        }
                    });
                }
                
                // تنسيق الأرقام في صفوف البيانات
                for (let row = headerRow + 1; row < totalRowStart; row++) {
                    ['C', 'D', 'F', 'G', 'H', 'I', 'J', 'K'].forEach((col) => {
                        const cellRef = col + row;
                        if (ws[cellRef] && ws[cellRef].v !== undefined && ws[cellRef].v !== "") {
                            const val = ws[cellRef].v;
                            if (typeof val === 'number' || (!isNaN(parseFloat(val)) && val !== '')) {
                                if (!ws[cellRef].s) ws[cellRef].s = {};
                                ws[cellRef].s.alignment = { horizontal: "right", vertical: "center" };
                                ws[cellRef].s.numFmt = '#,##0.00';
                                ws[cellRef].s.font = { sz: 11 };
                            }
                        }
                    });
                }
                
                // تنسيق صف "الإجماليات" (الصف قبل الإجماليات)
                const totalLabelRow = totalRowStart - 1;
                if (ws['A' + (totalLabelRow + 1)]) {
                    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'].forEach((col) => {
                        const cellRef = col + (totalLabelRow + 1);
                        if (ws[cellRef]) {
                            if (!ws[cellRef].s) ws[cellRef].s = {};
                            ws[cellRef].s.fill = { fgColor: { rgb: "D9E1F2" } };
                            ws[cellRef].s.font = { bold: true, sz: 12 };
                            ws[cellRef].s.alignment = { horizontal: "center", vertical: "center" };
                            ws[cellRef].s.border = {
                                top: { style: "medium", color: { rgb: "000000" } },
                                bottom: { style: "thin", color: { rgb: "000000" } },
                                left: { style: "thin", color: { rgb: "000000" } },
                                right: { style: "thin", color: { rgb: "000000" } }
                            };
                        }
                    });
                    if (!ws['!merges']) ws['!merges'] = [];
                    ws['!merges'].push({ s: { r: totalLabelRow, c: 0 }, e: { r: totalLabelRow, c: 11 } });
                }
                
                // تنسيق صفوف الإجماليات
                const totalColors = ["E2EFDA", "FFF2CC", "FCE4D6", "DEEBF7", "E2E2E2"];
                let colorIndex = 0;
                for (let row = totalRowStart; row < data.length; row++) {
                    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'].forEach((col) => {
                        const cellRef = col + (row + 1);
                        if (ws[cellRef]) {
                            if (!ws[cellRef].s) ws[cellRef].s = {};
                            ws[cellRef].s.fill = { fgColor: { rgb: totalColors[colorIndex] || "E7E6E6" } };
                            ws[cellRef].s.font = { bold: true, sz: 12 };
                            ws[cellRef].s.alignment = { horizontal: "right", vertical: "center" };
                            ws[cellRef].s.border = {
                                top: { style: "thin", color: { rgb: "000000" } },
                                bottom: { style: row === data.length - 1 ? "medium" : "thin", color: { rgb: "000000" } },
                                left: { style: "thin", color: { rgb: "000000" } },
                                right: { style: "thin", color: { rgb: "000000" } }
                            };
                            
                            // تنسيق الأرقام في الإجماليات
                            if (['C', 'D', 'F', 'G', 'H', 'I', 'J', 'K'].includes(col) && ws[cellRef].v !== undefined && ws[cellRef].v !== "") {
                                const val = ws[cellRef].v;
                                if (typeof val === 'number' || (!isNaN(parseFloat(val)) && val !== '')) {
                                    ws[cellRef].s.numFmt = '#,##0.00';
                                }
                            }
                        }
                    });
                    colorIndex++;
                }
                
                XLSX.utils.book_append_sheet(wb, ws, "التقفيلات");
                XLSX.writeFile(wb, `تقفيلات_الصندوق_${new Date().toISOString().split('T')[0]}.xlsx`);
                showToast(`✅ تم تصدير ${closed.length} تقفيلة بنجاح`, "success");
            } catch (error) {
                showToast("❌ حدث خطأ أثناء التصدير: " + error.message, "error");
                console.error("Export error:", error);
            }
        };

        function boxGreet() {
            const h = new Date().getHours();
            const base = h < 12 ? "صباح الخير 🌞" : "مساء الخير 🌙";
            const emp = localStorage.getItem('cashboxEmployee') || "";
            const greetEl = document.getElementById('boxGreet');
            if (greetEl) greetEl.innerText = emp ? `${base} يا ${emp}` : base;
        }

        document.addEventListener('keydown', function (e) {
            const activeView = document.getElementById('cashbox-container');
            if (!activeView) return;
            const target = e.target;
            if (target.tagName === 'TEXTAREA' || target.isContentEditable) return;
            if (target.id === 'cDisp') {
                if (e.key === 'Enter') {
                    window.cApp('=');
                    e.preventDefault();
                }
                return;
            }
            const key = e.key;
            const arabicDigits = '٠١٢٣٤٥٦٧٨٩';
            if (arabicDigits.indexOf(key) >= 0) {
                window.cApp(arabicDigits.indexOf(key).toString());
            } else if (/[0-9]/.test(key)) {
                window.cApp(key);
            } else if (['+', '-', '*', '/', '.'].includes(key)) {
                window.cApp(key);
            } else if (key === 'Enter' || key === '=') {
                window.cApp('=');
                e.preventDefault();
            } else if (key === 'Backspace') {
                const d = document.getElementById('cDisp');
                if (d) {
                    d.value = d.value.slice(0, -1);
                    e.preventDefault();
                }
            }
        });

        window.printLastShift = function () {
            const closedRows = allBoxData.filter(r => r.closed);
            if (closedRows.length === 0) {
                showToast("لا توجد تقفيلات مغلقة للطباعة.", "info");
                return;
            }
            // آخر تقفيلة = آخر صف مغلق (الأحدث)
            const r = closedRows[closedRows.length - 1];
            const cash = parseFloat(r.cash) || 0, reserve = parseFloat(r.reserve) || 0, totalCash = cash + reserve;
            const net = parseFloat(r.network) || 0, transfer = parseFloat(r.transfer) || 0, totalBank = net + transfer;
            const exp = parseFloat(r.exp) || 0, tempExp = parseFloat(r.tempExp) || 0, totalExp = exp + tempExp;
            const prog = parseFloat(r.prog) || 0, actualTotal = totalCash + totalBank + totalExp, variance = actualTotal - prog;
            const printDate = new Date().toLocaleDateString('ar-SA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

            const html = `
            <div class="prof-report-container">
                <div class="prof-header" style="background: #e9ecef; color: #000; padding: 20px; border: 2px solid #000; margin-bottom: 20px;">
                    <h1 style="margin: 0 0 15px 0; font-size: 24px; font-weight: 900; color: #000;">تقرير إغلاق الصندوق المحاسبي</h1>
                    <div class="prof-header-info" style="display: flex; flex-wrap: wrap; gap: 15px; font-size: 12px; background: #f8f9fa; padding: 12px; border: 1px solid #000;">
                        <span style="background: #fff; padding: 6px 12px; border: 1px solid #000;"><strong>رقم التقفيلة:</strong> ${r.id}</span>
                        <span style="background: #fff; padding: 6px 12px; border: 1px solid #000;"><strong>الموظف:</strong> ${r.employee || "غير محدد"}</span>
                        <span style="background: #fff; padding: 6px 12px; border: 1px solid #000;"><strong>تاريخ الإغلاق:</strong> ${r.time}</span>
                        <span style="background: #fff; padding: 6px 12px; border: 1px solid #000;"><strong>تاريخ الطباعة:</strong> ${printDate}</span>
                    </div>
                </div>
                
                <table class="prof-table" style="margin-bottom: 15px; border: 2px solid #000;">
                    <thead>
                        <tr>
                            <th colspan="2" style="background: #d3d3d3; color: #000; font-size: 14px; font-weight: 900; padding: 12px; border: 2px solid #000;">النقدية (Cash)</th>
                            <th colspan="2" style="background: #d3d3d3; color: #000; font-size: 14px; font-weight: 900; padding: 12px; border: 2px solid #000;">البنك (Bank)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="border-bottom: 1px solid #000;">
                            <td style="font-weight: 700; text-align: right; padding: 10px; background: #f8f9fa; border: 1px solid #000;">الكاش في الدرج</td>
                            <td style="font-weight: 700; padding: 10px; color: #000; font-size: 13px; border: 1px solid #000;">${formatNumber(cash)} ر.س</td>
                            <td style="font-weight: 700; text-align: right; padding: 10px; background: #f8f9fa; border: 1px solid #000;">شبكة</td>
                            <td style="font-weight: 700; padding: 10px; color: #000; font-size: 13px; border: 1px solid #000;">${formatNumber(net)} ر.س</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #000;">
                            <td style="font-weight: 700; text-align: right; padding: 10px; background: #f8f9fa; border: 1px solid #000;">الاحتياطي</td>
                            <td style="font-weight: 700; padding: 10px; color: #000; font-size: 13px; border: 1px solid #000;">${formatNumber(reserve)} ر.س</td>
                            <td style="font-weight: 700; text-align: right; padding: 10px; background: #f8f9fa; border: 1px solid #000;">تحويل بنكي</td>
                            <td style="font-weight: 700; padding: 10px; color: #000; font-size: 13px; border: 1px solid #000;">${formatNumber(transfer)} ر.س</td>
                        </tr>
                        <tr style="background: #d3d3d3; font-weight: 900; font-size: 14px; border-top: 3px solid #000;">
                            <td style="text-align: right; padding: 12px; color: #000; border: 1px solid #000;">إجمالي النقدية</td>
                            <td style="padding: 12px; color: #000; font-size: 16px; border: 1px solid #000;">${formatNumber(totalCash)} ر.س</td>
                            <td style="text-align: right; padding: 12px; color: #000; border: 1px solid #000;">إجمالي البنك</td>
                            <td style="padding: 12px; color: #000; font-size: 16px; border: 1px solid #000;">${formatNumber(totalBank)} ر.س</td>
                        </tr>
                    </tbody>
                </table>
                
                <table class="prof-table" style="margin-bottom: 15px; border: 2px solid #000;">
                    <thead>
                        <tr>
                            <th colspan="2" style="background: #d3d3d3; color: #000; font-size: 14px; font-weight: 900; padding: 12px; border: 2px solid #000;">المصروفات (Expenses)</th>
                            <th colspan="2" style="background: #d3d3d3; color: #000; font-size: 14px; font-weight: 900; padding: 12px; border: 2px solid #000;">المطابقة (Reconciliation)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="border-bottom: 1px solid #000;">
                            <td style="font-weight: 700; text-align: right; padding: 10px; background: #f8f9fa; border: 1px solid #000;">مصروف رسمي</td>
                            <td style="font-weight: 700; padding: 10px; color: #000; font-size: 13px; border: 1px solid #000;">${formatNumber(exp)} ر.س</td>
                            <td style="font-weight: 700; text-align: right; padding: 10px; background: #f8f9fa; border: 1px solid #000;">إيراد البرنامج</td>
                            <td style="font-weight: 700; padding: 10px; color: #000; font-size: 13px; border: 1px solid #000;">${formatNumber(prog)} ر.س</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #000;">
                            <td style="font-weight: 700; text-align: right; padding: 10px; background: #f8f9fa; border: 1px solid #000;">مصروف مؤقت</td>
                            <td style="font-weight: 700; padding: 10px; color: #000; font-size: 13px; border: 1px solid #000;">${formatNumber(tempExp)} ر.س</td>
                            <td style="font-weight: 700; text-align: right; padding: 10px; background: #f8f9fa; border: 1px solid #000;">الإجمالي الفعلي المحصل</td>
                            <td style="font-weight: 700; padding: 10px; color: #000; font-size: 13px; border: 1px solid #000;">${formatNumber(actualTotal)} ر.س</td>
                        </tr>
                        <tr style="background: #d3d3d3; font-weight: 900; font-size: 16px; border-top: 3px solid #000;">
                            <td style="text-align: right; padding: 12px; color: #000; border: 1px solid #000;">إجمالي المصروفات</td>
                            <td style="padding: 12px; color: #000; font-size: 18px; border: 1px solid #000;">${formatNumber(totalExp)} ر.س</td>
                            <td style="text-align: right; padding: 12px; color: #000; border: 1px solid #000;">العجز / الزيادة</td>
                            <td style="padding: 12px; color: #000; font-size: 18px; font-weight: 900; border: 1px solid #000;">
                                ${variance === 0 ? '✓ متوازن' : (variance < 0 ? 'عجز' : 'زيادة')} ${formatNumber(Math.abs(variance))} ر.س
                            </td>
                        </tr>
                    </tbody>
                </table>
                
                <table class="prof-table" style="margin-top: 15px; margin-bottom: 20px; border: 2px solid #000;">
                    <thead>
                        <tr>
                            <th style="background: #d3d3d3; color: #000; font-size: 13px; font-weight: 900; padding: 12px; border: 2px solid #000;">التفاصيل الإضافية</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="text-align: right; padding: 15px; background: #f8f9fa; border: 1px solid #000;">
                                <strong style="color: #000; font-size: 13px;">الملاحظات:</strong><br>
                                <div style="min-height: 40px; font-size: 12px; margin-top: 8px; padding: 12px; background: #fff; border: 2px solid #000; line-height: 1.6;">
                                    ${r.note || "لا توجد ملاحظات."}
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                
                <div class="prof-footer" style="margin-top: 30px; padding: 20px; background: #f8f9fa; border: 2px solid #000;">
                    <div style="text-align: center;">
                        <strong style="font-size: 14px; color: #000; display: block; margin-bottom: 15px;">توقيع الموظف المسؤول</strong>
                        <div style="margin: 20px 0; border-top: 2px solid #000; padding-top: 15px;">
                            <div style="font-size: 13px; color: #000; margin-top: 10px;">${r.employee || "الاسم"}</div>
                        </div>
                    </div>
                </div>
                
                <!-- توقيع المطور في كل صفحة -->
                <div class="prof-developer-signature-fixed">
                    تم التنفيذ بواسطة: أيمن أبو ورده | 77aayy@gmail.com - 0570707121
                </div>
            </div>`;
            
            const printArea = document.getElementById('printArea');
            if (!printArea) {
                showToast("❌ حدث خطأ: printArea غير موجود", "error");
                console.error("printArea element not found");
                return;
            }
            
            try {
                // تنظيف المحتوى السابق
                printArea.innerHTML = '';
                
                // إضافة المحتوى الجديد
                printArea.innerHTML = html;
                
                // نقل printArea إلى body مباشرة إذا لم يكن موجوداً هناك
                if (printArea.parentElement !== document.body) {
                    document.body.appendChild(printArea);
                }
                
                // التأكد من أن printArea مرئي على الشاشة أولاً (للتأكد من وجوده)
                // إخفاء كل شيء ما عدا printArea
                const originalBodyStyle = document.body.style.cssText;
                const originalHtmlStyle = document.documentElement.style.cssText;
                
                document.body.style.cssText = 'margin: 0; padding: 0;';
                document.documentElement.style.cssText = 'margin: 0; padding: 0;';
                
                // إظهار printArea للطباعة - يجب أن يكون مرئياً على الشاشة
                printArea.style.cssText = `
                    display: block !important;
                    position: fixed !important;
                    left: 0 !important;
                    top: 0 !important;
                    width: 100% !important;
                    min-height: 100vh !important;
                    background: #fff !important;
                    color: #000 !important;
                    z-index: 999999 !important;
                    visibility: visible !important;
                    padding: 0 !important;
                    margin: 0 !important;
                    overflow: visible !important;
                `;
                
                // التأكد من أن جميع العناصر مرئية
                const allElements = printArea.querySelectorAll('*');
                allElements.forEach(el => {
                    el.style.visibility = 'visible';
                    el.style.display = '';
                    if (el.tagName === 'TABLE') {
                        el.style.display = 'table';
                    } else if (el.tagName === 'TR') {
                        el.style.display = 'table-row';
                    } else if (el.tagName === 'TD' || el.tagName === 'TH') {
                        el.style.display = 'table-cell';
                    } else if (el.tagName === 'THEAD') {
                        el.style.display = 'table-header-group';
                    } else if (el.tagName === 'TBODY') {
                        el.style.display = 'table-row-group';
                    } else if (el.tagName === 'DIV') {
                        el.style.display = 'block';
                    }
                });
                
                // إخفاء باقي الصفحة
                const allBodyChildren = Array.from(document.body.children);
                allBodyChildren.forEach(child => {
                    if (child.id !== 'printArea') {
                        child.style.display = 'none';
                    }
                });
                
                // الطباعة بعد تأكيد ظهور المحتوى
                setTimeout(() => {
                    // printArea يجب أن يكون مرئياً على الشاشة قبل الطباعة
                    // نجعله مرئياً ولكن خارج الشاشة بصرياً
                    printArea.style.cssText = `
                        display: block !important;
                        position: fixed !important;
                        left: 0 !important;
                        top: 0 !important;
                        width: 100% !important;
                        min-height: 100vh !important;
                        background: #fff !important;
                        color: #000 !important;
                        z-index: 999999 !important;
                        visibility: visible !important;
                        opacity: 1 !important;
                        padding: 0 !important;
                        margin: 0 !important;
                        overflow: visible !important;
                    `;
                    
                    // التأكد من أن جميع العناصر مرئية
                    const allElements = printArea.querySelectorAll('*');
                    allElements.forEach(el => {
                        el.style.visibility = 'visible';
                        el.style.opacity = '1';
                        el.style.display = '';
                        if (el.tagName === 'TABLE') {
                            el.style.display = 'table';
                        } else if (el.tagName === 'TR') {
                            el.style.display = 'table-row';
                        } else if (el.tagName === 'TD' || el.tagName === 'TH') {
                            el.style.display = 'table-cell';
                        } else if (el.tagName === 'THEAD') {
                            el.style.display = 'table-header-group';
                        } else if (el.tagName === 'TBODY') {
                            el.style.display = 'table-row-group';
                        } else if (el.tagName === 'DIV') {
                            el.style.display = 'block';
                        }
                    });
                    
                    // إخفاء باقي الصفحة بصرياً (لكن يبقى في DOM للطباعة)
                    allBodyChildren.forEach(child => {
                        if (child.id !== 'printArea') {
                            child.style.visibility = 'hidden';
                            child.style.opacity = '0';
                        }
                    });
                    
                    // دالة لتنظيف printArea بعد إغلاق نافذة الطباعة
                    const cleanupPrintLastShift = () => {
                        // استعادة باقي الصفحة بشكل كامل
                        allBodyChildren.forEach(child => {
                            if (child.id !== 'printArea') {
                                child.style.visibility = '';
                                child.style.opacity = '';
                                child.style.display = '';
                            }
                        });
                        // استعادة body و html styles
                        document.body.style.cssText = originalBodyStyle;
                        document.documentElement.style.cssText = originalHtmlStyle;
                        printArea.innerHTML = '';
                        printArea.style.cssText = `
                            display: none !important;
                            position: fixed !important;
                            left: -9999px !important;
                            top: -9999px !important;
                            visibility: hidden !important;
                        `;
                        // إزالة event listeners بعد التنظيف
                        window.removeEventListener('afterprint', cleanupPrintLastShift);
                        window.removeEventListener('focus', cleanupPrintLastShift);
                    };
                    
                    // إخفاء printArea بعد إغلاق نافذة الطباعة (عند الضغط على طباعة أو إلغاء)
                    window.addEventListener('afterprint', cleanupPrintLastShift);
                    // أيضاً عند عودة التركيز للنافذة (في حالة الإلغاء)
                    window.addEventListener('focus', cleanupPrintLastShift, { once: true });
                    
                    // فتح نافذة الطباعة مباشرة
                    window.print();
                }, 50);
            } catch (error) {
                console.error("Error preparing print:", error);
                showToast("❌ حدث خطأ أثناء إعداد الطباعة: " + error.message, "error");
            }
        };

        // دالة لتحويل الأرقام العربية إلى إنجليزية
        function convertArabicToEnglish(str) {
            if (!str) return str;
            const arabicToEnglish = {
                '٠': '0', '١': '1', '٢': '2', '٣': '3', '٤': '4',
                '٥': '5', '٦': '6', '٧': '7', '٨': '8', '٩': '9'
            };
            return str.replace(/[٠-٩]/g, (char) => arabicToEnglish[char] || char);
        }
        
        // دالة لتحويل time string إلى Date object
        function parseTimeString(timeStr) {
            if (!timeStr) return null;
            // timeStr format: "15/12/2025 12:02 م" أو "15/12/2025 ١١:٣٩ ص" أو "15/12/2025 12:02"
            try {
                // تحويل الأرقام العربية إلى إنجليزية
                const convertedStr = convertArabicToEnglish(timeStr);
                
                const parts = convertedStr.trim().split(' ');
                if (parts.length < 2) return null;
                
                const datePart = parts[0]; // "15/12/2025"
                const timePart = parts[1]; // "12:02" أو "11:39"
                const ampm = parts[2] || ''; // "م" أو "ص" أو ""
                
                // التحقق من صحة التنسيق
                if (!datePart || !timePart) return null;
                
                const dateParts = datePart.split('/');
                if (dateParts.length !== 3) return null;
                
                // تحويل الأرقام العربية في التاريخ أيضاً
                const day = parseInt(convertArabicToEnglish(dateParts[0]), 10);
                const month = parseInt(convertArabicToEnglish(dateParts[1]), 10);
                const year = parseInt(convertArabicToEnglish(dateParts[2]), 10);
                
                const timeParts = timePart.split(':');
                if (timeParts.length < 2) return null;
                
                // تحويل الأرقام العربية في الوقت
                const hour = parseInt(convertArabicToEnglish(timeParts[0]), 10);
                const minute = parseInt(convertArabicToEnglish(timeParts[1] || '0'), 10);
                
                // التحقق من صحة الأرقام
                if (isNaN(day) || isNaN(month) || isNaN(year) || isNaN(hour) || isNaN(minute)) {
                    return null;
                }
                
                let hour24 = hour;
                // معالجة AM/PM
                if (ampm === 'م' || ampm === 'م.' || ampm === 'م') {
                    if (hour !== 12) {
                        hour24 = hour + 12;
                    } else {
                        hour24 = 12; // 12 م = 12:00 PM
                    }
                } else if (ampm === 'ص' || ampm === 'ص.' || ampm === 'ص') {
                    if (hour === 12) {
                        hour24 = 0; // 12 ص = 00:00
                    } else {
                        hour24 = hour; // 11 ص = 11:00
                    }
                } else if (ampm === '') {
                    // إذا لم يكن هناك AM/PM، افترض أن الساعة 24 ساعة إذا كانت > 12
                    // أو افترض أنها صباحية إذا كانت <= 12
                    if (hour > 12) {
                        hour24 = hour; // بالفعل 24 ساعة
                    }
                }
                
                const date = new Date(year, month - 1, day, hour24, minute || 0, 0, 0);
                
                // التحقق من صحة التاريخ
                if (isNaN(date.getTime())) {
                    return null;
                }
                
                return date;
            } catch (e) {
                // خطأ صامت - لا نريد إزعاج المستخدم
                return null;
            }
        }

        // دالة لتنسيق التاريخ للعرض
        function formatForInput(date) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            return `${year}-${month}-${day}T${hours}:${minutes}`;
        }
        
        // دالة لتحديث معلومات الفترة
        function updateCustomPrintInfo() {
            const startInput = document.getElementById('customPrintStartDate');
            const endInput = document.getElementById('customPrintEndDate');
            const infoDiv = document.getElementById('customPrintInfo');
            
            if (!startInput || !endInput || !infoDiv) return;
            
            if (startInput.value && endInput.value) {
                const startDate = new Date(startInput.value);
                const endDate = new Date(endInput.value);
                const diffTime = Math.abs(endDate - startDate);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                
                const startDateBegin = new Date(startDate);
                startDateBegin.setHours(0, 0, 0, 0);
                const endDateEnd = new Date(endDate);
                endDateEnd.setHours(23, 59, 59, 999);
                
                const closedCount = allBoxData.filter(r => {
                    if (!r.closed || !r.time) return false;
                    const rowDate = parseTimeString(r.time);
                    if (!rowDate || isNaN(rowDate.getTime())) return false;
                    return rowDate >= startDateBegin && rowDate <= endDateEnd;
                }).length;
                
                infoDiv.innerHTML = `
                    <div style="display: flex; align-items: center; justify-content: center; gap: 16px; flex-wrap: wrap;">
                        <div style="display: flex; align-items: center; gap: 6px;">
                            <span style="font-size: 20px;">📊</span>
                            <span style="color: #2CB1E1; font-weight: 800; font-size: 16px;">${closedCount}</span>
                            <span style="color: rgba(255, 255, 255, 0.9); font-weight: 600;">تقفيلة</span>
                        </div>
                        <div style="width: 1px; height: 20px; background: rgba(255, 255, 255, 0.3);"></div>
                        <div style="display: flex; align-items: center; gap: 6px;">
                            <span style="font-size: 20px;">📅</span>
                            <span style="color: #2CB1E1; font-weight: 800; font-size: 16px;">${diffDays}</span>
                            <span style="color: rgba(255, 255, 255, 0.9); font-weight: 600;">يوم</span>
                        </div>
                    </div>
                `;
            } else {
                infoDiv.innerHTML = `
                    <div style="text-align: center; color: rgba(255, 255, 255, 0.6); font-size: 13px;">
                        👆 اختر الفترة المطلوبة من الأزرار أعلاه أو حدد التاريخ يدوياً
                    </div>
                `;
            }
        }
        
        window.setQuickDate = function(period) {
            const startInput = document.getElementById('customPrintStartDate');
            const endInput = document.getElementById('customPrintEndDate');
            if (!startInput || !endInput) return;
            
            const endDate = new Date(); // دائماً التاريخ والوقت الحالي
            const startDate = new Date();
            
            switch(period) {
                case 'today':
                    startDate.setHours(0, 0, 0, 0);
                    // endDate يبقى التاريخ والوقت الحالي
                    break;
                case 'week':
                    startDate.setDate(startDate.getDate() - 7);
                    startDate.setHours(0, 0, 0, 0);
                    // endDate يبقى التاريخ والوقت الحالي
                    break;
                case 'month':
                    startDate.setDate(startDate.getDate() - 30);
                    startDate.setHours(0, 0, 0, 0);
                    // endDate يبقى التاريخ والوقت الحالي
                    break;
            }
            
            startInput.value = formatForInput(startDate);
            endInput.value = formatForInput(endDate); // دائماً التاريخ والوقت الحالي
            
            // تحديث المعلومات
            setTimeout(updateCustomPrintInfo, 100);
        };
        
        window.showCustomPrintModal = function () {
            const modal = document.getElementById('customPrintModal');
            if (!modal) {
                showToast("❌ حدث خطأ: Modal غير موجود", "error");
                return;
            }
            
            // تعيين التاريخ الافتراضي
            const endDate = new Date(); // التاريخ والوقت الحالي
            const startDate = new Date();
            startDate.setDate(startDate.getDate() - 7); // آخر 7 أيام
            startDate.setHours(0, 0, 0, 0);
            
            const startInput = document.getElementById('customPrintStartDate');
            const endInput = document.getElementById('customPrintEndDate');
            if (startInput) startInput.value = formatForInput(startDate);
            if (endInput) endInput.value = formatForInput(endDate); // التاريخ والوقت الحالي تلقائياً
            
            // إضافة event listeners لتحديث المعلومات
            if (startInput) {
                startInput.removeEventListener('change', updateCustomPrintInfo);
                startInput.addEventListener('change', updateCustomPrintInfo);
            }
            if (endInput) {
                endInput.removeEventListener('change', updateCustomPrintInfo);
                endInput.addEventListener('change', updateCustomPrintInfo);
            }
            
            // تحديث المعلومات
            setTimeout(updateCustomPrintInfo, 100);
            
            modal.style.display = 'flex';
            
            // إغلاق عند الضغط على overlay
            modal.onclick = function(e) {
                if (e.target === modal) {
                    hideCustomPrintModal();
                }
            };
        };

        window.hideCustomPrintModal = function () {
            const modal = document.getElementById('customPrintModal');
            if (modal) {
                modal.style.display = 'none';
            }
        };

        window.executeCustomPrint = function () {
            const startInput = document.getElementById('customPrintStartDate');
            const endInput = document.getElementById('customPrintEndDate');
            
            if (!startInput || !endInput) {
                showToast("❌ حدث خطأ في الحقول", "error");
                return;
            }
            
            const startValue = startInput.value;
            const endValue = endInput.value;
            
            if (!startValue || !endValue) {
                showToast("⚠️ يرجى تحديد تاريخ البداية والنهاية", "info");
                return;
            }
            
            // تحويل datetime-local إلى Date objects
            const startDate = new Date(startValue);
            const endDate = new Date(endValue);
            
            if (startDate > endDate) {
                showToast("⚠️ تاريخ البداية يجب أن يكون قبل تاريخ النهاية", "info");
                return;
            }
            
            // فلترة الصفوف المغلقة حسب التاريخ
            const filteredRows = allBoxData.filter(row => {
                if (!row.closed || !row.time) {
                    return false;
                }
                
                const rowDate = parseTimeString(row.time);
                if (!rowDate || isNaN(rowDate.getTime())) {
                    // تجاهل الصفوف التي لا يمكن تحليل وقتها
                    return false;
                }
                
                // ضبط startDate لبداية اليوم
                const startDateBegin = new Date(startDate);
                startDateBegin.setHours(0, 0, 0, 0);
                
                // ضبط endDate لنهاية اليوم
                const endDateEnd = new Date(endDate);
                endDateEnd.setHours(23, 59, 59, 999);
                
                // المقارنة
                return rowDate >= startDateBegin && rowDate <= endDateEnd;
            });
            
            if (filteredRows.length === 0) {
                showToast("⚠️ لا توجد تقفيلات مغلقة في الفترة المحددة", "info");
                hideCustomPrintModal();
                return;
            }
            
            // طباعة الصفوف المفلترة
            generatePrintTable(filteredRows);
            hideCustomPrintModal();
            
            const printArea = document.getElementById('printArea');
            if (!printArea) {
                showToast("❌ حدث خطأ: printArea غير موجود", "error");
                return;
            }
            
            try {
                // نقل printArea إلى body مباشرة إذا لم يكن موجوداً هناك
                if (printArea.parentElement !== document.body) {
                    document.body.appendChild(printArea);
                }
                
                // إخفاء كل شيء ما عدا printArea
                const originalBodyStyle = document.body.style.cssText;
                const originalHtmlStyle = document.documentElement.style.cssText;
                
                document.body.style.cssText = 'margin: 0; padding: 0;';
                document.documentElement.style.cssText = 'margin: 0; padding: 0;';
                
                // إظهار printArea للطباعة - يجب أن يكون مرئياً على الشاشة
                printArea.style.cssText = `
                    display: block !important;
                    position: fixed !important;
                    left: 0 !important;
                    top: 0 !important;
                    width: 100% !important;
                    min-height: 100vh !important;
                    background: #fff !important;
                    color: #000 !important;
                    z-index: 999999 !important;
                    visibility: visible !important;
                    padding: 0 !important;
                    margin: 0 !important;
                    overflow: visible !important;
                `;
                
                // التأكد من أن جميع العناصر مرئية
                const allElements = printArea.querySelectorAll('*');
                allElements.forEach(el => {
                    el.style.visibility = 'visible';
                    el.style.display = '';
                    if (el.tagName === 'TABLE') {
                        el.style.display = 'table';
                    } else if (el.tagName === 'TR') {
                        el.style.display = 'table-row';
                    } else if (el.tagName === 'TD' || el.tagName === 'TH') {
                        el.style.display = 'table-cell';
                    } else if (el.tagName === 'THEAD') {
                        el.style.display = 'table-header-group';
                    } else if (el.tagName === 'TBODY') {
                        el.style.display = 'table-row-group';
                    } else if (el.tagName === 'DIV') {
                        el.style.display = 'block';
                    }
                });
                
                // إخفاء باقي الصفحة
                const allBodyChildren = Array.from(document.body.children);
                allBodyChildren.forEach(child => {
                    if (child.id !== 'printArea') {
                        child.style.display = 'none';
                    }
                });
                
                // الطباعة بعد تأكيد ظهور المحتوى
                setTimeout(() => {
                    // printArea يجب أن يكون مرئياً على الشاشة قبل الطباعة
                    printArea.style.cssText = `
                        display: block !important;
                        position: fixed !important;
                        left: 0 !important;
                        top: 0 !important;
                        width: 100% !important;
                        min-height: 100vh !important;
                        background: #fff !important;
                        color: #000 !important;
                        z-index: 999999 !important;
                        visibility: visible !important;
                        opacity: 1 !important;
                        padding: 0 !important;
                        margin: 0 !important;
                        overflow: visible !important;
                    `;
                    
                    // التأكد من أن جميع العناصر مرئية
                    const allElements = printArea.querySelectorAll('*');
                    allElements.forEach(el => {
                        el.style.visibility = 'visible';
                        el.style.opacity = '1';
                        el.style.display = '';
                        if (el.tagName === 'TABLE') {
                            el.style.display = 'table';
                        } else if (el.tagName === 'TR') {
                            el.style.display = 'table-row';
                        } else if (el.tagName === 'TD' || el.tagName === 'TH') {
                            el.style.display = 'table-cell';
                        } else if (el.tagName === 'THEAD') {
                            el.style.display = 'table-header-group';
                        } else if (el.tagName === 'TBODY') {
                            el.style.display = 'table-row-group';
                        } else if (el.tagName === 'DIV') {
                            el.style.display = 'block';
                        }
                    });
                    
                    // إخفاء باقي الصفحة بصرياً (لكن يبقى في DOM للطباعة)
                    allBodyChildren.forEach(child => {
                        if (child.id !== 'printArea') {
                            child.style.visibility = 'hidden';
                            child.style.opacity = '0';
                        }
                    });
                    
                    // دالة لتنظيف printArea بعد إغلاق نافذة الطباعة
                    const cleanupPrintCustomExec = () => {
                        // استعادة باقي الصفحة بشكل كامل
                        allBodyChildren.forEach(child => {
                            if (child.id !== 'printArea') {
                                child.style.visibility = '';
                                child.style.opacity = '';
                                child.style.display = '';
                            }
                        });
                        // استعادة body و html styles
                        document.body.style.cssText = originalBodyStyle;
                        document.documentElement.style.cssText = originalHtmlStyle;
                        printArea.innerHTML = '';
                        printArea.style.cssText = `
                            display: none !important;
                            position: fixed !important;
                            left: -9999px !important;
                            top: -9999px !important;
                            visibility: hidden !important;
                        `;
                        // إزالة event listeners بعد التنظيف
                        window.removeEventListener('afterprint', cleanupPrintCustomExec);
                        window.removeEventListener('focus', cleanupPrintCustomExec);
                    };
                    
                    // إخفاء printArea بعد إغلاق نافذة الطباعة (عند الضغط على طباعة أو إلغاء)
                    window.addEventListener('afterprint', cleanupPrintCustomExec);
                    // أيضاً عند عودة التركيز للنافذة (في حالة الإلغاء)
                    window.addEventListener('focus', cleanupPrintCustomExec, { once: true });
                    
                    // فتح نافذة الطباعة مباشرة
                    window.print();
                }, 50);
            } catch (error) {
                console.error("Error preparing print:", error);
                showToast("❌ حدث خطأ أثناء إعداد الطباعة: " + error.message, "error");
            }
        };

        window.printSelectedShifts = function () {
            // استخدام selectedPrintIds بدلاً من checkboxes المرئية فقط
            if (selectedPrintIds.size === 0) {
                showToast("حدد صفوفاً مغلقة أولاً.", "info");
                return;
            }
            const ids = Array.from(selectedPrintIds);
            const selectedRows = allBoxData.filter(r => ids.includes(r.id));
            if (selectedRows.length === 0) {
                showToast("لم يتم العثور على التقفيلات المحددة.", "error");
                return;
            }
            
            generatePrintTable(selectedRows);
            
            // (اختياري) مسح التحديد بعد الطباعة
            // selectedPrintIds.clear();
            // localStorage.removeItem(SELECTED_PRINT_IDS_KEY);
            // renderBoxTable();
            
            const printArea = document.getElementById('printArea');
            if (!printArea) {
                showToast("❌ حدث خطأ: printArea غير موجود", "error");
                console.error("printArea element not found");
                return;
            }
            
            try {
                // نقل printArea إلى body مباشرة إذا لم يكن موجوداً هناك
                if (printArea.parentElement !== document.body) {
                    document.body.appendChild(printArea);
                }
                
                // إخفاء كل شيء ما عدا printArea
                const originalBodyStyle = document.body.style.cssText;
                const originalHtmlStyle = document.documentElement.style.cssText;
                
                document.body.style.cssText = 'margin: 0; padding: 0;';
                document.documentElement.style.cssText = 'margin: 0; padding: 0;';
                
                // إظهار printArea للطباعة - يجب أن يكون مرئياً على الشاشة
                printArea.style.cssText = `
                    display: block !important;
                    position: fixed !important;
                    left: 0 !important;
                    top: 0 !important;
                    width: 100% !important;
                    min-height: 100vh !important;
                    background: #fff !important;
                    color: #000 !important;
                    z-index: 999999 !important;
                    visibility: visible !important;
                    padding: 0 !important;
                    margin: 0 !important;
                    overflow: visible !important;
                `;
                
                // التأكد من أن جميع العناصر مرئية
                const allElements = printArea.querySelectorAll('*');
                allElements.forEach(el => {
                    el.style.visibility = 'visible';
                    el.style.display = '';
                    if (el.tagName === 'TABLE') {
                        el.style.display = 'table';
                    } else if (el.tagName === 'TR') {
                        el.style.display = 'table-row';
                    } else if (el.tagName === 'TD' || el.tagName === 'TH') {
                        el.style.display = 'table-cell';
                    } else if (el.tagName === 'THEAD') {
                        el.style.display = 'table-header-group';
                    } else if (el.tagName === 'TBODY') {
                        el.style.display = 'table-row-group';
                    } else if (el.tagName === 'DIV') {
                        el.style.display = 'block';
                    }
                });
                
                // إخفاء باقي الصفحة
                const allBodyChildren = Array.from(document.body.children);
                
                // الطباعة بعد تأكيد ظهور المحتوى
                setTimeout(() => {
                    // printArea يجب أن يكون مرئياً على الشاشة قبل الطباعة
                    printArea.style.cssText = `
                        display: block !important;
                        position: fixed !important;
                        left: 0 !important;
                        top: 0 !important;
                        width: 100% !important;
                        min-height: 100vh !important;
                        background: #fff !important;
                        color: #000 !important;
                        z-index: 999999 !important;
                        visibility: visible !important;
                        opacity: 1 !important;
                        padding: 0 !important;
                        margin: 0 !important;
                        overflow: visible !important;
                    `;
                    
                    // التأكد من أن جميع العناصر مرئية
                    const allElements = printArea.querySelectorAll('*');
                    allElements.forEach(el => {
                        el.style.visibility = 'visible';
                        el.style.opacity = '1';
                        el.style.display = '';
                        if (el.tagName === 'TABLE') {
                            el.style.display = 'table';
                        } else if (el.tagName === 'TR') {
                            el.style.display = 'table-row';
                        } else if (el.tagName === 'TD' || el.tagName === 'TH') {
                            el.style.display = 'table-cell';
                        } else if (el.tagName === 'THEAD') {
                            el.style.display = 'table-header-group';
                        } else if (el.tagName === 'TBODY') {
                            el.style.display = 'table-row-group';
                        } else if (el.tagName === 'DIV') {
                            el.style.display = 'block';
                        }
                    });
                    
                    // إخفاء باقي الصفحة بصرياً (لكن يبقى في DOM للطباعة)
                    allBodyChildren.forEach(child => {
                        if (child.id !== 'printArea') {
                            child.style.visibility = 'hidden';
                            child.style.opacity = '0';
                        }
                    });
                    
                    // دالة لتنظيف printArea بعد إغلاق نافذة الطباعة
                    const cleanupPrintGenerated = () => {
                        // استعادة باقي الصفحة بشكل كامل
                        allBodyChildren.forEach(child => {
                            if (child.id !== 'printArea') {
                                child.style.visibility = '';
                                child.style.opacity = '';
                                child.style.display = '';
                            }
                        });
                        // استعادة body و html styles
                        document.body.style.cssText = originalBodyStyle;
                        document.documentElement.style.cssText = originalHtmlStyle;
                        printArea.innerHTML = '';
                        printArea.style.cssText = `
                            display: none !important;
                            position: fixed !important;
                            left: -9999px !important;
                            top: -9999px !important;
                            visibility: hidden !important;
                        `;
                        // إزالة event listeners بعد التنظيف
                        window.removeEventListener('afterprint', cleanupPrintGenerated);
                        window.removeEventListener('focus', cleanupPrintGenerated);
                    };
                    
                    // إخفاء printArea بعد إغلاق نافذة الطباعة (عند الضغط على طباعة أو إلغاء)
                    window.addEventListener('afterprint', cleanupPrintGenerated);
                    // أيضاً عند عودة التركيز للنافذة (في حالة الإلغاء)
                    window.addEventListener('focus', cleanupPrintGenerated, { once: true });
                    
                    // فتح نافذة الطباعة مباشرة
                    window.print();
                }, 50);
            } catch (error) {
                console.error("Error preparing print:", error);
                showToast("❌ حدث خطأ أثناء إعداد الطباعة: " + error.message, "error");
            }
        };

        function generatePrintTable(rows) {
            if (!rows || rows.length === 0) {
                showToast("لا توجد بيانات للطباعة.", "error");
                return;
            }
            
            const printDate = new Date().toLocaleDateString('ar-SA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
            
            let html = `
            <div class="prof-report-container">
                <div class="prof-header">
                    <h1>تقرير التقفيلات المحددة - المحاسبي</h1>
                    <div class="prof-header-info">
                        <span><strong>عدد التقفيلات:</strong> ${rows.length}</span>
                        <span><strong>تاريخ الطباعة:</strong> ${printDate}</span>
                    </div>
                </div>
                
                <table class="prof-table" style="table-layout: auto; width: 100%;">
                    <thead>
                        <tr>
                            <th style="width: 3%;">م</th>
                            <th style="width: 8%;">الموظف</th>
                            <th style="width: 7%;">الاحتياطي</th>
                            <th style="width: 8%;">مصروف رسمي</th>
                            <th style="width: 12%;">الوقت</th>
                            <th style="width: 7%;">كاش</th>
                            <th style="width: 8%;">مصروف مؤقت</th>
                            <th style="width: 7%;">شبكة</th>
                            <th style="width: 7%;">تحويل</th>
                            <th style="width: 10%;">ايراد البرنامج</th>
                            <th style="width: 8%;">الانحراف</th>
                            <th style="width: 15%;">ملاحظات</th>
                        </tr>
                    </thead>
                    <tbody>`;
            
            rows.forEach(r => {
                const v = (parseFloat(r.cash) || 0) + (parseFloat(r.network) || 0) + (parseFloat(r.transfer) || 0) + (parseFloat(r.exp) || 0) + (parseFloat(r.tempExp) || 0) + (parseFloat(r.reserve) || 0) - (parseFloat(r.prog) || 0);
                html += `<tr>
                    <td style="font-weight: bold; word-wrap: break-word; overflow-wrap: break-word;">${r.id}</td>
                    <td style="word-wrap: break-word; overflow-wrap: break-word;">${r.employee || "غير محدد"}</td>
                    <td style="word-wrap: break-word; overflow-wrap: break-word;">${formatNumber(r.reserve)} ر.س</td>
                    <td style="word-wrap: break-word; overflow-wrap: break-word;">${formatNumber(r.exp)} ر.س</td>
                    <td style="word-wrap: break-word; overflow-wrap: break-word; font-size: 11px;">${r.time}</td>
                    <td style="word-wrap: break-word; overflow-wrap: break-word;">${formatNumber(r.cash)} ر.س</td>
                    <td style="word-wrap: break-word; overflow-wrap: break-word;">${formatNumber(r.tempExp)} ر.س</td>
                    <td style="word-wrap: break-word; overflow-wrap: break-word;">${formatNumber(r.network)} ر.س</td>
                    <td style="word-wrap: break-word; overflow-wrap: break-word;">${formatNumber(r.transfer)} ر.س</td>
                    <td style="font-weight: bold; color: #198754; word-wrap: break-word; overflow-wrap: break-word;">${formatNumber(r.prog)} ر.س</td>
                    <td style="font-weight:bold; color:${v === 0 ? '#198754' : (v < 0 ? '#dc3545' : '#2CB1E1')}; word-wrap: break-word; overflow-wrap: break-word;">
                        ${v === 0 ? '✓' : (v < 0 ? '▼' : '▲')} ${formatNumber(Math.abs(v))} ر.س
                    </td>
                    <td style="font-size: 11px; word-wrap: break-word; overflow-wrap: break-word;">${r.note || "-"}</td>
                </tr>`;
            });
            
            // حساب الإجماليات
            const totalCash = rows.reduce((sum, r) => sum + (parseFloat(r.cash) || 0) + (parseFloat(r.reserve) || 0), 0);
            const totalBank = rows.reduce((sum, r) => sum + (parseFloat(r.network) || 0) + (parseFloat(r.transfer) || 0), 0);
            const totalExp = rows.reduce((sum, r) => sum + (parseFloat(r.exp) || 0) + (parseFloat(r.tempExp) || 0), 0);
            const totalProg = rows.reduce((sum, r) => sum + (parseFloat(r.prog) || 0), 0);
            const totalVariance = totalCash + totalBank + totalExp - totalProg;
            
            html += `
                    </tbody>
                </table>
                
                <table class="prof-table" style="margin-top: 8px;">
                    <thead>
                        <tr>
                            <th colspan="2" style="background: #e7f3ff; font-size: 12px;">ملخص الإجماليات المحاسبية</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="text-align: right; font-weight: bold; font-size: 10px;">إجمالي النقدية (كاش + احتياطي)</td>
                            <td style="font-weight: 900; font-size: 11px; color: #198754;">${formatNumber(totalCash)} ر.س</td>
                        </tr>
                        <tr>
                            <td style="text-align: right; font-weight: bold; font-size: 10px;">إجمالي البنك (شبكة + تحويل)</td>
                            <td style="font-weight: 900; font-size: 11px; color: #0d6efd;">${formatNumber(totalBank)} ر.س</td>
                        </tr>
                        <tr>
                            <td style="text-align: right; font-weight: bold; font-size: 10px;">إجمالي المصروفات (رسمي + مؤقت)</td>
                            <td style="font-weight: 900; font-size: 11px; color: #2CB1E1;">${formatNumber(totalExp)} ر.س</td>
                        </tr>
                        <tr>
                            <td style="text-align: right; font-weight: bold; font-size: 10px;">إجمالي الإيراد (من البرنامج)</td>
                            <td style="font-weight: 900; font-size: 11px; color: #198754;">${formatNumber(totalProg)} ر.س</td>
                        </tr>
                        <tr style="background: #f8f9fa; font-weight: 900; font-size: 11px;">
                            <td style="text-align: right;">إجمالي الانحراف (العجز / الزيادة)</td>
                            <td style="color: ${totalVariance === 0 ? '#198754' : (totalVariance < 0 ? '#dc3545' : '#2CB1E1')};">
                                ${totalVariance === 0 ? '✓ متوازن' : (totalVariance < 0 ? '▼ عجز' : '▲ زيادة')} ${formatNumber(Math.abs(totalVariance))} ر.س
                            </td>
                        </tr>
                    </tbody>
                </table>
                
                <div class="prof-footer">
                    <div>
                        <strong>توقيع الموظف المسؤول</strong><br>
                        <br>
                        .........................
                    </div>
                </div>
                
                <!-- توقيع المطور في كل صفحة -->
                <div class="prof-developer-signature-fixed">
                    تم التنفيذ بواسطة: أيمن أبو ورده | 77aayy@gmail.com - 0570707121
                </div>
            </div>`;
            
            const printArea = document.getElementById('printArea');
            if (!printArea) {
                showToast("❌ حدث خطأ: printArea غير موجود", "error");
                console.error("printArea element not found");
                return;
            }
            
            try {
                printArea.innerHTML = html;
                
                // نقل printArea إلى body مباشرة إذا لم يكن موجوداً هناك
                if (printArea.parentElement !== document.body) {
                    document.body.appendChild(printArea);
                }
                
                printArea.style.cssText = `
                    display: block !important;
                    position: fixed !important;
                    left: 0 !important;
                    top: 0 !important;
                    width: 100% !important;
                    min-height: 100vh !important;
                    background: #fff !important;
                    color: #000 !important;
                    z-index: 999999 !important;
                    visibility: visible !important;
                    padding: 0 !important;
                    margin: 0 !important;
                `;
                
                // التأكد من أن جميع العناصر مرئية
                const allElements = printArea.querySelectorAll('*');
                allElements.forEach(el => {
                    el.style.visibility = 'visible';
                    if (el.tagName === 'TABLE') {
                        el.style.display = 'table';
                    } else if (el.tagName === 'TR') {
                        el.style.display = 'table-row';
                    } else if (el.tagName === 'TD' || el.tagName === 'TH') {
                        el.style.display = 'table-cell';
                    } else if (el.tagName === 'THEAD') {
                        el.style.display = 'table-header-group';
                    } else if (el.tagName === 'TBODY') {
                        el.style.display = 'table-row-group';
                    } else {
                        el.style.display = '';
                    }
                });
                
            } catch (error) {
                console.error("Error in generatePrintTable:", error);
                showToast("❌ حدث خطأ أثناء إعداد التقرير: " + error.message, "error");
            }
        }

        // Toast & Modal Helpers
        window.showToast = function (message, type) {
            type = type || 'info';
            let container = document.getElementById('toastContainer');
            if (!container) {
                container = document.createElement('div');
                container.id = 'toastContainer';
                document.body.appendChild(container);
            }
            const toast = document.createElement('div');
            toast.className = 'toast-ios toast-ios-' + type;
            const iconSpan = document.createElement('div');
            iconSpan.className = 'toast-ios-icon';
            iconSpan.textContent = type === 'success' ? '✅' : (type === 'error' ? '⚠️' : 'ℹ️');
            const textDiv = document.createElement('div');
            textDiv.className = 'toast-ios-text';
            textDiv.textContent = message;
            const closeBtn = document.createElement('button');
            closeBtn.className = 'toast-ios-close';
            closeBtn.textContent = '×';
            closeBtn.onclick = () => toast.remove();
            toast.appendChild(iconSpan);
            toast.appendChild(textDiv);
            toast.appendChild(closeBtn);
            container.appendChild(toast);
            setTimeout(() => {
                toast.remove();
            }, 3000);
        };

        window.hideModal = function () {
            const overlay = document.getElementById('modalOverlay');
            if (overlay) overlay.style.display = 'none';
        };

        window.showConfirm = function (message, onConfirm) {
            const overlay = document.getElementById('modalOverlay');
            if (!overlay) {
                if (confirm(message) && typeof onConfirm === 'function') onConfirm();
                return;
            }
            document.getElementById('modalTitle').innerText = 'تأكيد العملية';
            document.getElementById('modalBody').innerText = message;
            const actions = document.getElementById('modalActions');
            actions.innerHTML = '';
            const cancelBtn = document.createElement('button');
            cancelBtn.className = 'btn-modal btn-modal-secondary';
            cancelBtn.innerText = 'رجوع';
            cancelBtn.onclick = hideModal;
            const okBtn = document.createElement('button');
            okBtn.className = 'btn-modal btn-modal-primary';
            okBtn.innerText = 'تأكيد';
            okBtn.onclick = function () {
                hideModal();
                if (typeof onConfirm === 'function') onConfirm();
            };
            actions.appendChild(cancelBtn);
            actions.appendChild(okBtn);
            overlay.style.display = 'flex';
        };

        window.showChoiceModal = function (title, message, choices) {
            const overlay = document.getElementById('modalOverlay');
            if (!overlay) return;
            document.getElementById('modalTitle').innerText = title;
            const body = document.getElementById('modalBody');
            body.innerHTML = `<div style="margin-bottom:10px;">${message}</div>`;
            choices.forEach(c => {
                const btn = document.createElement('button');
                btn.className = 'choice-btn';
                btn.innerText = c.label;
                btn.onclick = () => {
                    hideModal();
                    c.action();
                };
                body.appendChild(btn);
            });
            const actions = document.getElementById('modalActions');
            actions.innerHTML = '';
            const cancelBtn = document.createElement('button');
            cancelBtn.className = 'btn-modal btn-modal-secondary';
            cancelBtn.innerText = 'إلغاء';
            cancelBtn.onclick = hideModal;
            actions.appendChild(cancelBtn);
            overlay.style.display = 'flex';
        };

        // Initialize
        boxGreet();
        loadBoxData();
    }
}

window.CashBoxPage = CashBoxPage;
