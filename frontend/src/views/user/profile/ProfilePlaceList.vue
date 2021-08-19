<template>
    <div>
        <div v-if="isEmpty">
            <EmptyContent data="맛집 리스트가" />
        </div>
        <!-- <div class="row shadow p-3 mb-3 select-box" v-for="my in placeList" :key="my.id">
            <div class="d-flex justify-content-between" v-on:click="clickPlaceListDetail(my)">
                <div>{{ my.title }}</div>
                <div><i class="fas fa-map-marker-alt"></i> {{ my.totalItemCnt }}</div>
            </div>
        </div> -->
        <div v-for="(list, idx) in placeList" :key="idx" @click="clickPlaceListDetail(list)" class="list-wrap">
            <h1 class="list-title">{{ list.title }}</h1>
            <div class="list-description">
                <!-- <div>
                    <img v-for="(src, srcIdx) in list.contributorProfiles" :key="srcIdx" :src="src" class="profile-img">
                    {{ contributors[idx] }}
                </div> -->
                {{ list.totalItemCnt }}곳
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

<style scoped>
.list-wrap {
    height: 100px;
    border: 0.5px solid #FF993C;
    border-radius: 10px;
    box-shadow: 2px 3px #C4C4C4;
    background-color: white;
    margin: 20px 0;
    padding: 15px 18px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.list-title {
    font-size: 16px;
    font-weight: bold;
}
.list-description {
    display: flex;
    justify-content: space-between;
}
.profile-img {
    height: 25px;
    width: 25px;
    border-radius: 100%;
}
</style>
