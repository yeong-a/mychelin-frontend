<template>
    <div class="container">
        <!-- 검색바 -->
        <div class="mt-3"><SearchBar /></div>
        <!-- 탭 -->
        <div class="d-flex mt-3 justify-content-around">
            <div v-bind:class="{'selected': selectedIdx === 0, 'unselected': selectedIdx !== 0}" v-on:click="goFeeds">소식</div>
            <div v-bind:class="{'selected': selectedIdx === 1, 'unselected': selectedIdx !== 1}" v-on:click="goUsers">계정</div>
            <div v-bind:class="{'selected': selectedIdx === 2, 'unselected': selectedIdx !== 2}" v-on:click="goRestaurants">장소</div>
            <div v-bind:class="{'selected': selectedIdx === 3, 'unselected': selectedIdx !== 3}" v-on:click="goPlaceList">마이슐랭</div>
        </div>
        <!-- 컨텐츠 -->
        <AddPlaceList v-if="selectedIdx === 3"/>
        <RequireSK v-if="!searchKeyword"/>
        <FeedSearch v-if="searchKeyword && selectedIdx === 0"/>
        <UsereSearch v-if="searchKeyword && selectedIdx === 1"/>
        <PlaceSearch v-if="searchKeyword && selectedIdx === 2"/>
        <PlaceListSearch v-if="searchKeyword && selectedIdx === 3"/>
    </div>  
</template>

<script>
import SearchApi from "@/apis/SearchApi";
import SearchBar from "@/components/bars/SearchBar";
import RequireSK from '@/components/error/RequireSearchKeyword'
import FeedSearch from './FeedSearch';
import UsereSearch from './UserSearch';
import PlaceSearch from './PlaceSearch';
import PlaceListSearch from './PlaceListSearch';
import AddPlaceList from './AddPlaceList'

export default {
    components: {
        SearchBar,
        RequireSK,
        FeedSearch,
        UsereSearch,
        PlaceSearch,
        PlaceListSearch,
        AddPlaceList
    },
    data() {
        return {
            // selectedIdx: 0,
            // feeds: [],
            // users: [],
            // restaurants: [],
            // placeList: [],
            // searchKeyword: '',
        }
    },
    computed: {
      selectedIdx() {
          return this.$store.getters.currentSearchPage
      },
      searchKeyword() {
          return this.$store.getters.searchPageKeyword
      },
      feeds() {
          return this.$store.getters.searchFeed
      },
      restaurants() {
          return this.$store.getters.searchPlace
      },
      placeList() {
          return this.$store.getters.searchPlacelist
      },
      users() {
          return this.$store.getters.searchUser
      },
      

    },
    methods: {
        needLogin() {
            window.swal({
                title: "로그인이 필요합니다.",
                text: "로그인 페이지로 이동하시겠습니까?",
                buttons: true,
                // dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                    // console.clear();
                    this.$router.push({ name: "Login" });
                }
            });
        },
        goFeeds() {
            if (!localStorage.getItem('jwt')) {
                this.needLogin()
                return 0
            }
            if (this.searchKeyword !== ''){
                let data = {'keyword': this.searchKeyword, 'limit': 1}
                    SearchApi.requestFeeds(data)
                    .then((res) =>{
                        this.$store.commit('INIT_SEARCH_FEED')
                        if (res.data.data) this.$store.commit('GET_SEARCH_FEED', res.data.data.posts);
                        else this.$store.commit('GET_SEARCH_FEED', []);
                    })
            }
            // this.selectedIdx = 0;
            this.$store.commit('SWAP_SEARCH_PAGE', 0)
        },
        goUsers() {
            if (!localStorage.getItem('jwt')) {
                this.needLogin()
                return 0
            }
            if (this.searchKeyword !== ''){
                let data = {'keyword': this.searchKeyword}
                    SearchApi.requestUsers(data)
                    .then((res) =>{
                        if (res.data.data) this.$store.commit('GET_SEARCH_USER', res.data.data);
                        else this.$store.commit('GET_SEARCH_USER', []); 
                    })
            }
            this.$store.commit('SWAP_SEARCH_PAGE', 1)
        },
        goRestaurants() {
            if (this.searchKeyword !== ''){
                let data = {'keyword': this.searchKeyword, 'limit': 1}
                    SearchApi.requestRestaurants(data)
                    .then((res) =>{
                        this.$store.commit('INIT_SEARCH_PLACE')
                        if (res.data.data) this.$store.commit('GET_SEARCH_PLACE', res.data.data.data);
                        else this.$store.commit('GET_SEARCH_PLACE', []);
                    })
            }
            // this.selectedIdx = 2;
            this.$store.commit('SWAP_SEARCH_PAGE', 2)
        },
        goPlaceList() {
            if (!localStorage.getItem('jwt')) {
                this.needLogin()
                return 0
            }
            if (this.searchKeyword !== ''){
                let data = {'keyword': this.searchKeyword, 'limit': 1}
                    SearchApi.requestPlaceList(data)
                    .then((res) =>{
                        this.$store.commit('INIT_SEARCH_PLACELIST')
                        if (res.data.data) this.$store.commit('GET_SEARCH_PLACELIST', res.data.data.placeList);
                        else this.$store.commit('GET_SEARCH_PLACELIST', []);
                    })
            }
            // this.selectedIdx = 3;
            this.$store.commit('SWAP_SEARCH_PAGE', 3)
        }
    },
    
    

}
</script>

<style scoped>
.selected { 
    /* width: 40px;
    height: 24px; */
    padding: 0 0.5em 0;
    background: #FF993C;
    border-radius: 12px;
    font-weight: 400;
    font-size: 14px;
    color: #FFF;
}
.unselected {
    padding: 0 0.5em 0;
    font-family: Spoqa Han Sans Neo;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    color: #C4C4C4;
}
</style>