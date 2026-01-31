/**
 * PricingPage.js
 * 
 * صفحة الأسعار - نسخت من الكود المرجعي بالضبط كما هو
 */

class PricingPage {
    constructor() {
        // Reception Pricing Data - نسخت من الكود المرجعي بالضبط
        this.dbR = {
            cornish: [
                { name: "تؤم وكينج",      prices: [230, 280, 315, 350, 375, 400],  monthlySeason: 6440,  monthlyNormal: 5600 },
                { name: "ستوديو",         prices: [340, 390, 420, 460, 480, 510],  monthlySeason: 8970,  monthlyNormal: 7800 },
                { name: "شقة غرفه وصالة", prices: [370, 420, 460, 500, 530, 550],  monthlySeason: 9660,  monthlyNormal: 8400 },
                { name: "غرفتين وصالة",   prices: [400, 450, 550, 600, 650, 680],  monthlySeason: 10350, monthlyNormal: 9000 },
                { name: "VIP",            prices: [850, 900, 1000, 1100, 1250,1399],monthlySeason: 20700, monthlyNormal: 18000 },
            ],
            andalus: [
                { name: "غرفة خلفية تؤم",      prices: [190, 220, 250, 280, 300, 320],  monthlySeason: 5510,   monthlyNormal: 5069 },
                { name: "غرفة خلفية كينج",     prices: [205, 235, 262, 290, 310, 330],  monthlySeason: 5866,   monthlyNormal: 5397 },
                { name: "ستوديو شارع",         prices: [220, 250, 285, 320, 335, 350],  monthlySeason: 6246,   monthlyNormal: 5747 },
                { name: "غرفة وصالة شارع",     prices: [290, 320, 360, 400, 445, 490],  monthlySeason: 8004,   monthlyNormal: 7363 },
                { name: "غرفتين خلفي",         prices: [390, 420, 460, 500, 575, 650],  monthlySeason: 10498,  monthlyNormal: 9658 },
                { name: "غرفتين وصالة شارع",   prices: [420, 450, 500, 550, 640, 730],  monthlySeason: 11258,  monthlyNormal: 10357 },
                { name: "VIP 601",             prices: [570, 600, 650, 700, 757, 850],  monthlySeason: 15000,  monthlyNormal: 14000 },
                { name: "VIP 602",             prices: [370, 400, 475, 500, 525, 550],  monthlySeason: 11500,  monthlyNormal: 10000 },
                { name: "VIP 604",             prices: [320, 350, 375, 400, 420, 440],  monthlySeason: 8500,   monthlyNormal: 8000 },
            ]
        };

        this.unitCountsR = {};
        this.chartInstanceR = null;
        this.previousPricesR = {};
        this.newPricesR = {};
        this.TIERS_R = { EMG:0, UNDER60:1, OVER60:2, OVER70:3, OVER80:4, SEASON:5 };
    }

