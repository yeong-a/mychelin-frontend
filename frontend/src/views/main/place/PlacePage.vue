<template>
    <div class="container main-contents">
        <div v-if="isEmpty">
            <EmptyContent data="식당" />
        </div>
        <div v-for="restaurant in restaurants" v-bind:key="restaurant.id">
            <PlacePageElement
                :data="{
                    restaurant: restaurant,
                    page: 'main',
                }"
            />
        </div>
        <infinite-loading @infinite="infiniteHandler" spinner="circles" v-if="!isEmpty && infinity" ref="infiniteLoading"></infinite-loading>
    </div>
</template>

<script>
import EmptyContent from "@/components/error/EmptyContent";
import PlacePageElement from "@/views/main/place/PlacePageElement";
import InfiniteLoading from "vue-infinite-loading";
import PostsApi from "@/apis/PostsApi";

export default {
    components: {
        EmptyContent,
        PlacePageElement,
        InfiniteLoading,
    },
    computed: {
        isEmpty() {
            return this.restaurants.length === 0;
        },
        restaurants() {
            return this.$store.getters.mainPlaces;
        },
        infinity() {
            return this.$store.state.infinite;
        },
        limit() {
            return this.$store.state.placelimit;
        },
    },
    methods: {
        infiniteHandler($state) {
            let data = {
                name: this.$store.getters.searchKeyword,
                limit: this.limit,
            };
            PostsApi.requestRestaurantsIL(data)
                .then((response) => {
                    setTimeout(() => {
                        if (response.data.data) {
                            this.$store.commit("FILL_MAIN_RESTAURANTS_IL", response.data.data.data);
                            this.$store.state.placelimit += 1;
                            $state.loaded();
                        } else {
                            //$state.loaded();
                            //this.limit = 2;
                            //window.swal("더 이상 없어요 :)");
                            //this.scrolling = false;
                            $state.complete();
                            //this.$store.state.infinite = 2;
                            console.log(this.$refs.infiniteLoading);
                            //$state.loaded();
                        }
                    }, 1000);
                })
                .catch((err) => {
                    window.swal("", err.response.data, "error");
                });
        },
    },
    created() {
        //this.$store.state.placelimit = 2;
        //console.log("cre");
    },
    updated() {
        //this.scrolling = true;
        //console.log("up", this.limit);
        if (this.$store.state.infinite === 3) {
            this.$refs.infiniteLoading.stateChanger.reset();
            this.$store.state.infinite = 2;
        }
        //console.log(target.stateChanger);
        //console.log(this.$refs.infiniteLoading);
        //this.limit = 2;
    },
    destroyed() {
        this.$store.state.infinite = true;
        //console.log("des");
    },
    data: () => {
        return {
            //limit: 2,
        };
    },
};
</script>

<style></style>
