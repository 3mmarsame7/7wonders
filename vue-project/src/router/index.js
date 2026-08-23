
import { createRouter, createWebHistory } from "vue-router";
import GreatPyramid from "../components/GreatPyramid.vue";
import HangingGardens from "../components/HangingGarden.vue";
import TempleOfArtemis from "../components/TempleOfArtemis.vue";
import StatueOfZeus from "../components/StatueOfZeus.vue";
import Mausoleum from "../components/Mausoleum.vue";
import ColossusOfRhodes from "../components/ColossusOfRhodes.vue";
import LighthouseOfAlexandria from "../components/LighthouseOfAlexandria.vue";
import WonderFinderPage from "../views/WonderFinderPage.vue";
const routes = [
  {
    path: "/wonders/great-pyramid",
    component: GreatPyramid
  },
  {
    path: "/wonders/hanging-gardens",
    component: HangingGardens
  },
  {
    path: "/wonders/temple-of-artemis",
    component: TempleOfArtemis
  },
  {
    path: "/wonders/statue-of-zeus",
    component: StatueOfZeus
  },
  {
    path: "/wonders/mausoleum",
    component: Mausoleum
  },
  {
    path: "/wonders/colossus-of-rhodes",
    component: ColossusOfRhodes
  },
  {
    path: "/wonders/lighthouse-of-alexandria",
    component: LighthouseOfAlexandria
  },
  {
  path: "/match",
  component: WonderFinderPage
}
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;