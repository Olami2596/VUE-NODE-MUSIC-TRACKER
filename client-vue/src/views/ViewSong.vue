<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from '@/store/store'
const store = useStore()
import SongsService from '@/services/SongsService';
import BookmarksService from '@/services/BookmarksService';
import SongHistoryService from '@/services/SongHistoryService';



const route = useRoute();
const song = ref(null);
const bookmark = ref("");
const history = ref("")

onMounted(async () => {
  if (!store.isUserLoggedIn) {
    return;
  }

  const songId = route.params.id;
  const response = await SongsService.show(songId);
  song.value = response.data;


  const userId = store.user._id;
  try {
    const bookmarks = (await BookmarksService.index({
      songId: route.params.id,
      userId: userId,
    })).data;
    if (bookmarks.length) {
      bookmark.value = bookmarks[0]
    }
  } catch (error) {
    console.log(error)
  }

  if (store.isUserLoggedIn) {
    try {
      history.value = (await SongHistoryService.post({
        songId: route.params.id,
        userId: userId,
      })).data
    } catch (error) {
      console.log(error)
    }
  }
});

async function setAsbookmark() {
  try {    
    bookmark.value = (await BookmarksService.post({
      songId: route.params.id,
      userId: store.user._id,
    })).data;
    console.log(bookmark)
  } catch (err) {
    console.log(err);
  }
}


async function unsetAsBookmark() {
  try {
    let bookmarkId = bookmark.value._id;
    // if (bookmark.value && bookmark.value.bookmarkId && bookmark.value.bookmarkId.length > 0) {
    //   bookmarkId = bookmark.value.bookmarkId;
    // } else {
    //   bookmarkId = bookmark.value._id;
    // }

    // console.log(bookmark.value)
    // console.log(bookmark.value._id+4)
    await BookmarksService.delete(bookmarkId);
    bookmark.value = null;
  } catch (err) {
    console.log(err);
  }
}
</script>

<template>
  <div v-if="song">
    <div class="flex flex-row items-center justify-between w-1/2 mx-auto mb-10">
      <button
        class="mb-2 btn-default overflow-hidden relative w-64 bg-stone-50 text-gray-900 mt-4 py-4 px-4 rounded-xl font-bold uppercase transition-all duration-100 -- hover:shadow-md border border-stone-100 hover:bg-gradient-to-t hover:from-stone-100 before:to-stone-50 hover:-translate-y-[3px]">
        <RouterLink :to="{ name: 'song-edit', params: { id: song._id } }">
          <h2>Edit Song</h2>
        </RouterLink>
      </button>
      <button v-if="store.isUserLoggedIn && !bookmark"
        class="mb-2 btn-default overflow-hidden relative w-64 bg-stone-50 text-gray-900 mt-4 py-4 px-4 rounded-xl font-bold uppercase transition-all duration-100 -- hover:shadow-md border border-stone-100 hover:bg-gradient-to-t hover:from-stone-100 before:to-stone-50 hover:-translate-y-[3px]"
        @click="setAsbookmark">
        <h2>Bookmark</h2>
      </button>
      <button v-if="store.isUserLoggedIn && bookmark"
        class="mb-2 btn-default overflow-hidden relative w-64 bg-stone-50 text-gray-900 mt-4 py-4 px-4 rounded-xl font-bold uppercase transition-all duration-100 -- hover:shadow-md border border-stone-100 hover:bg-gradient-to-t hover:from-stone-100 before:to-stone-50 hover:-translate-y-[3px]"
        @click="unsetAsBookmark">
        <h2>UnBookmark</h2>
      </button>
    </div>

    <div
      class="px-4 bg-white mb-8 py-8 rounded-3xl mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 ">
      <div class="flex flex-col items-center justify-between w-full mb-10 lg:flex-row">
        <div class="mb-16 lg:mb-0 lg:max-w-lg lg:pr-5">
          <div class="max-w-xl mb-6">
            <h2
              class="font-sans text-3xl sm:mt-0 mt-6 font-medium tracking-tight text-black sm:text-4xl sm:leading-none max-w-lg mb-6">
              Song Title - {{ song.title }}
            </h2>
            <span class="block text-slate-400 font-semibold text-md">Artist - {{ song.artist }}</span>
            <span class="block text-slate-400 font-semibold text-md">Album - {{ song.album }}</span>
            <span class="block text-slate-400 font-semibold text-md">Genre - {{ song.genre }}</span>
          </div>
        </div>
        <img width="420" height="120" :alt="song.title" :src="song.albumImageUrl" />
      </div>
    </div>

    <div
      class="px-4 bg-white mb-8 py-8 rounded-3xl mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 ">
      <div class="flex justify-center items-center">
        <div class="player w-96 h-80">
          <VueYtframe :video-id="song.youtubeId" class="w-full h-full" />
        </div>
      </div>
    </div>

    <div
      class="px-4 bg-white mb-8 py-8 rounded-3xl mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 ">
      <div class="flex flex-col items-center justify-between w-full mb-10 lg:flex-row">
        <div class="mb-16 lg:mb-0 lg:max-w-lg lg:pr-5">
          <div class="max-w-xl mb-6">
            <h2
              class="font-sans text-3xl sm:mt-0 mt-6 font-medium tracking-tight text-black sm:text-4xl sm:leading-none max-w-lg mb-6">
              Lyrics
            </h2>
            <div class="lyrics-container" style="max-height: 300px; overflow-y: auto;">
              <p class="text-black text-base md:text-lg">{{ song.lyrics }}</p>
            </div>
          </div>
        </div>
        <div class="mb-16 lg:mb-0 lg:max-w-lg lg:pr-5">
          <div class="max-w-xl mb-6">
            <h2
              class="font-sans text-3xl sm:mt-0 mt-6 font-medium tracking-tight text-black sm:text-4xl sm:leading-none max-w-lg mb-6">
              Guitar Tab
            </h2>
            <div class="lyrics-container" style="max-height: 300px; overflow-y: auto;">
              <p class="text-black text-base md:text-lg">{{ song.tab }}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>

</template>

<style scoped>

</style>
