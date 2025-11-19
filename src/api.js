import axios from "axios";

const api = axios.create({
  baseURL: "https://movieapi-laforteza.onrender.com",
  headers: {
    "Content-Type": "application/json"
  }
});

export default api;
