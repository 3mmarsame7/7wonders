<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const props = defineProps({
  coordinates: {
    type: Object,
    required: true,
  },

  title: {
    type: String,
    default: "Wonder",
  },
});

const mapContainer = ref(null);

let map = null;

onMounted(() => {
  if (!mapContainer.value) return;

  map = L.map(mapContainer.value).setView(
    [props.coordinates.lat, props.coordinates.lng],
    13
  );

  L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      attribution: "&copy; OpenStreetMap contributors",
    }
  ).addTo(map);

  L.marker([
    props.coordinates.lat,
    props.coordinates.lng,
  ])
    .addTo(map)
    .bindPopup(props.title)
    .openPopup();
});

onUnmounted(() => {
  if (map) {
    map.remove();
    map = null;
  }
});
</script>

<template>
  <div class="wonder-map">
    <div ref="mapContainer" class="map-container"></div>
  </div>
</template>

<style scoped>
.wonder-map {
  width: 100%;
  margin-top: 40px;
}

.map-container {
  width: 100%;
  height: 450px;
  border-radius: 8px;
  overflow: hidden;
}
</style>