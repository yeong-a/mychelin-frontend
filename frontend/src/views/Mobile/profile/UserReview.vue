<template>
    <div>
        <div v-if="isEmpty">
            <EmptyContent data="리뷰" />
        </div>
        <div class="row border-bottom p-3" v-for="post in posts" v-bind:key="post.id">   
            <div class="col-9 d-flex justify-content-between">
                <div>
                    <p><i class="fas fa-star"></i> {{ post.starRate }}</p>
                    <p>{{ post.content }}</p>
                </div>
                <div>
                    {{ onlyDate(post.craeteDate) }}
                </div>
            </div>
            <div class="col-3 ">
                <img class="img-full-round" :src="post.placeImage" />
            </div>
        </div>
    </div>
</template>

<script>
import EmptyContent from '@/components/error/EmptyContent'
export default {
    components: {
        EmptyContent
    },
    props: {
        posts: Array
    },
    computed: {
        isEmpty() {
            return this.posts.length === 0
        }
    },
    methods: {
        onlyDate(datetime) {
            return datetime.split(' ')[0]
        },
    }
}
</script>

<style>

</style>