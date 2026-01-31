/**
 * SeasonsPage.js
 * نسخة من الكود المرجعي - بدون أي تعديل
 */

class SeasonsPage {
    async render() {
        return `
            <div class="card">
                <h1 class="card-title">📅 تقويم المواسم</h1>
                <div class="subtitle">منظومة إدارة المواسم والإجازات - يتم تمييز الموسم القادم (خلال 60 يوماً) بإطار ذهبي</div>
                <div class="std-table-wrapper">
                    <table class="std-table">
                        <thead><tr><th>التصنيف</th><th>الحدث</th><th>التاريخ الهجري</th><th>التاريخ الميلادي</th></tr></thead>
                        <tbody id="seasonsBody"></tbody>
                    </table>
                </div>
            </div>
        `;
    }

    init() {
        buildSeasonsTable();
    }
}

const seasonEvents = [ 
    { greg: "26/06/2025", hijri: "01/01/1447", title: "بداية إجازة نهاية العام الدراسي للطلاب 1447", type: "موسم" }, 
    { greg: "24/08/2025", hijri: "01/03/1447", title: "بداية العام الدراسي 2025-2026", type: "ركود" }, 
    { greg: "23/09/2025", hijri: "01/04/1447", title: "إجازة اليوم الوطني 2025", type: "موسم" }, 
    { greg: "21/11/2025", hijri: "30/05/1447", title: "بداية إجازة الخريف 2025", type: "موسم" }, 
    { greg: "29/11/2025", hijri: "08/06/1447", title: "نهاية إجازة الخريف 2025", type: "ركود" }, 
    { greg: "11/12/2025", hijri: "20/06/1447", title: "بداية إجازة إضافية 2025", type: "موسم" }, 
    { greg: "14/12/2025", hijri: "23/06/1447", title: "نهاية الإجازة الإضافية 2025", type: "ركود" }, 
    { greg: "09/01/2026", hijri: "20/07/1447", title: "بداية إجازة منتصف العام الدراسي", type: "موسم" }, 
    { greg: "17/01/2026", hijri: "28/07/1447", title: "نهاية إجازة منتصف العام الدراسي", type: "ركود" }, 
    { greg: "22/02/2026", hijri: "05/09/1447", title: "إجازة يوم التأسيس 2026", type: "موسم" }, 
    { greg: "06/03/2026", hijri: "17/09/1447", title: "بداية إجازة عيد الفطر 2026", type: "موسم" }, 
    { greg: "28/03/2026", hijri: "09/10/1447", title: "نهاية إجازة عيد الفطر 2026", type: "ركود" }, 
    { greg: "22/05/2026", hijri: "15/12/1447", title: "بداية إجازة عيد الأضحى 2026", type: "موسم" }, 
    { greg: "01/06/2026", hijri: "25/12/1447", title: "نهاية إجازة عيد الأضحى 2026", type: "ركود" }, 
    { greg: "25/06/2026", hijri: "10/01/1448", title: "بداية إجازة نهاية العام الدراسي", type: "موسم" } 
];

function parseDMY(str) { 
    const parts = str.split("/"); 
    return new Date(parseInt(parts[2],10), parseInt(parts[1],10)-1, parseInt(parts[0],10)); 
}

function buildSeasonsTable() { 
    const today = new Date(); 
    today.setHours(0,0,0,0); 
    const sorted = seasonEvents.slice().sort((a,b) => parseDMY(a.greg) - parseDMY(b.greg)); 
    const tbody = document.getElementById('seasonsBody'); 
    if (!tbody) return; 
    tbody.innerHTML = ""; 
    let foundNext = false; 
    for (const ev of sorted) { 
        const evDate = parseDMY(ev.greg); 
        const diffTime = evDate - today; 
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        const isNext = !foundNext && diffDays >= 0 && diffDays <= 60; 
        const tr = document.createElement('tr'); 
        if (isNext) { 
            tr.className = 'highlight-next-season'; 
            foundNext = true; 
        } 
        const tdType = document.createElement('td'); 
        const badge = document.createElement('span'); 
        badge.className = 'badge ' + (ev.type === 'موسم' ? 'badge-season' : 'badge-rukood'); 
        badge.textContent = ev.type === 'موسم' ? 'موسم / إجازة' : 'دراسة / دوام'; 
        tdType.appendChild(badge); 
        const tdTitle = document.createElement('td'); 
        tdTitle.textContent = ev.title + (isNext ? " (قريباً 🔥)" : ""); 
        const tdHijri = document.createElement('td'); 
        tdHijri.textContent = ev.hijri; 
        const tdGreg = document.createElement('td'); 
        tdGreg.textContent = ev.greg; 
        tr.appendChild(tdType); 
        tr.appendChild(tdTitle); 
        tr.appendChild(tdHijri); 
        tr.appendChild(tdGreg); 
        tbody.appendChild(tr); 
    } 
}

window.SeasonsPage = SeasonsPage;
window.seasonsPage = new SeasonsPage();
