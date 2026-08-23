<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import Footer from "../components/Footer.vue"

defineProps({
    number: {
        type: String,
        required: true,
    },

    category: {
        type: String,
        required: true,
    },

    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    location: {
        type: String,
        required: true,
    },

    built: {
        type: String,
        required: true,
    },

    image: {
        type: String,
        required: true,
    },

    theme: {
        type: String,
        default: "sand",
    },
});

const sectionRef = ref(null);
const isVisible = ref(false);

let observer;

onMounted(() => {
    observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                isVisible.value = true;
            }
        },
        {
            threshold: 0.2,
        }
    );

    if (sectionRef.value) {
        observer.observe(sectionRef.value);
    }
});

onUnmounted(() => {
    observer?.disconnect();
});
</script>

<template>
    <section ref="sectionRef" :id="`wonder-${number}`" class="wonder-section" :class="`theme-${theme}`">

        <!-- BIG BACKGROUND NUMBER -->

        <div class="background-number" :class="{ visible: isVisible }">
            {{ number }}
        </div>


        <!-- IMAGE -->

        <div class="wonder-image" :class="{ visible: isVisible }">

            <div class="image-frame"></div>

            <img :src="image" :alt="title" />

            <div class="image-caption">
                <span>WONDER</span>

                <strong>
                    {{ number }}
                </strong>
            </div>

        </div>


        <!-- CONTENT -->

        <div class="wonder-content">

            <div class="wonder-number reveal-item" :class="{ visible: isVisible }">
                <span>
                    {{ number }}
                </span>

                <div></div>

                <span>
                    07
                </span>
            </div>


            <p class="wonder-category reveal-item delay-1" :class="{ visible: isVisible }">
                {{ category }}
            </p>


            <h2 class="wonder-title reveal-item delay-2" :class="{ visible: isVisible }">
                {{ title }}
            </h2>


            <p class="wonder-description reveal-item delay-3" :class="{ visible: isVisible }">
                {{ description }}
            </p>


            <!-- INFORMATION -->

            <div class="wonder-meta reveal-item delay-4" :class="{ visible: isVisible }">

                <div class="meta-item">
                    <span>
                        LOCATION
                    </span>

                    <strong>
                        {{ location }}
                    </strong>
                </div>


                <div class="meta-item">
                    <span>
                        BUILT
                    </span>

                    <strong>
                        {{ built }}
                    </strong>
                </div>

            </div>


            <!-- DISCOVER BUTTON -->

            <button class="discover-button reveal-item delay-5" :class="{ visible: isVisible }">

                <span>
                    DISCOVER MORE
                </span>

                <div class="button-arrow">
                    ↗
                </div>

            </button>

        </div>


        <!-- BOTTOM LINE -->

        <div class="section-line" :class="{ visible: isVisible }"></div>

    </section>

</template>

<style scoped>
/* =====================================================
   BASE
===================================================== */

.wonder-section {
    --section-bg: #f1e8d5;

    --section-text: #17130e;

    --section-muted: #5e574e;

    --section-accent: #a77c2d;

    --section-line:
        rgba(23, 19, 14, 0.18);

    position: relative;

    min-height: 100vh;

    display: grid;

    grid-template-columns:
        minmax(0, 1.05fr) minmax(0, 0.95fr);

    align-items: center;

    gap:
        clamp(50px, 8vw, 140px);

    padding:
        clamp(100px, 12vw, 180px) 7%;

    overflow: hidden;

    background:
        radial-gradient(circle at 80% 20%,
            rgba(167, 124, 45, 0.15),
            transparent 30%),
        var(--section-bg);

    color:
        var(--section-text);

    transition:
        background 0.8s ease,
        color 0.8s ease;
}


/* =====================================================
   THEMES
===================================================== */

.theme-sand {
    --section-bg: #f1e8d5;

    --section-text: #17130e;

    --section-muted: #5e574e;

    --section-accent: #a77c2d;

    --section-line:
        rgba(23, 19, 14, 0.18);
}


.theme-garden {
    --section-bg: #dfe7d8;

    --section-text: #172019;

    --section-muted: #536056;

    --section-accent: #58745c;

    --section-line:
        rgba(23, 32, 25, 0.18);
}


.theme-marble {
    --section-bg: #e8e7e2;

    --section-text: #18191a;

    --section-muted: #5d6062;

    --section-accent: #7b8490;

    --section-line:
        rgba(24, 25, 26, 0.16);
}


