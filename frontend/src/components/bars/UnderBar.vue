<template>
  <div class="under-bar d-flex ">
      <div class="split-5" v-on:click="clickFeed" v-bind:class="{ 'bg-orange': currentPage===0}">
          <span class="icon-middle">
            <i class="fas fa-newspaper"></i>
          </span>
      </div>
      <div class="split-5" v-on:click="clickPlace" v-bind:class="{ 'bg-orange': currentPage===1}">
          <span class="icon-middle">
          <i class="fas fa-map-marker-alt"></i>
           </span>
      </div>
      <div class="split-5">
          <span class="icon-middle" v-on:click="clickPosting">
          <i class="fas fa-pen"></i>
           </span>
      </div>
      <div class="split-5" v-on:click="clickMychelin" v-bind:class="{ 'bg-orange': currentPage===2}">
          <span class="icon-middle">
          <i class="fas fa-list-alt"></i>
           </span>
      </div>
      <div class="split-5">
          <span class="icon-middle">
          <i class="far fa-comments"></i>
           </span>
      </div>
  </div>
</template>

<script>
import PostsApi from '@/apis/PostsApi'

export default {
    methods: {
        clickFeed() {
            // PostsApi.requestPosts(this.$store.getters.searchKeyword);
            this.$store.commit('SWAP_PAGE', 0);
        },
        clickPlace() {
            PostsApi.requestRestaurants(this.$store.getters.searchKeyword);
            this.$store.commit('SWAP_PAGE', 1);
        },
        clickPosting() {
            let {id} = PostsApi.requestProfile();
            this.$router.push({path:`/user/posting/${id}`});
        },
        clickMychelin() {
            PostsApi.requestMychelin(this.$store.getters.searchKeyword);
            this.$store.commit('SWAP_PAGE', 2);
        },
    },
    computed: {
		currentPage() {
			return this.$store.getters.currentPage
		}
	}
}
</script>

<style>
.icon-middle{
    font-size: 2em; 
}

.split-5{
    width:20%;
    text-align:center;
    height: 5em;
    line-height: 5em;
}
.bg-orange{
    background-color:#FF742E;
}

.under-bar{
    width: 100%;
    height: 5em;
    background-color: #FFFFFF;
    position: fixed;
    bottom:0;
    z-index:5;
}
</style>