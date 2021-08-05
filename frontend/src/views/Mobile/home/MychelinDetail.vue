<template>
    <div>
        <ReturnNav inputTxt="새 게시물"/>
        <SweetModal ref="modal" title="맛집 검색">   
            <div class="d-flex">
                <input type="text" class="input-search" v-model="searchKeyword">
                <div v-on:click="clickSearch">
                    <PlusBtn data="검색"/>
                </div>
            </div>
            <div v-for="restaurant in restaurants" v-bind:key="restaurant.id">
                <PlaceElement :restaurant="restaurant"/>
            </div>
        </SweetModal>
        <div class="main-contents mx-4 mb-3 d-flex p-2 justify-content-between">
            <div v-on:click="searchRestaurant">
                <PlusBtn data="내 맛집 추가"/>
            </div>
            <div>
                <button type="button" @click="bookmark">
                    <div v-show="!isBookmarked">
                        <i class="far fa-bookmark"></i>
                    </div>
                    <div v-show="isBookmarked">
                        <i class="fas fa-bookmark"></i>
                    </div>
                </button>
            </div>
        </div>
        <div class="container px-5">
            <div v-for="r in mychelinList" v-bind:key="r.id">
                <PlaceElement :restaurant="r"/>
            </div>
        </div>
    </div>
</template>

<script>
import { SweetModal } from 'sweet-modal-vue'
import PlusBtn from '@/components/btn/PlusBtn'
import PostsApi from '@/apis/PostsApi'
import ReturnNav from '@/components/user/ReturnNav.vue'
import BookmarkApi from "@/apis/BookmarkApi"
import PlaceElement from './PlaceElement'
export default {
    components:{
        SweetModal,
        ReturnNav,
        PlusBtn,
        PlaceElement,
    },
    data() {
        return {
            mychelinList: [],
            restaurants: [],
            show: false,
            searchKeyword: '',
            btnWord: '내 맛집',
            isBookmarked: false
        }
    },
    created() {
        PostsApi.requestMychelinDetail(this.$route.params.id)
        .then(res => {
            this.mychelinList = res.data.placeListItem
        })

        BookmarkApi.requestBookmarkLists().then(res => {
            let bookmarkListsIds = res.data.data.map(list => list.placeListId)
            if (bookmarkListsIds.includes(Number(this.$route.params.id)))
                this.isBookmarked = true
        })
    },
    methods: {
        searchRestaurant() {
            this.$refs.modal.open()
        },
        clickSearch() {
            PostsApi.requestRestaurantsSub(this.searchKeyword)
            .then((res) => {
                this.restaurants = res.data.data.data
                console.log(this.restaurants)
            })
        },
        bookmark() {
            BookmarkApi.bookmarkLists(this.$route.params.id).then(res => {
                this.isBookmarked = !this.isBookmarked
            })
        }
    }
}
</script>

<style>

</style>