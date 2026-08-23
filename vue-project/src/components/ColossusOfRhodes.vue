[file name]: ColossusOfRhodes.vue
<script setup>
import WonderSection from "./WonderSection.vue";
import Navbar from "./Navbar.vue";
import Footer from "./Footer.vue";

const wonder = {
    number: "06",
    category: "ANCIENT WORLD",
    title: "COLOSSUS OF RHODES",
    description:
        "A gigantic statue of the Greek sun god Helios, estimated to have been about 33 meters tall.",
    location: "RHODES, GREECE",
    built: "c. 353 BCE",
    image:
        "https://cdn.britannica.com/81/39481-050-48B24E02/conception-Artist-Chares-of-Lindos-Colossus-Rhodes-1875.jpg",
    theme: "ocean",
};
</script>
<template>
    <Navbar />
    <WonderSection v-bind="wonder" />
    <Footer />
</template>