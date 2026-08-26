
<template>
  <main class="time-travel-page" :class="{ changing: isChanging }">
     
    <!-- ===== NAVBAR ===== -->
    <Navbar />
    <!-- BACKGROUND -->
    <div class="stars"></div>
    <div class="stars stars-2"></div>
    <div class="dust dust-1"></div>
    <div class="dust dust-2"></div>
    <div class="golden-orb"></div>

    <!-- INTRO -->
    <Transition name="intro">
      <section v-if="showIntro" class="intro-screen">
        <div class="intro-glow"></div>

        <p class="intro-small">THE SEVEN WONDERS</p>

        <h1>
          ENTER THE
          <span>ANCIENT WORLD</span>
        </h1>

        <div class="intro-line"></div>

        <p class="intro-description">
          Travel through thousands of years of history
          and witness the legendary wonders of the ancient world.
        </p>

        <button class="enter-btn" @click="startJourney">
          <span>ENTER TIME TRAVEL</span>
          <i>→</i>
        </button>
      </section>
    </Transition>

    <!-- MAIN EXPERIENCE -->
    <section v-if="!showIntro" class="experience">

      <!-- HEADER -->
      <div class="top-content">

        <div class="eyebrow">
          <span class="pulse-dot"></span>
          TIME TRAVEL EXPERIENCE
        </div>

        <h1 class="main-title">
          JOURNEY THROUGH
          <span>TIME</span>
        </h1>

        <p class="subtitle">
          Move through history and discover how the Seven Wonders
          rose, lived and disappeared.
        </p>

      </div>

      <!-- YEAR -->
      <div class="year-area">

        <div class="year-label">
          CURRENT ERA
        </div>

        <Transition name="year" mode="out-in">
          <div :key="currentYear" class="year">
            {{ formatYear(currentYear) }}
          </div>
        </Transition>

        <div class="era-line">
          <span></span>
          <div class="era-dot"></div>
          <span></span>
        </div>

      </div>

      <!-- WONDER -->
      <Transition name="wonder" mode="out-in">

        <article
          :key="activeWonder.id"
          class="wonder-container"
        >

          <div class="wonder-image-wrapper">

            <div class="image-glow"></div>

            <div class="image-frame">

              <div class="corner top-left"></div>
              <div class="corner top-right"></div>
              <div class="corner bottom-left"></div>
              <div class="corner bottom-right"></div>

              <div
                class="wonder-visual"
                :style="{
                  backgroundImage: `url(${activeWonder.image})`,
                  backgroundPosition: activeImagePosition
                }"
              ></div>

              <div class="image-overlay"></div>

              <div class="image-number">
                0{{ activeWonder.id }}
              </div>

            </div>

          </div>

          <div class="wonder-info">

            <div class="status">
              <span :class="statusClass"></span>
              {{ activeWonder.status }}
            </div>

            <h2>
              {{ activeWonder.name }}
            </h2>

            <div class="location">
              <span>✦</span>
              {{ activeWonder.location }}
            </div>

            <p class="story">
              {{ activeWonder.description }}
            </p>

            <div class="history-grid">

              <div>
                <small>BUILT</small>
                <strong>{{ activeWonder.built }}</strong>
              </div>

              <div>
                <small>FATE</small>
                <strong>{{ activeWonder.destroyed }}</strong>
              </div>

            </div>

          </div>

        </article>

      </Transition>

      <!-- TIMELINE -->
      <div class="timeline-section">

        <div class="timeline-header">
          <span>BEGINNING OF HISTORY</span>
          <span>END OF ANTIQUITY</span>
        </div>

        <div class="timeline">

          <div class="timeline-track"></div>

          <div
            v-for="(wonder, index) in wonders"
            :key="wonder.id"
            class="timeline-marker"
            :class="{ active: activeIndex === index }"
            :style="{ left: `${getMarkerPosition(index)}%` }"
            @click="goToWonder(index)"
          >
            <div class="marker-glow"></div>
            <div class="marker-dot"></div>

            <span>
              {{ formatShortYear(wonder.year) }}
            </span>
          </div>

          <input
            v-model.number="currentYear"
            class="timeline-input"
            type="range"
            :min="MIN_YEAR"
            :max="MAX_YEAR"
            :step="1"
            @input="handleYearChange"
          />

        </div>

        <div class="timeline-years">
          <span>3000 BC</span>
          <span>2000 BC</span>
          <span>1000 BC</span>
          <span>1 AD</span>
          <span>1000 AD</span>
          <span>1500 AD</span>
        </div>

      </div>

      <!-- CONTROLS -->
      <div class="controls">

        <button
          class="control-btn"
          :disabled="activeIndex === 0"
          @click="previousWonder"
        >
          ← PREVIOUS
        </button>

        <div class="journey-count">
          <span>WONDER</span>
          {{ String(activeIndex + 1).padStart(2, "0") }}
          <span>/ 07</span>
        </div>

        <button
          class="control-btn"
          :disabled="activeIndex === wonders.length - 1"
          @click="nextWonder"
        >
          NEXT →
        </button>

      </div>

      <!-- FOOTER TEXT -->
      <div class="bottom-message">
        <span></span>
        DRAG THE TIMELINE TO TRAVEL THROUGH HISTORY
        <span></span>
      </div>

    </section>

  </main>
