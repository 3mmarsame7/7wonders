<script setup>
import { computed } from "vue"
import { useRoute, useRouter } from "vue-router"
import { wonders } from "../Data/wonders"

const route = useRoute()
const router = useRouter()
const wonder = computed(() => {
  return wonders.find((item) => item.slug === route.params.slug)
})
</script>
<template>
  <main
    v-if="wonder"
    class="details-page"
    :class="wonder.theme"
  >
    <nav class="navbar">
      <div class="logo">
        <div class="logo-circle">W</div>

        <div>
          <strong>WONDERS</strong>
          <small>OF THE WORLD</small>
        </div>
      </div>

      <div class="nav-links">
        <button @click="router.push('/')">HOME</button>
        <button @click="router.push('/wonders')">WONDERS</button>
        <button>ABOUT</button>
      </div>

    </nav>

    <section class="wonder-content">
      <div class="image-side">
        <img
          :src="wonder.image"
          :alt="wonder.name"
        />
        <div class="wonder-number">
          WONDER {{ wonder.number }}
        </div>

      </div>

      <div class="info-side">

        <div class="top-number">
          {{ wonder.number }}
          <span>—</span>
          07
        </div>

        <p class="category">
          {{ wonder.category }}
        </p>

        <h1>
          {{ wonder.name }}
        </h1>

        <p class="description">
          {{ wonder.description }}
        </p>

        <div class="line"></div>
        <div class="facts">

          <div>
            <span>LOCATION</span>
            <strong>{{ wonder.location }}</strong>
          </div>

          <div>
            <span>BUILT</span>
            <strong>{{ wonder.built }}</strong>
          </div>

        </div>
        <button class="discover">
          DISCOVER MORE
          <span>↗</span>
        </button>

      </div>
    </section>

  </main>
  <div v-else class="not-found">
    Wonder not found.
  </div>
</template>

<style scoped>

* {
  box-sizing: border-box;
}

.details-page {
  min-height: 100vh;
  background: #e9e1cf;
  color: #211d1a;
}

.navbar {
  height: 68px;
  background: #15191b;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5%;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-circle {
  width: 28px;
  height: 28px;
  border: 1px solid #d5ad61;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #d5ad61;
  font-size: 12px;
}

.logo strong {
  display: block;
  font-size: 11px;
  letter-spacing: 2px;
}

.logo small {
  display: block;
  font-size: 6px;
  letter-spacing: 2px;
}
.nav-links {
  display: flex;
  gap: 30px;
}
.nav-links button {
  background: none;
  border: none;
  color: white;
  font-size: 10px;
  letter-spacing: 1.5px;
  cursor: pointer;
}
.wonder-content {
  min-height: calc(100vh - 68px);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 7%;
  align-items: center;
  padding: 7vh 7%;
}
.image-side {
  position: relative;
}
.image-side img {
  width: 100%;
  height: 560px;
  object-fit: cover;
  display: block;
}
.wonder-number {
  position: absolute;
  bottom: 15px;
  left: 18px;
  color: white;
  font-size: 8px;
  letter-spacing: 2px;
  text-shadow: 0 1px 5px black;
}
.info-side {
  max-width: 620px;
}
.top-number {
  font-size: 9px;
  letter-spacing: 3px;
  margin-bottom: 25px;
}

.top-number span {
  margin: 0 8px;
}

.category {
  font-size: 9px;
  letter-spacing: 3px;

  margin-bottom: 12px;
}

h1 {
  font-size: clamp(45px, 5vw, 76px);
  line-height: 0.9;
  margin: 0 0 30px;
  font-weight: 900;
}

.description {
  max-width: 500px;
  font-size: 13px;
  line-height: 1.8;
  color: #625d56;
}
.line {
  height: 1px;
  background: rgba(0, 0, 0, 0.15);
  margin: 30px 0;
}

.facts {
  display: flex;
  gap: 100px;
}

.facts div {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.facts span {
  font-size: 7px;
  letter-spacing: 2px;
}

.facts strong {
  font-size: 9px;
  letter-spacing: 1px;
}
.discover {
  margin-top: 35px;
  padding: 12px 18px;
  border: 1px solid #222;
  border-radius: 30px;
  background: transparent;
  font-size: 8px;
  letter-spacing: 2px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 20px;
}

.discover span {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #222;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.colossus {
  background: #0b3039;
  color: white;
}

.colossus .description {
  color: #c5d0d1;
}

.colossus .line {
  background: rgba(255,255,255,.2);
}

.zeus {
  background: #22201f;
  color: white;
}

.zeus .description {
  color: #c9c4bf;
}

.lighthouse {
  background: #44261d;
  color: white;
}

.lighthouse .description {
  color: #d4c4bc;
}

.babylon {
  background: #e9eddf;
}

.artemis {
  background: #eee6d4;
}

.mausoleum {
  background: #d9d2c5;
}

.pyramid {
  background: #eee4cf;
}

@media (max-width: 900px) {
  .wonder-content {
    grid-template-columns: 1fr;

    padding: 40px 6%;
  }

  .image-side img {
    height: 450px;
  }

  h1 {
    font-size: 50px;
  }

}

@media (max-width: 600px) {
  .nav-links {
    gap: 12px;
  }

  .nav-links button {
    font-size: 8px;
  }

  .wonder-content {
    padding: 30px 5%;
  }

  .image-side img {
    height: 350px;
  }

  h1 {
    font-size: 42px;
  }

  .facts {
    gap: 40px;
  }

}
</style>

