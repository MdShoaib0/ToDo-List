document.addEventListener('DOMContentLoaded', function() {
    // Initialize or load data from localStorage
    if (!localStorage.getItem('namazData')) {
        const defaultData = {
            Fazar: { remainingDays: 3600, doneDays: 0 },
            Duhar: { remainingDays: 3600, doneDays: 0 },
            Ashar: { remainingDays: 3600, doneDays: 0 },
            Magrib: { remainingDays: 3600, doneDays: 0 },
            Esha: { remainingDays: 3600, doneDays: 0 }
        };
        localStorage.setItem('namazData', JSON.stringify(defaultData));
    }
    updateAllDisplays();
});

function convertDaysToYMD(days) {
    const years = Math.floor(days / 360);
    const remainingDaysAfterYears = days % 360;
    const months = Math.floor(remainingDaysAfterYears / 30);
    const day = remainingDaysAfterYears % 30;
    return { years, months, days: day };
}

function updateDisplay(namaz) {
    const data = JSON.parse(localStorage.getItem('namazData'));
    const remaining = convertDaysToYMD(data[namaz].remainingDays);
    const done = convertDaysToYMD(data[namaz].doneDays);

    // Update remaining elements
    document.getElementById(`Remain-Year-${namaz}`).textContent = remaining.years;
    document.getElementById(`Remain-Month-${namaz}`).textContent = remaining.months;
    document.getElementById(`Remain-Day-${namaz}`).textContent = remaining.days;

    // Update done elements
    document.getElementById(`Year-${namaz}`).textContent = done.years;
    document.getElementById(`Month-${namaz}`).textContent = done.months;
    document.getElementById(`Day-${namaz}`).textContent = done.days;
}

function updateAllDisplays() {
    const namazList = ['Fazar', 'Duhar', 'Ashar', 'Magrib', 'Esha'];
    namazList.forEach(namaz => updateDisplay(namaz));
}

function Increment(namaz) {
    const data = JSON.parse(localStorage.getItem('namazData'));
    if (data[namaz].remainingDays <= 0) return;

    data[namaz].remainingDays--;
    data[namaz].doneDays++;
    
    localStorage.setItem('namazData', JSON.stringify(data));
    updateDisplay(namaz);
}