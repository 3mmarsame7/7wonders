<script setup>
import {
  onMounted,
  onUnmounted,
  ref,
  nextTick,
} from "vue";

import Navbar from "./components/Navbar.vue";
import WonderSection from "./components/WonderSection.vue";

/* =====================================================
   STATE
===================================================== */

const activeWonder = ref("01");
const heroOffset = ref(0);

const wonders = ref([]);
const loading = ref(true);
const error = ref(null);

let observer;

/* =====================================================
    API
===================================================== */

const API_URL =
  "https://www.world-wonders-api.org/v0/wonders";


/* =====================================================
    WONDER THEMES
===================================================== */


const getWonderTheme = (name) => {
  const title = name?.toLowerCase() || "";

  // 01 - Great Pyramid of Giza
  if (
    title.includes("great pyramid") ||
    title.includes("pyramid of giza")
  ) {
    return "sand";
  }

  // 02 - Hanging Gardens of Babylon
  if (
    title.includes("hanging gardens") ||
    title.includes("babylon")
  ) {
    return "garden";
  }

  // 03 - Temple of Artemis
  if (
    title.includes("temple of artemis") ||
    title.includes("artemis")
  ) {
    return "marble";
  }

  // 04 - Statue of Zeus
  if (
    title.includes("statue of zeus") ||
    title.includes("zeus")
  ) {
    return "gold";
  }

  // 05 - Mausoleum at Halicarnassus
  if (
    title.includes("mausoleum") ||
    title.includes("halicarnassus")
  ) {
    return "stone";
  }

  // 06 - Colossus of Rhodes
  if (
    title.includes("colossus") ||
    title.includes("rhodes")
  ) {
    return "ocean";
  }

  // 07 - Lighthouse of Alexandria
  if (
    title.includes("lighthouse") ||
    title.includes("alexandria")
  ) {
    return "sunset";
  }

  // Fallback
  return "sand";
};

/* =====================================================
    API
===================================================== */

const fetchWonders = async () => {
  try {
    loading.value = true;
    error.value = null;

    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(
        `API returned ${response.status}`
      );
    }

    const data = await response.json();

    console.log("All API Wonders:", data);

    /* =================================================
        THE 7 ANCIENT WONDERS ONLY
    ================================================= */

    const ancientWonderNames = [
      "Great Pyramid of Giza",
      "Hanging Gardens of Babylon",
      "Temple of Artemis",
      "Statue of Zeus at Olympia",
      "Mausoleum at Halicarnassus",
      "Colossus of Rhodes",
      "Lighthouse of Alexandria",
    ];

    /* =================================================
        FILTER API DATA
    ================================================= */

    const ancientWonders = ancientWonderNames
      .map((wantedName) => {

        return data.find((wonder) => {

          const apiName =
            wonder.name?.toLowerCase() || "";

          const targetName =
            wantedName.toLowerCase();

          return (
            apiName.includes(targetName) ||
            targetName.includes(apiName)
          );

        });

      })
      .filter(Boolean);


    console.log(
      "Ancient Seven Wonders:",
      ancientWonders
    );

    /* =================================================
        MAP API DATA TO OUR COMPONENT
    ================================================= */

    wonders.value =
      ancientWonders.map(
        (wonder, index) => {

          const wonderName =
            wonder.name ||
            ancientWonderNames[index];

          return {

            /*
             * Number
             */

            number:
              String(index + 1)
                .padStart(2, "0"),

            /*
             * Short title
             */

            shortTitle:
              wonderName
                .replace(/^The\s+/i, "")
                .toUpperCase(),

            /*
             * Category
             */

            category:
              "ANCIENT WORLD",

            /*
             * Main title
             */

            title:
              wonderName.toUpperCase(),

            /*
             * Description
             */

            description:
              wonder.summary ||
              wonder.description ||
              "No description available.",

            /*
             * Location
             */

            location:
              typeof wonder.location === "string"
                ? wonder.location.toUpperCase()
                : wonder.location?.name
                  ? wonder.location.name.toUpperCase()
                  : "UNKNOWN LOCATION",

            /*
             * Construction year
             */

            built:
              typeof wonder.build_year === "number"

                ? wonder.build_year < 0

                  ? `c. ${Math.abs(
                      wonder.build_year
                    )} BCE`

                  : `c. ${wonder.build_year}`

                : wonder.build_year ||
                  "UNKNOWN",

            /*
             * Image
             */

            image:
              wonder.links?.images?.[0] ||
              wonder.image ||
              "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368",

            /*
             * =========================================
             * IMPORTANT
             * =========================================
             */

            theme:
              getWonderTheme(wonderName),

          };

        }
      );


    console.log(
      "Mapped Wonders:",
      wonders.value
    );


  } catch (err) {

    console.error(
      "Wonders API Error:",
      err
    );

    error.value =
      "Failed to load the ancient wonders.";

  } finally {

    loading.value = false;

  }
};

