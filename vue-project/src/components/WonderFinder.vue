```vue
<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  wonders: {
    type: Array,
    default: () => [],
  },
});

const environment = ref("");
const interest = ref("");
const atmosphere = ref("");

const result = ref(null);

const questions = [
  {
    key: "environment",
    title: "What kind of place attracts you?",
    options: [
      {
        value: "desert",
        label: "Desert",
        icon: "🏜️",
      },
      {
        value: "coastal",
        label: "Coastal",
        icon: "🌊",
      },
      {
        value: "garden",
        label: "Garden",
        icon: "🌿",
      },
      {
        value: "monumental",
        label: "Monumental",
        icon: "🏛️",
      },
    ],
  },

  {
    key: "interest",
    title: "What do you admire most?",
    options: [
      {
        value: "engineering",
        label: "Engineering",
        icon: "⚙️",
      },
      {
        value: "architecture",
        label: "Art & Architecture",
        icon: "🎨",
      },
      {
        value: "power",
        label: "Power & Grandeur",
        icon: "👑",
      },
      {
        value: "history",
        label: "History & Mystery",
        icon: "📜",
      },
    ],
  },

  {
    key: "atmosphere",
    title: "Choose your atmosphere",
    options: [
      {
        value: "grand",
        label: "Bright & Majestic",
        icon: "☀️",
      },
      {
        value: "mysterious",
        label: "Mysterious",
        icon: "🌙",
      },
      {
        value: "calm",
        label: "Calm",
        icon: "🌊",
      },
      {
        value: "peaceful",
        label: "Peaceful",
        icon: "✨",
      },
    ],
  },
];


/* =========================
   WONDER PROFILES
========================= */

const wonderProfiles = {
  "Great Pyramid of Giza": {
    environment: ["desert", "monumental"],
    interest: ["engineering", "architecture"],
    atmosphere: ["grand"],
  },

  "Hanging Gardens of Babylon": {
    environment: ["garden"],
    interest: ["architecture", "history"],
    atmosphere: ["peaceful", "mysterious"],
  },

  "Temple of Artemis": {
    environment: ["monumental"],
    interest: ["architecture", "history"],
    atmosphere: ["grand"],
  },

  "Statue of Zeus at Olympia": {
    environment: ["monumental"],
    interest: ["power", "architecture"],
    atmosphere: ["grand"],
  },

  "Mausoleum at Halicarnassus": {
    environment: ["monumental"],
    interest: ["architecture", "history"],
    atmosphere: ["mysterious"],
  },

  "Colossus of Rhodes": {
    environment: ["coastal"],
    interest: ["engineering", "power"],
    atmosphere: ["grand", "calm"],
  },

  "Lighthouse of Alexandria": {
    environment: ["coastal"],
    interest: ["engineering", "history"],
    atmosphere: ["calm", "grand"],
  },
};


/* =========================
   SELECTED ANSWERS
========================= */

const selectedAnswers = computed(() => ({
  environment: environment.value,
  interest: interest.value,
  atmosphere: atmosphere.value,
}));


/* =========================
   CHECK IF READY
========================= */

const canFindWonder = computed(() => {
  return (
    environment.value &&
    interest.value &&
    atmosphere.value
  );
});


/* =========================
   SELECT OPTION
========================= */

const selectOption = (key, value) => {
  if (key === "environment") {
    environment.value = value;
  }

  if (key === "interest") {
    interest.value = value;
  }

  if (key === "atmosphere") {
    atmosphere.value = value;
  }
};


/* =========================
   GET WONDER PROFILE
========================= */

const getWonderProfile = (wonder) => {
  const wonderName = wonder.title
    ?.toLowerCase()
    .replace(/^the\s+/i, "")
    .trim();

  const profile = Object.entries(wonderProfiles).find(
    ([key]) => {
      const profileName = key
        .toLowerCase()
        .replace(/^the\s+/i, "")
        .trim();

      return (
        profileName.includes(wonderName) ||
        wonderName.includes(profileName)
      );
    }
  );

  return profile ? profile[1] : null;
};


/* =========================
   FIND BEST WONDER
========================= */

const findWonder = () => {
  if (!canFindWonder.value) return;

  let bestWonder = null;
  let highestScore = -1;

  props.wonders.forEach((wonder) => {
    const profile = getWonderProfile(wonder);

    if (!profile) return;

    let score = 0;

    /* Environment = 3 points */

    if (
      profile.environment.includes(
        selectedAnswers.value.environment
      )
    ) {
      score += 3;
    }

    /* Interest = 3 points */

    if (
      profile.interest.includes(
        selectedAnswers.value.interest
      )
    ) {
      score += 3;
    }

    /* Atmosphere = 2 points */

    if (
      profile.atmosphere.includes(
        selectedAnswers.value.atmosphere
      )
    ) {
      score += 2;
    }

    if (score > highestScore) {
      highestScore = score;
      bestWonder = wonder;
    }
  });

  result.value = bestWonder;
};


/* =========================
   RESET
========================= */

const resetFinder = () => {
  environment.value = "";
  interest.value = "";
  atmosphere.value = "";

  result.value = null;
};
</script>


<template>

  <section class="wonder-finder">

    <!-- ================= HEADER ================= -->

    <div class="finder-header">

      <span class="eyebrow">
        DISCOVER YOUR WONDER
      </span>

      <h2>
        Find Your
        <span>Ancient Wonder</span>
      </h2>

      <p>
        Answer a few questions and discover which
        wonder matches your personality.
      </p>

      <div class="title-line"></div>

    </div>


    <!-- ================= QUESTIONS ================= -->

    <div
      v-if="!result"
      class="finder-content"
    >

      <div
        v-for="question in questions"
        :key="question.key"
        class="question"
      >

        <h3>
          {{ question.title }}
        </h3>


        <div class="options">

          <button
            v-for="option in question.options"
            :key="option.value"

            type="button"

            class="option"

            :class="{
              selected:
                selectedAnswers[question.key] === option.value
            }"

            @click="
              selectOption(
                question.key,
                option.value
              )
            "
          >

            <span class="option-icon">
              {{ option.icon }}
            </span>

            <span>
              {{ option.label }}
            </span>

          </button>

        </div>

      </div>


      <!-- ================= FIND BUTTON ================= -->

      <button
        type="button"
        class="find-button"

        :disabled="!canFindWonder"

        @click="findWonder"
      >

        FIND MY WONDER

        <span>→</span>

      </button>

    </div>


    <!-- ================= RESULT ================= -->

    <div
      v-else
      class="result"
    >

      <span class="result-label">
        ✦ YOUR MATCH ✦
      </span>


      <div class="result-image">

        <img
          :src="result.image"
          :alt="result.title"
        />

      </div>


      <h2>
        {{ result.title }}
      </h2>


      <p>
        Based on your choices, this ancient wonder
        is the best match for you.
      </p>


      <!--
        The routing will be connected later
        by the team member responsible for routing.
      -->

      <button
        type="button"
        class="explore-button"
      >

        EXPLORE THIS WONDER

        <span>→</span>

      </button>


      <button
        type="button"
        class="try-again"

        @click="resetFinder"
      >

        TRY AGAIN

      </button>

    </div>

  </section>

</template>


<style scoped>

@import url(
  'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Poppins:wght@300;400;500;600&display=swap'
);


/* =========================
   MAIN
========================= */

.wonder-finder {

  width: 100%;

  padding: 110px 7%;

  background:

    radial-gradient(
      circle at 15% 20%,
      rgba(217,155,40,.08),
      transparent 30%
    ),

    radial-gradient(
      circle at 85% 80%,
      rgba(217,155,40,.05),
      transparent 30%
    ),

    #050b12;

  color: #f4f1e8;

  font-family: 'Poppins', sans-serif;

}


/* =========================
   HEADER
========================= */

.finder-header {

  max-width: 750px;

  margin: 0 auto 65px;

  text-align: center;

}


.eyebrow {

  color: #d99b28;

  font-size: 12px;

  font-weight: 600;

  letter-spacing: 4px;

}


.finder-header h2 {

  margin: 15px 0;

  font-family: 'Cinzel', serif;

  font-size: clamp(38px, 5vw, 58px);

}


.finder-header h2 span {

  color: #d99b28;

}


.finder-header p {

  max-width: 600px;

  margin: auto;

  color: #929ba5;

  line-height: 1.8;

}


.title-line {

  width: 90px;

  height: 2px;

  margin: 25px auto;

  background: #d99b28;

}


/* =========================
   CONTENT
========================= */

.finder-content {

  max-width: 1050px;

  margin: auto;

}


.question {

  margin-bottom: 50px;

}


.question h3 {

  margin-bottom: 20px;

  color: #e5e7eb;

  font-family: 'Cinzel', serif;

  font-size: 21px;

}


/* =========================
   OPTIONS
========================= */

.options {

  display: grid;

  grid-template-columns:
    repeat(4, 1fr);

  gap: 15px;

}


.option {

  min-height: 105px;

  padding: 20px 15px;

  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

  gap: 10px;

  border:
    1px solid
    rgba(217,155,40,.25);

  border-radius: 10px;

  background:
    rgba(255,255,255,.025);

  color: #b8bec6;

  cursor: pointer;

  font-family: 'Poppins', sans-serif;

  transition: .3s;

}


.option:hover {

  border-color: #d99b28;

  background:
    rgba(217,155,40,.07);

  transform: translateY(-4px);

}


.option.selected {

  border-color: #d99b28;

  background:
    rgba(217,155,40,.12);

  color: #f4c95d;

  box-shadow:
    0 0 25px
    rgba(217,155,40,.08);

}


.option-icon {

  font-size: 28px;

}


/* =========================
   FIND BUTTON
========================= */

.find-button {

  display: flex;

  align-items: center;

  justify-content: center;

  gap: 15px;

  margin: 55px auto 0;

  padding: 15px 35px;

  border: none;

  border-radius: 5px;

  background: #d99b28;

  color: #050b12;

  font-weight: 600;

  letter-spacing: 1px;

  cursor: pointer;

  transition: .3s;

}


.find-button:hover:not(:disabled) {

  background: #f0b83f;

  transform: translateY(-3px);

  box-shadow:
    0 10px 30px
    rgba(217,155,40,.2);

}


.find-button:disabled {

  opacity: .35;

  cursor: not-allowed;

}


.find-button span {

  font-size: 20px;

}


/* =========================
   RESULT
========================= */

.result {

  max-width: 700px;

  margin: auto;

  padding: 55px 35px;

  text-align: center;

  border:
    1px solid
    rgba(217,155,40,.45);

  border-radius: 12px;

  background:
    linear-gradient(
      145deg,
      rgba(255,255,255,.035),
      rgba(255,255,255,.01)
    );

}


.result-label {

  color: #d99b28;

  font-size: 12px;

  letter-spacing: 4px;

}


.result-image {

  width: 100%;

  height: 300px;

  margin: 30px 0;

  overflow: hidden;

  border-radius: 8px;

}


.result-image img {

  width: 100%;

  height: 100%;

  object-fit: cover;

}


.result h2 {

  margin: 20px 0 10px;

  color: #d99b28;

  font-family: 'Cinzel', serif;

  font-size: clamp(28px, 5vw, 42px);

}


.result p {

  color: #929ba5;

  line-height: 1.8;

}


.explore-button {

  margin-top: 25px;

  padding: 13px 28px;

  border:
    1px solid
    #d99b28;

  border-radius: 5px;

  background: transparent;

  color: #d99b28;

  cursor: pointer;

  font-weight: 600;

  letter-spacing: 1px;

  transition: .3s;

}


.explore-button:hover {

  background: #d99b28;

  color: #050b12;

}


.try-again {

  display: block;

  margin: 20px auto 0;

  border: none;

  background: transparent;

  color: #737d88;

  cursor: pointer;

  font-size: 12px;

}


.try-again:hover {

  color: #d99b28;

}


/* =========================
   RESPONSIVE
========================= */

@media (max-width: 900px) {

  .options {

    grid-template-columns:
      repeat(2, 1fr);

  }

}


@media (max-width: 600px) {

  .wonder-finder {

    padding: 80px 6%;

  }

  .options {

    grid-template-columns: 1fr;

  }

  .result {

    padding: 40px 20px;

  }

  .result-image {

    height: 230px;

  }

}

</style>
```
