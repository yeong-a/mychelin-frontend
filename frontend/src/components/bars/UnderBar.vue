<template>
  <div class="under-bar d-flex ">
      <div class="split-5" v-on:click="clickFeed">
          <span class="icon-middle" >
              <i class="bi bi-house-fill" style="color:orange" v-if="currentPage === 0"></i>
              <i class="bi bi-house-fill" style="color:blue" v-else-if="currentPage === 4"></i>
            <i class="bi bi-house" style="color:#FFC6B4" v-else></i>
          </span>
      </div>
      <div class="split-5" v-on:click="clickPlace">
          <span class="icon-middle">
          <i class="bi bi-geo-alt-fill" style="color:orange" v-if="currentPage === 1"></i>
          <i class="bi bi-geo-alt" style="color:#FFC6B4" v-else></i>
           </span>
      </div>
      <div class="split-5">
          <span class="icon-middle" v-on:click="clickPosting" >
              <i class="bi bi-pencil"  style="color:#FFC6B4"></i>
           </span>
      </div>
      <div class="split-5" v-on:click="clickMychelin">
          <span class="icon-middle">
          <i class="bi bi-map-fill" style="color:orange" v-if="currentPage === 2"></i>
          <i class="bi bi-map" style="color:#FFC6B4" v-else></i>
           </span>
      </div>
      <div class="split-5">
          <span class="icon-middle" v-on:click="clickChat">
              <i class="bi bi-chat-dots-fill" style="color:orange" v-if="currentPage === 3"></i>
          <i class="bi bi-chat-dots" style="color:#FFC6B4" v-else></i>
          
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
            if(this.currentPage == 0) this.$store.commit('SWAP_PAGE', 4);
            else this.$store.commit('SWAP_PAGE', 0);
            
        },
        clickPlace() {
            PostsApi.requestRestaurants(this.$store.getters.searchKeyword);
            this.$store.commit('SWAP_PAGE', 1);
        },
        clickPosting() {
            if(!localStorage.getItem("jwt") || !localStorage.getItem("nickname")) window.swal("로그인 후 이용해 주세요!");
            else this.$router.push({path:`/user/posting/`});
        },
        clickMychelin() {
            PostsApi.requestMychelin(this.$store.getters.searchKeyword);
            this.$store.commit('SWAP_PAGE', 2);
        },
        clickChat(){
            //
            this.$store.commit('SWAP_PAGE', 3);
        }
    },
    computed: {
		currentPage() {
			return this.$store.getters.currentPage
		}
	}
}
</script>

<style>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css");

.icon-middle{
    font-size: 2em; 
}

.split-5{
    width:20%;
    text-align:center;
    height: 3em;
    line-height: 2.2em;
}
.bg-orange{
    background-color:#FF742E;
}

.under-bar{
    width: 100%;
    height: 3em;
    background-color: #FFFFFF;
    position: fixed;
    bottom:0;
    z-index:5;
}
</style>