/* =====================================================
    SCROLL TO WONDERS
===================================================== */

const scrollToWonders = () => {

  const section =
    document.querySelector("#wonders");

  if (!section) return;

  section.scrollIntoView({
    behavior: "smooth",
  });

};

/* =====================================================
    HERO PARALLAX
===================================================== */

const handleHeroParallax = () => {

  const scroll =
    window.scrollY;

  if (
    scroll >
    window.innerHeight
  ) {
    return;
  }

  heroOffset.value =
    scroll * 0.18;

};


/* =====================================================
    MOUNT
===================================================== */

onMounted(async () => {

  /*
    First get the data from the API
  */

  await fetchWonders();

  /*
    Wait until Vue renders
    WonderSection components.
  */

  await nextTick();


  /* ===================================================
      INTERSECTION OBSERVER
  =================================================== */

  const sections =
    document.querySelectorAll(
      ".wonder-section"
    );


  observer =
    new IntersectionObserver(
      (entries) => {

        entries.forEach(
          (entry) => {

            if (
              entry.isIntersecting
            ) {

              const number =
                entry.target.id
                  .replace(
                    "wonder-",
                    ""
                  );

              activeWonder.value =
                number;

            }

          }
        );

      },
      {
        threshold: 0.55,
      }
    );


  sections.forEach(
    (section) => {

      observer.observe(
        section
      );

    }
  );


  /* ===================================================
      SCROLL EVENT
  =================================================== */

  window.addEventListener(
    "scroll",
    handleHeroParallax,
    {
      passive: true,
    }
  );

});


/* =====================================================
    UNMOUNT
===================================================== */

onUnmounted(() => {

  observer?.disconnect();

  window.removeEventListener(
    "scroll",
    handleHeroParallax
  );

});
</script>


