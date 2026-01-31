function printData(mode) {
    const title = mode === 'last' ? 'طباعة آخر تقفيلة' : 'طباعة سجل التقفيلات';
    
    // جمع البيانات
    let rowsToPrint = [];
    if (mode === 'last') {
        // البحث عن آخر صف مغلق (هو الذي تحت الصف النشط مباشرة)
        const closedRows = document.querySelectorAll("tr.closed-row");
        if(closedRows.length > 0) rowsToPrint.push(closedRows[0]); // أول صف مغلق هو الأحدث
    } else {
        rowsToPrint = document.querySelectorAll("tr.closed-row");
    }

    if (rowsToPrint.length === 0) {
        showToast("لا توجد بيانات مغلقة للطباعة", "warning");
        return;
    }

    // إنشاء نافذة الطباعة
    const printWindow = window.open('', '', 'width=900,height=600');
    
    let tableHTML = `
        <table border="1" style="width:100%; border-collapse:collapse; text-align:center; direction:rtl;">
            <thead style="background:#eee;">
                <tr>
                    <th>الموظف</th>
                    <th>التوقيت</th>
                    <th>الكاش</th>
                    <th>الشبكة</th>
                    <th>الإيراد</th>
                    <th>الانحراف</th>
                    <th>الملاحظات</th>
                </tr>
            </thead>
            <tbody>
    `;

    rowsToPrint.forEach(row => {
        const getVal = (sel) => {
            const cell = row.querySelector(`[data-field="${sel}"]`);
            if (!cell) return '0';
            // تنظيف النص من HTML لتجنب XSS
            return cell.textContent.replace(/[<>]/g, '') || '0';
        };
        
        // حساب الشبكة
        const net = parseFloat(getVal("network")) || 0;
        const bankTransfer = parseFloat(getVal("bankTransfer")) || 0;
        const totalNet = net + bankTransfer;

        // تنظيف البيانات قبل الإدراج
        const empName = row.cells[3] ? row.cells[3].textContent.replace(/[<>]/g, '') : 'موظف';
        const time = row.cells[4] ? row.cells[4].textContent.replace(/[<>]/g, '') : '-';

        tableHTML += `
            <tr>
                <td>${empName}</td>
                <td>${time}</td>
                <td>${getVal("cash")}</td>
                <td>${totalNet}</td>
                <td>${getVal("programRevenue")}</td>
                <td>${getVal("variance")}</td>
                <td>${getVal("notes")}</td>
            </tr>
        `;
    });

    tableHTML += `</tbody></table>`;

    // تنظيف title من HTML
    const cleanTitle = title.replace(/[<>]/g, '');
    
    printWindow.document.write(`
        <!DOCTYPE html>
        <html dir="rtl" lang="ar">
        <head>
            <meta charset="UTF-8">
            <title>${cleanTitle}</title>
            <style>
                body { font-family: 'Cairo', sans-serif; padding: 20px; }
                table { width: 100%; border-collapse: collapse; }
                th, td { border: 1px solid #000; padding: 8px; text-align: center; }
                th { background-color: #f0f0f0; }
            </style>
        </head>
        <body>
            <h2 style="text-align:center;">${cleanTitle}</h2>
            <p>تاريخ الطباعة: ${new Date().toLocaleString('ar-SA')}</p>
            <hr/>
            ${tableHTML}
            <script>
                window.onload = function() {
                    window.print();
                    setTimeout(function() { window.close(); }, 100);
                };
            </script>
        </body>
        </html>
    `);
    printWindow.document.close();
}

// ربط الأزرار
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("printLastBtn")?.addEventListener("click", () => printData('last'));
    document.getElementById("printAllBtn")?.addEventListener("click", () => printData('all'));
});