    async render() {
        return `
            <style>
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes fadeOut {
                    from { opacity: 1; }
                    to { opacity: 0; }
                }
                @keyframes slideUp {
                    from { 
                        opacity: 0;
                        transform: translateY(30px) scale(0.9);
                    }
                    to { 
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
                
                /* ============================================
                   تحسين الجداول الكبيرة على الموبايل
                   ============================================ */
                @media screen and (max-width: 768px) {
                    /* تحسين الجداول في صفحة التسعير */
                    .table-responsive {
                        overflow-x: auto;
                        -webkit-overflow-scrolling: touch;
                        width: 100%;
                        margin: 0 -15px;
                        padding: 0 15px;
                    }
                    
                    .table-responsive .std-table {
                        min-width: 600px;
                        font-size: 0.85rem;
                    }
                    
                    .std-table th,
                    .std-table td {
                        padding: 8px 6px;
                        font-size: 0.8rem;
                    }
                    
                    .std-table th:first-child,
                    .std-table td:first-child {
                        min-width: 120px;
                        position: sticky;
                        left: 0;
                        background: rgba(2, 42, 58, 0.98);
                        z-index: 5;
                    }
                    
                    /* تحسين الأزرار على الموبايل */
                    .btn-download,
                    .btn-add-row-header,
                    .btn-delete-row {
                        font-size: 0.85rem;
                        padding: 8px 12px;
                        min-height: 40px;
                    }
                    
                    /* تحسين الـ inputs في الجداول */
                    .calc-input,
                    .unit-name-input {
                        font-size: 0.8rem !important;
                        padding: 6px 8px !important;
                    }
                    
                    /* تحسين صفحة الاستقبال */
                    .page-container-R {
                        grid-template-columns: 1fr !important;
                        gap: 15px;
                    }
                    
                    .smart-table-R {
                        font-size: 0.85rem;
                    }
                    
                    .smart-table-R th,
                    .smart-table-R td {
                        padding: 8px 6px;
                        font-size: 0.8rem;
                    }
                    
                    /* إخفاء بعض الأعمدة غير الضرورية على الموبايل */
                    .smart-table-R th:nth-child(4),
                    .smart-table-R td:nth-child(4) {
                        display: none; /* إخفاء عمود "تحليل الحالة" على الموبايل */
                    }
                }
                
                @media screen and (max-width: 480px) {
                    .std-table th,
                    .std-table td {
                        padding: 6px 4px;
                        font-size: 0.75rem;
                    }
                    
                    .calc-input,
                    .unit-name-input {
                        font-size: 0.75rem !important;
                        padding: 5px 6px !important;
                    }
                }
            </style>
            <!-- Page header hidden as requested -->
            <div class="page-header" style="display: none;">
                <h1 class="page-title">💰 منظومة التسعير</h1>
                <p class="page-description">نظام التسعير الذكي للوحدات والخدمات</p>
            </div>

            <div id="receptionPricing" class="pricing-section-card">
                <!-- Section header hidden as requested -->
                <div class="section-header" style="display: none;">
                    <h1 class="section-title">👥 حاسبة أسعار موظفي الاستقبال</h1>
                    <p class="section-subtitle">نظام التسعير الذكي (الموظفين) - يتأثر بـ (الفرع/الإشغال/العدد)</p>
                </div>
                
                <div class="page-container-R">
                    <aside style="grid-column: 1 / 2;">
                        <div class="card-R" style="padding:15px;">
                            <div class="card-header">
                                <h2>الإعدادات الرئيسية</h2>
                            </div>
                
                            <label style="margin-top:12px; display:block;">الفرع</label>
                            <select id="branchSelectR" class="strong-input-R" onchange="updateAllR('branchSelectR')" style="margin-bottom:12px;">
                                <option value="cornish">🌊 فرع الكورنيش</option>
                                <option value="andalus">🏰 فرع الأندلس</option>
                            </select>
                
                            <label style="display:block;">نسبة الإشغال العامة (%)</label>
                            <input
                                type="number"
                                id="occupancyInputR"
                                class="strong-input-R"
                                value="0"
                                placeholder="0"
                                oninput="debouncedUpdateAllR()"
                                onfocus="this.value='';"
                                onblur="if(this.value==='' || this.value===null){ this.value=0; updateAllR(); }"
                                onkeydown="handleOccupancyKeydown(event)"
                                max="100"
                                min="0"
                                step="1"
                                style="margin-bottom:12px;"
                            >
                
                            <div style="margin-bottom: 12px;">
                                <label style="display:block;">وضع التسعير</label>
                                <select id="pricingModeR" class="strong-input-R" onchange="updateAllR()">
                                    <option value="daily">سعر يومي (افتراضي)</option>
                                    <option value="monthly-normal">سعر شهري أيام عادية</option>
                                    <option value="monthly-company">سعر شهري شركات (-5%)</option>
                                    <option value="monthly-season">سعر شهري موسم</option>
                                </select>
                            </div>
                
                            <div style="margin-top: 15px; position: relative; height: 160px; width: 100%;">
                                <canvas id="occupancyChartR"></canvas>
                                <div style="position: absolute; top:55%; left:50%; transform:translate(-50%,-50%); text-align:center;">
                                    <div id="occupancyDisplayR" style="font-size:2rem; font-weight:800; line-height:1; font-family:'DM Sans',Arial;">0%</div>
                                    <span style="font-size:0.8rem; color:var(--text-sub);">نسبة الإشغال</span>
                                </div>
                            </div>
                
                            <div style="margin-top: 15px; text-align:center;">
                                <div id="chartExplanationR" style="font-size:0.9rem; color:var(--text-main); font-weight:600;">
                                    أدخل نسبة الإشغال للبدء
                                </div>
                            </div>
                        </div>
                
                        <div id="smartAdviceBoxR" class="card-R" style="border-left:5px solid var(--pr-accent-1);">
                            <h4 id="adviceTitleR" style="color:var(--pr-accent-1); font-size:0.95rem;">
                                <i class="fas fa-lightbulb"></i> نصيحة النظام الذكية
                            </h4>
                            <div id="adviceContentR" class="alert-box" style="font-size:0.85rem;">
                                أدخل نسبة الإشغال للبدء...
                            </div>
                        </div>
                
                        <div class="card-R" style="border-left:5px solid var(--pr-accent-2);">
                            <h4 style="color:var(--pr-accent-2); font-size:0.95rem;">قاعدة التحكم بالعدد</h4>
                            <ul style="font-size:0.8rem; color:var(--text-main); padding-right:20px; margin:5px 0 0;">
                                <li><span style="font-weight:700;">1 - 3 غرف:</span> يطبق السعر القياسي (حسب الإشغال).</li>
                                <li><span style="font-weight:700;">4 غرف:</span> يتم تطبيق خصم (فئة أقل).</li>
                                <li><span style="font-weight:700;">5+ غرف:</span> تفعيل سعر الطوارئ.</li>
                            </ul>
                        </div>
                    </aside>
                    
                    <main style="grid-column: 2 / 3;">
                        <div id="mainTableCardR" class="card-R">
                            <div class="card-header" style="display:flex; justify-content:space-between; align-items:flex-end; border-bottom:2px solid var(--pr-input-border); padding-bottom:10px;">
                                <div>
                                    <h2 style="font-size:1.4rem;">
                                        <span id="branchStatusPulseR" class="status-pulse-R"></span>
                                        جدول الوحدات
                                    </h2>
                                </div>
                                <div style="text-align:left;">
                                    <div style="font-size:0.75rem; color:var(--text-sub);">فئة السعر الحالية</div>
                                    <div id="currentTierLabelR" style="font-weight:800; color:var(--pr-accent-3); font-size:1.1rem;">منخفض</div>
                                </div>
                            </div>
                
                            <div id="tableWrapperR" style="transition:opacity 0.35s ease-in-out;">
                                <table class="smart-table-R">
                                    <thead>
                                        <tr>
                                            <th>نوع الوحدة</th>
                                            <th id="countColumnHeader" style="text-align:center;">العدد المتاح</th>
                                            <th>السعر المقترح</th>
                                            <th>تحليل الحالة</th>
                                            <th style="width:100px;">
                                                <div style="display:flex; align-items:center; justify-content:center; gap:8px;">
                                                    <span>أوامر</span>
                                                    <button class="btn-add-row-header" onclick="addReceptionRow()" title="إضافة وحدة جديدة">➕</button>
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody id="tableBodyR"></tbody>
                                </table>
                            </div>
                
                            <div id="aiHintBoxR" style="margin-top:20px; padding:15px; border-radius:10px; background:rgba(101,84,192,0.05); color:var(--pr-accent-3); font-weight:600; font-size:0.9rem;">
                                <i class="fas fa-magic"></i> اقتراحات التسعير الآلية: <span>--</span>
                            </div>
                        </div>
                        <div style="text-align:center; margin-top:15px;">
                            <button class="btn-download" onclick="printReceptionPricing()">🖨️ طباعة قائمة الاستقبال</button>
                        </div>
                    </main>
                </div>
            </div>
            
            <div class="pricing-section-card" style="margin-top: 40px;">
                <!-- Section header hidden as requested -->
                <div class="section-header" style="display: none;">
                    <h1 class="section-title">⚙️ حاسبة الأسعار الإدارية</h1>
                    <p class="section-subtitle">تحديد أسعار بوكينج للوحدات حسب النسب المئوية</p>
                </div>
                
                <div id="corniche" class="admin-branch-card">
                    <div class="branch-header">
                        <h2 class="branch-title">🌊 فرع الكورنيش</h2>
                    </div>
                <div class="unify-control-group" style="display:flex; align-items:center; gap:12px; margin-bottom:20px; padding:12px; background:rgba(255,255,255,0.03); border-radius:10px; border:1px solid rgba(255,255,255,0.1);">
                    <input type="checkbox" id="unifyC" onchange="setUnify('c')" style="width:18px; height:18px; cursor:pointer; accent-color:#2CB1E1;">
                    <label for="unifyC" style="cursor:pointer; font-weight:600; font-size:0.95rem; color:#FFFFFF; margin:0; user-select:none;">توحيد النسبة</label>
                    <input type="number" id="rateC" value="45" onchange="setUnify('c')" class="calc-input rate-input" style="width:70px; margin:0;">
                    <span style="color:#FFFFFF; font-weight:600; font-size:0.95rem;">%</span>
                </div>
                <div class="table-responsive">
                    <table class="std-table">
                        <thead><tr><th>الوحدة</th><th>السعر الأساسي</th><th>الزيادة %</th><th>سعر بوكينج</th><th style="width:120px;"><div style="display:flex; align-items:center; justify-content:center; gap:8px;"><span>أوامر</span><button class="btn-add-row-header" onclick="addAdminRow('c')" title="إضافة صف جديد">➕</button></div></th></tr></thead>
                        <tbody id="body_corniche">
                            <tr data-row="1"><td><input type="text" id="c_n1" value="تؤم وكينج" class="unit-name-input" placeholder="اسم الوحدة" onkeydown="handleTableNavigation(event, this, 'c', 1)" onfocus="confirmUnitNameChange(this, 'c', 1)" data-original-value="تؤم وكينج"></td><td><input type="number" id="c_p1" value="230" oninput="calc('c',1)" class="calc-input" onkeydown="handleTableNavigation(event, this, 'c', 1)"></td><td><input type="number" id="c_r1" value="45" oninput="calc('c',1)" class="calc-input rate-input" onkeydown="handleTableNavigation(event, this, 'c', 1)"></td><td><input type="number" id="c_b1" class="calc-input calc-readonly" readonly></td><td class="action-buttons"><button class="btn-delete-row" onclick="deleteAdminRow('c',1)" title="حذف صف">🗑️</button></td></tr>
                            <tr data-row="2"><td><input type="text" id="c_n2" value="ستوديو" class="unit-name-input" placeholder="اسم الوحدة" onkeydown="handleTableNavigation(event, this, 'c', 2)" onfocus="confirmUnitNameChange(this, 'c', 2)" data-original-value="ستوديو"></td><td><input type="number" id="c_p2" value="340" oninput="calc('c',2)" class="calc-input" onkeydown="handleTableNavigation(event, this, 'c', 2)"></td><td><input type="number" id="c_r2" value="45" oninput="calc('c',2)" class="calc-input rate-input" onkeydown="handleTableNavigation(event, this, 'c', 2)"></td><td><input type="number" id="c_b2" class="calc-input calc-readonly" readonly></td><td class="action-buttons"><button class="btn-delete-row" onclick="deleteAdminRow('c',2)" title="حذف صف">🗑️</button></td></tr>
                            <tr data-row="3"><td><input type="text" id="c_n3" value="شقة غرفة وصالة" class="unit-name-input" placeholder="اسم الوحدة" onkeydown="handleTableNavigation(event, this, 'c', 3)" onfocus="confirmUnitNameChange(this, 'c', 3)" data-original-value="شقة غرفة وصالة"></td><td><input type="number" id="c_p3" value="370" oninput="calc('c',3)" class="calc-input" onkeydown="handleTableNavigation(event, this, 'c', 3)"></td><td><input type="number" id="c_r3" value="45" oninput="calc('c',3)" class="calc-input rate-input" onkeydown="handleTableNavigation(event, this, 'c', 3)"></td><td><input type="number" id="c_b3" class="calc-input calc-readonly" readonly></td><td class="action-buttons"><button class="btn-delete-row" onclick="deleteAdminRow('c',3)" title="حذف صف">🗑️</button></td></tr>
                            <tr data-row="4"><td><input type="text" id="c_n4" value="غرفتين وصالة" class="unit-name-input" placeholder="اسم الوحدة" onkeydown="handleTableNavigation(event, this, 'c', 4)" onfocus="confirmUnitNameChange(this, 'c', 4)" data-original-value="غرفتين وصالة"></td><td><input type="number" id="c_p4" value="400" oninput="calc('c',4)" class="calc-input" onkeydown="handleTableNavigation(event, this, 'c', 4)"></td><td><input type="number" id="c_r4" value="45" oninput="calc('c',4)" class="calc-input rate-input" onkeydown="handleTableNavigation(event, this, 'c', 4)"></td><td><input type="number" id="c_b4" class="calc-input calc-readonly" readonly></td><td class="action-buttons"><button class="btn-delete-row" onclick="deleteAdminRow('c',4)" title="حذف صف">🗑️</button></td></tr>
                            <tr data-row="5"><td><input type="text" id="c_n5" value="VIP" class="unit-name-input" placeholder="اسم الوحدة" onkeydown="handleTableNavigation(event, this, 'c', 5)" onfocus="confirmUnitNameChange(this, 'c', 5)" data-original-value="VIP"></td><td><input type="number" id="c_p5" value="850" oninput="calc('c',5)" class="calc-input" onkeydown="handleTableNavigation(event, this, 'c', 5)"></td><td><input type="number" id="c_r5" value="45" oninput="calc('c',5)" class="calc-input rate-input" onkeydown="handleTableNavigation(event, this, 'c', 5)"></td><td><input type="number" id="c_b5" class="calc-input calc-readonly" readonly></td><td class="action-buttons"><button class="btn-delete-row" onclick="deleteAdminRow('c',5)" title="حذف صف">🗑️</button></td></tr>
                        </tbody>
                    </table>
                </div>
                    <div class="branch-actions">
                        <button class="btn-download" onclick="printPricingAdmin('corniche')">🖨️ طباعة القائمة (الكورنيش)</button>
                    </div>
                </div>
                
                <div id="andalus" class="admin-branch-card" style="margin-top: 30px;">
                    <div class="branch-header">
                        <h2 class="branch-title">🏰 فرع الأندلس</h2>
                    </div>
                <div class="unify-control-group" style="display:flex; align-items:center; gap:12px; margin-bottom:20px; padding:12px; background:rgba(255,255,255,0.03); border-radius:10px; border:1px solid rgba(255,255,255,0.1);">
                    <input type="checkbox" id="unifyA" onchange="setUnify('a')" style="width:18px; height:18px; cursor:pointer; accent-color:#2CB1E1;">
                    <label for="unifyA" style="cursor:pointer; font-weight:600; font-size:0.95rem; color:#FFFFFF; margin:0; user-select:none;">توحيد النسبة</label>
                    <input type="number" id="rateA" value="45" onchange="setUnify('a')" class="calc-input rate-input" style="width:70px; margin:0;">
                    <span style="color:#FFFFFF; font-weight:600; font-size:0.95rem;">%</span>
                </div>
                <div class="table-responsive">
                    <table class="std-table">
                        <thead><tr><th>الوحدة</th><th>السعر الأساسي</th><th>الزيادة %</th><th>سعر بوكينج</th><th style="width:120px;"><div style="display:flex; align-items:center; justify-content:center; gap:8px;"><span>أوامر</span><button class="btn-add-row-header" onclick="addAdminRow('a')" title="إضافة صف جديد">➕</button></div></th></tr></thead>
                        <tbody id="body_andalus">
                            <tr data-row="1"><td><input type="text" id="a_n1" value="غرفة خلفية تؤم" class="unit-name-input" placeholder="اسم الوحدة" onkeydown="handleTableNavigation(event, this, 'a', 1)" onfocus="confirmUnitNameChange(this, 'a', 1)" data-original-value="غرفة خلفية تؤم"></td><td><input type="number" id="a_p1" value="190" oninput="calc('a',1)" class="calc-input" onkeydown="handleTableNavigation(event, this, 'a', 1)"></td><td><input type="number" id="a_r1" value="45" oninput="calc('a',1)" class="calc-input rate-input" onkeydown="handleTableNavigation(event, this, 'a', 1)"></td><td><input type="number" id="a_b1" class="calc-input calc-readonly" readonly></td><td class="action-buttons"><button class="btn-delete-row" onclick="deleteAdminRow('a',1)" title="حذف صف">🗑️</button></td></tr>
                            <tr data-row="2"><td><input type="text" id="a_n2" value="غرفة خلفية كينج" class="unit-name-input" placeholder="اسم الوحدة" onkeydown="handleTableNavigation(event, this, 'a', 2)" onfocus="confirmUnitNameChange(this, 'a', 2)" data-original-value="غرفة خلفية كينج"></td><td><input type="number" id="a_p2" value="205" oninput="calc('a',2)" class="calc-input" onkeydown="handleTableNavigation(event, this, 'a', 2)"></td><td><input type="number" id="a_r2" value="45" oninput="calc('a',2)" class="calc-input rate-input" onkeydown="handleTableNavigation(event, this, 'a', 2)"></td><td><input type="number" id="a_b2" class="calc-input calc-readonly" readonly></td><td class="action-buttons"><button class="btn-delete-row" onclick="deleteAdminRow('a',2)" title="حذف صف">🗑️</button></td></tr>
                            <tr data-row="3"><td><input type="text" id="a_n3" value="ستوديو شارع" class="unit-name-input" placeholder="اسم الوحدة" onkeydown="handleTableNavigation(event, this, 'a', 3)" onfocus="confirmUnitNameChange(this, 'a', 3)" data-original-value="ستوديو شارع"></td><td><input type="number" id="a_p3" value="220" oninput="calc('a',3)" class="calc-input" onkeydown="handleTableNavigation(event, this, 'a', 3)"></td><td><input type="number" id="a_r3" value="45" oninput="calc('a',3)" class="calc-input rate-input" onkeydown="handleTableNavigation(event, this, 'a', 3)"></td><td><input type="number" id="a_b3" class="calc-input calc-readonly" readonly></td><td class="action-buttons"><button class="btn-delete-row" onclick="deleteAdminRow('a',3)" title="حذف صف">🗑️</button></td></tr>
                            <tr data-row="4"><td><input type="text" id="a_n4" value="غرفة وصالة شارع" class="unit-name-input" placeholder="اسم الوحدة" onkeydown="handleTableNavigation(event, this, 'a', 4)" onfocus="confirmUnitNameChange(this, 'a', 4)" data-original-value="غرفة وصالة شارع"></td><td><input type="number" id="a_p4" value="290" oninput="calc('a',4)" class="calc-input" onkeydown="handleTableNavigation(event, this, 'a', 4)"></td><td><input type="number" id="a_r4" value="45" oninput="calc('a',4)" class="calc-input rate-input" onkeydown="handleTableNavigation(event, this, 'a', 4)"></td><td><input type="number" id="a_b4" class="calc-input calc-readonly" readonly></td><td class="action-buttons"><button class="btn-delete-row" onclick="deleteAdminRow('a',4)" title="حذف صف">🗑️</button></td></tr>
                            <tr data-row="5"><td><input type="text" id="a_n5" value="غرفتين خلفي" class="unit-name-input" placeholder="اسم الوحدة" onkeydown="handleTableNavigation(event, this, 'a', 5)" onfocus="confirmUnitNameChange(this, 'a', 5)" data-original-value="غرفتين خلفي"></td><td><input type="number" id="a_p5" value="390" oninput="calc('a',5)" class="calc-input" onkeydown="handleTableNavigation(event, this, 'a', 5)"></td><td><input type="number" id="a_r5" value="45" oninput="calc('a',5)" class="calc-input rate-input" onkeydown="handleTableNavigation(event, this, 'a', 5)"></td><td><input type="number" id="a_b5" class="calc-input calc-readonly" readonly></td><td class="action-buttons"><button class="btn-delete-row" onclick="deleteAdminRow('a',5)" title="حذف صف">🗑️</button></td></tr>
                            <tr data-row="6"><td><input type="text" id="a_n6" value="غرفتين وصالة شارع" class="unit-name-input" placeholder="اسم الوحدة" onkeydown="handleTableNavigation(event, this, 'a', 6)" onfocus="confirmUnitNameChange(this, 'a', 6)" data-original-value="غرفتين وصالة شارع"></td><td><input type="number" id="a_p6" value="420" oninput="calc('a',6)" class="calc-input" onkeydown="handleTableNavigation(event, this, 'a', 6)"></td><td><input type="number" id="a_r6" value="45" oninput="calc('a',6)" class="calc-input rate-input" onkeydown="handleTableNavigation(event, this, 'a', 6)"></td><td><input type="number" id="a_b6" class="calc-input calc-readonly" readonly></td><td class="action-buttons"><button class="btn-delete-row" onclick="deleteAdminRow('a',6)" title="حذف صف">🗑️</button></td></tr>
                            <tr data-row="7"><td><input type="text" id="a_n7" value="VIP 601" class="unit-name-input" placeholder="اسم الوحدة" onkeydown="handleTableNavigation(event, this, 'a', 7)" onfocus="confirmUnitNameChange(this, 'a', 7)" data-original-value="VIP 601"></td><td><input type="number" id="a_p7" value="570" oninput="calc('a',7)" class="calc-input" onkeydown="handleTableNavigation(event, this, 'a', 7)"></td><td><input type="number" id="a_r7" value="45" oninput="calc('a',7)" class="calc-input rate-input" onkeydown="handleTableNavigation(event, this, 'a', 7)"></td><td><input type="number" id="a_b7" class="calc-input calc-readonly" readonly></td><td class="action-buttons"><button class="btn-delete-row" onclick="deleteAdminRow('a',7)" title="حذف صف">🗑️</button></td></tr>
                            <tr data-row="8"><td><input type="text" id="a_n8" value="VIP 602" class="unit-name-input" placeholder="اسم الوحدة" onkeydown="handleTableNavigation(event, this, 'a', 8)" onfocus="confirmUnitNameChange(this, 'a', 8)" data-original-value="VIP 602"></td><td><input type="number" id="a_p8" value="370" oninput="calc('a',8)" class="calc-input" onkeydown="handleTableNavigation(event, this, 'a', 8)"></td><td><input type="number" id="a_r8" value="45" oninput="calc('a',8)" class="calc-input rate-input" onkeydown="handleTableNavigation(event, this, 'a', 8)"></td><td><input type="number" id="a_b8" class="calc-input calc-readonly" readonly></td><td class="action-buttons"><button class="btn-delete-row" onclick="deleteAdminRow('a',8)" title="حذف صف">🗑️</button></td></tr>
                            <tr data-row="9"><td><input type="text" id="a_n9" value="VIP 604" class="unit-name-input" placeholder="اسم الوحدة" onkeydown="handleTableNavigation(event, this, 'a', 9)" onfocus="confirmUnitNameChange(this, 'a', 9)" data-original-value="VIP 604"></td><td><input type="number" id="a_p9" value="320" oninput="calc('a',9)" class="calc-input" onkeydown="handleTableNavigation(event, this, 'a', 9)"></td><td><input type="number" id="a_r9" value="45" oninput="calc('a',9)" class="calc-input rate-input" onkeydown="handleTableNavigation(event, this, 'a', 9)"></td><td><input type="number" id="a_b9" class="calc-input calc-readonly" readonly></td><td class="action-buttons"><button class="btn-delete-row" onclick="deleteAdminRow('a',9)" title="حذف صف">🗑️</button></td></tr>
                        </tbody>
                    </table>
                    </div>
                    <div class="branch-actions">
                        <button class="btn-download" onclick="printPricingAdmin('andalus')">🖨️ طباعة القائمة (الأندلس)</button>
                    </div>
                </div>
            </div>
        `;
    }

