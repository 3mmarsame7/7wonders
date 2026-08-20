<script setup>
import { onMounted, onUnmounted, ref } from "vue";

import Navbar from "./components/Navbar.vue";
import WonderSection from "./components/WonderSection.vue";

const activeWonder = ref("01");
const heroOffset = ref(0);

const wonders = [
  {
    number: "01",
    shortTitle: "GREAT PYRAMID",
    category: "ANCIENT WORLD",
    title: "THE GREAT PYRAMID OF GIZA",
    description:
      "Built thousands of years ago, the Great Pyramid of Giza remains one of humanity's most remarkable architectural achievements and the only surviving wonder of the ancient world.",
    location: "GIZA, EGYPT",
    built: "c. 2560 BCE",
    image:
      "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368",
    theme: "sand",
  },

  {
    number: "02",
    shortTitle: "HANGING GARDENS",
    category: "ANCIENT WORLD",
    title: "THE HANGING GARDENS OF BABYLON",
    description:
      "A legendary garden said to have transformed the ancient city of Babylon into a remarkable landscape of terraces, plants, water, and architectural imagination.",
    location: "BABYLON, IRAQ",
    built: "c. 600 BCE",
    image:
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742",
    theme: "garden",
  },

  {
    number: "03",
    shortTitle: "TEMPLE OF ARTEMIS",
    category: "ANCIENT WORLD",
    title: "TEMPLE OF ARTEMIS",
    description:
      "A monumental sanctuary dedicated to Artemis, the ancient Greek goddess of the hunt, celebrated for its extraordinary scale and architectural beauty.",
    location: "EPHESUS, TURKEY",
    built: "c. 550 BCE",
    image:
      "https://images.unsplash.com/photo-1603565816030-6b389eeb23cb",
    theme: "marble",
  },

  {
    number: "04",
    shortTitle: "STATUE OF ZEUS",
    category: "ANCIENT WORLD",
    title: "STATUE OF ZEUS AT OLYMPIA",
    description:
      "A colossal representation of Zeus created by the sculptor Phidias, once regarded as one of the greatest artistic achievements of the ancient Greek world.",
    location: "OLYMPIA, GREECE",
    built: "c. 435 BCE",
    image:
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5",
    theme: "gold",
  },

  {
    number: "05",
    shortTitle: "MAUSOLEUM",
    category: "ANCIENT WORLD",
    title: "MAUSOLEUM AT HALICARNASSUS",
    description:
      "An extraordinary monumental tomb whose architecture became so influential that the word mausoleum entered the vocabulary of the world.",
    location: "BODRUM, TURKEY",
    built: "c. 350 BCE",
    image:
      "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e",
    theme: "stone",
  },

  {
    number: "06",
    shortTitle: "COLOSSUS",
    category: "ANCIENT WORLD",
    title: "COLOSSUS OF RHODES",
    description:
      "A gigantic bronze statue that once stood at the entrance of Rhodes, symbolizing the strength and prosperity of the ancient island city.",
    location: "RHODES, GREECE",
    built: "c. 280 BCE",
    image:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077",
    theme: "ocean",
  },

  {
    number: "07",
    shortTitle: "LIGHTHOUSE",
    category: "ANCIENT WORLD",
    title: "LIGHTHOUSE OF ALEXANDRIA",
    description:
      "One of the most famous structures of the ancient Mediterranean, the Lighthouse of Alexandria guided ships toward the harbor for centuries.",
    location: "ALEXANDRIA, EGYPT",
    built: "c. 280 BCE",
    image:
      "https://images.unsplash.com/photo-1568322445389-f64ac2515020",
    theme: "sunset",
  },
];

let observer;


/* =====================================================
   SCROLL TO WONDERS
===================================================== */

const scrollToWonders = () => {
  const section = document.querySelector("#wonders");

  if (!section) return;

  section.scrollIntoView({
    behavior: "smooth",
  });
};


/* =====================================================
   HERO PARALLAX
===================================================== */

const handleHeroParallax = () => {
  const scroll = window.scrollY;

  if (scroll > window.innerHeight) return;

  heroOffset.value = scroll * 0.18;
};


/* =====================================================
   MOUNT
===================================================== */

onMounted(() => {
  const sections =
    document.querySelectorAll(".wonder-section");

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const number =
            entry.target.id.replace(
              "wonder-",
              ""
            );

          activeWonder.value = number;
        }
      });
    },
    {
      threshold: 0.55,
    }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });

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
         WONDERS
    ========================== -->

    <div id="wonders">

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