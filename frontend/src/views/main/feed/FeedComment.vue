<template>
    <div class="whole-comment">
        <ReturnNav inputTxt="댓글" />
        <div class="comment-list">
            <div class="per-comment" v-for="commentD in postcommentdata" v-bind:key="commentD.id">
                <div class="comment-header">
                    <span class="comment-header-id">{{ commentD.writerId }}</span
                    >&nbsp;&nbsp;
                    <span class="comment-header-msg">{{ commentD.message }}</span>
                </div>
                <div class="comment-bottom">
                    {{ commentD.createDate }}&nbsp;&nbsp;
                    <span v-on:click="commentdelete(commentD.id)" v-if="commentD.writerId === mynickname">삭제</span>
                </div>
            </div>
        </div>
        <div class="comment-under-bar">
            <div class="comment-under-box">
                <input type="text" placeholder="댓글 달기..." class="comment-input" v-bind:value="inputComment" v-on:input="updateComment" @keyup.enter="writing" />
                <button type="button" class="comment-finish" v-on:click="writing">게시</button>
            </div>
        </div>
    </div>
</template>

<script>
import ReturnNav from "@/components/user/ReturnNav.vue";
import PostingApi from "@/apis/PostingApi.js";
export default {
    components: {
        ReturnNav,
    },
    computed: {
        postcommentdata() {
            return this.$store.getters.postCommentData;
        },
        mynickname() {
            return localStorage.getItem("nickname");
        },
    },
    created() {
        let id = this.postid();

        PostingApi.requestPostComment(
            id,
            function(res) {},
            (error) => {}
        );
    },
    methods: {
        postid() {
            return this.$route.params.id;
        },
        writing() {
            let { inputComment } = this;
            let id = this.postid();

            if (!inputComment) return;
            let data = {
                id: id,
                message: inputComment,
            };

            PostingApi.requestWriteComment(
                data,
                (call) => {
                    window.swal("댓글을 작성했습니다!").then(() => {
                        this.$router.go();
                    });
                },
                (err) => {
                    window.swal("로그인 후 이용해 주세요!");
                }
            );
        },
        updateComment: function(e) {
            let updatedComment = e.target.value;
            this.inputComment = updatedComment;
        },
        commentdelete(id) {
            PostingApi.requestDeleteComment(
                id,
                (call) => {
                    window.swal("댓글을 삭제했습니다 :(").then(() => {
                        this.$router.go();
                    });
                },
                (error) => {
                    window.swal("로그인 후 이용해 주세요!");
                }
            );
        },
    },
    data: () => {
        return {
            inputComment: "",
        };
    },
};
</script>

<style scoped>
.comment-list {
    width: 100%;
    margin-top: 14.49vw;
    height: auto;
}
.per-comment {
    width: 90%;
    margin-left: 5%;
    min-height: 10vw;
    /*background-color: red;*/
    border-top: 1px solid rgba(196, 196, 196, 0.2);
}
.comment-header {
    /*min-height: 14vw;*/
    break-inside: auto;
}
.comment-header-id {
    font-weight: bold;
}
.comment-header-msg {
}
.comment-bottom {
    /*height: 5vw;*/
    font-weight: 300;
    margin-top: 1vw;
    color: #c4c4c4;
    font-size: 2.17vw;
}

.comment-under-bar {
    width: 90%;
    margin-left: 5%;
    height: 14.49vw;
    border-top: 1px solid #c4c4c4;
    padding-top: 1.5%;
    position: fixed;
    bottom: 0;
}
.comment-under-box {
    height: 80%;
    display: flex;
    border: solid 1px #c4c4c4;
    border-radius: 11.83vw;
}
.comment-input {
    padding-top: 1%;
    width: 90%;
    height: 90%;
    font-size: 3.83vw;
    border: none;
}
.comment-finish {
    padding-right: 5%;
    font-size: 3.83vw;
    color: orange;
}
</style>
