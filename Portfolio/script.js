
// 1. Mobile Navigation Menu

const menuToggle = document.getElementById("menuToggle");

const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", function () {

    navLinks.classList.toggle("active");

    // Change menu icon
    if (navLinks.classList.contains("active")) {
        menuToggle.innerHTML = "&#10005;";
    } else {
        menuToggle.innerHTML = "&#9776;";
    }

});

// 2. Close Menu After Clicking a Link

const menuItems = document.querySelectorAll(".nav-links a");

menuItems.forEach(function (item) {

    item.addEventListener("click", function () {

        navLinks.classList.remove("active");

        menuToggle.innerHTML = "&#9776;";

    });

});

// 3. Automatically Update Footer Year

const year = document.getElementById("year");

year.textContent = new Date().getFullYear();

// 4. Scroll Reveal Animation

const sections = document.querySelectorAll(
    ".section, .home-content, .home-image"
);

const observer = new IntersectionObserver(function (entries) {

    entries.forEach(function (entry) {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {
    threshold: 0.15
});

sections.forEach(function (section) {

    observer.observe(section);

});
