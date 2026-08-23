
<script setup>
import WonderDetail from "./WonderDetail.vue";
import Navbar from "./Navbar.vue";
import Footer from "./Footer.vue";

const wonder = {
    number: "03",
    category: "ANCIENT WORLD",
    title: "TEMPLE OF ARTEMIS",
    description:
        "One of the Seven Wonders of the Ancient World, this Greek temple was dedicated to Artemis.",
    location: "SELCUK, TURKEY",
    built: "c. 550 BCE",
    image:
        "https://cdn.britannica.com/51/168951-050-FF56AB5F/Temple-of-Artemis-Ephesus.jpg",
    theme: "marble",
};
</script>

<template>
    <Navbar />
    <WonderDetail v-bind="wonder" />
    <Footer />
</template>