document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    if (!token) { window.location.href = "../login.html"; return; }

    // رسالة الترحيب
    if (username) {
        const userElem = document.getElementById("username");
        if (userElem) userElem.textContent = username;
    }

    // تم إلغاء زر الخروج - يتم التعامل معه من الصفحة الرئيسية

    // ربط أحداث الجدول (بما في ذلك إزالة الصفر) - استخدام event delegation للأداء الأفضل
    const tableParent = document.querySelector("table");
    
    if(tableParent) {
        // Event delegation للجدول الرئيسي
        tableParent.addEventListener("input", (e) => {
            if (e.target.matches('[contenteditable="true"]')) {
                handleTableInput(e);
            }
        });
        tableParent.addEventListener("focusin", handleTableFocusIn);
        tableParent.addEventListener("focusout", handleTableFocusOut);
        tableParent.addEventListener("keydown", (e) => {
            if (e.target.matches('[contenteditable="true"]')) {
                handleTableKeyDown(e);
            }
        });
    }

    // ربط حاسبة الكاش
    const cashTable = document.getElementById("cashCalcTable");
    if(cashTable) {
        cashTable.addEventListener("input", (e) => {
            if (e.target.matches('[contenteditable="true"]')) {
                handleCashCalcInput(e);
            }
        });
        cashTable.addEventListener("keydown", (e) => {
            if (e.target.matches('[contenteditable="true"]')) {
                handleTableKeyDown(e);
            }
        });
        cashTable.addEventListener("focusin", handleTableFocusIn);
        cashTable.addEventListener("focusout", handleTableFocusOut);
    }

    // تشغيل آلة الحاسبة
    const calcGrid = document.querySelector(".calc-grid");
    if(calcGrid) calcGrid.addEventListener("click", handleCalcClick);

    // إنشاء صف أولي إذا كان فارغاً
    const mainTable = document.getElementById("mainTableBody");
    if (mainTable && mainTable.children.length === 0) {
        createNewRow();
    }

    // تحديث حالة زر الإضافة
    if (typeof updateAddRowButtonState === 'function') {
        updateAddRowButtonState();
    }

    // تحميل كل تقفيلات الموظفين
    if (typeof loadAllClosures === 'function') {
        loadAllClosures();
    }
    
    // ربط زر الإغلاق - بعد تأكد تحميل closure.js
    setTimeout(() => {
        const closeBtn = document.getElementById("closeFundBtn");
        if(closeBtn) {
            console.log("Binding close button click event"); // Debug
            
            // إزالة أي event listener سابق عن طريق استبدال الزر
            const newCloseBtn = closeBtn.cloneNode(true);
            closeBtn.parentNode.replaceChild(newCloseBtn, closeBtn);
            
            // ربط الحدث على الزر الجديد
            newCloseBtn.addEventListener("click", function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log("Close button clicked"); // Debug
                
                // التحقق من initiateClosure في window أولاً، ثم في النطاق العام
                const closureFunc = window.initiateClosure || (typeof initiateClosure !== 'undefined' ? initiateClosure : null);
                
                if (typeof closureFunc === 'function') {
                    console.log("Calling initiateClosure"); // Debug
                    closureFunc();
                } else {
                    console.error("initiateClosure function not found. window.initiateClosure:", typeof window.initiateClosure);
                    if (typeof showToast === 'function') {
                        showToast("خطأ: وظيفة الإغلاق غير متاحة", "error");
                    } else {
                        alert("خطأ: وظيفة الإغلاق غير متاحة");
                    }
                }
            });
            
            // تحديث حالة الزر بناءً على وجود صف نشط
            const activeRow = document.querySelector(".active-row");
            if (activeRow) {
                newCloseBtn.disabled = false;
                console.log("Close button enabled"); // Debug
            } else {
                newCloseBtn.disabled = true;
                console.log("Close button disabled - no active row"); // Debug
            }
        } else {
            console.error("closeFundBtn not found");
        }
    }, 200);
});


// ============================
//  تحميل كل تقفيلات الموظفين مع Pagination
// ============================
let allClosures = []; // تخزين جميع التقفيلات
let currentPage = 1;
const rowsPerPage = 4; // 4 صفوف في كل صفحة

async function loadAllClosures() {
    // التحقق من وجود حالة حذف محفوظة
    try {
        const deletedState = typeof getStorageItem === 'function' 
            ? getStorageItem('cashbox_closures_deleted')
            : localStorage.getItem('cashbox_closures_deleted');
        
        if (deletedState === 'true') {
            // إذا تم الحذف مسبقاً، لا تحمل البيانات من السيرفر
            allClosures = [];
            renderTablePage(1);
            updateDashboardMetrics();
            return;
        }
    } catch (e) {
        // تجاهل الخطأ والمتابعة
    }
    
    const res = await apiRequest("/closure/all", "GET");

    if (!res || !res.reports) {
        allClosures = [];
        renderTablePage(1);
        return;
    }

    // حفظ جميع التقفيلات (الأحدث أولاً)
    allClosures = res.reports.reverse();
    
    // عرض الصفحة الأولى (آخر 4 تقفيلات)
    renderTablePage(1);
    updateDashboardMetrics();
}

