/**
 * MatchingPage.js
 * نسخة من الكود الأصلي - بدون أي تعديل
 * فقط تغيير: let currentMode = 'manual' بدلاً من 'upload'
 */

class MatchingPage {
    async render() {
        return `
            <style>
                .branch-tabs {
                    display: flex;
                    gap: 15px;
                    margin-bottom: 25px;
                    border-bottom: 3px solid rgba(44, 177, 225, 0.2);
                    padding-bottom: 0;
                }
                .branch-tab {
                    flex: 1;
                    padding: 18px 25px;
                    background: linear-gradient(135deg, rgba(2, 42, 58, 0.6) 0%, rgba(1, 18, 25, 0.8) 100%);
                    border: 2px solid rgba(100, 200, 255, 0.2);
                    border-bottom: none;
                    border-radius: 16px 16px 0 0;
                    color: rgba(255, 255, 255, 0.5);
                    font-size: 1.1rem;
                    font-weight: 800;
                    cursor: pointer;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    text-align: center;
                    position: relative;
                    overflow: hidden;
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                }
                .branch-tab::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(44, 177, 225, 0.1), transparent);
                    transition: left 0.5s;
                }
                .branch-tab:hover::before {
                    left: 100%;
                }
                .branch-tab:hover {
                    background: linear-gradient(135deg, rgba(2, 42, 58, 0.8) 0%, rgba(1, 18, 25, 0.9) 100%);
                    color: rgba(255, 255, 255, 0.9);
                    border-color: rgba(44, 177, 225, 0.4);
                    transform: translateY(-3px);
                    box-shadow: 0 6px 20px rgba(44, 177, 225, 0.2);
                }
                .branch-tab.active {
                    background: linear-gradient(135deg, rgba(2, 42, 58, 0.95) 0%, rgba(1, 18, 25, 0.98) 100%);
                    border-color: #2CB1E1;
                    border-width: 3px;
                    color: #2CB1E1;
                    box-shadow: 
                        0 -6px 20px rgba(44, 177, 225, 0.3),
                        0 0 0 2px rgba(44, 177, 225, 0.1) inset;
                    transform: translateY(-2px);
                    text-shadow: 0 2px 8px rgba(44, 177, 225, 0.4);
                }
                .branch-tab.active::after {
                    content: '';
                    position: absolute;
                    bottom: -3px;
                    left: 0;
                    width: 100%;
                    height: 3px;
                    background: linear-gradient(90deg, #2CB1E1, #5EC5E8, #2CB1E1);
                    box-shadow: 0 0 10px rgba(44, 177, 225, 0.5);
                }
                .branch-content {
                    display: none;
                    animation: fadeIn 0.4s ease;
                }
                .branch-content.active {
                    display: block;
                }
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            </style>
            <div class="card">
                <h1>منظومة تنسيق بوكينج</h1>
                <div class="subtitle">المدقق الشفاف - محرك المطابقة الذكي (Booking & Nazeel)</div>
                
                <!-- Branch Tabs -->
                <div class="branch-tabs">
                    <button class="branch-tab active" onclick="switchBranch('cornish')" id="tab-cornish">
                        🌊 فرع الكورنيش
                    </button>
                    <button class="branch-tab" onclick="switchBranch('andalus')" id="tab-andalus">
                        🏰 فرع الأندلس
                    </button>
                </div>
                
                <!-- Cornish Branch Content -->
                <div id="branch-cornish-content" class="branch-content active">
                    <div class="mode-toggle-container">
                        <button id="toggleUpload" class="mode-btn" onclick="switchMode('upload')">📂 رفع ملفات</button>
                        <button id="toggleManual" class="mode-btn active" onclick="switchMode('manual')">✍️ إدخال يدوي</button>
                    </div>
                <div id="errorArea"></div>
                <div id="uploadModeWrapper">
                    <div class="upload-grid">
                        <div class="upload-box" onclick="document.getElementById('fileBooking').click()">
                            <span style="font-size:24px">📊</span><br><label style="font-weight:bold; cursor:pointer; color:#FFFFFF">ملف Booking</label><br>
                            <span id="fileNameB" style="font-size:12px; color:rgba(255, 255, 255, 0.6)">اضغط للاختيار</span>
                            <input type="file" id="fileBooking" class="file-custom" accept=".xlsx,.xls,.csv,.pdf,.txt,.doc,.docx" onchange="document.getElementById('fileNameB').innerText = this.files[0].name">
                        </div>
                        <div class="upload-box" onclick="document.getElementById('fileNazeel').click()">
                            <span style="font-size:24px">🏨</span><br><label style="font-weight:bold; cursor:pointer; color:#FFFFFF">ملف Nazeel</label><br>
                            <span id="fileNameN" style="font-size:12px; color:rgba(255, 255, 255, 0.6)">اضغط للاختيار</span>
                            <input type="file" id="fileNazeel" class="file-custom" accept=".xlsx,.xls,.csv,.pdf,.txt,.doc,.docx" onchange="document.getElementById('fileNameN').innerText = this.files[0].name">
                        </div>
                    </div>
                </div>
                <div id="manualModeWrapper" style="display:none;">
                    <div class="manual-grid">
                        <div><h3 style="color:#2CB1E1; border-bottom:2px solid rgba(100, 200, 255, 0.2); padding-bottom:10px; margin-bottom:15px; font-weight:800;">📦 مخزون نزيل</h3><div class="std-table-wrapper"><table class="std-table"><thead><tr><th style="width:20%">الوحدة</th><th>بوكينج</th><th>شاغر</th><th>نظافة</th><th>خروج</th><th>صيانة</th><th>حركة</th></tr></thead><tbody id="nazeel-inputs"></tbody></table></div></div>
                        <div class="vertical-sep"></div>
                        <div><h3 style="color:#2CB1E1; border-bottom:2px solid rgba(100, 200, 255, 0.2); padding-bottom:10px; margin-bottom:15px; font-weight:800;">📅 حركة بوكينج</h3><div class="std-table-wrapper"><table class="std-table"><thead><tr><th style="width:70%">الوحدة</th><th>المتوقع (Expected)</th></tr></thead><tbody id="booking-inputs"></tbody></table></div></div>
                    </div>
                </div>
                    <button class="btn-action" onclick="unifiedAnalysis('cornish')">بدء التحليل</button>
                </div>
                
                <!-- Andalus Branch Content -->
                <div id="branch-andalus-content" class="branch-content">
                    <div class="mode-toggle-container">
                        <button id="toggleUploadA" class="mode-btn" onclick="switchMode('upload', 'andalus')">📂 رفع ملفات</button>
                        <button id="toggleManualA" class="mode-btn active" onclick="switchMode('manual', 'andalus')">✍️ إدخال يدوي</button>
                    </div>
                <div id="errorAreaA"></div>
                <div id="uploadModeWrapperA" style="display:none;">
                    <div class="upload-grid">
                        <div class="upload-box" onclick="document.getElementById('fileBookingA').click()">
                            <span style="font-size:24px">📊</span><br><label style="font-weight:bold; cursor:pointer; color:#FFFFFF">ملف Booking</label><br>
                            <span id="fileNameBA" style="font-size:12px; color:rgba(255, 255, 255, 0.6)">اضغط للاختيار</span>
                            <input type="file" id="fileBookingA" class="file-custom" accept=".xlsx,.xls,.csv,.pdf,.txt,.doc,.docx" onchange="document.getElementById('fileNameBA').innerText = this.files[0].name">
                        </div>
                        <div class="upload-box" onclick="document.getElementById('fileNazeelA').click()">
                            <span style="font-size:24px">🏨</span><br><label style="font-weight:bold; cursor:pointer; color:#FFFFFF">ملف Nazeel</label><br>
                            <span id="fileNameNA" style="font-size:12px; color:rgba(255, 255, 255, 0.6)">اضغط للاختيار</span>
                            <input type="file" id="fileNazeelA" class="file-custom" accept=".xlsx,.xls,.csv,.pdf,.txt,.doc,.docx" onchange="document.getElementById('fileNameNA').innerText = this.files[0].name">
                        </div>
                    </div>
                </div>
                <div id="manualModeWrapperA">
                    <div class="manual-grid">
                        <div><h3 style="color:#2CB1E1; border-bottom:2px solid rgba(100, 200, 255, 0.2); padding-bottom:10px; margin-bottom:15px; font-weight:800;">📦 مخزون نزيل</h3><div class="std-table-wrapper"><table class="std-table"><thead><tr><th style="width:20%">الوحدة</th><th>بوكينج</th><th>شاغر</th><th>نظافة</th><th>خروج</th><th>صيانة</th><th>حركة</th></tr></thead><tbody id="nazeel-inputsA"></tbody></table></div></div>
                        <div class="vertical-sep"></div>
                        <div><h3 style="color:#2CB1E1; border-bottom:2px solid rgba(100, 200, 255, 0.2); padding-bottom:10px; margin-bottom:15px; font-weight:800;">📅 حركة بوكينج</h3><div class="std-table-wrapper"><table class="std-table"><thead><tr><th style="width:70%">الوحدة</th><th>المتوقع (Expected)</th></tr></thead><tbody id="booking-inputsA"></tbody></table></div></div>
                    </div>
                </div>
                    <button class="btn-action" onclick="unifiedAnalysis('andalus')">بدء التحليل</button>
                </div>
            </div>
            
            <div id="output" style="display:none;">
                <div class="card"><h2 style="color:#2CB1E1; font-weight:800; margin-bottom:15px;">1. تحليل Booking</h2><div class="std-table-wrapper"><div id="tableBooking"></div></div></div>
                <div class="card"><h2 style="color:#2CB1E1; font-weight:800; margin-bottom:15px;">2. تحليل Nazeel</h2><div class="std-table-wrapper"><div id="tableNazeel"></div></div></div>
                <div class="card" id="comparisonCard">
                    <h2 style="text-align:center; border-bottom:2px solid rgba(100, 200, 255, 0.2); padding-bottom:15px; margin-bottom:20px; color:#2CB1E1; font-weight:800;">📊 التقرير النهائي</h2>
                    <div class="std-table-wrapper"><div id="tableCompare"></div></div>
                    <div style="text-align:center; margin-top:20px; display:flex; gap:12px; justify-content:center; flex-wrap:wrap;">
                        <button class="btn-download" onclick="exportComparisonToExcel()">📥 تصدير Excel</button>
                        <button class="btn-download" onclick="printCompare()" style="background:var(--primary-dark); color:#fff; border-color:var(--primary-dark);">🖨️ طباعة التقرير</button>
                        <button class="btn-download" onclick="sendComparisonToWhatsApp()" style="background:linear-gradient(135deg, #25D366 0%, #128C7E 100%); color:#fff; border-color:#25D366; box-shadow:0 4px 15px rgba(37, 211, 102, 0.3);">
                            📱 إرسال واتساب
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    init() {
        // تهيئة الصفحة - فتح الإدخال اليدوي افتراضياً
        // استخدام setTimeout لضمان تحميل DOM
        setTimeout(() => {
            if (document.getElementById('manualModeWrapper')) {
                switchMode('manual');
            } else {
                setTimeout(() => switchMode('manual'), 50);
            }
        }, 50);
    }
}

// الكود الأصلي - نسخ بالضبط
let currentMode = 'manual'; // تغيير فقط: كان 'upload'
const CANONICAL_TYPES = ["شقة بغرفتي نوم", "شقة مع إطلالة على البحر", "ستوديو امامي", "غرفة كينج مفرد", "غرفة تؤم خلفية", "VIP"];
const CANCEL_FLAGS = ["cancel", "cancelled", "cancelled_by_guest", "ملغي", "كنسل"];
window.nazeelLastRunData = null;
window.bookingLastRunData = null;

function switchMode(mode, branch = 'cornish') {
    currentMode = mode;
    const suffix = branch === 'andalus' ? 'A' : '';
    const uploadWrap = document.getElementById('uploadModeWrapper' + suffix);
    const manualWrap = document.getElementById('manualModeWrapper' + suffix);
    const btnUpload = document.getElementById('toggleUpload' + suffix);
    const btnManual = document.getElementById('toggleManual' + suffix);
    const output = document.getElementById('output');
    const errorArea = document.getElementById('errorArea' + suffix);
    
    if (!uploadWrap || !manualWrap || !btnUpload || !btnManual) return;
    
    if(mode === 'upload') { 
        uploadWrap.style.display = 'block'; 
        manualWrap.style.display = 'none'; 
        btnUpload.classList.add('active'); 
        btnManual.classList.remove('active'); 
    } else { 
        uploadWrap.style.display = 'none'; 
        manualWrap.style.display = 'block'; 
        btnUpload.classList.remove('active'); 
        btnManual.classList.add('active'); 
        const nazeelInputs = document.getElementById('nazeel-inputs' + suffix);
        if(nazeelInputs && nazeelInputs.children.length === 0) {
            initializeFixedInputTables(branch); 
        }
    }
    if(output) output.style.display = 'none'; 
    if(errorArea) errorArea.style.display = 'none';
}

function unifiedAnalysis(branch = 'cornish') { 
    if (currentMode === 'upload') {
        if (typeof runAudit === 'function') {
            runAudit(branch);
        } else {
            console.error("runAudit function not found");
        }
    } else {
        if (typeof analyzeManualData === 'function') {
            analyzeManualData(branch);
        } else {
            console.error("analyzeManualData function not found");
        }
    }
}

function initializeFixedInputTables(branch = 'cornish') {
    const suffix = branch === 'andalus' ? 'A' : '';
    const nTable = document.getElementById('nazeel-inputs' + suffix); 
    const bTable = document.getElementById('booking-inputs' + suffix);
    if (!nTable || !bTable) return;
    
    // استخدام DOM manipulation بدلاً من innerHTML للأمان
    nTable.innerHTML = '';
    bTable.innerHTML = '';
    
    CANONICAL_TYPES.forEach((type, id) => {
        // صف نزيل
        const nRow = document.createElement('tr');
        
        const nTypeCell = document.createElement('td');
        nTypeCell.style.textAlign = 'right';
        nTypeCell.textContent = type;
        
        const fields = ['book', 'emp', 'cln', 'dep', 'mnt', 'move'];
        fields.forEach(field => {
            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'data-input';
            input.id = `n_${field}_${id}${suffix ? '_' + suffix : ''}`;
            input.value = '0';
            
            input.addEventListener('focus', function() { this.value = ''; });
            input.addEventListener('blur', function() { 
                if (this.value === '') this.value = '0'; 
            });
            input.addEventListener('input', function() { 
                this.value = this.value.replace(/[^0-9]/g, ''); 
            });
            
            const cell = document.createElement('td');
            cell.appendChild(input);
            nRow.appendChild(cell);
        });
        
        nRow.insertBefore(nTypeCell, nRow.firstChild);
        nTable.appendChild(nRow);
        
        // صف بوكينج
        const bRow = document.createElement('tr');
        
        const bTypeCell = document.createElement('td');
        bTypeCell.style.textAlign = 'right';
        bTypeCell.textContent = type;
        
        const bInput = document.createElement('input');
        bInput.type = 'text';
        bInput.className = 'data-input';
        bInput.id = `b_cnt_${id}${suffix ? '_' + suffix : ''}`;
        bInput.value = '0';
        
        bInput.addEventListener('focus', function() { this.value = ''; });
        bInput.addEventListener('blur', function() { 
            if (this.value === '') this.value = '0'; 
        });
        bInput.addEventListener('input', function() { 
            this.value = this.value.replace(/[^0-9]/g, ''); 
        });
        
        const bInputCell = document.createElement('td');
        bInputCell.appendChild(bInput);
        
        bRow.appendChild(bTypeCell);
        bRow.appendChild(bInputCell);
        bTable.appendChild(bRow);
    });
}

function analyzeManualData() {
    const nazeelData = {}; 
    const bookingData = {};
    CANONICAL_TYPES.forEach((type, id) => {
        const nEmpEl = document.getElementById(`n_emp_${id}`);
        const nClnEl = document.getElementById(`n_cln_${id}`);
        const nDepEl = document.getElementById(`n_dep_${id}`);
        const bCntEl = document.getElementById(`b_cnt_${id}`);
        
        if (!nEmpEl || !nClnEl || !nDepEl || !bCntEl) return;
        
        const vac = (parseInt(nEmpEl.value)||0) + (parseInt(nClnEl.value)||0);
        const dep = parseInt(nDepEl.value)||0;
        const exp = parseInt(bCntEl.value)||0;
        nazeelData[type] = { vac: vac, dep: dep, avail: vac + Math.round(dep * 0.40), vacList: [], depList: [] };
        bookingData[type] = { expected: exp, arrived: 0, noShow: 0, expList: [], arrList: [], nsList: [] };
    });
    window.nazeelLastRunData = nazeelData; 
    window.bookingLastRunData = bookingData;
    draw(bookingData, nazeelData);
}

function draw(b, n) {
    const output = document.getElementById("output");
    const tableBooking = document.getElementById("tableBooking");
    const tableNazeel = document.getElementById("tableNazeel");
    const tableCompare = document.getElementById("tableCompare");
    
    if (!output || !tableBooking || !tableNazeel || !tableCompare) return;
    
    output.style.display = 'block';
    
    // Scroll to output smoothly
    setTimeout(() => {
        output.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
    
    // Helper function to safely create element from HTML string
    const createTableFromHTML = (html) => {
        const sanitized = typeof sanitizeHTML === 'function' ? sanitizeHTML(html) : html;
        const template = document.createElement('template');
        template.innerHTML = sanitized.trim();
        return template.content.firstChild;
    };
    
    // Table 1: Booking Analysis
    let h1 = `<table class="std-table"><thead><tr><th>النوع</th><th>المتوقع</th><th>وصل</th><th>No Show</th></tr></thead><tbody>`;
    CANONICAL_TYPES.forEach(t => { 
        const d = b[t]; 
        if (!d) return;
        const expectedHTML = d.expected > 0 
            ? `<span class="badge badge-ok">${d.expected} (OK)</span> ${d.expList ? d.expList.join("") : ""}`
            : "0";
        const arrivedHTML = d.arrived > 0
            ? `<b>${d.arrived}</b>${d.arrDep > 0 ? ` <span class="badge badge-gold">(${d.arrDep} عربون)</span>` : ""} ${d.arrList ? d.arrList.join("") : ""}`
            : "0";
        const noShowHTML = d.noShow > 0
            ? `<span class="badge badge-err">${d.noShow}</span> ${d.nsList ? d.nsList.join("") : ""}`
            : "0";
        h1 += `<tr><td>${t}</td><td>${expectedHTML}</td><td>${arrivedHTML}</td><td>${noShowHTML}</td></tr>`;
    });
    h1 += "</tbody></table>";
    const bookingTable = createTableFromHTML(h1);
    tableBooking.innerHTML = '';
    tableBooking.appendChild(bookingTable);
    
    // Table 2: Nazeel Analysis
    let h2 = `<table class="std-table"><thead><tr><th>النوع</th><th>شاغر</th><th>خروج اليوم</th><th>المتاح</th></tr></thead><tbody>`;
    CANONICAL_TYPES.forEach(t => { 
        const d = n[t]; 
        if (!d) return; 
        const avail = (d.vac||0) + Math.round((d.dep||0)*0.40);
        h2 += `<tr><td>${t}</td><td><b>${d.vac||0}</b> ${d.vacList ? d.vacList.join("") : ""}</td><td>${d.dep||0} ${d.depList ? d.depList.join("") : ""}</td><td><span class="badge badge-warn" style="font-size:1rem">${avail}</span></td></tr>`;
    });
    h2 += "</tbody></table>";
    const nazeelTable = createTableFromHTML(h2);
    tableNazeel.innerHTML = '';
    tableNazeel.appendChild(nazeelTable);
    
    // Table 3: Comparison
    let h3 = `<table class="std-table"><thead><tr><th>النوع</th><th>متاح</th><th>مطلوب</th><th>الفرق</th><th>التوصية</th></tr></thead><tbody>`;
    CANONICAL_TYPES.forEach(t => { 
        const nData = n[t], bData = b[t]; 
        if (!nData && !bData) return; 
        const avail = nData ? ((nData.vac||0) + Math.round((nData.dep||0)*0.40)) : 0;
        const req = bData ? bData.expected : 0;
        const diff = avail - req;
        const rec = diff > 0 ? getSmartRecommendation(diff) : (diff < 0 ? '⛔ أغلق فوراً' : '⏸️ متوازن');
        const cls = diff > 0 ? 'badge-ok' : (diff < 0 ? 'badge-err' : 'badge-gold');
        h3 += `<tr><td>${t}</td><td>${avail}</td><td>${req}</td><td><span class="badge ${cls}">${diff}</span></td><td style="font-weight:bold">${rec}</td></tr>`;
    });
    h3 += "</tbody></table>";
    const compareTable = createTableFromHTML(h3);
    tableCompare.innerHTML = '';
    tableCompare.appendChild(compareTable);
}

function mapUnit(raw) { 
    if (!raw) return null; 
    const s = raw.toString().trim(); 
    if (s.includes("غرفتين") || s.includes("غرفتي")) return "شقة بغرفتي نوم"; 
    if (s.includes("صالة مطله") || s.includes("صالة مطلة") || s.includes("نوم مطلة") || s.includes("مع إطلالة") || s.includes("Sea View")) return "شقة مع إطلالة على البحر"; 
    if (s.includes("ستوديو") && s.includes("امامي")) return "ستوديو امامي"; 
    if (s.toUpperCase().includes("VIP")) return "VIP"; 
    if ((s.includes("كينج") || s.includes("King")) && !s.includes("تؤم") && !s.includes("Twin")) return "غرفة كينج مفرد"; 
    if (s.includes("تؤم") || s.includes("Twin")) return "غرفة تؤم خلفية"; 
    return null; 
}

function getSmartRecommendation(diff) { 
    if (diff === 1) return '✅ اقترح عليك تفتح 1. ولو أجّرت استقبال اقفلها بوكينج'; 
    else if (diff === 2) return '✅ اقترح عليك تفتح 1 على الأقل'; 
    else if (diff === 3) return '✅ اقترح عليك تفتح 2 على الأقل'; 
    else if (diff === 4) return '✅ اقترح عليك تفتح 4. الشاغر كتير'; 
    else if (diff > 4) return `✅ اقترح عليك تفتح ${diff - 1} على الأقل. أنت في الأمان`; 
    return '✅ افتح المزيد من الغرف'; 
}

function runAudit() { 
    const errDiv = document.getElementById("errorArea"); 
    if (!errDiv) return;
    
    errDiv.style.display = "none"; 
    const fileBooking = document.getElementById("fileBooking");
    const fileNazeel = document.getElementById("fileNazeel");
    
    if (!fileBooking || !fileNazeel) {
        errDiv.textContent = "⚠️ عناصر الملفات غير موجودة";
        errDiv.style.display = "block";
        return;
    }
    
    const fB = fileBooking.files[0]; 
    const fN = fileNazeel.files[0]; 
    if(!fB || !fN) { 
        errDiv.textContent = "⚠️ الرجاء رفع الملفين أولاً"; 
        errDiv.style.display = "block"; 
        return; 
    }

    const isPdfN = fN && (fN.type === 'application/pdf' || /\.pdf$/i.test(fN.name));
    if (isPdfN) { 
        errDiv.textContent = "ملف نزيل بصيغة PDF لا يمكن تحليله مباشرة. فضلاً صدّر نفس التقرير من نزيل بصيغة Excel (XLS / XLSX) ثم أعد الرفع."; 
        errDiv.style.display = "block"; 
        return; 
    }

    const rB = new FileReader();
    rB.onload = e => { 
        try { 
            const wb = XLSX.read(e.target.result, {type:'array'}); 
            const statsB = processBooking(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], {header:1})); 
            const rN = new FileReader(); 
            rN.onload = e2 => { 
                try { 
                    const wb2 = XLSX.read(e2.target.result, {type:'array'}); 
                    const statsN = processNazeel(XLSX.utils.sheet_to_json(wb2.Sheets[wb2.SheetNames[0]], {header:1})); 
                    window.nazeelLastRunData = statsN; 
                    window.bookingLastRunData = statsB; 
                    draw(statsB, statsN); 
                } catch(x) { 
                    errDiv.textContent = "خطأ في ملف نزيل: " + x.message; 
                    errDiv.style.display = "block"; 
                } 
            }; 
            rN.readAsArrayBuffer(fN); 
        } catch(x) { 
            errDiv.innerHTML = "خطأ في ملف بوكينج:<br>" + x.message; 
            errDiv.style.display = "block"; 
        } 
    }; 
    rB.readAsArrayBuffer(fB); 
}

function parseExcelDate(value) { 
    if (!value) return null; 
    if (!isNaN(value) && value > 20000) { 
        const date = new Date((value - (25567 + 2)) * 86400 * 1000); 
        return date.toISOString().split("T")[0]; 
    }
    const str = value.toString().trim(); 
    if (str.match(/^\d{1,2}\/\d{1,2}\/\d{4}/)) { 
        const parts = str.split("/"); 
        return `${parts[2]}-${parts[1].padStart(2,'0')}-${parts[0].padStart(2,'0')}`; 
    }
    if (str.match(/^\d{4}-\d{1,2}-\d{1,2}/)) { 
        return str.split(" ")[0]; 
    }
    return str; 
}

function processNazeel(rows) { 
    const todayObj = new Date(); 
    const todayStr = todayObj.toISOString().split("T")[0]; 
    let colStatus=-1, colRoom=-1, colOut=-1, headerRow=-1; 
    for(let r=0; r<Math.min(rows.length, 80); r++) { 
        const row = rows[r]; 
        for(let c=0; c<row.length; c++) { 
            const v = (row[c]||"").toString().toLowerCase().trim(); 
            if (v.includes("status") || v.includes("الحالة") || v.includes("الوضع")) colStatus = c; 
            if (v.includes("unit") || v.includes("room") || v.includes("الوحدة") || v.includes("apartment") || v.includes("شقة") || v.includes("الغرفة")) colRoom = c; 
            if (v.includes("departure") || v.includes("خروج") || v.includes("checkout") || v.includes("مغادرة")) colOut = c; 
        }
        if(colStatus !== -1 && colRoom !== -1) { 
            headerRow = r; 
            break; 
        } 
    } 
    const stats = {}; 
    CANONICAL_TYPES.forEach(t => stats[t] = { vac:0, vacList:[], dep:0, depList:[] }); 
    if(headerRow === -1) throw new Error("لم يتم العثور على رؤوس أعمدة Nazeel."); 
    for(let r=headerRow+1; r<rows.length; r++) { 
        const row = rows[r]; 
        const statusRaw = (row[colStatus]||"").toString(); 
        const status = statusRaw.trim(); 
        const room = (row[colRoom]||"").toString().trim(); 
        const rawOutDate = (colOut !== -1 && row[colOut]) ? row[colOut] : ""; 
        const parsedOutDate = parseExcelDate(rawOutDate); 
        if(!room || room.includes("104") || (room.includes("ذوي") && room.includes("عاقة"))) continue; 
        const type = mapUnit(room); 
        if(!type) continue; 
        if(["فارغة", "تنظيف", "Vacant", "Dirty"].some(s => status.includes(s))) { 
            stats[type].vac++; 
            stats[type].vacList.push(`<span style="font-size:11px; display:inline-block; margin:1px; padding:2px 5px; background:#eee; border-radius:4px;">${room}</span>`); 
        }
        let isTodayDate = (parsedOutDate === todayStr); 
        let isStatusDep = ["مغادرة", "departure", "خروج", "checkout"].some(s => status.toLowerCase().includes(s)); 
        const isOccupied = ["مؤجرة", "occupied", "rent", "in house", "سكن"].some(s => status.toLowerCase().includes(s)); 
        if (isStatusDep || (isOccupied && isTodayDate)) { 
            stats[type].dep++; 
            stats[type].depList.push(`<span style="font-size:11px; display:inline-block; margin:1px; padding:2px 5px; background:#eef; border-radius:4px;">${room}</span>`); 
        } 
    } 
    return stats; 
}

function processBooking(rows) { 
    const stats = {}; 
    const ARIVED_TERMS = ["تم السداد", "paid", "عربون", "deposit", "بالكامل"]; 
    CANONICAL_TYPES.forEach(t => stats[t] = { expected:0, expList:[], arrived:0, arrList:[], arrDep:0, noShow:0, nsList:[] }); 
    let idxStatus=-1, idxUnit=-1, idxPayStatus=-1, idxPayRaw=-1, idxGuest=-1, headerRow=-1; 
    for(let r=0; r<Math.min(rows.length, 25); r++) { 
        const row = rows[r]; 
        for(let c=0; c<row.length; c++) { 
            const val = (row[c]||"").toString().toLowerCase().trim(); 
            if(val === "status" || val === "الحالة" || val.includes("booking status")) idxStatus = c; 
            if(val.includes("unit") || val.includes("room") || val.includes("الوحدة") || val.includes("accommodation")) idxUnit = c; 
            if(val.includes("guest") || val.includes("الضيف")) idxGuest = c; 
            if(val === "payment status" || val === "حالة الدفع") idxPayStatus = c; 
            else if((val.includes("payment") || val.includes("الدفع")) && idxPayStatus === -1) idxPayRaw = c; 
        }
        if(idxStatus !== -1 && idxUnit !== -1) { 
            headerRow = r; 
            break; 
        } 
    } 
    if(headerRow === -1) throw new Error("لم يتم العثور على رؤوس أعمدة Booking (Unit/Status)."); 
    const activePayIdx = idxPayStatus !== -1 ? idxPayStatus : idxPayRaw; 
    for(let r=headerRow+1; r<rows.length; r++) { 
        const row = rows[r]; 
        const status = (row[idxStatus]||"").toString().toLowerCase().trim(); 
        if(status !== "ok") continue; 
        if(CANCEL_FLAGS.some(f => JSON.stringify(row).toLowerCase().includes(f))) continue; 
        const unitStr = (row[idxUnit]||"").toString(); 
        const payVal = activePayIdx !== -1 ? (row[activePayIdx]||"").toString().trim() : ""; 
        const guestName = idxGuest !== -1 ? (row[idxGuest]||"").toString() : "Guest"; 
        const units = []; 
        unitStr.split(",").forEach(p => { 
            const m = p.trim().match(/^(\d+)\s*x\s*(.+)$/i); 
            if(m) { 
                for(let i=0; i<+m[1]; i++) units.push(m[2]); 
            } else units.push(p); 
        }); 
        const isExplicitlyPaid = ARIVED_TERMS.some(term => payVal.toLowerCase().includes(term)); 
        const isNoShow = payVal === "لم يتم السداد" || payVal.toLowerCase() === "not paid"; 
        const isEmpty = payVal === ""; 
        units.forEach(u => { 
            const type = mapUnit(u); 
            if(!type) return; 
            const debugInfo = `<div style="font-size:11px; color:#666">${guestName} [${payVal || "Empty"}]</div>`; 
            if (isNoShow) { 
                stats[type].noShow++; 
                stats[type].nsList.push(debugInfo); 
            } else if (isExplicitlyPaid || (!isEmpty && !isNoShow)) { 
                stats[type].arrived++; 
                if(payVal.includes("عربون") || payVal.toLowerCase().includes("deposit")) { 
                    stats[type].arrDep++; 
                    stats[type].arrList.push(debugInfo.replace("]", " - عربون]")); 
                } else { 
                    stats[type].arrList.push(debugInfo); 
                } 
            } else if (isEmpty) { 
                stats[type].expected++; 
                stats[type].expList.push(debugInfo); 
            } 
        }); 
    } 
    return stats; 
}

function exportComparisonToExcel() { 
    const wb = XLSX.utils.book_new(); 
    const wsData = [["النوع", "متاح", "مطلوب", "الفرق", "التوصية"]]; 
    CANONICAL_TYPES.forEach(t => { 
        const nData = window.nazeelLastRunData[t], bData = window.bookingLastRunData[t]; 
        const avail = nData ? ((nData.vac||0) + Math.round((nData.dep||0)*0.40)) : 0; 
        const req = bData ? bData.expected : 0; 
        wsData.push([t, avail, req, avail-req, avail-req > 0 ? getSmartRecommendation(avail-req) : 'Check']); 
    }); 
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(wsData), "Report"); 
    XLSX.writeFile(wb, "Audit_Report.xlsx"); 
}

function printCompare() {
    const tbl = document.getElementById('tableCompare').cloneNode(true);
    document.getElementById('printArea').innerHTML = `
        <div class="prof-report-container">
            <div class="prof-header">
                <h1>تقرير المطابقة</h1>
            </div>
            ${tbl.outerHTML}
            <div style="text-align: center; margin-top: 40px; padding-top: 25px; border-top: 2px solid #000; font-size: 11px; color: #333; font-weight: 600; line-height: 1.8;">
                <div style="margin-bottom: 8px;">تم التنفيذ بواسطة:</div>
                <div style="font-size: 12px; font-weight: 700; color: #000; margin-bottom: 5px;">أيمن أبو ورده</div>
                <div style="font-size: 10px; color: #555;">0570707121 - 77aayy@gmail.com</div>
            </div>
        </div>`; 
    window.print();
}

// Switch between branches
function switchBranch(branch) {
    const cornishTab = document.getElementById('tab-cornish');
    const andalusTab = document.getElementById('tab-andalus');
    const cornishContent = document.getElementById('branch-cornish-content');
    const andalusContent = document.getElementById('branch-andalus-content');
    
    if (!cornishTab || !andalusTab || !cornishContent || !andalusContent) return;
    
    if (branch === 'cornish') {
        cornishTab.classList.add('active');
        andalusTab.classList.remove('active');
        cornishContent.classList.add('active');
        andalusContent.classList.remove('active');
    } else {
        cornishTab.classList.remove('active');
        andalusTab.classList.add('active');
        cornishContent.classList.remove('active');
        andalusContent.classList.add('active');
    }
}

// Send comparison report to WhatsApp
function sendComparisonToWhatsApp() {
    const nazeelData = window.nazeelLastRunData;
    const bookingData = window.bookingLastRunData;
    
    if (!nazeelData || !bookingData) {
        alert('⚠️ يجب إجراء التحليل أولاً');
        return;
    }
    
    let reportText = `━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 تقرير المطابقة النهائي
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

`;
    
    CANONICAL_TYPES.forEach(t => {
        const nData = nazeelData[t];
        const bData = bookingData[t];
        if (!nData && !bData) return;
        
        const avail = nData ? ((nData.vac||0) + Math.round((nData.dep||0)*0.40)) : 0;
        const req = bData ? bData.expected : 0;
        const diff = avail - req;
        const rec = diff > 0 ? getSmartRecommendation(diff) : (diff < 0 ? '⛔ أغلق فوراً' : '⏸️ متوازن');
        
        reportText += `🏨 ${t}
   • متاح: ${avail} وحدة
   • مطلوب: ${req} وحدة
   • الفرق: ${diff > 0 ? '+' : ''}${diff} وحدة
   • التوصية: ${rec}

`;
    });
    
    const now = new Date();
    const dateStr = now.toLocaleString('ar-EG', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    reportText += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🕒 التاريخ والوقت: ${dateStr}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;
    
    const url = `https://wa.me/?text=${encodeURIComponent(reportText.trim())}`;
    window.open(url, '_blank');
}

window.MatchingPage = MatchingPage;
window.matchingPage = new MatchingPage();