</template>

<script setup>
import { computed, ref } from "vue";

import Navbar from "../components/Navbar.vue";

const showIntro = ref(true);
const currentYear = ref(-2560);
const activeIndex = ref(0);
const isChanging = ref(false);

const MIN_YEAR = -3000;
const MAX_YEAR = 1500;

/*
  IMPORTANT:
  Years use negative numbers for BC.
  Example:
  -2560 = 2560 BC
  1 = 1 AD
*/

const wonders = [
  {
    id: 1,
    name: "Great Pyramid of Giza",
    location: "Giza, Egypt",
    year: -2560,
    built: "c. 2560 BC",
    destroyed: "Still standing",
    status: "STILL STANDING",
    description:
      "Built as the tomb of Pharaoh Khufu, the Great Pyramid rose from the desert of Giza and became the only one of the Seven Wonders to survive largely intact. Its enormous scale and precise construction made it a symbol of ancient Egyptian power.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/e/e3/Kheops-Pyramid.jpg"
  },

  {
    id: 2,
    name: "Hanging Gardens of Babylon",
    location: "Babylon, Mesopotamia",
    year: -600,
    built: "Traditionally c. 600 BC",
    destroyed: "Unknown",
    status: "LOST TO HISTORY",
    description:
      "The Hanging Gardens are described in ancient accounts as a spectacular series of elevated gardens filled with trees and plants. Their exact location and even their historical existence remain debated, making them one of antiquity's greatest mysteries.",
    image:
      "https://cdn.britannica.com/39/1139-050-71C43AEE/re-creation-artist-Hanging-Gardens-of-Babylon-world.jpg"
  },

  {
    id: 3,
    name: "Temple of Artemis",
    location: "Ephesus, Anatolia",
    year: -550,
    built: "c. 550 BC",
    destroyed: "Destroyed and rebuilt multiple times",
    status: "DESTROYED",
    description:
      "Dedicated to Artemis, the great temple at Ephesus was famous for its enormous scale and richly decorated columns. It suffered repeated destruction before finally disappearing as a monumental structure.",
    image:
      "https://cdn.britannica.com/51/168951-050-FF56AB5F/Temple-of-Artemis-Ephesus.jpg"
  },

  {
    id: 4,
    name: "Statue of Zeus",
    location: "Olympia, Greece",
    year: -435,
    built: "c. 435 BC",
    destroyed: "5th century AD",
    status: "DESTROYED",
    description:
      "Created by the sculptor Phidias, the colossal seated Zeus dominated the Temple of Olympia. The statue was famous throughout the ancient Mediterranean before eventually disappearing from history.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/6/66/Le_Jupiter_Olympien_ou_l%27art_de_la_sculpture_antique.jpg"
  },

  {
    id: 5,
    name: "Mausoleum at Halicarnassus",
    location: "Halicarnassus, Anatolia",
    year: -350,
    built: "c. 350 BC",
    destroyed: "Medieval period earthquakes",
    status: "DESTROYED",
    description:
      "Built as the monumental tomb of Mausolus, ruler of Caria, the Mausoleum combined Greek, Egyptian and Near Eastern architectural traditions. Its spectacular design became so famous that the word 'mausoleum' comes from its name.",
    image:
      "https://cdn.britannica.com/60/168960-050-766C48B3/Artist-re-creation-Mausoleum-of-Halicarnassus.jpg"
  },

  {
    id: 6,
    name: "Colossus of Rhodes",
    location: "Rhodes, Greece",
    year: -292,
    built: "c. 292–280 BC",
    destroyed: "Earthquake, c. 226 BC",
    status: "DESTROYED",
    description:
      "The Colossus was a gigantic bronze statue dedicated to the sun god Helios. It stood for only a few decades before an earthquake brought it down, yet its fame survived for centuries.",
    image:
      "https://cdn.britannica.com/81/39481-050-48B24E02/conception-Artist-Chares-of-Lindos-Colossus-Rhodes-1875.jpg"
  },

  {
    id: 7,
    name: "Lighthouse of Alexandria",
    location: "Alexandria, Egypt",
    year: -280,
    built: "c. 280 BC",
    destroyed: "Earthquakes, medieval period",
    status: "DESTROYED",
    description:
      "The Pharos of Alexandria guided ships into one of the ancient world's greatest ports. Its immense tower became a model for lighthouses and remained one of the tallest structures of the ancient world for centuries.",
    image:
      "https://cdn.britannica.com/07/172307-050-4D3BA855/Pharos-Alexandria.jpg"
  }
];
/* =========================
   IMAGE POSITIONS
========================= */

