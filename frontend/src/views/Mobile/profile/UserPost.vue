<template>
    <div>
        <SweetModal ref="modal">    
            <FeedDetail :feed="feed"/>
        </SweetModal>
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
import FeedDetail from '@/views/Mobile/home/FeedDetail2'
export default {
    components: {
        SweetModal,
        FeedDetail,
    },
    data() {
        return {
            feed: {},
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
            console.log(this.feed)

            this.$refs.modal.open();
        }
    },
}
</script>

<style>

</style>