<template>
    <div class="whole-comment">
        <ReturnNav inputTxt="댓글"/>
        <div class="comment-list">
            <div class="per-comment" v-for="commentD in postcommentdata" v-bind:key="commentD.id">{{commentD.message}}{{commentD.writerID}}{{commentD.createDate}}
                <div class="comment-header"></div>
            </div>
        </div>
        <div class="comment-under-bar">
            <div class="comment-under-box">
                <input type="text" placeholder="댓글 달기..." class="comment-input"
                    v-bind:value="inputComment" v-on:input="updateComment" @keyup.enter="writing"/>       
                <button type="button" class="comment-finish" v-on:click="writing">게시</button>
            </div>
        </div>
    </div>
</template>

<script>
import ReturnNav from '@/components/user/ReturnNav.vue'
import PostingApi from '@/apis/PostingApi.js'
export default {
    components:{
        ReturnNav,
    },
    computed:{
        postcommentdata(){
            return this.$store.getters.postCommentData;
        },
    },
    created(){
        let id = this.postid();

        PostingApi.requestPostComment(id, function(res) {}, error=>{});
    },
    methods:{
        postid() {
            return this.$route.params.id
        },
        writing(){
            let {inputComment} = this;
            let id = this.postid();

            let data = {
                "id": id,
                "message": inputComment,
            }

            PostingApi.requestWriteComment(data, call => {window.swal("댓글을 작성했습니다!").then(() => {this.$router.go();});}, err => {alert("error!")})
            
        },
        updateComment: function(e){
            let updatedComment = e.target.value;
            this.inputComment = updatedComment;
        },
    },
    data: () => {
        return{
            inputComment: '',
        }
    }
}
</script>

<style scoped>
.comment-list{
    width: 100%;
    margin-top:14.49vw;
    height: auto;
}
.per-comment{
    height: 20vw;
    background-color: red;
    border-top:1px solid #C4C4C4;
}
.comment-under-bar{
    width: 90%;
    margin-left:5%;
    height: 14.49vw;
    border-top:1px solid #C4C4C4;
    padding-top:1.5%;
    position: fixed;
    bottom:0;}
    .comment-under-box{
        height: 80%;
        display: flex;
        border:solid 1px #C4C4C4;
        border-radius: 11.83vw;
    }.comment-input{
        padding-top:1%;
        width: 90%;
        height: 90%;
        font-size: 3.83vw;
        border:none;}
    .comment-finish{
        padding-right: 5%;
        font-size: 3.83vw;
        color:orange;}

</style>