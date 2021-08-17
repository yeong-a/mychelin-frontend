<template>
    <div class="whole-wrap-recommend">
        <div class="rec-element" style="background-color:#7092D4">
            <div class="list-title">&nbsp;&nbsp;&nbsp;유저들이 최근에 저장한 식당</div>
            <div id="carouselExampleIndicators" class="carousel slide carousel-custom" data-bs-ride="carousel">
                <div class="carousel-indicators" style="margin-bottom:2px">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 3"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="4" aria-label="Slide 4"></button>
                </div>
                <div class="carousel-inner" style="height:100%">
                    <div class="carousel-item active">
                        <div class="carousel-list">
                            <div class="carousel-list-header">
                                <p style="font-weight:500">식당이름</p>
                                <p>식당아이콘</p>
                            </div>
                            <div class="carousel-list-body">
                                <p class="text-secondary" style="font-weight:300">식당위치위치위치위치위위치치치치위위치취</p>
                                <p>식당설명설명설명설명설명설명엄청긴설명</p>
                            </div>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <div class="carousel-list">
                            글자글자
                        </div>
                    </div>
                    <div class="carousel-item">
                        <div class="carousel-list"></div>
                    </div>
                    <div class="carousel-item">
                        <div class="carousel-list">
                            글자글자
                        </div>
                    </div>
                    <div class="carousel-item">
                        <div class="carousel-list">
                            글자글자
                        </div>
                    </div>
                </div>
                <!-- <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button> -->
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
export default {
    data: () => {
        return;
    },
    created() {
        PlaceApi.requestPlaceRecommend();
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
    font-size: 20px;
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
    width: 76%;
    height: 80%;
    background-color: white;
    margin-left: 12%;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.carousel-list-header {
    width: 80%;
    height: 50%;
    display: flex;
    justify-content: space-between;
    font-size: 20px;
    padding-top: 20px;
}
.carousel-list-body {
    width: 80%;
    height: 50%;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