.theme-gold {
    --section-bg: #211c14;

    --section-text: #f4ead5;

    --section-muted: #bdb19a;

    --section-accent: #d5a94f;

    --section-line:
        rgba(244, 234, 213, 0.2);
}


.theme-stone {
    --section-bg: #cfc9bd;

    --section-text: #24231f;

    --section-muted: #68645c;

    --section-accent: #765f43;

    --section-line:
        rgba(36, 35, 31, 0.18);
}


.theme-ocean {
    --section-bg: #102a35;

    --section-text: #edf4f2;

    --section-muted: #a8bcbd;

    --section-accent: #6eb8b2;

    --section-line:
        rgba(237, 244, 242, 0.18);
}


.theme-sunset {
    --section-bg: #34221d;

    --section-text: #f8eee4;

    --section-muted: #c7afa0;

    --section-accent: #e59b61;

    --section-line:
        rgba(248, 238, 228, 0.18);
}


/* =====================================================
   BACKGROUND NUMBER
===================================================== */

.background-number {
    position: absolute;

    right: -2vw;

    bottom: -7vw;

    z-index: 0;

    font-size:
        clamp(18rem, 35vw, 38rem);

    font-weight: 800;

    line-height: 0.7;

    color:
        color-mix(in srgb,
            var(--section-accent) 8%,
            transparent);

    pointer-events: none;

    user-select: none;

    opacity: 0;

    transform:
        translateY(100px);

    transition:
        opacity 1.4s ease,
        transform 1.4s cubic-bezier(0.22,
            1,
            0.36,
            1);
}

.background-number.visible {
    opacity: 1;

    transform:
        translateY(0);
}


/* =====================================================
   IMAGE
===================================================== */

.wonder-image {
    position: relative;

    z-index: 2;

    height:
        min(72vh, 780px);

    overflow: hidden;

    border-radius: 4px;

    opacity: 0;

    clip-path:
        inset(0 100% 0 0);

    transition:
        opacity 0.4s ease,
        clip-path 1.25s cubic-bezier(0.22,
            1,
            0.36,
            1);
}

.wonder-image.visible {
    opacity: 1;

    clip-path:
        inset(0 0 0 0);
}


.wonder-image img {
    width: 100%;
    height: 100%;

    object-fit: cover;

    transform:
        scale(1.16);

    transition:
        transform 1.8s cubic-bezier(0.22,
            1,
            0.36,
            1);
}

.wonder-image.visible img {
    transform:
        scale(1);
}


.wonder-image:hover img {
    transform:
        scale(1.05);
}


/* =====================================================
   IMAGE FRAME
===================================================== */

.image-frame {
    position: absolute;

    inset: 16px;

    z-index: 3;

    border:
        1px solid rgba(255, 255, 255, 0.35);

    pointer-events: none;
}


/* =====================================================
   IMAGE OVERLAY
===================================================== */

.wonder-image::after {
    content: "";

    position: absolute;

    inset: 0;

    z-index: 2;

    background:
        linear-gradient(180deg,
            transparent 45%,
            rgba(0, 0, 0, 0.5));

    pointer-events: none;
}


/* =====================================================
   IMAGE CAPTION
===================================================== */

.image-caption {
    position: absolute;

    left: 30px;

    bottom: 30px;

    z-index: 4;

    display: flex;

    align-items: center;

    gap: 14px;

    color: white;

    opacity: 0;

    transform:
        translateY(15px);

    transition:
        opacity 0.7s ease 0.9s,
        transform 0.7s ease 0.9s;
}

.wonder-image.visible .image-caption {
    opacity: 1;

    transform:
        translateY(0);
}

.image-caption span {
    font-size: 10px;

    font-weight: 700;

    letter-spacing: 0.25em;

    opacity: 0.7;
}

.image-caption strong {
    font-size: 18px;

    font-weight: 600;
}


/* =====================================================
   CONTENT
===================================================== */

.wonder-content {
    position: relative;

    z-index: 5;

    max-width: 680px;
}


/* =====================================================
   REVEAL
===================================================== */

.reveal-item {
    opacity: 0;

    transform:
        translateY(45px);

    transition:
        opacity 0.8s ease,
        transform 0.9s cubic-bezier(0.22,
            1,
            0.36,
            1);
}

.reveal-item.visible {
    opacity: 1;

    transform:
        translateY(0);
}

.delay-1 {
    transition-delay: 0.12s;
}

.delay-2 {
    transition-delay: 0.22s;
}

.delay-3 {
    transition-delay: 0.32s;
}

.delay-4 {
    transition-delay: 0.42s;
}

.delay-5 {
    transition-delay: 0.52s;
}


