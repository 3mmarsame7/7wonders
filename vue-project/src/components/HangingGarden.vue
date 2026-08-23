
<script setup>
import WonderDetail from "./WonderDetail.vue";
import Navbar from "./Navbar.vue";
import Footer from "./Footer.vue";
const wonder = { 
    number: "02",
    category: "ANCIENT WORLD",
    title: "HANGING GARDENS OF BABYLON",
    description:
        "The Hanging Gardens were described as a remarkable feat of engineering with ascending tiers of gardens.",
    location: "MAHAWII, IRAQ",
    built: "c. 600 BCE",
    image:
        "https://cdn.britannica.com/39/1139-050-71C43AEE/re-creation-artist-Hanging-Gardens-of-Babylon-world.jpg",
    theme: "garden",
};
</script>

<template>
    <Navbar />
    <WonderDetail v-bind="wonder" />
    <Footer />
</template>