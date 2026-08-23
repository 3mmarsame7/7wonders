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
          placeholder="Search wonders..."
        />

      </div>

      <button class="search-button">
        SEARCH
      </button>

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

  padding-top: 70px;
  padding-bottom: 12px;
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

  transition:
    box-shadow 0.3s ease,
    border-color 0.3s ease;

}


.search-box:focus-within {

  box-shadow:
    0 0 0 2px
    rgba(214, 184, 120, 0.12);

}


.search-box input {

  width: 100%;

  border: none;

  outline: none;

  background: transparent;

  color: white;

  font-size: 14px;

}


.search-box input::placeholder {

  color:
    rgba(255, 255, 255, 0.55);

}


/* =====================================================
   SEARCH BUTTON
===================================================== */

.search-button {

  height: 48px;

  padding: 0 24px;

  border: none;

  border-radius: 999px;

  background:
    var(--color-sand);

  color:
    var(--color-dark);

  font-size: 11px;

  font-weight: 800;

  letter-spacing: 0.15em;

  cursor: pointer;

  transition:
    transform 0.3s ease,
    background 0.3s ease;

}


.search-button:hover {

  transform:
    translateY(-2px);

  background:
    #e5ca91;

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

}


.filter-wrapper select option {

  background:
    #101820;

  color: white;

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