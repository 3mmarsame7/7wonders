[file name]: Mausoleum.vue
<script setup>
import WonderSection from "./WonderSection.vue";
import Navbar from "./Navbar.vue";
import Footer from "./Footer.vue";

const wonder = {
    number: "05",
    category: "ANCIENT WORLD",
    title: "MAUSOLEUM AT HALICARNASSUS",
    description:
        "A magnificent tomb built at Halicarnassus for Mausolus, ruler of Caria.",
    location: "BODRUM, TURKEY",
    built: "c. 351 BCE",
    image:
        "https://cdn.britannica.com/60/168960-050-766C48B3/Artist-re-creation-Mausoleum-of-Halicarnassus.jpg",
    theme: "stone",
};
</script>

<template>
    <Navbar />
    <WonderSection v-bind="wonder" />
    <Footer />
</template>