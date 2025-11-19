<template>
  <form class="form" @submit.prevent="login">
    <h2>Login</h2>

    <input v-model="email" placeholder="Email" />
    <input type="password" v-model="password" placeholder="Password" />

    <button type="submit">Login</button>

    <p>
      No account? <RouterLink to="/register">Register</RouterLink>
    </p>
  </form>
</template>


<script setup>
import { ref } from "vue";
import api from "../api";
import { useRouter } from "vue-router";
import { useGlobalStore } from "../stores/global";
import { notyf } from "../stores/notyf";

const email = ref("");
const password = ref("");

const global = useGlobalStore();
const router = useRouter();

const login = () => {
  api.post("/users/login", { email: email.value, password: password.value })
    .then(res => {
      global.setToken(res.data.access, email.value);
      notyf.success("Logged in!");
      router.push("/");
    })
    .catch(() => notyf.error("Invalid credentials"));
};
</script>
