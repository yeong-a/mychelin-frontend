<template>
    <div class="whole-wrap-recommend">
        <div class="rec-element" style="background-color:#7092D4">
            <div class="list-title">&nbsp;&nbsp;&nbsp;나와 입맛이 비슷한 유저가 기록한 식당</div>
            <div id="carouselExampleIndicators" class="carousel slide carousel-custom" data-bs-ride="carousel" v-if="reCommend">
                <div class="carousel-indicators" style="margin-bottom:2px">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2" v-if="reCommend[1]"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3" v-if="reCommend[2]"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 3" v-if="reCommend[3]"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="4" aria-label="Slide 4" v-if="reCommend[4]"></button>
                </div>
                <div class="carousel-inner" style="height:100%">
                    <div class="carousel-item active" v-if="reCommend[0]">
                        <div class="carousel-list">
                            <div class="carousel-list-header" v-on:click="goPlaceDetail(reCommend[0].id)">
                                <p style="font-weight:500">{{ reCommend[0].name }}</p>
                                <p></p>
                            </div>
                            <div class="carousel-list-body">
                                <p class="text-secondary" style="font-weight:300; line-height:25px">{{ reCommend[0].location }}</p>
                                <p v-if="reCommend[0].description != 'empty'">{{ reCommend[0].description }}</p>
                                <p>({{ reCommend[0].starRate }})&nbsp;{{ reCommend[0].reviewContent }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="carousel-item" v-if="reCommend[1]">
                        <div class="carousel-list">
                            글자글자
                        </div>
                    </div>
                    <div class="carousel-item" v-if="reCommend[2]">
                        <div class="carousel-list"></div>
                    </div>
                    <div class="carousel-item" v-if="reCommend[3]">
                        <div class="carousel-list">
                            글자글자
                        </div>
                    </div>
                    <div class="carousel-item" v-if="reCommend[4]">
                        <div class="carousel-list">
                            글자글자
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="rec-element" style="background-color:#9FD1EB">
            <div class="list-title">&nbsp;&nbsp;&nbsp;나와 비슷한 유저들이 추천한 식당</div>
        </div>
        <div class="rec-element" style="background-color:#D2E9F5; margin-bottom:66px"></div>
    </div>
</template>

<script>
import PlaceApi from "@/apis/PlaceApi.js";
import axios from "axios";
export default {
    data: () => {
        return {
            recommend: [],
        };
    },
    created() {
        window.scrollTo(0, 0);
        PlaceApi.requestPlaceRecommend();
        /*if ("geolocation" in navigator) {
            // 위치정보 사용 가능 
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    console.log(position.coords.latitude, position.coords.longitude);
                    axios
                        .get(`http://i5a206.p.ssafy.io:8080/place/coordinate?lat=${position.coords.latitude}&lng=${position.coords.longitude}`)
                        .then((res) => {
                            console.log(res);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                },
                (err) => {
                    let lat = 37.501308; // 위도
                    let lng = 127.039607; // 경도
                    axios
                        .get(`http://i5a206.p.ssafy.io:8080/place/coordinate?lat=${lat}&lng=${lng}`)
                        .then((res) => {
                            console.log(res);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
            );
        } else {
            // 위치정보 사용 불가능 
        }*/
    },
    computed: {
        reCommend() {
            return this.$store.getters.placeRecommendData.data;
        },
    },
    methods: {
        goPlaceDetail(placeId) {
            this.$router.push({ name: "PlaceDetail", params: { id: placeId } });
        },
    },
};
</script>

<style scoped>
.whole-wrap-recommend {
    margin-top: 55.6px;
}
.rec-element {
    width: 100%;
    height: 200px;
    margin-bottom: 10px;
    position: relative;
}
.list-title {
    font-size: 18px;
    font-weight: 500;
    color: white;
    line-height: 40px;
}
.carousel-custom {
    width: 100%;
    height: 75%;
    position: absolute;
    bottom: 0;
}
.carousel-item {
    width: 100%;
    height: 100%;
}
.carousel-list {
    width: 86%;
    height: 80%;
    background-color: white;
    margin-left: 7%;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.carousel-list-header {
    width: 90%;
    height: 40%;
    display: flex;
    justify-content: space-between;
    font-size: 18px;
    padding-top: 14px;
}
.carousel-list-body {
    width: 90%;
    height: 50%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 12px;
}
</style>
