const counts = {
    Fazar: { day: 0, month: 0 },
    Duhar: { day: 0, month: 0 },
    Ashar: { day: 0, month: 0 },
    Magrib: { day: 0, month: 0 },
    Esha: { day: 0, month: 0 }
};

function Increment(prayerName) {
    const current = counts[prayerName];
    current.day += 1;

    if (current.day === 30) {
        current.month += 1;
        current.day = 0;
    }

    document.getElementById(`Day-${prayerName}`).innerText = current.day;
    document.getElementById(`Month-${prayerName}`).innerText = current.month;
}
