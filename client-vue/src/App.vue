<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useStore } from '@/store/store'

const store = useStore()

const router = useRouter();
function logout() {
  store.setToken(null)
  store.setUser(null)
  router.push({ name: 'songs' });
};
</script>

<template>
  <nav>
    <div class="flex bg-white rounded-xl text-dark top-0 py-3 flex-wrap justify-around mx-auto w-3/4 mb-3 mt-10">
      <h1 class="text-lg font-semibold">
        <RouterLink to="/">MusicTracker</RouterLink>
        <RouterLink :to="{ name: 'songs' }" class="ml-2">Browse</RouterLink>
      </h1>
      <ul class="flex gap-[40px] text-m">
        <li v-if="!store.isUserLoggedIn">
          <RouterLink :to="{ name: 'login' }">Log In</RouterLink>
        </li>
        <li v-if="!store.isUserLoggedIn">
          <RouterLink :to="{ name: 'register' }">Sign Up</RouterLink>
        </li>
        <button v-if="store.isUserLoggedIn" @click="logout">Log Out</button>
      </ul>
    </div>
  </nav>

  <RouterView />
</template>

<style scoped>

</style>