/* =====================================================
   NUMBER
===================================================== */

.wonder-number {
    display: flex;

    align-items: center;

    gap: 14px;

    margin-bottom: 35px;

    color:
        var(--section-accent);

    font-size: 13px;

    font-weight: 700;

    letter-spacing: 0.18em;
}

.wonder-number div {
    width: 60px;

    height: 1px;

    background:
        var(--section-accent);

    opacity: 0.5;
}


/* =====================================================
   CATEGORY
===================================================== */

.wonder-category {
    margin-bottom: 18px;

    color:
        var(--section-accent);

    font-size: 12px;

    font-weight: 700;

    letter-spacing: 0.3em;
}


/* =====================================================
   TITLE
===================================================== */

.wonder-title {
    max-width: 700px;

    margin: 0;

    color:
        var(--section-text);

    font-size:
        clamp(3.2rem,
            6vw,
            6.7rem);

    font-weight: 800;

    line-height: 0.88;

    letter-spacing: -0.06em;
}


/* =====================================================
   DESCRIPTION
===================================================== */

.wonder-description {
    max-width: 580px;

    margin-top: 38px;

    color:
        var(--section-muted);

    font-size:
        clamp(17px,
            1.4vw,
            20px);

    line-height: 1.75;
}


/* =====================================================
   META
===================================================== */

.wonder-meta {
    display: flex;

    gap: 60px;

    margin-top: 45px;

    padding-top: 25px;

    border-top:
        1px solid var(--section-line);
}

.meta-item {
    display: flex;

    flex-direction: column;

    gap: 8px;
}

.meta-item span {
    color:
        var(--section-muted);

    font-size: 10px;

    font-weight: 700;

    letter-spacing: 0.2em;
}

.meta-item strong {
    color:
        var(--section-text);

    font-size: 14px;

    letter-spacing: 0.08em;
}


/* =====================================================
   BUTTON
===================================================== */

.discover-button {
    display: inline-flex;

    align-items: center;

    gap: 16px;

    margin-top: 42px;

    padding:
        6px 6px 6px 22px;

    border:
        1px solid var(--section-text);

    border-radius: 999px;

    background: transparent;

    color:
        var(--section-text);

    cursor: pointer;

    transition:
        background 0.4s ease,
        color 0.4s ease,
        transform 0.4s ease;
}

.discover-button>span {
    font-size: 12px;

    font-weight: 700;

    letter-spacing: 0.16em;
}

.button-arrow {
    width: 40px;
    height: 40px;

    display: grid;

    place-items: center;

    border-radius: 50%;

    background:
        var(--section-text);

    color:
        var(--section-bg);

    font-size: 18px;

    transition:
        transform 0.4s cubic-bezier(0.22,
            1,
            0.36,
            1);
}

.discover-button:hover {
    background:
        var(--section-text);

    color:
        var(--section-bg);

    transform:
        translateY(-4px);
}

.discover-button:hover .button-arrow {
    transform:
        rotate(45deg);
}


/* =====================================================
   SECTION LINE
===================================================== */

.section-line {
    position: absolute;

    left: 7%;

    right: 7%;

    bottom: 0;

    height: 1px;

    background:
        var(--section-line);

    transform:
        scaleX(0);

    transform-origin: left;

    transition:
        transform 1.2s cubic-bezier(0.22,
            1,
            0.36,
            1);
}

.section-line.visible {
    transform:
        scaleX(1);
}


/* =====================================================
   TABLET
===================================================== */

@media (max-width: 1000px) {

    .wonder-section {
        grid-template-columns: 1fr;

        gap: 60px;

        padding-inline: 6%;
    }

    .wonder-image {
        height: 60vh;

        max-height: 650px;
    }

    .wonder-content {
        max-width: 800px;
    }

    .background-number {
        font-size: 50vw;
    }
}


/* =====================================================
   MOBILE
===================================================== */

@media (max-width: 600px) {

    .wonder-section {
        min-height: auto;

        padding-top: 100px;

        padding-bottom: 100px;
    }

    .wonder-image {
        height: 50vh;

        min-height: 380px;
    }

    .image-frame {
        inset: 10px;
    }

    .image-caption {
        left: 20px;

        bottom: 20px;
    }

    .wonder-title {
        font-size:
            clamp(3rem,
                15vw,
                5rem);
    }

    .wonder-description {
        margin-top: 28px;

        font-size: 17px;
    }

    .wonder-meta {
        gap: 30px;

        margin-top: 35px;
    }

    .discover-button {
        margin-top: 35px;
    }
}
</style>