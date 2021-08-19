<template>
    <div>
        <div v-if="isEmpty">
            <EmptyContent data="맛집 리스트가" />
        </div>
        <div class="row shadow p-3 mb-3 select-box" v-for="my in placeList" :key="my.id">
            <div class="d-flex justify-content-between" v-on:click="clickPlaceListDetail(my)">
                <div>{{ my.title }}</div>
                <div><i class="fas fa-map-marker-alt"></i> {{ my.totalItemCnt }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import EmptyContent from "@/components/error/EmptyContent";
export default {
    components: {
        EmptyContent,
    },
    props: {
        placeList: Array,
    },
    methods: {
        clickPlaceListDetail(my) {
            this.$router.push({ name: "PlaceListDetail", params: { id: my.placeListId } });
        },
    },

    computed: {
        isEmpty() {
            return this.placeList.length === 0;
        },
    },
};
</script>

<style scoped></style>
