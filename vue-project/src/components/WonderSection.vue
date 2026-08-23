
[file name]: WonderSection.vue
<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import ViewMap from "./viewMap.vue";
const props = defineProps({
    number: { type: String, required: true },
    category: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    built: { type: String, required: true },
    image: { type: String, required: true },
    theme: { type: String, default: "sand" },
    coordinates: {
    type: Object,
    default: null,
},
});

// ------- الحالة لعرض التفاصيل (Modal) -------
const showDetails = ref(false);

// ------- بيانات تفصيلية لكل عجيبة -------
const wonderDetails = {
    "GREAT PYRAMID OF GIZA": {
        history: "The Great Pyramid of Giza was built as a monumental tomb for Pharaoh Khufu around 2560 BCE. It is the oldest and largest of the three pyramids at Giza.",
        whyWonder: "It was considered one of the greatest achievements of ancient engineering and was the only Ancient Wonder to survive largely intact.",
        disappeared: "It did not disappear. The Great Pyramid still stands in Giza today.",
        extraFacts: "The pyramid was the tallest man-made structure in the world for over 3,800 years."
    },
    "HANGING GARDENS OF BABYLON": {
        history: "The Hanging Gardens are traditionally described as a spectacular series of elevated gardens associated with ancient Babylon, possibly built by King Nebuchadnezzar II around 600 BCE.",
        whyWonder: "Their extraordinary terraces, advanced irrigation systems, and legendary beauty made them one of the Seven Wonders.",
        disappeared: "Their exact location and existence remain uncertain, with no definitive archaeological evidence.",
        extraFacts: "The gardens were described as being built with a complex system of water pumps to irrigate the plants."
    },
    "TEMPLE OF ARTEMIS AT EPHESUS": {
        history: "The Temple of Artemis at Ephesus was a massive Greek temple dedicated to the goddess Artemis, built around 550 BCE. It was one of the largest temples in the ancient world.",
        whyWonder: "Its enormous scale, stunning architecture, and artistic decoration made it one of the greatest temples of the ancient world.",
        disappeared: "The temple was destroyed and rebuilt several times before finally disappearing.",
        extraFacts: "The temple was so large that it was said to have taken over 100 years to build."
    },
    "STATUE OF ZEUS AT OLYMPIA": {
        history: "The Statue of Zeus was a monumental seated statue created by the Greek sculptor Phidias around 435 BCE. It stood inside the Temple of Zeus at Olympia.",
        whyWonder: "Its enormous size, craftsmanship, and use of precious materials made it one of the greatest artistic achievements of its time.",
        disappeared: "The statue was eventually lost and is believed to have been destroyed by fire.",
        extraFacts: "The statue was made of ivory and gold over a wooden framework."
    },
    "MAUSOLEUM AT HALICARNASSUS": {
        history: "The Mausoleum was a monumental tomb built for Mausolus, ruler of Caria, around 350 BCE. It was designed by Greek architects.",
        whyWonder: "Its architecture and sculptural decoration became so famous that the word mausoleum came to describe monumental tombs.",
        disappeared: "A series of earthquakes damaged the structure and eventually left it in ruins.",
        extraFacts: "The Mausoleum stood for over 1,500 years before being destroyed."
    },
    "COLOSSUS OF RHODES": {
        history: "The Colossus was a gigantic bronze statue dedicated to the sun god Helios, built around 280 BCE. It stood near the harbor of Rhodes.",
        whyWonder: "Its enormous scale and engineering were extraordinary achievements for the ancient world.",
        disappeared: "A powerful earthquake caused the statue to collapse around 226 BCE.",
        extraFacts: "The statue was approximately 33 meters tall, making it one of the largest statues of the ancient world."
    },
    "LIGHTHOUSE OF ALEXANDRIA": {
        history: "The Lighthouse of Alexandria was built on the island of Pharos around 280 BCE to guide ships safely into Alexandria's harbor.",
        whyWonder: "It was one of the tallest structures of the ancient world and became an important symbol of Alexandria.",
        disappeared: "Several earthquakes damaged the lighthouse until its remaining structure disappeared.",
        extraFacts: "The lighthouse was estimated to be over 100 meters tall and could be seen from far away."
    }
};