const imagePositions = {

  "great pyramid of giza": "center center",

  "hanging gardens of babylon": "center center",

  "temple of artemis": "center 5%",

  "statue of zeus": "center 25%",

  "mausoleum at halicarnassus": "center 5%",

  "colossus of rhodes": "65% 10%",

  "lighthouse of alexandria": "center 5%",

};

const activeWonder = computed(() => wonders[activeIndex.value]);

/* =========================
   ACTIVE IMAGE POSITION
========================= */

const activeImagePosition = computed(() => {

  if (!activeWonder.value?.name) {
    return "center center";
  }

  return (
    imagePositions[activeWonder.value.name.toLowerCase()] ||
    "center center"
  );

});
const statusClass = computed(() => {
  if (activeWonder.value.status === "STILL STANDING") {
    return "alive";
  }

  return "destroyed";
});

function formatYear(year) {
  if (year < 0) {
    return `${Math.abs(year)} BC`;
  }

  return `${year} AD`;
}

function formatShortYear(year) {
  if (year < 0) {
    return `${Math.abs(year)} BC`;
  }

  return `${year} AD`;
}

function getMarkerPosition(index) {
  const first = wonders[0].year;
  const last = wonders[wonders.length - 1].year;

  return ((wonders[index].year - first) / (last - first)) * 100;
}

function findClosestWonder(year) {
  let closestIndex = 0;
  let closestDistance = Infinity;

  wonders.forEach((wonder, index) => {
    const distance = Math.abs(year - wonder.year);

    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = index;
    }
  });

  return closestIndex;
}

function handleYearChange() {
  const newIndex = findClosestWonder(currentYear.value);

  if (newIndex !== activeIndex.value) {
    isChanging.value = true;
    activeIndex.value = newIndex;

    setTimeout(() => {
      isChanging.value = false;
    }, 700);
  }
}

