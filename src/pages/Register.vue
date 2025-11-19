<template>
  <div class="form">
    <h2>Register</h2>

    <input v-model="name" placeholder="Name" />
    <input v-model="email" placeholder="Email" />
    <input type="password" v-model="password" placeholder="Password" />

    <button @click="register">Register</button>

    <p>
      Already have an account?
      <RouterLink to="/login">Login</RouterLink>
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import api from "../api";
import { useRouter } from "vue-router";
import { notyf } from "../stores/notyf";

const name = ref("");
const email = ref("");
const password = ref("");

const router = useRouter();

const register = () => {
  api
    .post("/users/register", {
      name: name.value,
      email: email.value,
      password: password.value,
    })
    .then(() => {
      notyf.success("Registration successful!");
      router.push("/login");
    })
    .catch(() => notyf.error("Registration failed"));
};
</script>
