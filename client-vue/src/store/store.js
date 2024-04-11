import { defineStore } from "pinia";

export const useStore = defineStore({
  id: "store",
  state: () => ({
    token: null,
    user: null,
    isUserLoggedIn: false,
  }),
  actions: {
    setToken(token) {
      this.token = token;
      if (token) {
        this.$state.isUserLoggedIn = true;
      } else {
        this.$state.isUserLoggedIn = false;
      }
    },
    setUser(user) {
      this.user = user;
    },
  },
  persist: true,
});