    init() {
        // Wait for Chart.js to be available (it's loaded with defer in index.html)
        const initWhenReady = () => {
            if (typeof Chart === 'undefined') {
                // Chart.js should be loaded via defer, but if not, wait a bit
                setTimeout(initWhenReady, 100);
                return;
            }
            this.initializePricing();
        };
        
        // Use requestAnimationFrame for better performance
        window.requestAnimationFrame(initWhenReady);
    }

    initializePricing() {
        // Wait for DOM to be fully ready using requestAnimationFrame
        const checkAndInit = () => {
            const branchSelect = document.getElementById('branchSelectR');
            const occupancyInput = document.getElementById('occupancyInputR');
            const tableBody = document.getElementById('tableBodyR');
            
            if (!branchSelect || !occupancyInput || !tableBody) {
                window.requestAnimationFrame(checkAndInit);
                return;
            }
            
            // Enhance dropdowns with smooth interactions
            this.enhanceDropdowns();
            
            // Initialize Admin Pricing first
            window.requestAnimationFrame(() => {
                for(let i=1; i<=5; i++) {
                    if (typeof calc === 'function') calc('c', i);
                }
                for(let i=1; i<=9; i++) {
                    if (typeof calc === 'function') calc('a', i);
                }
            });
            
            // Initialize Reception Pricing
            window.requestAnimationFrame(() => {
                branchSelect.value = 'cornish';
                occupancyInput.value = 0;
                if (typeof updateAllR === 'function') {
                    updateAllR('initialLoad');
                }
            });
        };
        
        window.requestAnimationFrame(checkAndInit);
    }

    enhanceDropdowns() {
        // Enhance all select dropdowns with smooth animations
        const selects = document.querySelectorAll('select.strong-input-R');
        
        selects.forEach(select => {
            // Add wrapper for better styling
            if (!select.parentElement.classList.contains('custom-select-wrapper')) {
                const wrapper = document.createElement('div');
                wrapper.className = 'custom-select-wrapper';
                select.parentNode.insertBefore(wrapper, select);
                wrapper.appendChild(select);
            }
            
            // Add smooth focus/blur effects
            select.addEventListener('focus', function() {
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 0 0 3px rgba(44, 177, 225, 0.25), 0 4px 16px rgba(44, 177, 225, 0.2)';
            });
            
            select.addEventListener('blur', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '';
            });
            
            // Add change animation
            select.addEventListener('change', function() {
                // Add a subtle pulse effect on change
                this.style.animation = 'dropdownFadeIn 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                setTimeout(() => {
                    this.style.animation = '';
                }, 300);
            });
            
            // Add hover effect
            select.addEventListener('mouseenter', function() {
                if (document.activeElement !== this) {
                    this.style.borderColor = 'rgba(44, 177, 225, 0.4)';
                    this.style.background = 'rgba(255, 255, 255, 0.07)';
                    this.style.transform = 'translateY(-1px)';
                    this.style.boxShadow = '0 4px 12px rgba(44, 177, 225, 0.15)';
                }
            });
            
