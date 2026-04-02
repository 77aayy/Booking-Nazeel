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
<!-- XLSX يُحمّل من index.html -->
<style>
    :root {
        --bn-primary: #14b8a6;
        --bn-secondary: #0f172a;
        --bn-accent: #22d3ee;
        --bn-bg: #020617;
        --bn-card: rgba(255, 255, 255, 0.03);
        --bn-border: rgba(255, 255, 255, 0.1);
        --bn-grad: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%);
        --bn-grad-dark: radial-gradient(circle at center, #022d42 0%, #001219 100%);
        --bn-grad-warn: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
    }

    .booking-nazeel-page-wrapper {
        font-family: 'Tajawal', sans-serif;
        background: var(--bn-grad-dark);
        color: #f8fafc;
        min-height: 100vh;
        padding-bottom: 50px;
        position: relative;
    }

    /* ============================================================ 
       NEW: QUANTUM MATCHING DASHBOARD (PREMIUM UI)
       ============================================================ */
    .quantum-loader-overlay {
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: var(--bn-grad-dark);
        z-index: 10000; display: none; flex-direction: column; align-items: center; justify-content: center;
        backdrop-filter: blur(8px);
    }
    .quantum-core { position: relative; width: 260px; height: 260px; display: flex; align-items: center; justify-content: center; margin-bottom: 40px; }
    .q-ring { position: absolute; top: 0; left: 0; width: 100%; height: 100%; transform: rotate(-90deg); }
    .q-ring circle { fill: none; stroke-width: 8; stroke-linecap: round; transition: stroke-dashoffset 0.6s cubic-bezier(0.4, 0, 0.2, 1); }
    .q-ring .bg { stroke: rgba(255, 255, 255, 0.05); }
    .q-ring .progress { stroke: url(#q-grad); stroke-dasharray: 753; stroke-dashoffset: 753; filter: drop-shadow(0 0 12px var(--bn-primary)); }
    
    .q-center { position: absolute; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; z-index: 10; }
    .q-gem { font-size: 3.5rem; color: var(--bn-primary); filter: drop-shadow(0 0 15px var(--bn-primary)); animation: q-pulse 2s infinite ease-in-out; }
    .q-pct-text { font-size: 2.2rem; font-weight: 900; color: #fff; margin-top: 5px; font-variant-numeric: tabular-nums; }
    
    @keyframes q-pulse { 0% { transform: scale(1); opacity: 0.8; } 50% { transform: scale(1.1); opacity: 1; filter: drop-shadow(0 0 25px var(--bn-primary)); } 100% { transform: scale(1); opacity: 0.8; } }

    .q-dashboard { display: grid; grid-template-columns: repeat(3, 140px); gap: 20px; margin-top: 20px; animation: q-up 0.8s ease-out both; }
    .q-card { background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px); border-radius: 20px; padding: 15px; text-align: center; }
    .q-card i { font-size: 1.2rem; margin-bottom: 8px; display: block; }
    .q-match i { color: var(--bn-primary); } .q-miss i { color: #fb7185; } .q-time i { color: #fbbf24; }
    .q-val { font-size: 1.4rem; font-weight: 800; display: block; color: #fff; }
    .q-lbl { font-size: 0.7rem; color: rgba(255,255,255,0.6); font-weight: 700; }

    .q-live-feed { width: 400px; height: 100px; margin-top: 30px; overflow: hidden; position: relative; mask-image: linear-gradient(to bottom, transparent, black 20%, black 80%, transparent); }
    .q-feed-track { display: flex; flex-direction: column; gap: 10px; align-items: center; transition: transform 0.3s ease; }
    .q-feed-item { font-size: 0.85rem; color: var(--bn-primary); font-weight: 600; opacity: 0.7; animation: q-fade-in 0.5s ease-out; }
    .q-feed-item span { color: #fff; margin-right: 5px; }

    .q-phase-stepper { display: flex; gap: 30px; margin-top: 40px; }
    .q-phase { display: flex; align-items: center; gap: 8px; opacity: 0.3; transition: 0.3s; }
    .q-phase.active { opacity: 1; transform: scale(1.1); }
    .q-phase i { color: var(--bn-primary); }
    .q-phase span { font-size: 0.8rem; font-weight: 800; }

    /* ============================================================ 
       RESTORING ORIGINAL LAYOUT STYLES
       ============================================================ */
    .app-header {
        display: flex; justify-content: space-between; align-items: center;
        padding: 30px 40px; background: rgba(255,255,255,0.02);
        border-bottom: 1px solid var(--bn-border); margin-bottom: 30px;
    }
    .brand h1 { font-size: 1.8rem; font-weight: 900; background: var(--bn-grad); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .brand p { font-size: 0.9rem; letter-spacing: 3px; color: var(--bn-primary); opacity: 0.8; font-weight: 700; }

    .header-tools { display: flex; gap: 12px; }
    .btn-chic {
        background: rgba(255,255,255,0.05); border: 1px solid var(--bn-border);
        border-radius: 12px; padding: 10px 20px; color: #fff; font-size: 0.85rem;
        font-weight: 700; cursor: pointer; transition: 0.3s; display: flex; align-items: center; gap: 8px;
    }
    .btn-chic:hover { background: var(--bn-grad); border-color: transparent; transform: translateY(-2px); box-shadow: 0 5px 15px rgba(20,184,166,0.3); }
    .btn-chic i { font-size: 1rem; color: var(--bn-primary); }
    .btn-chic:hover i { color: #fff; }

    .hero-card {
        max-width: 900px; margin: 0 auto 40px; background: var(--bn-card);
        border: 1px solid var(--bn-border); border-radius: 30px; padding: 40px;
        box-shadow: 0 20px 50px rgba(0,0,0,0.3); backdrop-filter: blur(10px);
    }
    .drop-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; }
    .drop-zone {
        background: rgba(255,255,255,0.02); border: 2px dashed var(--bn-border);
        border-radius: 20px; padding: 40px 20px; text-align: center; cursor: pointer;
        transition: 0.3s; position: relative; overflow: hidden;
    }
    .drop-zone.file-loaded { border-color: #10b981; background: rgba(16, 185, 129, 0.05); border-style: solid; animation: q-pulse-success 1.5s ease-out; }
    .drop-zone.file-loaded i { color: #10b981 !important; transform: scale(1.1); }
    .drop-zone.file-loaded h3 { color: #10b981; }
    
    @keyframes q-pulse-success {
        0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
        70% { box-shadow: 0 0 0 15px rgba(16, 185, 129, 0); }
        100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
    }

    .upload-progress { position: absolute; bottom: 0; left: 0; height: 4px; background: var(--bn-primary); width: 0; transition: 0.2s; }
    .drop-zone h3 span.file-name { display: block; font-size: 0.8rem; color: #14b8a6; margin-top: 5px; opacity: 0.9; }

    .control-panel { max-width: 900px; margin: 0 auto 20px; display: flex; justify-content: center; }
    .tax-settings { display: flex; align-items: center; gap: 20px; background: var(--bn-card); padding: 10px 25px; border-radius: 50px; border: 1px solid var(--bn-border); }
    .tax-item { font-size: 0.85rem; font-weight: 700; color: rgba(255,255,255,0.7); }
    .tax-inp { background: transparent; border: none; border-bottom: 2px solid var(--bn-primary); color: #fff; width: 50px; text-align: center; font-weight: 800; font-size: 1rem; outline: none; }
    .btn-recalc {
        background: var(--bn-primary); border: none; border-radius: 50px;
        color: #fff; padding: 5px 20px; font-weight: 700; cursor: pointer;
        font-size: 0.8rem; margin-left: 10px; transition: 0.3s;
    }
    .btn-recalc:hover { transform: scale(1.05); filter: brightness(1.1); }

    .dashboard {
        max-width: 1400px; margin: 0 auto 20px; display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 15px; padding: 0 20px; justify-content: center;
    }
    .kpi-card {
        background: rgba(255, 255, 255, 0.05); border: 1px solid var(--bn-border);
        border-radius: 12px; padding: 10px 15px; transition: 0.3s;
        display: flex; flex-direction: row; align-items: center; gap: 12px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2); height: 70px;
    }
    .kpi-card:hover { transform: translateY(-2px); border-color: var(--bn-primary); box-shadow: 0 8px 20px rgba(20,184,166,0.15); }
    .kpi-info { display: flex; flex-direction: column; justify-content: center; text-align: right; flex: 1; }
    .kpi-icon { width: 34px; height: 34px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 1rem; flex-shrink: 0; }
    .k-blue .kpi-icon { background: rgba(37,99,235,0.15); color: #3b82f6; }
    .k-green .kpi-icon { background: rgba(16,185,129,0.15); color: #10b981; }
    .k-purple .kpi-icon { background: rgba(139,92,246,0.15); color: #8b5cf6; }
    .k-gold .kpi-icon { background: rgba(245,158,11,0.15); color: #f59e0b; }
    .k-red .kpi-icon { background: rgba(239, 68, 68, 0.15); color: #ef4444; }
    .kpi-num { font-size: 1.25rem; font-weight: 900; color: #fff; display: block; line-height: 1.1; }
    .kpi-lbl { font-size: 0.6rem; font-weight: 800; color: rgba(255,255,255,0.6); text-transform: uppercase; margin-top: 2px; }
    .sub-stats { font-size: 0.6rem; gap: 8px; margin-top: 4px; display: flex; align-items: center; }

    .filter-pills { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 25px; justify-content: center; padding: 0 20px; }
    .pill {
        padding: 8px 18px; border-radius: 50px; background: rgba(255,255,255,0.05);
        border: 1px solid var(--bn-border); font-size: 0.85rem; font-weight: 700;
        cursor: pointer; transition: 0.3s; color: rgba(255,255,255,0.6);
    }
    .pill:hover { background: rgba(255,255,255,0.1); color: #fff; }
    .pill.active { background: var(--bn-grad); border-color: transparent; color: #fff; box-shadow: 0 5px 15px rgba(20,184,166,0.3); }

    .results-wrap { max-width: 1300px; margin: 0 auto; padding: 0 20px; }
    .search-box {
        width: 100%; max-width: 400px; background: rgba(255,255,255,0.05);
        border: 1px solid var(--bn-border); border-radius: 15px; padding: 12px 20px;
        color: #fff; font-family: inherit; margin-bottom: 20px; transition: 0.3s;
    }
    .search-box:focus { border-color: var(--bn-primary); background: rgba(255,255,255,0.08); outline: none; }

    .table-responsive { background: var(--bn-card); border: 1px solid var(--bn-border); border-radius: 24px; overflow: hidden; }
    table { width: 100%; border-collapse: collapse; text-align: right; }
    thead th { background: rgba(255,255,255,0.03); padding: 20px 15px; color: var(--bn-primary); font-size: 0.85rem; font-weight: 800; border-bottom: 2px solid var(--bn-primary); cursor: pointer; }
    tbody td { padding: 15px; border-bottom: 1px solid rgba(255,255,255,0.02); font-size: 0.9rem; font-weight: 500; vertical-align: middle; }
    tbody tr:nth-child(even) { background: rgba(255,255,255,0.015); border-left: 3px solid transparent; }
    tbody tr:nth-child(odd) { background: rgba(255,255,255,0.035); border-left: 3px solid var(--bn-primary); }
    tbody tr:hover { background: rgba(255,255,255,0.06); }

    .match-tag { padding: 4px 10px; border-radius: 6px; font-size: 0.75rem; font-weight: 800; display: inline-block; }
    .mt-ok { background: rgba(16,185,129,0.1); color: #10b981; }
    .mt-warn { background: rgba(245,158,11,0.1); color: #f59e0b; }
    .mt-err { background: rgba(239,68,68,0.1); color: #ef4444; }
    .mt-miss { background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.4); }

    .st-ok { color: #10b981; font-weight: 800; }
    .st-no { color: #ef4444; font-weight: 800; opacity: 0.8; }
    .diff-pos { color: #10b981; font-weight: 800; } /* extra = green */
    .diff-neg { color: #fb7185; font-weight: 800; } /* discount = red */
    .diff-zero { color: rgba(255,255,255,0.3); }
    .booking-logo { height: 12px; vertical-align: middle; filter: brightness(0) invert(1); margin-bottom: 2px; }

    /* Mobile & Print Optimization */
    @media (max-width: 768px) {
        .app-header { padding: 20px; flex-direction: column; gap: 15px; text-align: center; }
        .header-tools { width: 100%; justify-content: center; }
        .drop-grid { grid-template-columns: 1fr; }
        .dashboard { grid-template-columns: repeat(2, 1fr); }
    }

    @media print {
        .app-header, .hero-card, .control-panel, .filter-pills, .search-box, .header-tools, .btn-mini, .bm-merge, .quantum-loader-overlay, .loader-perf, .perf-summary { display: none !important; }
        .booking-nazeel-page-wrapper { background: #fff !important; color: #000 !important; padding: 0 !important; }
        .results-wrap { max-width: 100% !important; padding: 0 !important; }
        .table-responsive { border: none !important; overflow: visible !important; }
        table { border-collapse: collapse !important; width: 100% !important; font-size: 8.5pt !important; }
        thead th { background: #f1f5f9 !important; color: #0f172a !important; border: 1px solid #cbd5e1 !important; -webkit-print-color-adjust: exact; }
        tbody td { border: 1px solid #e2e8f0 !important; color: #000 !important; padding: 6px 4px !important; }
        .match-tag { border: 1px solid #ddd !important; background: #fff !important; color: #333 !important; padding: 2px 5px !important; }
        .diff-pos { color: #059669 !important; font-weight: 700 !important; }
        .diff-neg { color: #dc2626 !important; font-weight: 700 !important; }
        
        /* Print Summary Styles */
        .print-summary { display: block !important; margin-bottom: 30px; page-break-after: avoid; }
        .ps-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #0f172a; padding-bottom: 15px; margin-bottom: 20px; }
        .ps-logo-text { font-size: 24pt; font-weight: 900; color: #0f172a; }
        .ps-logo-sub { font-size: 10pt; color: #64748b; letter-spacing: 2px; }
        .ps-title-main { font-size: 16pt; font-weight: 800; text-align: center; margin: 10px 0; color: #1e293b; }
        .ps-date { font-size: 9pt; color: #64748b; text-align: left; }
        .ps-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 25px; margin-bottom: 20px; }
        .ps-section-title { font-size: 11pt; font-weight: 800; background: #f8fafc; padding: 5px 10px; border-right: 4px solid #14b8a6; margin-bottom: 10px; }
        .ps-table { width: 100%; border-collapse: collapse; margin-bottom: 15px; }
        .ps-table th, .ps-table td { border-bottom: 1px solid #e2e8f0; padding: 5px 8px; font-size: 9pt; text-align: right; }
        .ps-table th { color: #64748b; font-weight: 600; width: 60%; }
        .ps-table td { font-weight: 800; color: #0f172a; }
        .ps-footer { margin-top: 40px; display: grid; grid-template-columns: 1fr 1fr; gap: 50px; }
        .ps-sig-box { border-top: 1px dashed #cbd5e1; padding-top: 10px; text-align: center; font-size: 9pt; color: #64748b; }
        
        /* Table Fidelity */
        tbody tr:nth-child(even) { background: #f8fafc !important; -webkit-print-color-adjust: exact; }
    }

    /* Custom Transitions */
    @keyframes q-up { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes q-fade-in { from { opacity: 0; transform: scale(0.9); } to { opacity: 0.7; transform: scale(1); } }
</style>
</head>
<body>

<div class="booking-nazeel-page-wrapper">
<div class="quantum-loader-overlay" id="loader">
    <div class="quantum-core">
        <svg class="q-ring" viewBox="0 0 260 260">
            <defs>
                <linearGradient id="q-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:var(--bn-primary);stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#22d3ee;stop-opacity:1" />
                </linearGradient>
            </defs>
            <circle class="bg" cx="130" cy="130" r="120" />
            <circle class="progress" id="qCircle" cx="130" cy="130" r="120" />
        </svg>
        <div class="q-center">
            <i class="fas fa-gem q-gem"></i>
            <div class="q-pct-text" id="loaderPct">0%</div>
            <div class="q-lbl" id="loaderLabel">تجهيز المحرك...</div>
        </div>
    </div>

    <div class="q-dashboard">
        <div class="q-card q-match">
            <i class="fas fa-check-circle"></i>
            <span class="q-val" id="qMatch">0</span>
            <span class="q-lbl">تطابق</span>
        </div>
        <div class="q-card q-miss">
            <i class="fas fa-times-circle"></i>
            <span class="q-val" id="qMiss">0</span>
            <span class="q-lbl">مفقود</span>
        </div>
        <div class="q-card q-time">
            <i class="fas fa-clock"></i>
            <span class="q-val" id="qTime">0.0</span>
            <span class="q-lbl">الثواني</span>
        </div>
    </div>

    <div class="q-live-feed">
        <div class="q-feed-track" id="qFeed">
            <!-- Live Items Injected Here -->
        </div>
    </div>

    <div class="q-phase-stepper">
        <div class="q-phase" id="ph-idx"><i class="fas fa-search"></i> <span>فهرسة</span></div>
        <div class="q-phase" id="ph-alias"><i class="fas fa-memory"></i> <span>ذاكرة</span></div>
        <div class="q-phase" id="ph-match"><i class="fas fa-bolt"></i> <span>مطابقة</span></div>
        <div class="q-phase" id="ph-fin"><i class="fas fa-flag-checkered"></i> <span>نهاية</span></div>
    </div>
    
    <div class="loader-perf" id="loaderPerf" style="margin-top:20px; opacity:0.5; font-size:0.65rem">القياس: بانتظار البدء...</div>
</div>

<header class="app-header">
    <div class="brand">
        <div class="brand-info">
            <h1>منظومة مقارنة بوكينج و نزيل</h1>
            <p>القناص</p>
        </div>
    </div>
    <div class="header-tools" id="headerTools" style="display:none">
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

<div class="control-panel" id="controlPanel" style="display:none">
    <div class="tax-settings">
        <div class="tax-item">الضريبة <input type="number" id="taxVal" class="tax-inp" value="15"></div>
        <div class="tax-item">البلدية <input type="number" id="muniVal" class="tax-inp" value="2.5"></div>
        <button type="button" class="btn-recalc" id="btnRecalc" onclick="window.startEngine && window.startEngine();" title="إعادة تحليل">إعادة تحليل</button>
    </div>
</div>

<div class="dashboard" id="dashboard" style="display:none">
    <div class="kpi-card k-blue">
        <div class="kpi-icon"><i class="fas fa-book"></i></div>
        <div class="kpi-info">
            <span class="kpi-num" id="kpiBook">0</span>
            <span class="kpi-lbl">إجمالي</span>
            <div class="sub-stats">
                <div class="mini"><b id="subOk" style="color:var(--bn-primary)">0</b><span>مؤكد</span></div>
                <div class="mini"><b id="subCan" style="color:#c0392b">0</b><span>ملغي</span></div>
                <div class="mini"><b id="subNos" style="color:#f39c12">0</b><span>NoShow</span></div>
            </div>
        </div>
    </div>

    <div class="kpi-card k-green" title="حضر ووُجد في نزيل — عمولة مستحقة">
        <div class="kpi-icon"><i class="fas fa-check"></i></div>
        <div class="kpi-info">
            <span class="kpi-num" id="kpiOk">0</span>
            <span class="kpi-lbl">مطابق</span>
        </div>
    </div>
    <div class="kpi-card k-purple">
        <div class="kpi-icon"><i class="fas fa-layer-group"></i></div>
        <div class="kpi-info">
            <span class="kpi-num" id="kpiGroup">0</span>
            <span class="kpi-lbl">تجميع/ت.يدوي</span>
        </div>
    </div>
    <div class="kpi-card k-gold">
        <div class="kpi-icon"><i class="fas fa-fingerprint"></i></div>
        <div class="kpi-info">
            <span class="kpi-num" id="kpiMoney">0</span>
            <span class="kpi-lbl">بصمة/تمديد</span>
        </div>
    </div>
    
    <div class="kpi-card">
        <div class="kpi-icon"><i class="fas fa-hand-holding-dollar" style="color:#003580"></i></div>
        <div class="kpi-info">
            <span class="kpi-num" id="kpiRevB" style="color:#003580">0</span>
            <span class="kpi-lbl">إيراد بوكينج</span>
        </div>
    </div>
    <div class="kpi-card">
        <div class="kpi-icon"><i class="fas fa-receipt" style="color:var(--bn-primary)"></i></div>
        <div class="kpi-info">
            <span class="kpi-num" id="kpiRevN" style="color:var(--bn-primary)">0</span>
            <span class="kpi-lbl">إيراد نزيل</span>
        </div>
    </div>
    <div class="kpi-card k-red">
        <div class="kpi-icon"><i class="fas fa-exclamation-triangle"></i></div>
        <div class="kpi-info">
            <span class="kpi-num" id="kpiRecover">0</span>
            <span class="kpi-lbl">تسكين (إلغاء)</span>
        </div>
    </div>
    <div class="kpi-card" title="حجز مؤكد في بوكينج لكن غير موجود في نزيل — لا تدفع عمولة">
        <div class="kpi-icon" style="background:var(--bn-grad-warn); color:#fff;"><i class="fas fa-user-slash"></i></div>
        <div class="kpi-info">
            <span class="kpi-num" id="kpiMiss">0</span>
            <span class="kpi-lbl">لم يحضر (لا عمولة)</span>
        </div>
    </div>
    <div class="kpi-card">
        <div class="kpi-icon"><i class="fas fa-scale-balanced" style="color:#78909c"></i></div>
        <div class="kpi-info">
            <span class="kpi-num" id="kpiDiff" style="color:#78909c">0</span>
            <span class="kpi-lbl">فرق الإيراد</span>
        </div>
    </div>
</div>

<div class="results-wrap" id="resultsArea" style="display:none">
    <div id="printSummary" class="print-summary" aria-hidden="true"></div>
    <div id="perfSummary" class="perf-summary"></div>
    <div class="filter-pills">
        <div class="pill active" onclick="setFilter('all', this)" title="عرض كل النتائج">الكل</div>
        <div class="pill" onclick="setFilter('name,reversed', this)" title="فقط الصفوف التي تم الربط فيها حسب الاسم (تطابق الاسم أو عكس الاسم)">حضر — ربط بالاسم</div>
        <div class="pill red" onclick="setFilter('conflict', this)" title="حجز ملغي في بوكينج — لا تدفع عمولة">ملغي (لا عمولة)</div>
        <div class="pill" onclick="setFilter('group,multi', this)" title="تجميع/غرفتان: ربط بالاسم + تأكيد بالمبلغ (فرق ≤5٪). ✓ تأكيد بالمبلغ = فرق ≤5 ر.س">حضر — تجميع / غرفتان</div>
        <div class="pill" onclick="setFilter('alias', this)" title="مطابقة محفوظة سابقاً — عمولة مستحقة">حضر — ربط يدوي</div>
        <div class="pill" onclick="setFilter('guess,extension,money', this)" title="مطابقة أضعف أو تمديد إقامة — راجع قبل دفع العمولة">حضر — مراجعة</div>
        <div class="pill" onclick="setFilter('review', this)" title="فقط الحالات التي تحتاج تدقيق (ثقة أقل من 85% أو اسم مختلف مع مرجع)">تحتاج مراجعة</div>
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
// [PURGE: LEGACY V19.1 START]
// [PURGE: LEGACY V19.1 MIDDLE]
// [PURGE: LEGACY V19.1 3.1]

// V18.0: Diagnostic Difference
// [PURGE: LEGACY V19.1 3.2]


// UI - Initialize event listeners after DOM is ready
// This will be handled in init() method

// [PURGE: LEGACY V19.1 3.3]

// [PURGE: LEGACY V19.1 3.4]

/** تجميع صفوف البوكينج حسب رقم الحجز: حجز واحد = صف واحد (هدف المشروع: مراجعة العمولة بوحدة الحجز) */
// [PURGE: LEGACY V19.1 3.5]

// [PURGE: LEGACY V19.1 3.6]

// [PURGE: LEGACY V19.1 3.7]

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
        window.initDB = function () {
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

        window.saveAlias = function (bName, nName) {
            if (!window.db) return;
            const transaction = window.db.transaction(['aliases'], 'readwrite');
            const store = transaction.objectStore('aliases');
            store.put({ bName: window.normalize(bName), nName: window.normalize(nName) });
        };

        window.getAlias = function (bName) {
            return new Promise((resolve, reject) => {
                if (!window.db) { resolve(null); return; }
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
        window.levenshtein = function (a, b) {
            const matrix = [];
            for (let i = 0; i <= b.length; i++) matrix[i] = [i];
            for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
            for (let i = 1; i <= b.length; i++) {
                for (let j = 1; j <= a.length; j++) {
                    if (b.charAt(i - 1) == a.charAt(j - 1)) matrix[i][j] = matrix[i - 1][j - 1];
                    else matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1));
                }
            }
            return matrix[b.length][a.length];
        };

        window.safeSet = function (id, v) { if (document.getElementById(id)) document.getElementById(id).textContent = v; };
        window.cleanPrice = function (v) { return parseFloat(String(v || 0).replace(/[^0-9.]/g, "").replace(",", ".")) || 0; };

        window.DATE_TOLERANCE_DAYS_NAME = 2;
        window.DATE_TOLERANCE_DAYS_GROUP = 3;
        window.DATE_TOLERANCE_DAYS_GUESS = 2;
        window.DATE_TOLERANCE_DAYS_EXT = 2;
        window.PRICE_TOLERANCE_NAME = 15;
        window.PRICE_TOLERANCE_GROUP = 15;
        window.PRICE_TOLERANCE_GUESS = 8;
        window.PRICE_TOLERANCE_EXT = 20;
        window.refMatch = function (bRef, nRef) {
            var b = String(bRef || "").trim();
            var n = String(nRef || "").trim();
            if (!b || !n) return false;
            if (n.indexOf(b) !== -1 || b.indexOf(n) !== -1) return true;
            if (b.length <= 12 && n.length <= 12 && window.levenshtein(b, n) <= 2) return true;
            return false;
        };

        window.normalize = typeof memoizedNormalize !== 'undefined'
            ? memoizedNormalize
            : function (s) {
                s = String(s || "");
                if (s.includes(",")) s = s.split(",").map(function (p) { return p.trim(); }).reverse().join(" ");
                return s.toLowerCase()
                    .replace(/[أإآ]/g, "ا").replace(/ة/g, "ه").replace(/ى/g, "ي")
                    .replace(/al-/g, "").replace(/al /g, "").replace(/bin /g, "").replace(/abu /g, "")
                    .replace(/mr /g, "").replace(/mrs /g, "")
                    .replace(/[^\w\u0600-\u06FF]/g, " ").replace(/\s+/g, " ").trim();
            };

        // V19.0: Gemini AI — SECURITY: No hardcoded keys. Set window.GEMINI_API_KEY at runtime if needed.
        window.callAI = async function (guestName, candidatePool) {
            if (!window.GEMINI_API_KEY) return null;
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
            } catch (e) { return null; }
        };

        window.parseDate = function (v) {
            if (!v && v !== 0) return null;
            if (typeof v === 'number') return new Date((v - 25569) * 86400000);
            if (typeof v === 'string') {
                if (v.includes('-')) { let p = v.split(' ')[0].split('-'); if (p[0].length === 4) return new Date(p[0], p[1] - 1, p[2]); return new Date(p[2], p[1] - 1, p[0]); }
                if (v.includes('/')) { let p = v.split(' ')[0].split('/'); if (p[0].length === 4) return new Date(p[0], p[1] - 1, p[2]); return new Date(p[2], p[1] - 1, p[0]); }
            }
            return null;
        };
        window.toENDateStr = function (d) { if (!d) return "-"; return d.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' }); };
        window.getParts = function (name) {
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

        window.AR_TO_LAT = { 'ا': 'a', 'أ': 'a', 'آ': 'a', 'إ': 'a', 'ئ': 'y', 'ؤ': 'w', 'ء': '', 'ب': 'b', 'ت': 't', 'ث': 'th', 'ج': 'j', 'ح': 'h', 'خ': 'kh', 'د': 'd', 'ذ': 'dh', 'ر': 'r', 'ز': 'z', 'س': 's', 'ش': 'sh', 'ص': 's', 'ض': 'd', 'ط': 't', 'ظ': 'z', 'ع': 'a', 'غ': 'gh', 'ف': 'f', 'ق': 'q', 'ك': 'k', 'ل': 'l', 'م': 'm', 'ن': 'n', 'ه': 'h', 'و': 'w', 'ي': 'y', 'ى': 'y', 'ة': 'h', 'ڤ': 'v' };
        window.isArabicWord = function (w) {
            if (!w || typeof w !== 'string') return false;
            for (var i = 0; i < w.length; i++) { if (w.charCodeAt(i) >= 0x0600 && w.charCodeAt(i) <= 0x06FF) return true; }
            return false;
        };
        window.transliterateToLatin = function (w) {
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
        window.wordSimilarity = function (bp, np, maxDist) {
            maxDist = maxDist === undefined ? 2 : maxDist;
            var crossDist = Math.max(maxDist, 4);
            var bpNorm = window.normalize(bp);
            var npNorm = window.normalize(np);
            if (bpNorm.length >= 3 && npNorm.length >= 3 && (npNorm.indexOf(bpNorm) === 0 || bpNorm.indexOf(npNorm) === 0)) return true;
            if (window.levenshtein(bp, np) <= maxDist) return true;
            for (var i = 0; i < window.COMMON_NAME_EQUIVALENTS.length; i++) {
                var eq = window.COMMON_NAME_EQUIVALENTS[i];
                var arMatch = (npNorm === eq.ar || npNorm.indexOf(eq.ar) === 0);
                var latMatch = eq.lat.some(function (l) { return window.levenshtein(bpNorm, l) <= maxDist; });
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
        window.guessNameOverlap = function (bParts, nParts) {
            if (!bParts.length || !nParts.length) return false;
            let bFull = bParts.join("");
            // Strictness depends on length: short names (e.g. "H VIP") need near-perfect match
            let maxDist = bFull.length <= 4 ? 1 : 2;
            for (var i = 0; i < bParts.length; i++) {
                for (var j = 0; j < nParts.length; j++) {
                    if (window.wordSimilarity(bParts[i], nParts[j], maxDist)) return true;
                }
            }
            return false;
        };
        window.nameMatchScore = function (bParts, nParts, strict) {
            var maxDist = strict ? 1 : 2;
            var simScore = 0;
            if (!bParts.length || !nParts.length) return 0;
            bParts.forEach(function (bp) {
                if (nParts.some(function (np) { return window.wordSimilarity(bp, np, maxDist); })) simScore++;
            });
            return simScore;
        };
        window.singleWordMatchesFirstOrLast = function (bParts, nParts, maxDist) {
            if (!bParts.length || bParts.length > 1 || !nParts.length) return false;
            var bp = bParts[0];
            for (var j = 0; j < nParts.length; j++) {
                if ((j === 0 || j === nParts.length - 1) && window.wordSimilarity(bp, nParts[j], maxDist)) return true;
            }
            return false;
        };
        window.twoWordMatchesFirstOrLast = function (bParts, nParts, maxDist) {
            maxDist = maxDist === undefined ? 2 : maxDist;
            if (!bParts.length || bParts.length !== 2 || !nParts.length) return false;
            var first = 0, last = nParts.length - 1;
            return (window.wordSimilarity(bParts[0], nParts[first], maxDist) || window.wordSimilarity(bParts[0], nParts[last], maxDist)) && (window.wordSimilarity(bParts[1], nParts[first], maxDist) || window.wordSimilarity(bParts[1], nParts[last], maxDist));
        };
        window.wordSimilarityStrictFirstLast = function (bp, np) {
            var bpNorm = window.normalize(bp);
            var npNorm = window.normalize(np);
            if (bpNorm.length >= 3 && npNorm.length >= 3 && (npNorm.indexOf(bpNorm) === 0 || bpNorm.indexOf(npNorm) === 0)) return true;
            if (bpNorm.length >= 2 && npNorm.length >= 5 && npNorm.indexOf(bpNorm) === 0) return true;
            if (npNorm.length >= 2 && bpNorm.length >= 5 && bpNorm.indexOf(npNorm) === 0) return true;
            if (window.levenshtein(bpNorm, npNorm) <= 1) return true;
            for (var i = 0; i < window.COMMON_NAME_EQUIVALENTS.length; i++) {
                var eq = window.COMMON_NAME_EQUIVALENTS[i];
                var arMatch = (npNorm === eq.ar || npNorm.indexOf(eq.ar) === 0) || (bpNorm === eq.ar || bpNorm.indexOf(eq.ar) === 0);
                var latMatch = eq.lat.some(function (l) { return window.levenshtein(bpNorm, l) <= 1; }) || eq.lat.some(function (l) { return window.levenshtein(npNorm, l) <= 1; });
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
        window.twoWordMatchesFirstOrLastStrict = function (bParts, nParts) {
            if (!bParts.length || bParts.length !== 2 || !nParts.length) return false;
            var first = 0, last = nParts.length - 1;
            var b0First = window.wordSimilarityStrictFirstLast(bParts[0], nParts[first]);
            var b0Last = window.wordSimilarityStrictFirstLast(bParts[0], nParts[last]);
            var b1First = window.wordSimilarityStrictFirstLast(bParts[1], nParts[first]);
            var b1Last = window.wordSimilarityStrictFirstLast(bParts[1], nParts[last]);
            return (b0First || b0Last) && (b1First || b1Last);
        };
        window.nameSubsetMatch = function (bParts, nParts, maxDist) {
            maxDist = maxDist === undefined ? 2 : maxDist;
            if (!bParts.length || !nParts.length) return false;
            var shorter = bParts.length <= nParts.length ? bParts : nParts;
            var longer = bParts.length <= nParts.length ? nParts : bParts;
            for (var i = 0; i < shorter.length; i++) {
                if (!longer.some(function (lw) { return window.wordSimilarity(shorter[i], lw, maxDist); })) return false;
            }
            return true;
        };
        window.nameSameWords = function (bParts, nParts, maxDist) {
            if (!bParts.length || !nParts.length || bParts.length !== nParts.length) return false;
            return window.nameSubsetMatch(bParts, nParts, maxDist) && window.nameSubsetMatch(nParts, bParts, maxDist);
        };
        window.nameFirstLastReversed = function (bParts, nParts, maxDist) {
            maxDist = maxDist === undefined ? 2 : maxDist;
            if (!bParts.length || !nParts.length || bParts.length !== 2 || nParts.length !== 2) return false;
            return window.wordSimilarity(bParts[0], nParts[1], maxDist) && window.wordSimilarity(bParts[1], nParts[0], maxDist);
        };
        window.nameFirstLastReversedStrict = function (bParts, nParts) {
            if (!bParts.length || !nParts.length || bParts.length !== 2 || nParts.length !== 2) return false;
            return window.wordSimilarityStrictFirstLast(bParts[0], nParts[1]) && window.wordSimilarityStrictFirstLast(bParts[1], nParts[0]);
        };
        window.nameSameWordsOrReversed = function (bParts, nParts, maxDist) {
            if (window.nameSameWords(bParts, nParts, maxDist)) return true;
            return window.nameFirstLastReversed(bParts, nParts, maxDist);
        };

        window.getDiffDiagnosis = function (diff, bPriceNet, taxMultiplier) {
            const absDiff = Math.abs(diff);
            if (absDiff < 5) return "مطابقة تامة";
            const taxDiff = bPriceNet * (taxMultiplier - 1);
            if (Math.abs(absDiff - taxDiff) < 5) return "فرق ضريبة/بلدية";
            const nightGuess = bPriceNet * 0.25;
            if (absDiff > nightGuess) return diff > 0 ? "تمديد ليلة محتمل" : "تخفيض سعر/خصم";
            return diff > 0 ? "زيادة غير مشخصة" : "نقصان غير مشخص";
        };

        window.setLoaderProgress = function (pct, stage, stats) {
            const loader = document.getElementById('loader');
            if (!loader) return;
            loader.style.display = 'flex';

            const fill = document.getElementById('qCircle');
            if (fill) {
                const offset = 753 - (753 * (pct / 100));
                fill.style.strokeDashoffset = offset;
            }

            const pctEl = document.getElementById('loaderPct');
            if (pctEl) pctEl.textContent = Math.round(pct) + '%';

            const stageEl = document.getElementById('loaderLabel');
            if (stageEl) stageEl.textContent = stage;

            if (stats) {
                if (stats.match !== undefined) {
                    const mEl = document.getElementById('qMatch');
                    if (mEl) mEl.textContent = stats.match;
                }
                if (stats.miss !== undefined) {
                    const sEl = document.getElementById('qMiss');
                    if (sEl) sEl.textContent = stats.miss;
                }
                if (stats.time !== undefined) {
                    const tEl = document.getElementById('qTime');
                    if (tEl) tEl.textContent = stats.time.toFixed(1);
                }

                // Live Feed Logic
                if (stats.currentName) {
                    const feed = document.getElementById('qFeed');
                    if (feed) {
                        const item = document.createElement('div');
                        item.className = 'q-feed-item';
                        item.innerHTML = `<span>⚡</span> ${stats.currentName}`;
                        feed.prepend(item);
                        if (feed.children.length > 5) feed.removeChild(feed.lastChild);
                    }
                }

                // Phase Stepper Logic
                const phases = ['ph-idx', 'ph-alias', 'ph-match', 'ph-fin'];
                let phaseIdx = 0;
                if (pct > 95) phaseIdx = 3;
                else if (pct > 75) phaseIdx = 2;
                else if (pct > 20) phaseIdx = 1;
                else phaseIdx = 0;

                phases.forEach((id, idx) => {
                    const el = document.getElementById(id);
                    if (el) el.classList.toggle('active', idx === phaseIdx);
                });
            }
        };
        window.resetPerf = function () {
            window.__bnPerf = { total: { startedAt: performance.now() } };
            if (typeof window.renderPerfOverlay === 'function') window.renderPerfOverlay();
        };
        window.markPerfStart = function (stage) {
            if (!window.__bnPerf) window.__bnPerf = {};
            if (!window.__bnPerf[stage]) window.__bnPerf[stage] = {};
            if (!window.__bnPerf[stage].startedAt) window.__bnPerf[stage].startedAt = performance.now();
            if (typeof window.renderPerfOverlay === 'function') window.renderPerfOverlay();
        };
        window.markPerfEnd = function (stage) {
            if (!window.__bnPerf || !window.__bnPerf[stage] || !window.__bnPerf[stage].startedAt) return;
            if (!window.__bnPerf[stage].endedAt) window.__bnPerf[stage].endedAt = performance.now();
            if (typeof window.renderPerfOverlay === 'function') window.renderPerfOverlay();
        };
        window.renderPerfOverlay = function () {
            var el = document.getElementById('loaderPerf');
            if (!el) return;
            var p = window.__bnPerf || {};
            function fmt(stage) {
                var x = p[stage];
                if (!x || !x.startedAt) return "0.00";
                var end = x.endedAt || performance.now();
                return ((end - x.startedAt) / 1000).toFixed(2);
            }
            el.innerHTML = 'القياس (ث): قراءة ' + fmt('read') + ' | تجميع ' + fmt('prepare') + ' | مطابقة ' + fmt('match') + ' | AI ' + fmt('ai') + ' | إجمالي ' + fmt('total');
        };
        window.renderPerfSummary = function () {
            var el = document.getElementById('perfSummary');
            if (!el) return;
            var p = window.__bnPerf || {};
            function fmt(stage) {
                var x = p[stage];
                if (!x || !x.startedAt) return "0.00";
                var end = x.endedAt || performance.now();
                return ((end - x.startedAt) / 1000).toFixed(2);
            }
            el.innerHTML = '⏱️ زمن التحليل: قراءة <b>' + fmt('read') + 's</b> | تجميع <b>' + fmt('prepare') + 's</b> | مطابقة <b>' + fmt('match') + 's</b> | AI <b>' + fmt('ai') + 's</b> | إجمالي <b>' + fmt('total') + 's</b>';
            // Hidden per user request: el.style.display = 'block';
            el.style.display = 'none';
        };

        // UI Event Listeners — تشغيل فوراً (بدون تأخير 100ms) حتى يكون startEngine جاهزاً عند رفع الملفين
        var autoStartTimer = null;
        function tryAutoStart() {
            var n = document.getElementById('nazeelFile');
            var b = document.getElementById('bookingFile');
            if (n && b && n.files && n.files[0] && b.files && b.files[0]) {
                if (autoStartTimer) clearTimeout(autoStartTimer);
                autoStartTimer = setTimeout(function () {
                    if (typeof window.startEngine === 'function') window.startEngine();
                    autoStartTimer = null;
                }, 800);
            }
        }
        setTimeout(() => {
            const nazeelFile = document.getElementById('nazeelFile');
            const bookingFile = document.getElementById('bookingFile');
            if (nazeelFile) {
                nazeelFile.addEventListener('change', function () {
                    const dz = document.getElementById('dz-naz');
                    const progress = document.getElementById('progress-naz');
                    const h3 = dz ? dz.querySelector('h3') : null;
                    if (dz) dz.classList.add('file-loaded');
                    if (h3 && this.files[0]) {
                        h3.innerHTML = `نزيل (Guests) <span class="file-name">✅ ${this.files[0].name}</span>`;
                    }
                    // شريط تحميل سريع (حوالي 0.2 ثانية)
                    if (progress) {
                        progress.style.width = '0%';
                        let width = 0;
                        const interval = setInterval(() => {
                            width += 10;
                            if (width > 100) width = 100;
                            progress.style.width = width + '%';
                            if (width >= 100) {
                                clearInterval(interval);
                                setTimeout(() => { progress.style.opacity = '0'; }, 500);
                            }
                        }, 20);
                    }
                    tryAutoStart();
                });
            }
            if (bookingFile) {
                bookingFile.addEventListener('change', function () {
                    const dz = document.getElementById('dz-book');
                    const progress = document.getElementById('progress-book');
                    const h3 = dz ? dz.querySelector('h3') : null;
                    if (dz) dz.classList.add('file-loaded');
                    if (h3 && this.files[0]) {
                        h3.innerHTML = `بوكينج (Booking) <span class="file-name">✅ ${this.files[0].name}</span>`;
                    }
                    // شريط تحميل سريع (حوالي 0.2 ثانية)
                    if (progress) {
                        progress.style.width = '0%';
                        let width = 0;
                        const interval = setInterval(() => {
                            width += 10;
                            if (width > 100) width = 100;
                            progress.style.width = width + '%';
                            if (width >= 100) {
                                clearInterval(interval);
                                setTimeout(() => { progress.style.opacity = '0'; }, 500);
                            }
                        }, 20);
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
            window.buildPrintSummary = function () {
                var el = document.getElementById('printSummary');
                if (!el) return;
                var st = window.lastStats;
                if (!st || !st.s) {
                    el.innerHTML = '<div class="ps-title-main">تقرير مطابقة الحجوزات — مراجعة عمولة بوكينج</div><p class="ps-date">لم يتم تشغيل التحليل بعد.</p>';
                    return;
                }
                var s = st.s, sub = st.sub;
                var revB = (typeof s.revB === 'number') ? s.revB.toLocaleString() : String(s.revB || 0);
                var revN = (typeof s.revN === 'number') ? s.revN.toLocaleString() : String(s.revN || 0);
                var diff = (typeof s.revN === 'number' && typeof s.revB === 'number') ? (s.revN - s.revB).toLocaleString() : String((s.revN || 0) - (s.revB || 0));
                var dateStr = new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });

                el.innerHTML = `
                    <div class="ps-header">
                        <div class="ps-logo-wrap">
                            <div class="ps-logo-text">ADORA</div>
                            <div class="ps-logo-sub">QUANTUM AUDIT LAYER</div>
                        </div>
                        <div class="ps-date">تاريخ التقرير: ${dateStr}</div>
                    </div>
                    
                    <div class="ps-title-main">تقرير مطابقة الحجوزات — مراجعة عمولة بوكينج</div>
                    
                    <div class="ps-grid">
                        <div class="ps-col">
                            <div class="ps-section-title">أ) ملخص الحالة (تحليل الكم)</div>
                            <table class="ps-table">
                                <tr><th>إجمالي الحجوزات (فريد)</th><td>${s.book || 0}</td></tr>
                                <tr><th>مؤكد (بوكينج)</th><td>${sub.ok || 0}</td></tr>
                                <tr><th>مطابق (وجود في نزيل)</th><td>${s.match || 0}</td></tr>
                                <tr><th>تجميع / غرف محولة</th><td>${s.group || 0}</td></tr>
                                <tr><th>بصمة السعر / تمديد</th><td>${s.money || 0}</td></tr>
                                <tr><th>تسكين (رغم الإلغاء)</th><td>${s.recover || 0}</td></tr>
                                <tr style="background:#fff1f2"><th>لم يحضر (لا تدفع عمولة)</th><td>${s.miss || 0}</td></tr>
                            </table>
                        </div>
                        <div class="ps-col">
                            <div class="ps-section-title">ب) الملخص المالي (مراجعة الإيراد)</div>
                            <table class="ps-table">
                                <tr><th>إيراد بوكينج (للمطابق)</th><td>${revB} ر.س</td></tr>
                                <tr><th>إيراد نزيل (للمطابق)</th><td>${revN} ر.س</td></tr>
                                <tr style="border-top:2px solid #0f172a">
                                    <th>فرق الإيراد (الصافي)</th>
                                    <td class="${(s.revN - s.revB) >= 0 ? 'diff-pos' : 'diff-neg'}">${diff} ر.س</td>
                                </tr>
                            </table>
                            <div style="font-size:7.5pt; color:#64748b; margin-top:10px; line-height:1.4">
                                * ملاحظة: الفرق الموجب يعني زيادة إيراد في نزيل عن بوكينج. 
                                <br> * لم يحضر = حجز مؤكد في بوكينج لم يتم العثور عليه في نزيل.
                            </div>
                        </div>
                    </div>
                    
                    <div class="ps-footer">
                        <div class="ps-sig-box">توقيع مراجع الحسابات</div>
                        <div class="ps-sig-box">اعتماد الإدارة المالي</div>
                    </div>
                `;
            };
            if (!window._printSummaryBound) {
                window.addEventListener('beforeprint', function () { if (window.buildPrintSummary) window.buildPrintSummary(); });
                window._printSummaryBound = true;
            }

            // تحميل ملفات المشروع تلقائياً عند ?loadSample=1 (للمراجعة والاختبار)
            if (typeof window.location !== 'undefined' && window.location.search && window.location.search.indexOf('loadSample=1') !== -1) {
                setTimeout(function () {
                    if (typeof window.loadSampleAndRun === 'function') window.loadSampleAndRun();
                }, 400);
            }
        }, 0);

        window.readSheet = function (file) {
            return new Promise(resolve => {
                const r = new FileReader();
                r.onload = e => { const wb = XLSX.read(e.target.result, { type: 'array' }); resolve(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { header: 1 })); };
                r.readAsArrayBuffer(file);
            });
        };

        window.getData = function (raw, keys) {
            if (!raw || !raw.length) return [];
            let hRow = -1;
            var maxRows = Math.min(30, raw.length);
            for (let i = 0; i < maxRows; i++) {
                if (!raw[i]) continue;
                let rowStr = Array.isArray(raw[i]) ? raw[i].map(function (c) { return String(c != null ? c : "").trim(); }).join(" ") : JSON.stringify(raw[i]);
                let s = JSON.stringify(raw[i]);
                let ok = keys.every(function (k) {
                    if (s.includes(k)) return true;
                    if (k === "إسم العميل" && (s.includes("اسم العميل") || s.includes("المستخدم") || (rowStr.indexOf("العميل") !== -1 && (rowStr.indexOf("اسم") !== -1 || rowStr.indexOf("إسم") !== -1)))) return true;
                    if (k === "رقم الحجز" && (s.includes("رقم الحجز") || (rowStr.indexOf("رقم") !== -1 && rowStr.indexOf("حجز") !== -1))) return true;
                    if (k === "السعر" && (s.includes("السعر") || rowStr.indexOf("السعر") !== -1)) return true;
                    return false;
                });
                if (ok) { hRow = i; break; }
            }
            if (hRow === -1) return [];
            let headers = raw[hRow].map(x => String(x != null ? x : "").trim());
            return raw.slice(hRow + 1).map(r => {
                let obj = {};
                var row = Array.isArray(r) ? r : [];
                headers.forEach((h, i) => {
                    let key = (h === "اسم العميل" || h === "المستخدم" ? "إسم العميل" : h);
                    obj[key] = row[i];
                });
                return obj;
            });
        };

        /** تجميع صفوف البوكينج حسب رقم الحجز: حجز واحد = صف واحد (هدف المشروع: مراجعة العمولة) */
        window.normalizeBookingByRef = function (booking) {
            if (!booking || !booking.length) return booking;
            let refGroups = {};
            booking.forEach(function (row, i) {
                let ref = String(row["رقم الحجز"] || "").trim();
                let key = ref ? ref : "_u_" + i;
                if (!refGroups[key]) refGroups[key] = [];
                refGroups[key].push(row);
            });
            return Object.keys(refGroups).map(function (key) {
                let group = refGroups[key];
                let first = group[0];
                if (group.length === 1) return first;
                let names = group.map(function (r) { return r["اسم الضيف\\الضيوف"] || r["اسم الضيف"] || r["تم الحجز من قِبل"] || ""; }).filter(Boolean);
                let combined = names.join(" ، ");
                let out = {};
                Object.keys(first).forEach(function (k) { out[k] = first[k]; });
                out["اسم الضيف\\الضيوف"] = combined;
                out["اسم الضيف"] = combined;
                return out;
            });
        };

        /** تحميل ملفات المشروع تلقائياً عند ?loadSample=1 (للمراجعة والاختبار — الملفات تُخدم من نفس السيرفر) */
        window.loadSampleAndRun = async function () {
            if (loader) loader.style.display = 'flex';
            if (uploadCard) uploadCard.style.display = 'none';
            if (window.setLoaderProgress) window.setLoaderProgress(0, 'جاري التحليل (V18.1)...');

            // Ensure results are hidden during analysis
            ['headerTools', 'controlPanel', 'dashboard', 'resultsArea'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.style.display = 'none';
            });

            const nazeelUrl = 'GuestsStatistical_Ar.xlsx';
            const bookingUrl = 'الوصول - من 2026-01-01 إلى 2026-01-30.xls';

            try {
                if (window.setLoaderProgress) window.setLoaderProgress(15, 'جاري جلب الملفات...');
                const [nazeelRes, bookingRes] = await Promise.all([
                    fetch(nazeelUrl),
                    fetch(encodeURI(bookingUrl))
                ]);
                if (!nazeelRes.ok || !bookingRes.ok) {
                    alert('لم يتم العثور على ملفات المشروع. تأكد أن الملفين في جذر المشروع: GuestsStatistical_Ar.xlsx و الوصول - من 2026-01-01 إلى 2026-01-30.xls');
                    if (loader) loader.style.display = 'none';
                    if (uploadCard) uploadCard.style.display = 'block';
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
                    if (d) { if (!minD || d < minD) minD = d; if (!maxD || d > maxD) maxD = d; }
                });
                if (minD && maxD) {
                    minD.setDate(minD.getDate() - 1);
                    maxD.setDate(maxD.getDate() + 1);
                    window.cachedB = tempB.filter(b => {
                        let d = window.parseDate(b["تسجيل الوصول"]);
                        return !d || (d >= minD && d <= maxD);
                    });
                } else { window.cachedB = tempB; }
                window.cachedB = window.normalizeBookingByRef(window.cachedB);

                if (window.setLoaderProgress) window.setLoaderProgress(75, 'جاري المطابقة...');
                await window.process(window.cachedB, window.cachedN, tax);
                if (window.setLoaderProgress) window.setLoaderProgress(100, 'تم التحليل');

                if (loader) loader.style.display = 'none';

                // Show UI after analysis
                ['headerTools', 'controlPanel', 'dashboard', 'resultsArea'].forEach(id => {
                    const el = document.getElementById(id);
                    if (el) el.style.display = (id === 'dashboard') ? 'grid' : (id === 'controlPanel' ? 'flex' : 'block');
                });
            } catch (e) {
                alert('خطأ عند تحميل العينة: ' + (e && e.message ? e.message : String(e)));
                if (loader) loader.style.display = 'none';
                if (uploadCard) uploadCard.style.display = 'block';
            }
        };

        window.startEngine = async function () {
            if (window.__bnIsRunning) return;
            window.__bnIsRunning = true;
            if (typeof window.resetPerf === 'function') window.resetPerf();
            const f1 = document.getElementById('nazeelFile');
            const f2 = document.getElementById('bookingFile');
            if (!f1 || !f2 || !f1.files[0] || !f2.files[0]) {
                alert("⚠️ يرجى رفع الملفات");
                window.__bnIsRunning = false;
                return;
            }

            const loader = document.getElementById('loader');
            const uploadCard = document.getElementById('uploadCard');
            if (loader) loader.style.display = 'flex';
            if (uploadCard) uploadCard.style.display = 'none';

            // Ensure results are hidden during re-analysis
            ['headerTools', 'controlPanel', 'dashboard', 'resultsArea'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.style.display = 'none';
            });

            if (window.setLoaderProgress) window.setLoaderProgress(0, 'جاري التحليل (V18.1)...');

            const taxVal = document.getElementById('taxVal');
            const muniVal = document.getElementById('muniVal');
            const taxP = taxVal ? parseFloat(taxVal.value) || 0 : 0;
            const muniP = muniVal ? parseFloat(muniVal.value) || 0 : 0;
            const tax = 1 + ((taxP + muniP) / 100);

            await window.initDB();
            if (window.setLoaderProgress) window.setLoaderProgress(10, 'جاري قراءة ملف نزيل...');

            try {
                if (typeof window.markPerfStart === 'function') window.markPerfStart('read');
                const nRaw = await window.readSheet(f1.files[0]);
                if (window.setLoaderProgress) window.setLoaderProgress(35, 'جاري قراءة ملف بوكينج...');
                const bRaw = await window.readSheet(f2.files[0]);
                if (typeof window.markPerfEnd === 'function') window.markPerfEnd('read');
                if (window.setLoaderProgress) window.setLoaderProgress(55, 'جاري تجهيز البيانات...');
                if (typeof window.markPerfStart === 'function') window.markPerfStart('prepare');
                window.cachedN = window.getData(nRaw, ["إسم العميل"]);
                let tempB = window.getData(bRaw, ["رقم الحجز", "السعر"]);

                if (!window.cachedN || window.cachedN.length === 0) {
                    alert("ملف نزيل: لم يتم العثور على بيانات.\nتأكد من أن الملف يحتوي عمود \"إسم العميل\" (أو \"اسم العميل\" أو \"المستخدم\") في أحد أول 30 سطراً.");
                    if (loader) loader.style.display = 'none';
                    if (uploadCard) uploadCard.style.display = 'block';
                    window.__bnIsRunning = false;
                    return;
                }
                if (!tempB || tempB.length === 0) {
                    alert("ملف بوكينج: لم يتم العثور على بيانات.\nتأكد من أن الملف يحتوي أعمدة \"رقم الحجز\" و\"السعر\" في نفس السطر ضمن أول 30 سطراً.");
                    if (loader) loader.style.display = 'none';
                    if (uploadCard) uploadCard.style.display = 'block';
                    window.__bnIsRunning = false;
                    return;
                }

                let minD = null, maxD = null;
                window.cachedN.forEach(r => {
                    let d = window.parseDate(r["تاريخ الدخول"]);
                    if (d) {
                        if (!minD || d < minD) minD = d;
                        if (!maxD || d > maxD) maxD = d;
                    }
                });
                if (minD && maxD) {
                    minD.setDate(minD.getDate() - 1);
                    maxD.setDate(maxD.getDate() + 1);
                    window.cachedB = tempB.filter(b => {
                        let d = window.parseDate(b["تسجيل الوصول"]);
                        return !d || (d >= minD && d <= maxD);
                    });
                } else {
                    window.cachedB = tempB;
                }
                window.cachedB = window.normalizeBookingByRef(window.cachedB);
                if (typeof window.markPerfEnd === 'function') window.markPerfEnd('prepare');

                if (window.setLoaderProgress) window.setLoaderProgress(75, 'جاري المطابقة...');
                if (typeof window.process === 'function') {
                    if (typeof window.markPerfStart === 'function') window.markPerfStart('match');
                    await window.process(window.cachedB, window.cachedN, tax);
                    if (typeof window.markPerfEnd === 'function') window.markPerfEnd('match');
                }
                if (window.setLoaderProgress) window.setLoaderProgress(100, 'تم التحليل');
                if (typeof window.markPerfEnd === 'function') window.markPerfEnd('total');
                if (typeof window.renderPerfSummary === 'function') window.renderPerfSummary();

                if (loader) loader.style.display = 'none';
                const controlPanel = document.getElementById('controlPanel');
                const dashboard = document.getElementById('dashboard');
                const resultsArea = document.getElementById('resultsArea');
                if (controlPanel) controlPanel.style.display = 'flex';
                if (dashboard) dashboard.style.display = 'grid';
                if (resultsArea) resultsArea.style.display = 'block';
                var headerToolsEl = document.getElementById('headerTools'); if (headerToolsEl) headerToolsEl.classList.add('visible');
                window.__bnIsRunning = false;

            } catch (e) {
                alert("خطأ: " + (e && e.message ? e.message : String(e)));
                if (loader) loader.style.display = 'none';
                if (uploadCard) uploadCard.style.display = 'block';
                if (typeof window.markPerfEnd === 'function') window.markPerfEnd('total');
                window.__bnIsRunning = false;
            }
        };

        window.process = async function (booking, nazeel, tax) {
            try {
                if (!Array.isArray(booking)) booking = [];
                if (!Array.isArray(nazeel)) nazeel = [];
                window.allRowsData = [];
                if (nazeel.length === 0 || booking.length === 0) return;

                let s = { book: 0, match: 0, money: 0, recover: 0, group: 0, miss: 0, revB: 0, revN: 0 };
                let sub = { ok: 0, can: 0, nos: 0 };
                let takenNazeel = new Set();
                let processedBooking = new Set();

                // --- ARCHITECTURAL OVERHAUL: Pre-compute Cache & Indexes (O(N) -> O(1)) ---
                const nazeelCache = nazeel.map((n, i) => {
                    const nm = window.normalize(n["إسم العميل"] || "");
                    return { n, i, name: nm, parts: window.getParts(nm) };
                });
                const bookingCache = booking.map((b, idx) => {
                    const nm = window.normalize(b["اسم الضيف\\الضيوف"] || b["اسم الضيف"]);
                    return { name: nm, parts: window.getParts(nm) };
                });

                const nazeelByDate = new Map();
                const nazeelByRef = new Map();
                const nazeelKeys = Object.keys(nazeel[0] || {});
                const refKey = nazeelKeys.find(k => k.includes("مرجع") || k.includes("مصدر"))
                    || nazeelKeys.find(k => k.includes("رقم الحجز") || (k.includes("رقم") && k.includes("حجز")))
                    || nazeelKeys.find(k => /^id$/i.test(String(k).trim()))
                    || "";

                nazeelCache.forEach(item => {
                    // Date Index
                    const d = window.parseDate(item.n["تاريخ الدخول"]);
                    if (d) {
                        const key = d.toISOString().split('T')[0];
                        if (!nazeelByDate.has(key)) nazeelByDate.set(key, []);
                        nazeelByDate.get(key).push(item);
                    }
                    // Ref Index
                    if (refKey) {
                        const rv = String(item.n[refKey] || "").trim();
                        if (rv && rv !== "0" && rv.length > 4) {
                            if (!nazeelByRef.has(rv)) nazeelByRef.set(rv, []);
                            nazeelByRef.get(rv).push(item);
                        }
                    }
                });

                const getPoolInDateRange = (centerDate, toleranceDays) => {
                    if (!centerDate) return nazeelCache.filter(x => !takenNazeel.has(x.i));
                    let items = [];
                    for (let d = -toleranceDays; d <= toleranceDays; d++) {
                        let target = new Date(centerDate.getTime());
                        target.setDate(target.getDate() + d);
                        let key = target.toISOString().split('T')[0];
                        let dayItems = nazeelByDate.get(key);
                        if (dayItems) {
                            dayItems.forEach(it => { if (!takenNazeel.has(it.i)) items.push(it); });
                        }
                    }
                    return items;
                };

                const getItemsByRef = (ref) => {
                    const rv = String(ref || "").trim();
                    if (!rv || rv.length <= 4) return [];
                    return (nazeelByRef.get(rv) || []).filter(x => !takenNazeel.has(x.i));
                };

                const updateProgressBar = (pct, stage, currentName) => {
                    const elapsed = (performance.now() - startTime) / 1000;
                    const stats = { match: s.match, miss: s.miss, time: elapsed, currentName };
                    if (window.setLoaderProgress) window.setLoaderProgress(pct, stage, stats);

                    // Ensure live timer starts if it hasn't
                    if (!window.__bnTimer && pct < 100) {
                        window.__bnStartTime = startTime;
                        window.__bnTimer = setInterval(() => {
                            const tEl = document.getElementById('qTime');
                            if (tEl) {
                                const now = (performance.now() - window.__bnStartTime) / 1000;
                                tEl.textContent = now.toFixed(1);
                            }
                        }, 100);
                    }
                };

                const yieldToUI = () => new Promise(r => setTimeout(r, 1));
                const startTime = performance.now();
                // --- End Indexing ---

                // V18.0: Stats per status
                booking.forEach(b => {
                    s.book++;
                    let st = String(b["الحالة"] || "").toLowerCase();
                    if (st.includes("ok")) sub.ok++; else if (st.includes("cancel")) sub.can++; else sub.nos++;
                });

                // V18.0: 0. Alias Mapping (The Memory)
                updateProgressBar(76, 'مطابقة الأسماء المحفوظة...');
                await yieldToUI();
                await Promise.all(booking.map(async (b, idx) => {
                    if (processedBooking.has(idx)) return;
                    const bName = b["اسم الضيف\\الضيوف"] || b["اسم الضيف"];
                    const alias = await window.getAlias(bName);

                    if (alias) {
                        const bDate = window.parseDate(b["تسجيل الوصول"]);
                        updateProgressBar(76, 'مطابقة الذاكرة...', bName);
                        const pool = getPoolInDateRange(bDate, 14);
                        const match = pool.find(x => x.name.includes(alias.nName));

                        if (match) {
                            processedBooking.add(idx); takenNazeel.add(match.i);
                            window.storeResult(b, match.n, "alias", s, tax);
                        }
                    }
                }));

                // 1. Grouping
                updateProgressBar(79, 'تجميع الحجوزات...');
                await yieldToUI();
                let groups = {};
                booking.forEach((b, idx) => {
                    if (processedBooking.has(idx)) return;
                    let name = bookingCache[idx].name;
                    if (!groups[name]) groups[name] = [];
                    groups[name].push({ data: b, idx: idx });
                });

                for (let name in groups) {
                    let items = groups[name].filter(it => !processedBooking.has(it.idx));
                    if (items.length < 2) continue;

                    const bDate = window.parseDate(items[0].data["تسجيل الوصول"]);
                    const pool = getPoolInDateRange(bDate, 4);

                    let match = pool.find(x => x.name === name);
                    if (match) {
                        items.forEach(it => {
                            processedBooking.add(it.idx);
                            window.storeResult(it.data, match.n, "group", s, tax, it === items[0]);
                        });
                        takenNazeel.add(match.i);
                    }
                }

                for (let name in groups) {
                    let group = groups[name];
                    if (group.length < 2) continue;
                    let totalExp = group.reduce((sum, item) => sum + (window.cleanPrice(item.data["السعر"]) * tax), 0);
                    let minDate = group.reduce((min, item) => { let d = window.parseDate(item.data["تسجيل الوصول"]); return (!min || d < min) ? d : min; }, null);
                    let bParts = window.getParts(name);
                    let pool = getPoolInDateRange(minDate, 7);
                    let match = pool.find(x => {
                        let nPrice = window.cleanPrice(x.n["الايجار الكلي"] || x.n["الاجمالي"]);
                        let nDate = window.parseDate(x.n["تاريخ الدخول"]);
                        let nParts = x.parts;
                        let priceOk = Math.abs(nPrice - totalExp) <= window.PRICE_TOLERANCE_GROUP;
                        let dateOk = minDate && nDate && Math.abs((nDate - minDate) / 864e5) <= window.DATE_TOLERANCE_DAYS_GROUP;
                        let sim = window.nameMatchScore(bParts, nParts, false);
                        let nameOk = (sim >= 2) || (bParts.length === 1 && sim === 1 && window.singleWordMatchesFirstOrLast(bParts, nParts, 2));
                        return priceOk && dateOk && nameOk;
                    });
                    if (!match) {
                        let candidates = pool.filter(x => {
                            let sim = window.nameMatchScore(bParts, x.parts, false);
                            return (sim >= 2) || (bParts.length === 1 && sim === 1 && window.singleWordMatchesFirstOrLast(bParts, x.parts, 2));
                        });
                        for (let i = 0; i < candidates.length; i++) {
                            for (let j = i + 1; j < candidates.length; j++) {
                                let p1 = window.cleanPrice(candidates[i].n["الايجار الكلي"] || candidates[i].n["الاجمالي"]);
                                let p2 = window.cleanPrice(candidates[j].n["الايجار الكلي"] || candidates[j].n["الاجمالي"]);
                                let sumOk = Math.abs(p1 + p2 - totalExp) <= window.PRICE_TOLERANCE_GROUP;
                                let d1 = window.parseDate(candidates[i].n["تاريخ الدخول"]);
                                let d2 = window.parseDate(candidates[j].n["تاريخ الدخول"]);
                                let dateOk = minDate && ((d1 && Math.abs((d1 - minDate) / 864e5) <= window.DATE_TOLERANCE_DAYS_GROUP) || (d2 && Math.abs((d2 - minDate) / 864e5) <= window.DATE_TOLERANCE_DAYS_GROUP));
                                if (sumOk && dateOk) {
                                    match = { multi: true, rows: [candidates[i], candidates[j]], totalPrice: p1 + p2 };
                                    break;
                                }
                            }
                            if (match) break;
                        }
                    }
                    if (match) {
                        if (match.multi) {
                            match.rows.forEach(r => takenNazeel.add(r.i));
                            group.forEach((item, i) => {
                                processedBooking.add(item.idx);
                                window.storeResult(item.data, (i === 0 ? match.rows[0].n : null), "group", s, tax, i === 0, i === 0 ? match.totalPrice : undefined);
                            });
                        } else {
                            takenNazeel.add(match.i);
                            group.forEach((item, i) => {
                                processedBooking.add(item.idx);
                                window.storeResult(item.data, (i === 0 ? match.n : null), "group", s, tax, i === 0);
                            });
                        }
                    }
                }

                // 2. Waterfall (Individual)
                updateProgressBar(82, 'المطابقة الفورية...');
                await yieldToUI();
                let individualIndices = booking.map((_, idx) => idx).filter(idx => !processedBooking.has(idx));
                for (let i = 0; i < individualIndices.length; i++) {
                    const idx = individualIndices[i];
                    const b = booking[idx];
                    const bName = bookingCache[idx].name;
                    updateProgressBar(82 + (i / individualIndices.length * 10), 'مطابقة فردية...', bName);
                    if (i % 20 === 0) await yieldToUI();
                    const bRef = String(b["رقم الحجز"] || "").trim();
                    const bPrice = window.cleanPrice(b["السعر"]);
                    const expPrice = bPrice * tax;
                    const bDate = window.parseDate(b["تسجيل الوصول"]);

                    let match = null, type = "";

                    // Ref Index Match (Global lookup O(1))
                    if (refKey && bRef && bRef.length > 4) {
                        let directMatches = getItemsByRef(bRef);
                        let exactRefMatches = directMatches.filter(x => bRef === String(x.n[refKey] || "").trim());
                        if (exactRefMatches.length > 0) {
                            var totalNazeelPrice = exactRefMatches.reduce((sum, m) => sum + window.cleanPrice(m.n["الايجار الكلي"] || m.n["الاجمالي"]), 0);
                            exactRefMatches.forEach(m => takenNazeel.add(m.i));
                            processedBooking.add(idx);
                            window.storeResult(b, exactRefMatches[0].n, "ref", s, tax, false, totalNazeelPrice);
                            continue;
                        }
                    }

                    // Waterfall Date-window Lookup
                    const pool = getPoolInDateRange(bDate, 14);

                    // Fuzzy Ref Match
                    if (refKey && bRef) {
                        let refMatches = pool.filter(x => window.refMatch(bRef, x.n[refKey]));
                        if (refMatches.length > 0) {
                            let bParts = bookingCache[idx].parts;
                            let scored = refMatches.map(m => {
                                let nParts = window.getParts(window.normalize(m.n["إسم العميل"] || ""));
                                let score = window.nameMatchScore(bParts, nParts, false);
                                let subset = window.nameSubsetMatch(bParts, nParts, 2) || window.nameSubsetMatch(nParts, bParts, 2);
                                let sameWords = bParts.length >= 2 && nParts.length === bParts.length && window.nameSameWordsOrReversed(bParts, nParts, 2);
                                return { m, score, strong: score >= 2 || subset || sameWords };
                            });
                            let best = scored.reduce((acc, cur) => (!acc || (cur.strong && !acc.strong) || (cur.score > acc.score)) ? cur : acc, null);
                            if (best.strong || bParts.length < 2 || best.score >= 1) {
                                let totalNazeelPrice = refMatches.reduce((sum, m) => sum + window.cleanPrice(m.n["الايجار الكلي"] || m.n["الاجمالي"]), 0);
                                refMatches.forEach(m => takenNazeel.add(m.i));
                                processedBooking.add(idx);
                                window.storeResult(b, best.m.n, "ref", s, tax, false, totalNazeelPrice);
                                continue;
                            }
                        }
                    }

                    // 2.2 Reversed Match
                    if (!match) {
                        let bParts = bookingCache[idx].parts;
                        if (bParts.length === 2) {
                            match = pool.find(x => {
                                const nParts = x.parts;
                                if (nParts.length !== 2 || !window.nameFirstLastReversedStrict(bParts, nParts)) return false;
                                const nPrice = window.cleanPrice(x.n["الايجار الكلي"] || x.n["الاجمالي"]);
                                const nDate = window.parseDate(x.n["تاريخ الدخول"]);
                                let tolPrice = 45;
                                if (!bDate || !nDate) tolPrice = Math.min(350, Math.max(150, Math.round(expPrice * 0.30)));
                                let priceMatch = Math.abs(nPrice - expPrice) <= tolPrice;
                                if (bDate && nDate) {
                                    let dateMatch = Math.abs((nDate - bDate) / 864e5) <= 7;
                                    return dateMatch && priceMatch;
                                }
                                return priceMatch;
                            });
                            if (match) type = "reversed";
                        }
                    }

                    // 2.3 Same Words / Subset Match
                    if (!match) {
                        let bParts = bookingCache[idx].parts;
                        if (bParts.length >= 2) {
                            match = pool.find(x => {
                                let nParts = x.parts;
                                if (!window.nameSameWordsOrReversed(bParts, nParts, 2) && !window.nameSubsetMatch(bParts, nParts, 2)) return false;
                                if (bParts.length === 2 && !window.twoWordMatchesFirstOrLastStrict(bParts, nParts)) return false;
                                let nPrice = window.cleanPrice(x.n["الايجار الكلي"] || x.n["الاجمالي"]);
                                let nDate = window.parseDate(x.n["تاريخ الدخول"]);
                                let tolPrice = window.PRICE_TOLERANCE_GUESS * 2;
                                if (!bDate || !nDate) tolPrice = Math.min(350, Math.max(150, Math.round(expPrice * 0.30)));
                                let priceMatch = Math.abs(nPrice - expPrice) <= tolPrice;
                                if (bDate && nDate) {
                                    let tolDays = 7;
                                    let dateMatch = Math.abs((nDate - bDate) / 864e5) <= tolDays;
                                    return dateMatch && priceMatch;
                                }
                                return priceMatch;
                            });
                            if (match) type = "name";
                        }
                    }

                    // Name — تسامح عند تشابه الاسم
                    if (!match) {
                        let bParts = window.getParts(bName);
                        let bNameNorm = window.normalize(bName);
                        let candidates = pool.filter(x => {
                            let nName = x.name;
                            let nParts = x.parts;
                            if (bParts.length === 2 && !window.twoWordMatchesFirstOrLastStrict(bParts, nParts) && !window.nameSameWordsOrReversed(bParts, nParts, 2)) return false;
                            let nPrice = window.cleanPrice(x.n["الايجار الكلي"] || x.n["الاجمالي"]);
                            let nDate = window.parseDate(x.n["تاريخ الدخول"]);
                            let simScore = window.nameMatchScore(bParts, nParts, false);
                            let subsetMatch = window.nameSubsetMatch(bParts, nParts, 2);
                            let sameWords = window.nameSameWordsOrReversed(bParts, nParts, 2);
                            let namesVeryClose = (simScore >= 2 && bNameNorm.length && nName.length && window.levenshtein(bNameNorm, nName) <= 3) || subsetMatch;
                            var priceTol = sameWords ? window.PRICE_TOLERANCE_NAME * 3 : (namesVeryClose ? window.PRICE_TOLERANCE_NAME * 2 : window.PRICE_TOLERANCE_NAME);
                            if ((!bDate || !nDate) && (sameWords || subsetMatch)) priceTol = Math.min(350, Math.max(150, Math.round(expPrice * 0.30)));
                            let dateTolDays = sameWords ? 5 : (namesVeryClose ? 3 : window.DATE_TOLERANCE_DAYS_NAME);
                            let priceHit = Math.abs(nPrice - expPrice) <= priceTol;
                            let dateHit = bDate && nDate && Math.abs((nDate - bDate) / 864e5) <= dateTolDays;
                            let nameHit = subsetMatch || (simScore >= 2) || (simScore === 1 && window.singleWordMatchesFirstOrLast(bParts, nParts, 2)) || (simScore >= 1 && dateHit && priceHit && (simScore >= 2 || window.singleWordMatchesFirstOrLast(bParts, nParts, 2)));
                            if (nameHit && bParts.length === 2 && !window.nameSameWordsOrReversed(bParts, nParts, 2) && !window.twoWordMatchesFirstOrLastStrict(bParts, nParts)) nameHit = false;
                            let strongNameFL = bParts.length === 2 && window.twoWordMatchesFirstOrLastStrict(bParts, nParts) && simScore >= 2;
                            let priceHitWide = strongNameFL && Math.abs(nPrice - expPrice) <= Math.min(200, Math.max(80, Math.round(expPrice * 0.15)));
                            return (nameHit && (priceHit || dateHit)) || (strongNameFL && priceHitWide);
                        });
                        match = candidates.length ? candidates.sort((a, b) => {
                            let ap = a.parts, bp = b.parts;
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
                        if (match) type = "name";
                    }

                    // حارس نهائي
                    if (match && type === "name") {
                        let bPartsFinal = window.getParts(bName);
                        let nPartsFinal = match.parts;
                        if (bPartsFinal.length === 2 && !window.twoWordMatchesFirstOrLastStrict(bPartsFinal, nPartsFinal)) { match = null; type = null; }
                    }
                    if (match) {
                        processedBooking.add(idx); takenNazeel.add(match.i);
                        window.storeResult(b, match.n, type, s, tax);
                    }
                }

                // 2.5 حجز واحد ↔ إقامتان نزيل
                updateProgressBar(88, 'فحص الإقامات المتعددة...');
                await yieldToUI();
                booking.forEach((b, idx) => {
                    if (processedBooking.has(idx)) return;
                    const bName = bookingCache[idx].name;
                    const bParts = bookingCache[idx].parts;
                    const expPrice = window.cleanPrice(b["السعر"]) * tax;
                    const bDate = window.parseDate(b["تسجيل الوصول"]);
                    let pool = getPoolInDateRange(bDate, 4);
                    let candidates = pool.filter(x => {
                        let nParts = x.parts;
                        let sim = window.nameMatchScore(bParts, nParts, false);
                        return (sim >= 2) || (bParts.length === 1 && sim === 1 && window.singleWordMatchesFirstOrLast(bParts, nParts, 2));
                    });
                    let match = null;
                    for (let i = 0; i < candidates.length; i++) {
                        for (let j = i + 1; j < candidates.length; j++) {
                            let p1 = window.cleanPrice(candidates[i].n["الايجار الكلي"] || candidates[i].n["الاجمالي"]);
                            let p2 = window.cleanPrice(candidates[j].n["الايجار الكلي"] || candidates[j].n["الاجمالي"]);
                            let sumOk = Math.abs(p1 + p2 - expPrice) <= 2; // Strict 2 SAR limit
                            let d1 = window.parseDate(candidates[i].n["تاريخ الدخول"]);
                            let d2 = window.parseDate(candidates[j].n["تاريخ الدخول"]);
                            let dateOk = !bDate || (d1 && Math.abs((d1 - bDate) / 864e5) <= 7) || (d2 && Math.abs((d2 - bDate) / 864e5) <= 7);
                            if (sumOk && dateOk) {
                                match = { rows: [candidates[i], candidates[j]], totalPrice: p1 + p2 };
                                break;
                            }
                        }
                        if (match) break;
                    }
                    if (match) {
                        match.rows.forEach(r => takenNazeel.add(r.i));
                        processedBooking.add(idx);
                        window.storeResult(b, match.rows[0].n, "multi", s, tax, false, match.totalPrice);
                    }
                });

                // 3. Behavioral Extension Check
                updateProgressBar(89, 'تحليل التمديدات...');
                await yieldToUI();
                booking.forEach((b, idx) => {
                    if (processedBooking.has(idx)) return;
                    const bDate = window.parseDate(b["تسجيل الوصول"]);
                    const bOutDate = window.parseDate(b["تاريخ المغادرة"]);
                    const expPrice = window.cleanPrice(b["السعر"]) * tax;
                    let pool = getPoolInDateRange(bDate, 14);

                    let match = pool.find(x => {
                        let nPrice = window.cleanPrice(x.n["الايجار الكلي"] || x.n["الاجمالي"]);
                        let nDate = window.parseDate(x.n["تاريخ الدخول"]);
                        let nOutDate = window.parseDate(x.n["تاريخ الخروج"]);
                        if (!bDate || !nDate || !bOutDate || !nOutDate) return false;
                        let dateMatch = Math.abs((nDate - bDate) / 864e5) <= 4;
                        let extensionHit = (nOutDate > bOutDate);
                        let priceMatch = Math.abs(nPrice - expPrice) <= 2; // Strict 2 SAR limit
                        return dateMatch && extensionHit && priceMatch;
                    });
                    if (match) {
                        processedBooking.add(idx); takenNazeel.add(match.i);
                        window.storeResult(b, match.n, "extension", s, tax);
                    }
                });

                // 4. ORPHAN SCAVENGER (Final Guess)
                updateProgressBar(92, 'محاولة أخيرة للمطابقة...');
                await yieldToUI();
                individualIndices = booking.map((_, idx) => idx).filter(idx => !processedBooking.has(idx));
                individualIndices.forEach(idx => {
                    const b = booking[idx];
                    const bName = bookingCache[idx].name;
                    const bParts = bookingCache[idx].parts;
                    const expPrice = window.cleanPrice(b["السعر"]) * tax;
                    const bDate = window.parseDate(b["تسجيل الوصول"]);

                    // Final pool for scavenger (wider window)
                    let pool = getPoolInDateRange(bDate, 20);

                    let match = pool.find(x => {
                        const nPrice = window.cleanPrice(x.n["الايجار الكلي"] || x.n["الاجمالي"]);
                        if (Math.abs(nPrice - expPrice) > 2) return false; // Strict 2 SAR rule
                        const nParts = x.parts;
                        return window.guessNameOverlap(bParts, nParts);
                    });

                    if (match) {
                        processedBooking.add(idx); takenNazeel.add(match.i);
                        window.storeResult(b, match.n, "guess", s, tax);
                    } else {
                        // Miss — with suggestion
                        let suggested = pool.find(x => window.guessNameOverlap(bParts, x.parts));
                        let suggestedMatch = suggested ? { nName: suggested.n["إسم العميل"], nPrice: window.cleanPrice(suggested.n["الايجار الكلي"] || suggested.n["الاجمالي"]), nDate: window.parseDate(suggested.n["تاريخ الدخول"]) } : null;
                        window.storeResult(b, null, "miss", s, tax, false, undefined, suggestedMatch);
                    }
                });

                updateProgressBar(100, 'اكتمل التحليل!');

                // Show UI after analysis
                ['headerTools', 'controlPanel', 'dashboard', 'resultsArea'].forEach(id => {
                    const el = document.getElementById(id);
                    if (el) el.style.display = (id === 'dashboard') ? 'grid' : (id === 'controlPanel' ? 'flex' : 'block');
                });

                await yieldToUI();
                await window.applyManuals(s);
                window.updateStats(s, sub);
                window.renderTable();
                if (window.location.search && window.location.search.indexOf('diagnose=1') !== -1 && typeof runDiagnosticReport === 'function') runDiagnosticReport();
            } finally {
                if (window.__bnTimer) { clearInterval(window.__bnTimer); window.__bnTimer = null; }
            }
        };

        window.getMatchMeta = function (type, bName, nName) {
            var confidence = 0;
            var reason = "";
            if (type === "ref") { confidence = 99; reason = "مرجع حجز مطابق"; }
            else if (type === "group" || type === "multi") { confidence = 95; reason = "تجميع مرجع/مبلغ"; }
            else if (type === "name" || type === "reversed") { confidence = 90; reason = "تطابق اسم قوي"; }
            else if (type === "alias") { confidence = 92; reason = "مطابقة يدوية محفوظة"; }
            else if (type === "ai") { confidence = 82; reason = "اقتراح AI"; }
            else if (type === "extension") { confidence = 80; reason = "امتداد إقامة"; }
            else if (type === "guess" || type === "money") { confidence = 74; reason = "مطابقة احتمالية"; }
            else if (type === "conflict") { confidence = 65; reason = "تسكين مع حالة بوكينج غير مؤكدة"; }
            else if (type === "miss") { confidence = 0; reason = "لا يوجد مطابق"; }
            else { confidence = 70; reason = "مطابقة عامة"; }
            if (type === "ref" && bName && nName) {
                var bp = window.getParts(window.normalize(bName));
                var np = window.getParts(window.normalize(nName));
                var nameStrong = (bp.length >= 2 && window.twoWordMatchesFirstOrLastStrict(bp, np)) || window.nameSameWordsOrReversed(bp, np, 2) || window.nameSubsetMatch(bp, np, 2) || window.nameSubsetMatch(np, bp, 2);
                if (!nameStrong) {
                    confidence = Math.max(72, confidence - 22);
                    reason += " + اختلاف اسمي";
                }
            }
            return { confidence: confidence, reason: reason };
        };

        window.storeResult = function (b, n, type, s, tax, isGroupHead, totalNazeelPrice, suggestedMatch) {
            let bName = b["اسم الضيف\\الضيوف"] || b["اسم الضيف"] || b["تم الحجز من قِبل"];
            let status = String(b["الحالة"] || "").toLowerCase();
            let isOk = status.includes("ok");
            let bPriceNet = window.cleanPrice(b["السعر"]);
            let bPrice = bPriceNet * tax;
            let nPrice = totalNazeelPrice || (n ? window.cleanPrice(n["الايجار الكلي"] || n["الاجمالي"]) : 0);

            if (type !== "miss") {
                if (!isOk) { s.recover++; type = "conflict"; }
                else {
                    if (type === "ref" || type === "name" || type === "reversed" || type === "alias" || type === "multi") s.match++;
                    if (type === "money" || type === "guess" || type === "extension") s.money++;
                    if (type === "group") s.group++;
                }
                s.revB += bPrice;
                if (type !== "group" || isGroupHead) s.revN += nPrice;
            } else { if (isOk) s.miss++; }

            let row = {
                b: b, n: n, type: type, bName: bName, status: status, isOk: isOk,
                bPrice: bPrice, nPrice: nPrice, bPriceNet: bPriceNet, tax: tax,
                timestamp: window.parseDate(b["تسجيل الوصول"]) || 0
            };
            let meta = window.getMatchMeta(type, bName, n ? n["إسم العميل"] : "");
            row.matchConfidence = meta.confidence;
            row.matchReason = meta.reason;
            if (type === "group") row.isGroupHead = !!isGroupHead;
            if (type === "miss" && suggestedMatch) row.suggestedMatch = suggestedMatch;
            window.allRowsData.push(row);
        };

        window.renderTable = function () {
            const mainTable = document.getElementById("mainTable");
            const tbody = mainTable ? mainTable.querySelector('tbody') : null;
            if (!tbody) return;
            tbody.innerHTML = "";
            const taxValEl = document.getElementById('taxVal');
            const muniValEl = document.getElementById('muniVal');
            const taxMultiplier = 1 + (parseFloat(taxValEl && taxValEl.value ? taxValEl.value : 0) / 100) + (parseFloat(muniValEl && muniValEl.value ? muniValEl.value : 0) / 100);

            if (!mainTable.getAttribute("data-sort-col")) {
                window.allRowsData.sort((a, b) => b.timestamp - a.timestamp);
            }

            // فلترة الصفوف أولاً
            const searchInputEl = document.getElementById('searchInput');
            const searchTerm = (searchInputEl && searchInputEl.value) ? searchInputEl.value.toLowerCase() : '';
            let filtered = (window.allRowsData || []).filter(function (row) {
                let filters = (window.currentFilter || 'all').split(',');
                if (window.currentFilter === 'review') {
                    var needReview = row.type === 'guess' || row.type === 'extension' || row.type === 'money' || row.type === 'miss' || row.type === 'conflict' || ((row.matchConfidence || 0) > 0 && (row.matchConfidence || 0) < 85) || String(row.matchReason || '').indexOf('اختلاف اسمي') !== -1;
                    if (!needReview) return false;
                } else if (window.currentFilter !== 'all' && !filters.includes(row.type)) return false;
                if (window.statusFilter === 'confirmed' && !row.isOk) return false;
                if (window.statusFilter === 'cancelled' && row.isOk) return false;
                let term = searchTerm;
                if (term) {
                    var bNameTerm = String(row.bName || '').toLowerCase();
                    var nNameTerm = String(row.n && row.n["إسم العميل"] ? row.n["إسم العميل"] : '').toLowerCase();
                    var refTerm = String(row.b && row.b["رقم الحجز"] ? row.b["رقم الحجز"] : '').toLowerCase();
                    if (bNameTerm.indexOf(term) === -1 && nNameTerm.indexOf(term) === -1 && refTerm.indexOf(term) === -1) return false;
                }
                return true;
            });

            // تجميع حسب رقم الحجز: صف واحد لكل حجز، أسماء النزلاء مدمجة (تفادي تكرار الشمراني، بدر، عائشة لنفس الحجز)
            let displayRows = [];
            let refGroups = {};
            filtered.forEach(function (row, i) {
                let ref = String(row.b["رقم الحجز"] || "").trim();
                let key = ref ? ref : ("_u_" + i);
                if (!refGroups[key]) refGroups[key] = [];
                refGroups[key].push(row);
            });
            Object.keys(refGroups).forEach(function (key) {
                let group = refGroups[key];
                let rep = group.find(function (r) { return r.n != null; }) || group[0];
                let sm = group.find(function (r) { return r.suggestedMatch; });
                let suggestedMatch = (rep.type === "miss" && rep.suggestedMatch) ? rep.suggestedMatch : (sm ? sm.suggestedMatch : null);
                let combinedNames = group.map(function (r) { return r.bName; }).join(" ، ");
                let guestCount = group.length;
                let displayRow = {
                    b: rep.b, n: rep.n, type: rep.type, status: rep.status, isOk: rep.isOk,
                    bPrice: rep.bPrice, nPrice: rep.nPrice, bPriceNet: rep.bPriceNet, tax: rep.tax,
                    timestamp: rep.timestamp,
                    bName: combinedNames,
                    bNameForMerge: group[0].bName,
                    guestCount: guestCount,
                    isGroupHead: rep.isGroupHead,
                    matchConfidence: rep.matchConfidence,
                    matchReason: rep.matchReason
                };
                if (rep.type === "group" && !rep.n) {
                    let groupHead = filtered.find(function (r) { return r.type === "group" && r.n && window.normalize(r.bName) === window.normalize(rep.bName); });
                    if (groupHead) displayRow.groupTotalNazeel = groupHead.nPrice;
                }
                if (rep.type === "group" && rep.n) {
                    let sameName = filtered.filter(function (r) { return r.type === "group" && window.normalize(r.bName) === window.normalize(rep.bName); });
                    displayRow.groupBookingPrices = sameName.map(function (r) { return r.bPrice; });
                }
                if (suggestedMatch) displayRow.suggestedMatch = suggestedMatch;
                if (rep.amountVerified) displayRow.amountVerified = true;
                displayRows.push(displayRow);
            });

            displayRows.forEach(function (row, idx) {
                let tr = document.createElement('tr');
                tr.dataset.type = row.type;
                let isGroupSub = row.type === "group" && !row.n;
                if (isGroupSub) tr.classList.add("row-group-sub");

                let tag = "";
                if (row.type === "ref") tag = `<span class="match-tag mt-ok">🆔 مرجع</span>`;
                else if (row.type === "name") tag = `<span class="match-tag mt-ok">✨ اسم</span>`;
                else if (row.type === "reversed") tag = `<span class="match-tag mt-ok" title="عكس الاسم (أول↔ثاني)">✨ اسم (عكس)</span>`;
                else if (row.type === "ai") tag = `<span class="match-tag mt-ok" style="background:#e8eaf6;color:#5c6bc0;border:1px solid #9fa8da;">🤖 AI</span>`;
                else if (row.type === "alias") tag = `<span class="match-tag mt-alias">🧠 ذاكرة</span>`;
                else if (row.type === "money") tag = `<span class="match-tag mt-warn">💰 بصمة</span>`;
                else if (row.type === "guess") tag = `<span class="match-tag mt-guess">🧩 تخمين ذكي</span>`;
                else if (row.type === "extension") tag = `<span class="match-tag mt-ext">🟡 تمديد إقامة</span>`;
                else if (row.type === "group") tag = `<span class="match-tag mt-grp">🔗 تجميع</span>${row.amountVerified ? ' <span class="match-tag mt-ok" style="font-size:0.65rem" title="مجموع نزيل قريب جداً من بوكينج — تأكيد بالمبلغ">✓ تأكيد بالمبلغ</span>' : ''}`;
                else if (row.type === "multi") tag = `<span class="match-tag mt-grp" title="حجز واحد → إقامتان نزيل (غرفتان)">🛏️ غرفتان</span>${row.amountVerified ? ' <span class="match-tag mt-ok" style="font-size:0.65rem" title="مجموع نزيل قريب جداً من بوكينج — تأكيد بالمبلغ">✓ تأكيد بالمبلغ</span>' : ''}`;
                else if (row.type === "conflict") tag = `<span class="match-tag mt-err">⚠️ تسكين</span>`;
                else tag = `<span class="match-tag mt-miss">❌ مفقود</span>`;
                let conf = Number(row.matchConfidence || 0);
                let confClass = conf >= 90 ? "conf-hi" : (conf >= 75 ? "conf-mid" : "conf-low");
                let confTag = conf > 0 ? `<span class="conf-tag ${confClass}" title="درجة الثقة في الربط">${conf}%</span>` : "";

                let suggestedHint = "";
                if (row.type === "miss" && row.suggestedMatch && row.suggestedMatch.nName) {
                    var sn = (typeof sanitizeText === 'function' ? sanitizeText : function (t) { return String(t || '').replace(/[<>"&]/g, ''); })(String(row.suggestedMatch.nName));
                    var sp = row.suggestedMatch.nPrice != null ? " — " + Number(row.suggestedMatch.nPrice).toFixed(0) + " ر.س" : "";
                    suggestedHint = "<div class=\"suggested-hint\" title=\"ربما نفس الضيف في نزيل بتهجئة قريبة — راجع يدوياً\">ربما مطابق: " + sn + sp + " — راجع يدوياً</div>";
                }

                let guestBadge = row.guestCount > 1 ? ` <span class="guest-badge" title="عدد الضيوف في نفس الحجز">(${row.guestCount} ضيوف)</span>` : "";

                let stHtml = row.isOk ? `<span class="st-ok">مؤكد</span>` : `<span class="st-no">ملغي</span>`;
                let bDate = window.toENDateStr(window.parseDate(row.b["تسجيل الوصول"]));
                let bOut = window.toENDateStr(window.parseDate(row.b["تاريخ المغادرة"]));
                let nDate = row.n ? window.toENDateStr(window.parseDate(row.n["تاريخ الدخول"])) : "-";
                let nOut = row.n ? window.toENDateStr(window.parseDate(row.n["تاريخ الخروج"])) : "-";
                let mergeAttr = row.type === "miss" ? " data-b-name=\"" + (typeof sanitizeText === 'function' ? sanitizeText(row.bNameForMerge || row.bName) : String(row.bNameForMerge || row.bName).replace(/&/g, "&amp;").replace(/"/g, "&quot;")) + "\"" : "";
                let act = (row.type === "miss") ? suggestedHint + "<br><button class=\"btn-mini bm-merge\"" + mergeAttr + " onclick=\"markMerged(this, this.getAttribute('data-b-name'))\">دمج يدوي</button>" : "";
                if (row.matchReason && row.type !== "miss") {
                    act = (act ? act + "<br>" : "") + `<div class="reason-hint">${row.matchReason}</div>`;
                }

                let diff = row.n ? (row.nPrice - row.bPrice) : 0;
                let diffHtml = row.n ? (Math.abs(diff) < 5 ? `<span class="diff-zero">0</span>` : `<span class="${diff > 0 ? 'diff-pos' : 'diff-neg'}">${diff.toFixed(0)}</span>`) : "-";

                let diffDiag = "";
                if (row.n && row.type !== 'conflict' && row.type !== 'miss') {
                    diffDiag = `<div class="diff-diag">(${window.getDiffDiagnosis(diff, row.bPriceNet, taxMultiplier)})</div>`;
                }

                let rowNumCell = (isGroupSub ? '<span class="group-sub-arrow" title="صف فرعي ضمن التجميع">↳</span> ' : '') + (idx + 1);
                let nPriceCell = '-';
                if (row.n && row.nPrice != null) {
                    if (row.type === "group" && row.groupBookingPrices && row.groupBookingPrices.length) {
                        nPriceCell = '<span class="price-val">' + row.nPrice.toFixed(0) + '</span><div class="group-split">' + row.groupBookingPrices.map(function (p) { return p.toFixed(0); }).join(' + ') + '</div>';
                    } else {
                        nPriceCell = '<span class="price-val">' + row.nPrice.toFixed(0) + '</span>';
                    }
                } else if (isGroupSub && row.bPrice != null) {
                    nPriceCell = '<span class="price-val">' + row.bPrice.toFixed(0) + '</span> <span class="avail-in-group" title="المبلغ مضمن في مجموع نزيل أعلاه">متاح ضمن المجموع</span>';
                }

                var safeCell = typeof sanitizeText === 'function' ? sanitizeText : function (t) { return (t == null || t === undefined) ? '' : String(t).replace(/[<>"&]/g, ''); };
                let bRefVal = row.b["رقم الحجز"] || row.b["رقم مرجع الحجز"] || row.b["مرجع الحجز"] || row.b["Booking ID"] || "";
                let bRefText = bRefVal ? ("رقم الحجز: " + bRefVal) : "";
                tr.innerHTML = `
                    <td class="col-seq">${rowNumCell}</td>
                    <td><div class="b-name">${safeCell(row.bName)}${guestBadge}</div><div class="b-ref">${safeCell(bRefText)}</div></td>
                    <td>${stHtml}</td>
                    <td>${row.n ? safeCell(row.n["إسم العميل"]) : "-"}</td>
                    <td>${tag}${confTag}${act}</td>
                    <td><span class="price-val">${row.bPrice.toFixed(0)}</span></td>
                    <td>${nPriceCell}</td>
                    <td>${diffHtml}${diffDiag}</td>
                    <td>
                        <div class="d-box">
                            <div class="d-line d-line-b"><span class="d-dot dot-b"></span><span class="d-label txt-b">بوكينج </span> <span class="d-dates txt-b">من ${bDate} إلى ${bOut}</span></div>
                            <div class="d-line d-line-n"><span class="d-dot dot-n"></span><span class="d-label txt-n">نزيل </span> <span class="d-dates txt-n">من ${nDate} إلى ${nOut}</span></div>
                        </div>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        };

        window.updateStats = function (s, sub) {
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

        window.setFilter = function (type, btn) {
            document.querySelectorAll('.pill').forEach(b => b.classList.remove('active'));
            if (btn) btn.classList.add('active');
            window.currentFilter = type;
            window.statusFilter = null; // إعادة تعيين فلتر الحالة عند استخدام الفلاتر العادية
            window.renderTable();
        };

        window.setStatusFilter = function (status, btn) {
            document.querySelectorAll('.pill').forEach(b => b.classList.remove('active'));
            if (btn) btn.classList.add('active');
            window.statusFilter = status; // حفظ فلتر الحالة
            window.currentFilter = 'all'; // إعادة تعيين الفلتر العادي
            window.renderTable();
        };

        window.filterTable = function () { window.renderTable(); };

        window.sortTable = function (n) {
            let table = document.getElementById("mainTable");
            let dir = table.getAttribute("data-sort-dir") === "asc" ? "desc" : "asc";
            table.setAttribute("data-sort-dir", dir);
            table.setAttribute("data-sort-col", n);

            window.allRowsData.sort((a, b) => {
                let valA, valB;
                switch (n) {
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

        window.markMerged = function (btn, bName) {
            let tr = btn.closest('tr');
            let nNameEl = tr.querySelector('td:nth-child(4)');
            let nName = prompt(`أدخل اسم العميل في نزيل (مطابق لـ ${bName}):`, nNameEl.innerText.trim());

            if (nName && nName.trim() !== '-' && nName.trim() !== '') {
                window.saveAlias(bName, nName);

                let rowData = window.allRowsData.find(r => r.bName === bName && r.type === 'miss');
                if (rowData) {
                    rowData.type = 'alias';

                    let matchN = window.cachedN.find(n => window.normalize(n["إسم العميل"]) === window.normalize(nName));
                    if (matchN) {
                        rowData.n = matchN;
                        rowData.nPrice = window.cleanPrice(matchN["الايجار الكلي"] || matchN["الاجمالي"]);
                        let el = document.getElementById('kpiRevB');
                        let elN = document.getElementById('kpiRevN');
                        if (el) el.innerText = (parseFloat(el.innerText.replace(/,/g, '')) + rowData.bPrice).toLocaleString();
                        if (elN) elN.innerText = (parseFloat(elN.innerText.replace(/,/g, '')) + rowData.nPrice).toLocaleString();
                    }

                    const kpiOk = document.getElementById('kpiOk');
                    if (kpiOk) kpiOk.textContent = parseInt(kpiOk.textContent) + 1;
                    window.renderTable();
                }
            }
        };

        window.applyManuals = async function (s) {
            // This function is now mostly redundant as the 'alias' check is done inside the main process loop using getAlias.
        };

        window.exportExcel = function () {
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
                tests.forEach(function (t, i) {
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
                div.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#022A3A;color:#fff;padding:24px;border-radius:16px;z-index:99999;max-width:95%;max-height:90vh;overflow:auto;font-family:Tajawal;direction:rtl;text-align:right;border:2px solid #14b8a6;';
                div.innerHTML = '<h2 style="margin:0 0 16px;">🔬 اختبار منطق المطابقة (لم يحضر)</h2><pre style="margin:0;white-space:pre-wrap;font-size:0.9rem;">' + out.join('\n') + '</pre><p style="margin:12px 0 0;font-size:0.8rem;color:rgba(255,255,255,0.7);">يفترض أن الحالات 1–5 تُقبل والحالة 6 (Saws ↔ عبدالله سعد) مرفوضة.</p><button onclick="this.closest(\'#match-test-results\').remove()" style="margin-top:12px;padding:8px 16px;background:#14b8a6;border:none;border-radius:8px;color:#fff;cursor:pointer;">إغلاق</button>';
                document.body.appendChild(div);
            }, 1000);
        }
    }
}

window.BookingNazeelComparePage = BookingNazeelComparePage;
