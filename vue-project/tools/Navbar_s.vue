<script setup>
import { ref } from "vue";

const mobileMenuOpen = ref(false);
</script>

<template>
    <nav class="navbar">

        <div class="navbar-inner">

            <!-- LOGO -->
            <router-link to="/" class="brand">
                <div class="brand-mark">
                    7W
                </div>

                <span>
                    SEVEN WONDERS
                </span>
            </router-link>

            <!-- DESKTOP NAV -->
            <div class="nav-links">

                <router-link to="/" class="nav-link">
                    HOME
                </router-link>

                <router-link to="/wonders" class="nav-link">
                    WONDERS
                </router-link>

            </div>

            <!-- MOBILE BUTTON -->
            <button class="mobile-button" @click="mobileMenuOpen = !mobileMenuOpen">
                ☰
            </button>

        </div>

        <!-- MOBILE MENU -->
        <div v-if="mobileMenuOpen" class="mobile-menu">

            <router-link to="/" @click="mobileMenuOpen = false">
                HOME
            </router-link>

            <router-link to="/wonders" @click="mobileMenuOpen = false">
                WONDERS
            </router-link>


        </div>

    </nav>
</template>

<style scoped>
.navbar {
    position: fixed;
    top: 0;
    left: 0;

    width: 100%;

    z-index: 1000;

    background: transparent;

    backdrop-filter: blur(12px);
    
}

.navbar-inner {
    width: 100%;

    padding: 24px 64px;

    display: flex;
    align-items: center;
    justify-content: space-between;
}

/* BRAND */

.brand {
    display: flex;
    align-items: center;
    gap: 10px;

    color: var(--color-sand);

    text-decoration: none;

    transition: transform 0.3s ease;
}

.brand:hover {
    transform: scale(0.97);
}

.brand-mark {
    width: 32px;
    height: 32px;

    border: 1px solid var(--color-sand);

    border-radius: 50%;

    display: grid;
    place-items: center;

    font-family: "Archivo Narrow", sans-serif;

    font-size: 16px;
    font-weight: 700;
}

.brand span {
    font-family: "Archivo Narrow", sans-serif;

    font-size: 20px;

    font-weight: 700;

    letter-spacing: -0.03em;
}

/* NAV */

.nav-links {
    display: flex;

    gap: 32px;
}

.nav-link {
    position: relative;

    color: var(--text-primary);

    text-decoration: none;

    font-family: "Space Grotesk", sans-serif;

    font-size: 12px;

    font-weight: 600;

    letter-spacing: 0.2em;

    transition:
        color 0.3s ease;
}

.nav-link:hover {
    color: var(--color-sand);
}

.nav-link.router-link-active {
    color: var(--color-sand);
}

.nav-link.router-link-active::after {
    content: "";

    position: absolute;

    left: 0;
    bottom: -7px;

    width: 100%;
    height: 1px;

    background: var(--color-sand);
}

/* MOBILE */

.mobile-button {
    display: none;

    border: none;

    background: transparent;

    color: var(--color-sand);

    font-size: 25px;

    cursor: pointer;
}

.mobile-menu {
    display: none;
}

/* RESPONSIVE */

@media (max-width: 768px) {

    .navbar-inner {
        padding: 20px 24px;
    }

    .nav-links {
        display: none;
    }

    .mobile-button {
        display: block;
    }

    .mobile-menu {
        display: flex;

        flex-direction: column;

        gap: 25px;

        padding: 25px 24px 30px;

        background: rgba(16, 15, 10, 0.95);

        backdrop-filter: blur(20px);
    }

    .mobile-menu a {
        color: var(--text-primary);

        text-decoration: none;

        font-family: "Space Grotesk", sans-serif;

        font-size: 12px;

        font-weight: 600;

        letter-spacing: 0.2em;
    }

}
</style>