function renderTablePage(page) {
    const tableBody = document.getElementById("mainTableBody");
    const paginationContainer = document.getElementById("tablePagination");
    
    // حفظ الصف النشط والصفوف المغلقة المحلية قبل مسح الجدول
    const activeRow = document.querySelector(".active-row");
    const localClosedRows = Array.from(document.querySelectorAll(".closed-row"));
    let activeRowHTML = null;
    let localClosedRowsHTML = [];
    
    if (activeRow) {
        activeRowHTML = activeRow.outerHTML;
    }
    
    // حفظ الصفوف المغلقة المحلية (التي لم يتم حفظها في السيرفر بعد)
    localClosedRows.forEach(row => {
        localClosedRowsHTML.push(row.outerHTML);
    });
    
    // مسح الجدول بالكامل
    tableBody.innerHTML = "";
    
    // إعادة إضافة الصف النشط في الأعلى إذا كان موجوداً
    if (activeRowHTML) {
        tableBody.insertAdjacentHTML('afterbegin', activeRowHTML);
    }
    
    // إضافة الصفوف المغلقة المحلية بعد الصف النشط مباشرة
    if (localClosedRowsHTML.length > 0 && activeRowHTML) {
        const activeRowElement = tableBody.querySelector(".active-row");
        if (activeRowElement) {
            // إدراج جميع الصفوف المغلقة المحلية بعد الصف النشط مباشرة
            localClosedRowsHTML.forEach(rowHTML => {
                activeRowElement.insertAdjacentHTML('afterend', rowHTML);
            });
        }
    } else if (localClosedRowsHTML.length > 0) {
        // إذا لم يكن هناك صف نشط، نضيف الصفوف المغلقة في البداية
        localClosedRowsHTML.forEach(rowHTML => {
            tableBody.insertAdjacentHTML('afterbegin', rowHTML);
        });
    }
    
    // حساب الصفوف للصفحة الحالية (الأحدث أولاً)
    // الصفحة 1 = آخر 4 صفوف (indices: length-4 to length-1)
    // الصفحة 2 = الـ 4 التالية (indices: length-8 to length-5)
    const totalRows = allClosures.length;
    const startIndex = Math.max(0, totalRows - (page * rowsPerPage));
    const endIndex = totalRows - ((page - 1) * rowsPerPage);
    const pageData = allClosures.slice(startIndex, endIndex);
    
    // إضافة صفوف الصفحة الحالية (من الأحدث إلى الأقدم)
    pageData.reverse().forEach(rep => {
        const row = document.createElement("tr");
        row.classList.add("closed-row");

        // Sanitize employee name and notes
        const safeEmpName = typeof sanitizeUserInput === 'function' ? sanitizeUserInput(rep.employeeName || "موظف") : (rep.employeeName || "موظف");
        const safeNotes = typeof sanitizeText === 'function' ? sanitizeText(rep.notes || "") : (rep.notes || "");
        const safeCloseTime = typeof sanitizeText === 'function' ? sanitizeText(rep.closeTime || "-") : (rep.closeTime || "-");
        
        // استخدام DOM manipulation بدلاً من innerHTML للأمان
        const td1 = document.createElement('td');
        td1.className = 'row-num';
        td1.textContent = '-';
        
        const td2 = document.createElement('td');
        td2.textContent = (rep.treasuryReserve || 0).toString();
        
        const td3 = document.createElement('td');
        td3.textContent = (rep.purchaseInvoices || 0).toString();
        
        const td4 = document.createElement('td');
        td4.className = 'emp-name';
        td4.textContent = safeEmpName;
        
        const td5 = document.createElement('td');
        td5.textContent = safeCloseTime;
        
        const td6 = document.createElement('td');
        td6.textContent = (rep.actualCash || 0).toString();
        
        const td7 = document.createElement('td');
        td7.textContent = (rep.network || 0).toString();
        
        const td8 = document.createElement('td');
        td8.textContent = (rep.bankTransfer || 0).toString();
        
        const td9 = document.createElement('td');
        td9.textContent = (rep.programRevenue || 0).toString();
        
        const td10 = document.createElement('td');
        td10.textContent = (rep.variance || 0).toString();
        
        const td11 = document.createElement('td');
        td11.className = 'notes-cell';
        td11.textContent = safeNotes;
        
        const td12 = document.createElement('td');
        const statusSpan = document.createElement('span');
        statusSpan.className = 'status-closed';
        statusSpan.textContent = 'تم الإغلاق';
        td12.appendChild(statusSpan);
        
        row.appendChild(td1);
        row.appendChild(td2);
        row.appendChild(td3);
        row.appendChild(td4);
        row.appendChild(td5);
        row.appendChild(td6);
        row.appendChild(td7);
        row.appendChild(td8);
        row.appendChild(td9);
        row.appendChild(td10);
        row.appendChild(td11);
        row.appendChild(td12);

        tableBody.appendChild(row);
    });

    // تحديث أرقام الصفوف
    updateRowNumbers(1);
    
    // عرض pagination إذا كان هناك أكثر من 4 تقفيلات
    const totalPages = Math.ceil(allClosures.length / rowsPerPage);
    if (totalPages > 1) {
        renderPagination(totalPages, page);
        paginationContainer.style.display = "flex";
    } else {
        paginationContainer.style.display = "none";
    }
    
    currentPage = page;
}

