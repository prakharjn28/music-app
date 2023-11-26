import axios from './axios-instance'; // Import the Axios instance

export default {
  async fetchSongs({ commit }) {
    try {
      const response = await axios.get('/us/rss/topalbums/limit=100/json');
      const sortedData = sortedSongs(response.data);
      commit('setSongs', sortedData);
      return sortedData; // Add this line to return the data to the component
    } catch (error) {
      console.error(error);
      throw error; // Rethrow the error to handle it in the component
    }
  },
};

const sortedSongs = data => {
  const newObj = {}
  return data?.feed?.entry.reduce((acc, item) => {
    let arr = item?.category?.attributes?.label
    if (Array.isArray(newObj[arr])) {
      newObj[arr].push(item)
    } else {
      newObj[arr] = [item]
    }
    return newObj
  })
}