<script setup>
import { ref } from "vue";

const emit = defineEmits(["search"]);

const searchQuery = ref("");

const handleSearch = () => { 
    emit("search", searchQuery.value);
};
</script>

<template>
    <div class="search-bar">
        <input
            v-model="searchQuery"
            type="text"
            placeholder="SEARCH FOR A WONDER..."
            @input="handleSearch"
        />

    </div>
</template>

<style scoped>
.search-bar {
    display: flex;
    align-items: center;
    gap: 10px;
    width: min(700px, 90vw);
    padding-top: 95px;
    padding-bottom: 20px;
}

.search-bar input {
    flex: 1;
    padding: 16px 20px;
    border: 1px solid rgba(214, 184, 120, 0.5);
    border-radius: 999px;
    outline: none;
    background: rgba(255, 255, 255, 0.05);
    color: white;
    font-size: 14px;
}

.search-bar input::placeholder {
    color: rgba(255, 255, 255, 0.5);
}

</style>