function renderPagination(totalPages, currentPageNum) {
    const paginationContainer = document.getElementById("tablePagination");
    if (!paginationContainer) return;
    
    paginationContainer.innerHTML = "";
    
    // زر السابق
    const prevBtn = document.createElement("button");
    prevBtn.className = "page-btn";
    prevBtn.textContent = "← السابق";
    prevBtn.disabled = currentPageNum === 1;
    prevBtn.addEventListener('click', () => {
        if (currentPageNum > 1) renderTablePage(currentPageNum - 1);
    });
    paginationContainer.appendChild(prevBtn);
    
    // أزرار الصفحات - استخدام event delegation للأداء الأفضل
    const pagesContainer = document.createElement('div');
    pagesContainer.style.display = 'flex';
    pagesContainer.style.gap = '10px';
    
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement("button");
        pageBtn.className = `page-btn ${i === currentPageNum ? "active" : ""}`;
        pageBtn.textContent = i;
        pageBtn.dataset.page = i;
        pagesContainer.appendChild(pageBtn);
    }
    
    // Event delegation للصفحات
    pagesContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('page-btn')) {
            const page = parseInt(e.target.dataset.page);
            if (page) renderTablePage(page);
        }
    });
    paginationContainer.appendChild(pagesContainer);
    
    // زر التالي
    const nextBtn = document.createElement("button");
    nextBtn.className = "page-btn";
    nextBtn.textContent = "التالي →";
    nextBtn.disabled = currentPageNum === totalPages;
    nextBtn.addEventListener('click', () => {
        if (currentPageNum < totalPages) renderTablePage(currentPageNum + 1);
    });
    paginationContainer.appendChild(nextBtn);
}

// ============================
//  حذف جميع الصفوف
// ============================
function confirmDeleteAllRows() {
    const modal = document.getElementById("deleteConfirmModal");
    if (modal) {
        modal.style.display = "flex";
        // إغلاق النافذة عند النقر خارجها - استخدام addEventListener بدلاً من onclick
        if (!modal.hasAttribute('data-listener-attached')) {
            modal.setAttribute('data-listener-attached', 'true');
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    closeDeleteModal();
                }
            });
        }
    }
}

function closeDeleteModal() {
    const modal = document.getElementById("deleteConfirmModal");
    if (modal) {
        modal.style.display = "none";
    }
}

async function deleteAllRows() {
    const tableBody = document.getElementById("mainTableBody");
    const activeRow = document.querySelector(".active-row");
    
    // حذف جميع الصفوف المغلقة فقط (باستثناء الصف النشط)
    const closedRows = document.querySelectorAll(".closed-row");
    closedRows.forEach(row => row.remove());
    
    // إعادة تعيين البيانات
    allClosures = [];
    currentPage = 1;
    
    // حفظ الحالة في localStorage لمنع إرجاع الصفوف بعد refresh
    try {
        if (typeof setStorageItem === 'function') {
            setStorageItem('cashbox_closures_deleted', 'true');
            setStorageItem('cashbox_all_closures', JSON.stringify([]));
        } else {
            localStorage.setItem('cashbox_closures_deleted', 'true');
            localStorage.setItem('cashbox_all_closures', JSON.stringify([]));
        }
    } catch (e) {
        console.error('Error saving delete state:', e);
    }
    
    // إخفاء pagination
    const paginationContainer = document.getElementById("tablePagination");
    if (paginationContainer) {
        paginationContainer.style.display = "none";
    }
    
    // تحديث الداشبورد
    updateDashboardMetrics();
    
    // إغلاق النافذة
    closeDeleteModal();
    
    // عرض رسالة نجاح
    if (typeof showToast === 'function') {
        showToast("تم حذف جميع صفوف التقفيلات بنجاح", "success");
    }
}

