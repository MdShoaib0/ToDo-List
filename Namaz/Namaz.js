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

gsap.from("#Fazar", {
    y: 50,
    duration: 1,
    scrollTrigger: {
        trigger: ".quote",   // Trigger on elements with the class "quote"
        scroller: "body",    // Scrolling the whole page
        // markers: true,       // Show markers for debugging
        start: "top 80%",    // Start the animation when the top of the element hits 80% of the viewport
        end: "bottom top",   // End when the bottom of the element hits the top of the viewport
        scrub: 1             // Smooth scroll animation
    }
});

gsap.from("#Duhar", {
    y: 50,
    duration: 1,
    scrollTrigger: {
        trigger: ".quote",   // Trigger on elements with the class "quote"
        scroller: "body",    // Scrolling the whole page
        // markers: true,       // Show markers for debugging
        start: "top 80%",    // Start the animation when the top of the element hits 80% of the viewport
        end: "bottom top",   // End when the bottom of the element hits the top of the viewport
        scrub: 1             // Smooth scroll animation
    }
});

gsap.from("#Ashar", {
    y: 50,
    duration: 1,
    delay: 0.1,
    scrollTrigger: {
        trigger: ".quote",   // Trigger on elements with the class "quote"
        scroller: "body",    // Scrolling the whole page
        // markers: true,       // Show markers for debugging
        start: "top 80%",    // Start the animation when the top of the element hits 80% of the viewport
        end: "bottom top",   // End when the bottom of the element hits the top of the viewport
        scrub: 1             // Smooth scroll animation
    }
});

gsap.from("#Magrib", {
    y: 50,
    duration: 1,
    delay: 0.2,
    scrollTrigger: {
        trigger: ".quote",   // Trigger on elements with the class "quote"
        scroller: "body",    // Scrolling the whole page
        // markers: true,       // Show markers for debugging
        start: "top 75%",    // Start the animation when the top of the element hits 80% of the viewport
        end: "bottom top",   // End when the bottom of the element hits the top of the viewport
        scrub: 1             // Smooth scroll animation
    }
});

gsap.from("#Esha", {
    y: 50,
    duration: 1,
    delay: 0.3,
    scrollTrigger: {
        trigger: ".quote",   // Trigger on elements with the class "quote"
        scroller: "body",    // Scrolling the whole page
        // markers: true,       // Show markers for debugging
        start: "top 60%",    // Start the animation when the top of the element hits 80% of the viewport
        end: "bottom top",   // End when the bottom of the element hits the top of the viewport
        scrub: 1             // Smooth scroll animation
    }
});

gsap.to(".title", {
    y: 50,
    duration: 1,
    scrollTrigger: {
        trigger: ".quote",   // Trigger on elements with the class "quote"
        scroller: "body",    // Scrolling the whole page
        // markers: true,       // Show markers for debugging
        start: "top 10%",    // Start the animation when the top of the element hits 80% of the viewport
        end: "bottom 5%",   // End when the bottom of the element hits the top of the viewport
        scrub: 2             // Smooth scroll animation
    }
})