<template>

  <main
    id="top"
    class="home"
  >

    <!-- =========================
          NAVBAR
    ========================== -->

    <Navbar />


    <!-- =========================
          HERO
    ========================== -->

    <section class="hero">

      <!-- BACKGROUND -->

      <div
        class="hero-background"
        :style="{
          transform:
            `translateY(${heroOffset}px) scale(1.05)`
        }"
      ></div>

      <!-- OVERLAY -->

      <div class="hero-overlay"></div>

      <!-- GLOW -->

      <div class="hero-glow"></div>

      <!-- CONTENT -->

      <div class="hero-content">

        <p class="hero-label">
          A JOURNEY THROUGH HISTORY
        </p>


        <h1>

          WONDERS

          <span>
            OF THE WORLD
          </span>

        </h1>

        <p class="hero-description">
          Explore the stories, civilizations, and remarkable
          achievements behind the world's most extraordinary
          wonders.
        </p>

        <!-- EXPLORE BUTTON -->

        <button
          class="explore-button"
          @click="scrollToWonders"
        >

          <span>
            EXPLORE THE WONDERS
          </span>

          <span class="explore-arrow">
            ↓
          </span>

        </button>

      </div>

      <!-- =========================
            SCROLL INDICATOR
      ========================== -->

      <div class="scroll-indicator">

        <span></span>

        SCROLL TO EXPLORE

      </div>

    </section>

    <!-- =========================
          LOADING
    ========================== -->

    <section
      v-if="loading"
      class="status-section"
    >

      <div class="loader"></div>

      <p>
        LOADING WONDERS...
      </p>

    </section>


    <!-- =========================
          ERROR
    ========================== -->

    <section
      v-else-if="error"
      class="status-section error-section"
    >

      <p>
        {{ error }}
      </p>

      <button
        class="retry-button"
        @click="fetchWonders"
      >
        TRY AGAIN
      </button>

    </section>

    <!-- =========================
          WONDERS
    ========================= -->

    <div
      v-else
      id="wonders"
    >

      <WonderSection
        v-for="wonder in wonders"
        :key="wonder.number"
        v-bind="wonder"
      />

    </div>

  </main>

</template>


<style scoped>

/* =====================================================
    HOME
===================================================== */

.home {
  min-height: 100vh;
}

/* =====================================================
    HERO
===================================================== */

.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  isolation: isolate;
  background:
    #101820;
}

/* =====================================================
    HERO BACKGROUND
===================================================== */

.hero-background {
  position: absolute;
  inset: -6%;
  z-index: -3;
  background:
    url(
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da"
    )
    center / cover no-repeat;
  will-change: transform;
}

/* =====================================================
    HERO OVERLAY
===================================================== */

.hero-overlay {
  position: absolute;
  inset: 0;
  z-index: -2;
  background:
    linear-gradient(
      90deg,
      rgba(10, 15, 20, 0.95) 0%,
      rgba(10, 15, 20, 0.72) 45%,
      rgba(10, 15, 20, 0.25) 100%
    );
}

/* =====================================================
    HERO GLOW
===================================================== */

.hero-glow {
  position: absolute;
  width: 600px;
  height: 600px;
  right: -200px;
  top: 20%;
  border-radius: 50%;
  background:
    radial-gradient(
      circle,
      rgba(214, 184, 120, 0.22),
      transparent 70%
    );
  filter: blur(20px);
  pointer-events: none;
  animation:
    glowMove 8s ease-in-out infinite alternate;
}

/* =====================================================
    HERO CONTENT
===================================================== */

.hero-content {
  position: relative;
  z-index: 2;
  width:
    min(
      86%,
      1400px
    );
  margin: auto;
}

/* =====================================================
    HERO LABEL
===================================================== */

.hero-label {
  margin-bottom: 24px;
  color:
    var(--color-sand);
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.25em;
  animation:
    heroFade 1s 0.2s both;
}


/* =====================================================
    HERO TITLE
===================================================== */

.hero h1 {
  margin: 0;
  font-size:
    clamp(
      4rem,
      9vw,
      9rem
    );
  line-height: 0.9;
  font-weight: 800;
  letter-spacing: -0.06em;
  animation:
    heroTitle 1.1s 0.35s both;
}

.hero h1 span {
  display: block;
  color:
    var(--color-sand);
}

/* =====================================================
    HERO DESCRIPTION
===================================================== */

.hero-description {
  max-width: 650px;
  margin-top: 35px;
  color:
    var(--text-secondary);
  font-size:
    clamp(
      18px,
      2vw,
      22px
    );
  line-height: 1.7;
  animation:
    heroFade 1s 0.65s both;
}


/* =====================================================
    EXPLORE BUTTON
===================================================== */

