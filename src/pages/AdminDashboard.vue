<template>
  <div class="admin-container">
    <h1>Admin Dashboard</h1>

    <!-- REQUIRED ID -->
    <RouterLink id="addMovie" to="/add" class="add-button">
      Add Movie
    </RouterLink>

    <table class="movie-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Director</th>
          <th>Year</th>
          <th>Genre</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="movie in movies" :key="movie._id">
          <td>{{ movie.title }}</td>
          <td>{{ movie.director }}</td>
          <td>{{ movie.year }}</td>
          <td>{{ movie.genre }}</td>
          <td>
            <RouterLink :to="`/movies/${movie._id}`">View</RouterLink>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../api";

const movies = ref([]);

onMounted(() => {
  api.get("/movies/getMovies").then(res => {
    movies.value = res.data.movies;
  });
});
</script>
