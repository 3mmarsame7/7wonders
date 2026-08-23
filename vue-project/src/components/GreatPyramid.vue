
<script setup>
import WonderDetail from "./WonderDetail.vue";
import Navbar from "./Navbar.vue";
import Footer from "./Footer.vue";
const wonder = {
    number: "01",
    category: "ANCIENT WORLD",
    title: "GREAT PYRAMID OF GIZA",
    description:
        "The largest Egyptian pyramid and the oldest of the Seven Wonders of the Ancient World.",
    location: "GIZA, EGYPT",
    built: "c. 2560 BCE",
    image:
        "https://upload.wikimedia.org/wikipedia/commons/e/e3/Kheops-Pyramid.jpg",
    theme: "sand",
};
</script>
<template>
  <Navbar />
  <WonderDetail v-bind="wonder" />
  <Footer />
</template>