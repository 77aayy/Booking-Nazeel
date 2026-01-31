let activeTimer = null;

// جعل initiateClosure متاحاً عالمياً
function initiateClosure() {
    console.log("initiateClosure called"); // Debug
    const activeRow = document.querySelector(".active-row");
    if (!activeRow) {
        console.error("No active row found");
        if (typeof showToast === 'function') {
            showToast("لا يوجد صف نشط", "error");
        } else {
            alert("لا يوجد صف نشط");
        }
        return;
    }

    // 1. التحقق من إيراد البرنامج
    const revenueCell = activeRow.querySelector('[data-field="programRevenue"]');
    if (!revenueCell) {
        console.error("Revenue cell not found");
        if (typeof showToast === 'function') {
            showToast("خطأ: لا يمكن العثور على خلية إيراد البرنامج", "error");
        } else {
            alert("خطأ: لا يمكن العثور على خلية إيراد البرنامج");
        }
        return;
    }
    
    const revenue = parseFloat(revenueCell.textContent) || 0;
    if (revenue <= 0) {
        if (typeof showToast === 'function') {
            showToast("⚠️ لا يمكن الإغلاق! يجب إدخال إيراد البرنامج أولاً.", "warning");
        } else {
            alert("⚠️ لا يمكن الإغلاق! يجب إدخال إيراد البرنامج أولاً.");
        }
        return;
    }

    // 2. نقل الملاحظات للصف
    const notes = document.getElementById("notesBox");
    if (notes) {
        activeRow.querySelector('[data-field="notes"]').textContent = notes.value;
    }

    // 3. بدء العداد داخل الصف
    const statusCell = activeRow.querySelector(".status-cell");
    let timeLeft = 30;
    
    // تعطيل زر الإغلاق الرئيسي لمنع التكرار
    const mainBtn = document.getElementById("closeFundBtn");
    if (mainBtn) {
        mainBtn.disabled = true;
        const span = mainBtn.querySelector("span");
        if (span) span.textContent = "⏳ جاري العد...";
    }

    // مسح أي عداد سابق
    if (activeTimer) clearInterval(activeTimer);

    // إضافة وظيفة للتراجع عن العد
    const cancelClosure = () => {
        if (activeTimer) {
            clearInterval(activeTimer);
            activeTimer = null;
        }
        // إعادة الحالة للنشط
        if (statusCell) {
            statusCell.innerHTML = '';
            const activeSpan = document.createElement('span');
            activeSpan.className = 'status-active';
            activeSpan.textContent = 'نشط 🟢';
            statusCell.appendChild(activeSpan);
        }
        // إعادة تفعيل زر الإغلاق
        if (mainBtn) {
            mainBtn.disabled = false;
            const span = mainBtn.querySelector("span");
            if (span) span.textContent = "🔒 إغلاق الصندوق";
        }
        if (typeof showToast === 'function') {
            showToast("تم إلغاء الإغلاق", "info");
        }
    };

    activeTimer = setInterval(() => {
        if (!statusCell || !activeRow) {
            clearInterval(activeTimer);
            return;
        }
        // Use DOM manipulation for timer display
        statusCell.innerHTML = '';
        const timerSpan = document.createElement('span');
        timerSpan.className = 'status-timer';
        timerSpan.style.cursor = 'pointer';
        timerSpan.style.userSelect = 'none';
        timerSpan.title = 'اضغط للتراجع عن الإغلاق';
        timerSpan.textContent = `⏳ ${timeLeft} ثانية... (اضغط للتراجع)`;
        // إضافة event listener للتراجع
        timerSpan.addEventListener('click', cancelClosure);
        statusCell.appendChild(timerSpan);
        timeLeft--;

        if (timeLeft < 0) {
            clearInterval(activeTimer);
            activeTimer = null;
            if (typeof finalizeClosure === 'function') {
                finalizeClosure(activeRow);
            }
        }
    }, 1000);
}

// جعل الدالة متاحة عالمياً أيضاً
window.initiateClosure = initiateClosure;

function updateCloseButtonState(row) {
    // الزر أصبح فقط للبدء، الحالة الحقيقية تظهر في الجدول
    const btn = document.getElementById("closeFundBtn");
    if(!btn) return;
    
    if(!row) { 
        btn.disabled = true; 
        return; 
    }
    
    btn.disabled = false;
    
    // التأكد من ربط الحدث إذا لم يكن مربوطاً
    if(!btn.hasAttribute('data-listener-attached')) {
        btn.setAttribute('data-listener-attached', 'true');
        btn.addEventListener("click", function(e) {
            e.preventDefault();
            e.stopPropagation();
            const closureFunc = window.initiateClosure || (typeof initiateClosure !== 'undefined' ? initiateClosure : null);
            if (typeof closureFunc === 'function') {
                closureFunc();
            } else {
                console.error("initiateClosure function not found");
                if (typeof showToast === 'function') {
                    showToast("خطأ: وظيفة الإغلاق غير متاحة", "error");
                } else {
                    alert("خطأ: وظيفة الإغلاق غير متاحة");
                }
            }
        });
    }
}

