<script setup>
import WonderMap from "./wonderMap.vue";

defineProps({
  coordinates: {
    type: Object,
    default: null,
  },

  title: {
    type: String,
    default: "Wonder",
  },
});
</script>

<template>
  <div class="view-map">

    <!-- Normal Map -->

    <WonderMap
      v-if="coordinates"
      :coordinates="coordinates"
      :title="title"
    />

    <!-- No confirmed location -->

    <div
      v-else
      class="location-message"
    >
      <strong>Location unavailable</strong>

      <p>
        The exact location of the Hanging Gardens of Babylon
        remains historically uncertain.
      </p>
    </div>

  </div>
</template>

<style scoped>

.view-map {
  width: 100%;
}

.location-message {
  width: 100%;
  height: 450px;

  margin-top: 40px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 40px;

  border: 1px solid #d6d6d6;
  border-radius: 8px;

  background: #f8f8f8;

  color: #333;

  text-align: center;
}

.location-message strong {
  margin-bottom: 12px;

  font-size: 18px;
  font-weight: 600;
}

.location-message p {
  max-width: 550px;

  margin: 0;

  color: #666;

  font-size: 15px;
  line-height: 1.6;
}

@media (max-width: 600px) {

  .location-message {
    height: 380px;
    padding: 30px 20px;
  }

  .location-message p {
    font-size: 14px;
  }

}

</style>