.explore-button {
  display: inline-flex;
  align-items: center;
  gap: 20px;
  margin-top: 40px;
  padding:
    6px 6px 6px 25px;
  border:
    1px solid
    rgba(255, 255, 255, 0.4);
  border-radius: 999px;
  background:
    rgba(255, 255, 255, 0.03);
  color: white;
  cursor: pointer;
  backdrop-filter:
    blur(10px);
  animation:
    heroFade 1s 0.85s both;
  transition:
    background 0.4s ease,
    color 0.4s ease,
    transform 0.4s ease,
    border-color 0.4s ease;
}

.explore-button:hover {
  background:
    var(--color-sand);
  border-color:
    var(--color-sand);
  color:
    var(--color-dark);
  transform:
    translateY(-5px);
}

.explore-button > span:first-child {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.16em;
}

.explore-arrow {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background:
    var(--color-sand);
  color:
    var(--color-dark);
  font-size: 20px;
  transition:
    transform 0.4s ease;
}

.explore-button:hover
.explore-arrow {
  transform:
    translateY(4px);
  background:
    var(--color-dark);
  color:
    var(--color-sand);
}

/* =====================================================
    SCROLL INDICATOR
===================================================== */

.scroll-indicator {
  position: absolute;
  left: 50%;
  bottom: 35px;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 12px;
  transform:
    translateX(-50%);
  color:
    rgba(255, 255, 255, 0.6);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.2em;
  animation:
    heroFade 1s 1.1s both;
}


.scroll-indicator span {
  width: 1px;
  height: 45px;
  background:
    var(--color-sand);
  animation:
    scrollLine 1.8s ease-in-out infinite;
}


/* =====================================================
    API STATUS
===================================================== */

.status-section {
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  background:
    var(--color-dark);
  color: white;
}


.status-section p {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.2em;
  color:
    var(--color-sand);
}


/* =====================================================
    LOADER
===================================================== */

.loader {
  width: 50px;
  height: 50px;
  border:
    3px solid
    rgba(214, 184, 120, 0.2);
  border-top-color:
    var(--color-sand);
  border-radius: 50%;
  animation:
    spin 0.8s linear infinite;
}


/* =====================================================
    ERROR
===================================================== */

.error-section p {
  color: #ff7777;
}

.retry-button {
  padding:
    12px 25px;
  border:
    1px solid
    var(--color-sand);
  border-radius: 999px;
  background: transparent;
  color:
    var(--color-sand);
  cursor: pointer;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.15em;
  transition:
    all 0.3s ease;
}

.retry-button:hover {
  background:
    var(--color-sand);

  color:
    var(--color-dark);
}

/* =====================================================
    ANIMATIONS
===================================================== */

@keyframes heroFade {
  from {
    opacity: 0;
    transform:
      translateY(25px);
  }

  to {
    opacity: 1;
    transform:
      translateY(0);
  }
}

@keyframes heroTitle {
  from {
    opacity: 0;
    transform:
      translateY(50px);
    clip-path:
      inset(0 0 100% 0);
  }

  to {
    opacity: 1;
    transform:
      translateY(0);
    clip-path:
      inset(0 0 0 0);
  }
}

@keyframes scrollLine {
  0%,
  100% {
    transform:
      scaleY(0.4);
    transform-origin:
      top;
  }

  50% {
    transform:
      scaleY(1);
    transform-origin:
      top;
  }

}

@keyframes glowMove {
  from {
    transform:
      translate(0, 0)
      scale(1);
  }

  to {
    transform:
      translate(-80px, 40px)
      scale(1.15);
  }

}

@keyframes spin {
  to {
    transform:
      rotate(360deg);
  }
}


/* =====================================================
    RESPONSIVE
===================================================== */

@media (max-width: 768px) {
  .hero-background {
    background-position:
      65% center;
  }

  .hero h1 {
    font-size:
      clamp(
        3.5rem,
        16vw,
        6rem
      );
  }

  .hero-description {
    font-size: 17px;
  }

  .scroll-indicator {
    display: none;
  }

  .hero-glow {
    width: 350px;
    height: 350px;
  }

}

</style>