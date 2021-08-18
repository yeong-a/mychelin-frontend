<template>
    <div class="component-wrap">
        <div v-if="isEmpty">
            <EmptySearchContent :data="searchKeyword" />
        </div>
        <div v-for="(list, idx) in placeList" :key="idx" @click="clickMychelinDetail(list)" class="list-wrap">
            <h1 class="list-title">{{ list.title }}</h1>
            <div class="list-description">
                <div>
                    <img v-for="(src, srcIdx) in list.contributorProfiles" :key="srcIdx" :src="src" class="profile-img">
                    {{ contributors[idx] }}
                </div>
                {{ list.totalItemCnt }}곳
            </div>
        </div>
        <infinite-loading @infinite="infiniteHandler" spinner="circles" v-if="!isEmpty" ref="infiniteLoading"></infinite-loading>
    </div>
</template>

<script>
import EmptySearchContent from "@/components/error/EmptySearchContent";
import SearchApi from "@/apis/SearchApi.js";
import InfiniteLoading from "vue-infinite-loading";
export default {
    components: {
        EmptySearchContent,
        InfiniteLoading
    },
    data() {
        return {
        };
    },
    computed: {
        searchKeyword() {
            return this.$store.getters.searchPageKeyword
        },
        isEmpty() {
            return this.placeList.length === 0;
        },
        limit() {
            return this.$store.getters.searchPlaceListLimit;
        },
        placeList() {
            return this.$store.getters.searchPlacelist;
        },
        contributors() {
            return this.placeList.map(list => {
                if (list.contributorCnt > 0)
                    return list.nickname.concat(" 외 ", list.contributorCnt, "명")
                return list.nickname
            })
        },
        imgWrapWidth() {
            return this.placeList.map(list => ''.concat("width: ", list.contributorProfiles.length*13 + 25, 'px'))
        },
        
    },
    methods: {
        clickMychelinDetail(pl) {
            this.$router.push({ name: "PlaceListDetail", params: { id: pl.id } });
        },
        infiniteHandler($state) {
            let data = {
                keyword: this.searchKeyword,
                limit: this.limit,
            };
            SearchApi.requestPlaceList(data)
                .then((response) => {
                    setTimeout(() => {
                        if (response.data.data) {
                            this.placeList.push(...response.data.data.placeList)
                            this.$store.commit('NEXT_SEARCH_PLACELIST')
                            $state.loaded();
                        } else {
                            $state.complete();
                        }
                    }, 1000);
                })
                .catch((err) => {
                    window.swal("", err.response.data, "error");
                });
        },
        
    },
};
</script>

<style scoped>
.component-wrap {
    margin: 10px 0 0;
    padding: 5px 30px 0;
}
.list-wrap {
    height: 100px;
    border: 0.5px solid #FF993C;
    border-radius: 10px;
    box-shadow: 2px 3px #C4C4C4;
    background-color: white;
    margin: 20px 0;
    padding: 15px 18px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.list-title {
    font-size: 16px;
    font-weight: bold;
}
.list-description {
    display: flex;
    justify-content: space-between;
}
.profile-img {
    height: 25px;
    width: 25px;
    border-radius: 100%;
}
</style>
