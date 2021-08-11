<template>
    <div>
        <SweetModal ref="modal2" :hide-close-button="true">
            <div style="text-align:right; margin-left:5%;width:90%;display:flex;justify-content: space-between; margin-bottom:5px">
                <button type="button" v-on:click="closeModal"><i class="fas fa-angle-left"></i></button>
                <button type="button" v-on:click="editPosting(feed.postId)" style="color:orange;">수정</button>
            </div>
            <textarea name="" id="" cols="" rows="" style="width:90%; height:70vw; border:2px solid orange;" v-bind:value="editpost" v-on:input="updateeditPost">내용</textarea>
        </SweetModal>
        <div class="row border pt-3 px-2">
            <!-- 게시글 작성자, 작성일 정보 -->
            <div class="row mb-3">
                <div class="col-2" v-on:click="clickProfile(feed.userNickname)">
                    <img class="img-full-round" :src="feed.profileImage" />
                </div>
                <div class="col-6">
                    <p style="text-align:left">
                        <span class="text-big me-3">{{ feed.userNickname }}</span>
                        <i class="fas fa-users" style="color:#BDBDBD"></i>
                        <span style="color:#BDBDBD">&nbsp;{{ feed.userFollowerCnt }}</span>
                    </p>
                </div>
                <div class="offset-1 col-3 text-secondary" style="text-align:right; padding:0;">
                    {{ feed.createDate }}<br />
                    <button type="button" v-if="mynickname === feed.userNickname" v-on:click="modifyFeedModal(feed.contentFront, feed.contentBack)" style="color:#C4C4C4;">
                        수정&nbsp;
                    </button>
                    <button type="button" v-if="mynickname === feed.userNickname" v-on:click="deleteFeed(feed.postId)" style="color:#C4C4C4;">&nbsp;삭제</button>
                </div>
            </div>
            <!-- 게시글 내용 -->
            <!--<div style="position:relative" v-if="feed.images.length">
                <img class="img-full mb-3" :src="feed.images[0]" v-if="imageValid(feed.images[0])" />
                <button class="feed-image-tag" v-if="placeId" v-on:click="godetail(feed.placeId, 1)"><i class="far fa-flag"></i>&nbsp;{{ placeId }}</button>
                <button class="feed-image-tag-list" v-if="placeListId" v-on:click="godetail(feed.placeListId, 2)"><i class="far fa-map"></i>&nbsp;{{ placeListId }}</button>
            </div>-->
            <div style="position:relative" v-if="isImgContent(feed.images)">
                <carousel :perPage="1" :paginationEnabled="false">
                    <slide v-for="img in feed.images" v-bind:key="img.id">
                        <img class="img-post mb-3" :src="img" v-if="imageValid(img)" />
                    </slide>
                </carousel>
                <button class="feed-image-tag" v-if="placeId" v-on:click="godetail(feed.placeId, 1)"><i class="far fa-flag"></i>&nbsp;{{ placeId }}</button>
                <button class="feed-image-tag-list" v-if="placeListId" v-on:click="godetail(feed.placeListId, 2)"><i class="far fa-map"></i>&nbsp;{{ placeListId }}</button>
            </div>

            <div style="display:flex; flex-flow:wrap" v-else>
                <button class="feed-image-none-image" v-if="placeId" v-on:click="godetail(feed.placeId, 1)"><i class="far fa-flag"></i>&nbsp;{{ placeId }}</button>
                <button class="feed-image-none-image" v-if="placeListId" v-on:click="godetail(feed.placeListId, 2)"><i class="far fa-map"></i>&nbsp;{{ placeListId }}</button>
            </div>
            <!--<div style="position:relative" v-else>
                <img class="img-full mb-3" :src="feed.contentPic"/>
                <button class="feed-image-tag" v-if="placeId" v-on:click="godetail(feed.placeId, 1)"><i class="far fa-flag"></i>&nbsp;{{placeId}}</button>
                <button class="feed-image-tag-list" v-if="placeListId" v-on:click="godetail(feed.placeListId, 2)"><i class="far fa-map"></i>&nbsp;{{placeListId}}</button>
            </div>-->

            <p style="text-align:left; word-wrap:break-word">
                <span style="white-space:pre-line;">{{ feed.contentFront }}</span>
                <span class="text-secondary" v-if="backContentVisible" v-on:click="clickMore(feed)">...더보기</span>
                <span v-if="!backContentVisible">{{ feed.contentBack }}</span>
            </p>

            <p style="text-align:left; word-wrap:break-word">
                <span class="text-secondary" v-if="foldBtnVisible" v-on:click="clickFold(feed)">접기</span>
            </p>
            <div class="row">
                <div class="col-1" style="display:flex;">
                    <button class="icon" v-on:click="wirteLike(feed.postId, 1)" v-bind:class="{ 'display-none': !toggle }"><i class="fas fa-heart" style="color:orange"></i></button>
                    <button class="icon" v-on:click="wirteLike(feed.postId, 2)" v-bind:class="{ 'display-none': toggle }"><i class="far fa-heart"></i></button>
                    <button style="color:#363636; font-size:17px;">&nbsp;&nbsp;{{ likecount }}&nbsp;&nbsp;&nbsp;</button>
                    <button class="icon" v-on:click="writeComment(feed.postId)"><i class="far fa-comment-alt"></i></button>
                    <button v-on:click="writeComment(feed.postId)" style="color:#363636; font-size:17px;">&nbsp;&nbsp;{{ feed.commentCnt }}</button>
                </div>
            </div>
            <div class="row" v-if="feed.commentCnt">
                <div class="col-13" style="word-break:break-all; text-align:left" v-for="com in feed.comments" v-bind:key="com.id">
                    <span style="font-weight:bold;">{{ com.writerId }}</span
                    ><span>&nbsp;&nbsp;{{ com.message }}</span>
                </div>
            </div>
            <div class="row" v-if="feed.commentCnt" v-on:click="writeComment(feed.postId)">
                <div class="col-5" style="color:#C4C4C4">댓글 모두 보기</div>
            </div>
            <!-- 댓글 부분 
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
            </div>-->
            <!-- 게시글 사이 간격 -->
            <div class="term"></div>
        </div>
    </div>
