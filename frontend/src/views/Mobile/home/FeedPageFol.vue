<template>
	<div class="container main-contents">
		<div v-if="isEmpty">
            <EmptyContent data="게시물"/>
		</div>
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
		PostsApi.requestMainFeeds(2)
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
