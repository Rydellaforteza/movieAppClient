<template>
  <div class="movie-details">
    <h1>{{ movie.title }}</h1>

    <p><strong>Director:</strong> {{ movie.director }}</p>
    <p><strong>Year:</strong> {{ movie.year }}</p>

    <p class="description">{{ movie.description }}</p>

    <h3>Comments</h3>

    <!-- COMMENT INPUT -->
    <div class="comment-box">
      <input
        v-model="comment"
        placeholder="Add a comment"
        @keyup.enter="submitComment"
      />
      <button @click="submitComment">Submit</button>
    </div>

    <!-- COMMENT LIST -->
    <ul class="comments-list">
      <li v-for="c in movie.comments" :key="c._id">
        {{ c.comment }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import api from "../api";

const route = useRoute();
const movie = ref({ comments: [] });
const comment = ref("");

// Load movie
const loadMovie = () => {
  api.get(`/movies/getMovie/${route.params.id}`).then((res) => {
    movie.value = res.data;
  });
};

onMounted(loadMovie);

// Submit comment
const submitComment = () => {
  if (!comment.value.trim()) return;

  api.patch(
    `/movies/addComment/${route.params.id}`,
    { comment: comment.value },
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  )
    .then(() => {
      comment.value = "";
      loadMovie();
    })
    .catch(() => {
      alert("You must be logged in to comment.");
    });
};
</script>
