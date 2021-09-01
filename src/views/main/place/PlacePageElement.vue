<template>
    <div>
        <div class="border-top py-2 px-2">
            <div class="d-flex">
                <div class="mx-1" v-on:click="clickRestaurant(placeId)">
                    <img class="img-restaurant" :src="restaurant.image" onerror="restmb_idxmake.jpg" />
                </div>
                <div class="ms-2 col-8">
                    <div class="head-font"></div>
                    <div class="">
                        <div class="d-flex justify-content-between">
                            <div class="overflow-hidden" style="font-size:1.2em; font-weight:500;"
                            v-on:click="clickRestaurant(placeId)">{{ restaurant.name }}</div>
                            <div class="delete-text" v-on:click="deletePlace(placeId)" v-if="isMyPlace">삭제</div>
                        </div>
                        <!-- <p class="overflow-hidden" style="font-size:1.2em; font-weight:500;">{{ restaurant.name }}</p> -->
                        <div v-on:click="clickRestaurant(placeId)">
                            <p style="font-size:0.9em; color: #363636;"><i class="fas fa-star" style="color: #F4A261"></i> {{ starRate(restaurant) }}</p>
                            <p class="overflow-hidden" style="font-size:0.9em; color: #363636;">
                                <!-- {{ locTruncated(restaurant.location) }} -->
                                {{ restaurant.location }}
                            </p>
                            <p style="font-size:0.9em; color: #888888;">{{ restaurant.phone }}</p>
                        </div>
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
            //console.log('id', id)
            if (this.page === "main" || this.page === "placeList") this.$router.push({ name: "PlaceDetail", params: { id: id } });
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
        deletePlace(id) {
            if (this.page === "placeList") {
                let params = {
                    listId: this.restaurant.placeListId,
                    placeId: {
                        placeId: id,
                    },
                };
                window
                    .swal({
                        // title: "",
                        text: "해당 식당을 맛집리스트에서 삭제할까요?",
                        buttons: true,
                        dangerMode: true,
                    })
                    .then((willDelete) => {
                        if (willDelete) {
                            Mychelin.deleteMychelinRestaurant(params)
                            .then((res) => {
                                this.$router.go();
                            })
                        } 
                    });
            }
            
        }
    },
    computed: {
        placeId() {
            return this.restaurant.id || this.restaurant.placeId; // 두개중에 한개가 진짜
        },
        isMyPlace() {
            return localStorage.getItem('nickname') === this.restaurant.nickname
        }
    },
};
</script>

<style scoped>
.img-restaurant {
    position: relative;
    width: 7em;
    height: 7em;
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
.delete-text {
    color: #bdbdbd;
}
.div-border {

}
</style>
