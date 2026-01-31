// إنشاء صف جديد (دائماً في الأعلى)
function createNewRow() {
  const tableBody = document.getElementById("mainTableBody");
  
  // إزالة النشاط من الصفوف السابقة
  document.querySelectorAll(".active-row").forEach(row => {
      row.classList.remove("active-row");
  });

  const newRow = document.createElement("tr");
  newRow.className = "active-row";
  
  // استدعاء اسم الموظف من التخزين - تنظيفه من HTML لتجنب XSS
  const rawEmpName = localStorage.getItem("username") || "موظف";
  const empName = typeof sanitizeUserInput === 'function' 
    ? sanitizeUserInput(rawEmpName) 
    : rawEmpName.replace(/[<>]/g, ''); // Fallback إذا لم يتم تحميل security.js

  // ترقيم الصفوف (الجديد هو 1)
  updateRowNumbers(2);

  // استخدام DOM manipulation بدلاً من innerHTML للأمان
  const rowNum = document.createElement('td');
  rowNum.className = 'row-num';
  rowNum.textContent = '1';
  
  const treasuryReserve = document.createElement('td');
  treasuryReserve.contentEditable = 'true';
  treasuryReserve.dataset.field = 'treasuryReserve';
  treasuryReserve.textContent = '0';
  
  const expense = document.createElement('td');
  expense.contentEditable = 'true';
  expense.dataset.field = 'expense';
  expense.textContent = '0';
  
  const empNameCell = document.createElement('td');
  empNameCell.className = 'emp-name';
  empNameCell.textContent = empName;
  
  const timeCell = document.createElement('td');
  timeCell.className = 'time-cell';
  timeCell.textContent = '-';
  
  const cash = document.createElement('td');
  cash.contentEditable = 'true';
  cash.dataset.field = 'cash';
  cash.textContent = '0';
  
  const network = document.createElement('td');
  network.contentEditable = 'true';
  network.dataset.field = 'network';
  network.textContent = '0';
  
  const bankTransfer = document.createElement('td');
  bankTransfer.contentEditable = 'true';
  bankTransfer.dataset.field = 'bankTransfer';
  bankTransfer.textContent = '0';
  
  const programRevenue = document.createElement('td');
  programRevenue.contentEditable = 'true';
  programRevenue.dataset.field = 'programRevenue';
  programRevenue.textContent = '0';
  
  const variance = document.createElement('td');
  variance.className = 'variance-neutral';
  variance.dataset.field = 'variance';
  variance.textContent = '0';
  
  const notes = document.createElement('td');
  notes.contentEditable = 'true';
  notes.dataset.field = 'notes';
  notes.className = 'notes-cell';
  
  const statusCell = document.createElement('td');
  statusCell.className = 'status-cell';
  const statusSpan = document.createElement('span');
  statusSpan.className = 'status-active';
  statusSpan.textContent = 'نشط 🟢';
  statusCell.appendChild(statusSpan);
  
  // إضافة جميع الخلايا للصف
  newRow.appendChild(rowNum);
  newRow.appendChild(treasuryReserve);
  newRow.appendChild(expense);
  newRow.appendChild(empNameCell);
  newRow.appendChild(timeCell);
  newRow.appendChild(cash);
  newRow.appendChild(network);
  newRow.appendChild(bankTransfer);
  newRow.appendChild(programRevenue);
  newRow.appendChild(variance);
  newRow.appendChild(notes);
  newRow.appendChild(statusCell);

  tableBody.prepend(newRow);
  
  // تصفير الأدوات
  if (typeof handleClearCashCalc === 'function') handleClearCashCalc();
  if (typeof clearCalc === 'function') clearCalc();
  const notesBox = document.getElementById("notesBox");
  if (notesBox) notesBox.value = "";

  // تحديث زر الإغلاق
  // تحديث حالة زر الإغلاق
  if(typeof updateCloseButtonState === 'function') {
    updateCloseButtonState(newRow);
  } else {
    // Fallback: تفعيل الزر مباشرة
    const closeBtn = document.getElementById("closeFundBtn");
    if(closeBtn) {
      closeBtn.disabled = false;
    }
  }
  
  // تحديث حالة زر الإضافة
  if(typeof updateAddRowButtonState === 'function') updateAddRowButtonState();
  
  // إضافة event listeners للتحقق من حالة الصف
  const editableFields = ['treasuryReserve', 'expense', 'cash', 'network', 'bankTransfer', 'programRevenue', 'notes'];
  editableFields.forEach(field => {
    const cell = newRow.querySelector(`[data-field="${field}"]`);
    if (cell && cell.isContentEditable) {
      cell.addEventListener('input', updateAddRowButtonState);
      cell.addEventListener('blur', updateAddRowButtonState);
    }
  });
}