// ممكن نحط هنا اسم "TEMPLE OF ARTEMIS" بدل "TEMPLE OF ARTEMIS AT EPHESUS" لو الـ API بيرجعه كده
// عشان كده بنعمل fallback لو الاسم مش موجود
const getDetails = () => {
    return wonderDetails[props.title] || {
        history: props.description,
        whyWonder: "This monument was considered one of the greatest achievements of the ancient world.",
        disappeared: "Historical information is currently unavailable.",
        extraFacts: "This is one of the Seven Wonders of the Ancient World."
    };
};

const details = getDetails();

// ------- Scroll Animation -------
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
        { threshold: 0.2 }
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
    <section
        ref="sectionRef"
        :id="`wonder-${number}`"
        class="wonder-section"
        :class="`theme-${theme}`"
    >
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
                <strong>{{ number }}</strong>
            </div>
        </div>

        <!-- CONTENT -->
        <div class="wonder-content">
            <!-- NUMBER -->
            <div class="wonder-number reveal-item" :class="{ visible: isVisible }">
                <span>{{ number }}</span>
                <div></div>
                <span>07</span>
            </div>

            <!-- CATEGORY -->
            <p class="wonder-category reveal-item delay-1" :class="{ visible: isVisible }">
                {{ category }}
            </p>

            <!-- TITLE -->
            <h2 class="wonder-title reveal-item delay-2" :class="{ visible: isVisible }">
                {{ title }}
            </h2>

            <!-- DESCRIPTION -->
            <p class="wonder-description reveal-item delay-3" :class="{ visible: isVisible }">
                {{ description }}
            </p>

            <!-- BASIC INFORMATION -->
            <div class="wonder-meta reveal-item delay-4" :class="{ visible: isVisible }">
                <div class="meta-item">
                    <span>LOCATION</span>
                    <strong>{{ location }}</strong>
                </div>

                <div class="meta-item">
                    <span>BUILT</span>
                    <strong>{{ built }}</strong>
                </div>
            </div>

            <!-- DISCOVER MORE BUTTON (يفتح المودال) -->
            <button
                class="discover-button reveal-item delay-5"
                :class="{ visible: isVisible }"
                @click="showDetails = true"
            >
                <span>DISCOVER MORE</span>
                <div class="button-arrow">↗</div>
            </button>
        </div>

        <!-- BOTTOM LINE -->
        <div class="section-line" :class="{ visible: isVisible }"></div>

        <!-- =====================================================
             DETAILS MODAL (نافذة التفاصيل - بتظهر فوق الصفحة)
        ====================================================== -->
        <div v-if="showDetails" class="details-overlay" @click.self="showDetails = false">
            <div class="details-card">
                <button class="details-close" @click="showDetails = false">×</button>

                <!-- LABEL -->
                <p class="details-label">ANCIENT WORLD</p>

                <!-- TITLE -->
                <h3>{{ title }}</h3>

                <!-- DESCRIPTION -->
                <p class="details-description">{{ description }}</p>

                <!-- HISTORY -->
                <div class="history-content">
                    <div class="history-item">
                        <span>HISTORY</span>
                        <p>{{ details.history }}</p>
                    </div>

                    <div class="history-item">
                        <span>WHY A WONDER?</span>
                        <p>{{ details.whyWonder }}</p>
                    </div>

                    <div class="history-item">
                        <span>WHAT HAPPENED TO IT?</span>
                        <p>{{ details.disappeared }}</p>
                    </div>

                    <div class="history-item">
                        <span>DID YOU KNOW?</span>
                        <p>{{ details.extraFacts }}</p>
                    </div>
                </div>

                <!-- INFORMATION -->
                <div class="details-info">
                    <div>
                        <span>WONDER</span>
                        <strong>{{ number }} / 07</strong>
                    </div>

                    <div>
                        <span>LOCATION</span>
                        <strong>{{ location }}</strong>
                    </div>

                    <div>
                        <span>BUILT</span>
                        <strong>{{ built }}</strong>
                    </div>
                </div>

                <!-- MAP -->
                <div class="map-wrapper">
                    <ViewMap
                        :coordinates="coordinates"
                        :title="title"
                    />
                </div>
            </div>
        </div>
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
    --section-line: rgba(23, 19, 14, 0.18);

    position: relative;
    min-height: 100vh;
    display: grid;
    grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
    align-items: center;
    gap: clamp(50px, 8vw, 140px);
    padding: clamp(100px, 12vw, 180px) 7%;
    overflow: hidden;
    background: radial-gradient(circle at 80% 20%, rgba(167, 124, 45, 0.15), transparent 30%), var(--section-bg);
    color: var(--section-text);
    transition: background 0.8s ease, color 0.8s ease;
}

