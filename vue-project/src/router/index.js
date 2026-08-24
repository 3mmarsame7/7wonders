
import { createRouter, createWebHistory } from "vue-router";

import LandingPage from "../components/landingpage.vue";
import WondersPage from "../App.vue";
import About from "../components/About.vue";


import GreatPyramid from "../components/GreatPyramid.vue";
import HangingGardens from "../components/HangingGarden.vue";
import TempleOfArtemis from "../components/TempleOfArtemis.vue";
import StatueOfZeus from "../components/StatueOfZeus.vue";
import Mausoleum from "../components/Mausoleum.vue";
import ColossusOfRhodes from "../components/ColossusOfRhodes.vue";
import LighthouseOfAlexandria from "../components/LighthouseOfAlexandria.vue";
import WonderFinderPage from "../views/WonderFinderPage.vue";
import TimeTravel from "../views/TimeTravel.vue";



const routes = [
  {
      path: "/",
      name: "landing",
      component: LandingPage
    },

    {
      path: "/wonders",
      name: "wonders",
      component: WondersPage
    },

    {
      path: "/about",
      name: "about",
      component: About
    },

  {
      path: "/wonder/great-pyramid",
      name: "great-pyramid",
      component: GreatPyramid
    },

  {
      path: "/wonder/hanging-gardens",
      name: "hanging-gardens",
      component: HangingGardens
    },

  {
      path: "/wonder/temple-of-artemis",
      name: "temple-of-artemis",
      component: TempleOfArtemis
    },

  {
      path: "/wonder/statue-of-zeus",
      name: "statue-of-zeus",
      component: StatueOfZeus
    },

  {
      path: "/wonder/mausoleum",
      name: "mausoleum",
      component: Mausoleum
    },

  {
    path: "/wonder/colossus-of-rhodes",
    name: "colossus-of-rhodes",
    component: ColossusOfRhodes
  },

  {
    path: "/wonder/lighthouse-of-alexandria",
    name: "lighthouse-of-alexandria",
    component: LighthouseOfAlexandria
  },

  {
  path: "/time-travel",
  name: "time-travel",
  component: TimeTravel
  },

  {
    path: "/match",
    component: WonderFinderPage
  }


];

console.log('🔍 All Routes:', routes.map(r => r.path));

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;