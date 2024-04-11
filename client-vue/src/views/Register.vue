// register.vue
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import AuthenticationService from '@/services/AuthenticationService'
import { useStore } from '@/store/store'

const store = useStore()
const router = useRouter();
const email = ref('')
const password = ref('')
const errorMessage = ref(null)

const register = async () => {
  try {
    const response = await AuthenticationService.register({
      email: email.value,
      password: password.value
    });
    store.setToken(response.data.token)
    store.setUser(response.data.user)
    router.push({ name: 'songs' });
  } catch (error) {
    console.error(error);
    errorMessage.value = error.response.data.error;
    console.log(errorMessage.value);
  }
}
</script>

<template>
  <body>
    <div class="flex flex-col items-center justify-center">
      <div class="
          flex flex-col
          bg-white
          shadow-md
          px-4
          sm:px-6
          md:px-8
          lg:px-10
          py-8
          rounded-3xl
          w-50
          max-w-md
        ">
        <div class="mt-10">
          <form @submit.prevent="register">
            <div class="flex flex-col mb-5">
              <label for="email" class="mb-1 text-xs tracking-wide text-gray-600">E-Mail Address:</label>
              <div class="relative">
                <div class="
                    inline-flex
                    items-center
                    justify-center
                    absolute
                    left-0
                    top-0
                    h-full
                    w-10
                    text-gray-400
                  ">
                  <i class="fas fa-at text-blue-500"></i>
                </div>

                <input type="email" v-model="email" required class="
                    text-sm
                    placeholder-gray-500
                    pl-10
                    pr-4
                    rounded-2xl
                    border border-gray-400
                    w-full
                    py-2
                    focus:outline-none focus:border-blue-400
                  " placeholder="Enter your email" />
              </div>
            </div>
            <div class="flex flex-col mb-6">
              <label for="password" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Password:</label>
              <div class="relative">
                <div class="
                    inline-flex
                    items-center
                    justify-center
                    absolute
                    left-0
                    top-0
                    h-full
                    w-10
                    text-gray-400
                  ">
                  <span>
                    <i class="fas fa-lock text-blue-500"></i>
                  </span>
                </div>

                <input type="password" v-model="password" required class="
                    text-sm
                    placeholder-gray-500
                    pl-10
                    pr-4
                    rounded-2xl
                    border border-gray-400
                    w-full
                    py-2
                    focus:outline-none focus:border-blue-400
                  " placeholder="Enter your password" />
              </div>
            </div>

            <div class="flex w-full">
              <button class="
                  flex
                  mt-2
                  items-center
                  justify-center
                  focus:outline-none
                  text-white text-sm
                  sm:text-base
                  bg-blue-500
                  hover:bg-blue-600
                  rounded-2xl
                  py-2
                  w-full
                  transition
                  duration-150
                  ease-in
                ">
                <span class="mr-2 uppercase">Register</span>
                <span>
                  <svg class="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </button>
            </div>
            <div v-if="errorMessage" class="text-red-500">{{ errorMessage }}</div>
          </form>
        </div>
      </div>
    </div>
  </body>



</template>

<style>

</style>
