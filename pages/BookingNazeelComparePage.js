/**
 * BookingNazeelComparePage.js
 * صفحة المقارنة
 */

class BookingNazeelComparePage {
    async render() {
        return `<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
<meta charset="utf-8"/>
<title>منظومة Adora لمطابقة الحجوزات (القناص)</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
<link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800&display=swap" rel="stylesheet"/>
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>

<style>
    /* V18.0 Priority Fix Style - Scoped to page wrapper only */
    .booking-nazeel-page-wrapper {
        --bn-primary: #2CB1E1; --bn-primary-soft: rgba(44, 177, 225, 0.1); --bn-accent: #FFD700;        
        --bn-bg-body: #022A3A; --bn-text-dark: #FFFFFF; --bn-text-light: rgba(255, 255, 255, 0.6);
        --bn-shadow-card: 0 8px 24px rgba(0, 0, 0, 0.2);
        --bn-radius: 16px;
        --bn-grad-blue: linear-gradient(135deg, #2CB1E1, #166882);
        --bn-grad-ok: linear-gradient(135deg, #10b981, #059669);
        --bn-grad-warn: linear-gradient(135deg, #f59e0b, #d97706);
        --bn-grad-err: linear-gradient(135deg, #ef4444, #dc2626);
        --bn-grad-purple: linear-gradient(135deg, #8e2de2, #4a00e0);
    }
    /* Scoped styles - لا تؤثر على القائمة الجانبية - تصميم داكن موحد */
    .booking-nazeel-page-wrapper * { box-sizing: border-box; outline: none; }
    .booking-nazeel-page-wrapper { 
        margin: 0; padding: 0 0 60px 0; font-family: 'Tajawal', sans-serif; 
        color: var(--bn-text-dark); background-color: var(--bn-bg-body);
        background-image: linear-gradient(135deg, #022A3A 0%, #001219 100%);
        min-height: 100vh;
    }
    .booking-nazeel-page-wrapper .app-header {
        background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(15px);
        border: 1px solid rgba(100, 200, 255, 0.15);
        padding: 15px 25px; border-radius: 16px; margin: 20px 20px 0;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2); position: sticky; top: 0; z-index: 1000;
        display: flex; justify-content: space-between; align-items: center;
    }
    .booking-nazeel-page-wrapper .brand { display: flex; align-items: center; gap: 12px; }
    .booking-nazeel-page-wrapper .brand-info h1 { margin: 0; font-size: 1.3rem; font-weight: 800; color: #2CB1E1; }
    .booking-nazeel-page-wrapper .brand-info p { margin: 0; font-size: 0.7rem; color: rgba(255, 255, 255, 0.6); }
    .booking-nazeel-page-wrapper .header-tools { display: flex; gap: 10px; }
    /* إخفاء طباعة واكسيل في صفحة الرفع؛ تظهران فقط بعد ظهور النتائج */
    .booking-nazeel-page-wrapper #headerTools { display: none !important; }
    .booking-nazeel-page-wrapper #headerTools.visible { display: flex !important; }
    .booking-nazeel-page-wrapper .btn-chic {
        background: rgba(2, 42, 58, 0.9); border: 2px solid rgba(100, 200, 255, 0.2); padding: 10px 18px;
        border-radius: 12px; cursor: pointer; transition: all 0.3s;
        display: flex; align-items: center; gap: 8px;
        font-weight: 700; color: #FFFFFF; font-size: 0.85rem;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    }
    .booking-nazeel-page-wrapper .btn-chic:hover { 
        border-color: #2CB1E1; 
        background: rgba(2, 42, 58, 1);
        transform: translateY(-2px); 
        box-shadow: 0 4px 12px rgba(44, 177, 225, 0.3);
    }
    .booking-nazeel-page-wrapper .hero-card { margin: 30px auto; max-width: 800px; padding: 0 20px; animation: slideIn 0.5s ease-out; }
    .booking-nazeel-page-wrapper .upload-box {
        background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(100, 200, 255, 0.15); border-radius: var(--bn-radius); padding: 30px;
        box-shadow: var(--bn-shadow-card); text-align: center; position: relative;
    }
    .booking-nazeel-page-wrapper .upload-box::before {
        content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 4px;
        background: linear-gradient(90deg, #2CB1E1, #FFD700);
        border-radius: 16px 16px 0 0;
    }
    .booking-nazeel-page-wrapper .drop-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 25px; }
    .booking-nazeel-page-wrapper .drop-zone {
        border: 2px dashed rgba(100, 200, 255, 0.3); border-radius: 15px; padding: 25px;
        transition: 0.3s; cursor: pointer; background: rgba(2, 42, 58, 0.4);
    }
    .booking-nazeel-page-wrapper .drop-zone:hover { border-color: #2CB1E1; background: rgba(2, 42, 58, 0.6); }
    .booking-nazeel-page-wrapper .drop-zone.file-loaded { border-color: #10b981; background: rgba(16, 185, 129, 0.1); }
    .booking-nazeel-page-wrapper .drop-zone i { font-size: 2rem; color: #2CB1E1; }
    .booking-nazeel-page-wrapper .drop-zone h3 { margin: 10px 0 0; font-size: 0.9rem; color: #FFFFFF; font-weight: 700; }
    .booking-nazeel-page-wrapper .drop-zone input { display: none; }
    .booking-nazeel-page-wrapper .upload-progress {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(90deg, #2CB1E1, #10b981);
        border-radius: 0 0 12px 12px;
        transition: width 0.1s linear;
        box-shadow: 0 0 10px rgba(44, 177, 225, 0.5);
    }
    .booking-nazeel-page-wrapper .drop-zone {
        position: relative;
        overflow: hidden;
    }
    .booking-nazeel-page-wrapper .btn-magic {
        background: linear-gradient(135deg, #2CB1E1, #166882); color: #fff; border: none;
        padding: 14px 40px; border-radius: 50px; font-size: 1rem; font-weight: 800;
        cursor: pointer; box-shadow: 0 8px 20px rgba(44, 177, 225, 0.3); transition: 0.3s;
        display: inline-flex; align-items: center; gap: 8px;
    }
    .booking-nazeel-page-wrapper .btn-magic:hover { transform: translateY(-2px); box-shadow: 0 12px 28px rgba(44, 177, 225, 0.4); }
    .booking-nazeel-page-wrapper .control-panel { display: none; justify-content: center; gap: 15px; margin: 0 auto 20px; }
    .booking-nazeel-page-wrapper .tax-settings {
        display: flex; align-items: center; flex-wrap: wrap; gap: 15px; background: rgba(2, 42, 58, 0.7); padding: 10px 18px; 
        border-radius: 50px; box-shadow: 0 2px 10px rgba(0,0,0,0.2); border: 1px solid rgba(100, 200, 255, 0.2);
    }
    .booking-nazeel-page-wrapper .tax-item { display: flex; align-items: center; gap: 8px; font-size: 0.85rem; font-weight: 700; color: #2CB1E1; }
    .booking-nazeel-page-wrapper .tax-inp {
        width: 52px; min-height: 36px; text-align: center; font-size: 0.95rem; font-weight: 700;
        border: 1px solid rgba(100, 200, 255, 0.35); border-radius: 8px; padding: 6px 8px;
        background: rgba(255, 255, 255, 0.08); color: #FFD700; box-sizing: border-box;
        -moz-appearance: textfield; appearance: none;
    }
    .booking-nazeel-page-wrapper .tax-inp::-webkit-outer-spin-button,
    .booking-nazeel-page-wrapper .tax-inp::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
    .booking-nazeel-page-wrapper .tax-inp:focus { outline: none; border-color: rgba(44, 177, 225, 0.7); background: rgba(255, 255, 255, 0.12); }
    .booking-nazeel-page-wrapper .tax-inp::placeholder { color: rgba(255, 215, 0, 0.5); }
    .booking-nazeel-page-wrapper .btn-recalc { margin-right: 12px; padding: 6px 12px; font-size: 0.8rem; font-weight: 700; color: #fff; background: rgba(44, 177, 225, 0.4); border: 1px solid rgba(100, 200, 255, 0.3); border-radius: 8px; cursor: pointer; }
    .booking-nazeel-page-wrapper .btn-recalc:hover { background: rgba(44, 177, 225, 0.6); }
    .booking-nazeel-page-wrapper .dashboard {
        display: none; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
        gap: 12px; padding: 0 25px; max-width: 1250px; margin: 0 auto 20px;
        animation: fadeIn 0.6s ease;
    }
    .booking-nazeel-page-wrapper .kpi-card {
        background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(100, 200, 255, 0.15); border-radius: 12px; padding: 12px 10px;
        box-shadow: var(--bn-shadow-card); text-align: center; position: relative;
        transition: 0.3s;
    }
    .booking-nazeel-page-wrapper .kpi-card:hover { transform: translateY(-3px); border-color: rgba(44, 177, 225, 0.3); }
    .booking-nazeel-page-wrapper .kpi-icon {
        width: 32px; height: 32px; border-radius: 10px; margin: 0 auto 5px;
        display: flex; align-items: center; justify-content: center; color: #fff; font-size: 0.9rem;
    }
    .booking-nazeel-page-wrapper .k-blue .kpi-icon { background: var(--bn-grad-blue); }
    .booking-nazeel-page-wrapper .k-green .kpi-icon { background: var(--bn-grad-ok); }
    .booking-nazeel-page-wrapper .k-red .kpi-icon { background: var(--bn-grad-err); }
    .booking-nazeel-page-wrapper .k-gold .kpi-icon { background: var(--bn-grad-warn); }
    .booking-nazeel-page-wrapper .k-purple .kpi-icon { background: var(--bn-grad-purple); }
    .booking-nazeel-page-wrapper .kpi-num { font-size: 1.1rem; font-weight: 800; color: #FFFFFF; display: block; margin-bottom: 2px; }
    .booking-nazeel-page-wrapper .kpi-lbl { font-size: 0.65rem; color: rgba(255, 255, 255, 0.6); font-weight: 700; }
    .booking-nazeel-page-wrapper .sub-stats {
        display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 2px;
        margin-top: 8px; padding-top: 5px; border-top: 1px dashed #eee;
    }
    .booking-nazeel-page-wrapper .mini { background: #f8f9fa; border-radius: 6px; padding: 3px; display: flex; flex-direction: column; align-items: center; }
    .booking-nazeel-page-wrapper .mini b { font-size: 0.75rem; } .booking-nazeel-page-wrapper .mini span { font-size: 0.55rem; color: #90a4ae; font-weight: 600; }
    .booking-nazeel-page-wrapper .booking-logo { height: 14px; vertical-align: middle; opacity: 0.9; }
    .booking-nazeel-page-wrapper .results-wrap { display: none; padding: 0 25px; max-width: 1250px; margin: 0 auto; }
    .booking-nazeel-page-wrapper .filter-pills { display: flex; gap: 8px; overflow-x: auto; padding-bottom: 10px; margin-bottom: 15px; }
    .booking-nazeel-page-wrapper .pill {
        white-space: nowrap; padding: 8px 18px; border-radius: 20px; background: rgba(2, 42, 58, 0.7); border: 2px solid rgba(100, 200, 255, 0.2);
        font-weight: 700; font-size: 0.75rem; color: rgba(255, 255, 255, 0.7); cursor: pointer; transition: 0.2s;
    }
    .booking-nazeel-page-wrapper .pill.active { background: rgba(2, 42, 58, 0.95); color: #2CB1E1; border-color: #2CB1E1; box-shadow: 0 0 0 2px rgba(44, 177, 225, 0.2); }
    .booking-nazeel-page-wrapper .pill.red.active { background: rgba(220, 38, 38, 0.3); border-color: #dc2626; color: #dc2626; }
    .booking-nazeel-page-wrapper .search-box {
        width: 100%; padding: 12px 20px; border-radius: 12px; border: 2px solid rgba(100, 200, 255, 0.2);
        background: rgba(2, 42, 58, 0.9); color: #FFFFFF; font-size: 0.9rem; margin-bottom: 20px;
        font-weight: 600;
    }
    .booking-nazeel-page-wrapper .search-box:focus {
        border-color: #2CB1E1;
        background: rgba(2, 42, 58, 1);
        box-shadow: 0 0 0 3px rgba(44, 177, 225, 0.25);
        outline: none;
    }
    .booking-nazeel-page-wrapper .table-responsive { background: transparent; overflow-x: auto; overflow-y: visible; max-width: 100%; -webkit-overflow-scrolling: touch; }
    .booking-nazeel-page-wrapper table { width: 100%; border-collapse: separate; border-spacing: 0 8px; min-width: 0; table-layout: fixed; }
    .booking-nazeel-page-wrapper thead th {
        background: rgba(44, 177, 225, 0.1); color: #2CB1E1; padding: 8px 10px;
        text-align: right; font-weight: 800; font-size: 0.72rem; border: 1px solid rgba(100, 200, 255, 0.15);
        cursor: pointer; user-select: none; word-break: break-word; overflow-wrap: break-word;
    }
    .booking-nazeel-page-wrapper tbody tr { background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(100, 200, 255, 0.1); box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: transform 0.2s; }
    .booking-nazeel-page-wrapper tbody tr:hover { transform: translateY(-2px); box-shadow: 0 8px 15px rgba(44, 177, 225, 0.2); border-color: rgba(44, 177, 225, 0.3); }
    .booking-nazeel-page-wrapper tbody td {
        padding: 10px 12px; border-top: 1px solid rgba(100, 200, 255, 0.1); border-bottom: 1px solid rgba(100, 200, 255, 0.1);
        font-size: 0.82rem; vertical-align: middle; color: rgba(255, 255, 255, 0.9); word-break: break-word; overflow-wrap: break-word;
    }
    .booking-nazeel-page-wrapper thead th:first-child { min-width: 2.8em; }
    .booking-nazeel-page-wrapper tbody td:first-child { border-left: 1px solid rgba(100, 200, 255, 0.1); border-top-left-radius: 12px; border-bottom-left-radius: 12px; min-width: 2.8em; white-space: nowrap; text-align: center; writing-mode: horizontal-tb; }
    .booking-nazeel-page-wrapper tbody td.col-seq { min-width: 2.8em; white-space: nowrap; text-align: center; writing-mode: horizontal-tb; }
    .booking-nazeel-page-wrapper tbody td:last-child { border-right: 1px solid rgba(100, 200, 255, 0.1); border-top-right-radius: 12px; border-bottom-right-radius: 12px; }
    .booking-nazeel-page-wrapper .st-ok { background: #e8f5e9; color: #2e7d32; padding: 3px 8px; border-radius: 5px; font-size: 0.7rem; font-weight: 800; }
    .booking-nazeel-page-wrapper .st-no { background: #ffebee; color: #c62828; padding: 3px 8px; border-radius: 5px; font-size: 0.7rem; font-weight: 800; }
    .booking-nazeel-page-wrapper .match-tag { font-size: 0.7rem; padding: 3px 8px; border-radius: 5px; font-weight: 700; white-space: nowrap; }
    .booking-nazeel-page-wrapper .mt-ok { background: var(--bn-primary-soft); color: var(--bn-primary); }
    .booking-nazeel-page-wrapper .mt-warn { background: #fff8e1; color: #f57f17; }
    .booking-nazeel-page-wrapper .mt-err { background: #ffebee; color: #c62828; }
    .booking-nazeel-page-wrapper .mt-grp { background: #f3e5f5; color: #8e24aa; }
    .booking-nazeel-page-wrapper .mt-guess { background: #e0f2f1; color: #00695c; border:1px solid #b2dfdb; }
    .booking-nazeel-page-wrapper .mt-miss { background: #eceff1; color: #78909c; }
    .booking-nazeel-page-wrapper .mt-alias { background: #e3f2fd; color: #1565c0; border:1px solid #90caf9; }
    .booking-nazeel-page-wrapper .mt-ext { background: #fffde7; color: #fbc02d; border:1px solid #ffee58; }
    .booking-nazeel-page-wrapper .b-name { font-weight: 800; color: #2CB1E1; font-size: 0.82rem; word-break: break-word; overflow-wrap: break-word; }
    .booking-nazeel-page-wrapper .b-ref { font-size: 0.65rem; color: rgba(255, 255, 255, 0.5); }
    .booking-nazeel-page-wrapper .guest-badge { font-size: 0.7rem; color: rgba(255,255,255,0.7); font-weight: 500; }
    .booking-nazeel-page-wrapper .suggested-hint { font-size: 0.72rem; color: #f59e0b; font-weight: 600; margin-top: 4px; }
    .booking-nazeel-page-wrapper .print-summary { display: none; }
    .booking-nazeel-page-wrapper .price-val { font-weight: 700; font-size: 0.85rem; color: #FFFFFF; }
    .booking-nazeel-page-wrapper .diff-pos { color: #27ae60; font-weight: 800; } .booking-nazeel-page-wrapper .diff-neg { color: #c0392b; font-weight: 800; }
    .booking-nazeel-page-wrapper .d-box { display: flex; flex-direction: column; gap: 4px; font-size: 0.75rem; font-weight: 600; min-width: 0; }
    .booking-nazeel-page-wrapper .d-line { display: flex; align-items: center; gap: 6px; padding: 4px 6px; border-radius: 6px; white-space: nowrap; }
    .booking-nazeel-page-wrapper .d-line.d-line-b { background: rgba(41, 128, 185, 0.15); border: 1px solid rgba(41, 128, 185, 0.35); }
    .booking-nazeel-page-wrapper .d-line.d-line-n { background: rgba(39, 174, 96, 0.12); border: 1px solid rgba(39, 174, 96, 0.35); }
    .booking-nazeel-page-wrapper .d-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
    .booking-nazeel-page-wrapper .dot-b { background: #2980b9; } .booking-nazeel-page-wrapper .txt-b { color: #2980b9; font-weight: 700; }
    .booking-nazeel-page-wrapper .dot-n { background: #27ae60; } .booking-nazeel-page-wrapper .txt-n { color: #27ae60; font-weight: 700; }
    .booking-nazeel-page-wrapper .d-label { font-size: 0.7rem; font-weight: 800; min-width: 2.2em; }
    .booking-nazeel-page-wrapper .d-dates { font-size: 0.78rem; font-weight: 600; }
    .booking-nazeel-page-wrapper .btn-mini { padding: 4px 10px; border-radius: 4px; font-size: 0.65rem; font-weight: 700; cursor: pointer; border: none; color: #fff; margin-top: 3px; }
    .booking-nazeel-page-wrapper .bm-merge { background: #8e44ad; }
    .booking-nazeel-page-wrapper .diff-diag { font-size: 0.7rem; color: #90a4ae; font-weight: 600; }
    .booking-nazeel-page-wrapper tbody tr.row-group-sub { background: rgba(142, 37, 170, 0.08); border-color: rgba(142, 37, 170, 0.25); }
    .booking-nazeel-page-wrapper tbody tr.row-group-sub:hover { border-color: rgba(142, 37, 170, 0.4); }
    .booking-nazeel-page-wrapper .group-sub-arrow { color: #8e24aa; font-weight: 800; margin-left: 4px; }
    .booking-nazeel-page-wrapper .avail-in-group { font-size: 0.68rem; color: #27ae60; font-weight: 700; background: rgba(39, 174, 96, 0.15); padding: 2px 6px; border-radius: 4px; white-space: nowrap; }
    .booking-nazeel-page-wrapper .group-split { font-size: 0.7rem; color: rgba(255,255,255,0.6); font-weight: 600; margin-top: 2px; }
    .booking-nazeel-page-wrapper .loader { position: fixed; top:0; left:0; width:100%; height:100%; background: rgba(2, 42, 58, 0.98); z-index: 2000; display: none; justify-content: center; align-items: center; flex-direction: column; gap: 16px; }
    .booking-nazeel-page-wrapper .loader .loader-progress-track { width: min(280px, 85vw); height: 8px; background: rgba(255,255,255,0.12); border-radius: 999px; overflow: hidden; }
    .booking-nazeel-page-wrapper .loader .loader-progress-fill { height: 100%; width: 0%; background: linear-gradient(90deg, var(--bn-primary), #5EC5E8); border-radius: 999px; transition: width 0.35s ease-out; }
    .booking-nazeel-page-wrapper .loader .loader-label { color: var(--bn-primary); font-size: 1rem; font-weight: 600; margin: 0; }
    .booking-nazeel-page-wrapper .loader .loader-pct { color: rgba(255,255,255,0.7); font-size: 0.85rem; font-weight: 500; }
    @media (max-width: 992px) {
        .booking-nazeel-page-wrapper .results-wrap { padding: 0 12px; }
        .booking-nazeel-page-wrapper thead th { padding: 6px 8px; font-size: 0.68rem; }
        .booking-nazeel-page-wrapper tbody td { padding: 8px 10px; font-size: 0.78rem; }
        .booking-nazeel-page-wrapper .match-tag { font-size: 0.65rem; padding: 2px 6px; }
        .booking-nazeel-page-wrapper .d-box { font-size: 0.7rem; }
        .booking-nazeel-page-wrapper .d-dates { font-size: 0.7rem; }
    }
    @media (max-width: 768px) {
        .booking-nazeel-page-wrapper .results-wrap { padding: 0 8px; }
        .booking-nazeel-page-wrapper thead th { padding: 5px 6px; font-size: 0.65rem; }
        .booking-nazeel-page-wrapper tbody td { padding: 6px 8px; font-size: 0.75rem; }
        .booking-nazeel-page-wrapper table { border-spacing: 0 6px; }
        .booking-nazeel-page-wrapper .d-line { padding: 3px 5px; }
    }
    @media print {
        .booking-nazeel-page-wrapper { background: #fff; color: #000; font-size: 9pt; }
        .booking-nazeel-page-wrapper .app-header, .booking-nazeel-page-wrapper .hero-card, .booking-nazeel-page-wrapper .filter-pills, .booking-nazeel-page-wrapper .search-box, .booking-nazeel-page-wrapper .control-panel, .booking-nazeel-page-wrapper .dashboard { display: none !important; }
        .booking-nazeel-page-wrapper .print-summary { display: block !important; margin-bottom: 16px; padding: 12px; border: 1px solid #000; background: #fafafa; }
        .booking-nazeel-page-wrapper .print-summary .ps-title { font-size: 14pt; font-weight: bold; text-align: center; margin-bottom: 10px; }
        .booking-nazeel-page-wrapper .print-summary .ps-date { font-size: 9pt; text-align: left; margin-bottom: 10px; }
        .booking-nazeel-page-wrapper .print-summary table { width: 100%; border-collapse: collapse; font-size: 9pt; margin-bottom: 8px; }
        .booking-nazeel-page-wrapper .print-summary .ps-table th, .booking-nazeel-page-wrapper .print-summary .ps-table td { border: 1px solid #333; padding: 4px 8px; text-align: right; }
        .booking-nazeel-page-wrapper .print-summary .ps-table th { background: #e0e0e0; font-weight: bold; }
        .booking-nazeel-page-wrapper .print-summary .ps-section { font-weight: bold; margin-top: 8px; margin-bottom: 4px; }
        .booking-nazeel-page-wrapper .results-wrap { display: block !important; padding: 0; margin: 20px; width: 98%; }
        .booking-nazeel-page-wrapper .table-responsive { box-shadow: none; border: none; overflow: visible; }
        .booking-nazeel-page-wrapper #mainTable { border-collapse: collapse; width: 100%; border: 1px solid #000; margin-top: 10px; }
        .booking-nazeel-page-wrapper #mainTable th { background: #d9d9d9 !important; color: #000 !important; border: 1px solid #000; padding: 4px 6px; font-size: 9pt; font-weight: bold; text-align: center; }
        .booking-nazeel-page-wrapper #mainTable td { border: 1px solid #000; padding: 3px 5px; color: #000 !important; font-size: 8pt; height: auto; vertical-align: middle; }
        .booking-nazeel-page-wrapper #mainTable td.col-seq { min-width: 2.8em; white-space: nowrap; text-align: center; writing-mode: horizontal-tb; }
        .booking-nazeel-page-wrapper tbody tr { box-shadow: none !important; background: transparent !important; margin: 0 !important; }
        .booking-nazeel-page-wrapper tbody td:first-child, .booking-nazeel-page-wrapper tbody td:last-child { border-radius: 0; border: 1px solid #000; }
        .booking-nazeel-page-wrapper #mainTable { border-spacing: 0; }
        .booking-nazeel-page-wrapper .btn-mini, .booking-nazeel-page-wrapper .d-dot, .booking-nazeel-page-wrapper .sub-stats, .booking-nazeel-page-wrapper .diff-diag { display: none !important; }
        .booking-nazeel-page-wrapper .d-box { display: block; font-weight: normal; font-size: 8pt; }
        .booking-nazeel-page-wrapper .d-line { display: block; margin-bottom: 4px; padding: 3px 6px; border: 1px solid #ccc; border-radius: 4px; }
        .booking-nazeel-page-wrapper .d-line-b { background: #f0f7ff; }
        .booking-nazeel-page-wrapper .d-line-n { background: #f0fff4; }
        .booking-nazeel-page-wrapper .txt-b, .booking-nazeel-page-wrapper .txt-n { color: #000 !important; }
        .booking-nazeel-page-wrapper .badge, .booking-nazeel-page-wrapper .status-badge, .booking-nazeel-page-wrapper .match-tag { border: none; background: transparent !important; color: #000 !important; padding: 0; font-weight: normal; }
        .booking-nazeel-page-wrapper .results-wrap * { color: #000 !important; }
    }
</style>
</head>
<body>

<div class="booking-nazeel-page-wrapper">
<div class="loader" id="loader" style="display:none">
    <i class="fas fa-gem fa-spin fa-3x" style="color:var(--bn-primary)" aria-hidden="true"></i>
    <div class="loader-progress-track">
        <div class="loader-progress-fill" id="loaderProgressFill"></div>
    </div>
    <h4 class="loader-label" id="loaderLabel">جاري التحليل (V18.0)...</h4>
    <span class="loader-pct" id="loaderPct">0%</span>
</div>

<header class="app-header">
    <div class="brand">
        <div class="brand-info">
            <h1>منظومة مقارنة بوكينج و نزيل</h1>
            <p>القناص</p>
        </div>
    </div>
    <div class="header-tools" id="headerTools">
        <button class="btn-chic" onclick="window.print()"><i class="fas fa-print"></i> طباعة</button>
        <button class="btn-chic" onclick="exportExcel()"><i class="fas fa-file-excel"></i> اكسيل</button>
    </div>
</header>

<div class="hero-card" id="uploadCard">
    <p class="goal-line" style="margin:0 20px 15px; font-size:0.85rem; color:rgba(255,255,255,0.85); font-weight:600; text-align:center;">
        الهدف: التحقق من الحضور قبل دفع عمولة بوكينج — مطابقة بوكينج مع نزيل لمعرفة من حضر (عمولة مستحقة) ومن لم يحضر (لا عمولة).
    </p>
    <div class="upload-box">
        <div class="drop-grid">
            <label class="drop-zone" id="dz-naz">
                <i class="fas fa-file-invoice" style="color:var(--bn-accent)"></i>
                <h3>نزيل (Guests)</h3>
                <input accept=".xlsx,.xls,.csv" id="nazeelFile" type="file"/>
                <div class="upload-progress" id="progress-naz"></div>
            </label>
            <label class="drop-zone" id="dz-book">
                <i class="fas fa-passport" style="color:var(--bn-primary)"></i>
                <h3>بوكينج (Booking)</h3>
                <input accept=".xlsx,.xls,.csv" id="bookingFile" type="file"/>
                <div class="upload-progress" id="progress-book"></div>
            </label>
        </div>
        <p class="auto-hint" style="margin:12px 0 0; font-size:0.8rem; color:rgba(255,255,255,0.65);">بعد اختيار الملفين يبدأ التحليل تلقائياً.</p>
    </div>
</div>

<div class="control-panel" id="controlPanel">
    <div class="tax-settings">
        <div class="tax-item">الضريبة <input type="number" id="taxVal" class="tax-inp" value="15"></div>
        <div class="tax-item">البلدية <input type="number" id="muniVal" class="tax-inp" value="2.5"></div>
        <button type="button" class="btn-recalc" id="btnRecalc" onclick="window.startEngine && window.startEngine();" title="إعادة التحليل بقيم الضريبة والبلدية الحالية (بدون إعادة رفع الملفات)">إعادة تحليل</button>
    </div>
</div>

<div class="dashboard" id="dashboard">
    <div class="kpi-card k-blue">
        <div class="kpi-icon"><i class="fas fa-book"></i></div>
        <span class="kpi-num" id="kpiBook">0</span>
        <span class="kpi-lbl">إجمالي</span>
        <div class="sub-stats">
            <div class="mini"><b id="subOk" style="color:var(--bn-primary)">0</b><span>مؤكد</span></div>
            <div class="mini"><b id="subCan" style="color:#c0392b">0</b><span>ملغي</span></div>
            <div class="mini"><b id="subNos" style="color:#f39c12">0</b><span>NoShow</span></div>
        </div>
    </div>

    <div class="kpi-card k-green" title="حضر ووُجد في نزيل — عمولة مستحقة">
        <div class="kpi-icon"><i class="fas fa-check"></i></div>
        <span class="kpi-num" id="kpiOk">0</span>
        <span class="kpi-lbl">مطابق</span>
    </div>
    <div class="kpi-card k-purple">
        <div class="kpi-icon"><i class="fas fa-layer-group"></i></div>
        <span class="kpi-num" id="kpiGroup">0</span>
        <span class="kpi-lbl">تجميع/ت.يدوي</span>
    </div>
    <div class="kpi-card k-gold">
        <div class="kpi-icon"><i class="fas fa-fingerprint"></i></div>
        <span class="kpi-num" id="kpiMoney">0</span>
        <span class="kpi-lbl">بصمة/تمديد</span>
    </div>
    
    <div class="kpi-card">
        <span class="kpi-num" id="kpiRevB" style="color:#003580; font-size:1.3rem">0</span>
        <span class="kpi-lbl" style="font-size:0.65rem">
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/be/Booking.com_logo.svg" class="booking-logo"> إيراد
        </span>
    </div>
    <div class="kpi-card">
        <span class="kpi-num" id="kpiRevN" style="color:var(--bn-primary); font-size:1.3rem">0</span>
        <span class="kpi-lbl" style="font-size:0.65rem">إيراد نزيل</span>
    </div>
    <div class="kpi-card k-red">
        <div class="kpi-icon"><i class="fas fa-exclamation-triangle"></i></div>
        <span class="kpi-num" id="kpiRecover">0</span>
        <span class="kpi-lbl">تسكين (إلغاء)</span>
    </div>
    <div class="kpi-card" title="حجز مؤكد في بوكينج لكن غير موجود في نزيل — لا تدفع عمولة">
        <div class="kpi-icon" style="background:var(--bn-grad-warn); color:#fff; width:32px; height:32px; border-radius:10px; margin:0 auto 5px; display:flex; align-items:center; justify-content:center; font-size:0.9rem;"><i class="fas fa-user-slash"></i></div>
        <span class="kpi-num" id="kpiMiss">0</span>
        <span class="kpi-lbl" style="font-size:0.65rem">لم يحضر (لا عمولة)</span>
    </div>
    <div class="kpi-card">
        <span class="kpi-num" id="kpiDiff" style="color:#78909c; font-size:1.3rem">0</span>
        <span class="kpi-lbl" style="font-size:0.65rem">الفرق</span>
    </div>
</div>

<div class="results-wrap" id="resultsArea">
    <div id="printSummary" class="print-summary" aria-hidden="true"></div>
    <div class="filter-pills">
        <div class="pill active" onclick="setFilter('all', this)" title="عرض كل النتائج">الكل</div>
        <div class="pill" onclick="setFilter('name,reversed', this)" title="فقط الصفوف التي تم الربط فيها حسب الاسم (تطابق الاسم أو عكس الاسم)">حضر — ربط بالاسم</div>
        <div class="pill red" onclick="setFilter('conflict', this)" title="حجز ملغي في بوكينج — لا تدفع عمولة">ملغي (لا عمولة)</div>
        <div class="pill" onclick="setFilter('group,multi', this)" title="تجميع/غرفتان: ربط بالاسم + تأكيد بالمبلغ (فرق ≤5٪). ✓ تأكيد بالمبلغ = فرق ≤5 ر.س">حضر — تجميع / غرفتان</div>
        <div class="pill" onclick="setFilter('alias', this)" title="مطابقة محفوظة سابقاً — عمولة مستحقة">حضر — ربط يدوي</div>
        <div class="pill" onclick="setFilter('guess,extension,money', this)" title="مطابقة أضعف أو تمديد إقامة — راجع قبل دفع العمولة">حضر — مراجعة</div>
        <div class="pill" id="filter-miss" onclick="setFilter('miss', this)" title="مؤكد في بوكينج لكن غير موجود في نزيل — لا تدفع عمولة">لم يحضر (لا عمولة)</div>
        <div class="pill" onclick="setStatusFilter('confirmed', this)" title="حجز مؤكد في بوكينج (قد تكون عليه عمولة)">حالة: مؤكد</div>
        <div class="pill" onclick="setStatusFilter('cancelled', this)" title="حجز ملغي في بوكينج — لا عمولة">حالة: ملغي</div>
    </div>

    <div id="diagnosticReport" class="diagnostic-report" style="display:none; margin:15px 0; padding:15px; background:rgba(0,0,0,0.3); border:1px solid rgba(44,177,225,0.3); border-radius:12px; font-size:0.85rem;"></div>

    <input type="text" class="search-box" id="searchInput" placeholder="بحث..." aria-label="بحث في الجدول">

    <div class="table-responsive">
        <table id="mainTable">
            <thead>
                <tr>
                    <th style="width:3%;min-width:2.8em" onclick="sortTable(0)"># <i class="fas fa-sort"></i></th>
                    <th style="width:16%" onclick="sortTable(1)">الاسم (B) <i class="fas fa-sort"></i></th>
                    <th style="width:8%" onclick="sortTable(2)">الحالة <i class="fas fa-sort"></i></th>
                    <th style="width:16%" onclick="sortTable(3)">الاسم (N) <i class="fas fa-sort"></i></th>
                    <th style="width:12%" onclick="sortTable(4)">الربط <i class="fas fa-sort"></i></th>
                    <th style="width:9%" onclick="sortTable(5)">بوكينج <i class="fas fa-sort"></i></th>
                    <th style="width:9%" onclick="sortTable(6)">نزيل <i class="fas fa-sort"></i></th>
                    <th style="width:8%" onclick="sortTable(7)">الفرق <i class="fas fa-sort"></i></th>
                    <th style="width:19%" onclick="sortTable(8)">التواريخ <i class="fas fa-sort"></i></th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>
</div>

</div>

<script>
// --- IndexedDB Functions (V18.0) ---
function initDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('AdoraMatchDB', 1);

        request.onupgradeneeded = (e) => {
            db = e.target.result;
            if (!db.objectStoreNames.contains('aliases')) {
                db.createObjectStore('aliases', { keyPath: 'bName' });
            }
        };

        request.onsuccess = (e) => {
            db = e.target.result;
            resolve(db);
        };

        request.onerror = (e) => {
            // IndexedDB error - reject silently
            reject(e.target.error);
        };
    });
}

function saveAlias(bName, nName) {
    if(!db) return;
    const transaction = db.transaction(['aliases'], 'readwrite');
    const store = transaction.objectStore('aliases');
    store.put({ bName: normalize(bName), nName: normalize(nName) });
}

function getAlias(bName) {
    return new Promise((resolve, reject) => {
        if(!db) { resolve(null); return; }
        const transaction = db.transaction(['aliases'], 'readonly');
        const store = transaction.objectStore('aliases');
        const request = store.get(normalize(bName));
        
        request.onsuccess = (e) => {
            resolve(e.target.result);
        };

        request.onerror = (e) => {
            console.error("Error retrieving alias:", e.target.error);
            resolve(null);
        };
    });
}
// --- End IndexedDB Functions ---


// AI Levenshtein
function levenshtein(a, b) {
    const matrix = [];
    for(let i=0; i<=b.length; i++) matrix[i] = [i];
    for(let j=0; j<=a.length; j++) matrix[0][j] = j;
    for(let i=1; i<=b.length; i++) {
        for(let j=1; j<=a.length; j++) {
            if(b.charAt(i-1)==a.charAt(j-1)) matrix[i][j] = matrix[i-1][j-1];
            else matrix[i][j] = Math.min(matrix[i-1][j-1]+1, Math.min(matrix[i][j-1]+1, matrix[i-1][j]+1));
        }
    }
    return matrix[b.length][a.length];
}

function safeSet(id, v){ if(document.getElementById(id)) document.getElementById(id).textContent = v; }
function cleanPrice(v) { return parseFloat(String(v||0).replace(/[^0-9.]/g, "").replace(",", ".")) || 0; }

// تسامح متوقع مع أخطاء الموظف: أسماء مختلفة، تاريخ بوكينج 1 يناير ونزيل 2 يناير، أخطاء في رقم الحجز
var DATE_TOLERANCE_DAYS_NAME = 2;   // بوكينج يوم 1 ونزيل يوم 2 → نفس الضيف
var DATE_TOLERANCE_DAYS_GROUP = 3;
var DATE_TOLERANCE_DAYS_GUESS = 2;
var DATE_TOLERANCE_DAYS_EXT = 2;
var PRICE_TOLERANCE_NAME = 15;      // تقريب/ضريبة مختلفة
var PRICE_TOLERANCE_GROUP = 15;
var PRICE_TOLERANCE_GUESS = 8;     // أوسع من 3 لتفادي مفقود بسبب خطأ بسيط
var PRICE_TOLERANCE_EXT = 20;

function normalize(s) {
    s = String(s||"");
    if(s.includes(",")) s = s.split(",").map(function(p){return p.trim();}).reverse().join(" ");
    return s.toLowerCase()
        .replace(/[أإآ]/g,"ا").replace(/ة/g,"ه").replace(/ى/g,"ي")
        .replace(/al-/g, "").replace(/al /g, "").replace(/bin /g, "").replace(/abu /g, "")
        .replace(/mr /g, "").replace(/mrs /g, "")
        .replace(/[^\w\u0600-\u06FF]/g," ").replace(/\s+/g, " ").trim();
}

// V19.0: Gemini AI for cross-language/phonetic name matching
var GEMINI_API_KEY = "AIzaSyD_XDLjvHhNCuIPSymraAytrJi2ktCL2Vo";
async function callAI(guestName, candidatePool) {
    try {
        var res = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + GEMINI_API_KEY, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: 'IS GUEST "' + guestName + '" THE SAME PERSON AS ANY IN THIS LIST (PHONETIC/CROSS-LANGUAGE)? [' + candidatePool.join(',') + ']. JSON ONLY: {"match":true, "name":"ExactNameFromList"} or {"match":false}' }] }]
            })
        });
        var d = await res.json();
        var text = d.candidates[0].content.parts[0].text;
        var jsonMatch = text.match(/\{.*\}/s);
        if (jsonMatch) return JSON.parse(jsonMatch[0]);
        return null;
    } catch(e) { return null; }
}
// مرجع رقم الحجز: الموظف قد يغلط (رقم ناقص، زائد، حرف) — نسمح بتطابق يتضمن أو ليفنشتاين صغير
function refMatch(bRef, nRef) {
    var b = String(bRef||"").trim();
    var n = String(nRef||"").trim();
    if (!b || !n) return false;
    if (n.indexOf(b) !== -1 || b.indexOf(n) !== -1) return true;
    if (b.length <= 12 && n.length <= 12 && levenshtein(b, n) <= 2) return true;
    return false;
}

function parseDate(v) {
    if(!v && v!==0) return null;
    if(typeof v === 'number') return new Date((v - 25569)*86400000);
    if(typeof v === 'string') {
        if(v.includes('-')) { let p = v.split(' ')[0].split('-'); if(p[0].length===4) return new Date(p[0],p[1]-1,p[2]); return new Date(p[2],p[1]-1,p[0]); }
        if(v.includes('/')) { let p = v.split(' ')[0].split('/'); if(p[0].length===4) return new Date(p[0],p[1]-1,p[2]); return new Date(p[2],p[1]-1,p[0]); }
    }
    return null;
}
function toENDateStr(d) { if(!d) return "-"; return d.toLocaleDateString('en-GB', {day:'2-digit', month:'2-digit'}); }
// كلمات الاسم للمقارنة. نضمّن كلمات طولها 2 إذا الاسم كلمتان أو أكثر حتى لا نربط على كلمة واحدة فقط (مثل Saws Ka → هادي عندما تُستبعد "ka" فتبقى "saws" فقط)
function getParts(name) {
    var parts = normalize(name).split(" ").filter(Boolean);
    // دمج "عبد" + "الملك" / "الله" / "الرحمن" لتمكين SAUD ABDULMALIK ↔ سعود عبد الملك
    var merged = [];
    for (var i = 0; i < parts.length; i++) {
        if (parts[i] === "عبد" && i + 1 < parts.length && (parts[i + 1] === "الملك" || parts[i + 1] === "الله" || parts[i + 1] === "الرحمن")) {
            merged.push(parts[i] + " " + parts[i + 1]);
            i++;
        } else merged.push(parts[i]);
    }
    parts = merged;
    var long = parts.filter(x => x.length > 2);
    if (long.length >= 2) return long;
    if (parts.length >= 2 && long.length <= 1) return parts;
    return long.length ? long : parts;
}

// تحويل عربي → لاتيني ديناميكي (ينطبق على أي ملف/أسماء مستقبلاً)
var AR_TO_LAT = { 'ا':'a','أ':'a','آ':'a','إ':'a','ئ':'y','ؤ':'w','ء':'',
    'ب':'b','ت':'t','ث':'th','ج':'j','ح':'h','خ':'kh','د':'d','ذ':'dh','ر':'r','ز':'z',
    'س':'s','ش':'sh','ص':'s','ض':'d','ط':'t','ظ':'z','ع':'a','غ':'gh','ف':'f','ق':'q',
    'ك':'k','ل':'l','م':'m','ن':'n','ه':'h','و':'w','ي':'y','ى':'y','ة':'h','ڤ':'v' };
function isArabicWord(w) {
    if (!w || typeof w !== 'string') return false;
    for (var i = 0; i < w.length; i++) { if (w.charCodeAt(i) >= 0x0600 && w.charCodeAt(i) <= 0x06FF) return true; }
    return false;
}
function transliterateToLatin(w) {
    if (!w || typeof w !== 'string') return '';
    var out = '';
    for (var i = 0; i < w.length; i++) {
        var c = w[i];
        out += AR_TO_LAT[c] !== undefined ? AR_TO_LAT[c] : (c.charCodeAt(0) >= 0x0600 && c.charCodeAt(0) <= 0x06FF ? '' : c);
    }
    return out.replace(/\s+/g, ' ').trim();
}

// القاعدة: أمثلة المستخدم (غفران الحسني↔Ghufran، SAUD↔سعود عبد الملك، مشبب البراء↔البراء مشبب) تُستخدم لتعديل القاعدة وليس لحل الاسم فقط.
// مرادفات عربي↔لاتيني = أنماط. عكس ترتيب الاسم (مشبب البراء في بوكينج ↔ البراء مشبب في نزيل) مغطى بمرحلة "نفس الكلمات/عكس" وتطابق صارم أول/آخر.
var COMMON_NAME_EQUIVALENTS = [
    { ar: "محمد", lat: ["mohammed", "muhammad", "mohamed", "mhmd", "mohamad"] },
    { ar: "عبدالله", lat: ["abdullah", "abdallah", "abdalla"] },
    { ar: "سعود", lat: ["saud"] },
    { ar: "عبدالملك", lat: ["abdulmalik", "abdul malik", "abdulmalek"] },
    { ar: "عبد الملك", lat: ["abdulmalik", "abdul malik"] },
    { ar: "الملك", lat: ["malik", "malek"] },
    { ar: "ابراهيم", lat: ["ibrahim", "ebrahem", "abrahim", "ibrahem"] },
    { ar: "الصاعدي", lat: ["alsaedi", "alsedi", "alsaady", "alsaadi", "alsaedy", "alsaidi"] },
    { ar: "صاعدي", lat: ["alsaedi", "alsedi", "alsaady", "alsaadi"] },
    { ar: "الغامدي", lat: ["ghamdi", "ghamdy", "alghamdi", "alghamdy"] },
    { ar: "غامدي", lat: ["ghamdi", "ghamdy"] },
    { ar: "أحمد", lat: ["ahmed", "ahmad"] },
    { ar: "علي", lat: ["ali", "aly"] },
    { ar: "هدى", lat: ["huda", "hoda"] },
    { ar: "هبه", lat: ["hebatalla", "heba", "haba", "hebatallah"] },
    { ar: "الساعي", lat: ["elsaey", "alsaey", "elsaei", "alsaiei", "alsaay"] },
    { ar: "ساعي", lat: ["elsaey", "alsaey", "elsaei", "alsaiei"] },
    { ar: "العنزي", lat: ["alanazi", "al anazi", "alnazi"] },
    { ar: "عنزي", lat: ["alanazi", "al anazi"] },
    { ar: "العسيري", lat: ["alasiri", "al asiri", "alasiry", "al asiry"] },
    { ar: "عسيري", lat: ["alasiri", "al asiri"] },
    { ar: "صالح", lat: ["saleh", "salah"] },
    { ar: "السلمي", lat: ["sulami", "alsulami", "al sulami"] },
    { ar: "سلمي", lat: ["sulami"] },
    { ar: "هادي", lat: ["hadi"] },
    { ar: "زاهر", lat: ["zaher", "zaheer"] },
    { ar: "البراء", lat: ["albaraa", "albara", "baraa", "bara"] },
    { ar: "مشبب", lat: ["mushabbab", "meshabbab", "meshabab"] },
    { ar: "يعقوب", lat: ["yaqub", "yacoub", "yagoub", "yaqoub"] },
    { ar: "الصيني", lat: ["alsini", "al sini", "alsiney", "sini"] },
    { ar: "صيني", lat: ["alsini", "sini"] },
    { ar: "طه", lat: ["taha"] },
    { ar: "الكليدار", lat: ["alkillidar", "al killidar", "killidar"] },
    { ar: "عبدالمجيد", lat: ["abdulmajeed", "abdul majeed", "abdulmajid"] },
    { ar: "الطويرقي", lat: ["altowairqi", "al towairqi", "towairqi", "altuwairqi"] },
    { ar: "طويرقي", lat: ["altowairqi", "towairqi"] },
    { ar: "ماجد", lat: ["majed", "maged"] },
    { ar: "امجد", lat: ["amjad", "majed", "maged"] },
    { ar: "الزامل", lat: ["alzamil", "al zamil", "zamil"] },
    { ar: "زامل", lat: ["alzamil", "zamil"] },
    { ar: "إيمان", lat: ["imen", "iman", "imane"] },
    { ar: "غفران", lat: ["ghufran", "gufran"] },
    { ar: "الحسني", lat: ["hussein", "hussain", "husain", "alhusaini", "alhussaini"] },
    { ar: "حسني", lat: ["hussein", "hussain", "husain"] },
    { ar: "شاوش", lat: ["chaouch", "chaouech", "chaouche"] },
    { ar: "عاثر", lat: ["atheer", "ather"] },
    { ar: "المتير", lat: ["almutaire", "al mutaire", "almutairi", "mutaire"] },
    { ar: "متير", lat: ["almutaire", "mutaire"] },
    { ar: "موضي", lat: ["modhi", "moudhi", "mody"] },
    { ar: "العازمي", lat: ["alazmi", "al azmi", "alazemi"] },
    { ar: "عازمي", lat: ["alazmi", "azmi"] },
    { ar: "بينايان", lat: ["binayan", "binian"] },
    { ar: "ابونايف", lat: ["abonayef", "abunayef", "abunaif"] },
    { ar: "العتيبي", lat: ["alotibi", "al otaibi", "otibi", "otaibi"] },
    { ar: "عتيبي", lat: ["alotibi", "otibi"] },
    { ar: "العالم", lat: ["alam", "alalam"] },
    { ar: "حنان", lat: ["hanan"] },
    { ar: "رنا", lat: ["rana"] },
    { ar: "سعد", lat: ["saad", "sad"] },
    { ar: "ياسر", lat: ["yasser", "yaser"] },
    { ar: "الشهراني", lat: ["alshahrani", "shahrani"] },
    { ar: "الزهراني", lat: ["alzahrani", "zahrani"] },
    { ar: "حمادة", lat: ["hamada", "hamad"] },
    { ar: "حماد", lat: ["hamada", "hamad"] },
    { ar: "عمر", lat: ["omara", "omar", "umara"] },
    { ar: "الاحمدي", lat: ["alahmadi", "alahmady", "al ahmadi"] },
    { ar: "احمدي", lat: ["alahmadi", "ahmadi"] },
    { ar: "حسام", lat: ["hussam", "hossam", "husam"] },
    { ar: "الديادي", lat: ["aldadi", "al dadi", "aldady"] },
    { ar: "الدادي", lat: ["aldadi", "al dadi", "aldady"] },
    { ar: "عبدالرحمن", lat: ["abdulrahman", "abdul rahman", "abdulrahman"] },
    { ar: "سوسن", lat: ["sawsen", "sawsan", "saws"] },
    { ar: "سوس", lat: ["saws"] },
    { ar: "كلبوسي", lat: ["kalboussi", "kalbousi", "kalbusi"] },
    { ar: "حسين", lat: ["hussein", "hussain", "husain"] },
    { ar: "بدر", lat: ["bader", "badr"] },
    { ar: "الرويلي", lat: ["alrwili", "al rwili", "alruwaili"] },
    { ar: "رويلي", lat: ["alrwili", "rwili"] },
    { ar: "حمزة", lat: ["hamzah", "hamza"] },
    { ar: "عثمان", lat: ["othman", "osman", "uthman"] },
    { ar: "خالد", lat: ["khalid", "khaled"] },
    // الحالات المفقودة والربط الخاطئ (عمار، إسلام، الشهري، عبدالعزيز، اسامة، السحيمي)
    { ar: "عمار", lat: ["ammar", "amar", "ammara"] },
    { ar: "النخلي", lat: ["alnakhli", "al nakhli", "elnakhli", "nakhli"] },
    { ar: "نخلي", lat: ["alnakhli", "nakhli"] },
    { ar: "إسلام", lat: ["islam", "eslam"] },
    { ar: "اسلام", lat: ["islam", "eslam"] },
    { ar: "الديادي", lat: ["aldadi", "al dadi", "aldady", "ellaboudy", "elaboudy", "laboudy"] },
    { ar: "الشهري", lat: ["alshehri", "al shehri", "alshahri", "alshihri", "shehri"] },
    { ar: "شهري", lat: ["alshehri", "shehri"] },
    { ar: "عبدالعزيز", lat: ["abdulaziz", "abdul aziz", "abdulazez"] },
    { ar: "اسامة", lat: ["osama", "usama", "ossama"] },
    { ar: "السحيمي", lat: ["alsuhaymi", "al suhaymi", "alsuhimi", "suhaymi", "alsuhymi"] },
    { ar: "سحيمي", lat: ["alsuhaymi", "suhaymi"] }
];

// مقارنة كلمة بوكينج مع كلمة نزيل — ديناميكي: يطبّق على أي اسم في أي ملف (نقل حرفي عربي↔لاتيني + مرادفات أنماط + بادئة)
function wordSimilarity(bp, np, maxDist) {
    maxDist = maxDist === undefined ? 2 : maxDist;
    var crossDist = Math.max(maxDist, 4);
    var bpNorm = normalize(bp);
    var npNorm = normalize(np);
    if (bpNorm.length >= 3 && npNorm.length >= 3 && (npNorm.indexOf(bpNorm) === 0 || bpNorm.indexOf(npNorm) === 0)) return true;
    if (levenshtein(bp, np) <= maxDist) return true;
    for (var i = 0; i < COMMON_NAME_EQUIVALENTS.length; i++) {
        var eq = COMMON_NAME_EQUIVALENTS[i];
        var arMatch = (npNorm === eq.ar || npNorm.indexOf(eq.ar) === 0);
        var latMatch = eq.lat.some(function(l) { return levenshtein(bpNorm, l) <= maxDist; });
        if (arMatch && latMatch) return true;
    }
    if (isArabicWord(np)) {
        var npLat = transliterateToLatin(np);
        if (npLat) {
            if (levenshtein(bpNorm, npLat) <= crossDist) return true;
            if (npLat.length > 2 && npLat.substring(0, 2) === "al" && levenshtein(bpNorm, npLat.substring(2)) <= maxDist) return true;
        }
    }
    if (isArabicWord(bp)) {
        var bpLat = transliterateToLatin(bp);
        if (bpLat) {
            if (levenshtein(bpLat, npNorm) <= crossDist) return true;
            if (bpLat.length > 2 && bpLat.substring(0, 2) === "al" && levenshtein(bpLat.substring(2), npNorm) <= maxDist) return true;
        }
    }
    return false;
}

/** مطابقة صارمة للاسم الأول/الأخير فقط — مرادف معتمد أو ليفنشتاين 1 أو بادئة (طول≥3، أو 2 حرف إذا الطرف الآخر ≥5 مثل Ka→kalboussi) — تفادي Zaher↔ياسر، علي↔صالح */
function wordSimilarityStrictFirstLast(bp, np) {
    var bpNorm = normalize(bp);
    var npNorm = normalize(np);
    if (bpNorm.length >= 3 && npNorm.length >= 3 && (npNorm.indexOf(bpNorm) === 0 || bpNorm.indexOf(npNorm) === 0)) return true;
    if (bpNorm.length >= 2 && npNorm.length >= 5 && npNorm.indexOf(bpNorm) === 0) return true;
    if (npNorm.length >= 2 && bpNorm.length >= 5 && bpNorm.indexOf(npNorm) === 0) return true;
    if (levenshtein(bpNorm, npNorm) <= 1) return true;
    for (var i = 0; i < COMMON_NAME_EQUIVALENTS.length; i++) {
        var eq = COMMON_NAME_EQUIVALENTS[i];
        var arMatch = (npNorm === eq.ar || npNorm.indexOf(eq.ar) === 0) || (bpNorm === eq.ar || bpNorm.indexOf(eq.ar) === 0);
        var latMatch = eq.lat.some(function(l) { return levenshtein(bpNorm, l) <= 1; }) || eq.lat.some(function(l) { return levenshtein(npNorm, l) <= 1; });
        if (arMatch && latMatch) return true;
    }
    if (isArabicWord(np)) {
        var npLat = transliterateToLatin(np);
        if (npLat && levenshtein(bpNorm, npLat) <= 1) return true;
    }
    if (isArabicWord(bp)) {
        var bpLat = transliterateToLatin(bp);
        if (bpLat && levenshtein(bpLat, npNorm) <= 1) return true;
    }
    return false;
}

/** مثل twoWordMatchesFirstOrLast لكن بمطابقة صارمة (أول/آخر فقط) — لرفض ربط خاطئ مثل Zaher ALASIRI↔ياسر القحطاني، Rana Saad↔علي مشبب */
function twoWordMatchesFirstOrLastStrict(bParts, nParts) {
    if (!bParts.length || bParts.length !== 2 || !nParts.length) return false;
    var first = 0, last = nParts.length - 1;
    var b0First = wordSimilarityStrictFirstLast(bParts[0], nParts[first]);
    var b0Last = wordSimilarityStrictFirstLast(bParts[0], nParts[last]);
    var b1First = wordSimilarityStrictFirstLast(bParts[1], nParts[first]);
    var b1Last = wordSimilarityStrictFirstLast(bParts[1], nParts[last]);
    return (b0First || b0Last) && (b1First || b1Last);
}

function guessNameOverlap(bParts, nParts) {
    if (!bParts.length || !nParts.length) return false;
    for (var i = 0; i < bParts.length; i++) {
        for (var j = 0; j < nParts.length; j++) {
            // تسامح 3: خطأ موظف في الاسم (حرف ناقص/زائد أو اختلاف تهجئة)
            if (wordSimilarity(bParts[i], nParts[j], 3)) return true;
        }
    }
    return false;
}
function nameMatchScore(bParts, nParts, strict) {
    var maxDist = strict ? 1 : 2;
    var simScore = 0;
    if (!bParts.length || !nParts.length) return 0;
    bParts.forEach(function(bp) {
        if (nParts.some(function(np) { return wordSimilarity(bp, np, maxDist); })) simScore++;
    });
    return simScore;
}

/** عند وجود كلمة واحدة في البوكينج (مثل Saws Ka → "saws" فقط)، نقبل المطابقة فقط إذا الكلمة المطابقة في نزيل هي الاسم الأول أو الأخير — لا اسم أوسط (تفادي ربط Saws Ka بـ عبدالله سعد عبدالله الغامدي لأن "Saws" تشبه "سعد"). */
function singleWordMatchesFirstOrLast(bParts, nParts, maxDist) {
    if (!bParts.length || bParts.length > 1 || !nParts.length) return false;
    var bp = bParts[0];
    for (var j = 0; j < nParts.length; j++) {
        if ((j === 0 || j === nParts.length - 1) && wordSimilarity(bp, nParts[j], maxDist)) return true;
    }
    return false;
}

/** عند وجود كلمتين في البوكينج (مثل Saws Ka)، نقبل المطابقة فقط إذا كلتا الكلمتين تطابقان الاسم الأول أو الأخير في نزيل — لا اسم أوسط (تفادي ربط Saws Ka بـ ماجد شارع جربوع ال زامل لأن "saws" تشبه "شارع" و"ka" تشبه "ماجد" بالتقريب). */
function twoWordMatchesFirstOrLast(bParts, nParts, maxDist) {
    maxDist = maxDist === undefined ? 2 : maxDist;
    if (!bParts.length || bParts.length !== 2 || !nParts.length) return false;
    var first = 0, last = nParts.length - 1;
    var b0First = wordSimilarity(bParts[0], nParts[first], maxDist);
    var b0Last = wordSimilarity(bParts[0], nParts[last], maxDist);
    var b1First = wordSimilarity(bParts[1], nParts[first], maxDist);
    var b1Last = wordSimilarity(bParts[1], nParts[last], maxDist);
    return (b0First || b0Last) && (b1First || b1Last);
}

/** اسم فرعي: كل كلمات الاسم الأقصر موجودة في الأطول (علي ابراهيم عابد داخل علي ابراهيم الضوي عابد، صالح السلمي داخل صالح دخيل ربه سلطان السلمي) */
function nameSubsetMatch(bParts, nParts, maxDist) {
    maxDist = maxDist === undefined ? 2 : maxDist;
    if (!bParts.length || !nParts.length) return false;
    var shorter = bParts.length <= nParts.length ? bParts : nParts;
    var longer = bParts.length <= nParts.length ? nParts : bParts;
    for (var i = 0; i < shorter.length; i++) {
        if (!longer.some(function(lw) { return wordSimilarity(shorter[i], lw, maxDist); })) return false;
    }
    return true;
}

/** نفس الكلمات بترتيب مختلف (مشبب البراء ↔ البراء مشبب) — تسامح أكبر في السعر والتاريخ */
function nameSameWords(bParts, nParts, maxDist) {
    if (!bParts.length || !nParts.length || bParts.length !== nParts.length) return false;
    return nameSubsetMatch(bParts, nParts, maxDist) && nameSubsetMatch(nParts, bParts, maxDist);
}

/** عكس الاسم: أول↔ثاني (Zaher ALASIRI ↔ ALASIRI Zaher، مشبب البراء ↔ البراء مشبب) — مرونة صريحة لتفادي مفقود زائف */
function nameFirstLastReversed(bParts, nParts, maxDist) {
    maxDist = maxDist === undefined ? 2 : maxDist;
    if (!bParts.length || !nParts.length || bParts.length !== 2 || nParts.length !== 2) return false;
    return wordSimilarity(bParts[0], nParts[1], maxDist) && wordSimilarity(bParts[1], nParts[0], maxDist);
}

/** عكس الاسم بتطابق صارم (أول/آخر فقط) — لرفض ربط خاطئ مثل Saws Ka ↔ طه سمير رجب، وقبول مشبب البراء ↔ البراء مشبب */
function nameFirstLastReversedStrict(bParts, nParts) {
    if (!bParts.length || !nParts.length || bParts.length !== 2 || nParts.length !== 2) return false;
    return wordSimilarityStrictFirstLast(bParts[0], nParts[1]) && wordSimilarityStrictFirstLast(bParts[1], nParts[0]);
}

/** نفس الكلمات أو عكس أول/ثاني — يستخدم في كل مراحل المطابقة لمرونة كاملة */
function nameSameWordsOrReversed(bParts, nParts, maxDist) {
    if (nameSameWords(bParts, nParts, maxDist)) return true;
    return nameFirstLastReversed(bParts, nParts, maxDist);
}

// V18.0: Diagnostic Difference
function getDiffDiagnosis(diff, bPriceNet, taxMultiplier) {
    const absDiff = Math.abs(diff);
    if (absDiff < 5) return "مطابقة تامة"; // Almost zero difference
    
    // Check for Tax/Muni difference (17.5%)
    const taxDiff = bPriceNet * (taxMultiplier - 1);
    if (Math.abs(absDiff - taxDiff) < 5) return "فرق ضريبة/بلدية";

    // Since we don't know the exact price per night, we check if the difference is a common night price variation (e.g., 20% of net price, covering an extra night at minimum price or a price adjustment)
    const nightGuess = bPriceNet * 0.25; // Heuristic: maybe 25% of net booking price is one night
    if (absDiff > nightGuess) return diff > 0 ? "تمديد ليلة محتمل" : "تخفيض سعر/خصم";

    return diff > 0 ? "زيادة غير مشخصة" : "نقصان غير مشخص";
}


// UI - Initialize event listeners after DOM is ready
// This will be handled in init() method

async function readSheet(file) {
    return new Promise(resolve => {
        const r = new FileReader();
        r.onload = e => { const wb = XLSX.read(e.target.result, {type:'array'}); resolve(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], {header:1})); };
        r.readAsArrayBuffer(file);
    });
}
// اكتشاف صف العناوين: نسمح ببدائل (موظف يكتب "اسم العميل" بدل "إسم العميل")
function getData(raw, keys) {
    let hRow = -1;
    for(let i=0; i<20; i++) {
        if(!raw[i]) continue;
        let s = JSON.stringify(raw[i]);
        let ok = keys.every(function(k) {
            if(s.includes(k)) return true;
            if(k === "إسم العميل" && s.includes("اسم العميل")) return true;
            return false;
        });
        if(ok) { hRow = i; break; }
    }
    if(hRow===-1) return [];
    let headers = raw[hRow].map(x=>String(x||"").trim());
    return raw.slice(hRow+1).map(r => {
        let obj={};
        headers.forEach((h,i)=> {
            let key = (h === "اسم العميل" ? "إسم العميل" : h);
            obj[key] = r[i];
        });
        return obj;
    });
}

function setLoaderProgress(pct, label) {
    var fill = document.getElementById('loaderProgressFill');
    var lbl = document.getElementById('loaderLabel');
    var pctEl = document.getElementById('loaderPct');
    if (fill) fill.style.width = Math.min(100, Math.max(0, pct)) + '%';
    if (lbl && label !== undefined) lbl.textContent = label;
    if (pctEl) pctEl.textContent = Math.round(Math.min(100, Math.max(0, pct))) + '%';
}
if (typeof window !== 'undefined') window.setLoaderProgress = setLoaderProgress;

async function startEngine() {
    const f1 = document.getElementById('nazeelFile').files[0];
    const f2 = document.getElementById('bookingFile').files[0];
    if(!f1 || !f2) { alert("⚠️ يرجى رفع الملفات"); return; }

    document.getElementById('loader').style.display = 'flex';
    document.getElementById('uploadCard').style.display = 'none';
    setLoaderProgress(0, 'جاري التحليل (V18.0)...');

    const taxP = parseFloat(document.getElementById('taxVal').value) || 0;
    const muniP = parseFloat(document.getElementById('muniVal').value) || 0;
    const tax = 1 + ((taxP + muniP) / 100);

    await initDB(); // V18.0: Initialize IndexedDB
    setLoaderProgress(10, 'جاري قراءة ملف نزيل...');

    setTimeout(async () => {
        try {
            const nRaw = await readSheet(f1);
            setLoaderProgress(35, 'جاري قراءة ملف بوكينج...');
            const bRaw = await readSheet(f2);
            setLoaderProgress(55, 'جاري تجهيز البيانات...');
            cachedN = getData(nRaw, ["إسم العميل"]); 
            let tempB = getData(bRaw, ["رقم الحجز", "السعر"]);

            let minD = null, maxD = null;
            cachedN.forEach(r => { let d = parseDate(r["تاريخ الدخول"]); if(d) { if(!minD || d<minD) minD=d; if(!maxD || d>maxD) maxD=d; } });
            if(minD && maxD) {
                minD.setDate(minD.getDate()-1); maxD.setDate(maxD.getDate()+1);
                cachedB = tempB.filter(b => { let d = parseDate(b["تسجيل الوصول"]); return !d || (d>=minD && d<=maxD); });
            } else { cachedB = tempB; }
            cachedB = normalizeBookingByRef(cachedB);

            setLoaderProgress(75, 'جاري المطابقة...');
            process(cachedB, cachedN, tax);
            setLoaderProgress(100, 'تم التحليل');

            document.getElementById('loader').style.display = 'none';
            document.getElementById('controlPanel').style.display = 'flex';
            document.getElementById('dashboard').style.display = 'grid';
            document.getElementById('resultsArea').style.display = 'block';
            var ht = document.getElementById('headerTools'); if(ht) ht.classList.add('visible');

        } catch(e) { 
            alert("Error: " + e.message); 
            const loader = document.getElementById('loader');
            const uploadCard = document.getElementById('uploadCard');
            if(loader) loader.style.display = 'none';
            if(uploadCard) uploadCard.style.display = 'block';
        }
    }, 100);
}

/** تجميع صفوف البوكينج حسب رقم الحجز: حجز واحد = صف واحد (هدف المشروع: مراجعة العمولة بوحدة الحجز) */
function normalizeBookingByRef(booking) {
    if (!booking || !booking.length) return booking;
    let refGroups = {};
    booking.forEach(function(row, i) {
        let ref = String(row["رقم الحجز"] || "").trim();
        let key = ref ? ref : "_u_" + i;
        if (!refGroups[key]) refGroups[key] = [];
        refGroups[key].push(row);
    });
    return Object.keys(refGroups).map(function(key) {
        let group = refGroups[key];
        let first = group[0];
        if (group.length === 1) return first;
        let names = group.map(function(r) { return r["اسم الضيف\\الضيوف"] || r["اسم الضيف"] || r["تم الحجز من قِبل"] || ""; }).filter(Boolean);
        let combined = names.join(" ، ");
        let out = {};
        Object.keys(first).forEach(function(k) { out[k] = first[k]; });
        out["اسم الضيف\\الضيوف"] = combined;
        out["اسم الضيف"] = combined;
        return out;
    });
}

async function process(booking, nazeel, tax) {
    allRowsData = [];
    if (typeof window !== 'undefined') window.allRowsData = allRowsData;
    let s = { book:0, match:0, money:0, recover:0, group:0, miss:0, revB:0, revN:0 };
    let sub = { ok:0, can:0, nos:0 };
    let takenNazeel = new Set();
    let processedBooking = new Set(); 

    // عمود مرجع/رقم الحجز في نزيل: أولوية مرجع/مصدر ثم رقم الحجز ثم id (للمطابقة المباشرة عند توفر نفس الـ ID)
    const nazeelKeys = Object.keys(nazeel[0]||{});
    const refKey = nazeelKeys.find(k => k.includes("مرجع") || k.includes("مصدر"))
        || nazeelKeys.find(k => k.includes("رقم الحجز") || (k.includes("رقم") && k.includes("حجز")))
        || nazeelKeys.find(k => /^id$/i.test(String(k).trim()))
        || "";
    
    booking.forEach(b => {
        s.book++;
        let st = String(b["الحالة"]||"").toLowerCase();
        if(st.includes("ok")) sub.ok++; else if(st.includes("cancel")) sub.can++; else sub.nos++;
    });

    // V18.0: 0. Alias Mapping (The Memory)
    await Promise.all(booking.map(async (b, idx) => {
        if(processedBooking.has(idx)) return;
        const bName = b["اسم الضيف\\الضيوف"] || b["اسم الضيف"];
        const alias = await getAlias(bName);
        
        if (alias) {
            let pool = nazeel.map((n,i)=>({n,i})).filter(x => !takenNazeel.has(x.i));
            let match = pool.find(x => normalize(x.n["إسم العميل"]).includes(alias.nName));
            
            if (match) {
                processedBooking.add(idx); takenNazeel.add(match.i);
                storeResult(b, match.n, "alias", s, tax);
            }
        }
    }));


    // 1. Grouping
    let groups = {};
    booking.forEach((b, idx) => {
        if(processedBooking.has(idx)) return; // V18.0: Skip if already processed by alias
        let name = normalize(b["اسم الضيف\\الضيوف"] || b["اسم الضيف"]);
        if(!groups[name]) groups[name] = [];
        groups[name].push({data: b, idx: idx});
    });

    // 1.0 ربط الحجوزات الفردية (اسم واحد فقط) قبل التجميع — حتى يُستهلك عمار النخلي بأمّار ولا يدخل مرشحي مجموعة بدر
    for (let name in groups) {
        let group = groups[name];
        if (group.length !== 1) continue;
        let item = group[0];
        if (processedBooking.has(item.idx)) continue;
        let b = item.data;
        let bName = normalize(b["اسم الضيف\\الضيوف"] || b["اسم الضيف"]);
        let bParts = getParts(bName);
        if (bParts.length !== 2) continue; // نربط فقط من كلمتين (عمار النخلي، إلخ)
        let expPrice = cleanPrice(b["السعر"]) * tax;
        let bDate = parseDate(b["تسجيل الوصول"]);
        let pool = nazeel.map((n, i) => ({ n, i })).filter(x => !takenNazeel.has(x.i));
        let strictMatch = pool.find(x => {
            let nName = normalize(x.n["إسم العميل"] || "");
            let nParts = getParts(nName);
            if (!twoWordMatchesFirstOrLastStrict(bParts, nParts)) return false;
            let nPrice = cleanPrice(x.n["الايجار الكلي"] || x.n["الاجمالي"]);
            let nDate = parseDate(x.n["تاريخ الدخول"]);
            var tolPrice = Math.max(PRICE_TOLERANCE_NAME * 2, 45);
            if (!bDate || !nDate) tolPrice = Math.min(350, Math.max(150, Math.round(expPrice * 0.30)));
            let priceOk = Math.abs(nPrice - expPrice) <= tolPrice;
            if (bDate && nDate) {
                let dateOk = Math.abs((nDate - bDate) / 864e5) <= 7;
                return priceOk && dateOk;
            }
            return priceOk;
        });
        if (strictMatch) {
            processedBooking.add(item.idx);
            takenNazeel.add(strictMatch.i);
            storeResult(b, strictMatch.n, "name", s, tax);
        }
    }

    for(let name in groups) {
        let group = groups[name];
        if(group.length < 2) continue;
        let totalExp = group.reduce((sum, item) => sum + (cleanPrice(item.data["السعر"])*tax), 0);
        let minDate = group.reduce((min, item) => { let d=parseDate(item.data["تسجيل الوصول"]); return (!min||d<min)?d:min; }, null);
        let bParts = getParts(name);
        let pool = nazeel.map((n,i)=>({n,i})).filter(x => !takenNazeel.has(x.i));
        // 1) محاولة صف نزيل واحد بمجموع السعر (حالة إقامة واحدة في نزيل)
        // شرط اسم قوي: عند كلمتين نطلب تطابق صارم أول/آخر (تفادي Bader Alrwili ↔ عمار النخلي)
        let match = pool.find(x => {
            let nPrice = cleanPrice(x.n["الايجار الكلي"]||x.n["الاجمالي"]);
            let nDate = parseDate(x.n["تاريخ الدخول"]);
            let nName = normalize(x.n["إسم العميل"]||"");
            let nParts = getParts(nName);
            let priceOk = Math.abs(nPrice - totalExp) <= PRICE_TOLERANCE_GROUP;
            let relOk = totalExp > 0 && Math.abs(nPrice - totalExp) / totalExp <= 0.05;
            let dateOk = minDate && nDate && Math.abs((nDate - minDate)/864e5) <= DATE_TOLERANCE_DAYS_GROUP;
            let sim = nameMatchScore(bParts, nParts, false);
            let nameOk = (sim >= 2) && (bParts.length !== 2 || twoWordMatchesFirstOrLastStrict(bParts, nParts)) || (bParts.length === 1 && sim === 1 && singleWordMatchesFirstOrLast(bParts, nParts, 2));
            return priceOk && relOk && dateOk && nameOk;
        });
        // 2) إن لم يُوجد: نفس الضيف له إقامتان في نزيل — مجموع سعرين ≈ totalExp، مع تطابق اسم صارم لأحد الصفين (تفادي Hamzah Othman ↔ فيصل عمر محمد باسلم)
        if(!match) {
            let candidates = pool.filter(x => {
                let nName = normalize(x.n["إسم العميل"]||"");
                let nParts = getParts(nName);
                let sim = nameMatchScore(bParts, nParts, false);
                return (sim >= 2) && (bParts.length !== 2 || twoWordMatchesFirstOrLastStrict(bParts, nParts)) || (bParts.length === 1 && sim === 1 && singleWordMatchesFirstOrLast(bParts, nParts, 2));
            });
            for(let i = 0; i < candidates.length; i++) {
                for(let j = i + 1; j < candidates.length; j++) {
                    let p1 = cleanPrice(candidates[i].n["الايجار الكلي"]||candidates[i].n["الاجمالي"]);
                    let p2 = cleanPrice(candidates[j].n["الايجار الكلي"]||candidates[j].n["الاجمالي"]);
                    let sumOk = Math.abs(p1 + p2 - totalExp) <= PRICE_TOLERANCE_GROUP;
                    let relOk = totalExp > 0 && Math.abs(p1 + p2 - totalExp) / totalExp <= 0.05;
                    let d1 = parseDate(candidates[i].n["تاريخ الدخول"]);
                    let d2 = parseDate(candidates[j].n["تاريخ الدخول"]);
                    let dateOk = minDate && ( (d1 && Math.abs((d1 - minDate)/864e5) <= DATE_TOLERANCE_DAYS_GROUP) || (d2 && Math.abs((d2 - minDate)/864e5) <= DATE_TOLERANCE_DAYS_GROUP) );
                    let strict1 = bParts.length !== 2 || twoWordMatchesFirstOrLastStrict(bParts, getParts(normalize(candidates[i].n["إسم العميل"]||"")));
                    let strict2 = bParts.length !== 2 || twoWordMatchesFirstOrLastStrict(bParts, getParts(normalize(candidates[j].n["إسم العميل"]||"")));
                    let amountVerified = Math.abs(p1 + p2 - totalExp) <= 5;
                    if(sumOk && relOk && dateOk && strict1 && strict2) {
                        match = { multi: true, rows: [candidates[i], candidates[j]], totalPrice: p1 + p2, amountVerified: amountVerified };
                        break;
                    }
                }
                if(match) break;
            }
        }
        if(match) {
            if(match.multi) {
                match.rows.forEach(r => takenNazeel.add(r.i));
                group.forEach((item, i) => {
                    processedBooking.add(item.idx);
                    storeResult(item.data, (i===0 ? match.rows[0].n : null), "group", s, tax, i===0, i===0 ? match.totalPrice : undefined, undefined, match.amountVerified);
                });
            } else {
                let amountVerified = totalExp > 0 && Math.abs(cleanPrice(match.n["الايجار الكلي"]||match.n["الاجمالي"]) - totalExp) <= 5;
                takenNazeel.add(match.i);
                group.forEach((item, i) => {
                    processedBooking.add(item.idx);
                    storeResult(item.data, (i===0?match.n:null), "group", s, tax, i===0, undefined, undefined, i===0 ? amountVerified : undefined);
                });
            }
        }
    }

    // 2. Waterfall (Individual) — نعالج أولاً الحجوزات ذات التطابق الاسمي الأقوى حتى لا يُستهلك صف نزيل بحجز أضعف (مثل Majed Al zamil → ماجد شارع جربوع ال زامل قبل أي ربط أضعف)
    let individualIndices = booking.map((_, idx) => idx).filter(idx => !processedBooking.has(idx));
    let poolForPriority = nazeel.map((n, i) => ({ n, i })).filter(x => !takenNazeel.has(x.i));
    individualIndices.sort((i, j) => {
        let bName_i = normalize(booking[i]["اسم الضيف\\الضيوف"] || booking[i]["اسم الضيف"]);
        let bName_j = normalize(booking[j]["اسم الضيف\\الضيوف"] || booking[j]["اسم الضيف"]);
        let bParts_i = getParts(bName_i), bParts_j = getParts(bName_j);
        let scored_i = poolForPriority.length ? poolForPriority.map(x => {
            let nParts = getParts(normalize(x.n["إسم العميل"]||""));
            let s = nameMatchScore(bParts_i, nParts, false);
            let fl = bParts_i.length === 2 && twoWordMatchesFirstOrLastStrict(bParts_i, nParts);
            if (fl) s += 10;
            return { s, fl };
        }) : [];
        let scored_j = poolForPriority.length ? poolForPriority.map(x => {
            let nParts = getParts(normalize(x.n["إسم العميل"]||""));
            let s = nameMatchScore(bParts_j, nParts, false);
            let fl = bParts_j.length === 2 && twoWordMatchesFirstOrLastStrict(bParts_j, nParts);
            if (fl) s += 10;
            return { s, fl };
        }) : [];
        let best_i = scored_i.length ? Math.max(...scored_i.map(x => x.s)) : 0;
        let best_j = scored_j.length ? Math.max(...scored_j.map(x => x.s)) : 0;
        if (best_j !== best_i) return best_j - best_i;
        // تعادل: نفضّل الحجز الذي أفضل تطابق له يحقّق أول/آخر (twoWordMatchesFirstOrLast) حتى يُعالَج Majed Al zamil قبل من يستهلك ماجد شارع جربوع ال زامل
        let bestRowFL_i = scored_i.some(x => x.s === best_i && x.fl);
        let bestRowFL_j = scored_j.some(x => x.s === best_j && x.fl);
        return (bestRowFL_j ? 1 : 0) - (bestRowFL_i ? 1 : 0);
    });
    individualIndices.forEach(idx => {
        const b = booking[idx];
        if(processedBooking.has(idx)) return;
        const bRef = String(b["رقم الحجز"]||"").trim();
        const bName = normalize(b["اسم الضيف\\الضيوف"] || b["اسم الضيف"]);
        const bPrice = cleanPrice(b["السعر"]);
        const expPrice = bPrice * tax;
        const bDate = parseDate(b["تسجيل الوصول"]);
        
        let pool = nazeel.map((n,i)=>({n,i})).filter(x => !takenNazeel.has(x.i));
        let match = null, type = "";

        // Ref — أولوية كبيرة: إذا رقم الحجز متطابق تماماً في نزيل وبوكينج (مثل 5667545212) نربط مباشرة دون التحقق من الاسم. التسامح (ناقص/زائد/حرف) يبقى خطوة إضافية مع تحقق اسم تفادي ربط خاطئ (Saws Ka ↔ هادي العنزى).
        if(refKey && bRef) {
            let refMatches = pool.filter(x => refMatch(bRef, x.n[refKey]));
            if(refMatches.length > 0) {
                var bRefNorm = String(bRef).trim();
                var exactRefMatches = refMatches.filter(function(x) { return bRefNorm === String(x.n[refKey] || "").trim(); });
                if (exactRefMatches.length > 0) {
                    // ربط مباشر — نفس رقم الحجز. قد يكون للضيف أكثر من صف نزيل (غرفتان 604 + 403) → نجمع كل الأسعار
                    var totalNazeelPrice = exactRefMatches.reduce(function(sum, m) { return sum + cleanPrice(m.n["الايجار الكلي"]||m.n["الاجمالي"]); }, 0);
                    exactRefMatches.forEach(function(m) { takenNazeel.add(m.i); });
                    processedBooking.add(idx);
                    storeResult(b, exactRefMatches[0].n, "ref", s, tax, false, totalNazeelPrice);
                    return;
                }
                let bParts = getParts(bName);
                let scored = refMatches.map(m => {
                    let nParts = getParts(normalize(m.n["إسم العميل"]||""));
                    let score = nameMatchScore(bParts, nParts, false);
                    let subset = nameSubsetMatch(bParts, nParts, 2) || nameSubsetMatch(nParts, bParts, 2);
                    let sameWords = bParts.length >= 2 && nParts.length === bParts.length && nameSameWordsOrReversed(bParts, nParts, 2);
                    return { m, score, strong: score >= 2 || subset || sameWords };
                });
                let best = scored.reduce((acc, cur) => {
                    if (!acc) return cur;
                    if (cur.strong && !acc.strong) return cur;
                    if (!cur.strong && acc.strong) return acc;
                    return cur.score >= acc.score ? cur : acc;
                }, null);
                // تطابق مرجع بتسامح (ليس تطابقاً تاماً): نطلب تطابق اسم قوي لتفادي ربط خاطئ (Rana Saad → علي مشبب، Saws Ka → هادي العنزى)
                let useRef = best.strong || (bParts.length < 2) || (bParts.length >= 2 ? best.score >= 2 : best.score >= 1);
                if (!useRef && bParts.length >= 2) {
                    // نترك لمرحلة الاسم
                } else {
                    let totalNazeelPrice = refMatches.reduce((sum, m) => sum + cleanPrice(m.n["الايجار الكلي"]||m.n["الاجمالي"]), 0);
                    let firstMatch = best ? best.m : refMatches[0];
                    refMatches.forEach(m => takenNazeel.add(m.i));
                    processedBooking.add(idx);
                    storeResult(b, firstMatch.n, "ref", s, tax, false, totalNazeelPrice);
                    return;
                }
            }
        }

        // عكس الاسم أولاً (مشبب البراء ↔ البراء مشبب، Zaher ALASIRI ↔ ALASIRI Zaher) — قبل أي مطابقة أخرى بالاسم حتى لا يُستهلك الصف
        if(!match) {
            let bParts = getParts(bName);
            if(bParts.length === 2) {
                let reversedMatch = pool.find(x => {
                    let nName = normalize(x.n["إسم العميل"]);
                    let nParts = getParts(nName);
                    if(nParts.length !== 2 || !nameFirstLastReversedStrict(bParts, nParts)) return false;
                    let nPrice = cleanPrice(x.n["الايجار الكلي"]||x.n["الاجمالي"]);
                    let nDate = parseDate(x.n["تاريخ الدخول"]);
                    let tolPrice = Math.max(PRICE_TOLERANCE_NAME * 2, 45);
                    if (!bDate || !nDate) tolPrice = Math.min(350, Math.max(150, Math.round(expPrice * 0.30)));
                    let priceMatch = Math.abs(nPrice - expPrice) <= tolPrice;
                    if(bDate && nDate) {
                        let dateMatch = Math.abs((nDate - bDate)/864e5) <= 7;
                        return dateMatch && priceMatch;
                    }
                    return priceMatch;
                });
                if(reversedMatch) { match = reversedMatch; type = "reversed"; }
            }
        }

        // نفس الكلمات بترتيب مختلف أو عكس أول/ثاني — مرحلة مبكرة، تسامح واسع
        if(!match) {
            let bParts = getParts(bName);
            if(bParts.length >= 2) {
                match = pool.find(x => {
                    let nName = normalize(x.n["إسم العميل"]);
                    let nParts = getParts(nName);
                    if(!nameSameWordsOrReversed(bParts, nParts, 2)) return false;
                    if(bParts.length === 2 && !twoWordMatchesFirstOrLastStrict(bParts, nParts)) return false;
                    let nPrice = cleanPrice(x.n["الايجار الكلي"]||x.n["الاجمالي"]);
                    let nDate = parseDate(x.n["تاريخ الدخول"]);
                    var tolPrice = Math.max(PRICE_TOLERANCE_GUESS * 3, 30);
                    if (!bDate || !nDate) tolPrice = Math.min(350, Math.max(150, Math.round(expPrice * 0.30)));
                    let priceMatch = Math.abs(nPrice - expPrice) <= tolPrice;
                    if(bDate && nDate) {
                        let tolDays = 7;
                        let dateMatch = Math.abs((nDate - bDate)/864e5) <= tolDays;
                        return dateMatch && priceMatch;
                    }
                    return priceMatch;
                });
                if(match) type = "name";
            }
        }

        // اسم فرعي (صالح السلمي ↔ صالح دخيل ربه سلطان السلمي). عند أكثر من مرشح نفضّل الأقوى (twoWordMatchesFirstOrLast ثم nameMatchScore)
        if(!match) {
            let bParts = getParts(bName);
            if(bParts.length >= 2) {
                let subsetCandidates = pool.filter(x => {
                    let nName = normalize(x.n["إسم العميل"]);
                    let nParts = getParts(nName);
                    if(!nameSubsetMatch(bParts, nParts, 2)) return false;
                    if(bParts.length === 2 && !twoWordMatchesFirstOrLastStrict(bParts, nParts)) return false;
                    let nPrice = cleanPrice(x.n["الايجار الكلي"]||x.n["الاجمالي"]);
                    let nDate = parseDate(x.n["تاريخ الدخول"]);
                    var tolPrice = PRICE_TOLERANCE_GUESS * 2;
                    if (!bDate || !nDate) tolPrice = Math.min(350, Math.max(150, Math.round(expPrice * 0.30)));
                    let priceMatch = Math.abs(nPrice - expPrice) <= tolPrice;
                    if(bDate && nDate) {
                        let tolDays = 7;
                        let dateMatch = Math.abs((nDate - bDate)/864e5) <= tolDays;
                        return dateMatch && priceMatch;
                    }
                    return priceMatch;
                });
                match = subsetCandidates.length ? subsetCandidates.sort((a, b) => {
                    let ap = getParts(normalize(a.n["إسم العميل"]||"")), bp = getParts(normalize(b.n["إسم العميل"]||""));
                    let aFL = twoWordMatchesFirstOrLast(bParts, ap, 2);
                    let bFL = twoWordMatchesFirstOrLast(bParts, bp, 2);
                    if (aFL !== bFL) return (bFL ? 1 : 0) - (aFL ? 1 : 0);
                    return nameMatchScore(bParts, bp, false) - nameMatchScore(bParts, ap, false);
                })[0] : null;
                if(match) type = "name";
            }
        }

        // Name — ديناميكي + تسامح. عند وجود أكثر من مرشح نفضّل الأقوى (أعلى nameMatchScore ثم twoWordMatchesFirstOrLast) لتفادي Majed Al zamil → طه سمير رجب بدل ماجد شارع جربوع ال زامل
        if(!match) {
            let bParts = getParts(bName);
            let bNameNorm = normalize(bName);
            let candidates = pool.filter(x => {
                let nName = normalize(x.n["إسم العميل"]);
                let nParts = getParts(nName);
                if (bParts.length === 2 && !twoWordMatchesFirstOrLastStrict(bParts, nParts) && !nameSameWordsOrReversed(bParts, nParts, 2)) return false;
                let nPrice = cleanPrice(x.n["الايجار الكلي"]||x.n["الاجمالي"]);
                let nDate = parseDate(x.n["تاريخ الدخول"]);
                let simScore = nameMatchScore(bParts, nParts, false);
                let subsetMatch = nameSubsetMatch(bParts, nParts, 2);
                let sameWords = nameSameWordsOrReversed(bParts, nParts, 2);
                let namesVeryClose = (simScore >= 2 && bNameNorm.length && nName.length && levenshtein(bNameNorm, nName) <= 3) || subsetMatch;
                var priceTol = sameWords ? PRICE_TOLERANCE_NAME * 3 : (namesVeryClose ? PRICE_TOLERANCE_NAME * 2 : PRICE_TOLERANCE_NAME);
                if ((!bDate || !nDate) && (sameWords || subsetMatch)) priceTol = Math.min(350, Math.max(150, Math.round(expPrice * 0.30)));
                let dateTolDays = sameWords ? 5 : (namesVeryClose ? 3 : DATE_TOLERANCE_DAYS_NAME);
                let priceHit = Math.abs(nPrice - expPrice) <= priceTol;
                let dateHit = bDate && nDate && Math.abs((nDate - bDate)/864e5) <= dateTolDays;
                let nameHit = subsetMatch || (simScore >= 2) || (simScore === 1 && singleWordMatchesFirstOrLast(bParts, nParts, 2)) || (simScore >= 1 && dateHit && priceHit && (simScore >= 2 || singleWordMatchesFirstOrLast(bParts, nParts, 2)));
                // عند كلمتين بوكينج واسم نزيل أطول: نقبل فقط إن تطابق أول/آخر صارم (مرادف أو ليفنشتاين 1 أو بادئة) — تفادي Zaher↔ياسر، Rana Saad↔علي مشبب
                // عند كلمتين بوكينج: نقبل فقط إن نفس الكلمات/عكس أو تطابق صارم أول/آخر — تفادي مشبب البراء↔TAIEB Azlouk، صالح السلمي↔abdulrahman asiri، Saws Ka↔طه سمير رجب
                if (nameHit && bParts.length === 2 && !nameSameWordsOrReversed(bParts, nParts, 2) && !twoWordMatchesFirstOrLastStrict(bParts, nParts)) nameHit = false;
                // تطابق اسم قوي (أول/آخر صارم + كلمتان): نقبل مرشحاً حتى مع اختلاف التاريخ، بتسامح سعر أوسع (تفادي استبعاد ماجد شارع جربوع ال زامل لـ Majed Al zamil)
                let strongNameFL = bParts.length === 2 && twoWordMatchesFirstOrLastStrict(bParts, nParts) && simScore >= 2;
                let priceHitWide = strongNameFL && Math.abs(nPrice - expPrice) <= Math.min(200, Math.max(80, Math.round(expPrice * 0.15)));
                return (nameHit && (priceHit || dateHit)) || (strongNameFL && priceHitWide);
            });
            match = candidates.length ? candidates.sort((a, b) => {
                let ap = getParts(normalize(a.n["إسم العميل"]||"")), bp = getParts(normalize(b.n["إسم العميل"]||""));
                let aStrict = twoWordMatchesFirstOrLastStrict(bParts, ap);
                let bStrict = twoWordMatchesFirstOrLastStrict(bParts, bp);
                if (aStrict !== bStrict) return (bStrict ? 1 : 0) - (aStrict ? 1 : 0);
                let aScore = nameMatchScore(bParts, ap, false);
                let bScore = nameMatchScore(bParts, bp, false);
                if (aScore !== bScore) return bScore - aScore;
                let aFL = twoWordMatchesFirstOrLast(bParts, ap, 2);
                let bFL = twoWordMatchesFirstOrLast(bParts, bp, 2);
                return (bFL ? 1 : 0) - (aFL ? 1 : 0);
            })[0] : null;
            if(match) type = "name";
        }

        // حارس نهائي: لا نقبل "اسم" لأسماء من كلمتين إلا بتطابق صارم أول/آخر — تفادي Ali Alinur↔هدى الزبير، العالم حنان↔ali alinur، Saws Ka↔طه سمير رجب، مشبب البراء↔TAIEB Azlouk
        if (match && type === "name") {
            let bPartsFinal = getParts(bName);
            let nPartsFinal = getParts(normalize(match.n["إسم العميل"]||""));
            if (bPartsFinal.length === 2 && !twoWordMatchesFirstOrLastStrict(bPartsFinal, nPartsFinal)) { match = null; type = null; }
        }
        if(match) {
            processedBooking.add(idx); takenNazeel.add(match.i);
            storeResult(b, match.n, type, s, tax);
        }
    });

    // 2.5 حجز واحد ↔ إقامتان نزيل (نفس الضيف، غرفتان مثل 303 + 304) — نطلب تطابق اسم صارم لكلا الصفين (تفادي Hamzah Othman ↔ فيصل+حمزة، Mohammed Alsedi ↔ محمد نامي+محمد الصاعدي، Bader↔عمار+بدر)
    booking.forEach((b, idx) => {
        if(processedBooking.has(idx)) return;
        const bName = normalize(b["اسم الضيف\\الضيوف"] || b["اسم الضيف"]);
        const bParts = getParts(bName);
        const expPrice = cleanPrice(b["السعر"]) * tax;
        const bDate = parseDate(b["تسجيل الوصول"]);
        let pool = nazeel.map((n,i)=>({n,i})).filter(x => !takenNazeel.has(x.i));
        let candidates = pool.filter(x => {
            let nName = normalize(x.n["إسم العميل"]||"");
            let nParts = getParts(nName);
            let sim = nameMatchScore(bParts, nParts, false);
            return (sim >= 2) && (bParts.length !== 2 || twoWordMatchesFirstOrLastStrict(bParts, nParts)) || (bParts.length === 1 && sim === 1 && singleWordMatchesFirstOrLast(bParts, nParts, 2));
        });
        let match = null;
        for(let i = 0; i < candidates.length; i++) {
            for(let j = i + 1; j < candidates.length; j++) {
                let p1 = cleanPrice(candidates[i].n["الايجار الكلي"]||candidates[i].n["الاجمالي"]);
                let p2 = cleanPrice(candidates[j].n["الايجار الكلي"]||candidates[j].n["الاجمالي"]);
                let sumOk = Math.abs(p1 + p2 - expPrice) <= PRICE_TOLERANCE_NAME;
                let relOk = expPrice > 0 && Math.abs(p1 + p2 - expPrice) / expPrice <= 0.05;
                let d1 = parseDate(candidates[i].n["تاريخ الدخول"]);
                let d2 = parseDate(candidates[j].n["تاريخ الدخول"]);
                let dateOk = !bDate || (d1 && Math.abs((d1 - bDate)/864e5) <= DATE_TOLERANCE_DAYS_NAME) || (d2 && Math.abs((d2 - bDate)/864e5) <= DATE_TOLERANCE_DAYS_NAME);
                let strict1 = bParts.length !== 2 || twoWordMatchesFirstOrLastStrict(bParts, getParts(normalize(candidates[i].n["إسم العميل"]||"")));
                let strict2 = bParts.length !== 2 || twoWordMatchesFirstOrLastStrict(bParts, getParts(normalize(candidates[j].n["إسم العميل"]||"")));
                let amountVerified = Math.abs(p1 + p2 - expPrice) <= 5;
                if(sumOk && relOk && dateOk && strict1 && strict2) {
                    match = { rows: [candidates[i], candidates[j]], totalPrice: p1 + p2, amountVerified: amountVerified };
                    break;
                }
            }
            if(match) break;
        }
        if(match) {
            match.rows.forEach(r => takenNazeel.add(r.i));
            processedBooking.add(idx);
            storeResult(b, match.rows[0].n, "multi", s, tax, false, match.totalPrice, undefined, match.amountVerified);
        }
    });

    // V18.0: 3. Behavioral Extension Check
    booking.forEach((b, idx) => {
        if(processedBooking.has(idx)) return;
        
        const bPrice = cleanPrice(b["السعر"]);
        const expPrice = bPrice * tax;
        const bDate = parseDate(b["تسجيل الوصول"]);
        const bOutDate = parseDate(b["تاريخ المغادرة"]);

        let pool = nazeel.map((n,i)=>({n,i})).filter(x => !takenNazeel.has(x.i));

        // Find a Nazeel booking whose check-out date is AFTER Booking's check-out date
        let match = pool.find(x => {
            let nPrice = cleanPrice(x.n["الايجار الكلي"]||x.n["الاجمالي"]);
            let nDate = parseDate(x.n["تاريخ الدخول"]);
            let nOutDate = parseDate(x.n["تاريخ الخروج"]);
            
            if(!bDate || !nDate || !bOutDate || !nOutDate) return false;

            // Date match check-in: بوكينج 1 يناير ونزيل 2 يناير → نفس الضيف
            let dateMatch = Math.abs((nDate - bDate)/864e5) <= DATE_TOLERANCE_DAYS_EXT;
            let extensionHit = (nOutDate > bOutDate);
            let priceMatch = Math.abs(nPrice - expPrice) < PRICE_TOLERANCE_EXT;

            return dateMatch && extensionHit && priceMatch;
        });

        if(match) {
            processedBooking.add(idx); takenNazeel.add(match.i);
            storeResult(b, match.n, "extension", s, tax);
        }
    });
    
    // 4. ORPHAN SCAVENGER (Price/Date Guess) — مع شرط تداخل اسمي بسيط لتفادي ربط خاطئ (مثلاً Osama مع سلطان)
    booking.forEach((b, idx) => {
        if(processedBooking.has(idx)) return; 

        const bName = normalize(b["اسم الضيف\\الضيوف"] || b["اسم الضيف"]);
        const bParts = getParts(bName);
        const bPrice = cleanPrice(b["السعر"]);
        const expPrice = bPrice * tax;
        const bDate = parseDate(b["تسجيل الوصول"]);

        let pool = nazeel.map((n,i)=>({n,i})).filter(x => !takenNazeel.has(x.i));
        
        let match = pool.find(x => {
            let nPrice = cleanPrice(x.n["الايجار الكلي"]||x.n["الاجمالي"]);
            let nDate = parseDate(x.n["تاريخ الدخول"]);
            if(!bDate || !nDate) return false;

            let nName = normalize(x.n["إسم العميل"]||"");
            let nParts = getParts(nName);
            let nameOverlap = guessNameOverlap(bParts, nParts);
            let subsetMatch = nameSubsetMatch(bParts, nParts, 2);
            let sameWords = nameSameWordsOrReversed(bParts, nParts, 2);
            let reversedOnly = nameFirstLastReversed(bParts, nParts, 2);
            // عند نفس الكلمات بترتيب مختلف أو عكس أول/ثاني أو اسم فرعي: تسامح أوسع لاصطياد كل الحالات
            let tolDays = sameWords ? 7 : (subsetMatch ? 4 : DATE_TOLERANCE_DAYS_GUESS);
            let tolPrice = sameWords ? 35 : (subsetMatch ? PRICE_TOLERANCE_GUESS * 2 : PRICE_TOLERANCE_GUESS);
            let dateMatch = Math.abs((nDate - bDate)/864e5) <= tolDays;
            let priceMatch = Math.abs(nPrice - expPrice) <= tolPrice;
            if(!dateMatch || !priceMatch) return false;
            // عند كلمة واحدة في البوكينج: نقبل فقط إذا المطابقة على الاسم الأول أو الأخير في نزيل (تفادي Saws ↔ سعد)
            if (bParts.length === 1 && nameOverlap && !singleWordMatchesFirstOrLast(bParts, nParts, 3)) return false;
            // عند كلمتين أو أكثر: نطلب تطابق صارم أول/آخر أو نفس الكلمات/عكس — تفادي Ali Huda ↔ حمادة سليمان (كلمة واحدة تشبه بالتقريب)
            if (bParts.length >= 2 && !nameSameWordsOrReversed(bParts, nParts, 2) && !twoWordMatchesFirstOrLastStrict(bParts, nParts)) return false;
            return dateMatch && priceMatch && nameOverlap;
        });

        if(match) {
            processedBooking.add(idx); takenNazeel.add(match.i);
            storeResult(b, match.n, "guess", s, tax);
        } else {
            // فرصة أخيرة: تطابق صارم أول/آخر أو نفس الكلمات/عكس مع تسامح واسع (7 أيام، فرق سعر 45) — تفادي Ali Huda ↔ حمادة سليمان
            match = pool.find(x => {
                let nParts = getParts(normalize(x.n["إسم العميل"]||""));
                if (bParts.length >= 2 && !nameSameWordsOrReversed(bParts, nParts, 2) && !twoWordMatchesFirstOrLastStrict(bParts, nParts)) return false;
                if (bParts.length === 1 && (nameMatchScore(bParts, nParts, false) < 1 || !singleWordMatchesFirstOrLast(bParts, nParts, 2))) return false;
                let nPrice = cleanPrice(x.n["الايجار الكلي"]||x.n["الاجمالي"]);
                let nDate = parseDate(x.n["تاريخ الدخول"]);
                if (!bDate || !nDate) return false;
                let dateOk = Math.abs((nDate - bDate)/864e5) <= 7;
                let priceOk = Math.abs(nPrice - expPrice) <= 45;
                return dateOk && priceOk;
            });
            if (match) {
                processedBooking.add(idx); takenNazeel.add(match.i);
                storeResult(b, match.n, "guess", s, tax);
            }
        }
        // مرونة عكس الاسم (بتطابق صارم): Zaher ALASIRI ↔ ALASIRI Zaher، مشبب البراء ↔ البراء مشبب — رفض Saws Ka ↔ طه سمير رجب
        if (!match && bParts.length === 2) {
            match = pool.find(x => {
                let nName = normalize(x.n["إسم العميل"]||"");
                let nParts = getParts(nName);
                if (nParts.length !== 2 || !nameFirstLastReversedStrict(bParts, nParts)) return false;
                let nPrice = cleanPrice(x.n["الايجار الكلي"]||x.n["الاجمالي"]);
                let nDate = parseDate(x.n["تاريخ الدخول"]);
                let tolPrice = 45;
                if (!bDate || !nDate) tolPrice = Math.min(350, Math.max(150, Math.round(expPrice * 0.30)));
                let priceMatch = Math.abs(nPrice - expPrice) <= tolPrice;
                if (bDate && nDate) {
                    let dateMatch = Math.abs((nDate - bDate)/864e5) <= 7;
                    return dateMatch && priceMatch;
                }
                return priceMatch;
            });
            if (match) {
                processedBooking.add(idx); takenNazeel.add(match.i);
                storeResult(b, match.n, "reversed", s, tax);
            }
        }
        if (!match) {
            // ربما الاسم موجود في نزيل: لأسماء من كلمتين نعتمد فقط تطابق صارم أول/آخر أو نفس الكلمات/عكس بتسامح 1 — تفادي Saws Ka→اسماعيل ايوب، hamada omara→سلطان الزهراني، Zaher→حسام الاحمدى
            let candidates = pool.filter(x => {
                let nParts = getParts(normalize(x.n["إسم العميل"]||""));
                let score = nameMatchScore(bParts, nParts, false);
                if (bParts.length === 2) return twoWordMatchesFirstOrLastStrict(bParts, nParts) || nameSameWordsOrReversed(bParts, nParts, 1);
                return twoWordMatchesFirstOrLastStrict(bParts, nParts) || nameSameWordsOrReversed(bParts, nParts, 2) || nameSubsetMatch(bParts, nParts, 2) || score >= 2 || (bParts.length === 1 && score >= 1 && singleWordMatchesFirstOrLast(bParts, nParts, 2));
            });
            let suggested = candidates.length ? candidates.sort(function(a, b) {
                let ap = getParts(normalize(a.n["إسم العميل"]||"")), bp = getParts(normalize(b.n["إسم العميل"]||""));
                let aStrict = twoWordMatchesFirstOrLastStrict(bParts, ap);
                let bStrict = twoWordMatchesFirstOrLastStrict(bParts, bp);
                if (aStrict !== bStrict) return bStrict ? 1 : -1;
                let aSame = nameSameWordsOrReversed(bParts, ap, 2);
                let bSame = nameSameWordsOrReversed(bParts, bp, 2);
                if (aSame !== bSame) return bSame ? 1 : -1;
                let aSub = nameSubsetMatch(bParts, ap, 2) || nameSubsetMatch(ap, bParts, 2);
                let bSub = nameSubsetMatch(bParts, bp, 2) || nameSubsetMatch(bp, bParts, 2);
                if (aSub !== bSub) return bSub ? 1 : -1;
                return nameMatchScore(bParts, bp, false) - nameMatchScore(bParts, ap, false);
            })[0] : null;
            // إذا مرشح واحد فقط بتطابق صارم أول/آخر وسعر قريب (25% أو 200) → نعتبره "حضر — مراجعة" بدل "لم يحضر" لسد ثغرة "حضر فعلاً والتاريخ مختلف"
            let autoGuess = false;
            if (bParts.length >= 2 && suggested && twoWordMatchesFirstOrLastStrict(bParts, getParts(normalize(suggested.n["إسم العميل"]||"")))) {
                let nPrice = cleanPrice(suggested.n["الايجار الكلي"]||suggested.n["الاجمالي"]);
                let priceOk = Math.abs(nPrice - expPrice) <= Math.min(250, Math.max(80, Math.round(expPrice * 0.28)));
                let strictCount = candidates.filter(x => twoWordMatchesFirstOrLastStrict(bParts, getParts(normalize(x.n["إسم العميل"]||"")))).length;
                if (priceOk && strictCount === 1) { autoGuess = true; processedBooking.add(idx); takenNazeel.add(suggested.i); storeResult(b, suggested.n, "guess", s, tax); }
            }
            // لأسماء من كلمتين: لا نعرض "ربما مطابق" إلا إذا المرشح يمر بتطابق صارم أول/آخر — تفادي مشبب البراء → TAIEB Azlouk
            if (bParts.length === 2 && suggested && !twoWordMatchesFirstOrLastStrict(bParts, getParts(normalize(suggested.n["إسم العميل"]||"")))) suggested = null;
            if (!autoGuess) {
                let suggestedMatch = suggested ? { nName: suggested.n["إسم العميل"], nPrice: cleanPrice(suggested.n["الايجار الكلي"]||suggested.n["الاجمالي"]), nDate: parseDate(suggested.n["تاريخ الدخول"]) } : null;
                storeResult(b, null, "miss", s, tax, false, undefined, suggestedMatch);
            }
        }
    });

    await applyManuals(s); // V18.0: This now reads from IndexedDB
    updateStats(s, sub);
    if (typeof window.renderTable === 'function') {
        window.renderTable(); 
    }
    if (typeof window.location !== 'undefined' && window.location.search && window.location.search.indexOf('diagnose=1') !== -1) {
        runDiagnosticReport();
    }
}

/** تقرير تشخيص من البيانات الفعلية: كل "لم يحضر" مع كل مرشحي نزيل (نفس الكلمات / عكس اسم / فرعي / تطابق كلمات) + حصر حالات مرنة (عكس الاسم) */
function runDiagnosticReport() {
    var el = document.getElementById('diagnosticReport');
    if (!el) return;
    var rows = (typeof window !== 'undefined' && window.allRowsData) ? window.allRowsData : (typeof allRowsData !== 'undefined' ? allRowsData : []);
    var misses = rows.filter(function(r) { return r.type === 'miss'; });
    var reversedRows = rows.filter(function(r) { return r.type === 'reversed'; });
    var nazeel = (typeof window !== 'undefined' && window.cachedN) ? window.cachedN : [];
    var bName = '', bParts = [], nParts = [], reason = '', nPrice = 0, nDate = null, priceDiff = 0, dateDiff = null;
    var html = '<h3 style="margin:0 0 12px; color:#2CB1E1;">تقرير تشخيص — من الملفات الفعلية</h3>';
    if (reversedRows.length > 0) {
        html += '<div style="margin-bottom:16px; padding:10px; background:rgba(44,177,225,0.12); border-radius:8px;"><strong>حالات مرنة (عكس الاسم — أول↔ثاني):</strong> ' + reversedRows.length + ' — بوكينج↔نزيل (مثل مشبب البراء↔البراء مشبب، Zaher ALASIRI↔ALASIRI Zaher)</div><ul style="margin:0 0 12px 20px; padding:0;">';
        for (var r = 0; r < reversedRows.length; r++) {
            var rr = reversedRows[r];
            var bn = rr.bName || (rr.b && (rr.b["اسم الضيف\\الضيوف"] || rr.b["اسم الضيف"] || ""));
            var nn = rr.n && (rr.n["إسم العميل"] || "");
            html += '<li style="margin:4px 0;">' + (bn || '-') + ' ↔ ' + (nn || '-') + '</li>';
        }
        html += '</ul>';
    }
    html += '<p style="margin:0 0 15px;">عدد لم يحضر: <strong>' + misses.length + '</strong> — لكل واحد: مرشحو نزيل (نفس الكلمات / عكس اسم / فرعي / تطابق كلمات) مع فرق السعر وفرق الأيام.</p>';
    for (var m = 0; m < misses.length; m++) {
        var row = misses[m];
        bName = row.bName || (row.b && (row.b["اسم الضيف\\الضيوف"] || row.b["اسم الضيف"] || ""));
        bParts = getParts(normalize(bName));
        var bPrice = row.bPrice != null ? row.bPrice : (row.b && cleanPrice(row.b["السعر"]));
        var bDate = row.timestamp || (row.b && parseDate(row.b["تسجيل الوصول"]));
        html += '<div class="diag-miss" style="margin-bottom:14px; padding:10px; background:rgba(255,255,255,0.05); border-radius:8px;"><strong>لم يحضر:</strong> ' + (bName || '-') + ' — بوكينج: ' + (bPrice != null ? Number(bPrice).toFixed(0) : '-') + ' ر.س، تاريخ: ' + (bDate ? bDate.toLocaleDateString('ar-EG') : '-') + '</div>';
        var candidates = [];
        for (var i = 0; i < nazeel.length; i++) {
            var n = nazeel[i];
            nParts = getParts(String(n["إسم العميل"] || ""));
            if (twoWordMatchesFirstOrLastStrict(bParts, nParts) || nameMatchScore(bParts, nParts, false) >= 1 || nameSubsetMatch(bParts, nParts, 2) || nameSameWordsOrReversed(bParts, nParts, 2)) {
                nPrice = cleanPrice(n["الايجار الكلي"] || n["الاجمالي"]);
                nDate = parseDate(n["تاريخ الدخول"]);
                priceDiff = nPrice - (bPrice || 0);
                dateDiff = (bDate && nDate) ? Math.round((nDate - bDate) / 864e5) : null;
                reason = twoWordMatchesFirstOrLastStrict(bParts, nParts) ? 'تطابق صارم أول/آخر' : (nameFirstLastReversed(bParts, nParts, 2) ? 'عكس اسم' : (nameSameWords(bParts, nParts, 2) ? 'نفس الكلمات' : (nameSubsetMatch(bParts, nParts, 2) ? 'اسم فرعي' : 'تطابق ' + nameMatchScore(bParts, nParts, false) + ' كلمات')));
                candidates.push({ nName: n["إسم العميل"], nPrice: nPrice, nDate: nDate, priceDiff: priceDiff, dateDiff: dateDiff, reason: reason });
            }
        }
        html += '<ul style="margin:0 0 0 20px; padding:0;">';
        for (var c = 0; c < candidates.length; c++) {
            var x = candidates[c];
            html += '<li style="margin:4px 0;">' + (x.nName || '-') + ' — سعر ' + Number(x.nPrice).toFixed(0) + '، فرق السعر ' + (x.priceDiff >= 0 ? '+' : '') + x.priceDiff.toFixed(0) + (x.dateDiff != null ? '، فرق الأيام ' + (x.dateDiff >= 0 ? '+' : '') + x.dateDiff : '') + ' — <span style="color:#FFD700;">' + x.reason + '</span></li>';
        }
        html += '</ul>';
    }
    el.innerHTML = html;
    el.style.display = misses.length ? 'block' : 'none';
}

function storeResult(b, n, type, s, tax, isGroupHead, totalNazeelPrice, suggestedMatch, amountVerified) {
    let bName = b["اسم الضيف\\الضيوف"] || b["اسم الضيف"] || b["تم الحجز من قِبل"];
    let status = String(b["الحالة"]||"").toLowerCase();
    let isOk = status.includes("ok");
    let bPriceNet = cleanPrice(b["السعر"]);
    let bPrice = bPriceNet * tax;
    let nPrice = totalNazeelPrice || (n ? cleanPrice(n["الايجار الكلي"]||n["الاجمالي"]) : 0);
    
    if(type !== "miss") {
        if(!isOk) { s.recover++; type="conflict"; }
        else {
            if(type==="ref"||type==="name"||type==="reversed"||type==="alias"||type==="multi") s.match++;
            if(type==="money"||type==="guess"||type==="extension") s.money++; // V18.0: extension is money/fingerprint match
            if(type==="group") s.group++;
        }
        s.revB += bPrice;
        if(type !== "group" || isGroupHead) s.revN += nPrice; 
    } else { if(isOk) s.miss++; }

    let row = {
        b: b, n: n, type: type, bName: bName, status: status, isOk: isOk,
        bPrice: bPrice, nPrice: nPrice, bPriceNet: bPriceNet, tax: tax,
        timestamp: parseDate(b["تسجيل الوصول"]) || 0
    };
    if (type === "group") row.isGroupHead = !!isGroupHead;
    if (type === "miss" && suggestedMatch) row.suggestedMatch = suggestedMatch;
    if (amountVerified === true) row.amountVerified = true;
    allRowsData.push(row);
}

function updateStats(s, sub) {
    // V18.0: Combine group/alias and money/extension
    let combinedMatch = s.match + s.group;
    let combinedMoney = s.money;

    safeSet('kpiBook', s.book); safeSet('kpiOk', combinedMatch);
    safeSet('kpiGroup', s.group); safeSet('kpiMoney', combinedMoney);
    safeSet('kpiRecover', s.recover);
    safeSet('kpiMiss', s.miss); // مؤكد في بوكينج ولم يظهر في نزيل = لا عمولة
    safeSet('kpiRevB', s.revB.toLocaleString()); safeSet('kpiRevN', s.revN.toLocaleString());
    safeSet('kpiDiff', (s.revN - s.revB).toLocaleString());
    safeSet('subOk', sub.ok); safeSet('subCan', sub.can); safeSet('subNos', sub.nos);
    if (typeof window !== 'undefined') window.lastStats = { s: s, sub: sub };
}

// متغير لتخزين فلتر الحالة
let statusFilter = null;

function setFilter(type, btn) {
    // إزالة التفعيل من جميع الفلاتر
    document.querySelectorAll('.pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = type;
    statusFilter = null; // إعادة تعيين فلتر الحالة عند استخدام الفلاتر العادية
    if (typeof window.renderTable === 'function') {
        window.renderTable();
    }
}

function setStatusFilter(status, btn) {
    // إزالة التفعيل من جميع الفلاتر
    document.querySelectorAll('.pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    statusFilter = status; // حفظ فلتر الحالة
    currentFilter = 'all'; // إعادة تعيين الفلتر العادي
    if (typeof window.renderTable === 'function') {
        window.renderTable();
    }
}

function filterTable() { 
    if (typeof window.renderTable === 'function') {
        window.renderTable(); 
    }
}

function sortTable(n) {
    let table = document.getElementById("mainTable");
    let dir = table.getAttribute("data-sort-dir") === "asc" ? "desc" : "asc";
    table.setAttribute("data-sort-dir", dir);
    table.setAttribute("data-sort-col", n);

    allRowsData.sort((a, b) => {
        let valA, valB;
        switch(n) {
            case 0: return (dir === 'asc') ? 1 : -1; 
            case 1: valA = a.bName; valB = b.bName; break;
            case 2: valA = a.status; valB = b.status; break;
            case 3: valA = a.n ? a.n["إسم العميل"] : ""; valB = b.n ? b.n["إسم العميل"] : ""; break;
            case 4: valA = a.type; valB = b.type; break;
            case 5: valA = a.bPrice; valB = b.bPrice; break;
            case 6: valA = a.nPrice; valB = b.nPrice; break;
            case 7: valA = (a.nPrice - a.bPrice); valB = (b.nPrice - b.bPrice); break;
            case 8: valA = a.timestamp; valB = b.timestamp; break;
        }
        if (typeof valA === 'string') { return dir === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA); }
        else { return dir === 'asc' ? valA - valB : valB - valA; }
    });
    renderTable();
}

// V18.0: Save alias to IndexedDB instead of sessionStorage
function markMerged(btn, bName) {
    let tr = btn.closest('tr');
    let nNameEl = tr.querySelector('td:nth-child(4)');
    let nName = prompt(\`أدخل اسم العميل في نزيل (مطابق لـ \${bName}):\`, nNameEl.innerText.trim());
    
    if (nName && nName.trim() !== '-' && nName.trim() !== '') {
        saveAlias(bName, nName);

        let rowData = allRowsData.find(r => r.bName === bName && r.type === 'miss');
        if(rowData) {
            rowData.type = 'alias';
            
            // Heuristic Nazeel matching for display purposes only
            let matchN = cachedN.find(n => normalize(n["إسم العميل"]) === normalize(nName));
            if(matchN) {
                rowData.n = matchN;
                rowData.nPrice = cleanPrice(matchN["الايجار الكلي"]||matchN["الاجمالي"]);
                let el = document.getElementById('kpiRevB');
                let elN = document.getElementById('kpiRevN');
                el.innerText = (parseFloat(el.innerText.replace(/,/g,'')) + rowData.bPrice).toLocaleString();
                elN.innerText = (parseFloat(elN.innerText.replace(/,/g,'')) + rowData.nPrice).toLocaleString();
            }

            // Update stats and re-render
            const kpiOk = document.getElementById('kpiOk'); kpiOk.textContent = parseInt(kpiOk.textContent) + 1;
            renderTable(); 
        }
    }
}

// V18.0: This is no longer needed since Alias mapping runs in process(). It is replaced by the async loop in process.
async function applyManuals(s) {
    // This function is now mostly redundant as the 'alias' check is done inside the main process loop using getAlias.
    // However, it can be used to re-calculate stats for *missed* bookings that were manually merged
    // in this session before the alias check ran, or for consistency.
    // For now, let's keep it simple: the process handles the memory.
}

</script>

</body>
</html>`;
    }

