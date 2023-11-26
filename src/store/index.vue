<script>
import { createStore } from 'vuex';
import mutations from './mutationsApi.js';
import actions from './actionsApi.js';

export default createStore({
  state: {
    songs: [],
    selectedSong: null,
    recommendations: [],
  },
  mutations,
  actions,
});

</script>

<template>
<div>

</div>
</template>

<style scoped>

</style>