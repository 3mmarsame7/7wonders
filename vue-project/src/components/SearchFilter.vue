<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  locations: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["filter-change"]);

const search = ref("");
const selectedLocation = ref("");

const applyFilter = () => {
  emit("filter-change", {
    search: search.value,
    location: selectedLocation.value,
  });
};

watch(
  [search, selectedLocation],
  applyFilter
);

const clearFilters = () => {
  search.value = "";
  selectedLocation.value = "";

  emit("filter-change", {
    search: "",
    location: "",
  });
};
</script>
<template>
  <div class="search-filter">

    <!-- SEARCH -->
    <div class="search-wrapper">

      <div class="search-box">

        <input
          v-model="search"
          type="text"
          placeholder="SEARCH THE ANCIENT WONDERS..."
        />

      </div>


    </div>


    <!-- LOCATION FILTER -->
    <div class="filter-wrapper">

      <label for="location">
        LOCATION
      </label>

      <select
        id="location"
        v-model="selectedLocation"
      >

        <option value="">
          ALL LOCATIONS
        </option>

        <option
          v-for="location in locations"
          :key="location"
          :value="location"
        >
          {{ location }}
        </option>

      </select>

    </div>


    <!-- CLEAR -->
    <button
      v-if="search || selectedLocation"
      class="clear-button"
      @click="clearFilters"
    >
      CLEAR
    </button>

  </div>
</template>


<style scoped>

.search-filter {
  display: flex;
  align-items: center;
  gap: 14px;

  width: 86%;
  max-width: 1400px;

  margin: 0 auto;

  padding-top: 95px;
  padding-bottom: 20px;
}


/* =====================================================
   SEARCH
===================================================== */

.search-wrapper {

  flex: 1;

  display: flex;

  align-items: center;

  gap: 7px;

}


.search-box {

  flex: 1;

  height: 42px;

  display: flex;

  align-items: center;

  padding: 0 20px;

  border: 1px solid var(--color-sand);

  border-radius: 999px;

  background: #101820;
  box-shadow:
        -8px 8px 20px rgba(167, 124, 45, 0.18);
  transition:
    box-shadow 0.3s ease,
    border-color 0.3s ease;

}


.search-box:focus-within {

  box-shadow:
    -10px 10px 28px rgba(167, 124, 45, 0.30);
}


.search-box input {

  width: 100%;

  border: none;

  outline: none;

  background: transparent;

  color: var(--color-sand);

  font-size: 14px;

}


.search-box input::placeholder {

  color:
    rgba(255, 255, 255, 0.55);

}


/* =====================================================
   LOCATION FILTER
===================================================== */

.filter-wrapper {

  display: flex;

  align-items: center;

  gap: 9px;

}


.filter-wrapper label {

  color:
    var(--color-sand);

  font-size: 13px;

  font-weight: 700;

  letter-spacing: 0.15em;

}


.filter-wrapper select {

  height: 42px;

  padding:
    0 34px 0 16px;

  border:
    1px solid
    var(--color-sand);

  border-radius: 999px;

  background:
    #101820;

  color: white;

  outline: none;

  cursor: pointer;
  color-scheme: dark;

}


.filter-wrapper select option {

  background:
    #101820;

  color: white;

}
.filter-wrapper select option:hover,
.filter-wrapper select option:focus {
  background: var(--color-sand);
  color: var(--color-dark);
}

/* =====================================================
   CLEAR
===================================================== */

.clear-button {

  height: 42px;

  padding: 0 18px;

  border:
    1px solid
    var(--color-sand);

  border-radius: 999px;

  background:
    transparent;

  color:
    var(--color-sand);

  font-size: 10px;

  font-weight: 700;

  letter-spacing: 0.12em;

  cursor: pointer;

  transition:
    background 0.3s ease,
    color 0.3s ease;

}


.clear-button:hover {

  background:
    var(--color-sand);

  color:
    var(--color-dark);

}


/* =====================================================
   RESPONSIVE
===================================================== */

@media (max-width: 900px) {

  .search-filter {

    flex-wrap: wrap;

  }

  .search-wrapper {

    width: 100%;

    flex-basis: 100%;

  }

}


@media (max-width: 700px) {

  .search-filter {

    flex-direction: column;

    align-items: stretch;

  }

  .search-wrapper {

    width: 100%;

  }

  .filter-wrapper {

    justify-content: space-between;

  }

  .filter-wrapper select {

    flex: 1;

  }

  .clear-button {

    align-self: flex-end;

  }

}

</style>