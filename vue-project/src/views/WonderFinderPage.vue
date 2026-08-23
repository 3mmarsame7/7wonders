<script setup>
import Navbar from "../components/Navbar.vue";
import WonderFinder from "../components/WonderFinder.vue";
import Footer from "../components/Footer.vue";

defineProps({
  wonders: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <main class="wonder-finder-page">

    <Navbar />

    <WonderFinder :wonders="wonders" />

    <Footer />

  </main>
</template>

<style scoped>
.wonder-finder-page {
  min-height: 100vh;
  background: #050b12;
}
</style>