function goToWonder(index) {
  isChanging.value = true;

  activeIndex.value = index;
  currentYear.value = wonders[index].year;

  setTimeout(() => {
    isChanging.value = false;
  }, 700);
}

function previousWonder() {
  if (activeIndex.value === 0) return;

  goToWonder(activeIndex.value - 1);
}

function nextWonder() {
  if (activeIndex.value === wonders.length - 1) return;

  goToWonder(activeIndex.value + 1);
}

function startJourney() {
  showIntro.value = false;
}
</script>

<style scoped>
/* =========================================================
   GLOBAL
========================================================= */

.time-travel-page {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  color: white;
  background:
    radial-gradient(circle at 50% 35%, rgba(194, 151, 74, 0.12), transparent 28%),
    radial-gradient(circle at 20% 80%, rgba(115, 83, 39, 0.14), transparent 30%),
    #070a0c;
  font-family: inherit;
}

/* =========================================================
   ANIMATED BACKGROUND
========================================================= */

.stars,
.stars-2 {
  position: fixed;
  inset: 0;
  pointer-events: none;
  background-image:
    radial-gradient(circle, rgba(255,255,255,.8) 1px, transparent 1px),
    radial-gradient(circle, rgba(214,184,120,.6) 1px, transparent 1px);
  background-size: 120px 120px, 190px 190px;
  background-position: 10px 20px, 70px 80px;
  opacity: .28;
  animation: starsMove 30s linear infinite;
}

.stars-2 {
  opacity: .16;
  transform: scale(1.5);
  animation-duration: 50s;
}

.golden-orb {
  position: fixed;
  width: 500px;
  height: 500px;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(214,184,120,.14),
    rgba(214,184,120,.04) 35%,
    transparent 70%
  );
  filter: blur(25px);
  pointer-events: none;
  animation: orbPulse 7s ease-in-out infinite;
}

.dust {
  position: fixed;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #d6b878;
  opacity: .5;
  filter: blur(1px);
  pointer-events: none;
}

.dust-1 {
  left: 15%;
  bottom: 10%;
  animation: dustFloat 9s ease-in-out infinite;
}

.dust-2 {
  right: 15%;
  top: 25%;
  animation: dustFloat 12s ease-in-out infinite reverse;
}

/* =========================================================
   INTRO
========================================================= */

.intro-screen {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  z-index: 5;
  padding: 40px;
}

.intro-glow {
  position: absolute;
  width: 450px;
  height: 450px;
  border-radius: 50%;
  background: rgba(214,184,120,.1);
  filter: blur(90px);
  animation: introGlow 5s ease-in-out infinite;
}

.intro-small {
  position: relative;
  color: #d6b878;
  letter-spacing: .45em;
  font-size: 11px;
  font-weight: 700;
  margin-bottom: 25px;
  animation: revealUp 1s ease forwards;
}

.intro-screen h1 {
  position: relative;
  max-width: 900px;
  font-size: clamp(50px, 8vw, 120px);
  line-height: .9;
  letter-spacing: -.04em;
  margin: 0;
  font-weight: 800;
  animation: revealUp 1.2s .15s both;
}

.intro-screen h1 span {
  display: block;
  color: transparent;
  -webkit-text-stroke: 1px rgba(214,184,120,.75);
}

.intro-line {
  width: 80px;
  height: 1px;
  background: #d6b878;
  margin: 35px 0;
  animation: lineGrow 1.2s .4s both;
}

.intro-description {
  max-width: 520px;
  color: rgba(255,255,255,.55);
  line-height: 1.8;
  animation: revealUp 1.2s .5s both;
}

.enter-btn {
  margin-top: 40px;
  padding: 17px 25px;
  border: 1px solid rgba(214,184,120,.6);
  background: rgba(214,184,120,.06);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 25px;
  letter-spacing: .18em;
  font-weight: 700;
  transition: .4s ease;
  animation: revealUp 1.2s .7s both;
}

