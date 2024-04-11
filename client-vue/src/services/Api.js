// api.js
import axios from "axios";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "../App.vue";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { useStore } from "@/store/store";

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);

const store = useStore();

export default () => {
  return axios.create({
    baseURL: `http://localhost:3000/`,
    headers: {
      Authorization: `Bearer ${store.token}`,
    },
  });
};


// const Api = axios.create({
//   baseURL: "http://localhost:3000/",
// });

// Api.interceptors.request.use(
//   (config) => {
//     const token = store.token;
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default Api;