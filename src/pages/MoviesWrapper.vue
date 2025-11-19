<template>
  <div>
    <component :is="pageToShow" />
  </div>
</template>

<script setup>
import Home from "./Home.vue";
import AdminDashboard from "./AdminDashboard.vue";
import { useGlobalStore } from "../stores/global";
import { computed } from "vue";

const global = useGlobalStore();

const pageToShow = computed(() => {
  return global.isAdmin ? AdminDashboard : Home;
});
</script>