.enter-btn i {
  font-style: normal;
  color: #d6b878;
  font-size: 22px;
  transition: .4s ease;
}

.enter-btn:hover {
  background: #d6b878;
  color: #080a0c;
  box-shadow: 0 0 50px rgba(214,184,120,.25);
  transform: translateY(-5px);
}

.enter-btn:hover i {
  color: #080a0c;
  transform: translateX(8px);
}

/* =========================================================
   EXPERIENCE
========================================================= */

.experience {
  position: relative;
  z-index: 2;
  min-height: 100vh;
  max-width: 1250px;
  margin: auto;
  padding: 150px 40px 70px;
}

.top-content {
  text-align: center;
}

.eyebrow {
  color: #d6b878;
  letter-spacing: .35em;
  font-size: 10px;
  font-weight: 800;
}

.pulse-dot {
  display: inline-block;
  width: 7px;
  height: 7px;
  margin-right: 9px;
  border-radius: 50%;
  background: #d6b878;
  box-shadow: 0 0 18px #d6b878;
  animation: pulse 2s infinite;
}

.main-title {
  font-size: clamp(45px, 7vw, 90px);
  line-height: .9;
  margin: 20px 0;
  letter-spacing: -.05em;
}

.main-title span {
  display: block;
  color: #d6b878;
}

.subtitle {
  max-width: 600px;
  margin: auto;
  color: rgba(255,255,255,.48);
  line-height: 1.8;
}

/* =========================================================
   YEAR
========================================================= */

.year-area {
  text-align: center;
  margin: 55px 0 40px;
}

.year-label {
  color: rgba(255,255,255,.3);
  letter-spacing: .35em;
  font-size: 9px;
}

.year {
  margin: 5px 0;
  font-size: clamp(65px, 11vw, 145px);
  font-weight: 800;
  letter-spacing: -.06em;
  color: #fff;
  text-shadow:
    0 0 30px rgba(214,184,120,.18),
    0 0 80px rgba(214,184,120,.08);
}

.era-line {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0;
}

.era-line span {
  width: 100px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(214,184,120,.6));
}

.era-line span:last-child {
  background: linear-gradient(90deg, rgba(214,184,120,.6), transparent);
}

.era-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #d6b878;
  box-shadow: 0 0 20px #d6b878;
}

/* =========================================================
   WONDER
========================================================= */

.wonder-container {
  display: grid;
  grid-template-columns: 1.15fr .85fr;
  align-items: center;
  gap: 80px;
  margin: 35px auto 80px;
  max-width: 1050px;
}

.wonder-image-wrapper {
  position: relative;
}

.image-glow {
  position: absolute;
  inset: 12%;
  background: rgba(214,184,120,.16);
  filter: blur(60px);
}

.image-frame {
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border: 1px solid rgba(214,184,120,.3);
  background: #0c1012;
  box-shadow:
    0 30px 80px rgba(0,0,0,.5),
    0 0 60px rgba(214,184,120,.05);
}

.wonder-visual {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  filter: sepia(.15) saturate(.75) contrast(1.05);
  transform: scale(1.04);
  transition: transform 1.2s ease;
}

.image-frame:hover .wonder-visual {
  transform: scale(1.1);
}

.image-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, transparent 30%, rgba(0,0,0,.7)),
    linear-gradient(90deg, rgba(0,0,0,.15), transparent);
}

.image-number {
  position: absolute;
  top: 20px;
  right: 25px;
  color: rgba(255,255,255,.65);
  font-size: 12px;
  letter-spacing: .2em;
}

.corner {
  position: absolute;
  width: 25px;
  height: 25px;
  border-color: #d6b878;
  z-index: 2;
}

.top-left {
  top: 14px;
  left: 14px;
  border-top: 1px solid;
  border-left: 1px solid;
}

