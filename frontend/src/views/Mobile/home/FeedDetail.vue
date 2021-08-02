<template>
    <div>
        <div class="row border pt-3 px-2">
            <!-- 게시글 작성자, 작성일 정보 -->
            <div class="row mb-3">
                <div class="col-2" v-on:click="clickProfile(feed.userNickname)">
                    <img class="img-full-round" :src="feed.profilePic" />	
                </div>
                <div class="col-6">
                    <p>
                        <span class="text-big me-3">{{ feed.userNickname }}</span> 
                        <i class="fas fa-users"></i>
                        {{ feed.userFollowerCnt }}
                    </p>
                </div>
                <div class="offset-1 col-3 text-secondary">
                    {{ feed.createDate}}
                </div> 
            </div>
            <!-- 게시글 내용 -->
            <img class="img-full mb-3" :src="feed.contentPic" />
            <p><span>{{ feed.contentFront }}</span>
                <span class="text-secondary" v-if="backContentVisible" v-on:click="clickMore(feed)">...더보기</span>
                <span v-if="!backContentVisible">{{ feed.contentBack }}</span>
            </p>
            <p>
                <span class="text-secondary" v-if="foldBtnVisible" v-on:click="clickFold(feed)">접기</span>
            </p>
            <div class="row">
                <div class="col-1">
                    <span class="icon"><i class="far fa-heart"></i></span>
                    <span>{{ feed.likeCnt }}</span>
                </div>
                <div class="col-1 text-center" v-on:click="writeComment(feed.postId)">
                    <span class="icon"><i class="far fa-comment-alt"></i></span>
                    <span>{{ feed.commentCnt }}</span>
                </div>
            </div>
            <!-- 댓글 부분 -->
            <div class="row border py-2" style="margin:auto;">
                <div class="col-2">
                    <img class="img-full-round" :src="feed.profilePic" />	
                </div>
                <div class="col-9 d-flex align-items-center justify-content-between">
                    <div class="d-flex text-secondary">
                        <input class="input-simple" type="text" placeholder="댓글을 입력하세요.">
                    </div>
                    <div>
                        <span class="icon"><i class="far fa-paper-plane"></i></span>
                    </div>
                </div>
            </div>
            <!-- 게시글 사이 간격 -->
            <div class="term">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        feed: Object
    },
    computed: {
        backContentVisible(){
            return this.feed.long;
        },
        foldBtnVisible(){
			if (this.feed.contentBack === "") return false;
			else return !this.feed.long;
		},
    },
    methods: {
		clickProfile(nickname){
			this.$router.push({ name: 'Profile', params: { id: nickname }})
		},
		writeComment(id){
			this.$router.push({ name: 'Comment', params: { id: id}});
		},
        clickMore(feed) {
			feed.long = false;
		},
		clickFold(feed) {
			feed.long = true;
		},
	}
}
</script>

<style>

</style>