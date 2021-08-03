<template>
	<div class="container main-contents">
		<div v-if="isEmpty">
		<EmptyContent data="게시물"/>
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
					<!-- <div class="row">
						<div class="col-2">
							{{ feed.likeCnt }}
						</div>
					</div> -->

		<div v-if="!isEmpty">
			<div v-for="feed in feeds" v-bind:key="feed.id">
				<FeedDetail :feed="feed"/>
			</div>
		</div>
	</div>
</template>

<script>
import PostsApi from '@/apis/PostsApi'
import EmptyContent from '@/components/error/EmptyContent'
import FeedDetail from '@/views/Mobile/home/FeedDetail'
export default {
    name: 'FeedPage',
	components: {
		EmptyContent,
		FeedDetail
	},
		data: () =>{
        return {
			mores: []
        }
    },
	created() {
		PostsApi.requestMainFeeds()
	},
	computed: {
		feeds() {
			return this.$store.getters.mainPosts
		},
		isEmpty() {
			return this.feeds.length === 0
		}
	},
	methods: {
/*
		clickProfile(nickname){
			this.$router.push({ name: 'Profile', params: { id: nickname }})
		},
		contentTrimmed(content, i){
			if (this.mores[i] === 1){
				return content
			}
			if (content.length < 100) return content;
			else{
				return content.slice(0, 100) + '...';
			}
		},
		backContentVisible(feed){
			return feed.long;
		},
		foldBtnVisible(feed){
			if (feed.contentBack === "") return false;
			else return !feed.long;
		},
		clickMore(feed) {
			feed.long = false;
		},
		clickFold(feed) {
			feed.long = true;
		},
		writeComment(id){
			this.$router.push({ name: 'Comment', params: { id: id}});
		},
		wirteLike(id){
			window.swal("좋아요 구현 필요");
			PostsApi.requestPostLike(id, res=>{}, err =>{});
		},
*/
	}
}
</script>

<style>
.term {
	width:100%;
	height:1em;
	/* background-color: #AAA; */
}

.icon{
    font-size: 1.5em; 
    /* color: #FF742E; */
    /* margin-left: 0.5em; */
	top:0;
}

</style>
