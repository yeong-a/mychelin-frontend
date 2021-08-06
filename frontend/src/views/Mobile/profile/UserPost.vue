<template>
    <div>
        <SweetModal ref="modal">    
            <FeedDetail :feed="feed"/>
        </SweetModal>
        <div v-if="isEmpty">
            <EmptyContent data="포스트" />
        </div>
        <div class="row row-cols-4 g-1">
            <div class="col" v-for="post in posts" v-bind:key="post.id">
                <div v-on:click="openModal(post)">
                <img class="img-full" src="https://picsum.photos/200/200" />
                </div>
                <!-- <div>{{post.title}}</div> -->
                <!-- <div class="info-extra">{{post.created}}</div> -->
            </div>
        </div>
    </div>
</template>

<script>
import { SweetModal } from 'sweet-modal-vue'
import EmptyContent from '@/components/error/EmptyContent'
import FeedDetail from '@/views/Mobile/home/FeedDetail'
export default {
    components: {
        SweetModal,
        EmptyContent,
        FeedDetail,
    },
    data() {
        return {
            feed: {},
        }
    },
    computed: {
        isEmpty() {
            return this.posts.length === 0
        }
    },
    props: {
    posts: Array
    },
    methods: {
        openModal(post) {
            // post 자세히보기 등 추가
            post['contentFront'] = post['content'].slice(0, 100)
            post['contentBack'] = post['content'].slice(100,)
            if (post['contentBack'] === "") post['long'] = false;
            else post['long'] = true;
            post['profilePic'] = 'https://picsum.photos/200/200';
            post['contentPic'] = 'https://picsum.photos/360/360'
            this.feed = post;
            this.$refs.modal.open();
        }
    },
}
</script>

<style>

</style>