.top-right {
  top: 14px;
  right: 14px;
  border-top: 1px solid;
  border-right: 1px solid;
}

.bottom-left {
  bottom: 14px;
  left: 14px;
  border-bottom: 1px solid;
  border-left: 1px solid;
}

.bottom-right {
  bottom: 14px;
  right: 14px;
  border-bottom: 1px solid;
  border-right: 1px solid;
}

.wonder-info {
  position: relative;
}

.status {
  display: flex;
  align-items: center;
  gap: 9px;
  color: rgba(255,255,255,.5);
  font-size: 9px;
  font-weight: 800;
  letter-spacing: .25em;
}

.status span {
  width: 7px;
  height: 7px;
  border-radius: 50%;
}

.status .alive {
  background: #9acb8b;
  box-shadow: 0 0 15px #9acb8b;
}

.status .destroyed {
  background: #c78368;
  box-shadow: 0 0 15px #c78368;
}

.wonder-info h2 {
  font-size: clamp(38px, 5vw, 65px);
  line-height: .95;
  letter-spacing: -.04em;
  margin: 18px 0;
}

.location {
  color: #d6b878;
  letter-spacing: .1em;
  font-size: 12px;
  margin-bottom: 25px;
}

.location span {
  margin-right: 8px;
}

.story {
  color: rgba(255,255,255,.58);
  line-height: 1.9;
  font-size: 14px;
}

.history-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-top: 30px;
}

.history-grid div {
  padding: 18px;
  border: 1px solid rgba(255,255,255,.08);
  background: rgba(255,255,255,.025);
}

.history-grid small {
  display: block;
  color: rgba(255,255,255,.3);
  font-size: 8px;
  letter-spacing: .2em;
  margin-bottom: 8px;
}

.history-grid strong {
  font-size: 12px;
  color: #d6b878;
}

/* =========================================================
   TIMELINE
========================================================= */

.timeline-section {
  max-width: 1050px;
  margin: auto;
}

.timeline-header,
.timeline-years {
  display: flex;
  justify-content: space-between;
  color: rgba(255,255,255,.3);
  font-size: 8px;
  letter-spacing: .15em;
}

.timeline {
  position: relative;
  height: 80px;
  margin: 15px 0 0;
}

.timeline-track {
  position: absolute;
  left: 0;
  right: 0;
  top: 35px;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(214,184,120,.55),
    transparent
  );
}

.timeline-input {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 70px;
  opacity: 0;
  cursor: pointer;
  z-index: 10;
}

.timeline-marker {
  position: absolute;
  top: 27px;
  transform: translateX(-50%);
  z-index: 3;
  cursor: pointer;
}

.marker-dot {
  width: 17px;
  height: 17px;
  border: 1px solid rgba(214,184,120,.5);
  border-radius: 50%;
  background: #090c0e;
  transition: .4s ease;
}

.marker-glow {
  position: absolute;
  inset: -12px;
  border-radius: 50%;
  background: rgba(214,184,120,.15);
  filter: blur(10px);
  opacity: 0;
  transition: .4s ease;
}

.timeline-marker.active .marker-dot {
  background: #d6b878;
  box-shadow:
    0 0 15px #d6b878,
    0 0 35px rgba(214,184,120,.5);
  transform: scale(1.3);
}

.timeline-marker.active .marker-glow {
  opacity: 1;
}

.timeline-marker span {
  position: absolute;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  color: rgba(255,255,255,.25);
  font-size: 7px;
  opacity: 0;
  transition: .3s ease;
}

.timeline-marker:hover span,
.timeline-marker.active span {
  opacity: 1;
  color: #d6b878;
}

.timeline-years {
  margin-top: -5px;
}

/* =========================================================
   CONTROLS
========================================================= */

.controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
  margin-top: 55px;
}

.control-btn {
  background: transparent;
  border: none;
  color: rgba(255,255,255,.45);
  letter-spacing: .2em;
  font-size: 9px;
  cursor: pointer;
  transition: .3s ease;
}

