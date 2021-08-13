<template>
    <div class="container main-contents">
        <div v-if="isEmpty">
            <EmptyContent data="게시물이" />
        </div>
        <div v-if="!isEmpty">
            <div v-for="feed in feeds" v-bind:key="feed.id">
                <FeedPageElement :feed="feed" />
            </div>
            <infinite-loading @infinite="infiniteHandler" spinner="circles" v-if="!isEmpty && infinity" ref="infiniteLoading"></infinite-loading>
        </div>
    </div>
</template>

<script>
import PostsApi from "@/apis/PostsApi";
import EmptyContent from "@/components/error/EmptyContent";
import FeedPageElement from "@/views/main/feed/FeedPageElement";
import InfiniteLoading from "vue-infinite-loading";
export default {
    name: "FeedPage",
    components: {
        EmptyContent,
        FeedPageElement,

        InfiniteLoading,
    },
    data: () => {
        return {
            mores: [],
        };
    },
    created() {
        PostsApi.requestMainFeedsFol();
    },
    computed: {
        feeds() {
            return this.$store.getters.mainPostsFol;
        },
        isEmpty() {
            return this.feeds.length === 0;
        },
        infinity() {
            return this.$store.state.infinitefeedfol;
        },
        limit() {
            return this.$store.state.feedlimitfol;
        },
    },
    methods: {
        infiniteHandler($state) {
            let data = {
                limit: this.limit,
            };
            PostsApi.requestMainFeedsFolIL(data)
                .then((response) => {
                    setTimeout(() => {
                        if (response.data.data) {
                            let feeds = response.data.data.posts;
                            for (let feed of feeds) {
                                feed["contentFront"] = feed["content"].slice(0, 100);
                                feed["contentBack"] = feed["content"].slice(100);
                                if (feed["contentBack"] === "") feed["long"] = false;
                                else feed["long"] = true;
                                feed["profilePic"] = "https://picsum.photos/200/200";
                                feed["contentPic"] = "https://picsum.photos/360/360";
                            }
                            this.$store.commit("FILL_MAIN_POSTSFOL_IL", feeds);
                            this.$store.state.feedlimitfol += 1;
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
        if (this.$store.state.infinitefeedfol === 3) {
            this.$refs.infiniteLoading.stateChanger.reset();
            this.$store.state.infinitefeedfol = 2;
        }
    },
    destroyed() {
        this.$store.state.infinitefeedfol = true;
    },
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