function updateRowNumbers(startFrom) {
    const rows = document.querySelectorAll("#mainTableBody tr");
    let counter = startFrom;
    for (let i = 0; i < rows.length; i++) {
        if(!rows[i].classList.contains("active-row")) {
             const numCell = rows[i].querySelector(".row-num") || rows[i].cells[0];
             if(numCell) numCell.textContent = counter++;
        }
    }
}

// --- منطق إزالة الصفر (UX) ---
function handleTableFocusIn(event) {
    const cell = event.target;
    if (cell.isContentEditable && cell.textContent === "0") {
        cell.textContent = ""; // مسح الصفر للكتابة فوراً
    }
}

function handleTableFocusOut(event) {
    const cell = event.target;
    if (cell.isContentEditable) {
        if (cell.textContent.trim() === "") {
            cell.textContent = "0"; // استعادة الصفر إذا ترك فارغاً
        }
        // إعادة الحساب عند الخروج
        if (cell.closest("tr")) recalculateRow(cell.closest("tr"));
    }
}

function handleTableInput(event) {
    const cell = event.target;
    if (cell.isContentEditable) {
        // السماح فقط بالأرقام والنقطة
        cell.textContent = cell.textContent.replace(/[^0-9.]/g, '');
    }
}

function handleTableKeyDown(event) {
    const cell = event.target;
    if (cell.isContentEditable) {
        // السماح بـ Enter و Tab و Arrow keys
        if (event.key === 'Enter') {
            event.preventDefault();
            const nextCell = cell.parentElement.nextElementSibling?.querySelector('[contenteditable]');
            if (nextCell) nextCell.focus();
        }
    }
}

// دالة الحساب (المعدلة للشبكة الموحدة)
function recalculateRow(row) {
  const getVal = (field) => parseFloat(row.querySelector(`[data-field="${field}"]`).textContent) || 0;

  const expense = getVal("expense");
  const cash = getVal("cash");
  const network = getVal("network"); // حقل واحد للشبكة
  const bankTransfer = getVal("bankTransfer");
  const programRevenue = getVal("programRevenue");

  const actualTotal = cash + network + bankTransfer + expense;
  const variance = actualTotal - programRevenue;

  const varianceCell = row.querySelector('[data-field="variance"]');
  if (!varianceCell) return;
  
  varianceCell.textContent = variance.toFixed(2);
  
  varianceCell.className = "";
  if (variance > 0) varianceCell.classList.add("variance-positive");
  else if (variance < 0) varianceCell.classList.add("variance-negative");
  else varianceCell.classList.add("variance-neutral");

  if(typeof updateCloseButtonState === 'function') updateCloseButtonState(row);
}

// التحقق من وجود صف نشط فارغ
function hasEmptyActiveRow() {
    const activeRow = document.querySelector(".active-row");
    if (!activeRow) return false;
    
    // الحقول القابلة للتعديل
    const editableFields = ['treasuryReserve', 'expense', 'cash', 'network', 'bankTransfer', 'programRevenue'];
    
    // التحقق من أن جميع الحقول = 0 أو فارغة
    let isEmpty = true;
    editableFields.forEach(field => {
        const cell = activeRow.querySelector(`[data-field="${field}"]`);
        if (cell) {
            const value = parseFloat(cell.textContent) || 0;
            if (value !== 0) {
                isEmpty = false;
            }
        }
    });
    
    // التحقق من الملاحظات
    const notesCell = activeRow.querySelector('[data-field="notes"]');
    if (notesCell && notesCell.textContent.trim() !== '') {
        isEmpty = false;
    }
    
    return isEmpty;
}

