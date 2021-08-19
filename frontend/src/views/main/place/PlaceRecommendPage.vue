<template>
    <div class="whole-wrap-recommend">
        <div class="rec-mfti">
            <span class="rec-mfti-my">&nbsp;&nbsp;&nbsp;MFTI: {{ myMfti }}&nbsp;&nbsp;&nbsp;</span>
            <button class="rec-mfti-btn" type="button" v-on:click="goMfti">MFTI 검사하기 ></button>
        </div>
        <div class="rec-element" style="background-color:#7092D4">
            <div class="list-title">&nbsp;&nbsp;&nbsp;나와 입맛이 비슷한 유저가 다녀간 식당</div>
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
                                <p class="text-secondary" style="font-weight:300; line-height:30px">{{ reCommend[0].location }}</p>
                                <!-- <p v-if="reCommend[0].description != 'empty'">{{ reCommend[0].description }}</p> -->
                                <p>
                                    <span class="star-rate"><i class="far fa-star"></i>{{ reCommend[0].starRate.toFixed(0) }}</span
                                    >&nbsp;{{ reCommend[0].reviewContent }}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="carousel-item" v-if="reCommend[1]">
                        <div class="carousel-list">
                            <div class="carousel-list-header" v-on:click="goPlaceDetail(reCommend[1].id)">
                                <p style="font-weight:500">{{ reCommend[1].name }}</p>
                                <p></p>
                            </div>
                            <div class="carousel-list-body">
                                <p class="text-secondary" style="font-weight:300; line-height:30px">{{ reCommend[1].location }}</p>
                                <p v-if="reCommend[1].description != 'empty'">{{ reCommend[1].description }}</p>
                                <p>
                                    <span class="star-rate"><i class="far fa-star"></i>{{ reCommend[1].starRate.toFixed(0) }}</span
                                    >&nbsp;{{ reCommend[1].reviewContent }}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="carousel-item" v-if="reCommend[2]">
                        <div class="carousel-list">
                            <div class="carousel-list-header" v-on:click="goPlaceDetail(reCommend[2].id)">
                                <p style="font-weight:500">{{ reCommend[2].name }}</p>
                                <p></p>
                            </div>
                            <div class="carousel-list-body">
                                <p class="text-secondary" style="font-weight:300; line-height:30px">{{ reCommend[2].location }}</p>
                                <p v-if="reCommend[2].description != 'empty'">{{ reCommend[2].description }}</p>
                                <p>
                                    <span class="star-rate"><i class="far fa-star"></i>{{ reCommend[2].starRate.toFixed(0) }}</span
                                    >&nbsp;{{ reCommend[2].reviewContent }}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="carousel-item" v-if="reCommend[3]">
                        <div class="carousel-list">
                            <div class="carousel-list-header" v-on:click="goPlaceDetail(reCommend[3].id)">
                                <p style="font-weight:500">{{ reCommend[3].name }}</p>
                                <p></p>
                            </div>
                            <div class="carousel-list-body">
                                <p class="text-secondary" style="font-weight:300; line-height:30px">{{ reCommend[3].location }}</p>
                                <p v-if="reCommend[3].description != 'empty'">{{ reCommend[3].description }}</p>
                                <p>
                                    <span class="star-rate"><i class="far fa-star"></i>{{ reCommend[3].starRate.toFixed(0) }}</span
                                    >&nbsp;{{ reCommend[3].reviewContent }}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="carousel-item" v-if="reCommend[4]">
                        <div class="carousel-list">
                            <div class="carousel-list-header" v-on:click="goPlaceDetail(reCommend[4].id)">
                                <p style="font-weight:500">{{ reCommend[4].name }}</p>
                                <p></p>
                            </div>
                            <div class="carousel-list-body">
                                <p class="text-secondary" style="font-weight:300; line-height:30px">{{ reCommend[4].location }}</p>
                                <p v-if="reCommend[4].description != 'empty'">{{ reCommend[4].description }}</p>
                                <p>
                                    <span class="star-rate"><i class="far fa-star"></i>{{ reCommend[4].starRate.toFixed(0) }}</span
                                    >&nbsp;{{ reCommend[4].reviewContent }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="rec-element" style="background-color:#9FD1EB">
            <div class="list-title">&nbsp;&nbsp;&nbsp;나와 입맛이 비슷한 유저들이 저장한 식당</div>
            <div id="carouselExampleIndicators2" class="carousel slide carousel-custom" data-bs-ride="carousel" v-if="reCommendAdd">
                <div class="carousel-indicators" style="margin-bottom:2px">
                    <button type="button" data-bs-target="#carouselExampleIndicators2" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators2" data-bs-slide-to="1" aria-label="Slide 2" v-if="reCommendAdd[1]"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators2" data-bs-slide-to="2" aria-label="Slide 3" v-if="reCommendAdd[2]"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators2" data-bs-slide-to="3" aria-label="Slide 3" v-if="reCommendAdd[3]"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators2" data-bs-slide-to="4" aria-label="Slide 4" v-if="reCommendAdd[4]"></button>
                </div>
                <div class="carousel-inner" style="height:100%">
                    <div class="carousel-item active" v-if="reCommendAdd[0]">
                        <div class="carousel-list">
                            <div class="carousel-list-header" v-on:click="goPlaceDetail(reCommendAdd[0].id)">
                                <p style="font-weight:500">{{ reCommendAdd[0].name }}</p>
                            </div>
                            <div class="carousel-list-body">
                                <p class="text-secondary" style="font-weight:300; line-height:30px">{{ reCommendAdd[0].location }}</p>

                                <p class="star-rate">
                                    <i class="far fa-star"></i>&nbsp;{{ reCommendAdd[0].starRate.toFixed(1) }}&nbsp;<span v-if="reCommendAdd[0].description != 'empty'" style="color:black">{{
                                        reCommendAdd[0].description
                                    }}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="carousel-item" v-if="reCommendAdd[1]">
                        <div class="carousel-list">
                            <div class="carousel-list-header" v-on:click="goPlaceDetail(reCommendAdd[1].id)">
                                <p style="font-weight:500">{{ reCommendAdd[1].name }}</p>
                            </div>
                            <div class="carousel-list-body">
                                <p class="text-secondary" style="font-weight:300; line-height:30px">{{ reCommendAdd[1].location }}</p>
                                <p class="star-rate">
                                    <i class="far fa-star"></i>&nbsp;{{ reCommendAdd[0].starRate.toFixed(1) }}&nbsp;<span v-if="reCommendAdd[1].description != 'empty'" style="color:black">{{
                                        reCommendAdd[1].description
                                    }}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="carousel-item" v-if="reCommendAdd[2]">
                        <div class="carousel-list">
                            <div class="carousel-list-header" v-on:click="goPlaceDetail(reCommendAdd[2].id)">
                                <p style="font-weight:500">{{ reCommendAdd[2].name }}</p>
                            </div>
                            <div class="carousel-list-body">
                                <p class="text-secondary" style="font-weight:300; line-height:30px">{{ reCommendAdd[2].location }}</p>
                                <p class="star-rate">
                                    <i class="far fa-star"></i>&nbsp;{{ reCommendAdd[2].starRate.toFixed(1) }}&nbsp;<span v-if="reCommendAdd[2].description != 'empty'" style="color:black">{{
                                        reCommendAdd[2].description
                                    }}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="carousel-item" v-if="reCommendAdd[3]">
                        <div class="carousel-list">
                            <div class="carousel-list-header" v-on:click="goPlaceDetail(reCommendAdd[3].id)">
                                <p style="font-weight:500">{{ reCommendAdd[3].name }}</p>
                            </div>
                            <div class="carousel-list-body">
                                <p class="text-secondary" style="font-weight:300; line-height:30px">{{ reCommendAdd[3].location }}</p>
                                <p class="star-rate">
                                    <i class="far fa-star"></i>&nbsp;{{ reCommendAdd[3].starRate.toFixed(1) }}&nbsp;<span v-if="reCommendAdd[3].description != 'empty'" style="color:black">{{
                                        reCommendAdd[3].description
                                    }}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="carousel-item" v-if="reCommendAdd[4]">
                        <div class="carousel-list">
                            <div class="carousel-list-header" v-on:click="goPlaceDetail(reCommendAdd[4].id)">
                                <p style="font-weight:500">{{ reCommendAdd[4].name }}</p>
                            </div>
                            <div class="carousel-list-body">
                                <p class="text-secondary" style="font-weight:300; line-height:30px">{{ reCommendAdd[4].location }}</p>
                                <p class="star-rate">
                                    <i class="far fa-star"></i>&nbsp;{{ reCommendAdd[4].starRate.toFixed(1) }}&nbsp;<span v-if="reCommendAdd[4].description != 'empty'" style="color:black">{{
                                        reCommendAdd[4].description
                                    }}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="rec-element" style="background-color:#D2E9F5; margin-bottom:66px">
            <div class="list-title">&nbsp;&nbsp;&nbsp;나와 입맛이 비슷한 유저들이 저장한 목록</div>
            <div id="carouselExampleIndicators3" class="carousel slide carousel-custom" data-bs-ride="carousel" v-if="reCommendList">
                <div class="carousel-indicators" style="margin-bottom:2px">
                    <button type="button" data-bs-target="#carouselExampleIndicators3" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators3" data-bs-slide-to="1" aria-label="Slide 2" v-if="reCommendList[1]"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators3" data-bs-slide-to="2" aria-label="Slide 3" v-if="reCommendList[4]"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators3" data-bs-slide-to="3" aria-label="Slide 4" v-if="reCommendList[2]"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators3" data-bs-slide-to="4" aria-label="Slide 5" v-if="reCommendList[3]"></button>
                </div>
                <div class="carousel-inner" style="height:100%">
                    <div class="carousel-item active" v-if="reCommendList[0]">
                        <div class="carousel-list">
                            <div class="carousel-list-header" v-on:click="goPlaceListDetail(reCommendList[0].id)">
                                <p style="font-weight:500">{{ reCommendList[0].title }}</p>
                            </div>
                            <div class="carousel-list-body">
                                <p class="text-secondary" style="font-weight:300; line-height:30px">{{ reCommendList[0].totalItemCnt }}개 장소</p>
                                <p>
                                    {{ reCommendList[0].nickname }}<span v-if="reCommendList[0].contributorCnt">외 {{ reCommendList[0].contributorCnt }}명</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="carousel-item" v-if="reCommendList[1]">
                        <div class="carousel-list">
                            <div class="carousel-list-header" v-on:click="goPlaceListDetail(reCommendList[1].id)">
                                <p style="font-weight:500">{{ reCommendList[1].title }}</p>
                            </div>
                            <div class="carousel-list-body">
                                <p class="text-secondary" style="font-weight:300; line-height:30px">{{ reCommendList[1].totalItemCnt }}개 장소</p>
                                <p>
                                    {{ reCommendList[1].nickname }}<span v-if="reCommendList[1].contributorCnt">외 {{ reCommendList[1].contributorCnt }}명</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="carousel-item" v-if="reCommendList[2]">
                        <div class="carousel-list">
                            <div class="carousel-list-header" v-on:click="goPlaceListDetail(reCommendList[2].id)">
                                <p style="font-weight:500">{{ reCommendList[2].title }}</p>
                            </div>
                            <div class="carousel-list-body">
                                <p class="text-secondary" style="font-weight:300; line-height:30px">{{ reCommendList[2].totalItemCnt }}개 장소</p>
                                <p>
                                    {{ reCommendList[2].nickname }}<span v-if="reCommendList[2].contributorCnt">외 {{ reCommendList[2].contributorCnt }}명</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="carousel-item" v-if="reCommendList[3]">
                        <div class="carousel-list">
                            <div class="carousel-list-header" v-on:click="goPlaceListDetail(reCommendList[3].id)">
                                <p style="font-weight:500">{{ reCommendList[3].title }}</p>
                            </div>
                            <div class="carousel-list-body">
                                <p class="text-secondary" style="font-weight:300; line-height:30px">{{ reCommendList[3].totalItemCnt }}개 장소</p>
                                <p>
                                    {{ reCommendList[3].nickname }}<span v-if="reCommendList[3].contributorCnt">외 {{ reCommendList[3].contributorCnt }}명</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="carousel-item" v-if="reCommendList[4]">
                        <div class="carousel-list">
                            <div class="carousel-list-header" v-on:click="goPlaceListDetail(reCommendList[4].id)">
                                <p style="font-weight:500">{{ reCommendList[4].title }}</p>
                            </div>
                            <div class="carousel-list-body">
                                <p class="text-secondary" style="font-weight:300; line-height:30px">{{ reCommendList[4].totalItemCnt }}개 장소</p>
                                <p>
                                    {{ reCommendList[4].nickname }}<span v-if="reCommendList[4].contributorCnt">외 {{ reCommendList[4].contributorCnt }}명</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PlaceApi from "@/apis/PlaceApi.js";
import MftiApi from "@/apis/MftiApi.js";
export default {
    components: {},
    data: () => {
        return {
            myMfti: "",
            recommendDefault: [
                {
                    id: 16626,
                    name: "이도곰탕 본점",
                    location: "서울특별시 강남구 논현로94길 29-5",
                    starRate: 5.0,
                    reviewCnt: 1,
                    reviewContent: "국물이 정말 맛있습니다 :/",
                },
                {
                    id: 16586,
                    name: "육전식당 4호점",
                    location: "서울특별시 강남구 테헤란로8길 11-4",
                    starRate: 5.0,
                    reviewCnt: 1,
                    reviewContent: "직원분이 고기를 구워 주십니다! 항정살 꼭 드세요 ㅎㅎ",
                },
                {
                    id: 16583,
                    name: "대우부대찌개 강남본점",
                    location: "서울특별시 강남구 테헤란로25길 34",
                    starRate: 5.0,
                    reviewCnt: 1,
                    reviewContent: "양이 많아요 ! 부대찌개는 역시 짜게 먹어야 제 맛",
                },
            ],
        };
    },
    created() {
        window.scrollTo(0, 0);
        PlaceApi.requestPlaceRecommend().catch((e) => {
            // window.swal(e.response.data.message);
            console.log(e)
        });
        PlaceApi.requestPlaceListRecommend();
        MftiApi.getMftiResult().then((res) => {
            this.myMfti = res.data.data.userAsAnimal;
        });
    },
    computed: {
        reCommend() {
            if (!this.$store.getters.placeRecommendData.similarUserVisited || this.$store.getters.placeRecommendData.similarUserVisited.length === 0) return this.recommendDefault;
            return this.$store.getters.placeRecommendData.similarUserVisited;
        },
        reCommendAdd() {
            return this.$store.getters.placeRecommendData.recentlyAdded;
        },
        reCommendList() {
            return this.$store.getters.placelistRecommendData;
        },
    },
    methods: {
        goPlaceDetail(placeId) {
            this.$router.push({ name: "PlaceDetail", params: { id: placeId } });
        },
        goPlaceListDetail(placelistId) {
            this.$router.push({ name: "PlaceListDetail", params: { id: placelistId } });
        },
        goMfti() {
            this.$router.push({ name: "MftiPage" });
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
    font-size: 16px;
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
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.carousel-list-body {
    width: 90%;
    height: 50%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 13px;
    letter-spacing: -0.5px;
}
.rec-mfti {
    display: flex;
    width: 100%;
    background-color: #f5fdd7;
    margin-bottom: 10px;
}

.rec-mfti-my {
    color: black;
    font-size: 15px;
}
.rec-mfti-btn {
    color: white;
    text-decoration: none;
    border-radius: 5px;
    background: orange;
    /* text-align:center; */
    padding: 0.2em 0.5em 0.2em;
    box-shadow: 0.1em 0.1em 0.3em #999;
    /* margin-right: 2em; */
    /* float:right; */
    text-align: center;
}
.star-rate {
    color: yellowgreen;
}
@media screen and (min-width: 900px) {
    .whole-wrap-recommend {
        width: 500px;
        float: none;
        margin-left: auto;
        margin-right: auto;
    }
}
</style>
