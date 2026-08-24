<script setup>
import Navbar from "./Navbar.vue";
import Footer from "./Footer.vue";
import ViewMap from "./viewMap.vue";
import wondersData from "../Data/ancient-seven-wonders(1).json";
import GallerySection from "./GallerySection.vue";

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

const jsonWonder = wondersData.wonders.find(
    (wonder) => wonder.name.toUpperCase() === props.title
);
const galleryImages = jsonWonder?.galleryImages || [];

const getHardcodedCoordinates = (title) => {
    const coordMap = {
        'GREAT PYRAMID OF GIZA': { lat: 29.9792, lng: 31.1342 },
        'HANGING GARDENS OF BABYLON': { lat: 32.5363, lng: 44.4207 },
        'TEMPLE OF ARTEMIS': { lat: 37.9497, lng: 27.3638 },
        'STATUE OF ZEUS AT OLYMPIA': { lat: 37.6379, lng: 21.6301 },
        'MAUSOLEUM AT HALICARNASSUS': { lat: 37.0380, lng: 27.4242 },
        'COLOSSUS OF RHODES': { lat: 36.4512, lng: 28.2278 },
        'LIGHTHOUSE OF ALEXANDRIA': { lat: 31.2135, lng: 29.8854 }
    };
    return coordMap[title] || null;
};

const finalCoordinates = props.coordinates || getHardcodedCoordinates(props.title);