            select.addEventListener('mouseleave', function() {
                if (document.activeElement !== this) {
                    this.style.borderColor = 'rgba(100, 200, 255, 0.2)';
                    this.style.background = 'rgba(255, 255, 255, 0.05)';
                    this.style.transform = 'translateY(0)';
                    this.style.boxShadow = '';
                }
            });
        });
    }

    // Functions from old code - نسخت بالضبط
    getBaseTierR(p){
        if(p < 60) return this.TIERS_R.UNDER60;
        if(p >= 60 && p < 70) return this.TIERS_R.OVER60;
        if(p >= 70 && p < 80) return this.TIERS_R.OVER70;
        if(p >= 80 && p < 90) return this.TIERS_R.OVER80;
        if(p >= 90) return this.TIERS_R.SEASON;
        return this.TIERS_R.UNDER60;
    }

    updateChartExplanationR(occupancy){
        const el = document.getElementById('chartExplanationR');
        let text = '';
        if(occupancy <= 60) text = 'الوضع سيئ ويدعو للقلق';
        else if(occupancy <= 70) text = 'شد شويه هتحسن الإشغال، هانت';
        else if(occupancy <= 85) text = 'وضعك مستقر ولكن في مجال للتحسين';
        else text = 'وضعك الآن صار ممتاز، شوية ونحتفل بك يا بطل!';
        el.innerText = text;
    }

    generateSmartAdviceR(occupancy){
        const box = document.getElementById('smartAdviceBoxR');
        const title = document.getElementById('adviceTitleR');
        const content = document.getElementById('adviceContentR');

        box.className = 'card-R';
        box.style.borderLeftColor = 'var(--pr-accent-1)';
        title.style.color = 'var(--pr-accent-1)';
        content.className = 'alert-box';

        // Clear content first
        title.innerHTML = '';
        content.innerHTML = '';
        
        if(occupancy >= 86){
            box.classList.add('celebratory-glow-R','party-box-R');
            const medalIcon = document.createElement('i');
            medalIcon.className = 'fas fa-medal';
            title.appendChild(medalIcon);
            title.appendChild(document.createTextNode(' احتفال اليوم!'));
            title.style.color = 'var(--text-main)';
            
            const strong = document.createElement('strong');
            strong.textContent = 'تهانينا!';
            content.appendChild(strong);
            content.appendChild(document.createTextNode(' لقد أديت أداءً رائعاً، إشغالك تجاوز الـ 86%. استغل هذا المستوى في تحصيل أفضل سعر ممكن!'));
        } else if(occupancy === 0){
            const warningSpan = document.createElement('span');
            warningSpan.style.color = 'var(--pr-warning)';
            const warningIcon = document.createElement('i');
            warningIcon.className = 'fas fa-exclamation-triangle';
            warningSpan.appendChild(warningIcon);
            content.appendChild(warningSpan);
            content.appendChild(document.createTextNode(' '));
            const strong = document.createElement('strong');
            strong.textContent = 'انتبه!';
            content.appendChild(strong);
            content.appendChild(document.createTextNode(' النسبة صفر، يفضل البدء بنسبة واقعية للحصول على تسعير صحيح.'));
        } else if(occupancy < 65){
            const accentSpan = document.createElement('span');
            accentSpan.style.color = 'var(--pr-accent-1)';
            const bullhornIcon = document.createElement('i');
            bullhornIcon.className = 'fas fa-bullhorn';
            accentSpan.appendChild(bullhornIcon);
            content.appendChild(accentSpan);
            content.appendChild(document.createTextNode(' '));
            const strong = document.createElement('strong');
            strong.textContent = 'يا بطل!';
            content.appendChild(strong);
            content.appendChild(document.createTextNode(' لديك شاغر كبير. اضغط على الوحدات المتاحة 5+ لتفعيل '));
            const b = document.createElement('b');
            b.textContent = 'الطوارئ';
            content.appendChild(b);
            content.appendChild(document.createTextNode(' والمنافسة بقوة.'));
        } else {
            const accentSpan = document.createElement('span');
            accentSpan.style.color = 'var(--pr-accent-2)';
            const chartIcon = document.createElement('i');
            chartIcon.className = 'fas fa-chart-line';
            accentSpan.appendChild(chartIcon);
            content.appendChild(accentSpan);
            content.appendChild(document.createTextNode(' '));
            const strong = document.createElement('strong');
            strong.textContent = 'وضع مستقر!';
            content.appendChild(strong);
            content.appendChild(document.createTextNode(' قم بتحصيل أفضل سعر. لو عدد الغرف 4، طبّق خصم الوفرة لجذب حجوزات إضافية.'));
        }
    }

    generateAIHintR(branch, data, occupancy){
        const targetUnit = data.find(u => u.name.includes('غرفتين') || u.name.includes('VIP')) || data[0];
        let suggestion = 'لا توجد توصيات فورية.';
        let change = 0;

        if(occupancy >= 80) change = 25;
        else if(occupancy < 60) change = -15;

        if(change !== 0){
            const sign = change > 0 ? '+' : '';
            const safeUnitName = typeof sanitizeText === 'function' ? sanitizeText(targetUnit.name) : targetUnit.name;
            suggestion = `بناءً على الإشغال الحالي، السعر المثالي لـ ${safeUnitName} هو <strong>${sign}${change} ريال</strong> لتعظيم الربح.`;
        }
        const hintSpan = document.querySelector('#aiHintBoxR span');
        if (hintSpan) {
            const sanitized = typeof sanitizeHTML === 'function' ? sanitizeHTML(suggestion) : suggestion;
            hintSpan.innerHTML = sanitized;
        }
    }

    updateBranchStatusPulseR(occupancy){
        const pulse = document.getElementById('branchStatusPulseR');
        pulse.className = 'status-pulse-R';
        if(occupancy > 90)      pulse.classList.add('status-overload-R','overload-shake-R');
        else if(occupancy > 80) pulse.classList.add('status-high-R');
        else if(occupancy > 60) pulse.classList.add('status-medium-R');
        else                    pulse.classList.add('status-low-R');
    }

    getDisplayedPriceR(finalDaily, item, pricingMode){
        if (pricingMode === 'daily') {
            return finalDaily;
        }
        if (pricingMode === 'monthly-normal') {
            return item.monthlyNormal;
        }
        if (pricingMode === 'monthly-company') {
            return item.monthlyNormal * 0.95;
        }
        if (pricingMode === 'monthly-season') {
            return item.monthlySeason;
        }
        return finalDaily;
    }

    updateAllR(callerId){
        const branch = document.getElementById('branchSelectR').value;
        const occupancyInput = document.getElementById('occupancyInputR');
        const pricingMode = document.getElementById('pricingModeR').value;

        let occupancy = parseInt(occupancyInput.value) || 0;
        if(occupancy > 100){ occupancy = 100; occupancyInput.value = 100; }

        document.getElementById('occupancyDisplayR').innerText = occupancy + '%';
        updateChartR(occupancy);
        generateSmartAdviceR(occupancy);
        updateChartExplanationR(occupancy);
        updateBranchStatusPulseR(occupancy);

        const baseTier = getBaseTierR(occupancy);
        const tierNames = ["طوارئ ⚡","منخفض (<60%)","متوسط (>60%)","جيد (>70%)","مرتفع (>80%)","🔥 موسم"];
        document.getElementById('currentTierLabelR').innerText = tierNames[baseTier];

        const data = this.dbR[branch];
        const tableWrapper = document.getElementById('tableWrapperR');

        if(callerId === 'branchSelectR'){
            tableWrapper.style.opacity = 0;
            setTimeout(() => {
                renderTableBodyR();
                tableWrapper.style.opacity = 1;
            }, 350);
            return;
        }

        renderTableBodyR();

        function renderTableBodyR(){
            let html = '';
            this.newPricesR = {};
            const isMonthlyMode = (pricingMode !== 'daily');

            // إظهار/إخفاء عمود "العدد المتاح" حسب وضع التسعير
            const countColumnHeader = document.getElementById('countColumnHeader');
            if(countColumnHeader) {
                countColumnHeader.style.display = isMonthlyMode ? 'none' : 'table-cell';
            }

            data.forEach((item, index) => {
                const uid = branch + index;
                const count = this.unitCountsR[uid] !== undefined ? this.unitCountsR[uid] : 0;

                let finalTier = isMonthlyMode ? this.TIERS_R.UNDER60 : baseTier;
                let badgeClass = 'pill-blue-R';
                let statusMsg = 'السعر الأساسي';
                let statusIcon = '💼';
                let statusClass = 'status-normal';
                let statusBg = 'rgba(100, 200, 255, 0.1)';
                let statusBorder = 'rgba(100, 200, 255, 0.3)';

                const isTargeted =
                    (branch === 'cornish' && (item.name.includes('تؤم') || item.name.includes('VIP'))) ||
                    (branch === 'andalus' && item.name.includes('VIP'));

                if (!isMonthlyMode) {
                    if(count >= 5){
                        finalTier = this.TIERS_R.EMG;
                        badgeClass = 'pill-red-R';
                        statusMsg = 'سعر الإغراق';
                        statusIcon = '🔥';
                        statusClass = 'status-danger';
                        statusBg = 'rgba(239, 68, 68, 0.15)';
                        statusBorder = 'rgba(239, 68, 68, 0.4)';
                    } else if(count === 4){
                        if(finalTier > this.TIERS_R.UNDER60){
                            finalTier -= 1;
                            badgeClass = 'pill-green-R';
                            statusMsg = 'خصم 4 وحدات';
                            statusIcon = '🎯';
                            statusClass = 'status-success';
                            statusBg = 'rgba(16, 185, 129, 0.15)';
                            statusBorder = 'rgba(16, 185, 129, 0.4)';
                        } else {
                            statusMsg = 'أقل سعر ممكن';
                            statusIcon = '⚡';
                            statusClass = 'status-warning';
                            statusBg = 'rgba(245, 158, 11, 0.15)';
                            statusBorder = 'rgba(245, 158, 11, 0.4)';
                        }
                    } else if(isTargeted && (count === 1 || count === 2)){
                        if(finalTier > this.TIERS_R.UNDER60){
                            finalTier -= 1;
                            badgeClass = 'pill-green-R';
                            statusMsg = 'خصم ندرة (1-2 وحدة)';
                            statusIcon = '💎';
                            statusClass = 'status-success';
                            statusBg = 'rgba(16, 185, 129, 0.15)';
                            statusBorder = 'rgba(16, 185, 129, 0.4)';
                        } else {
                            statusMsg = 'أقل سعر ممكن';
                            statusIcon = '⚡';
                            statusClass = 'status-warning';
                            statusBg = 'rgba(245, 158, 11, 0.15)';
                            statusBorder = 'rgba(245, 158, 11, 0.4)';
                        }
                    } else if(count >= 1 && count <= 3){
                        statusMsg = 'السعر الأساسي';
                        statusIcon = '✅';
                        statusClass = 'status-normal';
                        statusBg = 'rgba(100, 200, 255, 0.1)';
                        statusBorder = 'rgba(100, 200, 255, 0.3)';
                    } else if(count === 0){
                        statusMsg = 'مغلق/غير متاح';
                        statusIcon = '🔒';
                        statusClass = 'status-closed';
                        statusBg = 'rgba(107, 114, 128, 0.15)';
                        statusBorder = 'rgba(107, 114, 128, 0.3)';
                    }
                } else {
                    badgeClass = 'pill-blue-R';
                    statusMsg = 'سعر شهري ثابت';
                    statusIcon = '📅';
                    statusClass = 'status-monthly';
                    statusBg = 'rgba(59, 130, 246, 0.15)';
                    statusBorder = 'rgba(59, 130, 246, 0.4)';
                }

                const finalDailyPrice = item.prices[finalTier];
                const displayedPrice = getDisplayedPriceR(finalDailyPrice, item, pricingMode);

                const priceKey = uid + '|' + pricingMode;
                const pricePulseClass =
                    this.previousPricesR[priceKey] !== undefined && this.previousPricesR[priceKey] !== Math.round(displayedPrice)
                        ? 'price-pulse-R' : '';
                this.newPricesR[priceKey] = Math.round(displayedPrice);

                const inputValue = (count === 0) ? '' : count;
                const monthlyStyle = isMonthlyMode ? 'background:#e8f0ff; color:#1a3f8b;' : '';

                // إظهار/إخفاء خلية "العدد المتاح" حسب وضع التسعير
                const countCellStyle = isMonthlyMode ? 'display:none;' : 'text-align:center;';

                html += `
                    <tr>
                        <td style="font-weight:700; color:var(--text-main);">
                            ${item.name}
                        </td>
                        <td style="${countCellStyle}">
                            <input
                                type="text"
                                class="table-input-R"
                                value="${inputValue}"
                                placeholder="0"
                                oninput="handleCountInputR(event, '${uid}')"
                                onblur="if(this.value===''){ this.value='0'; handleCountInputR(event, '${uid}'); }"
                                onkeydown="if(event.key==='Enter' || event.key==='Tab'){ event.preventDefault(); const next=this.closest('tr').nextElementSibling?.querySelector('.table-input-R') || this.closest('table').querySelector('.table-input-R'); if(next){ next.focus(); next.select(); } }"
                                style="width:100px; min-width:100px; max-width:100px; text-align:center; font-size:1.1rem; padding:12px 14px;"
                            >
                        </td>
                        <td>
                            <div class="price-pill-R ${badgeClass} ${pricePulseClass}" style="${monthlyStyle}">
                                <span style="font-weight:800; font-size:1rem;">${Math.round(displayedPrice)}</span>
                                <span class="price-currency">ر.س</span>
                                ${isMonthlyMode ? '<span class="price-period">/ شهر</span>' : ''}
                            </div>
                        </td>
                        <td>
                            <div class="status-badge ${statusClass}" style="background:${statusBg}; border:2px solid ${statusBorder};">
                                <span class="status-icon">${statusIcon}</span>
                                <span class="status-text">${statusMsg}</span>
                            </div>
                        </td>
                        <td class="action-buttons">
                            <button class="btn-delete-row" onclick="deleteReceptionRow('${uid}')" title="حذف صف">🗑️</button>
                        </td>
                    </tr>
                `;
            });

            const tableBody = document.getElementById('tableBodyR');
            if (tableBody) {
                const sanitized = typeof sanitizeHTML === 'function' ? sanitizeHTML(html) : html;
                tableBody.innerHTML = sanitized;
            }
            this.previousPricesR = this.newPricesR;
            generateAIHintR(branch, data, occupancy);
        }
    }

    handleCountInputR(e, id){
        let value = e.target.value || '';
        // Allow only digits - keep all digits entered
        const cleaned = value.replace(/[^0-9]/g,'');
        // Update the input value if needed
        if (cleaned !== value) {
            e.target.value = cleaned;
        }
        // Update the count immediately with the cleaned value
        this.unitCountsR[id] = cleaned === '' ? 0 : parseInt(cleaned, 10) || 0;
        // Update all calculations
        updateAllR();
    }

    setCountR(id, val){
        const numVal = val === '' ? 0 : parseInt(val, 10) || 0;
        this.unitCountsR[id] = numVal;
        updateAllR();
    }

    updateChartR(val){
        const ctx = document.getElementById('occupancyChartR').getContext('2d');
        if(this.chartInstanceR) this.chartInstanceR.destroy();

        // تحسين الألوان بناءً على النسب - تدرج جميل
        let colorHex = '';
        let freeColor = 'rgba(255, 255, 255, 0.1)';
        
        if(val >= 90) {
            // ممتاز - ذهبي/أزرق فاتح
            colorHex = '#FFD700'; // ذهبي
            freeColor = 'rgba(255, 215, 0, 0.15)';
        } else if(val >= 80) {
            // جيد جداً - أزرق فاتح
            colorHex = '#00D4FF'; // أزرق فاتح
            freeColor = 'rgba(0, 212, 255, 0.15)';
        } else if(val >= 70) {
            // جيد - أخضر فاتح
            colorHex = '#10B981'; // أخضر
            freeColor = 'rgba(16, 185, 129, 0.15)';
        } else if(val >= 60) {
            // متوسط - أصفر/برتقالي فاتح
            colorHex = '#F59E0B'; // برتقالي
            freeColor = 'rgba(245, 158, 11, 0.15)';
        } else if(val >= 40) {
            // منخفض - برتقالي/أحمر فاتح
            colorHex = '#F97316'; // برتقالي محمر
            freeColor = 'rgba(249, 115, 22, 0.15)';
        } else if(val >= 20) {
            // سيء - أحمر فاتح
            colorHex = '#EF4444'; // أحمر
            freeColor = 'rgba(239, 68, 68, 0.15)';
        } else {
            // سيء جداً - أحمر داكن
            colorHex = '#DC2626'; // أحمر داكن
            freeColor = 'rgba(220, 38, 38, 0.15)';
        }

        // تحديث لون النص في المنتصف
        const displayEl = document.getElementById('occupancyDisplayR');
        if(displayEl) {
            displayEl.style.color = colorHex;
            displayEl.style.textShadow = `0 0 10px ${colorHex}40, 0 0 20px ${colorHex}20`;
        }

        const cardElement = document.getElementById('occupancyChartR').closest('.card-R');
        cardElement.className = 'card-R';
        if(val >= 85) {
            cardElement.classList.add('celebratory-glow-R','party-box-R');
        }

        this.chartInstanceR = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Used','Free'],
                datasets: [{
                    data: [val, 100 - val],
                    backgroundColor: [colorHex, freeColor],
                    borderColor: val >= 80 ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.2)',
                    borderWidth: val >= 80 ? 3 : 2,
                    borderRadius: 25
                }]
            },
            options: {
                cutout: '80%',
                responsive: true,
                maintainAspectRatio: false,
                plugins: { 
                    legend: { display: false }, 
                    tooltip: { enabled: false } 
                },
                animation: { 
                    duration: 600,
                    easing: 'easeOutQuart'
                }
            }
        });
    }

    printReceptionPricing() {
        const tableBody = document.getElementById('tableBodyR');
        const title = document.getElementById('branchSelectR').value === 'cornish' ? 'قائمة أسعار الاستقبال (الكورنيش)' : 'قائمة أسعار الاستقبال (الأندلس)';
        const tier = document.getElementById('currentTierLabelR').innerText;
        const occupancy = document.getElementById('occupancyInputR').value || '0';
        const mode = document.getElementById('pricingModeR').options[document.getElementById('pricingModeR').selectedIndex].text;

        let tableHTML = `<table class="prof-table">
            <thead>
                <tr style="background:#eee; font-weight:bold;">
                    <th style="border:2px solid #000; padding:12px; text-align:right;">الوحدة</th>
                    <th style="border:2px solid #000; padding:12px;">العدد المتاح</th>
                    <th style="border:2px solid #000; padding:12px;">السعر المقترح</th>
                    <th style="border:2px solid #000; padding:12px;">تحليل الحالة</th>
                </tr>
            </thead>
            <tbody>`;
        
        const rows = tableBody.querySelectorAll('tr');
        rows.forEach(row => {
            const name = row.cells[0].innerText;
            const count = row.cells[1].querySelector('input').value || '0';
            const price = row.cells[2].innerText.replace(/\s+/g, ' ').trim();
            const status = row.cells[3].innerText.replace('ℹ️', '').trim();
            tableHTML += `<tr>
                <td style="border:2px solid #000; padding:12px; font-weight:bold; text-align:right;">${name}</td>
                <td style="border:2px solid #000; padding:12px;">${count}</td>
                <td style="border:2px solid #000; padding:12px; background:#f9f9f9; font-weight:bold;">${price}</td>
                <td style="border:2px solid #000; padding:12px;">${status}</td>
            </tr>`;
        });
        tableHTML += `</tbody></table>`;
        
        document.getElementById('printArea').innerHTML = `
            <div class="prof-report-container">
                <div class="prof-header">
                    <h1>${title}</h1>
                    <p>وضع التسعير: ${mode} | نسبة الإشغال: ${occupancy}% | الفئة: ${tier}</p>
                </div>
                ${tableHTML}
                <div class="prof-footer"><div>توقيع المسؤول<br><br>.........................</div><div> المدير العام <br><br>.........................</div></div>
                <div style="text-align: center; margin-top: 40px; padding-top: 25px; border-top: 2px solid #000; font-size: 11px; color: #333; font-weight: 600; line-height: 1.8;">
                    <div style="margin-bottom: 8px;">تم التنفيذ بواسطة:</div>
                    <div style="font-size: 12px; font-weight: 700; color: #000; margin-bottom: 5px;">أيمن أبو ورده</div>
                    <div style="font-size: 10px; color: #555;">0570707121 - 77aayy@gmail.com</div>
                </div>
            </div>
        `;
        window.print();
    }

    printPricingAdmin(sectionId) {
        const tbody = document.getElementById('body_' + sectionId);
        const title = sectionId === 'corniche' ? 'قائمة أسعار بوكينج الإدارية - الكورنيش' : 'قائمة أسعار بوكينج الإدارية - الأندلس';
        let tableHTML = `<table style="width:100%; border-collapse:collapse; text-align:center;"><thead><tr style="background:#eee; font-weight:bold;"><th style="border:1px solid #000; padding:10px;">الوحدة</th><th style="border:1px solid #000; padding:10px;">السعر الأساسي</th><th style="border:1px solid #000; padding:10px;">الزيادة %</th><th style="border:1px solid #000; padding:10px;">سعر بوكينج</th></tr></thead><tbody>`;
        const rows = tbody.querySelectorAll('tr');
        rows.forEach(row => {
            const cols = row.querySelectorAll('td');
            const unitName = cols[0].querySelector('input') ? cols[0].querySelector('input').value : cols[0].innerText;
            tableHTML += `<tr><td style="border:1px solid #000; padding:10px; font-weight:bold;">${unitName}</td><td style="border:1px solid #000; padding:10px;">${cols[1].querySelector('input').value}</td><td style="border:1px solid #000; padding:10px;">${cols[2].querySelector('input').value}</td><td style="border:1px solid #000; padding:10px; background:#f9f9f9; font-weight:bold;">${cols[3].querySelector('input').value}</td></tr>`;
        });
        tableHTML += `</tbody></table>`;
        document.getElementById('printArea').innerHTML = `
            <div class="prof-report-container">
                <div class="prof-header">
                    <h1>${title}</h1>
                </div>
                ${tableHTML}
                <div class="prof-footer"><div>توقيع المسؤول: ...........................</div></div>
                <div style="text-align: center; margin-top: 40px; padding-top: 25px; border-top: 2px solid #000; font-size: 11px; color: #333; font-weight: 600; line-height: 1.8;">
                    <div style="margin-bottom: 8px;">تم التنفيذ بواسطة:</div>
                    <div style="font-size: 12px; font-weight: 700; color: #000; margin-bottom: 5px;">أيمن أبو ورده</div>
                    <div style="font-size: 10px; color: #555;">0570707121 - 77aayy@gmail.com</div>
                </div>
            </div>`;
        window.print();
    }
}

