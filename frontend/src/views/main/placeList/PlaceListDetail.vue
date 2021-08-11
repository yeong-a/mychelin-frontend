<template>
    <div>
        <ReturnNav :inputTxt="listName" />
        <SweetModal ref="modal" title="맛집 검색">
            <div class="d-flex mb-3">
                <input type="text" class="input-search" v-model="searchKeyword" v-on:keyup.enter="clickSearch"/>
                <div v-on:click="clickSearch" class="ms-4">
                    <PlusBtn data="검색" />
                </div>
            </div>

            <div v-for="restaurant in restaurants" v-bind:key="restaurant.id">
                <PlaceListDetail
                    :data="{
                        restaurant: restaurant,
                        page: 'mychelin',
                        listId: listId,
                    }"
                />
            </div>
        </SweetModal>
        <div class="container">
            <div class="main-contents mx-4 mb-3 d-flex p-2 justify-content-between">
                <div v-on:click="searchRestaurant">
                    <PlusBtn data="내 맛집 추가" />
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

            <div id="list-map"></div>

            <div class="px-3">
                <div v-for="r in mychelinList" v-bind:key="r.id">
                    <PlacePageElement
                        :data="{
                            restaurant: r,
                            page: 'main',
                        }"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { SweetModal } from "sweet-modal-vue";
import PlusBtn from "@/components/btn/PlusBtn";
import PostsApi from "@/apis/PostsApi";
import ReturnNav from "@/components/user/ReturnNav.vue";
import BookmarkApi from "@/apis/BookmarkApi";
import PlacePageElement from "@/views/main/place/PlacePageElement";
import dotenv from "dotenv";
export default {
    components: {
        SweetModal,
        ReturnNav,
        PlusBtn,
        PlacePageElement,
    },
    data() {
        return {
            mychelinList: [],
            restaurants: [],
            show: false,
            searchKeyword: "",
            btnWord: "내 맛집",
            isBookmarked: false,
            listId: this.$route.params.id,
        };
    },
    created() {
        PostsApi.requestMychelinDetail(this.$route.params.id, 1).then((res) => {
            this.mychelinList = res.data.data.placeListItem;
            PostsApi.requestMychelinDetail(this.$route.params.id, 2).then((res) => {
                this.mychelinList.push(...res.data.data.placeListItem);
                PostsApi.requestMychelinDetail(this.$route.params.id, 3).then((res) => {
                    this.mychelinList.push(...res.data.data.placeListItem);
                });
            });
        });

        BookmarkApi.requestBookmarkLists().then((res) => {
            let bookmarkListsIds = res.data.data.map((list) => list.placeListId);
            if (bookmarkListsIds.includes(Number(this.$route.params.id))) this.isBookmarked = true;
        });
    },
    methods: {
        searchRestaurant() {
            this.$refs.modal.open();
        },
        clickSearch() {
            PostsApi.requestRestaurantsSub(this.searchKeyword).then((res) => {
                this.restaurants = res.data.data.data;
            });
        },
        initMap() {
            var container = document.querySelector("#list-map");
            var options = {
                center: new kakao.maps.LatLng(37.561, 126.976),
                level: 8,
            };
            var map = new kakao.maps.Map(container, options);

            var positions = [];

            let myli = this.mychelinList;
            for (let i = 0, n = myli.length; i < n; i++) {
                let data = {
                    title: myli[i].name,
                    content: `<div>${myli[i].name}</div>`,
                    latlng: new kakao.maps.LatLng(Number(myli[i].latitude), Number(myli[i].longitude)),
                };
                positions.push(data);
            }

            for (let i = 0; i < positions.length; i++) {
                var marker = new kakao.maps.Marker({
                    map: map,
                    position: positions[i].latlng,
                    title: positions[i].title,
                    clickable: true,
                });

                var iwContent = `<div style="">${positions[i].title}</div>`, // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
                    iwRemoveable = true;
                // 인포윈도우를 생성합니다
                var infowindow = new kakao.maps.InfoWindow({
                    content: iwContent,
                    removable: iwRemoveable,
                });

                // 마커에 클릭이벤트를 등록합니다
                kakao.maps.event.addListener(marker, "click", makeOverListener(map, marker, infowindow));
            }
            function makeOverListener(map, marker, infowindow) {
                return function() {
                    infowindow.open(map, marker);
                };
            }
        },
        bookmark() {
            BookmarkApi.bookmarkLists(this.$route.params.id).then((res) => {
                this.isBookmarked = !this.isBookmarked;
            });
        },
    },
    mounted() {
        if (window.kakao && window.kakao.maps) {
            window.setTimeout(this.initMap, 500);
        } else {
            dotenv.config();
            let API_KEY = process.env.VUE_APP_API_KEY;
            const script = document.createElement("script");
            script.onload = () => kakao.maps.load(this.initMap);
            script.src = `http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${API_KEY}&libraries=services`;
            document.head.appendChild(script);
        }
    },
    computed: {
        listName(){
            return this.$route.params.name
        }
    }
};
</script>

<style>
#list-map {
    width: 82%;
    max-width: 420px;
    margin-left: 9%;
    height: 200px;
    margin-bottom: 15px;
    max-height: 420px;
    background-color: white;
}
</style>
