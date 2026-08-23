<script setup>
import {
  onMounted,
  onUnmounted,
  ref,
} from "vue";


const heroOffset = ref(0);

/* =====================================================
   HERO PARALLAX
===================================================== */

const handleHeroParallax = () => {
  const scroll = window.scrollY;

  if (scroll > window.innerHeight) {
    return;
  }

  heroOffset.value = scroll * 0.18;
};

/* =====================================================
   MOUNT
===================================================== */

onMounted(() => {
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
  window.removeEventListener(
    "scroll",
    handleHeroParallax
  );
});
</script>


<template>
  <main id="top" class="home">



    <!-- =========================
          HERO / LANDING PAGE
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
          @click="$router.push('/wonders')"
        >
          <span>
            EXPLORE THE WONDERS
          </span>

          <span class="explore-arrow">
            ↓
          </span>
        </button>

      </div>


      <!-- SCROLL INDICATOR -->

      <div class="scroll-indicator">

        <span></span>

        SCROLL TO EXPLORE

      </div>

    </section>

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
  background: #101820;
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