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

    const search = searchQuery.value
      .toLowerCase()
      .trim();

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
  return [
    ...new Set(
      wonders.value.map(
        (wonder) => wonder.location
      )
    ),
  ];
});

const handleFilterChange = (filters) => {
  searchQuery.value = filters.search;
  selectedLocation.value = filters.location;
};

let observer;


/* =====================================================
   API
===================================================== */

const API_URL =
  "https://www.world-wonders-api.org/v0/wonders"; 


/* =====================================================
   WONDER COORDINATES
===================================================== */

const getCoordinates = (wonder) => {

  const googleMapsUrl =
    wonder.links?.google_maps;

  if (!googleMapsUrl) {
    return null;
  }

  const match =
    googleMapsUrl.match(
      /!3d(-?\d+(?:\.\d+)?)!4d(-?\d+(?:\.\d+)?)/
    );

  if (!match) {
    return null;
  }

  return {
    lat: Number(match[1]),
    lng: Number(match[2]),
  };
};


/* =====================================================
   WONDER THEMES
===================================================== */

const getWonderTheme = (name) => {

  const title =
    name?.toLowerCase() || "";


  // 01 - Great Pyramid of Giza

  if (
    title.includes("great pyramid") ||
    title.includes("pyramid of giza")
  ) {
    return "sand";
  }


  // 02 - Hanging Gardens of Babylon

  if (
    title.includes("hanging gardens") ||
    title.includes("babylon")
  ) {
    return "garden";
  }


  // 03 - Temple of Artemis

  if (
    title.includes("temple of artemis") ||
    title.includes("artemis")
  ) {
    return "marble";
  }


  // 04 - Statue of Zeus

  if (
    title.includes("statue of zeus") ||
    title.includes("zeus")
  ) {
    return "gold";
  }


  // 05 - Mausoleum at Halicarnassus

  if (
    title.includes("mausoleum") ||
    title.includes("halicarnassus")
  ) {
    return "stone";
  }


  // 06 - Colossus of Rhodes

  if (
    title.includes("colossus") ||
    title.includes("rhodes")
  ) {
    return "ocean";
  }


  // 07 - Lighthouse of Alexandria

  if (
    title.includes("lighthouse") ||
    title.includes("alexandria")
  ) {
    return "sunset";
  }


  // Fallback

  return "sand";
};


/* =====================================================
   FETCH WONDERS
===================================================== */

const fetchWonders = async () => {

  try {

    loading.value = true;

    error.value = null;


    const response =
      await fetch(API_URL);


    if (!response.ok) {

      throw new Error(
        `API returned ${response.status}`
      );

    }


    const data =
      await response.json();


    console.log(
      "All API Wonders:",
      data
    );


    /* =================================================
       THE 7 ANCIENT WONDERS ONLY
    ================================================= */

    const ancientWonderNames = [

      "Great Pyramid of Giza",

      "Hanging Gardens of Babylon",

      "Temple of Artemis",

      "Statue of Zeus at Olympia",

      "Mausoleum at Halicarnassus",

      "Colossus of Rhodes",

      "Lighthouse of Alexandria",

    ];


    /* =================================================
       FILTER API DATA
    ================================================= */

    const ancientWonders =
      ancientWonderNames

        .map((wantedName) => {
          return data.find((wonder) => {
            const apiName =
              wonder.name?.toLowerCase() || "";

            const targetName =
              wantedName.toLowerCase();


            return (
              apiName.includes(targetName) ||
              targetName.includes(apiName)
            );

          });

        })

        .filter(Boolean);


    console.log(
      "Ancient Seven Wonders:",
      ancientWonders
    );


    /* =================================================
       MAP API DATA
    ================================================= */

    wonders.value =
      ancientWonders.map(
        (wonder, index) => {

          const wonderName =
            wonder.name ||
            ancientWonderNames[index];


          return {

            /*
             * Number
             */

            number:
              String(index + 1)
                .padStart(2, "0"),


            /*
             * Short title
             */

            shortTitle:
              wonderName
                .replace(/^The\s+/i, "")
                .toUpperCase(),


            /*
             * Category
             */

            category:
              "ANCIENT WORLD",


            /*
             * Main title
             */

            title:
              wonderName.toUpperCase(),


            /*
             * Description
             */

            description:
              wonder.summary ||
              wonder.description ||
              "No description available.",


            /*
             * Location
             */

            location:
              typeof wonder.location === "string"

                ? wonder.location.toUpperCase()

                : wonder.location?.name

                  ? wonder.location.name.toUpperCase()

                  : "UNKNOWN LOCATION",


            /*
             * Coordinates
             */

            coordinates:
              getCoordinates(wonder),


            /*
             * Construction year
             */

            built:

              typeof wonder.build_year === "number"

                ? wonder.build_year < 0

                  ? `c. ${Math.abs(
                    wonder.build_year
                  )} BCE`

                  : `c. ${wonder.build_year}`

                : wonder.build_year ||
                "UNKNOWN",


            /*
             * Image
             */

            image:
              wonder.links?.images?.[0] ||
              wonder.image ||
              "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368",


            /*
             * Theme
             */

            theme:
              getWonderTheme(wonderName),

          };

        }
      );


    console.log(
      "Mapped Wonders:",
      wonders.value
    );


  } catch (err) {

    console.error(
      "Wonders API Error:",
      err
    );


    error.value =
      "Failed to load the ancient wonders.";


  } finally {

    loading.value = false;

  }

};


