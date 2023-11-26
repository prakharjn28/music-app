<template>
  <div>
    <!-- SearchBar component directly integrated into SongsList -->
    <div class="search-bar">
      <input v-model="searchQuery" type="text" placeholder="Search songs" class="search-input"  />
    </div>

    <div v-if="filteredSongs.length > 0">
      <div v-for="(category, index) in filteredSongs" :key="index" class="genre-container">
        <h2 class="genre-title">{{ category.genre }}</h2>
        <div class="song-list">
          <router-link
              v-for="song in category.songs"
              :key="song.id.label"
              :to="{ name: 'SongDetails', params: { id: song.id.attributes['im:id'] }, query: { songDetail: JSON.stringify(song)} }"
              class="song-link"
          >
            <div class="song-item">
              <img :src="song['im:image'][2].label" alt="Album cover" class="album-cover" />
              <div class="song-details">
                <p class="song-name">{{ song['im:name'].label }}</p>
                <p class="artist-name">{{ song['im:artist'].label }}</p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>

    <div v-else>
      <p>No songs found matching the search criteria.</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'SongsList',
  setup() {
    const store = useStore();
    const songsList = ref({});
    const searchQuery = ref('');
    const filteredSongs = ref([]);

    const renderList = () => {
      return Object.keys(songsList.value).map((genre) => {
        return {
          genre,
          songs: songsList.value[genre],
        };
      });
    };

    onMounted(async () => {
      try {
        const songs = await store.dispatch('fetchSongs');
        songsList.value = songs;
        filteredSongs.value = renderList();
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    });

    const handleSearchQueryChange = () => {
      const lowerCaseQuery = searchQuery.value.toLowerCase();

      if (lowerCaseQuery.length >= 3) {
        filteredSongs.value = renderList().reduce((result, category) => {
          const filteredSongs = category.songs.filter(
              (song) =>
                  song['im:name'].label.toLowerCase().includes(lowerCaseQuery) ||
                  song['im:artist'].label.toLowerCase().includes(lowerCaseQuery)
          );

          if (filteredSongs.length > 0) {
            result.push({
              genre: category.genre,
              songs: filteredSongs,
            });
          }

          return result;
        }, []);
      } else {
        // Show the whole data if the query is less than 3 characters
        filteredSongs.value = renderList();
      }
    };

    return {
      songsList,
      searchQuery,
      renderList,
      filteredSongs,
      handleSearchQueryChange,
    };
  },
  watch: {
    searchQuery: 'handleSearchQueryChange',
  },
};
</script>

<style scoped>

.search-bar {
  padding: 10px;
  margin-bottom: 15px;
  width: 300px;
}

.search-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  font-size: 16px;
}

.genre-container {
  margin-bottom: 20px;
}

.genre-title {
  margin-bottom: 10px; /* Add margin between genre title and song list */
}

.song-list {
  display: flex;
  overflow-x: auto; /* Add horizontal scroll */
}

.song-item {
  flex: 0 0 100px; /* Adjust the width of each song item as needed */
  margin-right: 20px;
  text-align: center;
}

.album-cover {
  width: 160px;
  border-radius: 8px;
  height: 160px; /* Set the height to a fixed size */
  object-fit: cover; /* Maintain aspect ratio while fitting within the container */
}

.song-details {
  margin-top: 8px;
}

.song-link {
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}

.song-name {
  font-weight: bold;

}

.artist-name {
  color: #888;
}
</style>
