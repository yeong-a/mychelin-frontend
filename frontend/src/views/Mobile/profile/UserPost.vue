<template>
    <div>
        <SweetModal ref="modal">
            <FeedDetail :feed="feed" />
        </SweetModal>
        <div v-if="isEmpty">
            <EmptyContent data="포스트" />
        </div>
        
        <div class="row row-cols-4 g-1">
            <div class="col" v-for="post in posts" v-bind:key="post.id">
                <div v-on:click="openModal(post)">
                    <div class="created-tag">{{post.createDate}}</div>
                    <img v-if="isImage(post.images[0])" class="img-preview" :src="imageUrl(post.images[0])" />
                    <div v-if="!isImage(post.images[0])" class="text-replaced border ">{{ postTrimmed(post.content) }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { SweetModal } from "sweet-modal-vue";
import EmptyContent from "@/components/error/EmptyContent";
import FeedDetail from "@/views/Mobile/home/FeedDetail";
export default {
    components: {
        SweetModal,
        EmptyContent,
        FeedDetail,
    },
    data() {
        return {
            feed: {},
        };
    },
    computed: {
        isEmpty() {
            return this.posts.length === 0;
        },
    },
    props: {
        posts: Array,
    },
    methods: {
        openModal(post) {
            // post 자세히보기 등 추가
            post["contentFront"] = post["content"].slice(0, 100);
            post["contentBack"] = post["content"].slice(100);
            if (post["contentBack"] === "") post["long"] = false;
            else post["long"] = true;
            post["profilePic"] = "https://picsum.photos/200/200";
            post["contentPic"] = "https://picsum.photos/360/360";
            this.feed = post;
            this.$refs.modal.open();
        },
        isImage(imgContent) {
            return imgContent !== undefined
        },
        imageUrl(imgContent) {
            if (imgContent === undefined) return "https://picsum.photos/200/200";
            if (imgContent.slice(0, 4) === "http") {
                return imgContent;
            } else return "https://picsum.photos/200/200";
        },
        postTrimmed(content) {
            if (content.length < 10) return content
            else return content.slice(0, 8) + '...'
        }
        
    },
};
</script>

<style scoped>
.created-tag {
    position: absolute;
    color: white;
    background: rgba(16, 16, 16, 0.3);
    border-radius: 2.42vw;
    transform:translateY(10vh);
    padding: 0.1em 0.5em 0.1em;
    margin-left: 0.2em; 
}
</style>
