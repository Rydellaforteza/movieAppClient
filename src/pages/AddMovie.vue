<template>
  <div class="form">
    <h2>Add Movie</h2>

    <input v-model="title" placeholder="Title" />
    <input v-model="director" placeholder="Director" />
    <input v-model="year" placeholder="Year" type="number" />
    <input v-model="genre" placeholder="Genre" />

    <textarea v-model="description" placeholder="Description"></textarea>

    <button @click="addMovie">Add Movie</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import api from "../api";
import { useRouter } from "vue-router";
import { notyf } from "../stores/notyf";

const title = ref("");
const director = ref("");
const year = ref("");
const genre = ref("");
const description = ref("");

const router = useRouter();

const addMovie = () => {
  const movieData = {
    title: title.value,
    director: director.value,
    year: year.value,
    genre: genre.value,
    description: description.value
  };

  api
    .post("/movies/addMovie", movieData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(() => {
      notyf.success("Movie added successfully!");
      router.push("/movies");
    })
    .catch(() => {
      notyf.error("Failed to add movie. Are you an admin?");
    });
};
</script>
