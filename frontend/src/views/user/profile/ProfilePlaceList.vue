<template>
    <div>
        <div v-if="isEmpty">
            <EmptyContent data="맛집 리스트" />
        </div>
        <div class="row shadow p-3 mb-3 select-box" v-for="my in mychelin" :key="my.id">
            <div class="d-flex justify-content-between" v-on:click="clickMychelinDetail(my.placeListId)">
                <div>{{ my.title }}</div>
                <div><i class="fas fa-map-marker-alt"></i> {{ my.totalItemCnt }}</div>
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
        mychelin: Array
    },
    methods: {
        clickMychelinDetail(id) {
            this.$router.push({ name: 'Mychelin', params: { id: id }})
        },
    },
    
    computed: {
        isEmpty() {
            return this.mychelin.length === 0
        }
    }    
}
</script>

<style scoped>
.select-box {
    /* height: 8vh; */
    border-radius: 2em;
    background-color: #facfa4;
    opacity: 0.9;
    color: #333;
    font-weight: 700;
}
</style>