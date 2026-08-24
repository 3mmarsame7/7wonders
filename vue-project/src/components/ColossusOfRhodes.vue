[file name]: ColossusOfRhodes.vue
<script setup>
import WonderDetail from "./WonderDetail.vue";
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
    imagePosition: "center 15%",
    // imageScale: 0.75,
};
</script>
<template>
    <Navbar />
    <WonderDetail v-bind="wonder" />
    <Footer />
</template>

<style scoped>
:deep(.wonder-detail-page .detail-image img) {
    width: 50% !important;
    height: 50% !important;
    object-fit: contain !important;
}
</style>