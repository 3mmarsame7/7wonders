[file name]: StatueOfZeus.vue
<script setup>
import WonderDetail from "./WonderDetail.vue";
import Navbar from "./Navbar.vue";
import Footer from "./Footer.vue";

const wonder = {
    number: "04",
    category: "ANCIENT WORLD",
    title: "STATUE OF ZEUS AT OLYMPIA",
    description:
        "A monumental seated statue of Zeus that stood approximately 12.4 meters tall.",
    location: "OLYMPIA, GREECE",
    built: "c. 466 BCE",
    image:
        "https://upload.wikimedia.org/wikipedia/commons/6/66/Le_Jupiter_Olympien_ou_l%27art_de_la_sculpture_antique.jpg",
    theme: "gold",
    imagePosition: "center 25%",
};
</script>

<template>
    <Navbar />
    <WonderDetail v-bind="wonder" />
    <Footer />
</template>