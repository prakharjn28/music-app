<template>
  <div class="song-details-container" v-if="hasSongData">
    <h2>{{ songData['im:name'].label }}</h2>
    <div class="song-details">
      <img :src="songData['im:image'][2].label" alt="Album cover" class="album-cover" />
      <div class="song-info">
        <p><strong>Artist:</strong> {{ songData['im:artist'].label }}</p>
        <p><strong>Genre:</strong> {{ songData['im:contentType'].attributes.label }}</p>
        <p><strong>Release Date:</strong> {{ formatDate(songData['im:releaseDate'].label) }}</p>
      </div>
    </div>

    <!-- Button to toggle more details -->
    <button @click="toggleMoreDetails">
      {{ showMoreDetails ? 'Hide More Details' : 'Show More Details' }}
    </button>

    <!-- MoreDetails component -->
    <MoreDetails v-if="showMoreDetails" :price="songData['im:price'].label" :appleMusicLink="songData.link.attributes.href" />

    <router-view />
  </div>
  <div v-else>
    <p>Loading song details...</p>
    <router-view />
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import MoreDetails from './MoreDetails.vue'; // Import the MoreDetails component

export default {
  name: 'SongDetails',
  components: {
    MoreDetails, // Register the MoreDetails component
  },
  setup() {
    const router = useRouter();
    const songData = ref(null);
    const showMoreDetails = ref(false);

    // Function to format the date
    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const toggleMoreDetails = () => {
      showMoreDetails.value = !showMoreDetails.value;
    };

    onMounted(() => {
      // Access the query parameter using router.currentRoute.value.query
      const songDetail = router.currentRoute.value.query.songDetail;
      if (songDetail) {
        // Parse the JSON string to get the original object
        songData.value = JSON.parse(songDetail);
      }
    });

    // Computed property to check if songData is available
    const hasSongData = computed(() => !!songData.value);

    return {
      songData,
      formatDate,
      hasSongData,
      showMoreDetails,
      toggleMoreDetails,
    };
  },
};
</script>

<style scoped>
.song-details-container {
  max-width: 600px;
  margin: 20px auto;
}

.song-details {
  display: flex;
  margin-top: 20px;
}

.album-cover {
  width: 150px;
  height: 150px;
  border-radius: 8px;
}

.song-info {
  margin-left: 20px;
}
</style>
