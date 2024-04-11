<script setup>
import { ref, onMounted, watch, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import SongsService from '@/services/SongsService';
import _ from 'lodash'
import { useStore } from '@/store/store'
const store = useStore()
import BookmarksService from '@/services/BookmarksService';
import SongHistoryService from '@/services/SongHistoryService';

const songs = ref({});
const search = ref('')
const router = useRouter()
const bookmarks = ref(null)

const recents = ref([])

onMounted(async () => {
  songs.value = (await SongsService.index()).data;

  if (store.isUserLoggedIn) {
    try {
      const response = await BookmarksService.index(store.token);
      bookmarks.value = response.data.data;
      console.log(bookmarks.value);
    } catch (error) {
      console.error(error);
    }
  }


  if (store.isUserLoggedIn) {
    const response = await SongHistoryService.index({
      userId: store.user._id
    });
    recents.value = response.data;
  }

});



watchEffect(() => {
  _.debounce(() => {
    const route = { name: 'songs' };
    if (search.value !== '') {
      route.query = { search: search.value };
    }
    router.push(route);
  }, 700);
  console.log(search.value);
});

watch(() => router.currentRoute.value.query.search, async (value) => {
  songs.value = (await SongsService.index(value)).data;
});
</script>

<template>

  <body class="flex items-center justify-center mb-3">
    <div>
      <input type="text" v-model="search" id="search" name="search" class="mt-1 w-full p-2 border rounded-md"
        placeholder="Search for songs">
    </div>
  </body>
  <button
    class="btn-default overflow-hidden relative w-64 bg-stone-50 text-gray-900 py-4 px-4 rounded-xl font-bold uppercase transition-all duration-100 -- hover:shadow-md border border-stone-100 hover:bg-gradient-to-t hover:from-stone-100 before:to-stone-50 hover:-translate-y-[3px]">
    <RouterLink :to="{ name: 'songs-create' }" class="ml-2">Create Songs</RouterLink>
  </button>

  <div v-if="store.isUserLoggedIn">
    <!-- bookmark table -->
    <div class="md:px-32 py-8 w-full">
      <div class="shadow overflow-hidden rounded border-b border-gray-200">
        <table class="min-w-full bg-white">
          <caption class="text-gray-700 text-lg font-semibold mb-2">Bookmarks</caption>
          <thead class="bg-gray-800 text-white">
            <tr>
              <th class="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Title</th>
              <th class="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Artist</th>
              <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Album</th>
              <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Genre</th>
            </tr>
          </thead>
          <tbody class="text-gray-700">
            <tr v-for="bookmark in bookmarks" :key="bookmark.bookmarkId" class="bg-white">
              <td class="w-1/3 text-left py-3 px-4">{{ bookmark.song.title }}</td>
              <td class="w-1/3 text-left py-3 px-4">{{ bookmark.song.artist }}</td>
              <td class="text-left py-3 px-4">{{ bookmark.song.album }}</td>
              <td class="text-left py-3 px-4">{{ bookmark.song.genre }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- recently viewed  -->
    <div class="md:px-32 py-8 w-full">
      <div class="shadow overflow-hidden rounded border-b border-gray-200">
        <table class="min-w-full bg-white">
          <caption class="text-gray-700 text-lg font-semibold mb-2">Recently Viewed</caption>
          <thead class="bg-gray-800 text-white">
            <tr>
              <th class="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Title</th>
              <th class="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Artist</th>
              <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Album</th>
              <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Genre</th>
            </tr>
          </thead>
          <tbody class="text-gray-700">
            <tr v-for="recent in recents" :key="recent._id" class="bg-white">
              <td class="w-1/3 text-left py-3 px-4">{{ recent.song.title }}</td>
              <td class="w-1/3 text-left py-3 px-4">{{ recent.song.artist }}</td>
              <td class="text-left py-3 px-4">{{ recent.song.album }}</td>
              <td class="text-left py-3 px-4">{{ recent.song.genre }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>


  <div class="relative flex flex-col justify-center overflow-hidden">
    <div class="min-h-32 ">
      <div class="max-w-screen-lg mx-auto py-4">
        <div class="flex gap-6 mt-2">
          <div class="bg-white w-1/3 shadow rounded-lg overflow-hidden" v-for="song in songs" :key="song._id">
            <img :src="song.albumImageUrl" class="object-cover h-52 m-4 w-full" :alt="song.title">
            <div class="p-6">
              <span class="block text-slate-400 font-semibold text-md">{{ song.album }}</span>
              <h3 class="mt-3 font-bold text-lg pb-4 border-b border-slate-300">{{ song.artist }} - {{ song.title }}
              </h3>

              <button
                class="btn-default overflow-hidden relative w-64 bg-stone-50 text-gray-900 mt-4 py-4 px-4 rounded-xl font-bold uppercase transition-all duration-100 -- hover:shadow-md border border-stone-100 hover:bg-gradient-to-t hover:from-stone-100 before:to-stone-50 hover:-translate-y-[3px]">
                <RouterLink :to="{ name: 'song', params: { id: song._id } }">
                  <h2>View Song</h2>
                </RouterLink>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
