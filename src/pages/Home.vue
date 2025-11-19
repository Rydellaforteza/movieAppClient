<template>
  <div class="container">
    <h1>Movies</h1>
    <div class="grid">
      <MovieCard v-for="m in movies" :key="m._id" :movie="m" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import MovieCard from "../components/MovieCard.vue";
import api from "../api";

const movies = ref([]);

onMounted(() => {
  api.get("/movies/getMovies").then(res => {
    movies.value = res.data.movies;
  });
});
</script>

<style>
.container { padding: 20px; }
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}
</style>
