```vue
<template>
  <div class="loading-screen">

    <!-- Background Image -->
    <div class="background"></div>

    <!-- Dark Overlay -->
    <div class="overlay"></div>

    <!-- Content -->
    <div class="loading-content">

      <div class="eyebrow">
        SEVEN WONDERS
      </div>

      <h1>
        ENTER THE
        <span>ANCIENT WORLD</span>
      </h1>

      <!-- Gate -->
      <div class="gate-container">

        <div class="gate-glow"></div>

        <div class="gate">

          <div class="gate-left"></div>
          <div class="gate-right"></div>

        </div>

      </div>

      <p class="loading-text">
        DISCOVERING THE WONDERS
      </p>

      <!-- Progress -->
      <div class="progress-container">

        <div class="progress-bar">
          <div class="progress"></div>
        </div>

        <span>LOADING</span>

      </div>

    </div>

  </div>
</template>


<style scoped>

@import url(
  'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Poppins:wght@300;400;500&display=swap'
);


/* =========================
   MAIN
========================= */

.loading-screen {

  position: fixed;

  inset: 0;

  z-index: 9999;

  overflow: hidden;

  background: #050b12;

  color: white;

  font-family: 'Poppins', sans-serif;

}


/* =========================
   BACKGROUND
========================= */

.background {

  position: absolute;

  inset: 0;

  background-image:
    url('/image/loading-bg.jfif');

  background-size: cover;

  background-position: center;

  animation: backgroundZoom 6s ease-out forwards;

}


/* =========================
   DARK OVERLAY
========================= */

.overlay {

  position: absolute;

  inset: 0;

  background:
    linear-gradient(
      rgba(5, 11, 18, .72),
      rgba(5, 11, 18, .82)
    );

}


/* =========================
   CONTENT
========================= */

.loading-content {

  position: relative;

  z-index: 2;

  width: 100%;

  height: 100%;

  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

  text-align: center;

}


/* =========================
   TITLE
========================= */

.eyebrow {

  margin-bottom: 15px;

  color: #d99b28;

  font-size: 11px;

  font-weight: 600;

  letter-spacing: 5px;

  animation: fadeUp 1s ease forwards;

}


h1 {

  margin: 0;

  font-family: 'Cinzel', serif;

  font-size: clamp(32px, 5vw, 58px);

  line-height: 1.2;

  letter-spacing: 2px;

}


h1 span {

  display: block;

  color: #d99b28;

}


/* =========================
   GATE
========================= */

.gate-container {

  position: relative;

  width: min(360px, 75vw);

  height: 230px;

  margin: 35px 0 25px;

}


/* Golden glow */

.gate-glow {

  position: absolute;

  left: 50%;

  top: 50%;

  width: 170px;

  height: 170px;

  transform: translate(-50%, -50%);

  border-radius: 50%;

  background: #d99b28;

  filter: blur(65px);

  opacity: .22;

  animation: glowPulse 2s ease-in-out infinite;

}


/* =========================
   GATE
========================= */

.gate {

  position: absolute;

  inset: 0;

  display: flex;

  justify-content: center;

  overflow: hidden;

}


/* Gate doors */

.gate-left,
.gate-right {

  width: 50%;

  height: 100%;

  position: relative;

  background:

    linear-gradient(
      90deg,
      #151b20,
      #303840,
      #151b20
    );

  border: 2px solid rgba(217, 155, 40, .55);

  box-shadow:
    inset 0 0 25px rgba(0,0,0,.8),
    0 0 20px rgba(217,155,40,.08);

}


/* Left door */

.gate-left {

  transform-origin: left center;

  border-right: 1px solid #d99b28;

  animation: openLeft 3s ease-in-out 2s forwards;

}


/* Right door */

.gate-right {

  transform-origin: right center;

  border-left: 1px solid #d99b28;

  animation: openRight 3s ease-in-out 2s forwards;

}


/* Decorative lines */

.gate-left::before,
.gate-right::before {

  content: "";

  position: absolute;

  inset: 18px;

  border: 1px solid rgba(217,155,40,.25);

}


/* =========================
   LOADING TEXT
========================= */

.loading-text {

  margin: 0 0 18px;

  color: rgba(255,255,255,.65);

  font-size: 10px;

  letter-spacing: 4px;

  animation: pulseText 1.5s infinite;

}


/* =========================
   PROGRESS
========================= */

.progress-container {

  width: 230px;

}


.progress-bar {

  width: 100%;

  height: 2px;

  overflow: hidden;

  background: rgba(255,255,255,.15);

}


.progress {

  width: 0;

  height: 100%;

  background: #d99b28;

  box-shadow:
    0 0 12px #d99b28;

  animation:
    loadingProgress 3s ease-in-out forwards;

}


.progress-container span {

  display: block;

  margin-top: 8px;

  color: rgba(255,255,255,.4);

  font-size: 9px;

  letter-spacing: 3px;

}


/* =========================
   ANIMATIONS
========================= */

@keyframes backgroundZoom {

  from {

    transform: scale(1.08);

  }

  to {

    transform: scale(1);

  }

}


@keyframes glowPulse {

  0%,
  100% {

    opacity: .15;

    transform:
      translate(-50%, -50%)
      scale(.9);

  }

  50% {

    opacity: .3;

    transform:
      translate(-50%, -50%)
      scale(1.1);

  }

}


@keyframes loadingProgress {

  0% {

    width: 0;

  }

  100% {

    width: 100%;

  }

}


@keyframes openLeft {

  0% {

    transform: rotateY(0deg);

  }

  100% {

    transform: rotateY(-105deg);

  }

}


@keyframes openRight {

  0% {

    transform: rotateY(0deg);

  }

  100% {

    transform: rotateY(105deg);

  }

}


@keyframes fadeUp {

  from {

    opacity: 0;

    transform: translateY(20px);

  }

  to {

    opacity: 1;

    transform: translateY(0);

  }

}


@keyframes pulseText {

  0%,
  100% {

    opacity: .4;

  }

  50% {

    opacity: 1;

  }

}


/* =========================
   MOBILE
========================= */

@media (max-width: 600px) {

  .gate-container {

    width: 280px;

    height: 190px;

  }

  h1 {

    font-size: 32px;

  }

  .eyebrow {

    font-size: 9px;

  }

}

</style>
```