</template>

<script>
import { SweetModal } from "sweet-modal-vue";
import PostsApi from "@/apis/PostsApi";
import PostingApi from "@/apis/PostingApi";
import PlaceApi from "@/apis/PlaceApi";
import { Carousel, Slide } from "vue-carousel";
export default {
    components: {
        SweetModal,
        Carousel,
        Slide,
    },
    props: {
        feed: Object,
    },
    computed: {
        backContentVisible() {
            return this.feed.long;
        },
        foldBtnVisible() {
            if (this.feed.contentBack === "") return false;
            else return !this.feed.long;
        },
        mynickname() {
            return localStorage.getItem("nickname");
        },
        placeId() {
            if (this.placeid && this.placeid.length > 15) {
                return this.placeid.substring(0, 14) + "...";
            }
            return this.placeid;
        },
        placeListId() {
            if (this.placelistid && this.placelistid.length > 15) {
                return this.placelistid.substring(0, 14) + "...";
            }
            return this.placelistid;
        },
    },
    methods: {
        clickProfile(nickname) {
            this.$router.push({ name: "ProfilePage", params: { nickname: nickname } });
        },
        writeComment(id) {
            this.$router.push({ name: "FeedComment", params: { id: id } });
        },
        wirteLike(id, num) {
            PostsApi.requestPostLike(
                id,
                (res) => {
                    //window.swal("좋아요")
                },
                (err) => {
                    window.swal("ERROR");
                }
            );
            if (num == 2) this.feed.likeCnt += 1;
            if (num == 1) this.feed.likeCnt -= 1;
            this.toggle = !this.toggle;
            this.feed.liked = !this.feed.liked;
            //this.toggle = this.feed.liked;
        },
        clickMore(feed) {
            feed.long = false;
        },
        clickFold(feed) {
            feed.long = true;
        },
        deleteFeed(id) {
            PostingApi.requestdeletePosting(
                id,
                (call) => {
                    window.swal("", "글을 삭제했습니다", "success").then(() => {
                        this.$router.go();
                    });
                },
                (err) => {
                    window.swal("", "삭제하지 못 했습니다 :(", "error").then(() => {
                        this.$router.go();
                    });
                }
            );
        },
        godetail(id, num) {
            if (num == 1) {
                this.$router.push({ name: "PlaceDetail", params: { id: id } });
            } else if (num == 2) {
                this.$router.push({ name: "PlaceListDetail", params: { id: id } });
            }
        },
        modifyFeedModal(fd, ed) {
            this.editpost = fd + ed;
            this.$refs.modal2.open();
        },
        closeModal() {
            this.$refs.modal2.close();
        },
        updateeditPost: function(e) {
            let updatededitReview = e.target.value;
            this.editpost = updatededitReview;
        },
        editPosting(id) {
            let data = {
                content: this.editpost,
                id: id,
            };
            PostingApi.requestEditPosting(
                data,
                (call) => {
                    window.swal("", "글을 수정했습니다", "success").then(() => {
                        this.$router.go();
                    });
                },
                (err) => {
                    window.swal("", "수정하지 못 했습니다 :(", "error").then(() => {
                        this.$router.go();
                    });
                }
            );
        },
        imageValid(imgContent) {
            if (imgContent === undefined) return false;
            if (imgContent.slice(0, 4) === "http") {
                return true;
            } else return false;
        },
        isImgContent(img){
            if (img === undefined) return false
            else return img.length
        }

    },
    created() {
        let id = this.feed.placeId;
        if (!id) this.placeid = null;
        if (id) {
            PlaceApi.requestPlaceSimple(id).then((res) => {
                this.placeid = res.data.data.name;
            });
        }
        let id2 = this.feed.placeListId;
        if (!id2) this.placelistid = null;
        if (id2) {
            PlaceApi.requestPlaceListSimple(id2).then((res) => {
                this.placelistid = res.data.data.title;
            });
        }

        this.likecount = this.feed.likeCnt;
        this.commentcount = this.feed.commentCnt;
        this.toggle = this.feed.liked;
    },
    mounted() {},
    updated() {
        this.likecount = this.feed.likeCnt;
        this.toggle = this.feed.liked;
    },
    data: () => {
        return {
            placeid: null,
            placelistid: null,
            editpost: "",
            likecount: 0,
            commentcount: 0,
            toggle: true,
        };
    },
};
</script>

