import { defineStore } from "pinia";
import { jwtDecode } from "jwt-decode";

export const useGlobalStore = defineStore("global", {
  state: () => ({
    token: null,
    isAdmin: false,
    email: null    
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
  },

  actions: {
    init() {
      const savedToken = localStorage.getItem("token");
      const savedEmail = localStorage.getItem("email");  // NEW

      if (savedToken) {
        this.token = savedToken;
        const decoded = jwtDecode(savedToken);
        this.isAdmin = decoded.isAdmin || false;
      }

      if (savedEmail) {
        this.email = savedEmail;
      }
    },

    setToken(token, email) {    
      this.token = token;
      this.email = email;        

      localStorage.setItem("token", token);
      localStorage.setItem("email", email);

      const decoded = jwtDecode(token);
      this.isAdmin = decoded.isAdmin || false;
    },

    logout() {
      this.token = null;
      this.isAdmin = false;
      this.email = null;

      localStorage.removeItem("token");
      localStorage.removeItem("email");
    }
  },
});
