
// Select all gallery images
const galleryItems = document.querySelectorAll(".gallery-item");

// Select filter buttons
const filterButtons = document.querySelectorAll(".filter-btn");

// Lightbox elements
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxCategory = document.getElementById("lightboxCategory");

// Navigation buttons
const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

// Store currently visible images
let visibleItems = [];

// Store the current image position
let currentIndex = 0;

// Update the visible images
function updateVisibleItems() {
    visibleItems = Array.from(galleryItems).filter(item => {
        return item.style.display !== "none";
    });
}

// Display image in the lightbox
function showImage(index) {
    if (visibleItems.length === 0) {
        return;
    }

    currentIndex = (index + visibleItems.length) % visibleItems.length;

    const selectedItem = visibleItems[currentIndex];

    const image = selectedItem.querySelector("img");
    const title = selectedItem.querySelector("h3");
    const category = selectedItem.querySelector("p");

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightboxTitle.textContent = title.textContent;
    lightboxCategory.textContent = category.textContent;

    lightbox.classList.add("show");
}

// Open lightbox when an image is clicked
galleryItems.forEach(item => {
    item.addEventListener("click", function () {
        updateVisibleItems();

        const clickedIndex = visibleItems.indexOf(item);

        showImage(clickedIndex);
    });
});

// Close lightbox
function closeLightbox() {
    lightbox.classList.remove("show");
}

closeBtn.addEventListener("click", closeLightbox);

// Show previous image
prevBtn.addEventListener("click", function () {
    showImage(currentIndex - 1);
});

// Show next image
nextBtn.addEventListener("click", function () {
    showImage(currentIndex + 1);
});

// Close when clicking outside the image
lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard navigation
document.addEventListener("keydown", function (event) {
    if (!lightbox.classList.contains("show")) {
        return;
    }

    if (event.key === "Escape") {
        closeLightbox();
    }

    if (event.key === "ArrowRight") {
        showImage(currentIndex + 1);
    }

    if (event.key === "ArrowLeft") {
        showImage(currentIndex - 1);
    }
});

// Category filtering
filterButtons.forEach(button => {
    button.addEventListener("click", function () {

        // Remove active class from all buttons
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        // Add active class to clicked button
        this.classList.add("active");

        const selectedCategory = this.dataset.filter;

        galleryItems.forEach(item => {
            const itemCategory = item.dataset.category;

            if (
                selectedCategory === "all" ||
                selectedCategory === itemCategory
            ) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });

        updateVisibleItems();
    });
});

// Display current year in footer
document.getElementById("year").textContent =
    new Date().getFullYear();

// Initialize visible images
updateVisibleItems();
