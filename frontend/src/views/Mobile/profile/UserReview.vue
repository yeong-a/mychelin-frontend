<template>
    <div>
        <div class="row border-bottom p-3" v-for="post in posts" v-bind:key="post.id">   
            <div class="col-9 justify-content-between">
                <div class="d-flex justify-content-between"> 
                    <p style="color:#F4A261;"><i class="fas fa-star"></i> {{ post.starRate }}</p>
                    <span style="color:#C4C4C4;">{{ onlyDate(post.craeteDate).slice(2,10) }}</span>
                </div>
                <div>
                     <p >{{ post.content }}</p>
                </div>
            </div>
            <div class="col-2 ">
                <img class="img-full-round" :src="post.placeImage" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        posts: Array
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