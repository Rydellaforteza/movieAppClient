<template>
  <nav class="navbar" :class="{ open: menuOpen }">
    <RouterLink class="logo" to="/">MovieApp</RouterLink>

    <button class="menu-toggle" @click="toggleMenu">☰</button>

    <div class="nav-links">

      <!-- SHOW WHO IS LOGGED IN -->
      <span v-if="userEmail" class="user-display">
        Logged in as: <strong>{{ userEmail }}</strong>
      </span>

      <RouterLink v-if="global.isAdmin" to="/add">Add Movie</RouterLink>
      <RouterLink to="/">Home</RouterLink>

      <RouterLink v-if="!isLoggedIn" to="/login">Login</RouterLink>
      <RouterLink v-if="!isLoggedIn" to="/register">Register</RouterLink>

      <button v-if="isLoggedIn" @click="handleLogout" class="logout-btn">
        Logout
      </button>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useGlobalStore } from "../stores/global";
import { notyf } from "../stores/notyf";

const router = useRouter();
const global = useGlobalStore();

// ⭐ make email reactive
const userEmail = computed(() => global.email);

const isLoggedIn = computed(() => global.isLoggedIn);

const menuOpen = ref(false);
const toggleMenu = () => (menuOpen.value = !menuOpen.value);

const handleLogout = () => {
  global.logout();
  notyf.success("Logged out!");
  router.push("/login");
  menuOpen.value = false;
};
</script>
