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

        <button @click="handleSearch">
            SEARCH
        </button>
    </div>
</template>

<style scoped>
.search-bar {
    display: flex;
    align-items: center;
    gap: 10px;
    width: min(700px, 90vw);
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

.search-bar button {
    padding: 16px 25px;
    border: none;
    border-radius: 999px;
    background: var(--color-sand);
    color: var(--color-dark);
    font-weight: 700;
    cursor: pointer;
}
</style>