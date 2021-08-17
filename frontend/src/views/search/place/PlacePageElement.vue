<template>
    <div>
        <div class="border py-2 px-2" v-on:click="clickRestaurant(placeId)">
            <div class="d-flex">
                <div class="mx-1">
                    <img class="img-restaurant" :src="restaurant.image" onerror="restmb_idxmake.jpg" />
                </div>
                <div class="ms-2 col-8">
                    <div class="head-font"></div>
                    <div>
                        <p style="font-size:1.2em; font-weight:500;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;">{{ restaurant.name }}</p>
                        <p style="font-size:0.9em; color: #363636;"><i class="fas fa-star" style="color: #F4A261"></i> {{ starRate(restaurant) }}</p>
                        <p style="font-size:0.9em; color: #363636;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;">
                            {{ locTruncated(restaurant.location) }}
                        </p>
                        <p style="font-size:0.9em; color: #888888;">{{ restaurant.phone }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Mychelin from "@/apis/Mychelin";
export default {
    props: {
        data: Object,
    },
    data() {
        return {
            restaurant: this.data.restaurant,
            page: this.data.page,
        };
    },
    methods: {
        starRate(restaurant) {
            if (restaurant.reviewCnt === 0) return "미평가";
            else return `${restaurant.starRate}(${restaurant.reviewCnt})`;
        },
        clickRestaurant(id) {
            if (this.page === "main") this.$router.push({ name: "PlaceDetail", params: { id: id } });
            else if (this.page === "mychelin") {
                let params = {
                    listId: this.data.listId,
                    placeId: {
                        placeId: id,
                    },
                };
                Mychelin.addMychelinRestaurant(params)
                    .then((res) => {
                        window.swal("맛집리스트 추가 완료!").then(() => {
                            window.location.reload();
                            // this.$router.go();
                        });
                    })
                    .catch((err) => {
                        window.swal("이미 추가된 맛집입니다.");
                    });
            }
        },
        locTruncated(location) {
            if (location.length <= 27) return location;
            else return location.slice(0, 24) + "...";
        },
    },
    computed: {
        placeId() {
            return this.restaurant.id || this.restaurant.placeId; // 두개중에 한개가 진짜
        },
    },
};
</script>

<style scoped>
.img-restaurant {
    position: relative;
    width: 13vh;
    height: 13vh;
    border-radius: 0.5em;
}

.head-font {
    /* position: absolute; */
    font-family: Spoqa Han Sans Neo;
    font-style: normal;
    font-weight: normal;
    font-size: 1.2em;
    line-height: 25px;
    /* or 104% */
    display: flex;
    align-items: center;

    color: #000000;
}
</style>
