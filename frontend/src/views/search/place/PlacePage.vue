<template>
    <div class="container main-contents">
        <div v-if="isEmpty">
            <EmptyContent data="식당이" />
        </div>
        <div v-for="restaurant in restaurants" v-bind:key="restaurant.id">
            <PlacePageElement
                :data="{
                    restaurant: restaurant,
                    page: 'main',
                }"
            />
        </div>
        <infinite-loading @infinite="infiniteHandler" spinner="circles" v-if="!isEmpty" ref="infiniteLoading"></infinite-loading>
    </div>
</template>

<script>
import EmptyContent from "@/components/error/EmptyContent";
import PlacePageElement from "@/views/main/place/PlacePageElement";
import InfiniteLoading from "vue-infinite-loading";
import SearchApi from "@/apis/SearchApi";

export default {
    components: {
        EmptyContent,
        PlacePageElement,
        InfiniteLoading,
    },
    props: {
        restaurants: Array,
        searchKeyword: String,
    },
    data() {
        return {
            
        }
    },
    computed: {
        isEmpty() {
            return this.restaurants.length === 0;
        },
        limit() {
            return this.$store.getters.searchPlaceLimit;
        },
    },
    methods: {
        infiniteHandler($state) {
            let data = {
                keyword: this.searchKeyword,
                limit: this.limit,
            };
            SearchApi.requestRestaurants(data)
                .then((response) => {
                    setTimeout(() => {
                        console.log('res', response.data.data)
                        if (response.data.data) {
                            this.restaurants.push(...response.data.data.data)
                            this.$store.commit('NEXT_SEARCH_PLACE')
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
    updated() {
        if (!this.isEmpty) this.$refs.infiniteLoading.stateChanger.reset();

    },
    // destroyed() {
    //     this.$store.state.infinite = true;
    // },
};
</script>

<style></style>
