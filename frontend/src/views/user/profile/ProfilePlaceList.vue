<template>
    <div>
        <div v-if="isEmpty">
            <EmptyContent data="맛집 리스트가" />
        </div>
        <div v-for="(list, idx) in placeList" :key="idx" @click="clickPlaceListDetail(list)" class="list-wrap">
            <h1 class="list-title">{{ list.title }}</h1>
            <!-- {{ dateTruncated(list.createDate)}} -->
            <div class="list-description">
                <div>
                   <span class=""><i class="fas fa-user-tie"></i>&nbsp;{{list.nickname }}</span>
                </div>
                <span class="text-black-50">기여도 : {{list.contrubuteItemCnt }} / {{ list.totalItemCnt }}</span>    
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
        dateTruncated(date) {
            return date.split(' ')[0]
        }
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
