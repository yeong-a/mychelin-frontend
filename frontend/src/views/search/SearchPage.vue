<template>
    <div class="container">
        <!-- 검색바 -->
        <div class="mt-3"><SearchBar :selectedIdx="selectedIdx" @fetch-data="onFetchData" @searchKeyword="searchKeyword"/></div>
        <!-- 탭 -->
        <div class="d-flex mt-3 justify-content-around">
            <div v-bind:class="{'selected': selectedIdx === 0, 'unselected': selectedIdx !== 0}" v-on:click="goFeeds">소식</div>
            <div v-bind:class="{'selected': selectedIdx === 1, 'unselected': selectedIdx !== 1}" v-on:click="goUsers">계정</div>
            <div v-bind:class="{'selected': selectedIdx === 2, 'unselected': selectedIdx !== 2}" v-on:click="goRestaurants">장소</div>
            <div v-bind:class="{'selected': selectedIdx === 3, 'unselected': selectedIdx !== 3}" v-on:click="goPlaceList">마이슐랭</div>
        </div>
        <!-- 컨텐츠 -->
        <FeedPage v-if="selectedIdx === 0" :feeds="feeds" :searchKeyword="searchKeyword"/>
        <UserePage v-if="selectedIdx === 1"/>
        <PlacePage v-if="selectedIdx === 2" :restaurants="restaurants" :searchKeyword="searchKeyword"/>
        <PlaceListPage v-if="selectedIdx === 3" :placeList="placeList" :searchKeyword="searchKeyword"/>
    </div>  
</template>

<script>
import SearchApi from "@/apis/SearchApi";
import SearchBar from "@/components/bars/SearchBar";
import FeedPage from './feed/FeedPage';
import UserePage from './user/UserPage';
import PlacePage from './place/PlacePage';
import PlaceListPage from './placeList/PlaceListPage';

export default {
    components: {
        SearchBar,
        FeedPage,
        UserePage,
        PlacePage,
        PlaceListPage
    },
    data() {
        return {
            selectedIdx: 0,
            feeds: [],
            restaurants: [],
            placeList: [],
            searchKeyword: '',
        }
    },
    methods: {
        onFetchData(res){
            if (this.selectedIdx === 0){
                if (res.response.data) this.feeds = res.response.data.data;
                else this.feeds = [];  
                console.log(this.feeds)
            }
            else if (this.selectedIdx === 2){
                if (res.response.data) this.restaurants = res.response.data.data;
                else this.restaurants = [];  
            }
            else if (this.selectedIdx === 3){
                if (res.response.data) this.placeList = res.response.data.placeList;
                else this.placeList = [];  
                
            }
            this.searchKeyword = res.searchKeyword
        },
        goFeeds() {
            if (this.feeds.length === 0 && this.searchKeyword !== ''){
                let data = {'keyword': this.searchKeyword, 'limit': 1}
                    SearchApi.requestFeeds(data)
                    .then((res) =>{
                        this.$store.commit('INIT_SEARCH_FEED')
                        if (res.data.data) this.feeds = res.data.data.data;
                        else this.feeds = [];  
                    })
            }
            this.selectedIdx = 0;
        },
        goUsers() {
            this.selectedIdx = 1;
        },
        goRestaurants() {
            if (this.restaurants.length === 0 && this.searchKeyword !== ''){
                let data = {'keyword': this.searchKeyword, 'limit': 1}
                    SearchApi.requestRestaurants(data)
                    .then((res) =>{
                        this.$store.commit('INIT_SEARCH_PLACE')
                        if (res.data.data) this.restaurants = res.data.data.data;
                        else this.restaurants = [];  
                    })
            }
            this.selectedIdx = 2;
        },
        goPlaceList() {
            if (this.placeList.length === 0 && this.searchKeyword !== ''){
                let data = {'keyword': this.searchKeyword, 'limit': 1}
                    SearchApi.requestPlaceList(data)
                    .then((res) =>{
                        this.$store.commit('INIT_SEARCH_PLACELIST')
                        if (res.data.data) this.placeList = res.data.data.placeList;
                        else this.placeList = [];  
                    })
            }
            this.selectedIdx = 3;
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