// Static details for each wonder
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
    "TEMPLE OF ARTEMIS": {
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

const getDetails = () => {
    return wonderDetails[props.title] || {
        history: props.description,
        whyWonder: "This monument was considered one of the greatest achievements of the ancient world.",
        disappeared: "Historical information is currently unavailable.",
        extraFacts: "This is one of the Seven Wonders of the Ancient World."
    };
};

const details = getDetails();

const goBack = () => {
    window.location.href = '/wonders';
};
</script>

<template>
    <div class="wonder-detail-page" :class="`theme-${theme}`">
        <Navbar />

        <div class="detail-container">
            <button class="back-button" @click="goBack">
                ← BACK TO WONDERS
            </button>

            <div class="detail-image">
                <img :src="image" :alt="title" />
                <div class="image-number">
                    <span>WONDER</span>
                    <strong>{{ number }}</strong>
                </div>
            </div>

            <div class="detail-content">
                <p class="detail-category">{{ category }}</p>
                <h1>{{ title }}</h1>
                <p class="detail-description">{{ description }}</p>

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


                <div v-if="jsonWonder?.architecture" class="architecture-content">

                    <div class="section-heading">
                        <span>ARCHITECTURE & ENGINEERING</span>
                        <h2>How Was It Built?</h2>
                    </div>

                    <div class="architecture-grid">

                        <div class="architecture-item">
                            <span>CONSTRUCTION</span>
                            <p>{{ jsonWonder.architecture.howItWasBuilt }}</p>
                        </div>

                        <div class="architecture-item">
                            <span>ENGINEERING DESIGN</span>
                            <p>{{ jsonWonder.architecture.engineeringDesign }}</p>
                        </div>

                        <div class="architecture-item">
                            <span>HEIGHT</span>
                            <p>{{ jsonWonder.architecture.height }}</p>
                        </div>

                        <div class="architecture-item">
                            <span>SIZE</span>
                            <p>{{ jsonWonder.architecture.size }}</p>
                        </div>

                    </div>

                </div>

                <div
                    v-if="jsonWonder?.architecture?.materials?.length"
                    class="materials-section"
                >

                    <div class="section-heading">
                        <span>MATERIALS</span>
                        <h2>Built From</h2>
                    </div>

                    <div class="materials-list">
                        <span
                            v-for="material in jsonWonder.architecture.materials"
                            :key="material"
                            class="material-tag"
                        >
                            {{ material }}
                        </span>
                    </div>

                </div>

                <div
                    v-if="jsonWonder?.engineeringMarvel"
                    class="engineering-section"
                >

                    <span>ENGINEERING MARVEL</span>

                    <p>
                        {{ jsonWonder.engineeringMarvel }}
                    </p>

                </div>

                <div
                    v-if="jsonWonder?.interestingFacts?.length"
                    class="facts-section"
                >

                    <div class="section-heading">
                        <span>INTERESTING FACTS</span>
                        <h2>Did You Know?</h2>
                    </div>

                    <ul>
                        <li
                            v-for="fact in jsonWonder.interestingFacts"
                            :key="fact"
                        >
                            {{ fact }}
                        </li>
                    </ul>

                </div>

                <GallerySection
                    :images="galleryImages"
                />

                <div
                    v-if="jsonWonder?.articles?.length"
                    class="articles-section"
                >
                    <div class="section-heading">
                        <span>FURTHER READING</span>
                        <h2>Explore More</h2>
                    </div>

                    <div class="articles-list">
                        <a
                            v-for="article in jsonWonder.articles"
                            :key="article.url"
                            :href="article.url"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="article-item"
                        >
                            <div class="article-content">
                                <span>ARTICLE</span>
                                <p>{{ article.title }}</p>
                            </div>

                            <span class="article-arrow">↗</span>
                        </a>
                    </div>
                </div>

                <div class="detail-meta">
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

                <div class="map-wrapper">
                    <ViewMap
                        :coordinates="finalCoordinates"
                        :title="title"
                    />
                </div>
            </div>
        </div>

    </div>
</template>

<style scoped>
.wonder-detail-page {
    min-height: 100vh;
    padding-top: 92px;
    background: var(--section-bg);
    color: var(--section-text);
}

/* Themes */
.theme-sand { --section-bg: #f1e8d5; --section-text: #17130e; --section-muted: #5e574e; --section-accent: #a77c2d; }
.theme-garden { --section-bg: #dfe7d8; --section-text: #172019; --section-muted: #536056; --section-accent: #58745c; }
.theme-marble { --section-bg: #e8e7e2; --section-text: #18191a; --section-muted: #5d6062; --section-accent: #7b8490; }
.theme-gold { --section-bg: #211c14; --section-text: #f4ead5; --section-muted: #bdb19a; --section-accent: #d5a94f; }
.theme-stone { --section-bg: #cfc9bd; --section-text: #24231f; --section-muted: #68645c; --section-accent: #765f43; }
.theme-ocean { --section-bg: #102a35; --section-text: #edf4f2; --section-muted: #a8bcbd; --section-accent: #6eb8b2; }
.theme-sunset { --section-bg: #34221d; --section-text: #f8eee4; --section-muted: #c7afa0; --section-accent: #e59b61; }

.detail-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 7%;
}

.back-button {
    background: transparent;
    border: 1px solid var(--section-accent);
    color: var(--section-accent);
    padding: 10px 25px;
    border-radius: 30px;
    cursor: pointer;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 1px;
    transition: all 0.3s ease;
    margin-bottom: 40px;
}

.back-button:hover {
    background: var(--section-accent);
    color: var(--section-bg);
}

.detail-image {
    position: relative;
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 40px;
}

.detail-image img {
    width: 100%;
    height: 500px;
    object-fit: cover;
}

.image-number {
    position: absolute;
    bottom: 30px;
    left: 30px;
    color: white;
    display: flex;
    align-items: center;
    gap: 12px;
}

.image-number span {
    font-size: 12px;
    letter-spacing: 2px;
    opacity: 0.8;
}

.image-number strong {
    font-size: 24px;
}

.detail-category {
    color: var(--section-accent);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 3px;
    margin-bottom: 15px;
}

.detail-content h1 {
    font-size: clamp(3rem, 5vw, 5rem);
    margin: 0 0 20px 0;
    line-height: 0.9;
}

.detail-description {
    font-size: 1.2rem;
    line-height: 1.8;
    color: var(--section-muted);
    max-width: 800px;
    margin-bottom: 40px;
}

.history-content {
    display: grid;
    gap: 25px;
    margin: 40px 0;
}

.history-item {
    padding: 20px 0;
    border-top: 1px solid rgba(0,0,0,0.1);
}

.history-item span {
    display: block;
    color: var(--section-accent);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 2px;
    margin-bottom: 8px;
}

.history-item p {
    margin: 0;
    line-height: 1.8;
    color: var(--section-muted);
}

.detail-meta {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
    padding: 30px 0;
    border-top: 1px solid rgba(0,0,0,0.1);
    margin: 20px 0;
}

.detail-meta div {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.detail-meta span {
    color: var(--section-muted);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 2px;
}

.detail-meta strong {
    color: var(--section-text);
    font-size: 1rem;
}

.map-wrapper {
    margin-top: 20px;
}

/* =====================================================
   NEW SECTIONS
===================================================== */

.architecture-content,
.materials-section,
.engineering-section,
.facts-section {
    margin-top: 40px;
    padding-top: 25px;

    /* نفس الخط الفاصل الموجود في الـ History */
    border-top: 1px solid rgba(0, 0, 0, 0.1);
}


/* =====================================================
   SECTION HEADING
===================================================== */

.section-heading {
    margin-bottom: 25px;
}

.section-heading > span {
    display: block;
    color: var(--section-accent);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 2.5px;
    margin-bottom: 8px;
}

.section-heading h2 {
    margin: 0;
    color: var(--section-text);
    font-size: 22px;
    font-weight: 600;
    line-height: 1.3;
}
/* =====================================================
   ARCHITECTURE & ENGINEERING
===================================================== */

.architecture-content {
    margin-top: 40px;
    padding-top: 25px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.architecture-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1px;
    background: rgba(0, 0, 0, 0.08);
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 10px;
    overflow: hidden;
}

.architecture-item {
    position: relative;
    padding: 25px 28px;
    background: var(--section-bg);
    transition: transform 0.3s ease, background 0.3s ease;
}

.architecture-item::before {
    content: "";
    position: absolute;
    left: 0;
    top: 25px;
    width: 3px;
    height: 28px;
    background: var(--section-accent);
    border-radius: 0 3px 3px 0;
}

.architecture-item:hover {
    background: rgba(255, 255, 255, 0.08);
}

.architecture-item span {
    display: block;
    color: var(--section-accent);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 1.8px;
    margin-bottom: 10px;
}

.architecture-item p {
    margin: 0;
    color: var(--section-muted);
    font-size: 14px;
    line-height: 1.8;
}


/* =====================================================
   MATERIALS
===================================================== */

.materials-list {
    display: flex;

    flex-wrap: wrap;

    gap: 10px;
}

.material-tag {
    padding: 8px 15px;

    border: 1px solid rgba(0, 0, 0, 0.12);

    border-radius: 20px;

    background: transparent;

    color: var(--section-muted);

    font-size: 11px;

    transition:
        color 0.3s ease,
        border-color 0.3s ease,
        transform 0.3s ease;
}

.material-tag:hover {
    color: var(--section-accent);

    border-color: var(--section-accent);

    transform: translateY(-2px);
}


/* =====================================================
   ENGINEERING MARVEL
===================================================== */

.engineering-section {
    padding-bottom: 0;
}

.engineering-section > span {
    margin-bottom: 10px;
}

.engineering-section p {
    max-width: 850px;

    margin: 0;

    color: var(--section-muted);

    font-size: 15px;

    line-height: 1.8;
}


/* =====================================================
   INTERESTING FACTS
===================================================== */

.facts-section ul {
    list-style: none;

    padding: 0;
    margin: 0;
}

.facts-section li {
    position: relative;

    padding: 8px 0 8px 25px;

    border: none;

    color: var(--section-muted);

    font-size: 15px;

    line-height: 1.8;
}

.facts-section li::before {
    content: "•";

    position: absolute;

    left: 0;
    top: 8px;

    color: var(--section-accent);

    font-size: 16px;
}


/* =====================================================
   MOBILE
===================================================== */

@media (max-width: 600px) {

    .architecture-content,
    .materials-section,
    .engineering-section,
    .facts-section {
        margin-top: 35px;
        padding-top: 20px;
    }

    .architecture-grid {
        grid-template-columns: 1fr;
    }

    .architecture-item {
        padding: 12px 0;
    }

    .section-heading {
        margin-bottom: 18px;
    }

    .section-heading h2 {
        font-size: 16px;
    }

    .architecture-item p,
    .engineering-section p,
    .facts-section li {
        font-size: 14px;
    }

    .material-tag {
        font-size: 10px;
        padding: 7px 12px;
    }
}

/* =====================================================
   ARTICLES
===================================================== */

.articles-section {
    margin-top: 40px;
    padding-top: 25px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.articles-list {
    display: grid;
    gap: 12px;
}

.article-item {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 16px 0;

    text-decoration: none;

    transition: all 0.3s ease;
}

.article-content {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.article-content span {
    color: var(--section-accent);

    font-size: 9px;
    font-weight: 700;

    letter-spacing: 1.5px;
}

.article-content p {
    margin: 0;

    color: var(--section-muted);

    font-size: 14px;
    line-height: 1.5;

    transition: color 0.3s ease;
}

.article-arrow {
    color: var(--section-muted);

    font-size: 20px;

    transition:
        color 0.3s ease,
        transform 0.3s ease;
}

.article-item:hover .article-content p {
    color: var(--section-accent);
}

.article-item:hover .article-arrow {
    color: var(--section-accent);
    transform: translate(3px, -3px);
}


/* =====================================================
   ARTICLES - MOBILE
===================================================== */

@media (max-width: 600px) {

    .articles-section {
        margin-top: 35px;
        padding-top: 20px;
    }

    .article-item {
        padding: 14px 0;
    }

    .article-content p {
        font-size: 13px;
    }

    .article-arrow {
        font-size: 18px;
    }
}

/* Responsive */
@media (max-width: 768px) {
    .detail-image img {
        height: 300px;
    }
    
    .detail-meta {
        grid-template-columns: 1fr 1fr;
    }
    
    .detail-content h1 {
        font-size: 2.5rem;
    }
}

@media (max-width: 480px) {
    .detail-meta {
        grid-template-columns: 1fr;
    }
}
@media (max-width: 600px) {

    .architecture-content {
        margin-top: 35px;
        padding-top: 20px;
    }

    .architecture-grid {
        grid-template-columns: 1fr;
    }

    .architecture-item {
        padding: 22px 24px;
    }

    .architecture-item::before {
        top: 22px;
    }

    .architecture-item p {
        font-size: 14px;
        line-height: 1.7;
    }

    .section-heading {
        margin-bottom: 20px;
    }

    .section-heading h2 {
        font-size: 19px;
    }
}
</style>