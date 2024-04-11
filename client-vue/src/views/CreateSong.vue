<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import SongsService from '@/services/SongsService';

const router = useRouter();

const title = ref(null);
const artist = ref(null);
const genre = ref(null);
const album = ref(null);
const albumImageUrl = ref(null);
const youtubeId = ref(null);
const lyrics = ref(null);
const tab = ref(null);

const song = ref({
  title: title,
  artist: artist,
  genre: genre,
  album: album,
  albumImageUrl: albumImageUrl,
  youtubeId: youtubeId,
  lyrics: lyrics,
  tab: tab
});

const create = async () => {
  try {
    await SongsService.post(song.value);
    router.push({ name: 'songs' });
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>

  <body class="flex items-center justify-center ">

    <div class="bg-white p-8 rounded shadow-md max-w-2xl w-full mx-auto">
      <h2 class="text-2xl font-semibold mb-4">Add a New Song</h2>

      <form @submit.prevent="create">

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
            <input type="text" v-model="song.title" id="title" name="title" class="mt-1 p-2 w-full border rounded-md" required>
          </div>
          <div>
            <label for="artist" class="block text-sm font-medium text-gray-700">Artist</label>
            <input type="text" v-model="song.artist" id="artist" name="artist" class="mt-1 p-2 w-full border rounded-md" required>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="genre" class="block text-sm font-medium text-gray-700">Genre</label>
            <input type="text" v-model="song.genre" id="genre" name="genre" class="mt-1 p-2 w-full border rounded-md" required>
          </div>
          <div>
            <label for="album" class="block text-sm font-medium text-gray-700">Album</label>
            <input type="text" v-model="song.album" id="album" name="album" class="mt-1 p-2 w-full border rounded-md" required>
          </div>
        </div>

        <div class="mt-4">
          <label for="albumImageUrl" class="block text-sm font-medium text-gray-700">Album Image URL</label>
          <input type="text" v-model="song.albumImageUrl" id="albumImageUrl" name="albumImageUrl"
            class="mt-1 p-2 w-full border rounded-md" required>
        </div>

        <div class="mt-4">
          <label for="youtubeId" class="block text-sm font-medium text-gray-700">YouTube ID</label>
          <input type="text" v-model="song.youtubeId" id="youtubeId" name="youtubeId"
            class="mt-1 p-2 w-full border rounded-md" required>
        </div>

        <div class="mt-4">
          <label for="lyrics" class="block text-sm font-medium text-gray-700">Lyrics</label>
          <textarea v-model="song.lyrics" id="lyrics" name="lyrics" class="mt-1 p-2 w-full border rounded-md" required></textarea>
        </div>

        <div class="mt-4">
          <label for="tab" class="block text-sm font-medium text-gray-700">Tab</label>
          <textarea v-model="song.tab" id="tab" name="tab" class="mt-1 p-2 w-full border rounded-md" required></textarea>
        </div>

        <div class="mt-6">
          <button class="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600">Create Song</button>
        </div>
      </form>
    </div>

  </body>

</template>

<style scoped>

</style>