/* =====================================================
   MOUNT
===================================================== */

onMounted(async () => {

  /*
   * Get data from API
   */

  await fetchWonders();


  /*
   * Wait for Vue
   */

  await nextTick();


  /* ===================================================
     INTERSECTION OBSERVER
  =================================================== */

  const sections =
    document.querySelectorAll(
      ".wonder-section"
    );


  observer =
    new IntersectionObserver(

      (entries) => {

        entries.forEach(
          (entry) => {

            if (
              entry.isIntersecting
            ) {

              const number =
                entry.target.id
                  .replace(
                    "wonder-",
                    ""
                  );


              activeWonder.value =
                number;

            }

          }
        );

      },

      {
        threshold: 0.55,
      }

    );


  sections.forEach(
    (section) => {

      observer.observe(
        section
      );

    }
  );

});


/* =====================================================
   UNMOUNT
===================================================== */

onUnmounted(() => {

  observer?.disconnect();

});

</script>


<template>
  <!-- ====================== LANDING PAGE ====================== -->
  <LandingPage v-if="$route.path === '/'" />

  <!-- ====================== WONDERS PAGE ====================== -->
  <main v-else-if="$route.path === '/wonders'" class="wonders-page">
    <!-- =========================
          NAVBAR
    ========================== -->
    <Navbar />

    <!-- =========================
          SearchAndFilter
    ========================== -->
    <SearchFilter :locations="locations" @filter-change="handleFilterChange" />

    <!-- =========================
          LOADING
    ========================== -->
    <section v-if="loading" class="status-section">
      <div class="loader"></div>
      <p>LOADING WONDERS...</p>
    </section>

    <!-- =========================
          ERROR
    ========================== -->
    <section v-else-if="error" class="status-section error-section">
      <p>{{ error }}</p>
      <button class="retry-button" @click="fetchWonders">TRY AGAIN</button>
    </section>

    <!-- =========================
          WONDERS
    ========================== -->

    <div v-else id="wonders">
      <WonderSection v-for="wonder in filteredWonders" :key="wonder.number" v-bind="wonder" />
      <div v-if="filteredWonders.length === 0" class="no-results">
        <h2>No Wonders Found</h2>
        <p>We couldn't find any wonder matching your search or location.</p>
      </div>

      <div v-else id="wonders">

        <Footer />

      </div>

    </div>
  </main>

  <!-- ====================== ABOUT PAGE ====================== -->
  <About v-else-if="$route.path === '/about'" />

  <!-- ====================== FALLBACK ====================== -->
  <LandingPage v-else />
</template>


<style scoped>
/* =====================================================
   WONDERS PAGE
===================================================== */

.wonders-page {
  min-height: 100vh;
}


/* =====================================================
   API STATUS
===================================================== */

.status-section {

  min-height: 50vh;

  display: flex;

  flex-direction: column;

  justify-content: center;

  align-items: center;

  gap: 20px;

  background:
    var(--color-dark);

  color: white;

}


.status-section p {

  margin: 0;

  font-size: 14px;

  font-weight: 600;

  letter-spacing: 0.2em;

  color:
    var(--color-sand);

}


/* =====================================================
   LOADER
===================================================== */

.loader {

  width: 50px;

  height: 50px;

  border:
    3px solid rgba(214, 184, 120, 0.2);

  border-top-color:
    var(--color-sand);

  border-radius: 50%;

  animation:
    spin 0.8s linear infinite;

}


/* =====================================================
   ERROR
===================================================== */

.error-section p {
  color: #ff7777;
}


.retry-button {

  padding:
    12px 25px;

  border:
    1px solid var(--color-sand);

  border-radius: 999px;

  background: transparent;

  color:
    var(--color-sand);

  cursor: pointer;

  font-size: 12px;

  font-weight: 700;

  letter-spacing: 0.15em;

  transition:
    all 0.3s ease;

}


.retry-button:hover {

  background:
    var(--color-sand);

  color:
    var(--color-dark);

}


/* =====================================================
   ANIMATION
===================================================== */

@keyframes spin {

  to {
    transform:
      rotate(360deg);
  }

}

.no-results {
  min-height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 60px 20px;
  background: #f1e8d5;
  color: #17130e;
}

.no-results h2 {
  margin: 0 0 15px;
  font-size: 36px;
}

.no-results p {
  margin: 0 0 25px;
  color: #5e574e;
  font-size: 16px;
}
</style>