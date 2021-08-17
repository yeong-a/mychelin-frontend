<template>
    <div class="container main-contents px-5">
        <div v-if="isEmpty">
            <EmptySearchContent :data="searchKeyword" />
        </div>
        <div class="shadow p-3 mb-3 select-box" v-for="pl in placeList" :key="pl.id">
            <div class="d-flex justify-content-between" v-on:click="clickMychelinDetail(pl)">
                <div>{{ pl.title }}</div>
                <div><i class="fas fa-map-marker-alt"></i> {{ pl.totalItemCnt }}</div>
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
    props: {
        placeList: Array,
        searchKeyword: String,
    },
    data() {
        return {
        };
    },
    computed: {
        isEmpty() {
            return this.placeList.length === 0;
        },
        limit() {
            return this.$store.getters.searchPlaceListLimit;
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
.fade-enter-active,
.fade-leave-active {
    transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}
</style>