<style>
.feed-image-tag {
    position: absolute;
    bottom: 9.66vw;
    left: 7.25vw;
    color: white;
    background: rgba(16, 16, 16, 0.5);
    border-radius: 2.42vw;
    padding: 0.24vw 2.42vw 0.24vw 2.42vw;
}
.feed-image-tag-list {
    position: absolute;
    bottom: 9.66vw;
    right: 7.25vw;
    color: white;
    background: rgba(16, 16, 16, 0.5);
    border-radius: 2.42vw;
    padding: 0.24vw 2.42vw 0.24vw 2.42vw;
}
.feed-image-none-image {
    bottom: 9.66vw;
    right: 7.25vw;
    color: white;
    background: orange;
    opacity: 1;
    border-radius: 2.42vw;
    padding: 0.24vw 2.42vw 0.24vw 2.42vw;
}
.display-none {
    display: none;
}
@media screen and (min-width: 500px) {
    .feed-image-tag {
        bottom: 40px;
        left: 30px;
        border-radius: 10px;
        padding: 1px 10px 1px 10px;
    }
    .feed-image-tag-list {
        bottom: 40px;
        right: 30px;
        border-radius: 10px;
        padding: 1px 10px 1px 10px;
    }
    .feed-image-none-image {
        bottom: 40px;
        right: 30px;
        border-radius: 10px;
        padding: 1px 10px 1px 10px;
    }
}
</style>