.control-btn:hover:not(:disabled) {
  color: #d6b878;
  transform: translateY(-2px);
}

.control-btn:disabled {
  opacity: .15;
  cursor: not-allowed;
}

.journey-count {
  color: #d6b878;
  font-size: 14px;
  font-weight: 800;
  letter-spacing: .15em;
}

.journey-count span {
  color: rgba(255,255,255,.25);
  font-size: 8px;
}

.bottom-message {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-top: 55px;
  color: rgba(255,255,255,.2);
  font-size: 8px;
  letter-spacing: .25em;
}

.bottom-message span {
  width: 30px;
  height: 1px;
  background: rgba(255,255,255,.15);
}

/* =========================================================
   TRANSITIONS
========================================================= */

.intro-enter-active,
.intro-leave-active {
  transition: opacity 1.1s ease, transform 1.1s ease;
}

.intro-enter-from,
.intro-leave-to {
  opacity: 0;
  transform: scale(1.15);
}

.wonder-enter-active,
.wonder-leave-active {
  transition:
    opacity .65s ease,
    transform .8s cubic-bezier(.22,1,.36,1),
    filter .65s ease;
}

.wonder-enter-from {
  opacity: 0;
  transform: translateY(45px) scale(.96);
  filter: blur(12px);
}

.wonder-leave-to {
  opacity: 0;
  transform: translateY(-35px) scale(1.02);
  filter: blur(10px);
}

.year-enter-active,
.year-leave-active {
  transition: opacity .35s ease, transform .45s ease, filter .35s ease;
}

.year-enter-from {
  opacity: 0;
  transform: translateY(35px);
  filter: blur(12px);
}

.year-leave-to {
  opacity: 0;
  transform: translateY(-35px);
  filter: blur(12px);
}

/* =========================================================
   KEYFRAMES
========================================================= */

@keyframes starsMove {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-120px);
  }
}

@keyframes orbPulse {
  0%, 100% {
    opacity: .5;
    transform: translateX(-50%) scale(.9);
  }
  50% {
    opacity: 1;
    transform: translateX(-50%) scale(1.1);
  }
}

@keyframes introGlow {
  0%, 100% {
    transform: scale(.8);
    opacity: .4;
  }
  50% {
    transform: scale(1.2);
    opacity: .8;
  }
}

@keyframes revealUp {
  from {
    opacity: 0;
    transform: translateY(35px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes lineGrow {
  from {
    width: 0;
    opacity: 0;
  }
  to {
    width: 80px;
    opacity: 1;
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.8);
    opacity: .4;
  }
}

@keyframes dustFloat {
  0%, 100% {
    transform: translate(0, 0);
    opacity: .15;
  }
  50% {
    transform: translate(80px, -120px);
    opacity: .8;
  }
}

/* =========================================================
   RESPONSIVE
========================================================= */

@media (max-width: 850px) {
  .experience {
    padding: 125px 22px 50px;
  }

  .wonder-container {
    grid-template-columns: 1fr;
    gap: 35px;
  }

  .wonder-info {
    text-align: center;
  }

  .status,
  .location {
    justify-content: center;
  }

  .history-grid {
    text-align: left;
  }

  .controls {
    gap: 25px;
  }
}

@media (max-width: 550px) {
  .intro-screen {
    padding: 25px;
  }

  .intro-description {
    font-size: 13px;
  }

  .main-title {
    font-size: 45px;
  }

  .year {
    font-size: 70px;
  }

  .timeline-years span:nth-child(2),
  .timeline-years span:nth-child(4),
  .timeline-years span:nth-child(5) {
    display: none;
  }

  .bottom-message {
    text-align: center;
    line-height: 1.7;
  }

  .controls {
    gap: 18px;
  }

  .control-btn {
    font-size: 8px;
  }
}
</style>