// Global functions from old code - نسخت بالضبط
function calc(branch,i){ 
    const pEl = document.getElementById(branch+'_p'+i);
    const rEl = document.getElementById(branch+'_r'+i);
    const bEl = document.getElementById(branch+'_b'+i);
    if(!pEl || !rEl || !bEl) return; // Check if elements exist
    let p=parseFloat(pEl.value)||0; 
    let r=parseFloat(rEl.value)||0; 
    bEl.value = formatNumber(p*(1+r/100)); 
}

function formatNumber(val) {
    const num = parseFloat(val);
    if (!isFinite(num) || Math.abs(num) < 1e-9) return '0';
    if (Number.isInteger(num)) return num.toString();
    let s = num.toString();
    if (!s.includes('.')) return s;
    s = s.replace(/0+$/,'').replace(/\.$/,'');
    return s;
}

function setUnify(branch){ 
    let unify=document.getElementById(branch==='c'?'unifyC':'unifyA').checked; 
    let rate=parseFloat(document.getElementById(branch==='c'?'rateC':'rateA').value)||0; 
    const tbody = document.getElementById('body_' + (branch === 'c' ? 'corniche' : 'andalus'));
    const rows = tbody.querySelectorAll('tr');
    rows.forEach((row, index) => {
        const rowNum = parseInt(row.getAttribute('data-row'));
        const rateInput = document.getElementById(branch + '_r' + rowNum);
        if(rateInput) {
            rateInput.value = unify ? rate : 45;
            calc(branch, rowNum);
        }
    });
}

// إضافة صف جديد
function addAdminRow(branch) {
    const tbody = document.getElementById('body_' + (branch === 'c' ? 'corniche' : 'andalus'));
    const rows = tbody.querySelectorAll('tr');
    const maxRow = Math.max(...Array.from(rows).map(r => parseInt(r.getAttribute('data-row'))));
    const newRowNum = maxRow + 1;
    
    const newRow = document.createElement('tr');
    newRow.setAttribute('data-row', newRowNum);
    
    // استخدام DOM manipulation بدلاً من innerHTML للأمان
    const td1 = document.createElement('td');
    const input1 = document.createElement('input');
    input1.type = 'text';
    input1.id = `${branch}_n${newRowNum}`;
    input1.className = 'unit-name-input';
    input1.placeholder = 'اسم الوحدة';
    input1.setAttribute('data-original-value', '');
    input1.addEventListener('keydown', (e) => {
        if (typeof handleTableNavigation === 'function') {
            handleTableNavigation(e, input1, branch, newRowNum);
        }
    });
    input1.addEventListener('focus', () => {
        if (typeof confirmUnitNameChange === 'function') {
            confirmUnitNameChange(input1, branch, newRowNum);
        }
    });
    td1.appendChild(input1);
    
    const td2 = document.createElement('td');
    const input2 = document.createElement('input');
    input2.type = 'number';
    input2.id = `${branch}_p${newRowNum}`;
    input2.value = '0';
    input2.className = 'calc-input';
    input2.addEventListener('input', () => {
        if (typeof calc === 'function') {
            calc(branch, newRowNum);
        }
    });
    input2.addEventListener('keydown', (e) => {
        if (typeof handleTableNavigation === 'function') {
            handleTableNavigation(e, input2, branch, newRowNum);
        }
    });
    td2.appendChild(input2);
    
    const td3 = document.createElement('td');
    const input3 = document.createElement('input');
    input3.type = 'number';
    input3.id = `${branch}_r${newRowNum}`;
    input3.value = '45';
    input3.className = 'calc-input rate-input';
    input3.addEventListener('input', () => {
        if (typeof calc === 'function') {
            calc(branch, newRowNum);
        }
    });
    input3.addEventListener('keydown', (e) => {
        if (typeof handleTableNavigation === 'function') {
            handleTableNavigation(e, input3, branch, newRowNum);
        }
    });
    td3.appendChild(input3);
    
    const td4 = document.createElement('td');
    const input4 = document.createElement('input');
    input4.type = 'number';
    input4.id = `${branch}_b${newRowNum}`;
    input4.className = 'calc-input calc-readonly';
    input4.readOnly = true;
    td4.appendChild(input4);
    
    const td5 = document.createElement('td');
    td5.className = 'action-buttons';
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn-delete-row';
    deleteBtn.title = 'حذف صف';
    deleteBtn.textContent = '🗑️';
    deleteBtn.addEventListener('click', () => {
        if (typeof deleteAdminRow === 'function') {
            deleteAdminRow(branch, newRowNum);
        }
    });
    td5.appendChild(deleteBtn);
    
    newRow.appendChild(td1);
    newRow.appendChild(td2);
    newRow.appendChild(td3);
    newRow.appendChild(td4);
    newRow.appendChild(td5);
    
    tbody.appendChild(newRow);
    calc(branch, newRowNum);
}

