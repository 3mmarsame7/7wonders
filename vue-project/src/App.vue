
[file name]: App.vue
<script setup>
import {
  onMounted,
  onUnmounted,
  ref,
  nextTick,
  computed,
} from "vue";

import Navbar from "./components/Navbar.vue";
import WonderSection from "./components/WonderSection.vue";
import SearchFilter from "./components/SearchFilter.vue";
import LandingPage from "./components/landingpage.vue";
import About from "./components/About.vue";
import Footer from "./components/Footer.vue";

/* =====================================================
   STATE
===================================================== */
const activeWonder = ref("01");
const wonders = ref([]);
const loading = ref(true);
const error = ref(null);
const searchQuery = ref("");
const selectedLocation = ref("");

const filteredWonders = computed(() => {
  return wonders.value.filter((wonder) => {
    const search = searchQuery.value.toLowerCase().trim();
    const matchesSearch =
      !search ||
      wonder.title.toLowerCase().includes(search) ||
      wonder.location.toLowerCase().includes(search);

    const matchesLocation =
      !selectedLocation.value ||
      wonder.location === selectedLocation.value;

    return matchesSearch && matchesLocation;
  });
});

const locations = computed(() => {
  return [...new Set(wonders.value.map((wonder) => wonder.location))];
});

const handleFilterChange = (filters) => {
  searchQuery.value = filters.search;
  selectedLocation.value = filters.location;
};

let observer;

/* =====================================================
   API
===================================================== */
const API_URL = "https://www.world-wonders-api.org/v0/wonders";

/* =====================================================
   WONDER THEMES
===================================================== */
const getWonderTheme = (name) => {
  const title = name?.toLowerCase() || "";
  if (title.includes("great pyramid") || title.includes("pyramid of giza")) return "sand";
  if (title.includes("hanging gardens") || title.includes("babylon")) return "garden";
  if (title.includes("temple of artemis") || title.includes("artemis")) return "marble";
  if (title.includes("statue of zeus") || title.includes("zeus")) return "gold";
  if (title.includes("mausoleum") || title.includes("halicarnassus")) return "stone";
  if (title.includes("colossus") || title.includes("rhodes")) return "ocean";
  if (title.includes("lighthouse") || title.includes("alexandria")) return "sunset";
  return "sand";
};

/* =====================================================
   FETCH WONDERS
===================================================== */
const fetchWonders = async () => {
  try {
    loading.value = true;
    error.value = null;

    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`API returned ${response.status}`);

    const data = await response.json();

    const ancientWonderNames = [
      "Great Pyramid of Giza",
      "Hanging Gardens of Babylon",
      "Temple of Artemis",
      "Statue of Zeus at Olympia",
      "Mausoleum at Halicarnassus",
      "Colossus of Rhodes",
      "Lighthouse of Alexandria",
    ];

    const ancientWonders = ancientWonderNames
      .map((wantedName) => {
        return data.find((wonder) => {
          const apiName = wonder.name?.toLowerCase() || "";
          const targetName = wantedName.toLowerCase();
          return apiName.includes(targetName) || targetName.includes(apiName);
        });
      })
      .filter(Boolean);

    wonders.value = ancientWonders.map((wonder, index) => {
      const wonderName = wonder.name || ancientWonderNames[index];
      return {
        number: String(index + 1).padStart(2, "0"),
        shortTitle: wonderName.replace(/^The\s+/i, "").toUpperCase(),
        category: "ANCIENT WORLD",
        title: wonderName.toUpperCase(),
        description: wonder.summary || wonder.description || "No description available.",
        location: typeof wonder.location === "string" ? wonder.location.toUpperCase() : wonder.location?.name ? wonder.location.name.toUpperCase() : "UNKNOWN LOCATION",
        built: typeof wonder.build_year === "number" ? (wonder.build_year < 0 ? `c. ${Math.abs(wonder.build_year)} BCE` : `c. ${wonder.build_year}`) : wonder.build_year || "UNKNOWN",
        image: wonder.links?.images?.[0] || wonder.image || "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368",
        theme: getWonderTheme(wonderName),
      };
    });
  } catch (err) {
    console.error("Wonders API Error:", err);
    error.value = "Failed to load the ancient wonders.";
  } finally {
    loading.value = false;
  }
};

/* =====================================================
   MOUNT
===================================================== */
onMounted(async () => {
  await fetchWonders();
  await nextTick();

  const sections = document.querySelectorAll(".wonder-section");
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const number = entry.target.id.replace("wonder-", "");
          activeWonder.value = number;
        }
      });
    },
    { threshold: 0.55 }
  );

  sections.forEach((section) => observer.observe(section));
});

onUnmounted(() => observer?.disconnect());
</script>

<template>
  <!-- ====================== LANDING PAGE ====================== -->
  <LandingPage v-if="$route.path === '/'" />

  <!-- ====================== WONDERS PAGE (اللستة الطويلة) ====================== -->
  <main v-else-if="$route.path === '/wonders'" class="wonders-page">
    <Navbar />
    <SearchFilter :locations="locations" @filter-change="handleFilterChange" />

    <section v-if="loading" class="status-section">
      <div class="loader"></div>
      <p>LOADING WONDERS...</p>
    </section>

    <section v-else-if="error" class="status-section error-section">
      <p>{{ error }}</p>
      <button class="retry-button" @click="fetchWonders">TRY AGAIN</button>
    </section>

    <!-- عرض كل العجائب تحت بعض -->
    <div v-else id="wonders">
      <WonderSection
        v-for="wonder in filteredWonders"
        :key="wonder.number"
        v-bind="wonder"
      />
      
      <div v-if="filteredWonders.length === 0" class="no-results">
        <h2>No Wonders Found</h2>
        <p>We couldn't find any wonder matching your search or location.</p>
      </div>
      
      <Footer />
    </div> 
  </main>

  <!-- ====================== ABOUT PAGE ====================== -->
  <About v-else-if="$route.path === '/about'" />

  <!-- ====================== FALLBACK ====================== -->
  <LandingPage v-else />
</template>

<style scoped>
/* ... (Keep the styles from your original App.vue) ... */
</style>