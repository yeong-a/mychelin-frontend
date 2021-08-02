<template>
    <div class="d-flex">
        <input type="text" class="search" v-model="searchKeyword">
        <div v-on:click="searchByKeyword">
            <span class="icon-orange"><i class="fas fa-search"></i></span>
        </div>
  </div>
</template>

<script>
import PostsApi from '@/apis/PostsApi'
export default {
    data() {
        return {
            searchKeyword: '',
        }
    },
    methods: {
        searchByKeyword() {
            if (this.$store.getters.currentPage === 0){
                PostsApi.requestPosts(this.searchKeyword)
            } else if (this.$store.getters.currentPage === 1){
                PostsApi.requestRestaurants(this.searchKeyword)
            } else if (this.$store.getters.currentPage === 2){
                PostsApi.requestMychelin(this.searchKeyword)
            }    
            this.$store.commit('GET_SEARCH_KEYWORD', this.searchKeyword)
        }
    }
}
</script>

<style>
.search {
    width: 60%;
    height: 80%;
    margin-left: 15%;
    height: 3em;
    /* position:absolute; */
    background: #FFFFFF;
    /* Light Orange */
    border: 0.125em solid #FF993C;
    box-sizing: border-box;
    border-radius: 1.5em;
}
</style>