// رسالة تأكيد عند تغيير اسم الوحدة - تظهر قبل التعديل (عند onfocus)
function confirmUnitNameChange(input, branch, rowNum) {
    const originalValue = input.getAttribute('data-original-value') || input.value.trim();
    
    // حفظ القيمة الأصلية إذا لم تكن محفوظة
    if (!input.getAttribute('data-original-value')) {
        input.setAttribute('data-original-value', originalValue);
    }
    
    // إنشاء أو الحصول على النافذة
    let overlay = document.getElementById('unitNameModalOverlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'unitNameModalOverlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(5px);
            z-index: 10000;
            display: none;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease;
        `;
        
        const modal = document.createElement('div');
        modal.id = 'unitNameModal';
        modal.style.cssText = `
            background: linear-gradient(135deg, rgba(2, 42, 58, 0.98) 0%, rgba(1, 18, 25, 0.98) 100%);
            border: 2px solid rgba(44, 177, 225, 0.3);
            border-radius: 20px;
            padding: 30px;
            max-width: 500px;
            width: 90%;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            animation: slideUp 0.3s ease;
        `;
        
        modal.innerHTML = `
            <div style="text-align:center; margin-bottom:25px;">
                <div style="font-size:2.5rem; margin-bottom:15px;">✏️</div>
                <h3 id="unitNameModalTitle" style="color:#2CB1E1; font-size:1.5rem; font-weight:700; margin:0;">تأكيد تغيير اسم الوحدة</h3>
            </div>
            <div id="unitNameModalBody" style="text-align:center; padding:20px 0;">
                <div style="font-size:1.1rem; margin-bottom:20px; color:#FFFFFF;">
                    <div style="margin-bottom:10px; opacity:0.8;">الاسم الحالي:</div>
                    <div id="unitNameCurrent" style="color:#2CB1E1; font-weight:700; font-size:1.4rem; padding:12px; background:rgba(44, 177, 225, 0.1); border-radius:10px; border:2px solid rgba(44, 177, 225, 0.3);">${originalValue || '(فارغ)'}</div>
                </div>
                <div style="font-size:1.8rem; margin:20px 0; color:#2CB1E1;">⬇️</div>
                <div style="font-size:1.1rem; margin-bottom:20px; color:#FFFFFF;">
                    <div style="margin-bottom:10px; opacity:0.8;">أدخل الاسم الجديد:</div>
                    <input type="text" id="unitNameNewInput" style="width:100%; padding:15px; background:rgba(255,255,255,0.05); border:2px solid rgba(44, 177, 225, 0.3); border-radius:10px; color:#FFFFFF; font-size:1.1rem; text-align:center; outline:none; transition:all 0.3s;" placeholder="الاسم الجديد..." autofocus>
                </div>
                <div style="margin-top:25px; padding:15px; background:rgba(44, 177, 225, 0.1); border-radius:10px; border:1px solid rgba(44, 177, 225, 0.3);">
                    <div style="color:#2CB1E1; font-size:0.95rem; font-weight:600;">هل تريد تأكيد هذا التغيير؟</div>
                </div>
            </div>
            <div id="unitNameModalActions" style="display:flex; gap:12px; margin-top:25px;">
            </div>
        `;
        
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        
        // إغلاق عند النقر خارج النافذة
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                hideUnitNameModal(input, originalValue);
            }
        });
    }
    
    // تحديث محتوى النافذة
    document.getElementById('unitNameCurrent').textContent = originalValue || '(فارغ)';
    const newInput = document.getElementById('unitNameNewInput');
    newInput.value = originalValue;
    newInput.focus();
    newInput.select();
    
    // تحديث الأزرار
    const actions = document.getElementById('unitNameModalActions');
    actions.innerHTML = '';
    
    const cancelBtn = document.createElement('button');
    cancelBtn.style.cssText = `
        flex: 1;
        padding: 14px;
        background: rgba(220, 38, 38, 0.1);
        border: 2px solid rgba(220, 38, 38, 0.3);
        border-radius: 12px;
        color: #dc2626;
        font-size: 1rem;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.3s;
    `;
    cancelBtn.textContent = '❌ إلغاء';
    cancelBtn.onmouseover = () => {
        cancelBtn.style.background = 'rgba(220, 38, 38, 0.2)';
        cancelBtn.style.transform = 'translateY(-2px)';
    };
    cancelBtn.onmouseout = () => {
        cancelBtn.style.background = 'rgba(220, 38, 38, 0.1)';
        cancelBtn.style.transform = 'translateY(0)';
    };
    cancelBtn.onclick = () => {
        hideUnitNameModal(input, originalValue);
    };
    
    const confirmBtn = document.createElement('button');
    confirmBtn.style.cssText = `
        flex: 1;
        padding: 14px;
        background: linear-gradient(135deg, #2CB1E1 0%, #1a9bc7 100%);
        border: none;
        border-radius: 12px;
        color: #FFFFFF;
        font-size: 1rem;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.3s;
        box-shadow: 0 4px 15px rgba(44, 177, 225, 0.3);
    `;
    confirmBtn.textContent = '✅ تأكيد';
    confirmBtn.onmouseover = () => {
        confirmBtn.style.transform = 'translateY(-2px)';
        confirmBtn.style.boxShadow = '0 6px 20px rgba(44, 177, 225, 0.4)';
    };
    confirmBtn.onmouseout = () => {
        confirmBtn.style.transform = 'translateY(0)';
        confirmBtn.style.boxShadow = '0 4px 15px rgba(44, 177, 225, 0.3)';
    };
    confirmBtn.onclick = () => {
        const newValue = newInput.value.trim();
        if (newValue && newValue !== originalValue) {
            input.value = newValue;
            input.setAttribute('data-original-value', newValue);
        }
        hideUnitNameModal(input, originalValue);
    };
    
    // إضافة Enter key handler
    newInput.onkeydown = (e) => {
        if (e.key === 'Enter') {
            confirmBtn.click();
        } else if (e.key === 'Escape') {
            cancelBtn.click();
        }
    };
    
    actions.appendChild(cancelBtn);
    actions.appendChild(confirmBtn);
    overlay.style.display = 'flex';
}

// إخفاء نافذة تغيير اسم الوحدة
function hideUnitNameModal(input, originalValue) {
    const overlay = document.getElementById('unitNameModalOverlay');
    if (overlay) {
        overlay.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            overlay.style.display = 'none';
            overlay.style.animation = 'fadeIn 0.3s ease';
        }, 300);
    }
    // إعادة القيمة الأصلية إذا لم يتم التأكيد
    if (input && input.value.trim() === '') {
        input.value = originalValue;
    }
}

// معالج التنقل في الجداول (Tab/Enter)
function handleTableNavigation(event, currentInput, branch, rowNum) {
    if (event.key === 'Enter' || (event.key === 'Tab' && !event.shiftKey)) {
        event.preventDefault();
        const table = currentInput.closest('table');
        const allInputs = Array.from(table.querySelectorAll('input:not([readonly]):not(.calc-readonly)'));
        const currentIndex = allInputs.indexOf(currentInput);
        
        if (currentIndex !== -1 && currentIndex < allInputs.length - 1) {
            const nextInput = allInputs[currentIndex + 1];
            nextInput.focus();
            if (nextInput.type === 'text' || nextInput.type === 'number') {
                nextInput.select();
            }
        }
    } else if (event.key === 'Tab' && event.shiftKey) {
        event.preventDefault();
        const table = currentInput.closest('table');
        const allInputs = Array.from(table.querySelectorAll('input:not([readonly]):not(.calc-readonly)'));
        const currentIndex = allInputs.indexOf(currentInput);
        
        if (currentIndex > 0) {
            const prevInput = allInputs[currentIndex - 1];
            prevInput.focus();
            if (prevInput.type === 'text' || prevInput.type === 'number') {
                prevInput.select();
            }
        }
    }
}

// إضافة صف جديد لجدول الاستقبال
function addReceptionRow() {
    const pricingPage = window.pricingPageInstance || window.pricingPage;
    if (!pricingPage) {
        console.error('PricingPage instance not found');
        return;
    }
    
    const branchSelect = document.getElementById('branchSelectR');
    if (!branchSelect) {
        console.error('branchSelectR not found');
        return;
    }
    
    const branch = branchSelect.value;
    const data = pricingPage.dbR[branch];
    
    // data هو array مباشرة، وليس object يحتوي على units
    if (!data || !Array.isArray(data)) {
        console.error('Data is not an array:', data);
        return;
    }
    
    // إنشاء معرف فريد للصف الجديد
    const newUnit = {
        name: 'وحدة جديدة',
        prices: [0, 0, 0, 0, 0],
        monthlySeason: 0,
        monthlyNormal: 0
    };
    
    // إضافة الوحدة الجديدة للبيانات
    data.push(newUnit);
    
    // إعادة رسم الجدول
    updateAllR();
}

// حذف صف من جدول الاستقبال
function deleteReceptionRow(uid) {
    const pricingPage = window.pricingPageInstance || window.pricingPage;
    if (!pricingPage) {
        console.error('PricingPage instance not found');
        return;
    }
    
    const branchSelect = document.getElementById('branchSelectR');
    if (!branchSelect) {
        console.error('branchSelectR not found');
        return;
    }
    
    const branch = branchSelect.value;
    const data = pricingPage.dbR[branch];
    
    // data هو array مباشرة، وليس object يحتوي على units
    if (!data || !Array.isArray(data)) {
        console.error('Data is not an array:', data);
        return;
    }
    
    // البحث عن الوحدة وحذفها
    // uid format: "cornish_0" or "andalus_1"
    const parts = uid.split('_');
    if (parts.length >= 2) {
        const index = parseInt(parts[1]);
        if (!isNaN(index) && index >= 0 && index < data.length) {
            if (data.length > 1) {
                data.splice(index, 1);
                updateAllR();
            } else {
                if (typeof showToast === 'function') {
                    showToast('لا يمكن حذف آخر وحدة', 'error');
                } else {
                    alert('لا يمكن حذف آخر وحدة');
                }
            }
        }
    }
}

// حذف صف
function deleteAdminRow(branch, rowNum) {
    const tbody = document.getElementById('body_' + (branch === 'c' ? 'corniche' : 'andalus'));
    const rows = tbody.querySelectorAll('tr');
    if(rows.length <= 1) {
        alert('لا يمكن حذف آخر صف في الجدول');
        return;
    }
    const row = tbody.querySelector(`tr[data-row="${rowNum}"]`);
    if(row) {
        row.remove();
    }
}

// Reception Pricing Functions - Global from old code
const TIERS_R = { EMG:0, UNDER60:1, OVER60:2, OVER70:3, OVER80:4, SEASON:5 };
let unitCountsR = {};
let chartInstanceR = null;
let previousPricesR = {};
let newPricesR = {};
const dbR = {
    cornish: [
        { name: "تؤم وكينج",      prices: [230, 280, 315, 350, 375, 400],  monthlySeason: 6440,  monthlyNormal: 5600 },
        { name: "ستوديو",         prices: [340, 390, 420, 460, 480, 510],  monthlySeason: 8970,  monthlyNormal: 7800 },
        { name: "شقة غرفه وصالة", prices: [370, 420, 460, 500, 530, 550],  monthlySeason: 9660,  monthlyNormal: 8400 },
        { name: "غرفتين وصالة",   prices: [400, 450, 550, 600, 650, 680],  monthlySeason: 10350, monthlyNormal: 9000 },
        { name: "VIP",            prices: [850, 900, 1000, 1100, 1250,1399],monthlySeason: 20700, monthlyNormal: 18000 },
    ],
    andalus: [
        { name: "غرفة خلفية تؤم",      prices: [190, 220, 250, 280, 300, 320],  monthlySeason: 5510,   monthlyNormal: 5069 },
        { name: "غرفة خلفية كينج",     prices: [205, 235, 262, 290, 310, 330],  monthlySeason: 5866,   monthlyNormal: 5397 },
        { name: "ستوديو شارع",         prices: [220, 250, 285, 320, 335, 350],  monthlySeason: 6246,   monthlyNormal: 5747 },
        { name: "غرفة وصالة شارع",     prices: [290, 320, 360, 400, 445, 490],  monthlySeason: 8004,   monthlyNormal: 7363 },
        { name: "غرفتين خلفي",         prices: [390, 420, 460, 500, 575, 650],  monthlySeason: 10498,  monthlyNormal: 9658 },
        { name: "غرفتين وصالة شارع",   prices: [420, 450, 500, 550, 640, 730],  monthlySeason: 11258,  monthlyNormal: 10357 },
        { name: "VIP 601",             prices: [570, 600, 650, 700, 757, 850],  monthlySeason: 15000,  monthlyNormal: 14000 },
        { name: "VIP 602",             prices: [370, 400, 475, 500, 525, 550],  monthlySeason: 11500,  monthlyNormal: 10000 },
        { name: "VIP 604",             prices: [320, 350, 375, 400, 420, 440],  monthlySeason: 8500,   monthlyNormal: 8000 },
    ]
};

function getBaseTierR(p){
    if(p < 60) return TIERS_R.UNDER60;
    if(p >= 60 && p < 70) return TIERS_R.OVER60;
    if(p >= 70 && p < 80) return TIERS_R.OVER70;
    if(p >= 80 && p < 90) return TIERS_R.OVER80;
    if(p >= 90) return TIERS_R.SEASON;
    return TIERS_R.UNDER60;
}

function updateChartExplanationR(occupancy){
    const el = document.getElementById('chartExplanationR');
    let text = '';
    if(occupancy <= 60) text = 'الوضع سيئ ويدعو للقلق';
    else if(occupancy <= 70) text = 'شد شويه هتحسن الإشغال، هانت';
    else if(occupancy <= 85) text = 'وضعك مستقر ولكن في مجال للتحسين';
    else text = 'وضعك الآن صار ممتاز، شوية ونحتفل بك يا بطل!';
    el.innerText = text;
}

function generateSmartAdviceR(occupancy){
    const box = document.getElementById('smartAdviceBoxR');
    const title = document.getElementById('adviceTitleR');
    const content = document.getElementById('adviceContentR');

    box.className = 'card-R';
    box.style.borderLeftColor = 'var(--pr-accent-1)';
    title.style.color = 'var(--pr-accent-1)';
    content.className = 'alert-box';

    if(occupancy >= 86){
        box.classList.add('celebratory-glow-R','party-box-R');
        title.innerHTML = '<i class="fas fa-medal"></i> احتفال اليوم!';
        title.style.color = 'var(--text-main)';
        content.innerHTML = '<strong>تهانينا!</strong> لقد أديت أداءً رائعاً، إشغالك تجاوز الـ 86%. استغل هذا المستوى في تحصيل أفضل سعر ممكن!';
    } else if(occupancy === 0){
        content.innerHTML = '<span style="color:var(--pr-warning);"><i class="fas fa-exclamation-triangle"></i></span> <strong>انتبه!</strong> النسبة صفر، يفضل البدء بنسبة واقعية للحصول على تسعير صحيح.';
    } else if(occupancy < 65){
        content.innerHTML = '<span style="color:var(--pr-accent-1);"><i class="fas fa-bullhorn"></i></span> <strong>يا بطل!</strong> لديك شاغر كبير. اضغط على الوحدات المتاحة 5+ لتفعيل <b>الطوارئ</b> والمنافسة بقوة.';
    } else {
        content.innerHTML = '<span style="color:var(--pr-accent-2);"><i class="fas fa-chart-line"></i></span> <strong>وضع مستقر!</strong> قم بتحصيل أفضل سعر. لو عدد الغرف 4، طبّق خصم الوفرة لجذب حجوزات إضافية.';
    }
}

function generateAIHintR(branch, data, occupancy){
    const targetUnit = data.find(u => u.name.includes('غرفتين') || u.name.includes('VIP')) || data[0];
    let suggestion = 'لا توجد توصيات فورية.';
    let change = 0;

    if(occupancy >= 80) change = 25;
    else if(occupancy < 60) change = -15;

    if(change !== 0){
        const sign = change > 0 ? '+' : '';
        const safeUnitName = typeof sanitizeText === 'function' ? sanitizeText(targetUnit.name) : targetUnit.name;
        suggestion = `بناءً على الإشغال الحالي، السعر المثالي لـ ${safeUnitName} هو <strong>${sign}${change} ريال</strong> لتعظيم الربح.`;
    }
    const hintSpan = document.querySelector('#aiHintBoxR span');
    if (hintSpan) {
        const sanitized = typeof sanitizeHTML === 'function' ? sanitizeHTML(suggestion) : suggestion;
        hintSpan.innerHTML = sanitized;
    }
}

function updateBranchStatusPulseR(occupancy){
    const pulse = document.getElementById('branchStatusPulseR');
    pulse.className = 'status-pulse-R';
    if(occupancy > 90)      pulse.classList.add('status-overload-R','overload-shake-R');
    else if(occupancy > 80) pulse.classList.add('status-high-R');
    else if(occupancy > 60) pulse.classList.add('status-medium-R');
    else                    pulse.classList.add('status-low-R');
}

function getDisplayedPriceR(finalDaily, item, pricingMode){
    if (pricingMode === 'daily') {
        return finalDaily;
    }
    if (pricingMode === 'monthly-normal') {
        return item.monthlyNormal;
    }
    if (pricingMode === 'monthly-company') {
        return item.monthlyNormal * 0.95;
    }
    if (pricingMode === 'monthly-season') {
        return item.monthlySeason;
    }
    return finalDaily;
}

// Debounced version of updateAllR for better performance
const debouncedUpdateAllR = typeof debounce === 'function' 
    ? debounce(function(callerId) {
        if (window.pricingPage && typeof window.pricingPage.updateAllR === 'function') {
            window.pricingPage.updateAllR(callerId);
        }
    }, 150)
    : function(callerId) {
        if (window.pricingPage && typeof window.pricingPage.updateAllR === 'function') {
            window.pricingPage.updateAllR(callerId);
        }
    };

function updateAllR(callerId){
    const branch = document.getElementById('branchSelectR').value;
    const occupancyInput = document.getElementById('occupancyInputR');
    const pricingMode = document.getElementById('pricingModeR').value;

    let occupancy = parseInt(occupancyInput.value) || 0;
    if(occupancy > 100){ occupancy = 100; occupancyInput.value = 100; }

    document.getElementById('occupancyDisplayR').innerText = occupancy + '%';
    updateChartR(occupancy);
    generateSmartAdviceR(occupancy);
    updateChartExplanationR(occupancy);
    updateBranchStatusPulseR(occupancy);

    const baseTier = getBaseTierR(occupancy);
    const tierNames = ["طوارئ ⚡","منخفض (<60%)","متوسط (>60%)","جيد (>70%)","مرتفع (>80%)","🔥 موسم"];
    document.getElementById('currentTierLabelR').innerText = tierNames[baseTier];

    const data = dbR[branch];
    const tableWrapper = document.getElementById('tableWrapperR');

    if(callerId === 'branchSelectR'){
        tableWrapper.style.opacity = 0;
        setTimeout(() => {
            renderTableBodyR();
            tableWrapper.style.opacity = 1;
        }, 350);
        return;
    }

    renderTableBodyR();

    function renderTableBodyR(){
        let html = '';
        newPricesR = {};
        const isMonthlyMode = (pricingMode !== 'daily');

        // إظهار/إخفاء عمود "العدد المتاح" حسب وضع التسعير
        const countColumnHeader = document.getElementById('countColumnHeader');
        if(countColumnHeader) {
            countColumnHeader.style.display = isMonthlyMode ? 'none' : 'table-cell';
        }

        data.forEach((item, index) => {
            const uid = branch + index;
            const count = unitCountsR[uid] !== undefined ? unitCountsR[uid] : 0;

            let finalTier = isMonthlyMode ? TIERS_R.UNDER60 : baseTier;
            let badgeClass = 'pill-blue-R';
            let statusMsg = 'السعر الأساسي';
            let statusIcon = '💼';
            let statusClass = 'status-normal';
            let statusBg = 'rgba(100, 200, 255, 0.1)';
            let statusBorder = 'rgba(100, 200, 255, 0.3)';

            const isTargeted =
                (branch === 'cornish' && (item.name.includes('تؤم') || item.name.includes('VIP'))) ||
                (branch === 'andalus' && item.name.includes('VIP'));

            if (!isMonthlyMode) {
                if(count >= 5){
                    finalTier = TIERS_R.EMG;
                    badgeClass = 'pill-red-R';
                    statusMsg = 'سعر الإغراق';
                    statusIcon = '🔥';
                    statusClass = 'status-danger';
                    statusBg = 'rgba(239, 68, 68, 0.15)';
                    statusBorder = 'rgba(239, 68, 68, 0.4)';
                } else if(count === 4){
                    if(finalTier > TIERS_R.UNDER60){
                        finalTier -= 1;
                        badgeClass = 'pill-green-R';
                        statusMsg = 'خصم 4 وحدات';
                        statusIcon = '🎯';
                        statusClass = 'status-success';
                        statusBg = 'rgba(16, 185, 129, 0.15)';
                        statusBorder = 'rgba(16, 185, 129, 0.4)';
                    } else {
                        statusMsg = 'أقل سعر ممكن';
                        statusIcon = '⚡';
                        statusClass = 'status-warning';
                        statusBg = 'rgba(245, 158, 11, 0.15)';
                        statusBorder = 'rgba(245, 158, 11, 0.4)';
                    }
                } else if(isTargeted && (count === 1 || count === 2)){
                    if(finalTier > TIERS_R.UNDER60){
                        finalTier -= 1;
                        badgeClass = 'pill-green-R';
                        statusMsg = 'خصم ندرة (1-2 وحدة)';
                        statusIcon = '💎';
                        statusClass = 'status-success';
                        statusBg = 'rgba(16, 185, 129, 0.15)';
                        statusBorder = 'rgba(16, 185, 129, 0.4)';
                    } else {
                        statusMsg = 'أقل سعر ممكن';
                        statusIcon = '⚡';
                        statusClass = 'status-warning';
                        statusBg = 'rgba(245, 158, 11, 0.15)';
                        statusBorder = 'rgba(245, 158, 11, 0.4)';
                    }
                } else if(count >= 1 && count <= 3){
                    statusMsg = 'السعر الأساسي';
                    statusIcon = '✅';
                    statusClass = 'status-normal';
                    statusBg = 'rgba(100, 200, 255, 0.1)';
                    statusBorder = 'rgba(100, 200, 255, 0.3)';
                } else if(count === 0){
                    statusMsg = 'مغلق/غير متاح';
                    statusIcon = '🔒';
                    statusClass = 'status-closed';
                    statusBg = 'rgba(107, 114, 128, 0.15)';
                    statusBorder = 'rgba(107, 114, 128, 0.3)';
                }
            } else {
                badgeClass = 'pill-blue-R';
                statusMsg = 'سعر شهري ثابت';
                statusIcon = '📅';
                statusClass = 'status-monthly';
                statusBg = 'rgba(59, 130, 246, 0.15)';
                statusBorder = 'rgba(59, 130, 246, 0.4)';
            }

            const finalDailyPrice = item.prices[finalTier];
            const displayedPrice = getDisplayedPriceR(finalDailyPrice, item, pricingMode);

            const priceKey = uid + '|' + pricingMode;
            const pricePulseClass =
                previousPricesR[priceKey] !== undefined && previousPricesR[priceKey] !== Math.round(displayedPrice)
                    ? 'price-pulse-R' : '';
            newPricesR[priceKey] = Math.round(displayedPrice);

            const inputValue = (count === 0) ? '' : count;
            const monthlyStyle = isMonthlyMode ? 'background:#e8f0ff; color:#1a3f8b;' : '';

            // إظهار/إخفاء خلية "العدد المتاح" حسب وضع التسعير
            const countCellStyle = isMonthlyMode ? 'display:none;' : 'text-align:center;';

            html += `
                <tr>
                    <td style="font-weight:700; color:var(--text-main);">
                        ${item.name}
                    </td>
                    <td style="${countCellStyle}">
                        <input
                            type="text"
                            class="table-input-R"
                            value="${inputValue}"
                            placeholder="0"
                            oninput="handleCountInputR(event, '${uid}')"
                            onblur="if(this.value===''){ this.value='0'; handleCountInputR(event, '${uid}'); }"
                            onkeydown="if(event.key==='Enter' || event.key==='Tab'){ event.preventDefault(); const inputs=Array.from(this.closest('table').querySelectorAll('.table-input-R')); const idx=inputs.indexOf(this); if(idx<inputs.length-1){ inputs[idx+1].focus(); inputs[idx+1].select(); } }"
                            style="width:100px; min-width:100px; max-width:100px; text-align:center; font-size:1.1rem; padding:12px 14px;"
                        >
                    </td>
                    <td>
                        <div class="price-pill-R ${badgeClass} ${pricePulseClass}" style="${monthlyStyle}">
                            <span style="font-weight:800; font-size:1rem;">${Math.round(displayedPrice)}</span>
                            <span class="price-currency">ر.س</span>
                            ${isMonthlyMode ? '<span class="price-period">/ شهر</span>' : ''}
                        </div>
                    </td>
                    <td>
                        <div class="status-badge ${statusClass}" style="background:${statusBg}; border:2px solid ${statusBorder};">
                            <span class="status-icon">${statusIcon}</span>
                            <span class="status-text">${statusMsg}</span>
                        </div>
                    </td>
                    <td class="action-buttons">
                        <button class="btn-delete-row" onclick="deleteReceptionRow('${uid}')" title="حذف صف">🗑️</button>
                    </td>
                </tr>
            `;
        });

        document.getElementById('tableBodyR').innerHTML = html;
        previousPricesR = newPricesR;
        generateAIHintR(branch, data, occupancy);
    }
}

function handleCountInputR(e, id){
    let value = e.target.value || '';
    // Allow only digits - keep all digits entered (10, 11, 20, etc.)
    const cleaned = value.replace(/[^0-9]/g,'');
    // Update the input value if needed
    if (cleaned !== value) {
        e.target.value = cleaned;
    }
    // Update the count immediately with the cleaned value
    unitCountsR[id] = cleaned === '' ? 0 : parseInt(cleaned, 10) || 0;
    // Update all calculations
    updateAllR();
}

function setCountR(id, val){
    const numVal = val === '' ? 0 : parseInt(val, 10) || 0;
    unitCountsR[id] = numVal;
    updateAllR();
}

function updateChartR(val){
    const ctx = document.getElementById('occupancyChartR').getContext('2d');
    if(chartInstanceR) chartInstanceR.destroy();

    // تحسين الألوان بناءً على النسب - تدرج جميل
    let colorHex = '';
    let freeColor = 'rgba(255, 255, 255, 0.1)';
    
    if(val >= 90) {
        // ممتاز - ذهبي/أزرق فاتح
        colorHex = '#FFD700'; // ذهبي
        freeColor = 'rgba(255, 215, 0, 0.15)';
    } else if(val >= 80) {
        // جيد جداً - أزرق فاتح
        colorHex = '#00D4FF'; // أزرق فاتح
        freeColor = 'rgba(0, 212, 255, 0.15)';
    } else if(val >= 70) {
        // جيد - أخضر فاتح
        colorHex = '#10B981'; // أخضر
        freeColor = 'rgba(16, 185, 129, 0.15)';
    } else if(val >= 60) {
        // متوسط - أصفر/برتقالي فاتح
        colorHex = '#F59E0B'; // برتقالي
        freeColor = 'rgba(245, 158, 11, 0.15)';
    } else if(val >= 40) {
        // منخفض - برتقالي/أحمر فاتح
        colorHex = '#F97316'; // برتقالي محمر
        freeColor = 'rgba(249, 115, 22, 0.15)';
    } else if(val >= 20) {
        // سيء - أحمر فاتح
        colorHex = '#EF4444'; // أحمر
        freeColor = 'rgba(239, 68, 68, 0.15)';
    } else {
        // سيء جداً - أحمر داكن
        colorHex = '#DC2626'; // أحمر داكن
        freeColor = 'rgba(220, 38, 38, 0.15)';
    }

    // تحديث لون النص في المنتصف
    const displayEl = document.getElementById('occupancyDisplayR');
    if(displayEl) {
        displayEl.style.color = colorHex;
        displayEl.style.textShadow = `0 0 10px ${colorHex}40, 0 0 20px ${colorHex}20`;
    }

    const cardElement = document.getElementById('occupancyChartR').closest('.card-R');
    cardElement.className = 'card-R';
    if(val >= 85) {
        cardElement.classList.add('celebratory-glow-R','party-box-R');
    }

    chartInstanceR = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Used','Free'],
            datasets: [{
                data: [val, 100 - val],
                backgroundColor: [colorHex, freeColor],
                borderColor: val >= 80 ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.2)',
                borderWidth: val >= 80 ? 3 : 2,
                borderRadius: 25
            }]
        },
        options: {
            cutout: '80%',
            responsive: true,
            maintainAspectRatio: false,
            plugins: { 
                legend: { display: false }, 
                tooltip: { enabled: false } 
            },
            animation: { 
                duration: 600,
                easing: 'easeOutQuart'
            }
        }
    });
}

function printReceptionPricing() {
    const tableBody = document.getElementById('tableBodyR');
    const title = document.getElementById('branchSelectR').value === 'cornish' ? 'قائمة أسعار الاستقبال (الكورنيش)' : 'قائمة أسعار الاستقبال (الأندلس)';
    const tier = document.getElementById('currentTierLabelR').innerText;
    const occupancy = document.getElementById('occupancyInputR').value || '0';
    const mode = document.getElementById('pricingModeR').options[document.getElementById('pricingModeR').selectedIndex].text;

    let tableHTML = `<table class="prof-table">
        <thead>
            <tr style="background:#eee; font-weight:bold;">
                <th style="border:2px solid #000; padding:12px; text-align:right;">الوحدة</th>
                <th style="border:2px solid #000; padding:12px;">العدد المتاح</th>
                <th style="border:2px solid #000; padding:12px;">السعر المقترح</th>
                <th style="border:2px solid #000; padding:12px;">تحليل الحالة</th>
            </tr>
        </thead>
        <tbody>`;
    
    const rows = tableBody.querySelectorAll('tr');
    rows.forEach(row => {
        const name = row.cells[0].innerText;
        const count = row.cells[1].querySelector('input').value || '0';
        const price = row.cells[2].innerText.replace(/\s+/g, ' ').trim();
        const status = row.cells[3].innerText.replace('ℹ️', '').trim();
        tableHTML += `<tr>
            <td style="border:2px solid #000; padding:12px; font-weight:bold; text-align:right;">${name}</td>
            <td style="border:2px solid #000; padding:12px;">${count}</td>
            <td style="border:2px solid #000; padding:12px; background:#f9f9f9; font-weight:bold;">${price}</td>
            <td style="border:2px solid #000; padding:12px;">${status}</td>
        </tr>`;
    });
    tableHTML += `</tbody></table>`;
    
    document.getElementById('printArea').innerHTML = `
        <div class="prof-report-container">
            <div class="prof-header">
                <h1>${title}</h1>
                <p>وضع التسعير: ${mode} | نسبة الإشغال: ${occupancy}% | الفئة: ${tier}</p>
            </div>
            ${tableHTML}
            <div class="prof-footer"><div>توقيع المسؤول<br><br>.........................</div><div> المدير العام <br><br>.........................</div></div>
            <div style="text-align: center; margin-top: 40px; padding-top: 25px; border-top: 2px solid #000; font-size: 11px; color: #333; font-weight: 600; line-height: 1.8;">
                <div style="margin-bottom: 8px;">تم التنفيذ بواسطة:</div>
                <div style="font-size: 12px; font-weight: 700; color: #000; margin-bottom: 5px;">أيمن أبو ورده</div>
                <div style="font-size: 10px; color: #555;">0570707121 - 77aayy@gmail.com</div>
            </div>
        </div>
    `;
    window.print();
}

window.PricingPage = PricingPage;
window.pricingPage = new PricingPage();
window.pricingPageInstance = window.pricingPage;

// Initialize when DOM is ready (only if PricingPage is not managing it)
// This is handled by PricingPage.init() method, so this code is redundant but kept for backward compatibility
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // Only initialize if not already initialized by PricingPage instance
        if (typeof window.pricingPage === 'undefined' || !window.pricingPage) {
            initializePricing();
        }
    });
} else {
    // DOM already loaded - use requestAnimationFrame for better performance
    window.requestAnimationFrame(() => {
        if (typeof window.pricingPage === 'undefined' || !window.pricingPage) {
            initializePricing();
        }
    });
}

function initializePricing() {
    // 1. Original Admin Pricing (calc)
    for(let i=1;i<=5;i++) {
        const c_p = document.getElementById('c_p'+i);
        const c_r = document.getElementById('c_r'+i);
        if(c_p && c_r) calc('c',i);
    }
    for(let i=1;i<=3;i++) {
        const a_p = document.getElementById('a_p'+i);
        const a_r = document.getElementById('a_r'+i);
        if(a_p && a_r) calc('a',i);
    }
    
    // 2. New Reception Pricing (calcR) - مع فحص وجود العناصر
    const branchSelectR = document.getElementById('branchSelectR');
    const occupancyInputR = document.getElementById('occupancyInputR');
    if(branchSelectR && occupancyInputR) {
        branchSelectR.value = 'cornish'; 
        occupancyInputR.value = 0;
        if(typeof updateAllR === 'function') {
            updateAllR('initialLoad');
        }
    }
}