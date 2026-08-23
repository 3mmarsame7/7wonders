[file name]: LighthouseOfAlexandria.vue
<script setup>
import WonderDetail from "./WonderDetail.vue";
import Navbar from "./Navbar.vue";
import Footer from "./Footer.vue";

const wonder = {
    number: "07",
    category: "ANCIENT WORLD",
    title: "LIGHTHOUSE OF ALEXANDRIA",
    description:
        "One of the Seven Wonders of the Ancient World and for centuries one of the tallest man-made structures.",
    location: "ALEXANDRIA, EGYPT",
    built: "c. 280 BCE",
    image:
        "https://cdn.britannica.com/07/172307-050-4D3BA855/Pharos-Alexandria.jpg",
    theme: "sunset",
};
</script>

<template>
    <Navbar />
    <WonderDetail v-bind="wonder" />
    <Footer />
</template>