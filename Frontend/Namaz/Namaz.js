const baseUrl = "http://localhost:5000/prayers";
let prayers = {};

// Convert total days to years, months, days
function convertDays(days) {
    const years = Math.floor(days / 360);
    const months = Math.floor((days % 360) / 30);
    const day = days % 30;
    return { years, months, day };
}

// Update UI for one prayer
function updateUI(prayer) {
    const totalDays = prayers[prayer].days;
    const done = convertDays(totalDays);
    const remaining = convertDays(3600 - totalDays);

    document.getElementById(`Year-${prayer}`).textContent = done.years;
    document.getElementById(`Month-${prayer}`).textContent = done.months;
    document.getElementById(`Day-${prayer}`).textContent = done.day;

    document.getElementById(`Remain-Year-${prayer}`).textContent = remaining.years;
    document.getElementById(`Remain-Month-${prayer}`).textContent = remaining.months;
    document.getElementById(`Remain-Day-${prayer}`).textContent = remaining.day;
}

// Fetch data from backend
async function fetchPrayers() {
    try {
        const res = await fetch(baseUrl);
        const data = await res.json();
        prayers = {};

        data.forEach(prayer => {
            prayers[prayer.name] = { days: prayer.days };
        });

        Object.keys(prayers).forEach(prayer => updateUI(prayer));
    } catch (err) {
        console.error("Error loading prayers:", err);
    }
}

// Update prayer on backend (increment or decrement)
async function updatePrayer(prayer, change) {
    const currentDays = prayers[prayer]?.days || 0;
    const newDays = Math.max(0, currentDays + change);

    try {
        const res = await fetch(`${baseUrl}/${prayer}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ days: newDays }),
        });

        const updated = await res.json();
        prayers[updated.name] = { days: updated.days };
        updateUI(updated.name);
    } catch (err) {
        console.error("Error updating prayer:", err);
    }
}

function Increment(prayer) {
    updatePrayer(prayer, 1);
}

function Decrement(prayer) {
    updatePrayer(prayer, -1);
}

// On page load
document.addEventListener('DOMContentLoaded', () => {
    fetchPrayers();
});