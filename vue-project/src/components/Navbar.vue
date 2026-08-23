<template>
    <header class="navbar" :class="{ scrolled: isScrolled }">
        <router-link to="/" class="logo">
            <span class="logo-mark">7W</span>
            <span class="logo-text">
                WONDERS
                <small style="font-size: 9px;">OF THE WORLD</small>
            </span>
        </router-link>

        <nav class="desktop-nav">
            <router-link to="/wonders">HOME</router-link>
            <router-link to="/wonders">WONDERS</router-link>
            <router-link to="/about">ABOUT</router-link>
        </nav>

        <button class="menu-button" @click="menuOpen = !menuOpen" :class="{ active: menuOpen }"
            aria-label="Toggle menu">
            <span></span>
            <span></span>
        </button>

        <div class="mobile-menu" :class="{ open: menuOpen }">
            <router-link to="/" @click="closeMenu">HOME</router-link>
            <router-link to="/wonders" @click="closeMenu">WONDERS</router-link>
            <router-link to="/about" @click="closeMenu">ABOUT</router-link>
        </div>
    </header>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";

const isScrolled = ref(false);
const menuOpen = ref(false);

const handleScroll = () => {
    isScrolled.value = window.scrollY > 80;
};

const closeMenu = () => {
    menuOpen.value = false;
};

onMounted(() => {
    window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
/* =====================================================
   NAVBAR
===================================================== */

.navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 92px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 5%;
    z-index: 100;
    color: white;
    transition:
        height 0.5s ease,
        background 0.5s ease,
        backdrop-filter 0.5s ease,
        box-shadow 0.5s ease;
}


/* =====================================================
   SCROLLED NAVBAR
===================================================== */

.navbar.scrolled {
    height: 74px;
    background: rgba(12, 17, 22, 0.9);
    backdrop-filter: blur(16px);
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
}


/* =====================================================
   LOGO
===================================================== */

.logo {
    display: flex;
    align-items: center;
    gap: 13px;
    color: white;
    text-decoration: none;
}

.logo-mark {
    width: 40px;
    height: 40px;
    display: grid;
    place-items: center;
    border: 1px solid var(--color-sand);
    border-radius: 50%;
    color: var(--color-sand);
    font-size: 16px;
    font-weight: 800;
    transition: transform 0.4s ease, background 0.4s ease;
}

.logo:hover .logo-mark {
    transform: rotate(12deg);
    background: rgba(214, 184, 120, 0.12);
}

.logo-text {
    display: flex;
    flex-direction: column;
    font-size: 14px;
    font-weight: 800;
    letter-spacing: 0.16em;
    line-height: 1;
}

.logo-text small {
    margin-top: 5px;
    font-size: 7px;
    font-weight: 500;
    letter-spacing: 0.28em;
    color: rgba(255, 255, 255, 0.55);
}


/* =====================================================
   DESKTOP NAV
===================================================== */

.desktop-nav {
    display: flex;
    align-items: center;
    gap: 48px;
}

.desktop-nav a {
    position: relative;
    padding: 8px 0;
    color: rgba(255, 255, 255, 0.82);
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-decoration: none;
    transition: color 0.3s ease, transform 0.3s ease;
}

.desktop-nav a::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -4px;
    width: 0;
    height: 2px;
    border-radius: 10px;
    background: var(--color-sand);
    transition: width 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}

.desktop-nav a:hover {
    color: white;
    transform: translateY(-2px);
}

.desktop-nav a:hover::after {
    width: 100%;
}

/* Active link style */
.desktop-nav a.router-link-active {
    color: var(--color-sand);
}

.desktop-nav a.router-link-active::after {
    width: 100%;
}


/* =====================================================
   MENU BUTTON
===================================================== */

.menu-button {
    display: none;
    position: relative;
    width: 44px;
    height: 44px;
    padding: 0;
    border: none;
    background: transparent;
    cursor: pointer;
}

.menu-button span {
    position: absolute;
    left: 8px;
    width: 28px;
    height: 2px;
    border-radius: 10px;
    background: white;
    transition: transform 0.4s ease, top 0.4s ease;
}

.menu-button span:first-child {
    top: 17px;
}

.menu-button span:last-child {
    top: 26px;
}

.menu-button.active span:first-child {
    top: 21px;
    transform: rotate(45deg);
}

.menu-button.active span:last-child {
    top: 21px;
    transform: rotate(-45deg);
}


/* =====================================================
   MOBILE MENU
===================================================== */

.mobile-menu {
    position: fixed;
    inset: 0;
    z-index: -1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 38px;
    background: #101820;
    opacity: 0;
    pointer-events: none;
    transform: translateY(-20px);
    transition: opacity 0.4s ease, transform 0.4s ease;
}

.mobile-menu.open {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
}

.mobile-menu a {
    color: white;
    font-size: 30px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-decoration: none;
    transition: color 0.3s ease, transform 0.3s ease;
}

.mobile-menu a:hover {
    color: var(--color-sand);
    transform: translateX(8px);
}

/* Mobile active link */
.mobile-menu a.router-link-active {
    color: var(--color-sand);
}


/* =====================================================
   RESPONSIVE
===================================================== */

@media (max-width: 900px) {
    .desktop-nav {
        gap: 28px;
    }

    .desktop-nav a {
        font-size: 12px;
    }
}


@media (max-width: 768px) {
    .desktop-nav {
        display: none;
    }

    .menu-button {
        display: block;
    }

    .navbar {
        height: 80px;
        padding: 0 6%;
    }

    .navbar.scrolled {
        height: 70px;
    }

    .logo-mark {
        width: 38px;
        height: 38px;
    }

    .logo-text {
        font-size: 13px;
    }
}


@media (max-width: 420px) {
    .logo-text {
        display: none;
    }

    .logo-mark {
        width: 40px;
        height: 40px;
    }
}
</style>