// إضافة صف جديد فقط إذا لم يكن هناك صف نشط فارغ
function addNewRowIfAllowed() {
    if (hasEmptyActiveRow()) {
        // عرض رسالة للمستخدم
        if (typeof showToast === 'function') {
            showToast('يوجد صف نشط فارغ. يرجى ملء الصف الحالي أولاً أو إغلاقه.', 'warning');
        } else {
            alert('يوجد صف نشط فارغ. يرجى ملء الصف الحالي أولاً أو إغلاقه.');
        }
        return;
    }
    
    // إضافة الصف الجديد
    createNewRow();
    
    // تحديث حالة الزر
    updateAddRowButtonState();
}

// تحديث حالة زر الإضافة
function updateAddRowButtonState() {
    const addRowBtn = document.getElementById('addRowBtn');
    if (!addRowBtn) return;
    
    if (hasEmptyActiveRow()) {
        addRowBtn.disabled = true;
        addRowBtn.title = 'يوجد صف نشط فارغ. يرجى ملء الصف الحالي أولاً أو إغلاقه.';
    } else {
        addRowBtn.disabled = false;
        addRowBtn.title = 'إضافة صف جديد';
    }
}

// تحديث الداشبورد (يقرأ من الصفوف المغلقة فقط)
function updateDashboardMetrics() {
    let totalRevenue = 0, totalCash = 0, totalNet = 0, totalVariance = 0;

    document.querySelectorAll("tr.closed-row").forEach(row => {
        // دالة آمنة للحصول على القيمة
        const getVal = (field) => {
            const cell = row.querySelector(`[data-field="${field}"]`);
            if (!cell) {
                // محاولة قراءة من الخلايا مباشرة (للصفوف المغلقة القديمة)
                // الصفوف المغلقة لها بنية: م، احتياطي، مصروف، موظف، وقت، كاش، شبكة، تحويل، إيراد، انحراف، ملاحظات، حالة
                const cells = row.querySelectorAll('td');
                if (cells.length >= 9) {
                    switch(field) {
                        case 'programRevenue': return parseFloat(cells[8]?.textContent) || 0;
                        case 'cash': return parseFloat(cells[5]?.textContent) || 0;
                        case 'network': return parseFloat(cells[6]?.textContent) || 0;
                        case 'bankTransfer': return parseFloat(cells[7]?.textContent) || 0;
                        case 'variance': return parseFloat(cells[9]?.textContent) || 0;
                        default: return 0;
                    }
                }
                return 0;
            }
            return parseFloat(cell.textContent) || 0;
        };
        
        totalRevenue += getVal("programRevenue");
        totalCash += getVal("cash");
        totalNet += getVal("network") + getVal("bankTransfer");
        totalVariance += getVal("variance");
    });

    const metricTotalRevenue = document.getElementById("metricTotalRevenue");
    const metricTotalCash = document.getElementById("metricTotalCash");
    const metricTotalNet = document.getElementById("metricTotalNet");
    const varEl = document.getElementById("metricTotalVariance");
    
    if (metricTotalRevenue) metricTotalRevenue.textContent = totalRevenue.toLocaleString();
    if (metricTotalCash) metricTotalCash.textContent = totalCash.toLocaleString();
    if (metricTotalNet) metricTotalNet.textContent = totalNet.toLocaleString();
    
    if (varEl) {
        varEl.textContent = totalVariance.toLocaleString();
        varEl.style.color = totalVariance === 0 ? "#aaa" : (totalVariance > 0 ? "#2ecc71" : "#e74c3c");
    }
}

