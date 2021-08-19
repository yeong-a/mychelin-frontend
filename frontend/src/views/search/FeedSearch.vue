<template>
    <div class="container mt-3">
        <div v-if="isEmpty">
            <EmptySearchContent :data="searchKeyword" />
        </div>
        <div v-if="!isEmpty">
            <div v-for="feed in feeds" v-bind:key="feed.id">
                <FeedPageElement :feed="feed" />
            </div>
            <infinite-loading @infinite="infiniteHandler" spinner="circles" v-if="!isEmpty" ref="infiniteLoading"></infinite-loading>
        </div>
    </div>
</template>

<script>
import SearchApi from "@/apis/SearchApi";
import EmptySearchContent from "@/components/error/EmptySearchContent";
import FeedPageElement from "@/views/main/feed/FeedPageElement";
import InfiniteLoading from "vue-infinite-loading";

export default {
    name: "FeedPage",
    components: {
        EmptySearchContent,
        FeedPageElement,
        InfiniteLoading,
    },
    data() {
        return {
        }
    },
    computed: {
        searchKeyword() {
            return this.$store.getters.searchPageKeyword
        },
        isEmpty() {
            return this.feeds.length === 0;
        },
        limit() {
            return this.$store.getters.searchFeedLimit;
        },
        feeds() {
            return this.$store.getters.searchFeed;
        }
    }, 
    methods: {
        infiniteHandler($state) {
            let data = {
                keyword: this.searchKeyword,
                limit: this.limit,
            };
            SearchApi.requestFeeds(data)
                .then((response) => {
                    setTimeout(() => {
                        if (response.data.data) {
                            this.feeds.push(...response.data.data.posts)
                            this.$store.commit('NEXT_SEARCH_FEED')
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
    //     this.$store.state.infinitefeed = true;
    // },
};
</script>

<style>
.term {
    width: 100%;
    height: 1em;
    /* background-color: #AAA; */
}

.icon {
    font-size: 1.5em;
    /* color: #FF742E; */
    /* margin-left: 0.5em; */
    top: 0;
}
</style>
