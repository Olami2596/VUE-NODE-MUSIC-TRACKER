import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Register from "../views/Register.vue"
import Login from "../views/Login.vue"
import Songs from "../views/Songs.vue"
import CreateSong from "../views/CreateSong.vue";
import ViewSong from "../views/ViewSong.vue";
import EditSong from "../views/EditSong.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/register",
      name: "register",
      component: Register,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/",
      name: "home",
      redirect: "/songs",
    },
    {
      path: "/songs",
      name: "songs",
      component: Songs,
    },
    {
      path: "/songs/create",
      name: "songs-create",
      component: CreateSong,
    },
    {
      path: "/songs/:id/edit",
      name: "song-edit",
      component: EditSong,
    },
    {
      path: "/songs/:id",
      name: "song",
      component: ViewSong,
      // props: true,
    },
  ],
});

export default router