/* =====================================================
   THEMES
===================================================== */
.theme-sand { --section-bg: #f1e8d5; --section-text: #17130e; --section-muted: #5e574e; --section-accent: #a77c2d; --section-line: rgba(23, 19, 14, 0.18); }
.theme-garden { --section-bg: #dfe7d8; --section-text: #172019; --section-muted: #536056; --section-accent: #58745c; --section-line: rgba(23, 32, 25, 0.18); }
.theme-marble { --section-bg: #e8e7e2; --section-text: #18191a; --section-muted: #5d6062; --section-accent: #7b8490; --section-line: rgba(24, 25, 26, 0.16); }
.theme-gold { --section-bg: #211c14; --section-text: #f4ead5; --section-muted: #bdb19a; --section-accent: #d5a94f; --section-line: rgba(244, 234, 213, 0.2); }
.theme-stone { --section-bg: #cfc9bd; --section-text: #24231f; --section-muted: #68645c; --section-accent: #765f43; --section-line: rgba(36, 35, 31, 0.18); }
.theme-ocean { --section-bg: #102a35; --section-text: #edf4f2; --section-muted: #a8bcbd; --section-accent: #6eb8b2; --section-line: rgba(237, 244, 242, 0.18); }
.theme-sunset { --section-bg: #34221d; --section-text: #f8eee4; --section-muted: #c7afa0; --section-accent: #e59b61; --section-line: rgba(248, 238, 228, 0.18); }

/* =====================================================
   BACKGROUND NUMBER
===================================================== */
.background-number {
    position: absolute;
    right: -2vw;
    bottom: -7vw;
    z-index: 0;
    font-size: clamp(18rem, 35vw, 38rem);
    font-weight: 800;
    line-height: 0.7;
    color: color-mix(in srgb, var(--section-accent) 8%, transparent);
    pointer-events: none;
    user-select: none;
    opacity: 0;
    transform: translateY(100px);
    transition: opacity 1.4s ease, transform 1.4s cubic-bezier(0.22, 1, 0.36, 1);
}
.background-number.visible { opacity: 1; transform: translateY(0); }

/* =====================================================
   IMAGE
===================================================== */
.wonder-image {
    position: relative;
    z-index: 2;
    height: min(72vh, 780px);
    overflow: hidden;
    border-radius: 4px;
    opacity: 0;
    clip-path: inset(0 100% 0 0);
    transition: opacity 0.4s ease, clip-path 1.25s cubic-bezier(0.22, 1, 0.36, 1);
}
.wonder-image.visible { opacity: 1; clip-path: inset(0 0 0 0); }
.wonder-image img {
    width: 100%; height: 100%; object-fit: cover;
    transform: scale(1.16);
    transition: transform 1.8s cubic-bezier(0.22, 1, 0.36, 1);
}
.wonder-image.visible img { transform: scale(1); }
.wonder-image:hover img { transform: scale(1.05); }

.image-frame {
    position: absolute; inset: 16px; z-index: 3;
    border: 1px solid rgba(255, 255, 255, 0.35);
    pointer-events: none;
}
.wonder-image::after {
    content: ""; position: absolute; inset: 0; z-index: 2;
    background: linear-gradient(180deg, transparent 45%, rgba(0, 0, 0, 0.5));
    pointer-events: none;
}
.image-caption {
    position: absolute; left: 30px; bottom: 30px; z-index: 4;
    display: flex; align-items: center; gap: 14px; color: white;
    opacity: 0; transform: translateY(15px);
    transition: opacity 0.7s ease 0.9s, transform 0.7s ease 0.9s;
}
.wonder-image.visible .image-caption { opacity: 1; transform: translateY(0); }
.image-caption span { font-size: 10px; font-weight: 700; letter-spacing: 0.25em; opacity: 0.7; }
.image-caption strong { font-size: 18px; font-weight: 600; }

/* =====================================================
   CONTENT
===================================================== */
.wonder-content { position: relative; z-index: 5; max-width: 680px; }

/* =====================================================
   REVEAL
===================================================== */
.reveal-item { opacity: 0; transform: translateY(45px); transition: opacity 0.8s ease, transform 0.9s cubic-bezier(0.22, 1, 0.36, 1); }
.reveal-item.visible { opacity: 1; transform: translateY(0); }
.delay-1 { transition-delay: 0.12s; }
.delay-2 { transition-delay: 0.22s; }
.delay-3 { transition-delay: 0.32s; }
.delay-4 { transition-delay: 0.42s; }
.delay-5 { transition-delay: 0.52s; }

/* =====================================================
   NUMBER
===================================================== */
.wonder-number {
    display: flex; align-items: center; gap: 14px; margin-bottom: 35px;
    color: var(--section-accent); font-size: 13px; font-weight: 700; letter-spacing: 0.18em;
}
.wonder-number div { width: 60px; height: 1px; background: var(--section-accent); opacity: 0.5; }

/* =====================================================
   CATEGORY
===================================================== */
.wonder-category { margin-bottom: 18px; color: var(--section-accent); font-size: 12px; font-weight: 700; letter-spacing: 0.3em; }

/* =====================================================
   TITLE
===================================================== */
.wonder-title {
    max-width: 700px; margin: 0; color: var(--section-text);
    font-size: clamp(3.2rem, 6vw, 6.7rem); font-weight: 800;
    line-height: 0.88; letter-spacing: -0.06em;
}

/* =====================================================
   DESCRIPTION
===================================================== */
.wonder-description {
    max-width: 580px; margin-top: 38px; color: var(--section-muted);
    font-size: clamp(17px, 1.4vw, 20px); line-height: 1.75;
}

/* =====================================================
   META
===================================================== */
.wonder-meta {
    display: flex; gap: 60px; margin-top: 45px; padding-top: 25px;
    border-top: 1px solid var(--section-line);
}
.meta-item { display: flex; flex-direction: column; gap: 8px; }
.meta-item span { color: var(--section-muted); font-size: 10px; font-weight: 700; letter-spacing: 0.2em; }
.meta-item strong { color: var(--section-text); font-size: 14px; letter-spacing: 0.08em; }

/* =====================================================
   DISCOVER BUTTON
===================================================== */
.discover-button {
    display: inline-flex; align-items: center; gap: 16px; margin-top: 42px;
    padding: 6px 6px 6px 22px; border: 1px solid var(--section-text);
    border-radius: 999px; background: transparent; color: var(--section-text);
    cursor: pointer; transition: background 0.4s ease, color 0.4s ease, transform 0.4s ease;
}
.discover-button > span { font-size: 12px; font-weight: 700; letter-spacing: 0.16em; }
.button-arrow {
    width: 40px; height: 40px; display: grid; place-items: center;
    border-radius: 50%; background: var(--section-text); color: var(--section-bg);
    font-size: 18px; transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}
.discover-button:hover { background: var(--section-text); color: var(--section-bg); transform: translateY(-4px); }
.discover-button:hover .button-arrow { transform: rotate(45deg); }

/* =====================================================
   DETAILS OVERLAY (المودال)
===================================================== */
.details-overlay {
    position: fixed; inset: 0; z-index: 99999;
    display: flex; align-items: center; justify-content: center;
    padding: 30px; background: rgba(0, 0, 0, 0.78); backdrop-filter: blur(12px);
}
.details-card {
    position: relative; width: min(1050px, 92vw); max-height: 88vh; overflow-y: auto;
    padding: 65px 75px; background: var(--section-bg); color: var(--section-text);
    border: 1px solid var(--section-accent); border-radius: 6px;
    box-shadow: 0 35px 100px rgba(0, 0, 0, 0.55);
    animation: detailsAppear 0.4s ease;
}
.details-close {
    position: absolute;
    top: 22px;
    right: 22px;
    width: 44px;
    height: 44px;
    display: grid;
    place-items: center;
    border: 1px solid var(--section-text);
    border-radius: 50%;
    background: transparent;
    color: var(--section-text);
    font-size: 25px;
    line-height: 1;
    cursor: pointer;
    transition: background 0.3s ease, color 0.3s ease, transform 0.3s ease;
}
.details-close:hover { background: var(--section-text); color: var(--section-bg); transform: rotate(90deg); }

.details-label { margin: 0 0 18px; color: var(--section-accent); font-size: 11px; font-weight: 700; letter-spacing: 0.25em; }
.details-card h3 {
    max-width: 850px; margin: 0; color: var(--section-text);
    font-size: clamp(2.8rem, 6vw, 5.8rem); font-weight: 800;
    line-height: 0.95; letter-spacing: -0.05em;
}
.details-description { max-width: 850px; margin-top: 30px; color: var(--section-muted); font-size: 18px; line-height: 1.8; }

.history-content { display: grid; gap: 28px; margin-top: 42px; }
.history-item { padding-top: 24px; border-top: 1px solid var(--section-line); }
.history-item span { display: block; margin-bottom: 10px; color: var(--section-accent); font-size: 10px; font-weight: 700; letter-spacing: 0.22em; }
.history-item p { max-width: 850px; margin: 0; color: var(--section-muted); font-size: 17px; line-height: 1.8; }

.details-info {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px;
    margin-top: 42px; padding-top: 30px; border-top: 1px solid var(--section-line);
}
.details-info div { display: flex; flex-direction: column; gap: 9px; }
.details-info span { color: var(--section-muted); font-size: 10px; font-weight: 700; letter-spacing: 0.2em; }
.details-info strong { color: var(--section-text); font-size: 14px; line-height: 1.5; letter-spacing: 0.04em; }

.discover-button:hover .button-arrow {
    transform: rotate(45deg);
    background: var(--section-bg);
    color: var(--section-text);
}

@keyframes detailsAppear {
    from {
        opacity: 0;
        transform: translateY(30px) scale(0.96);
    }

    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

.section-line {
    position: absolute; left: 7%; right: 7%; bottom: 0; height: 1px;
    background: var(--section-line); transform: scaleX(0); transform-origin: left;
    transition: transform 1.2s cubic-bezier(0.22, 1, 0.36, 1);
}
.section-line.visible { transform: scaleX(1); }

/* =====================================================
   TABLET
===================================================== */
@media (max-width: 1000px) {
    .wonder-section { grid-template-columns: 1fr; gap: 60px; padding-inline: 6%; }
    .wonder-image { height: 60vh; max-height: 650px; }
    .wonder-content { max-width: 800px; }
    .background-number { font-size: 50vw; }
    .details-card { width: 94vw; padding: 55px 50px; }
}

/* =====================================================
   MOBILE
===================================================== */
@media (max-width: 600px) {
    .wonder-section { min-height: auto; padding-top: 100px; padding-bottom: 100px; }
    .wonder-image { height: 50vh; min-height: 380px; }
    .image-frame { inset: 10px; }
    .image-caption { left: 20px; bottom: 20px; }
    .wonder-title { font-size: clamp(3rem, 15vw, 5rem); }
    .wonder-description { margin-top: 28px; font-size: 17px; }
    .wonder-meta { gap: 30px; margin-top: 35px; }
    .discover-button { margin-top: 35px; }

    .details-close { top: 15px; right: 15px; }
    .details-card h3 { font-size: 3rem; }
    .details-description { font-size: 16px; }
}

.map-wrapper {
    grid-column: 1 / -1;
    width: 100%;
}
</style>