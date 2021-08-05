<template>
  <!-- <div class="wrap-main-page"> -->
	<div>
		<div v-if="!isLogin">
			<Home/>
		</div>
		<div v-if="isLogin">
			<MainNavbar/>
			<UnderBar/>
			<FeedPage v-if="currentPage === 0"/>    
			<FeedPageFol v-if="currentPage === 4"/>    
			<PlacePage v-if="currentPage === 1"/>
			<MychelinPage v-if="currentPage === 2"/>
		</div>
	</div>
</template>

<script>
import Home from '@/views/WEB/Home.vue'
import PostsApi from '@/apis/PostsApi'
import UnderBar from '@/components/bars/UnderBar'
import MainNavbar from '@/components/bars/MainNavbar2'
import FeedPage from './FeedPage'
import FeedPageFol from './FeedPageFol'
import PlacePage from './PlacePage'
import MychelinPage from './MychelinPage'
export default{
    name: "MainPage",
    components:{
			Home,
			UnderBar,
			MainNavbar,
			FeedPage,
			PlacePage,
			MychelinPage,
			FeedPageFol,
    },
	created() {	
		// if(this.$store.getters.isUser === false){
		// 	console.log(this.$store.getters.isUser)
		// 	this.$router.push({name: 'Login'})
		// }
		// PostsApi.requestMainFeeds()
	},
    data: () =>{
        return {
			feeds: []
        }
    },
	computed: {
		currentPage() {
			return this.$store.getters.currentPage
		},
		isLogin() {
			return this.$store.getters.isUser + this.$store.state.isUser
		}
	}
	
}
</script>
<style>
.main-contents{
	margin-top: 4em;
	margin-bottom:3em;
}

.text-big {
	/* width: 77.44px;
	height: 14.85px; */
	font-family: Spoqa Han Sans Neo;
	font-style: normal;
	font-weight: 500;
	font-size: 1.2em;
	line-height: 1.5em;
	display: flex;
	align-items: center;
	color: #000000;
}


.text-center {
	text-align:center;
}
.img-profile {
    width:3em;
    height:3em;
    border-radius: 5em;
}

.img-full-round {
    width:7vh;
    height:7vh;
    border-radius: 5em;
}

.input-simple {
	border:none;
}
</style>