    init() {
        // BookingNazeelComparePage initialized
        
        // Initialize variables
        if (!window.bookingNazeelVars) {
            window.currentFilter = 'all';
            window.statusFilter = null;
            window.allRowsData = [];
            window.cachedN = null;
            window.cachedB = null;
            window.db = null;
            window.bookingNazeelVars = true;
        }

        // --- IndexedDB Functions (V18.0) ---
        window.initDB = function() {
            return new Promise((resolve, reject) => {
                const request = indexedDB.open('AdoraMatchDB', 1);

                request.onupgradeneeded = (e) => {
                    window.db = e.target.result;
                    if (!window.db.objectStoreNames.contains('aliases')) {
                        window.db.createObjectStore('aliases', { keyPath: 'bName' });
                    }
                };

                request.onsuccess = (e) => {
                    window.db = e.target.result;
                    resolve(window.db);
                };

                request.onerror = (e) => {
                    console.error("IndexedDB error:", e.target.error);
                    reject(e.target.error);
                };
            });
        };

        window.saveAlias = function(bName, nName) {
            if(!window.db) return;
            const transaction = window.db.transaction(['aliases'], 'readwrite');
            const store = transaction.objectStore('aliases');
            store.put({ bName: window.normalize(bName), nName: window.normalize(nName) });
        };

        window.getAlias = function(bName) {
            return new Promise((resolve, reject) => {
                if(!window.db) { resolve(null); return; }
                const transaction = window.db.transaction(['aliases'], 'readonly');
                const store = transaction.objectStore('aliases');
                const request = store.get(window.normalize(bName));
                
                request.onsuccess = (e) => {
                    resolve(e.target.result);
                };

                request.onerror = (e) => {
                    // Error retrieving alias - return null silently
                    resolve(null);
                };
            });
        };

        // AI Levenshtein
        window.levenshtein = function(a, b) {
            const matrix = [];
            for(let i=0; i<=b.length; i++) matrix[i] = [i];
            for(let j=0; j<=a.length; j++) matrix[0][j] = j;
            for(let i=1; i<=b.length; i++) {
                for(let j=1; j<=a.length; j++) {
                    if(b.charAt(i-1)==a.charAt(j-1)) matrix[i][j] = matrix[i-1][j-1];
                    else matrix[i][j] = Math.min(matrix[i-1][j-1]+1, Math.min(matrix[i][j-1]+1, matrix[i-1][j]+1));
                }
            }
            return matrix[b.length][a.length];
        };

        window.safeSet = function(id, v){ if(document.getElementById(id)) document.getElementById(id).textContent = v; };
        window.cleanPrice = function(v) { return parseFloat(String(v||0).replace(/[^0-9.]/g, "").replace(",", ".")) || 0; };

        window.DATE_TOLERANCE_DAYS_NAME = 2;
        window.DATE_TOLERANCE_DAYS_GROUP = 3;
        window.DATE_TOLERANCE_DAYS_GUESS = 2;
        window.DATE_TOLERANCE_DAYS_EXT = 2;
        window.PRICE_TOLERANCE_NAME = 15;
        window.PRICE_TOLERANCE_GROUP = 15;
        window.PRICE_TOLERANCE_GUESS = 8;
        window.PRICE_TOLERANCE_EXT = 20;
        window.refMatch = function(bRef, nRef) {
            var b = String(bRef||"").trim();
            var n = String(nRef||"").trim();
            if (!b || !n) return false;
            if (n.indexOf(b) !== -1 || b.indexOf(n) !== -1) return true;
            if (b.length <= 12 && n.length <= 12 && window.levenshtein(b, n) <= 2) return true;
            return false;
        };

        window.normalize = typeof memoizedNormalize !== 'undefined' 
            ? memoizedNormalize 
            : function(s) { 
            s = String(s||"");
            if(s.includes(",")) s = s.split(",").map(function(p){return p.trim();}).reverse().join(" ");
            return s.toLowerCase()
                .replace(/[أإآ]/g,"ا").replace(/ة/g,"ه").replace(/ى/g,"ي")
                .replace(/al-/g, "").replace(/al /g, "").replace(/bin /g, "").replace(/abu /g, "")
                .replace(/mr /g, "").replace(/mrs /g, "")
                .replace(/[^\w\u0600-\u06FF]/g," ").replace(/\s+/g, " ").trim(); 
        };

        // V19.0: Gemini AI for cross-language/phonetic matching
        window.GEMINI_API_KEY = "AIzaSyD_XDLjvHhNCuIPSymraAytrJi2ktCL2Vo";
        window.callAI = async function(guestName, candidatePool) {
            try {
                var res = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + window.GEMINI_API_KEY, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: 'IS GUEST "' + guestName + '" THE SAME PERSON AS ANY IN THIS LIST (PHONETIC/CROSS-LANGUAGE)? [' + candidatePool.join(',') + ']. JSON ONLY: {"match":true, "name":"ExactNameFromList"} or {"match":false}' }] }]
                    })
                });
                var d = await res.json();
                var text = d.candidates[0].content.parts[0].text;
                var jsonMatch = text.match(/\{.*\}/s);
                if (jsonMatch) return JSON.parse(jsonMatch[0]);
                return null;
            } catch(e) { return null; }
        };

        window.parseDate = function(v) {
            if(!v && v!==0) return null;
            if(typeof v === 'number') return new Date((v - 25569)*86400000);
            if(typeof v === 'string') {
                if(v.includes('-')) { let p = v.split(' ')[0].split('-'); if(p[0].length===4) return new Date(p[0],p[1]-1,p[2]); return new Date(p[2],p[1]-1,p[0]); }
                if(v.includes('/')) { let p = v.split(' ')[0].split('/'); if(p[0].length===4) return new Date(p[0],p[1]-1,p[2]); return new Date(p[2],p[1]-1,p[0]); }
            }
            return null;
        };
        window.toENDateStr = function(d) { if(!d) return "-"; return d.toLocaleDateString('en-GB', {day:'2-digit', month:'2-digit'}); };
        window.getParts = function(name) {
            var parts = window.normalize(name).split(" ").filter(Boolean);
            var merged = [];
            for (var i = 0; i < parts.length; i++) {
                if (parts[i] === "عبد" && i + 1 < parts.length && (parts[i + 1] === "الملك" || parts[i + 1] === "الله" || parts[i + 1] === "الرحمن")) {
                    merged.push(parts[i] + " " + parts[i + 1]);
                    i++;
                } else merged.push(parts[i]);
            }
            parts = merged;
            var long = parts.filter(x => x.length > 2);
            if (long.length >= 2) return long;
            if (parts.length >= 2 && long.length <= 1) return parts;
            return long.length ? long : parts;
        };

        window.AR_TO_LAT = { 'ا':'a','أ':'a','آ':'a','إ':'a','ئ':'y','ؤ':'w','ء':'','ب':'b','ت':'t','ث':'th','ج':'j','ح':'h','خ':'kh','د':'d','ذ':'dh','ر':'r','ز':'z','س':'s','ش':'sh','ص':'s','ض':'d','ط':'t','ظ':'z','ع':'a','غ':'gh','ف':'f','ق':'q','ك':'k','ل':'l','م':'m','ن':'n','ه':'h','و':'w','ي':'y','ى':'y','ة':'h','ڤ':'v' };
        window.isArabicWord = function(w) {
            if (!w || typeof w !== 'string') return false;
            for (var i = 0; i < w.length; i++) { if (w.charCodeAt(i) >= 0x0600 && w.charCodeAt(i) <= 0x06FF) return true; }
            return false;
        };
        window.transliterateToLatin = function(w) {
            if (!w || typeof w !== 'string') return '';
            var out = '';
            for (var i = 0; i < w.length; i++) {
                var c = w[i];
                out += window.AR_TO_LAT[c] !== undefined ? window.AR_TO_LAT[c] : (c.charCodeAt(0) >= 0x0600 && c.charCodeAt(0) <= 0x06FF ? '' : c);
            }
            return out.replace(/\s+/g, ' ').trim();
        };
        // القاعدة: أمثلة المستخدم لتعديل القاعدة (إضافة مرادفات عربي↔لاتيني) — المطابقة في الاتجاهين
        window.COMMON_NAME_EQUIVALENTS = [
            { ar: "محمد", lat: ["mohammed", "muhammad", "mohamed", "mhmd", "mohamad"] },
            { ar: "عبدالله", lat: ["abdullah", "abdallah", "abdalla"] },
            { ar: "سعود", lat: ["saud"] },
            { ar: "عبدالملك", lat: ["abdulmalik", "abdul malik", "abdulmalek"] },
            { ar: "عبد الملك", lat: ["abdulmalik", "abdul malik"] },
            { ar: "الملك", lat: ["malik", "malek"] },
            { ar: "ابراهيم", lat: ["ibrahim", "ebrahem", "abrahim", "ibrahem"] },
            { ar: "الصاعدي", lat: ["alsaedi", "alsedi", "alsaady", "alsaadi", "alsaedy", "alsaidi"] },
            { ar: "صاعدي", lat: ["alsaedi", "alsedi", "alsaady", "alsaadi"] },
            { ar: "الغامدي", lat: ["ghamdi", "ghamdy", "alghamdi", "alghamdy"] },
            { ar: "غامدي", lat: ["ghamdi", "ghamdy"] },
            { ar: "أحمد", lat: ["ahmed", "ahmad"] },
            { ar: "علي", lat: ["ali", "aly"] },
            { ar: "هدى", lat: ["huda", "hoda"] },
            { ar: "هبه", lat: ["hebatalla", "heba", "haba", "hebatallah"] },
            { ar: "الساعي", lat: ["elsaey", "alsaey", "elsaei", "alsaiei", "alsaay"] },
            { ar: "ساعي", lat: ["elsaey", "alsaey", "elsaei", "alsaiei"] },
            { ar: "العنزي", lat: ["alanazi", "al anazi", "alnazi"] },
            { ar: "عنزي", lat: ["alanazi", "al anazi"] },
            { ar: "العسيري", lat: ["alasiri", "al asiri", "alasiry", "al asiry"] },
            { ar: "عسيري", lat: ["alasiri", "al asiri"] },
            { ar: "صالح", lat: ["saleh", "salah"] },
            { ar: "السلمي", lat: ["sulami", "alsulami", "al sulami"] },
            { ar: "سلمي", lat: ["sulami"] },
            { ar: "هادي", lat: ["hadi"] },
            { ar: "زاهر", lat: ["zaher", "zaheer"] },
            { ar: "البراء", lat: ["albaraa", "albara", "baraa", "bara"] },
            { ar: "مشبب", lat: ["mushabbab", "meshabbab", "meshabab"] },
            { ar: "يعقوب", lat: ["yaqub", "yacoub", "yagoub", "yaqoub"] },
            { ar: "الصيني", lat: ["alsini", "al sini", "alsiney", "sini"] },
            { ar: "صيني", lat: ["alsini", "sini"] },
            { ar: "طه", lat: ["taha"] },
            { ar: "الكليدار", lat: ["alkillidar", "al killidar", "killidar"] },
            { ar: "عبدالمجيد", lat: ["abdulmajeed", "abdul majeed", "abdulmajid"] },
            { ar: "الطويرقي", lat: ["altowairqi", "al towairqi", "towairqi", "altuwairqi"] },
            { ar: "طويرقي", lat: ["altowairqi", "towairqi"] },
            { ar: "ماجد", lat: ["majed", "maged"] },
            { ar: "امجد", lat: ["amjad", "majed", "maged"] },
            { ar: "الزامل", lat: ["alzamil", "al zamil", "zamil"] },
            { ar: "زامل", lat: ["alzamil", "zamil"] },
            { ar: "إيمان", lat: ["imen", "iman", "imane"] },
            { ar: "غفران", lat: ["ghufran", "gufran"] },
            { ar: "الحسني", lat: ["hussein", "hussain", "husain", "alhusaini", "alhussaini"] },
            { ar: "حسني", lat: ["hussein", "hussain", "husain"] },
            { ar: "شاوش", lat: ["chaouch", "chaouech", "chaouche"] },
            { ar: "عاثر", lat: ["atheer", "ather"] },
            { ar: "المتير", lat: ["almutaire", "al mutaire", "almutairi", "mutaire"] },
            { ar: "متير", lat: ["almutaire", "mutaire"] },
            { ar: "موضي", lat: ["modhi", "moudhi", "mody"] },
            { ar: "العازمي", lat: ["alazmi", "al azmi", "alazemi"] },
            { ar: "عازمي", lat: ["alazmi", "azmi"] },
            { ar: "بينايان", lat: ["binayan", "binian"] },
            { ar: "ابونايف", lat: ["abonayef", "abunayef", "abunaif"] },
            { ar: "العتيبي", lat: ["alotibi", "al otaibi", "otibi", "otaibi"] },
            { ar: "عتيبي", lat: ["alotibi", "otibi"] },
            { ar: "العالم", lat: ["alam", "alalam"] },
            { ar: "حنان", lat: ["hanan"] },
            { ar: "رنا", lat: ["rana"] },
            { ar: "سعد", lat: ["saad", "sad"] },
            { ar: "ياسر", lat: ["yasser", "yaser"] },
            { ar: "الشهراني", lat: ["alshahrani", "shahrani"] },
            { ar: "الزهراني", lat: ["alzahrani", "zahrani"] },
            { ar: "حمادة", lat: ["hamada", "hamad"] },
            { ar: "حماد", lat: ["hamada", "hamad"] },
            { ar: "عمر", lat: ["omara", "omar", "umara"] },
            { ar: "الاحمدي", lat: ["alahmadi", "alahmady", "al ahmadi"] },
            { ar: "احمدي", lat: ["alahmadi", "ahmadi"] },
            { ar: "حسام", lat: ["hussam", "hossam", "husam"] },
            { ar: "الديادي", lat: ["aldadi", "al dadi", "aldady"] },
            { ar: "الدادي", lat: ["aldadi", "al dadi", "aldady"] },
            { ar: "عبدالرحمن", lat: ["abdulrahman", "abdul rahman", "abdulrahman"] },
            { ar: "سوسن", lat: ["sawsen", "sawsan", "saws"] },
            { ar: "سوس", lat: ["saws"] },
            { ar: "كلبوسي", lat: ["kalboussi", "kalbousi", "kalbusi"] },
            { ar: "حسين", lat: ["hussein", "hussain", "husain"] },
            { ar: "بدر", lat: ["bader", "badr"] },
            { ar: "الرويلي", lat: ["alrwili", "al rwili", "alruwaili"] },
            { ar: "رويلي", lat: ["alrwili", "rwili"] },
            { ar: "حمزة", lat: ["hamzah", "hamza"] },
            { ar: "عثمان", lat: ["othman", "osman", "uthman"] },
            { ar: "خالد", lat: ["khalid", "khaled"] },
            { ar: "عمار", lat: ["ammar", "amar", "ammara"] },
            { ar: "النخلي", lat: ["alnakhli", "al nakhli", "elnakhli", "nakhli"] },
            { ar: "نخلي", lat: ["alnakhli", "nakhli"] },
            { ar: "إسلام", lat: ["islam", "eslam"] },
            { ar: "اسلام", lat: ["islam", "eslam"] },
            { ar: "الديادي", lat: ["aldadi", "al dadi", "aldady", "ellaboudy", "elaboudy", "laboudy"] },
            { ar: "الشهري", lat: ["alshehri", "al shehri", "alshahri", "alshihri", "shehri"] },
            { ar: "شهري", lat: ["alshehri", "shehri"] },
            { ar: "عبدالعزيز", lat: ["abdulaziz", "abdul aziz", "abdulazez"] },
            { ar: "اسامة", lat: ["osama", "usama", "ossama"] },
            { ar: "السحيمي", lat: ["alsuhaymi", "al suhaymi", "alsuhimi", "suhaymi", "alsuhymi"] },
            { ar: "سحيمي", lat: ["alsuhaymi", "suhaymi"] }
        ];
        window.wordSimilarity = function(bp, np, maxDist) {
            maxDist = maxDist === undefined ? 2 : maxDist;
            var crossDist = Math.max(maxDist, 4);
            var bpNorm = window.normalize(bp);
            var npNorm = window.normalize(np);
            if (bpNorm.length >= 3 && npNorm.length >= 3 && (npNorm.indexOf(bpNorm) === 0 || bpNorm.indexOf(npNorm) === 0)) return true;
            if (window.levenshtein(bp, np) <= maxDist) return true;
            for (var i = 0; i < window.COMMON_NAME_EQUIVALENTS.length; i++) {
                var eq = window.COMMON_NAME_EQUIVALENTS[i];
                var arMatch = (npNorm === eq.ar || npNorm.indexOf(eq.ar) === 0);
                var latMatch = eq.lat.some(function(l) { return window.levenshtein(bpNorm, l) <= maxDist; });
                if (arMatch && latMatch) return true;
            }
            if (window.isArabicWord(np)) {
                var npLat = window.transliterateToLatin(np);
                if (npLat) {
                    if (window.levenshtein(bpNorm, npLat) <= crossDist) return true;
                    if (npLat.length > 2 && npLat.substring(0, 2) === "al" && window.levenshtein(bpNorm, npLat.substring(2)) <= maxDist) return true;
                }
            }
            if (window.isArabicWord(bp)) {
                var bpLat = window.transliterateToLatin(bp);
                if (bpLat) {
                    if (window.levenshtein(bpLat, npNorm) <= crossDist) return true;
                    if (bpLat.length > 2 && bpLat.substring(0, 2) === "al" && window.levenshtein(bpLat.substring(2), npNorm) <= maxDist) return true;
                }
            }
            return false;
        };
        window.guessNameOverlap = function(bParts, nParts) {
            if (!bParts.length || !nParts.length) return false;
            for (var i = 0; i < bParts.length; i++) {
                for (var j = 0; j < nParts.length; j++) {
                    if (window.wordSimilarity(bParts[i], nParts[j], 3)) return true;
                }
            }
            return false;
        };
        window.nameMatchScore = function(bParts, nParts, strict) {
            var maxDist = strict ? 1 : 2;
            var simScore = 0;
            if (!bParts.length || !nParts.length) return 0;
            bParts.forEach(function(bp) {
                if (nParts.some(function(np) { return window.wordSimilarity(bp, np, maxDist); })) simScore++;
            });
            return simScore;
        };
        window.singleWordMatchesFirstOrLast = function(bParts, nParts, maxDist) {
            if (!bParts.length || bParts.length > 1 || !nParts.length) return false;
            var bp = bParts[0];
            for (var j = 0; j < nParts.length; j++) {
                if ((j === 0 || j === nParts.length - 1) && window.wordSimilarity(bp, nParts[j], maxDist)) return true;
            }
            return false;
        };
        window.twoWordMatchesFirstOrLast = function(bParts, nParts, maxDist) {
            maxDist = maxDist === undefined ? 2 : maxDist;
            if (!bParts.length || bParts.length !== 2 || !nParts.length) return false;
            var first = 0, last = nParts.length - 1;
            return (window.wordSimilarity(bParts[0], nParts[first], maxDist) || window.wordSimilarity(bParts[0], nParts[last], maxDist)) && (window.wordSimilarity(bParts[1], nParts[first], maxDist) || window.wordSimilarity(bParts[1], nParts[last], maxDist));
        };
        window.wordSimilarityStrictFirstLast = function(bp, np) {
            var bpNorm = window.normalize(bp);
            var npNorm = window.normalize(np);
            if (bpNorm.length >= 3 && npNorm.length >= 3 && (npNorm.indexOf(bpNorm) === 0 || bpNorm.indexOf(npNorm) === 0)) return true;
            if (bpNorm.length >= 2 && npNorm.length >= 5 && npNorm.indexOf(bpNorm) === 0) return true;
            if (npNorm.length >= 2 && bpNorm.length >= 5 && bpNorm.indexOf(npNorm) === 0) return true;
            if (window.levenshtein(bpNorm, npNorm) <= 1) return true;
            for (var i = 0; i < window.COMMON_NAME_EQUIVALENTS.length; i++) {
                var eq = window.COMMON_NAME_EQUIVALENTS[i];
                var arMatch = (npNorm === eq.ar || npNorm.indexOf(eq.ar) === 0) || (bpNorm === eq.ar || bpNorm.indexOf(eq.ar) === 0);
                var latMatch = eq.lat.some(function(l) { return window.levenshtein(bpNorm, l) <= 1; }) || eq.lat.some(function(l) { return window.levenshtein(npNorm, l) <= 1; });
                if (arMatch && latMatch) return true;
            }
            if (window.isArabicWord(np)) {
                var npLat = window.transliterateToLatin(np);
                if (npLat && window.levenshtein(bpNorm, npLat) <= 1) return true;
            }
            if (window.isArabicWord(bp)) {
                var bpLat = window.transliterateToLatin(bp);
                if (bpLat && window.levenshtein(bpLat, npNorm) <= 1) return true;
            }
            return false;
        };
        window.twoWordMatchesFirstOrLastStrict = function(bParts, nParts) {
            if (!bParts.length || bParts.length !== 2 || !nParts.length) return false;
            var first = 0, last = nParts.length - 1;
            var b0First = window.wordSimilarityStrictFirstLast(bParts[0], nParts[first]);
            var b0Last = window.wordSimilarityStrictFirstLast(bParts[0], nParts[last]);
            var b1First = window.wordSimilarityStrictFirstLast(bParts[1], nParts[first]);
            var b1Last = window.wordSimilarityStrictFirstLast(bParts[1], nParts[last]);
            return (b0First || b0Last) && (b1First || b1Last);
        };
        window.nameSubsetMatch = function(bParts, nParts, maxDist) {
            maxDist = maxDist === undefined ? 2 : maxDist;
            if (!bParts.length || !nParts.length) return false;
            var shorter = bParts.length <= nParts.length ? bParts : nParts;
            var longer = bParts.length <= nParts.length ? nParts : bParts;
            for (var i = 0; i < shorter.length; i++) {
                if (!longer.some(function(lw) { return window.wordSimilarity(shorter[i], lw, maxDist); })) return false;
            }
            return true;
        };
        window.nameSameWords = function(bParts, nParts, maxDist) {
            if (!bParts.length || !nParts.length || bParts.length !== nParts.length) return false;
            return window.nameSubsetMatch(bParts, nParts, maxDist) && window.nameSubsetMatch(nParts, bParts, maxDist);
        };
        window.nameFirstLastReversed = function(bParts, nParts, maxDist) {
            maxDist = maxDist === undefined ? 2 : maxDist;
            if (!bParts.length || !nParts.length || bParts.length !== 2 || nParts.length !== 2) return false;
            return window.wordSimilarity(bParts[0], nParts[1], maxDist) && window.wordSimilarity(bParts[1], nParts[0], maxDist);
        };
        window.nameFirstLastReversedStrict = function(bParts, nParts) {
            if (!bParts.length || !nParts.length || bParts.length !== 2 || nParts.length !== 2) return false;
            return window.wordSimilarityStrictFirstLast(bParts[0], nParts[1]) && window.wordSimilarityStrictFirstLast(bParts[1], nParts[0]);
        };
        window.nameSameWordsOrReversed = function(bParts, nParts, maxDist) {
            if (window.nameSameWords(bParts, nParts, maxDist)) return true;
            return window.nameFirstLastReversed(bParts, nParts, maxDist);
        };

        window.getDiffDiagnosis = function(diff, bPriceNet, taxMultiplier) {
            const absDiff = Math.abs(diff);
            if (absDiff < 5) return "مطابقة تامة";
            const taxDiff = bPriceNet * (taxMultiplier - 1);
            if (Math.abs(absDiff - taxDiff) < 5) return "فرق ضريبة/بلدية";
            const nightGuess = bPriceNet * 0.25;
            if (absDiff > nightGuess) return diff > 0 ? "تمديد ليلة محتمل" : "تخفيض سعر/خصم";
            return diff > 0 ? "زيادة غير مشخصة" : "نقصان غير مشخص";
        };

        window.setLoaderProgress = function(pct, label) {
            var fill = document.getElementById('loaderProgressFill');
            var lbl = document.getElementById('loaderLabel');
            var pctEl = document.getElementById('loaderPct');
            if (fill) fill.style.width = Math.min(100, Math.max(0, pct)) + '%';
            if (lbl && label !== undefined) lbl.textContent = label;
            if (pctEl) pctEl.textContent = Math.round(Math.min(100, Math.max(0, pct))) + '%';
        };

        // UI Event Listeners — تشغيل فوراً (بدون تأخير 100ms) حتى يكون startEngine جاهزاً عند رفع الملفين
        var autoStartTimer = null;
        function tryAutoStart() {
            var n = document.getElementById('nazeelFile');
            var b = document.getElementById('bookingFile');
            if (n && b && n.files && n.files[0] && b.files && b.files[0]) {
                if (autoStartTimer) clearTimeout(autoStartTimer);
                autoStartTimer = setTimeout(function() {
                    if (typeof window.startEngine === 'function') window.startEngine();
                    autoStartTimer = null;
                }, 800);
            }
        }
        setTimeout(() => {
            const nazeelFile = document.getElementById('nazeelFile');
            const bookingFile = document.getElementById('bookingFile');
            if(nazeelFile) {
                nazeelFile.addEventListener('change', function() { 
                    const dz = document.getElementById('dz-naz');
                    const progress = document.getElementById('progress-naz');
                    if(dz) dz.classList.add('file-loaded');
                    // شريط تحميل سريع (حوالي 0.2 ثانية)
                    if(progress) {
                        progress.style.width = '0%';
                        let width = 0;
                        const interval = setInterval(() => {
                            width += 5;
                            if (width > 100) width = 100;
                            progress.style.width = width + '%';
                            if(width >= 100) {
                                clearInterval(interval);
                                setTimeout(() => { progress.style.width = '0%'; }, 150);
                            }
                        }, 10);
                    }
                    tryAutoStart();
                });
            }
            if(bookingFile) {
                bookingFile.addEventListener('change', function() { 
                    const dz = document.getElementById('dz-book');
                    const progress = document.getElementById('progress-book');
                    if(dz) dz.classList.add('file-loaded');
                    // شريط تحميل سريع (حوالي 0.2 ثانية)
                    if(progress) {
                        progress.style.width = '0%';
                        let width = 0;
                        const interval = setInterval(() => {
                            width += 5;
                            if (width > 100) width = 100;
                            progress.style.width = width + '%';
                            if(width >= 100) {
                                clearInterval(interval);
                                setTimeout(() => { progress.style.width = '0%'; }, 150);
                            }
                        }, 10);
                    }
                    tryAutoStart();
                });
            }
            
            // Debounced search for better performance
            const searchInput = document.getElementById('searchInput');
            if (searchInput && typeof debounce === 'function') {
                const debouncedFilter = debounce(() => {
                    if (typeof window.filterTable === 'function') {
                        window.filterTable();
                    }
                }, 300);
                searchInput.addEventListener('input', debouncedFilter);
                searchInput.addEventListener('keyup', debouncedFilter);
            }

            // ملء الملخص المحاسبي عند الطباعة
            window.buildPrintSummary = function() {
                var el = document.getElementById('printSummary');
                if (!el) return;
                var st = window.lastStats;
                if (!st || !st.s) {
                    el.innerHTML = '<div class="ps-title">تقرير مطابقة الحجوزات — مراجعة عمولة بوكينج</div><p class="ps-date">لم يتم تشغيل التحليل بعد.</p>';
                    return;
                }
                var s = st.s, sub = st.sub;
                var revB = (typeof s.revB === 'number') ? s.revB.toLocaleString() : String(s.revB || 0);
                var revN = (typeof s.revN === 'number') ? s.revN.toLocaleString() : String(s.revN || 0);
                var diff = (typeof s.revN === 'number' && typeof s.revB === 'number') ? (s.revN - s.revB).toLocaleString() : String((s.revN || 0) - (s.revB || 0));
                var dateStr = new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
                el.innerHTML =
                    '<div class="ps-title">تقرير مطابقة الحجوزات — مراجعة عمولة بوكينج</div>' +
                    '<div class="ps-date">تاريخ التقرير: ' + dateStr + '</div>' +
                    '<div class="ps-section">أ) ملخص الحجوزات</div>' +
                    '<table class="ps-table"><tr><th>البند</th><th>العدد</th></tr>' +
                    '<tr><td>إجمالي الحجوزات (فريد)</td><td>' + (s.book || 0) + '</td></tr>' +
                    '<tr><td>مؤكد</td><td>' + (sub.ok || 0) + '</td></tr>' +
                    '<tr><td>ملغي</td><td>' + (sub.can || 0) + '</td></tr>' +
                    '<tr><td>NoShow (في الملف)</td><td>' + (sub.nos || 0) + '</td></tr>' +
                    '<tr><td>مطابق (مرجع / اسم / ذاكرة)</td><td>' + (s.match || 0) + '</td></tr>' +
                    '<tr><td>تجميع / غرفتان</td><td>' + (s.group || 0) + '</td></tr>' +
                    '<tr><td>بصمة / تمديد</td><td>' + (s.money || 0) + '</td></tr>' +
                    '<tr><td>تسكين (إلغاء)</td><td>' + (s.recover || 0) + '</td></tr>' +
                    '<tr><td>لم يحضر (لا عمولة)</td><td>' + (s.miss || 0) + '</td></tr>' +
                    '</table>' +
                    '<div class="ps-section">ب) الملخص المالي</div>' +
                    '<table class="ps-table"><tr><th>البند</th><th>المبلغ</th></tr>' +
                    '<tr><td>إيراد بوكينج (المطابق)</td><td>' + revB + '</td></tr>' +
                    '<tr><td>إيراد نزيل (المطابق)</td><td>' + revN + '</td></tr>' +
                    '<tr><td>الفرق (نزيل − بوكينج)</td><td>' + diff + '</td></tr>' +
                    '</table>' +
                    '<p style="font-size:8pt; margin-top:8px;">الهدف: التحقق من الحضور قبل دفع عمولة بوكينج. لم يحضر = لا عمولة.</p>';
            };
            window.addEventListener('beforeprint', function() { window.buildPrintSummary(); });

            // تحميل ملفات المشروع تلقائياً عند ?loadSample=1 (للمراجعة والاختبار)
            if (typeof window.location !== 'undefined' && window.location.search && window.location.search.indexOf('loadSample=1') !== -1) {
                setTimeout(function() {
                    if (typeof window.loadSampleAndRun === 'function') window.loadSampleAndRun();
                }, 400);
            }
        }, 0);

        window.readSheet = function(file) {
            return new Promise(resolve => {
                const r = new FileReader();
                r.onload = e => { const wb = XLSX.read(e.target.result, {type:'array'}); resolve(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], {header:1})); };
                r.readAsArrayBuffer(file);
            });
        };

        window.getData = function(raw, keys) {
            if (!raw || !raw.length) return [];
            let hRow = -1;
            var maxRows = Math.min(30, raw.length);
            for(let i=0; i<maxRows; i++) {
                if(!raw[i]) continue;
                let rowStr = Array.isArray(raw[i]) ? raw[i].map(function(c){ return String(c!= null ? c : "").trim(); }).join(" ") : JSON.stringify(raw[i]);
                let s = JSON.stringify(raw[i]);
                let ok = keys.every(function(k) {
                    if(s.includes(k)) return true;
                    if(k === "إسم العميل" && (s.includes("اسم العميل") || s.includes("المستخدم") || (rowStr.indexOf("العميل") !== -1 && (rowStr.indexOf("اسم") !== -1 || rowStr.indexOf("إسم") !== -1)))) return true;
                    if(k === "رقم الحجز" && (s.includes("رقم الحجز") || (rowStr.indexOf("رقم") !== -1 && rowStr.indexOf("حجز") !== -1))) return true;
                    if(k === "السعر" && (s.includes("السعر") || rowStr.indexOf("السعر") !== -1)) return true;
                    return false;
                });
                if(ok) { hRow = i; break; }
            }
            if(hRow===-1) return [];
            let headers = raw[hRow].map(x=>String(x!= null ? x : "").trim());
            return raw.slice(hRow+1).map(r => {
                let obj={};
                var row = Array.isArray(r) ? r : [];
                headers.forEach((h,i)=> {
                    let key = (h === "اسم العميل" || h === "المستخدم" ? "إسم العميل" : h);
                    obj[key] = row[i];
                });
                return obj;
            });
        };

        /** تجميع صفوف البوكينج حسب رقم الحجز: حجز واحد = صف واحد (هدف المشروع: مراجعة العمولة) */
        window.normalizeBookingByRef = function(booking) {
            if (!booking || !booking.length) return booking;
            let refGroups = {};
            booking.forEach(function(row, i) {
                let ref = String(row["رقم الحجز"] || "").trim();
                let key = ref ? ref : "_u_" + i;
                if (!refGroups[key]) refGroups[key] = [];
                refGroups[key].push(row);
            });
            return Object.keys(refGroups).map(function(key) {
                let group = refGroups[key];
                let first = group[0];
                if (group.length === 1) return first;
                let names = group.map(function(r) { return r["اسم الضيف\\الضيوف"] || r["اسم الضيف"] || r["تم الحجز من قِبل"] || ""; }).filter(Boolean);
                let combined = names.join(" ، ");
                let out = {};
                Object.keys(first).forEach(function(k) { out[k] = first[k]; });
                out["اسم الضيف\\الضيوف"] = combined;
                out["اسم الضيف"] = combined;
                return out;
            });
        };

        /** تحميل ملفات المشروع تلقائياً عند ?loadSample=1 (للمراجعة والاختبار — الملفات تُخدم من نفس السيرفر) */
        window.loadSampleAndRun = async function() {
            const loader = document.getElementById('loader');
            const uploadCard = document.getElementById('uploadCard');
            if(loader) loader.style.display = 'flex';
            if(uploadCard) uploadCard.style.display = 'none';
            if (window.setLoaderProgress) window.setLoaderProgress(0, 'جاري التحليل (V18.0)...');

            const nazeelUrl = 'GuestsStatistical_Ar.xlsx';
            const bookingUrl = 'الوصول - من 2026-01-01 إلى 2026-01-30.xls';

            try {
                if (window.setLoaderProgress) window.setLoaderProgress(15, 'جاري جلب الملفات...');
                const [nazeelRes, bookingRes] = await Promise.all([
                    fetch(nazeelUrl),
                    fetch(encodeURI(bookingUrl))
                ]);
                if(!nazeelRes.ok || !bookingRes.ok) {
                    alert('لم يتم العثور على ملفات المشروع. تأكد أن الملفين في جذر المشروع: GuestsStatistical_Ar.xlsx و الوصول - من 2026-01-01 إلى 2026-01-30.xls');
                    if(loader) loader.style.display = 'none';
                    if(uploadCard) uploadCard.style.display = 'block';
                    return;
                }
                if (window.setLoaderProgress) window.setLoaderProgress(30, 'جاري قراءة نزيل...');
                const nazeelBlob = await nazeelRes.blob();
                const bookingBlob = await bookingRes.blob();
                const f1 = new File([nazeelBlob], nazeelUrl);
                const f2 = new File([bookingBlob], bookingUrl);

                const taxVal = document.getElementById('taxVal');
                const muniVal = document.getElementById('muniVal');
                const taxP = taxVal ? parseFloat(taxVal.value) || 0 : 0;
                const muniP = muniVal ? parseFloat(muniVal.value) || 0 : 0;
                const tax = 1 + ((taxP + muniP) / 100);

                await window.initDB();
                if (window.setLoaderProgress) window.setLoaderProgress(45, 'جاري قراءة بوكينج...');

                const nRaw = await window.readSheet(f1);
                if (window.setLoaderProgress) window.setLoaderProgress(55, 'جاري تجهيز البيانات...');
                const bRaw = await window.readSheet(f2);
                window.cachedN = window.getData(nRaw, ["إسم العميل"]);
                let tempB = window.getData(bRaw, ["رقم الحجز", "السعر"]);

                let minD = null, maxD = null;
                window.cachedN.forEach(r => {
                    let d = window.parseDate(r["تاريخ الدخول"]);
                    if(d) { if(!minD || d<minD) minD=d; if(!maxD || d>maxD) maxD=d; }
                });
                if(minD && maxD) {
                    minD.setDate(minD.getDate()-1);
                    maxD.setDate(maxD.getDate()+1);
                    window.cachedB = tempB.filter(b => {
                        let d = window.parseDate(b["تسجيل الوصول"]);
                        return !d || (d>=minD && d<=maxD);
                    });
                } else { window.cachedB = tempB; }
                window.cachedB = window.normalizeBookingByRef(window.cachedB);

                if (window.setLoaderProgress) window.setLoaderProgress(75, 'جاري المطابقة...');
                await window.process(window.cachedB, window.cachedN, tax);
                if (window.setLoaderProgress) window.setLoaderProgress(100, 'تم التحليل');

                if(loader) loader.style.display = 'none';
                document.getElementById('controlPanel').style.display = 'flex';
                document.getElementById('dashboard').style.display = 'grid';
                document.getElementById('resultsArea').style.display = 'block';
                var ht = document.getElementById('headerTools'); if(ht) ht.classList.add('visible');
            } catch(e) {
                alert('خطأ عند تحميل العينة: ' + (e && e.message ? e.message : String(e)));
                if(loader) loader.style.display = 'none';
                if(uploadCard) uploadCard.style.display = 'block';
            }
        };

        window.startEngine = async function() {
            const f1 = document.getElementById('nazeelFile');
            const f2 = document.getElementById('bookingFile');
            if(!f1 || !f2 || !f1.files[0] || !f2.files[0]) { 
                alert("⚠️ يرجى رفع الملفات"); 
                return; 
            }

            const loader = document.getElementById('loader');
            const uploadCard = document.getElementById('uploadCard');
            if(loader) loader.style.display = 'flex';
            if(uploadCard) uploadCard.style.display = 'none';
            if (window.setLoaderProgress) window.setLoaderProgress(0, 'جاري التحليل (V18.0)...');

            const taxVal = document.getElementById('taxVal');
            const muniVal = document.getElementById('muniVal');
            const taxP = taxVal ? parseFloat(taxVal.value) || 0 : 0;
            const muniP = muniVal ? parseFloat(muniVal.value) || 0 : 0;
            const tax = 1 + ((taxP + muniP) / 100);

            await window.initDB();
            if (window.setLoaderProgress) window.setLoaderProgress(10, 'جاري قراءة ملف نزيل...');

            try {
                const nRaw = await window.readSheet(f1.files[0]);
                    if (window.setLoaderProgress) window.setLoaderProgress(35, 'جاري قراءة ملف بوكينج...');
                    const bRaw = await window.readSheet(f2.files[0]);
                    if (window.setLoaderProgress) window.setLoaderProgress(55, 'جاري تجهيز البيانات...');
                    window.cachedN = window.getData(nRaw, ["إسم العميل"]); 
                    let tempB = window.getData(bRaw, ["رقم الحجز", "السعر"]);

                    if (!window.cachedN || window.cachedN.length === 0) {
                        alert("ملف نزيل: لم يتم العثور على بيانات.\nتأكد من أن الملف يحتوي عمود \"إسم العميل\" (أو \"اسم العميل\" أو \"المستخدم\") في أحد أول 30 سطراً.");
                        if(loader) loader.style.display = 'none';
                        if(uploadCard) uploadCard.style.display = 'block';
                        return;
                    }
                    if (!tempB || tempB.length === 0) {
                        alert("ملف بوكينج: لم يتم العثور على بيانات.\nتأكد من أن الملف يحتوي أعمدة \"رقم الحجز\" و\"السعر\" في نفس السطر ضمن أول 30 سطراً.");
                        if(loader) loader.style.display = 'none';
                        if(uploadCard) uploadCard.style.display = 'block';
                        return;
                    }

                    let minD = null, maxD = null;
                    window.cachedN.forEach(r => { 
                        let d = window.parseDate(r["تاريخ الدخول"]); 
                        if(d) { 
                            if(!minD || d<minD) minD=d; 
                            if(!maxD || d>maxD) maxD=d; 
                        } 
                    });
                    if(minD && maxD) {
                        minD.setDate(minD.getDate()-1); 
                        maxD.setDate(maxD.getDate()+1);
                        window.cachedB = tempB.filter(b => { 
                            let d = window.parseDate(b["تسجيل الوصول"]); 
                            return !d || (d>=minD && d<=maxD); 
                        });
                    } else { 
                        window.cachedB = tempB; 
                    }
                    window.cachedB = window.normalizeBookingByRef(window.cachedB);

                    if (window.setLoaderProgress) window.setLoaderProgress(75, 'جاري المطابقة...');
                    if(typeof window.process === 'function') {
                        await window.process(window.cachedB, window.cachedN, tax);
                    }
                    if (window.setLoaderProgress) window.setLoaderProgress(100, 'تم التحليل');
                    
                    if(loader) loader.style.display = 'none';
                    const controlPanel = document.getElementById('controlPanel');
                    const dashboard = document.getElementById('dashboard');
                    const resultsArea = document.getElementById('resultsArea');
                    if(controlPanel) controlPanel.style.display = 'flex';
                    if(dashboard) dashboard.style.display = 'grid';
                    if(resultsArea) resultsArea.style.display = 'block';
                    var headerToolsEl = document.getElementById('headerTools'); if(headerToolsEl) headerToolsEl.classList.add('visible');

            } catch(e) { 
                alert("خطأ: " + (e && e.message ? e.message : String(e))); 
                if(loader) loader.style.display = 'none';
                if(uploadCard) uploadCard.style.display = 'block';
            }
        };

        window.process = async function(booking, nazeel, tax) {
            if (!Array.isArray(booking)) booking = [];
            if (!Array.isArray(nazeel)) nazeel = [];
            window.allRowsData = [];
            let s = { book:0, match:0, money:0, recover:0, group:0, miss:0, revB:0, revN:0 };
            let sub = { ok:0, can:0, nos:0 };
            let takenNazeel = new Set();
            let processedBooking = new Set();

            // عمود مرجع/رقم الحجز في نزيل: أولوية مرجع/مصدر ثم رقم الحجز ثم id (للمطابقة المباشرة عند توفر نفس الـ ID)
            const nazeelKeysRef = Object.keys((nazeel && nazeel[0]) || {});
            const refKey = nazeelKeysRef.find(k => k.includes("مرجع") || k.includes("مصدر"))
                || nazeelKeysRef.find(k => k.includes("رقم الحجز") || (k.includes("رقم") && k.includes("حجز")))
                || nazeelKeysRef.find(k => /^id$/i.test(String(k).trim()))
                || "";
            
            booking.forEach(b => {
                s.book++;
                let st = String(b["الحالة"]||"").toLowerCase();
                if(st.includes("ok")) sub.ok++; else if(st.includes("cancel")) sub.can++; else sub.nos++;
            });

            // V18.0: 0. Alias Mapping (The Memory)
            await Promise.all(booking.map(async (b, idx) => {
                if(processedBooking.has(idx)) return;
                const bName = b["اسم الضيف\\الضيوف"] || b["اسم الضيف"];
                const alias = await window.getAlias(bName);
                
                if (alias) {
                    let pool = nazeel.map((n,i)=>({n,i})).filter(x => !takenNazeel.has(x.i));
                    let match = pool.find(x => window.normalize(x.n["إسم العميل"]).includes(alias.nName));
                    
                    if (match) {
                        processedBooking.add(idx); takenNazeel.add(match.i);
                        window.storeResult(b, match.n, "alias", s, tax);
                    }
                }
            }));

            // 1. Grouping
            let groups = {};
            booking.forEach((b, idx) => {
                if(processedBooking.has(idx)) return;
                let name = window.normalize(b["اسم الضيف\\الضيوف"] || b["اسم الضيف"]);
                if(!groups[name]) groups[name] = [];
                groups[name].push({data: b, idx: idx});
            });

            for(let name in groups) {
                let group = groups[name];
                if(group.length < 2) continue;
                let totalExp = group.reduce((sum, item) => sum + (window.cleanPrice(item.data["السعر"])*tax), 0);
                let minDate = group.reduce((min, item) => { let d=window.parseDate(item.data["تسجيل الوصول"]); return (!min||d<min)?d:min; }, null);
                let bParts = window.getParts(name);
                let pool = nazeel.map((n,i)=>({n,i})).filter(x => !takenNazeel.has(x.i));
                let match = pool.find(x => {
                    let nPrice = window.cleanPrice(x.n["الايجار الكلي"]||x.n["الاجمالي"]);
                    let nDate = window.parseDate(x.n["تاريخ الدخول"]);
                    let nName = window.normalize(x.n["إسم العميل"]||"");
                    let nParts = window.getParts(nName);
                    let priceOk = Math.abs(nPrice - totalExp) <= window.PRICE_TOLERANCE_GROUP;
                    let dateOk = minDate && nDate && Math.abs((nDate - minDate)/864e5) <= window.DATE_TOLERANCE_DAYS_GROUP;
                    let sim = window.nameMatchScore(bParts, nParts, false);
                    let nameOk = (sim >= 2) || (bParts.length === 1 && sim === 1 && window.singleWordMatchesFirstOrLast(bParts, nParts, 2));
                    return priceOk && dateOk && nameOk;
                });
                if(!match) {
                    let candidates = pool.filter(x => {
                        let nName = window.normalize(x.n["إسم العميل"]||"");
                        let nParts = window.getParts(nName);
                        let sim = window.nameMatchScore(bParts, nParts, false);
                        return (sim >= 2) || (bParts.length === 1 && sim === 1 && window.singleWordMatchesFirstOrLast(bParts, nParts, 2));
                    });
                    for(let i = 0; i < candidates.length; i++) {
                        for(let j = i + 1; j < candidates.length; j++) {
                            let p1 = window.cleanPrice(candidates[i].n["الايجار الكلي"]||candidates[i].n["الاجمالي"]);
                            let p2 = window.cleanPrice(candidates[j].n["الايجار الكلي"]||candidates[j].n["الاجمالي"]);
                            let sumOk = Math.abs(p1 + p2 - totalExp) <= window.PRICE_TOLERANCE_GROUP;
                            let d1 = window.parseDate(candidates[i].n["تاريخ الدخول"]);
                            let d2 = window.parseDate(candidates[j].n["تاريخ الدخول"]);
                            let dateOk = minDate && ( (d1 && Math.abs((d1 - minDate)/864e5) <= window.DATE_TOLERANCE_DAYS_GROUP) || (d2 && Math.abs((d2 - minDate)/864e5) <= window.DATE_TOLERANCE_DAYS_GROUP) );
                            if(sumOk && dateOk) {
                                match = { multi: true, rows: [candidates[i], candidates[j]], totalPrice: p1 + p2 };
                                break;
                            }
                        }
                        if(match) break;
                    }
                }
                if(match) {
                    if(match.multi) {
                        match.rows.forEach(r => takenNazeel.add(r.i));
                        group.forEach((item, i) => {
                            processedBooking.add(item.idx);
                            window.storeResult(item.data, (i===0 ? match.rows[0].n : null), "group", s, tax, i===0, i===0 ? match.totalPrice : undefined);
                        });
                    } else {
                        takenNazeel.add(match.i);
                        group.forEach((item, i) => {
                            processedBooking.add(item.idx);
                            window.storeResult(item.data, (i===0?match.n:null), "group", s, tax, i===0);
                        });
                    }
                }
            }

            // 2. Waterfall (Individual)
            booking.forEach((b, idx) => {
                if(processedBooking.has(idx)) return;
                const bRef = String(b["رقم الحجز"]||"").trim();
                const bName = window.normalize(b["اسم الضيف\\الضيوف"] || b["اسم الضيف"]);
                const bPrice = window.cleanPrice(b["السعر"]);
                const expPrice = bPrice * tax;
                const bDate = window.parseDate(b["تسجيل الوصول"]);
                
                let pool = nazeel.map((n,i)=>({n,i})).filter(x => !takenNazeel.has(x.i));
                let match = null, type = "";

                // Ref — أولوية كبيرة: إذا رقم الحجز متطابق تماماً في نزيل وبوكينج نربط مباشرة. قد يكون للضيف أكثر من صف نزيل (غرفتان 604 + 403) → نجمع كل الأسعار.
                if(refKey && bRef) {
                    let refMatches = pool.filter(x => window.refMatch(bRef, x.n[refKey]));
                    if(refMatches.length > 0) {
                        var bRefNorm = String(bRef).trim();
                        var exactRefMatches = refMatches.filter(function(x) { return bRefNorm === String(x.n[refKey] || "").trim(); });
                        if (exactRefMatches.length > 0) {
                            var totalNazeelPrice = exactRefMatches.reduce(function(sum, m) { return sum + window.cleanPrice(m.n["الايجار الكلي"]||m.n["الاجمالي"]); }, 0);
                            exactRefMatches.forEach(function(m) { takenNazeel.add(m.i); });
                            processedBooking.add(idx);
                            window.storeResult(b, exactRefMatches[0].n, "ref", s, tax, false, totalNazeelPrice);
                            return;
                        }
                        let bParts = window.getParts(bName);
                        let scored = refMatches.map(m => {
                            let nParts = window.getParts(window.normalize(m.n["إسم العميل"]||""));
                            let score = window.nameMatchScore(bParts, nParts, false);
                            let subset = window.nameSubsetMatch(bParts, nParts, 2) || window.nameSubsetMatch(nParts, bParts, 2);
                            let sameWords = bParts.length >= 2 && nParts.length === bParts.length && window.nameSameWordsOrReversed(bParts, nParts, 2);
                            return { m, score, strong: score >= 2 || subset || sameWords };
                        });
                        let best = scored.reduce((acc, cur) => {
                            if (!acc) return cur;
                            if (cur.strong && !acc.strong) return cur;
                            if (!cur.strong && acc.strong) return acc;
                            return cur.score >= acc.score ? cur : acc;
                        }, null);
                        let useRef = best.strong || (bParts.length < 2) || (bParts.length >= 2 ? best.score >= 2 : best.score >= 1);
                        if (!useRef && bParts.length >= 2) { /* skip ref, fall through to name */ } else {
                            let totalNazeelPrice = refMatches.reduce((sum, m) => sum + window.cleanPrice(m.n["الايجار الكلي"]||m.n["الاجمالي"]), 0);
                            let firstMatch = best ? best.m : refMatches[0];
                            refMatches.forEach(m => takenNazeel.add(m.i));
                            processedBooking.add(idx);
                            window.storeResult(b, firstMatch.n, "ref", s, tax, false, totalNazeelPrice);
                            return;
                        }
                    }
                }

                // عكس الاسم أولاً (مشبب البراء ↔ البراء مشبب، Zaher ALASIRI ↔ ALASIRI Zaher) — قبل أي مطابقة أخرى بالاسم
                if(!match) {
                    let bParts = window.getParts(bName);
                    if(bParts.length === 2) {
                        let reversedMatch = pool.find(x => {
                            let nName = window.normalize(x.n["إسم العميل"]);
                            let nParts = window.getParts(nName);
                            if(nParts.length !== 2 || !window.nameFirstLastReversedStrict(bParts, nParts)) return false;
                            let nPrice = window.cleanPrice(x.n["الايجار الكلي"]||x.n["الاجمالي"]);
                            let nDate = window.parseDate(x.n["تاريخ الدخول"]);
                            let tolPrice = Math.max(window.PRICE_TOLERANCE_NAME * 2, 45);
                            if (!bDate || !nDate) tolPrice = Math.min(350, Math.max(150, Math.round(expPrice * 0.30)));
                            let priceMatch = Math.abs(nPrice - expPrice) <= tolPrice;
                            if(bDate && nDate) {
                                let dateMatch = Math.abs((nDate - bDate)/864e5) <= 7;
                                return dateMatch && priceMatch;
                            }
                            return priceMatch;
                        });
                        if(reversedMatch) { match = reversedMatch; type = "reversed"; }
                    }
                }

                // نفس الكلمات بترتيب مختلف أو عكس أول/ثاني
                if(!match) {
                    let bParts = window.getParts(bName);
                    if(bParts.length >= 2) {
                        match = pool.find(x => {
                            let nName = window.normalize(x.n["إسم العميل"]);
                            let nParts = window.getParts(nName);
                            if(!window.nameSameWordsOrReversed(bParts, nParts, 2)) return false;
                            if(bParts.length === 2 && !window.twoWordMatchesFirstOrLastStrict(bParts, nParts)) return false;
                            let nPrice = window.cleanPrice(x.n["الايجار الكلي"]||x.n["الاجمالي"]);
                            let nDate = window.parseDate(x.n["تاريخ الدخول"]);
                            var tolPrice = Math.max(window.PRICE_TOLERANCE_GUESS * 3, 30);
                            if (!bDate || !nDate) tolPrice = Math.min(350, Math.max(150, Math.round(expPrice * 0.30)));
                            let priceMatch = Math.abs(nPrice - expPrice) <= tolPrice;
                            if(bDate && nDate) {
                                let tolDays = 7;
                                let dateMatch = Math.abs((nDate - bDate)/864e5) <= tolDays;
                                return dateMatch && priceMatch;
                            }
                            return priceMatch;
                        });
                        if(match) type = "name";
                    }
                }

                // اسم فرعي — إذا البوكينج كلمتان ونزيل أكثر من كلمتين: نطلب أن تطابق الكلمتان أول/آخر نزيل فقط
                if(!match) {
                    let bParts = window.getParts(bName);
                    if(bParts.length >= 2) {
                        match = pool.find(x => {
                            let nName = window.normalize(x.n["إسم العميل"]);
                            let nParts = window.getParts(nName);
                            if(!window.nameSubsetMatch(bParts, nParts, 2)) return false;
                            if(bParts.length === 2 && !window.twoWordMatchesFirstOrLastStrict(bParts, nParts)) return false;
                            let nPrice = window.cleanPrice(x.n["الايجار الكلي"]||x.n["الاجمالي"]);
                            let nDate = window.parseDate(x.n["تاريخ الدخول"]);
                            var tolPrice = window.PRICE_TOLERANCE_GUESS * 2;
                            if (!bDate || !nDate) tolPrice = Math.min(350, Math.max(150, Math.round(expPrice * 0.30)));
                            let priceMatch = Math.abs(nPrice - expPrice) <= tolPrice;
                            if(bDate && nDate) {
                                let tolDays = 7;
                                let dateMatch = Math.abs((nDate - bDate)/864e5) <= tolDays;
                                return dateMatch && priceMatch;
                            }
                            return priceMatch;
                        });
                        if(match) type = "name";
                    }
                }

                // Name — تسامح عند تشابه الاسم؛ نفضّل الأقوى (nameMatchScore ثم twoWordMatchesFirstOrLast) + استثناء تطابق قوي أول/آخر
                if(!match) {
                    let bParts = window.getParts(bName);
                    let bNameNorm = window.normalize(bName);
                    let candidates = pool.filter(x => {
                        let nName = window.normalize(x.n["إسم العميل"]);
                        let nParts = window.getParts(nName);
                        if (bParts.length === 2 && !window.twoWordMatchesFirstOrLastStrict(bParts, nParts) && !window.nameSameWordsOrReversed(bParts, nParts, 2)) return false;
                        let nPrice = window.cleanPrice(x.n["الايجار الكلي"]||x.n["الاجمالي"]);
                        let nDate = window.parseDate(x.n["تاريخ الدخول"]);
                        let simScore = window.nameMatchScore(bParts, nParts, false);
                        let subsetMatch = window.nameSubsetMatch(bParts, nParts, 2);
                        let sameWords = window.nameSameWordsOrReversed(bParts, nParts, 2);
                        let namesVeryClose = (simScore >= 2 && bNameNorm.length && nName.length && window.levenshtein(bNameNorm, nName) <= 3) || subsetMatch;
                        var priceTol = sameWords ? window.PRICE_TOLERANCE_NAME * 3 : (namesVeryClose ? window.PRICE_TOLERANCE_NAME * 2 : window.PRICE_TOLERANCE_NAME);
                        if ((!bDate || !nDate) && (sameWords || subsetMatch)) priceTol = Math.min(350, Math.max(150, Math.round(expPrice * 0.30)));
                        let dateTolDays = sameWords ? 5 : (namesVeryClose ? 3 : window.DATE_TOLERANCE_DAYS_NAME);
                        let priceHit = Math.abs(nPrice - expPrice) <= priceTol;
                        let dateHit = bDate && nDate && Math.abs((nDate - bDate)/864e5) <= dateTolDays;
                        let nameHit = subsetMatch || (simScore >= 2) || (simScore === 1 && window.singleWordMatchesFirstOrLast(bParts, nParts, 2)) || (simScore >= 1 && dateHit && priceHit && (simScore >= 2 || window.singleWordMatchesFirstOrLast(bParts, nParts, 2)));
                        if (nameHit && bParts.length === 2 && !window.nameSameWordsOrReversed(bParts, nParts, 2) && !window.twoWordMatchesFirstOrLastStrict(bParts, nParts)) nameHit = false;
                        let strongNameFL = bParts.length === 2 && window.twoWordMatchesFirstOrLastStrict(bParts, nParts) && simScore >= 2;
                        let priceHitWide = strongNameFL && Math.abs(nPrice - expPrice) <= Math.min(200, Math.max(80, Math.round(expPrice * 0.15)));
                        return (nameHit && (priceHit || dateHit)) || (strongNameFL && priceHitWide);
                    });
                    match = candidates.length ? candidates.sort((a, b) => {
                        let ap = window.getParts(window.normalize(a.n["إسم العميل"]||"")), bp = window.getParts(window.normalize(b.n["إسم العميل"]||""));
                        let aStrict = window.twoWordMatchesFirstOrLastStrict(bParts, ap);
                        let bStrict = window.twoWordMatchesFirstOrLastStrict(bParts, bp);
                        if (aStrict !== bStrict) return (bStrict ? 1 : 0) - (aStrict ? 1 : 0);
                        let aScore = window.nameMatchScore(bParts, ap, false);
                        let bScore = window.nameMatchScore(bParts, bp, false);
                        if (aScore !== bScore) return bScore - aScore;
                        let aFL = window.twoWordMatchesFirstOrLast(bParts, ap, 2);
                        let bFL = window.twoWordMatchesFirstOrLast(bParts, bp, 2);
                        return (bFL ? 1 : 0) - (aFL ? 1 : 0);
                    })[0] : null;
                    if(match) type = "name";
                }

                // حارس نهائي: لا نقبل "اسم" لأسماء من كلمتين إلا بتطابق صارم أول/آخر — تفادي Ali Alinur↔هدى الزبير، العالم حنان↔ali alinur، Saws Ka↔طه سمير رجب، مشبب البراء↔TAIEB Azlouk
                if (match && type === "name") {
                    let bPartsFinal = window.getParts(bName);
                    let nPartsFinal = window.getParts(window.normalize(match.n["إسم العميل"]||""));
                    if (bPartsFinal.length === 2 && !window.twoWordMatchesFirstOrLastStrict(bPartsFinal, nPartsFinal)) { match = null; type = null; }
                }
                if(match) {
                    processedBooking.add(idx); takenNazeel.add(match.i);
                    window.storeResult(b, match.n, type, s, tax);
                }
            });

            // 2.5 حجز واحد ↔ إقامتان نزيل (نفس الضيف، غرفتان مثل 303 + 304)
            booking.forEach((b, idx) => {
                if(processedBooking.has(idx)) return;
                const bName = window.normalize(b["اسم الضيف\\الضيوف"] || b["اسم الضيف"]);
                const bParts = window.getParts(bName);
                const expPrice = window.cleanPrice(b["السعر"]) * tax;
                const bDate = window.parseDate(b["تسجيل الوصول"]);
                let pool = nazeel.map((n,i)=>({n,i})).filter(x => !takenNazeel.has(x.i));
                let candidates = pool.filter(x => {
                    let nName = window.normalize(x.n["إسم العميل"]||"");
                    let nParts = window.getParts(nName);
                    let sim = window.nameMatchScore(bParts, nParts, false);
                    return (sim >= 2) || (bParts.length === 1 && sim === 1 && window.singleWordMatchesFirstOrLast(bParts, nParts, 2));
                });
                let match = null;
                for(let i = 0; i < candidates.length; i++) {
                    for(let j = i + 1; j < candidates.length; j++) {
                        let p1 = window.cleanPrice(candidates[i].n["الايجار الكلي"]||candidates[i].n["الاجمالي"]);
                        let p2 = window.cleanPrice(candidates[j].n["الايجار الكلي"]||candidates[j].n["الاجمالي"]);
                        let sumOk = Math.abs(p1 + p2 - expPrice) <= window.PRICE_TOLERANCE_NAME;
                        let d1 = window.parseDate(candidates[i].n["تاريخ الدخول"]);
                        let d2 = window.parseDate(candidates[j].n["تاريخ الدخول"]);
                        let dateOk = !bDate || (d1 && Math.abs((d1 - bDate)/864e5) <= window.DATE_TOLERANCE_DAYS_NAME) || (d2 && Math.abs((d2 - bDate)/864e5) <= window.DATE_TOLERANCE_DAYS_NAME);
                        if(sumOk && dateOk) {
                            match = { rows: [candidates[i], candidates[j]], totalPrice: p1 + p2 };
                            break;
                        }
                    }
                    if(match) break;
                }
                if(match) {
                    match.rows.forEach(r => takenNazeel.add(r.i));
                    processedBooking.add(idx);
                    window.storeResult(b, match.rows[0].n, "multi", s, tax, false, match.totalPrice);
                }
            });

            // V18.0: 3. Behavioral Extension Check
            booking.forEach((b, idx) => {
                if(processedBooking.has(idx)) return;
                
                const bPrice = window.cleanPrice(b["السعر"]);
                const expPrice = bPrice * tax;
                const bDate = window.parseDate(b["تسجيل الوصول"]);
                const bOutDate = window.parseDate(b["تاريخ المغادرة"]);

                let pool = nazeel.map((n,i)=>({n,i})).filter(x => !takenNazeel.has(x.i));

                let match = pool.find(x => {
                    let nPrice = window.cleanPrice(x.n["الايجار الكلي"]||x.n["الاجمالي"]);
                    let nDate = window.parseDate(x.n["تاريخ الدخول"]);
                    let nOutDate = window.parseDate(x.n["تاريخ الخروج"]);
                    
                    if(!bDate || !nDate || !bOutDate || !nOutDate) return false;

                    let dateMatch = Math.abs((nDate - bDate)/864e5) <= window.DATE_TOLERANCE_DAYS_EXT;
                    let extensionHit = (nOutDate > bOutDate);
                    let priceMatch = Math.abs(nPrice - expPrice) < window.PRICE_TOLERANCE_EXT; 

                    return dateMatch && extensionHit && priceMatch;
                });

                if(match) {
                    processedBooking.add(idx); takenNazeel.add(match.i);
                    window.storeResult(b, match.n, "extension", s, tax);
                }
            });
            
            // 4. ORPHAN SCAVENGER (Price/Date Guess) — مع شرط تداخل اسمي بسيط لتفادي ربط خاطئ (مثلاً Osama مع سلطان)
            booking.forEach((b, idx) => {
                if(processedBooking.has(idx)) return; 

                const bName = window.normalize(b["اسم الضيف\\الضيوف"] || b["اسم الضيف"]);
                const bParts = window.getParts(bName);
                const bPrice = window.cleanPrice(b["السعر"]);
                const expPrice = bPrice * tax;
                const bDate = window.parseDate(b["تسجيل الوصول"]);

                let pool = nazeel.map((n,i)=>({n,i})).filter(x => !takenNazeel.has(x.i));
                
                let match = pool.find(x => {
                    let nPrice = window.cleanPrice(x.n["الايجار الكلي"]||x.n["الاجمالي"]);
                    let nDate = window.parseDate(x.n["تاريخ الدخول"]);
                    if(!bDate || !nDate) return false;

                    var nName = window.normalize(x.n["إسم العميل"]||"");
                    var nParts = window.getParts(nName);
                    var nameOverlap = window.guessNameOverlap(bParts, nParts);
                    var subsetMatch = window.nameSubsetMatch(bParts, nParts, 2);
                    var sameWords = window.nameSameWordsOrReversed(bParts, nParts, 2);
                    var reversedOnly = window.nameFirstLastReversed(bParts, nParts, 2);
                    var tolDays = sameWords ? 7 : (subsetMatch ? 4 : window.DATE_TOLERANCE_DAYS_GUESS);
                    var tolPrice = sameWords ? 35 : (subsetMatch ? window.PRICE_TOLERANCE_GUESS * 2 : window.PRICE_TOLERANCE_GUESS);
                    let dateMatch = Math.abs((nDate - bDate)/864e5) <= tolDays;
                    let priceMatch = Math.abs(nPrice - expPrice) <= tolPrice;
                    if(!dateMatch || !priceMatch) return false;
                    if (bParts.length === 1 && nameOverlap && !window.singleWordMatchesFirstOrLast(bParts, nParts, 3)) return false;
                    if (bParts.length >= 2 && !window.nameSameWordsOrReversed(bParts, nParts, 2) && !window.twoWordMatchesFirstOrLastStrict(bParts, nParts)) return false;
                    return dateMatch && priceMatch && nameOverlap;
                });

                if(match) {
                    processedBooking.add(idx); takenNazeel.add(match.i);
                    window.storeResult(b, match.n, "guess", s, tax);
                } else {
                    match = pool.find(x => {
                        let nParts = window.getParts(window.normalize(x.n["إسم العميل"]||""));
                        if (bParts.length >= 2 && !window.nameSameWordsOrReversed(bParts, nParts, 2) && !window.twoWordMatchesFirstOrLastStrict(bParts, nParts)) return false;
                        if (bParts.length === 1 && (window.nameMatchScore(bParts, nParts, false) < 1 || !window.singleWordMatchesFirstOrLast(bParts, nParts, 2))) return false;
                        let nPrice = window.cleanPrice(x.n["الايجار الكلي"]||x.n["الاجمالي"]);
                        let nDate = window.parseDate(x.n["تاريخ الدخول"]);
                        if (!bDate || !nDate) return false;
                        return Math.abs((nDate - bDate)/864e5) <= 7 && Math.abs(nPrice - expPrice) <= 45;
                    });
                    if (match) {
                        processedBooking.add(idx); takenNazeel.add(match.i);
                        window.storeResult(b, match.n, "guess", s, tax);
                    }
                }
                if (!match && bParts.length === 2) {
                    match = pool.find(x => {
                        let nName = window.normalize(x.n["إسم العميل"]||"");
                        let nParts = window.getParts(nName);
                        if (nParts.length !== 2 || !window.nameFirstLastReversedStrict(bParts, nParts)) return false;
                        let nPrice = window.cleanPrice(x.n["الايجار الكلي"]||x.n["الاجمالي"]);
                        let nDate = window.parseDate(x.n["تاريخ الدخول"]);
                        let tolPrice = 45;
                        if (!bDate || !nDate) tolPrice = Math.min(350, Math.max(150, Math.round(expPrice * 0.30)));
                        let priceMatch = Math.abs(nPrice - expPrice) <= tolPrice;
                        if (bDate && nDate) {
                            let dateMatch = Math.abs((nDate - bDate)/864e5) <= 7;
                            return dateMatch && priceMatch;
                        }
                        return priceMatch;
                    });
                    if (match) {
                        processedBooking.add(idx); takenNazeel.add(match.i);
                        window.storeResult(b, match.n, "reversed", s, tax);
                    }
                }
                if (!match) {
                    // ربما مطابق: لأسماء من كلمتين فقط تطابق صارم أول/آخر أو نفس كلمات/عكس بتسامح 1 — تفادي اقتراحات خاطئة
                    let candidates = pool.filter(x => {
                        let nParts = window.getParts(window.normalize(x.n["إسم العميل"]||""));
                        let score = window.nameMatchScore(bParts, nParts, false);
                        if (bParts.length === 2) return window.twoWordMatchesFirstOrLastStrict(bParts, nParts) || window.nameSameWordsOrReversed(bParts, nParts, 1);
                        return window.twoWordMatchesFirstOrLastStrict(bParts, nParts) || window.nameSameWordsOrReversed(bParts, nParts, 2) || window.nameSubsetMatch(bParts, nParts, 2) || score >= 2 || (bParts.length === 1 && score >= 1 && window.singleWordMatchesFirstOrLast(bParts, nParts, 2));
                    });
                    let suggested = candidates.length ? candidates.sort(function(a, b) {
                        let ap = window.getParts(window.normalize(a.n["إسم العميل"]||"")), bp = window.getParts(window.normalize(b.n["إسم العميل"]||""));
                        let aStrict = window.twoWordMatchesFirstOrLastStrict(bParts, ap);
                        let bStrict = window.twoWordMatchesFirstOrLastStrict(bParts, bp);
                        if (aStrict !== bStrict) return bStrict ? 1 : -1;
                        let aSame = window.nameSameWordsOrReversed(bParts, ap, 2);
                        let bSame = window.nameSameWordsOrReversed(bParts, bp, 2);
                        if (aSame !== bSame) return bSame ? 1 : -1;
                        let aSub = window.nameSubsetMatch(bParts, ap, 2) || window.nameSubsetMatch(ap, bParts, 2);
                        let bSub = window.nameSubsetMatch(bParts, bp, 2) || window.nameSubsetMatch(bp, bParts, 2);
                        if (aSub !== bSub) return bSub ? 1 : -1;
                        return window.nameMatchScore(bParts, bp, false) - window.nameMatchScore(bParts, ap, false);
                    })[0] : null;
                    let autoGuess = false;
                    if (bParts.length >= 2 && suggested && window.twoWordMatchesFirstOrLastStrict(bParts, window.getParts(window.normalize(suggested.n["إسم العميل"]||"")))) {
                        let nPrice = window.cleanPrice(suggested.n["الايجار الكلي"]||suggested.n["الاجمالي"]);
                        if (Math.abs(nPrice - expPrice) <= Math.min(250, Math.max(80, Math.round(expPrice * 0.28))) && candidates.filter(x => window.twoWordMatchesFirstOrLastStrict(bParts, window.getParts(window.normalize(x.n["إسم العميل"]||"")))).length === 1) {
                            autoGuess = true; processedBooking.add(idx); takenNazeel.add(suggested.i); window.storeResult(b, suggested.n, "guess", s, tax);
                        }
                    }
                    // لأسماء من كلمتين: لا نعرض "ربما مطابق" إلا إذا المرشح يمر بتطابق صارم أول/آخر — تفادي مشبب البراء → TAIEB Azlouk
                    if (bParts.length === 2 && suggested && !window.twoWordMatchesFirstOrLastStrict(bParts, window.getParts(window.normalize(suggested.n["إسم العميل"]||"")))) suggested = null;
                    if (!autoGuess) {
                        let suggestedMatch = suggested ? { nName: suggested.n["إسم العميل"], nPrice: window.cleanPrice(suggested.n["الايجار الكلي"]||suggested.n["الاجمالي"]), nDate: window.parseDate(suggested.n["تاريخ الدخول"]) } : null;
                        window.storeResult(b, null, "miss", s, tax, false, undefined, suggestedMatch);
                    }
                }
            });

            // ═══ Stage 5: AI Matching (Gemini) for remaining misses ═══
            if (typeof window.callAI === 'function') {
                let missRows = [];
                window.allRowsData.forEach(function(r, i) { if (r.type === 'miss' && r.isOk) missRows.push({row: r, idx: i}); });
                let remainingPool = nazeel.map(function(n, i) { return {n:n, i:i}; }).filter(function(x) { return !takenNazeel.has(x.i); });
                for (let mc = 0; mc < missRows.length; mc++) {
                    if (remainingPool.length === 0) break;
                    let mr = missRows[mc];
                    if (window.setLoaderProgress) window.setLoaderProgress(82 + Math.round((mc/missRows.length)*13), '\u062A\u062D\u0644\u064A\u0644 AI: ' + (mr.row.bName||''));
                    let pool = remainingPool.slice(0, 30).map(function(x) { return String(x.n["\u0625\u0633\u0645 \u0627\u0644\u0639\u0645\u064A\u0644"]||""); }).filter(Boolean);
                    if (pool.length === 0) break;
                    let aiRes = await window.callAI(mr.row.bName, pool);
                    if (aiRes && aiRes.match && aiRes.name) {
                        let mIdx = remainingPool.findIndex(function(x) { return String(x.n["\u0625\u0633\u0645 \u0627\u0644\u0639\u0645\u064A\u0644"]||"") === aiRes.name; });
                        if (mIdx !== -1) {
                            let matched = remainingPool[mIdx];
                            takenNazeel.add(matched.i);
                            remainingPool.splice(mIdx, 1);
                            mr.row.type = 'ai'; mr.row.n = matched.n;
                            mr.row.nPrice = window.cleanPrice(matched.n["\u0627\u0644\u0627\u064A\u062C\u0627\u0631 \u0627\u0644\u0643\u0644\u064A"]||matched.n["\u0627\u0644\u0627\u062C\u0645\u0627\u0644\u064A"]);
                            s.miss--; s.match++;
                            s.revB += mr.row.bPrice; s.revN += mr.row.nPrice;
                        }
                    }
                }
            }

            await window.applyManuals(s);
            window.updateStats(s, sub);
            window.renderTable();
            if (window.location.search && window.location.search.indexOf('diagnose=1') !== -1 && typeof runDiagnosticReport === 'function') runDiagnosticReport();
        };

        window.storeResult = function(b, n, type, s, tax, isGroupHead, totalNazeelPrice, suggestedMatch) {
            let bName = b["اسم الضيف\\الضيوف"] || b["اسم الضيف"] || b["تم الحجز من قِبل"];
            let status = String(b["الحالة"]||"").toLowerCase();
            let isOk = status.includes("ok");
            let bPriceNet = window.cleanPrice(b["السعر"]);
            let bPrice = bPriceNet * tax;
            let nPrice = totalNazeelPrice || (n ? window.cleanPrice(n["الايجار الكلي"]||n["الاجمالي"]) : 0);
            
            if(type !== "miss") {
                if(!isOk) { s.recover++; type="conflict"; }
                else {
                    if(type==="ref"||type==="name"||type==="reversed"||type==="alias"||type==="multi") s.match++;
                    if(type==="money"||type==="guess"||type==="extension") s.money++;
                    if(type==="group") s.group++;
                }
                s.revB += bPrice;
                if(type !== "group" || isGroupHead) s.revN += nPrice; 
            } else { if(isOk) s.miss++; }

            let row = {
                b: b, n: n, type: type, bName: bName, status: status, isOk: isOk,
                bPrice: bPrice, nPrice: nPrice, bPriceNet: bPriceNet, tax: tax,
                timestamp: window.parseDate(b["تسجيل الوصول"]) || 0
            };
            if (type === "group") row.isGroupHead = !!isGroupHead;
            if (type === "miss" && suggestedMatch) row.suggestedMatch = suggestedMatch;
            window.allRowsData.push(row);
        };

        window.renderTable = function() {
            const mainTable = document.getElementById("mainTable");
            const tbody = mainTable ? mainTable.querySelector('tbody') : null;
            if(!tbody) return;
            tbody.innerHTML = "";
            const taxValEl = document.getElementById('taxVal');
            const muniValEl = document.getElementById('muniVal');
            const taxMultiplier = 1 + (parseFloat(taxValEl && taxValEl.value ? taxValEl.value : 0) / 100) + (parseFloat(muniValEl && muniValEl.value ? muniValEl.value : 0) / 100);

            if(!mainTable.getAttribute("data-sort-col")) {
                window.allRowsData.sort((a, b) => b.timestamp - a.timestamp);
            }

            // فلترة الصفوف أولاً
            const searchInputEl = document.getElementById('searchInput');
            const searchTerm = (searchInputEl && searchInputEl.value) ? searchInputEl.value.toLowerCase() : '';
            let filtered = (window.allRowsData || []).filter(function(row) {
                let filters = (window.currentFilter || 'all').split(',');
                if(window.currentFilter !== 'all' && !filters.includes(row.type)) return false;
                if (window.statusFilter === 'confirmed' && !row.isOk) return false;
                if (window.statusFilter === 'cancelled' && row.isOk) return false;
                let term = searchTerm;
                if(term && !String(row.bName || '').toLowerCase().includes(term)) return false;
                return true;
            });

            // تجميع حسب رقم الحجز: صف واحد لكل حجز، أسماء النزلاء مدمجة (تفادي تكرار الشمراني، بدر، عائشة لنفس الحجز)
            let displayRows = [];
            let refGroups = {};
            filtered.forEach(function(row, i) {
                let ref = String(row.b["رقم الحجز"] || "").trim();
                let key = ref ? ref : ("_u_" + i);
                if(!refGroups[key]) refGroups[key] = [];
                refGroups[key].push(row);
            });
            Object.keys(refGroups).forEach(function(key) {
                let group = refGroups[key];
                let rep = group.find(function(r) { return r.n != null; }) || group[0];
                let sm = group.find(function(r) { return r.suggestedMatch; });
                let suggestedMatch = (rep.type === "miss" && rep.suggestedMatch) ? rep.suggestedMatch : (sm ? sm.suggestedMatch : null);
                let combinedNames = group.map(function(r) { return r.bName; }).join(" ، ");
                let guestCount = group.length;
                let displayRow = {
                    b: rep.b, n: rep.n, type: rep.type, status: rep.status, isOk: rep.isOk,
                    bPrice: rep.bPrice, nPrice: rep.nPrice, bPriceNet: rep.bPriceNet, tax: rep.tax,
                    timestamp: rep.timestamp,
                    bName: combinedNames,
                    bNameForMerge: group[0].bName,
                    guestCount: guestCount,
                    isGroupHead: rep.isGroupHead
                };
                if (rep.type === "group" && !rep.n) {
                    let groupHead = filtered.find(function(r) { return r.type === "group" && r.n && window.normalize(r.bName) === window.normalize(rep.bName); });
                    if (groupHead) displayRow.groupTotalNazeel = groupHead.nPrice;
                }
                if (rep.type === "group" && rep.n) {
                    let sameName = filtered.filter(function(r) { return r.type === "group" && window.normalize(r.bName) === window.normalize(rep.bName); });
                    displayRow.groupBookingPrices = sameName.map(function(r) { return r.bPrice; });
                }
                if (suggestedMatch) displayRow.suggestedMatch = suggestedMatch;
                if (rep.amountVerified) displayRow.amountVerified = true;
                displayRows.push(displayRow);
            });

            displayRows.forEach(function(row, idx) {
                let tr = document.createElement('tr');
                tr.dataset.type = row.type;
                let isGroupSub = row.type === "group" && !row.n;
                if (isGroupSub) tr.classList.add("row-group-sub");

                let tag = "";
                if(row.type==="ref") tag=`<span class="match-tag mt-ok">🆔 مرجع</span>`;
                else if(row.type==="name") tag=`<span class="match-tag mt-ok">✨ اسم</span>`;
                else if(row.type==="reversed") tag=`<span class="match-tag mt-ok" title="عكس الاسم (أول↔ثاني)">✨ اسم (عكس)</span>`;
                else if(row.type==="ai") tag=`<span class="match-tag mt-ok" style="background:#e8eaf6;color:#5c6bc0;border:1px solid #9fa8da;">🤖 AI</span>`;
                else if(row.type==="alias") tag=`<span class="match-tag mt-alias">🧠 ذاكرة</span>`;
                else if(row.type==="money") tag=`<span class="match-tag mt-warn">💰 بصمة</span>`;
                else if(row.type==="guess") tag=`<span class="match-tag mt-guess">🧩 تخمين ذكي</span>`;
                else if(row.type==="extension") tag=`<span class="match-tag mt-ext">🟡 تمديد إقامة</span>`;
                else if(row.type==="group") tag=`<span class="match-tag mt-grp">🔗 تجميع</span>${row.amountVerified ? ' <span class="match-tag mt-ok" style="font-size:0.65rem" title="مجموع نزيل قريب جداً من بوكينج — تأكيد بالمبلغ">✓ تأكيد بالمبلغ</span>' : ''}`;
                else if(row.type==="multi") tag=`<span class="match-tag mt-grp" title="حجز واحد → إقامتان نزيل (غرفتان)">🛏️ غرفتان</span>${row.amountVerified ? ' <span class="match-tag mt-ok" style="font-size:0.65rem" title="مجموع نزيل قريب جداً من بوكينج — تأكيد بالمبلغ">✓ تأكيد بالمبلغ</span>' : ''}`;
                else if(row.type==="conflict") tag=`<span class="match-tag mt-err">⚠️ تسكين</span>`;
                else tag=`<span class="match-tag mt-miss">❌ مفقود</span>`;

                let suggestedHint = "";
                if (row.type === "miss" && row.suggestedMatch && row.suggestedMatch.nName) {
                    var sn = String(row.suggestedMatch.nName);
                    var sp = row.suggestedMatch.nPrice != null ? " — " + Number(row.suggestedMatch.nPrice).toFixed(0) + " ر.س" : "";
                    suggestedHint = "<div class=\"suggested-hint\" title=\"ربما نفس الضيف في نزيل بتهجئة قريبة — راجع يدوياً\">ربما مطابق: " + sn + sp + " — راجع يدوياً</div>";
                }

                let guestBadge = row.guestCount > 1 ? ` <span class="guest-badge" title="عدد الضيوف في نفس الحجز">(${row.guestCount} ضيوف)</span>` : "";

                let stHtml = row.isOk ? `<span class="st-ok">مؤكد</span>` : `<span class="st-no">ملغي</span>`;
                let bDate = window.toENDateStr(window.parseDate(row.b["تسجيل الوصول"]));
                let bOut = window.toENDateStr(window.parseDate(row.b["تاريخ المغادرة"]));
                let nDate = row.n ? window.toENDateStr(window.parseDate(row.n["تاريخ الدخول"])) : "-";
                let nOut = row.n ? window.toENDateStr(window.parseDate(row.n["تاريخ الخروج"])) : "-";
                let mergeAttr = row.type==="miss" ? " data-b-name=\"" + String(row.bNameForMerge||row.bName).replace(/&/g,"&amp;").replace(/"/g,"&quot;") + "\"" : "";
                let act = (row.type==="miss") ? suggestedHint + "<br><button class=\"btn-mini bm-merge\"" + mergeAttr + " onclick=\"markMerged(this, this.getAttribute('data-b-name'))\">دمج يدوي</button>" : "";

                let diff = row.n ? (row.nPrice - row.bPrice) : 0;
                let diffHtml = row.n ? (Math.abs(diff)<5 ? `<span class="diff-zero">0</span>` : `<span class="${diff>0?'diff-pos':'diff-neg'}">${diff.toFixed(0)}</span>`) : "-";
                
                let diffDiag = "";
                if(row.n && row.type !== 'conflict' && row.type !== 'miss') {
                     diffDiag = `<div class="diff-diag">(${window.getDiffDiagnosis(diff, row.bPriceNet, taxMultiplier)})</div>`;
                }

                let rowNumCell = (isGroupSub ? '<span class="group-sub-arrow" title="صف فرعي ضمن التجميع">↳</span> ' : '') + (idx+1);
                let nPriceCell = '-';
                if (row.n && row.nPrice != null) {
                    if (row.type === "group" && row.groupBookingPrices && row.groupBookingPrices.length) {
                        nPriceCell = '<span class="price-val">' + row.nPrice.toFixed(0) + '</span><div class="group-split">' + row.groupBookingPrices.map(function(p){ return p.toFixed(0); }).join(' + ') + '</div>';
                    } else {
                        nPriceCell = '<span class="price-val">' + row.nPrice.toFixed(0) + '</span>';
                    }
                } else if (isGroupSub && row.bPrice != null) {
                    nPriceCell = '<span class="price-val">' + row.bPrice.toFixed(0) + '</span> <span class="avail-in-group" title="المبلغ مضمن في مجموع نزيل أعلاه">متاح ضمن المجموع</span>';
                }

                tr.innerHTML = `
                    <td class="col-seq">${rowNumCell}</td>
                    <td><div class="b-name">${row.bName}${guestBadge}</div><div class="b-ref">${row.b["رقم الحجز"]||""}</div></td>
                    <td>${stHtml}</td>
                    <td>${row.n ? row.n["إسم العميل"] : "-"}</td>
                    <td>${tag}${act}</td>
                    <td><span class="price-val">${row.bPrice.toFixed(0)}</span></td>
                    <td>${nPriceCell}</td>
                    <td>${diffHtml}${diffDiag}</td>
                    <td>
                        <div class="d-box">
                            <div class="d-line d-line-b"><span class="d-dot dot-b"></span><span class="d-label txt-b">بوكينج</span><span class="d-dates txt-b">من ${bDate} إلى ${bOut}</span></div>
                            <div class="d-line d-line-n"><span class="d-dot dot-n"></span><span class="d-label txt-n">نزيل</span><span class="d-dates txt-n">من ${nDate} إلى ${nOut}</span></div>
                        </div>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        };

        window.updateStats = function(s, sub) {
            let combinedMatch = s.match + s.group;
            let combinedMoney = s.money;

            window.safeSet('kpiBook', s.book); window.safeSet('kpiOk', combinedMatch);
            window.safeSet('kpiGroup', s.group); window.safeSet('kpiMoney', combinedMoney);
            window.safeSet('kpiRecover', s.recover);
            window.safeSet('kpiMiss', s.miss);
            window.safeSet('kpiRevB', s.revB.toLocaleString()); window.safeSet('kpiRevN', s.revN.toLocaleString());
            window.safeSet('kpiDiff', (s.revN - s.revB).toLocaleString());
            window.safeSet('subOk', sub.ok); window.safeSet('subCan', sub.can); window.safeSet('subNos', sub.nos);
            window.lastStats = { s: s, sub: sub };
        };

        // متغير لتخزين فلتر الحالة
        window.statusFilter = null;

        window.setFilter = function(type, btn) {
            document.querySelectorAll('.pill').forEach(b => b.classList.remove('active'));
            if(btn) btn.classList.add('active');
            window.currentFilter = type;
            window.statusFilter = null; // إعادة تعيين فلتر الحالة عند استخدام الفلاتر العادية
            window.renderTable();
        };

        window.setStatusFilter = function(status, btn) {
            document.querySelectorAll('.pill').forEach(b => b.classList.remove('active'));
            if(btn) btn.classList.add('active');
            window.statusFilter = status; // حفظ فلتر الحالة
            window.currentFilter = 'all'; // إعادة تعيين الفلتر العادي
            window.renderTable();
        };

        window.filterTable = function() { window.renderTable(); };

        window.sortTable = function(n) {
            let table = document.getElementById("mainTable");
            let dir = table.getAttribute("data-sort-dir") === "asc" ? "desc" : "asc";
            table.setAttribute("data-sort-dir", dir);
            table.setAttribute("data-sort-col", n);

            window.allRowsData.sort((a, b) => {
                let valA, valB;
                switch(n) {
                    case 0: return (dir === 'asc') ? 1 : -1; 
                    case 1: valA = a.bName; valB = b.bName; break;
                    case 2: valA = a.status; valB = b.status; break;
                    case 3: valA = a.n ? a.n["إسم العميل"] : ""; valB = b.n ? b.n["إسم العميل"] : ""; break;
                    case 4: valA = a.type; valB = b.type; break;
                    case 5: valA = a.bPrice; valB = b.bPrice; break;
                    case 6: valA = a.nPrice; valB = b.nPrice; break;
                    case 7: valA = (a.nPrice - a.bPrice); valB = (b.nPrice - b.bPrice); break;
                    case 8: valA = a.timestamp; valB = b.timestamp; break;
                }
                if (typeof valA === 'string') { return dir === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA); }
                else { return dir === 'asc' ? valA - valB : valB - valA; }
            });
            window.renderTable();
        };

        window.markMerged = function(btn, bName) {
            let tr = btn.closest('tr');
            let nNameEl = tr.querySelector('td:nth-child(4)');
            let nName = prompt(`أدخل اسم العميل في نزيل (مطابق لـ ${bName}):`, nNameEl.innerText.trim());
            
            if (nName && nName.trim() !== '-' && nName.trim() !== '') {
                window.saveAlias(bName, nName);

                let rowData = window.allRowsData.find(r => r.bName === bName && r.type === 'miss');
                if(rowData) {
                    rowData.type = 'alias';
                    
                    let matchN = window.cachedN.find(n => window.normalize(n["إسم العميل"]) === window.normalize(nName));
                    if(matchN) {
                        rowData.n = matchN;
                        rowData.nPrice = window.cleanPrice(matchN["الايجار الكلي"]||matchN["الاجمالي"]);
                        let el = document.getElementById('kpiRevB');
                        let elN = document.getElementById('kpiRevN');
                        if(el) el.innerText = (parseFloat(el.innerText.replace(/,/g,'')) + rowData.bPrice).toLocaleString();
                        if(elN) elN.innerText = (parseFloat(elN.innerText.replace(/,/g,'')) + rowData.nPrice).toLocaleString();
                    }

                    const kpiOk = document.getElementById('kpiOk'); 
                    if(kpiOk) kpiOk.textContent = parseInt(kpiOk.textContent) + 1;
                    window.renderTable(); 
                }
            }
        };

        window.applyManuals = async function(s) {
            // This function is now mostly redundant as the 'alias' check is done inside the main process loop using getAlias.
        };

        window.exportExcel = function() {
            const wb = XLSX.utils.book_new();
            var st = window.lastStats;
            if (st && st.s) {
                var s = st.s, sub = st.sub;
                var revB = typeof s.revB === 'number' ? s.revB : 0;
                var revN = typeof s.revN === 'number' ? s.revN : 0;
                var diff = revN - revB;
                var dateStr = new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
                var summaryData = [
                    ["تقرير مطابقة الحجوزات — مراجعة عمولة بوكينج"],
                    ["تاريخ التقرير:", dateStr],
                    [],
                    ["أ) ملخص الحجوزات", ""],
                    ["إجمالي الحجوزات (فريد)", s.book || 0],
                    ["مؤكد", sub.ok || 0],
                    ["ملغي", sub.can || 0],
                    ["NoShow (في الملف)", sub.nos || 0],
                    ["مطابق (مرجع / اسم / ذاكرة)", s.match || 0],
                    ["تجميع / غرفتان", s.group || 0],
                    ["بصمة / تمديد", s.money || 0],
                    ["تسكين (إلغاء)", s.recover || 0],
                    ["لم يحضر (لا عمولة)", s.miss || 0],
                    [],
                    ["ب) الملخص المالي", ""],
                    ["إيراد بوكينج (المطابق)", revB],
                    ["إيراد نزيل (المطابق)", revN],
                    ["الفرق (نزيل − بوكينج)", diff],
                ];
                var wsSummary = XLSX.utils.aoa_to_sheet(summaryData);
                XLSX.utils.book_append_sheet(wb, wsSummary, "ملخص");
            }
            var wsDetail = XLSX.utils.table_to_sheet(document.getElementById('mainTable'));
            XLSX.utils.book_append_sheet(wb, wsDetail, "التفاصيل");
            XLSX.writeFile(wb, "Adora_Report.xlsx");
        };

        // اختبار منطق المطابقة (لم يحضر) — يظهر عند فتح الصفحة مع ?test=1
        if (typeof window.location !== 'undefined' && window.location.search && window.location.search.indexOf('test=1') !== -1) {
            setTimeout(function runMatchTests() {
                if (typeof window.getParts !== 'function' || typeof window.nameMatchScore !== 'function') return;
                var tests = [
                    { b: 'علي ابراهيم الضوي عابد', n: 'علي ابراهيم عابد' },
                    { b: 'Hebatalla Elsaey', n: 'هبه محمود الساعي' },
                    { b: 'صالح السلمي', n: 'صالح دخيل ربه سلطان السلمي' },
                    { b: 'مشبب البراء', n: 'البراء مشبب' },
                    { b: 'Saws Ka', n: 'Sawsen Kalboussi' },
                    { b: 'Saws Ka', n: 'عبدالله سعد عبدالله الغامدي' }
                ];
                var out = [];
                tests.forEach(function(t, i) {
                    var bParts = window.getParts(window.normalize(t.b));
                    var nParts = window.getParts(window.normalize(t.n));
                    var score = window.nameMatchScore(bParts, nParts, false);
                    var sub = window.nameSubsetMatch(bParts, nParts, 2);
                    var same = window.nameSameWords(bParts, nParts, 2);
                    var firstLast = bParts.length === 1 && window.singleWordMatchesFirstOrLast(bParts, nParts, 2);
                    var ok = score >= 2 || sub || same || (score === 1 && firstLast);
                    out.push((i + 1) + '. ' + t.b + ' ↔ ' + t.n);
                    out.push('   score=' + score + ' subset=' + sub + ' sameWords=' + same + ' firstLast=' + firstLast + ' → ' + (ok ? '✅ يُقبل' : '❌ مرفوض'));
                });
                var existing = document.getElementById('match-test-results');
                if (existing) existing.remove();
                var div = document.createElement('div');
                div.id = 'match-test-results';
                div.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#022A3A;color:#fff;padding:24px;border-radius:16px;z-index:99999;max-width:95%;max-height:90vh;overflow:auto;font-family:Tajawal;direction:rtl;text-align:right;border:2px solid #2CB1E1;';
                div.innerHTML = '<h2 style="margin:0 0 16px;">🔬 اختبار منطق المطابقة (لم يحضر)</h2><pre style="margin:0;white-space:pre-wrap;font-size:0.9rem;">' + out.join('\n') + '</pre><p style="margin:12px 0 0;font-size:0.8rem;color:rgba(255,255,255,0.7);">يفترض أن الحالات 1–5 تُقبل والحالة 6 (Saws ↔ عبدالله سعد) مرفوضة.</p><button onclick="this.closest(\'#match-test-results\').remove()" style="margin-top:12px;padding:8px 16px;background:#2CB1E1;border:none;border-radius:8px;color:#fff;cursor:pointer;">إغلاق</button>';
                document.body.appendChild(div);
            }, 1000);
        }
    }
}

window.BookingNazeelComparePage = BookingNazeelComparePage;
