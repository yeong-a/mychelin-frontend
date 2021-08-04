<template>
    <div>
        <SweetModal ref="modal2">
            <textarea name="" id="" cols="" rows="" style="width:90%; height:70vw; border:1px solid black;" v-bind:value="editpost" v-on:input="updateeditPost">내용</textarea>
            <button type="button" v-on:click="editPosting(feed.postId)">수정하기</button>
        </SweetModal>

        <div class="row border pt-3 px-2">
            <!-- 게시글 작성자, 작성일 정보 -->
            <div class="row mb-3">
                <div class="col-2" v-on:click="clickProfile(feed.userNickname)" >
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
                    <button type="button" v-if="mynickname === feed.userNickname" v-on:click="deleteFeed(feed.postId)">삭제</button>
                    <button type="button" v-if="mynickname === feed.userNickname" v-on:click="modifyFeedModal(feed.contentFront, feed.contentBack)">&nbsp;수정</button>
                </div>
                
            </div>
            <!-- 게시글 내용 -->
            <div style="position:relative">
                <img class="img-full mb-3" :src="feed.contentPic" />
                <button class="feed-image-tag" v-if="placeId" v-on:click="godetail(feed.placeId, 1)"><i class="far fa-flag"></i>&nbsp;{{placeId}}</button>
                <button class="feed-image-tag-list" v-if="placeListId" v-on:click="godetail(feed.placelistId, 2)"><i class="far fa-map"></i>&nbsp;{{placeListId}}</button>
            </div>
            <p><span>{{ feed.contentFront }}</span>
                <span class="text-secondary" v-if="backContentVisible" v-on:click="clickMore(feed)">...더보기</span>
                <span v-if="!backContentVisible">{{ feed.contentBack }}</span>
            </p>
            <p>
                <span class="text-secondary" v-if="foldBtnVisible" v-on:click="clickFold(feed)">접기</span>
            </p>
            <div class="row">
                <div class="col-1" style="display:flex;">
                    <button class="icon" v-on:click="wirteLike(feed.postId)"><i class="far fa-heart"></i></button>
                    <button style="margin-left:3px">{{ feed.likeCnt }}</button>
                </div>
                <div class="col-1 text-center" style="display:flex;" v-on:click="writeComment(feed.postId)">
                    <button class="icon" style="margin-left:10px"><i class="far fa-comment-alt"></i></button>
                    <button style="margin-left:4px">{{ feed.commentCnt }}</button>
                </div>
            </div>
            <!-- 댓글 부분 -->
            <div class="row border py-2" style="margin:auto;">
                <div class="col-2">
                    <img class="img-full-round" :src="feed.profilePic" />	
                </div>
                <div class="col-9 d-flex align-items-center justify-content-between">
                    <div class="d-flex text-secondary">
                        <input class="input-simple" type="text" placeholder="댓글을 입력하세요." v-on:click="writeComment(feed.postId)"/>
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
import { SweetModal } from 'sweet-modal-vue'
import PostsApi from '@/apis/PostsApi'
import PostingApi from '@/apis/PostingApi'
import PlaceApi from '@/apis/PlaceApi'
import Textarea from '../../../../../../S05P12A206/frontend/src/components/common/Textarea.vue'
import ButtonHalf from '../../../../../../S05P12A206/frontend/src/components/common/ButtonHalf.vue'

export default {
    components: {
        SweetModal
    },
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
        mynickname(){
            return localStorage.getItem("nickname");
        },
        placeId(){
            return this.placeid;
        },
        placeListId(){
            return this.placelistid;
        },
    },
    methods: {
		clickProfile(nickname){
			this.$router.push({ name: 'Profile', params: { id: nickname }})
		},
		writeComment(id){
			this.$router.push({ name: 'Comment', params: { id: id}});
		},
        wirteLike(id){
			PostsApi.requestPostLike(id, res=>{
                window.swal("좋아요")
            }, err =>{window.swal("ERROR")});
		},
        clickMore(feed) {
			feed.long = false;
		},
		clickFold(feed) {
			feed.long = true;
		},
        deleteFeed(id){
            PostingApi.requestdeletePosting(id, call => {
                window.swal("", "글을 삭제했습니다","success").then(() => {this.$router.go();});
                }, err => {
                    window.swal("", "삭제하지 못 했습니다 :(", "error").then(() => {this.$router.go();});
                });
        },
        godetail(id, num){
            if(num == 1){
                this.$router.push({ name: 'Place', params: { id: id }})
            }else if(num == 2){
                this.$router.push({ name: 'Mychelin', params: { id: id }})
            }
        },
        modifyFeedModal(fd, ed){
            this.editpost = fd + ed;
            this.$refs.modal2.open();
        },
        updateeditPost:function(e){
            let updatededitReview = e.target.value;
            this.editpost = updatededitReview;
        },
        editPosting(id){
            let data = {
                "content": this.editpost,
                "id": id
            }
            PostingApi.requestEditPosting(data, call => {
                window.swal("", "글을 수정했습니다","success").then(() => {this.$router.go();});
                }, err => {
                    window.swal("", "수정하지 못 했습니다 :(", "error").then(() => {this.$router.go();});
                });
        },
	},
    created() {
        let id = this.feed.placeId;
        if(id){
            PlaceApi.requestPlaceSimple(id).then(res => {
                this.placeid = res.data.data.placeData.name;
            })
        }
        let id2 = this.feed.placelistId;
        if(id2){
            PlaceApi.requestPlaceListSimple(id2).then(res => {
                this.placelistid = res.data.data.title;
            })
        }
    },
    data: () =>{
        return{
            placeid:null,
            placelistid:null,
            editpost:"",
        }
    }
}
</script>

<style>
.feed-image-tag{
    position:absolute;
    bottom:9.66vw;
    left:7.25vw;
    color:white;
    background: rgba(16, 16, 16, 0.5);
    border-radius: 2.42vw;
    padding:0.24vw 2.42vw 0.24vw 2.42vw;
}
.feed-image-tag-list{
    position:absolute;
    bottom:9.66vw;
    right:7.25vw;
    color:white;
    background: rgba(16, 16, 16, 0.5);
    border-radius: 2.42vw;
    padding:0.24vw 2.42vw 0.24vw 2.42vw;
}
</style>