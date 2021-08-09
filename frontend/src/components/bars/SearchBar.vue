<template>
    <div class="d-flex">
        <input type="text" class="search" v-on:keyup.enter="searchByKeyword" v-model="searchKeyword" />
        <div v-on:click="searchByKeyword">
            <span class="icon-orange"><i class="fas fa-search"></i></span>
        </div>
    </div>
</template>

<script>
import PostsApi from "@/apis/PostsApi";
export default {
    data() {
        return {
            searchKeyword: "",
        };
    },
    methods: {
        searchByKeyword() {
            if (this.searchKeyword === ''){
                window.swal('검색어를 입력해주세요!')
            } else {
                window.scrollTo(0, 0);
                if (this.$store.getters.currentPage === 0) {
                    // PostsApi.requestPosts(this.searchKeyword)
                    PostsApi.requestRestaurants(this.searchKeyword);
                    this.$store.commit("SWAP_PAGE", 1);
                } else if (this.$store.getters.currentPage === 1) {
                    PostsApi.requestRestaurants(this.searchKeyword);
                } else if (this.$store.getters.currentPage === 2) {
                    PostsApi.requestMychelin(this.searchKeyword);
                }
                this.$store.commit("GET_SEARCH_KEYWORD", this.searchKeyword);
                this.$store.state.infinite = 3;
                this.$store.state.placelimit = 2;
            }
        },
    },
};
</script>

<style>
/* .search {
    width: 60%;
    height: 80%;
    margin-left: 15%;
    height: 3em;
    background: #ffffff;
    border: 0.125em solid #ff993c;
    box-sizing: border-box;
    border-radius: 1.5em;
} */
</style>
