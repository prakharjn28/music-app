<!-- MoreDetails.vue -->
<template>
  <div class="more-details">
    <h3>More Details</h3>
    <p><strong>Price:</strong> {{ price }}</p>
    <p><strong>Apple Music Link:</strong> <a :href="appleMusicLink" target="_blank">{{ appleMusicLink }}</a></p>
  </div>
</template>

<script>
export default {
  name: 'MoreDetails',
  props: {
    price: String,
    appleMusicLink: String,
  },
};
</script>

<style scoped>
/* Add styles for the MoreDetails component as needed */
.more-details {
  margin-top: 20px;
}
</style>
