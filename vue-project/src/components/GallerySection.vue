```vue
<script setup>
import { ref } from "vue";

defineProps({
    images: {
        type: Array,
        default: () => []
    }
});

const selectedImage = ref(null);
const selectedIndex = ref(0);

const openImage = (image, index) => {
    selectedImage.value = image;
    selectedIndex.value = index;
    document.body.style.overflow = "hidden";
};

const closeImage = () => {
    selectedImage.value = null;
    document.body.style.overflow = "";
};

const nextImage = () => {
    const currentImages = document.querySelectorAll(".gallery-item img");

    if (selectedIndex.value < currentImages.length - 1) {
        selectedIndex.value++;
        selectedImage.value = currentImages[selectedIndex.value].src;
    } else {
        selectedIndex.value = 0;
        selectedImage.value = currentImages[0].src;
    }
};

const previousImage = () => {
    const currentImages = document.querySelectorAll(".gallery-item img");

    if (selectedIndex.value > 0) {
        selectedIndex.value--;
        selectedImage.value = currentImages[selectedIndex.value].src;
    } else {
        selectedIndex.value = currentImages.length - 1;
        selectedImage.value = currentImages[selectedIndex.value].src;
    }
};

const handleKeydown = (event) => {
    if (!selectedImage.value) return;

    if (event.key === "Escape") {
        closeImage();
    }

    if (event.key === "ArrowRight") {
        nextImage();
    }

    if (event.key === "ArrowLeft") {
        previousImage();
    }
};
</script>

<template>
    <section
        v-if="images.length"
        class="gallery-section"
        @keydown="handleKeydown"
        tabindex="0"
    >

        <!-- Section Heading -->
        <div class="section-heading">
            <span>GALLERY</span>
            <h2>Visual Journey</h2>
        </div>


        <!-- Gallery -->
        <div class="gallery-grid">

            <div
                v-for="(image, index) in images"
                :key="index"
                class="gallery-item"
                @click="openImage(image, index)"
            >

                <img
                    :src="image"
                    :alt="`Gallery image ${index + 1}`"
                />

                <div class="gallery-overlay">
                    <span class="zoom-icon">+</span>
                    <span>VIEW IMAGE</span>
                </div>

                <div class="gallery-number">
                    {{ String(index + 1).padStart(2, "0") }}
                </div>

            </div>

        </div>


        <!-- Lightbox -->
        <Transition name="lightbox">

            <div
                v-if="selectedImage"
                class="lightbox"
                @click.self="closeImage"
            >

                <!-- Close -->
                <button
                    class="lightbox-close"
                    @click="closeImage"
                    aria-label="Close gallery"
                >
                    ×
                </button>


                <!-- Previous -->
                <button
                    class="lightbox-arrow lightbox-prev"
                    @click="previousImage"
                    aria-label="Previous image"
                >
                    ‹
                </button>


                <!-- Image -->
                <div class="lightbox-content">

                    <img
                        :src="selectedImage"
                        :alt="`Gallery image ${selectedIndex + 1}`"
                    />

                    <div class="lightbox-counter">
                        {{ String(selectedIndex + 1).padStart(2, "0") }}
                        /
                        {{ String(images.length).padStart(2, "0") }}
                    </div>

                </div>


                <!-- Next -->
                <button
                    class="lightbox-arrow lightbox-next"
                    @click="nextImage"
                    aria-label="Next image"
                >
                    ›
                </button>

            </div>

        </Transition>

    </section>
</template>


<style scoped>

.gallery-section {
    margin-top: 40px;
    padding-top: 25px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
}


/* =========================
   SECTION HEADING
========================= */

.section-heading {
    margin-bottom: 22px;
}

.section-heading span {
    display: block;

    color: var(--section-accent);

    font-size: 11px;
    font-weight: 700;

    letter-spacing: 2px;

    margin-bottom: 7px;
}

.section-heading h2 {
    margin: 0;

    color: var(--section-text);

    font-size: 18px;
    font-weight: 700;

    line-height: 1.3;
}


/* =========================
   GALLERY GRID
========================= */

.gallery-grid {
    display: grid;

    grid-template-columns: repeat(2, 1fr);

    gap: 18px;
}


/* =========================
   GALLERY ITEM
========================= */

.gallery-item {
    position: relative;

    height: 250px;

    overflow: hidden;

    border-radius: 8px;

    cursor: pointer;

    background: #ddd;
}


/* Image */

.gallery-item img {
    width: 100%;
    height: 100%;

    display: block;

    object-fit: cover;

    transition:
        transform 0.6s ease,
        filter 0.4s ease;
}


/* Hover image */

.gallery-item:hover img {
    transform: scale(1.08);
    filter: brightness(0.7);
}


/* =========================
   HOVER OVERLAY
========================= */

.gallery-overlay {
    position: absolute;

    inset: 0;

    display: flex;

    flex-direction: column;

    align-items: center;
    justify-content: center;

    gap: 8px;

    color: white;

    background: rgba(0, 0, 0, 0.25);

    opacity: 0;

    transition: opacity 0.4s ease;
}

.gallery-item:hover .gallery-overlay {
    opacity: 1;
}


/* Plus icon */

.zoom-icon {
    width: 42px;
    height: 42px;

    display: flex;

    align-items: center;
    justify-content: center;

    border: 1px solid rgba(255, 255, 255, 0.8);

    border-radius: 50%;

    font-size: 25px;

    font-weight: 300;
}

.gallery-overlay span:last-child {
    font-size: 9px;

    letter-spacing: 2px;

    font-weight: 700;
}


/* =========================
   IMAGE NUMBER
========================= */

.gallery-number {
    position: absolute;

    bottom: 12px;
    left: 15px;

    color: white;

    font-size: 11px;

    font-weight: 700;

    letter-spacing: 2px;

    text-shadow: 0 1px 5px rgba(0, 0, 0, 0.6);
}


/* =========================
   LIGHTBOX
========================= */

.lightbox {
    position: fixed;

    inset: 0;

    z-index: 9999;

    display: flex;

    align-items: center;
    justify-content: center;

    background: rgba(10, 10, 10, 0.94);

    padding: 40px;
}


/* =========================
   LIGHTBOX CONTENT
========================= */

.lightbox-content {
    position: relative;

    max-width: 90vw;
    max-height: 85vh;

    display: flex;

    align-items: center;
    justify-content: center;
}

.lightbox-content img {
    max-width: 90vw;

    max-height: 82vh;

    width: auto;
    height: auto;

    object-fit: contain;

    border-radius: 5px;

    box-shadow:
        0 20px 60px rgba(0, 0, 0, 0.5);
}


/* =========================
   COUNTER
========================= */

.lightbox-counter {
    position: absolute;

    bottom: -30px;

    left: 50%;

    transform: translateX(-50%);

    color: rgba(255, 255, 255, 0.7);

    font-size: 11px;

    letter-spacing: 2px;
}


/* =========================
   CLOSE BUTTON
========================= */

.lightbox-close {
    position: absolute;

    top: 25px;
    right: 30px;

    width: 45px;
    height: 45px;

    display: flex;

    align-items: center;
    justify-content: center;

    background: transparent;

    border: 1px solid rgba(255, 255, 255, 0.5);

    border-radius: 50%;

    color: white;

    font-size: 30px;

    font-weight: 300;

    cursor: pointer;

    transition:
        background 0.3s ease,
        transform 0.3s ease;
}

.lightbox-close:hover {
    background: rgba(255, 255, 255, 0.15);

    transform: rotate(90deg);
}


/* =========================
   ARROWS
========================= */

.lightbox-arrow {
    position: absolute;

    top: 50%;

    transform: translateY(-50%);

    width: 50px;
    height: 50px;

    display: flex;

    align-items: center;
    justify-content: center;

    background: transparent;

    border: 1px solid rgba(255, 255, 255, 0.45);

    border-radius: 50%;

    color: white;

    font-size: 35px;

    font-weight: 200;

    cursor: pointer;

    transition:
        background 0.3s ease,
        border-color 0.3s ease;
}

.lightbox-arrow:hover {
    background: rgba(255, 255, 255, 0.15);

    border-color: white;
}

.lightbox-prev {
    left: 30px;
}

.lightbox-next {
    right: 30px;
}


/* =========================
   LIGHTBOX ANIMATION
========================= */

.lightbox-enter-active,
.lightbox-leave-active {
    transition: opacity 0.3s ease;
}

.lightbox-enter-from,
.lightbox-leave-to {
    opacity: 0;
}


/* =========================
   MOBILE
========================= */

@media (max-width: 600px) {

    .gallery-section {
        margin-top: 35px;
        padding-top: 20px;
    }

    .gallery-grid {
        grid-template-columns: 1fr;

        gap: 14px;
    }

    .gallery-item {
        height: 230px;
    }

    .lightbox {
        padding: 20px;
    }

    .lightbox-content img {
        max-width: 90vw;
        max-height: 70vh;
    }

    .lightbox-arrow {
        width: 40px;
        height: 40px;

        font-size: 28px;
    }

    .lightbox-prev {
        left: 10px;
    }

    .lightbox-next {
        right: 10px;
    }

    .lightbox-close {
        top: 15px;
        right: 15px;

        width: 40px;
        height: 40px;
    }
}

</style>
```