// الدالة تم نقلها إلى window.initiateClosure أعلاه

// الإغلاق النهائي
async function finalizeClosure(row) {
    const tableBody = document.getElementById("mainTableBody");
    
    // تحويل الصف لمغلق
    row.classList.remove("active-row");
    row.classList.add("closed-row");
    
    // قفل الخلايا
    row.querySelectorAll('[contenteditable]').forEach(cell => {
        cell.contentEditable = "false";
        cell.style.backgroundColor = "rgba(0,0,0,0.2)";
        cell.style.color = "#aaa";
    });

    // تحديث الوقت
    const now = new Date();
    const closeTime = now.toLocaleTimeString('ar-EG');
    row.cells[4].textContent = closeTime;

    // تغيير الحالة لقفل أحمر
    const statusCell = row.querySelector(".status-cell");
    if (statusCell) {
        statusCell.innerHTML = '';
        const closedSpan = document.createElement('span');
        closedSpan.className = 'status-closed';
        closedSpan.textContent = '🔒 تم الإغلاق';
        statusCell.appendChild(closedSpan);
    }

    // تحديث الداشبورد
    updateDashboardMetrics();

    // إعادة ضبط الزر الرئيسي
    const mainBtn = document.getElementById("closeFundBtn");
    if (mainBtn) {
        mainBtn.disabled = false;
        const span = mainBtn.querySelector("span");
        if (span) {
            span.textContent = "🔒 إغلاق الصندوق";
        }
    }

    // حفظ البيانات في السيرفر
    try {
        const data = {
            treasuryReserve: parseFloat(row.querySelector('[data-field="treasuryReserve"]').textContent) || 0,
            purchaseInvoices: parseFloat(row.querySelector('[data-field="expense"]').textContent) || 0,
            employeeName: row.querySelector('.emp-name').textContent || "موظف",
            closeTime: closeTime,
            actualCash: parseFloat(row.querySelector('[data-field="cash"]').textContent) || 0,
            network: parseFloat(row.querySelector('[data-field="network"]').textContent) || 0,
            bankTransfer: parseFloat(row.querySelector('[data-field="bankTransfer"]').textContent) || 0,
            programRevenue: parseFloat(row.querySelector('[data-field="programRevenue"]').textContent) || 0,
            variance: parseFloat(row.querySelector('[data-field="variance"]').textContent) || 0,
            notes: row.querySelector('[data-field="notes"]').textContent || ""
        };
        
        await apiRequest("/closure/create", "POST", data);
    } catch (error) {
        console.error("Error saving closure:", error);
    }

    // إنشاء صف جديد أولاً
    createNewRow();
    
    // نقل الصف المغلق ليظهر بعد الصف النشط مباشرة
    const tableBody = document.getElementById("mainTableBody");
    
    // نقل الصف المغلق ليظهر بعد الصف النشط الجديد مباشرة
    const newActiveRow = document.querySelector(".active-row");
    if (newActiveRow && tableBody) {
        // إزالة الصف المغلق من موضعه الحالي إذا كان موجوداً في الجدول
        if (row.parentNode === tableBody) {
            row.remove();
        }
        // إدراجه بعد الصف النشط الجديد مباشرة
        newActiveRow.insertAdjacentElement('afterend', row);
    } else if (tableBody) {
        // إذا لم يكن هناك صف نشط، نضيفه في البداية
        tableBody.insertBefore(row, tableBody.firstChild);
    }
    
    // تحديث حالة زر الإضافة
    if(typeof updateAddRowButtonState === 'function') {
        updateAddRowButtonState();
    }
    
    // تحديث أرقام الصفوف
    if(typeof updateRowNumbers === 'function') {
        updateRowNumbers(1);
    }
    
    // لا نستدعي loadAllClosures هنا لأن الصف المغلق موجود بالفعل في الجدول
    // فقط نحدث البيانات في السيرفر
    
    showToast("تم إغلاق الصندوق نهائياً", "success");
}

// ربط الزر - يتم ربطه في app.js بعد تحميل DOM
// هذا الكود محذوف لأن app.js يتولى ربط الحدث

