<template>
  <div class="movie-card">
    <h3>{{ movie.title }}</h3>
    <p>{{ movie.director }}</p>
    <small>{{ movie.year }}</small>

    <RouterLink :to="`/movies/${movie._id}`" class="view-movie-btn">
      View Movie
    </RouterLink>
  </div>
</template>

<script setup>
const props = defineProps({
  movie: Object,
});
</script>
