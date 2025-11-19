import { createRouter, createWebHistory } from "vue-router";

import MoviesWrapper from "../pages/MoviesWrapper.vue"; 
import AddMovie from "../pages/AddMovie.vue";
import MovieDetails from "../pages/MovieDetails.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import { useGlobalStore } from "../stores/global";
import { notyf } from "../stores/notyf";

const routes = [
  
  { path: "/", component: MoviesWrapper },
  { path: "/movies", component: MoviesWrapper },

  
  { path: "/movies/:id", component: MovieDetails },

  // Auth
  { path: "/login", component: Login },
  { path: "/register", component: Register },

  
  {
    path: "/add",
    component: AddMovie,
    meta: { requireAdmin: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.beforeEach((to, from, next) => {
  const global = useGlobalStore();

  if (to.meta.requireAdmin && !global.isAdmin) {
    notyf.error("Admin access only");
    return next("/movies");
  }

  next();
});

export default router;
