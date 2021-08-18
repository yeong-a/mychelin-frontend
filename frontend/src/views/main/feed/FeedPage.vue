<template>
    <div class="container main-contents">
        <div v-if="isEmpty">
            <EmptyContent data="게시물이" />
        </div>
        <!--
		<div v-if="!isEmpty">
		<div v-for="feed in feeds" v-bind:key="feed.id">
			<div class="row border pt-3">
				<div class="row mb-3">
					<div class="col-2" v-on:click="clickProfile(feed.userNickname)">
						<img class="img-full-round" :src="feed.profilePic" />	
					</div>
					<div class="col-6">
						<p>
							<span class="text-big me-3">{{ feed.userNickname }}</span> 
							<i class="fas fa-users"></i>
							{{ feed.followers }}
						</p>
					</div>
					<div class="offset-1 col-3 text-secondary">
						{{ feed.createDate}}
					</div> 
				</div>
			
				<img class="img-full mb-3" :src="feed.contentPic" />
				<p><span>{{ feed.contentFront }}</span>
					<span class="text-secondary" v-if="backContentVisible(feed)" v-on:click="clickMore(feed)">...더보기</span>
					<span v-if="!backContentVisible(feed)">{{ feed.contentBack }}</span>
				</p>
				<p>
					<span class="text-secondary" v-if="foldBtnVisible(feed)" v-on:click="clickFold(feed)">접기</span>
				</p>
				<div class="row">
					<div class="col-1">
						<span class="icon" v-on:click="wirteLike(feed.postId)"><i class="far fa-heart"></i></span>
						<span>{{ feed.likeCnt }}</span>
					</div>
					<div class="col-1 text-center" v-on:click="writeComment(feed.postId)">
						<span class="icon"><i class="far fa-comment-alt"></i></span>
						<span>{{ feed.commentCnt }}</span>
					</div>
					<div class="row">
						<div class="col-2">
							{{ feed.likeCnt }}
						</div>
					</div> -->

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
        PostsApi.requestMainFeeds()
        .catch((err) => {
            console.log(err)
        });
    },
    computed: {
        feeds() {
            return this.$store.getters.mainPosts;
        },
        isEmpty() {
            return this.feeds.length === 0;
        },
        infinity() {
            return this.$store.state.infinitefeed;
        },
        limit() {
            return this.$store.state.feedlimit;
        },
    },
    methods: {
        infiniteHandler($state) {
            let data = {
                limit: this.limit,
            };
            PostsApi.requestMainFeedsIL(data)
                .then((response) => {
                    setTimeout(() => {
                        if (response.data.data) {
                            let feeds = response.data.data.posts;
                            // for (let feed of feeds) {
                            //     feed["contentFront"] = feed["content"].slice(0, 100);
                            //     feed["contentBack"] = feed["content"].slice(100);
                            //     if (feed["contentBack"] === "") feed["long"] = false;
                            //     else feed["long"] = true;
                            //     feed["profilePic"] = "https://picsum.photos/200/200";
                            //     feed["contentPic"] = "https://picsum.photos/360/360";
                            // }
                            this.$store.commit("FILL_MAIN_POSTS_IL", feeds);
                            this.$store.commit('FILL_MAIN_POSTS_IL', response.data.data.posts);
                            this.$store.state.feedlimit += 1;
                            $state.loaded();
                        } else {
                            $state.complete();
                            //console.log(this.$refs.infiniteLoading);
                            //$state.loaded();
                        }
                    }, 1000);
                })
                .catch((err) => {
                    window.swal("", err.response.data, "error");
                });
        },
    },
    updated() {
        if (this.$store.state.infinitefeed === 3) {
            this.$refs.infiniteLoading.stateChanger.reset();
            this.$store.state.infinitefeed = 2;
        }
    },
    destroyed() {
        this.$store.state.infinitefeed = true;
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
