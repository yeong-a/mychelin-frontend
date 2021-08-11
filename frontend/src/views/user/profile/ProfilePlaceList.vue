<template>
    <div>
        <div v-if="isEmpty">
            <EmptyContent data="맛집 리스트" />
        </div>
        <div class="row shadow p-3 mb-3 select-box" v-for="my in mychelin" :key="my.id">
            <div class="d-flex justify-content-between" v-on:click="clickMychelinDetail(my)">
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
        clickMychelinDetail(my) {
            this.$router.push({ name: 'PlaceListDetail', params: { id: my.placeListId, name: my.title }})
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
</style>