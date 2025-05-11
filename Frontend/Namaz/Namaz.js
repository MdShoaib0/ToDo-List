// -------------------- Initialize prayers object --------------------
let prayers = {};

// -------------------- Default prayer data (used only if local storage is empty) --------------------
const defaultPrayers = {
    Fazar: { days: 0 },
    Duhar: { days: 0 },
    Ashar: { days: 0 },
    Magrib: { days: 0 },
    Esha: { days: 0 }
};

// -------------------- Load data from Local Storage --------------------
function loadData() {
    const stored = localStorage.getItem("prayersData");

    if (stored) {
        prayers = JSON.parse(stored);
    } else {
        prayers = { ...defaultPrayers };
        localStorage.setItem("prayersData", JSON.stringify(prayers));
    }

    Object.keys(prayers).forEach(prayer => updateUI(prayer));
}

// -------------------- Convert total days to years, months, days --------------------
function convertDays(days) {
    const years = Math.floor(days / 360);
    const months = Math.floor((days % 360) / 30);
    const day = days % 30;
    return { years, months, day };
}

// -------------------- Update UI --------------------
function updateUI(prayer) {
    const totalDays = prayers[prayer].days;
    const done = convertDays(totalDays);
    const remaining = convertDays(3600 - totalDays);

    // Done
    document.getElementById(`Year-${prayer}`).textContent = done.years;
    document.getElementById(`Month-${prayer}`).textContent = done.months;
    document.getElementById(`Day-${prayer}`).textContent = done.day;

    // Remaining
    document.getElementById(`Remain-Year-${prayer}`).textContent = remaining.years;
    document.getElementById(`Remain-Month-${prayer}`).textContent = remaining.months;
    document.getElementById(`Remain-Day-${prayer}`).textContent = remaining.day;
}

// -------------------- Increment Prayer --------------------
function Increment(prayer) {
    prayers[prayer].days += 1;

    // Save to local storage
    localStorage.setItem("prayersData", JSON.stringify(prayers));

    updateUI(prayer);
    animateBox(prayer);
}

// -------------------- Animation --------------------
function animateBox(prayer) {
    gsap.to(`#${prayer}`, {
        scale: 0.95,
        duration: 0.2,
        yoyo: true,
        repeat: 1
    });
}

// -------------------- On Page Load --------------------
document.addEventListener('DOMContentLoaded', () => {
    loadData();

    ['#Fazar', '#Duhar', '#Ashar', '#Magrib', '#Esha'].forEach((id, index) => {
        gsap.from(id, {
            y: 50,
            duration: 1,
            delay: 0.1 * index,
            scrollTrigger: {
                trigger: ".container",
                start: "top 80%",
                end: "bottom top",
                scrub: 1
            }
        });
    });

    gsap.to(".title", {
        y: 50,
        duration: 1,
        scrollTrigger: {
            trigger: ".container",
            start: "top 10%",
            end: "bottom 5%",
            scrub: 2
        }
    });
});
