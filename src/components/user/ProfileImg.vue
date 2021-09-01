<template>
  <div v-on:click="goToProfile(feed.id)">
    <img class="img-full-round" :src="feed.profilePic" />	
  </div>
</template>

<script>
export default {
  name: 'ProfileImg',
  props: {
    feed: Object
  },
  methods: {
    goToProfile(id) {
      this.$router.push({ name: 'ProfilePage', params: {nickname: id} })
    },
}
}
</script>

<style>
.img-full-round {
  width:100%;
  height:auto;
  border-radius: 5em;
}
</style>