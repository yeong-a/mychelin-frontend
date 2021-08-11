<template>
    <div>
        <ReturnNav :inputTxt="placedata.name" />

        <div class="place-info">
            <div class="place-img"><img class="place-img-src" :src="placedata.image" /></div>
            <div class="place-profile">
                <div class="placedata-name">{{ placedata.name }}</div>
                <div class="placedata-phone">{{ placedata.phone }}</div>
                <div class="placedata-location">{{ placedata.location }}</div>
                <div class="pacedata-oper" v-on:click="operationhour(placedata.operationHours)">
                    {{ placedata.operationHours }}
                </div>
            </div>
            <div>
                <button type="button" v-on:click="bookmark">
                    <div v-show="!isBookmarked">
                        <i class="far fa-bookmark"></i>
                    </div>
                    <div v-show="isBookmarked">
                        <i class="fas fa-bookmark"></i>
                    </div>
                </button>
            </div>
        </div>

        <div id="place-map"></div>

        <div class="place-tap">
            <button type="button" v-on:click="changetapreview" class="tap-review">
                <span style="width:30%;height:50%;border-radius:20px" v-bind:class="{ 'selected-tap': currenttap === 1 }">리뷰</span>
            </button>
            <button type="button" v-on:click="changetapreviewwrite">
                <span style="border-radius:20px" v-bind:class="{ 'selected-tap': currenttap === 2 }"><i class="fas fa-pen"></i>&nbsp;리뷰 작성하기</span>
            </button>
        </div>

        <div class="place-lists">
            <div v-if="currentTap === 1">
                <div class="place-reviews" v-if="placereviewdata.length === 0" style="color:rgba(0,0,0,0.5)">리뷰가 없어요<br />리뷰를 작성해 보세요!</div>
                <div class="place-reviews" v-for="reviewD in placereviewdata" v-bind:key="reviewD.reviewId">
                    <div class="place-review">
                        <div class="place-review-header">
                            <div class="review-user-name">
                                {{ reviewD.userNickname }}
                                <span
                                    style="font-weight: 300; font-size: 9px; line-height:30px; color:#C4C4C4;"
                                    v-if="mynickname === reviewD.userNickname"
                                    v-on:click="changetapedit(reviewD.reviewId, reviewD.content)"
                                    >&nbsp;&nbsp;수정</span
                                >
                                <span style="font-weight: 300; font-size: 9px; line-height:30px; color:#C4C4C4;" v-if="mynickname === reviewD.userNickname" v-on:click="deleteReview(reviewD.reviewId)"
                                    >&nbsp;&nbsp;삭제</span
                                >
                            </div>
                            <span style="font-weight: bold; font-size: 13px; line-height:30px; color:#F4A261;"><i class="far fa-star"></i>{{ reviewD.starRate.toFixed(1) }}</span>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <span style="font-weight: 300; font-size: 13px; line-height:30px; color:#C4C4C4;">{{ reviewD.craeteDate.slice(2, 10) }}</span>
                        </div>
                        <div class="place-review-body">{{ reviewD.content }}</div>
                    </div>

                    <div class="place-review-img-wrap">
                        <!--<img :src="reviewD.userProfileImage" onerror="this.style.display='none'" alt="" class="place-review-img" />-->
                        <img :src="reviewD.reviewImage" @error="reviewD.userProfileImage" alt="" class="place-review-img" />
                    </div>
                </div>
                <infinite-loading @infinite="infiniteHandler" spinner="waveDots" v-if="placereviewdata.length != 0"></infinite-loading>
            </div>

            <div v-if="currentTap === 2">
                <div class="place-review-write">
                    <div style="display:flex">
                        <div class="review-star" style="font-size:18px; color:#F4A261; line-height:20px;">
                            <div>&nbsp;{{ ratings }}</div>
                            <input type="radio" id="5-stars" name="rating" value="5" v-model="ratings" />
                            <label for="5-stars" class="star pr-4">★</label>
                            <input type="radio" id="4-stars" name="rating" value="4" v-model="ratings" />
                            <label for="4-stars" class="star">★</label>
                            <input type="radio" id="3-stars" name="rating" value="3" v-model="ratings" />
                            <label for="3-stars" class="star">★</label>
                            <input type="radio" id="2-stars" name="rating" value="2" v-model="ratings" />
                            <label for="2-stars" class="star">★</label>
                            <input type="radio" id="1-star" name="rating" value="1" v-model="ratings" />
                            <label for="1-star" class="star">★</label>
                        </div>
                        <button v-on:click="writeReview" type="button" style="margin-right:5px; font-size:16px; color:#FF742E">게시</button>
                    </div>

                    <textarea placeholder="리뷰를 작성해보세요!" id="" cols="30" rows="10" class="review-txtarea" v-bind:value="inputReview" v-on:input="updateReview"></textarea>
                </div>
            </div>

            <div v-if="currentTap === 3">
                <div class="place-review-write">
                    <div style="display:flex">
                        <div class="review-star" style="font-size:18px; color:#F4A261; line-height:20px;">
                            <div>&nbsp;{{ ratings }}</div>
                            <input type="radio" id="5-stars" name="rating" value="5" v-model="ratings" />
                            <label for="5-stars" class="star pr-4">★</label>
                            <input type="radio" id="4-stars" name="rating" value="4" v-model="ratings" />
                            <label for="4-stars" class="star">★</label>
                            <input type="radio" id="3-stars" name="rating" value="3" v-model="ratings" />
                            <label for="3-stars" class="star">★</label>
                            <input type="radio" id="2-stars" name="rating" value="2" v-model="ratings" />
                            <label for="2-stars" class="star">★</label>
                            <input type="radio" id="1-star" name="rating" value="1" v-model="ratings" />
                            <label for="1-star" class="star">★</label>
                        </div>
                        <button v-on:click="writeEditReview" type="button" style="margin-right:5px; font-size:16px; color:#FF742E">수정</button>
                    </div>

                    <textarea placeholder="" id="" cols="30" rows="10" class="review-txtarea" v-bind:value="editReview" v-on:input="updateeditReview"></textarea>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ReturnNav from "@/components/user/ReturnNav.vue";
import PlaceApi from "@/apis/PlaceApi.js";
import BookmarkApi from "@/apis/BookmarkApi";
import dotenv from "dotenv";
import InfiniteLoading from "vue-infinite-loading";

export default {
    components: {
        ReturnNav,
        InfiniteLoading,
    },
    data: () => {
        return {
            currenttap: 1,
            currentstar: 5,
            ratings: "4",
            inputReview: "",
            isReview: true,
            editReview: "",
            editReviewId: 0,
            currentPlaceName: "",
            currentPlaceLocation: "",
            isBookmarked: false,
            limit: 2,
        };
    },
    computed: {
        placedata() {
            return this.$store.getters.placeData;
        },
        placereviewdata() {
            return this.$store.getters.placeReviewData;
        },
        currentTap() {
            return this.currenttap;
        },
        returnStar() {
            return this.currentstar;
        },
        mynickname() {
            return localStorage.getItem("nickname");
        },
    },
    methods: {
        placeid() {
            return this.$route.params.id;
        },
        placename() {
            return this.$store.getters.placeData.name;
        },
        placeloca() {
            return [this.$store.getters.placeData.latitude, this.$store.getters.placeData.longitude];
        },
        operationhour(oh) {
            window.swal(oh);
        },
        changetapreview() {
            this.currenttap = 1;
        },
        changetapreviewwrite() {
            if (!localStorage.getItem("jwt") || !localStorage.getItem("nickname")) window.swal("로그인 후 이용해 주세요!");
            else this.currenttap = 2;
        },
        changetapedit(review_id, review_con) {
            this.editReview = review_con;
            this.editReviewId = review_id;
            this.currenttap = 3;
        },
        updateReview: function(e) {
            let updatedReview = e.target.value;
            this.inputReview = updatedReview;
        },
        updateeditReview: function(e) {
            let updatededitReview = e.target.value;
            this.editReview = updatededitReview;
        },
        writeReview() {
            let id = this.placeid();
            let { inputReview } = this;

            let data = {
                content: inputReview,
                placeId: id,
                starRate: Number(this.ratings),
                image: null,
            };
            PlaceApi.requestReviewWrite(
                data,
                (err) => {
                    window.swal("소중한 리뷰 감사합니다").then(() => {
                        this.$router.go();
                    });
                },
                (err) => {
                    window.swal("로그인 후 이용해 주세요!").then(() => {
                        this.$router.go();
                    });
                }
            );
        },
        writeEditReview() {
            let id = this.placeid();
            let review_id = this.editReviewId;
            let conten = this.editReview;

            if (!conten) return;

            let data = {
                content: conten,
                place_id: id,
                star_rate: Number(this.ratings),
                id: review_id,
            };

            PlaceApi.requestReviewEdit(
                data,
                (err) => {},
                (err) => {}
            );

            window.swal("리뷰를 수정했습니다.").then(() => {
                this.$router.go();
            });
        },
        deleteReview(id) {
            let review_id = id;

            let data = {
                id: review_id,
            };
            PlaceApi.requestReviewDelete(
                data,
                (err) => {},
                (err) => {}
            );

            window.swal("리뷰를 삭제했습니다.").then(() => {
                this.$router.go();
            });
        },
        initMap() {
            const container = document.querySelector("#place-map");
            const options = {
                center: new kakao.maps.LatLng(35.19656853772262, 129.0807270648317),
                level: 3,
            };
            const map = new kakao.maps.Map(container, options);
            /*const markerPosition = new kakao.maps.LatLng(35.19656853772262, 129.0807270648317);

            const marker = new kakao.maps.Marker({
                position: markerPosition
            });
            marker.setMap(map)*/

            this.currentPlaceName = this.placename();
            //this.currentPlaceLocation = this.placeloca();
            let lat = this.placeloca()[0],
                long = this.placeloca()[1];
            let latlng = new kakao.maps.LatLng(lat, long);
            var marker = new kakao.maps.Marker({
                map: map,
                position: latlng,
            });
            map.setCenter(latlng);
            //console.log(this.currentPlaceName);
            /*var geocoder = new kakao.maps.services.Geocoder();
            geocoder.adderrsSearch(`${this.currentPlaceLocation}`, function(errult, status) {
            //geocoder.adderrsSearch(`제주특별자치도 제주시 첨단로 242`, function(errult, status) {
                // 정상적으로 검색이 완료됐으면 
                if (status === kakao.maps.services.Status.OK) {
                    var coords = new kakao.maps.LatLng(errult[0].y, errult[0].x);
                    // 결과값으로 받은 위치를 마커로 표시합니다
                    var marker = new kakao.maps.Marker({
                        map: map,
                        position: coords
                    });
                    // 인포윈도우로 장소에 대한 설명을 표시합니다
                    var infowindow = new kakao.maps.InfoWindow({
                        //content: `<div style="width:150px;text-align:center;padding:6px 0;">${this.}</div>`
                    });
                    //infowindow.open(map, marker);
                    // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                    map.setCenter(coords);
                } 
            });*/
        },
        bookmark() {
            BookmarkApi.bookmarkPlaces(this.$route.params.id).then((res) => {
                this.isBookmarked = !this.isBookmarked;
            });
        },
        infiniteHandler($state) {
            let id = this.placeid();
            let data = {
                id: id,
                limit: this.limit,
            };
            PlaceApi.requestPlaceReviewIL(data)
                .then((response) => {
                    setTimeout(() => {
                        if (response.data.data.reviews.length) {
                            this.$store.commit("GET_PLACE_REVIEW_DATA_IL", response.data.data.reviews);
                            this.limit += 1;
                            $state.loaded();
                        } else {
                            $state.complete();
                        }
                    }, 1000);
                })
                .catch((err) => {
                    window.swal("", err.response.data, "error");
                });
        },
    },
    created() {
        let id = this.placeid();
        PlaceApi.requestPlace(
            id,
            function(err) {},
            (error) => {
                window.swal("삭제된 페이지입니다");
                this.$router.push({ name: "Main" });
            }
        );

        PlaceApi.requestPlaceReview(
            id,
            function(err) {},
            (error) => {}
        );

        BookmarkApi.requestBookmarkPlaces().then((res) => {
            let bookmarkPlacesIds = res.data.data.map((place) => place.placeId);
            if (bookmarkPlacesIds.includes(Number(this.$route.params.id))) this.isBookmarked = true;
        });
    },
    beforeMount() {},
    mounted() {
        if (window.kakao && window.kakao.maps) {
            window.setTimeout(this.initMap, 500);
        } else {
            dotenv.config();
            let API_KEY = process.env.VUE_APP_API_KEY;
            const script = document.createElement("script");
            script.onload = () => kakao.maps.load(this.initMap);
            script.src = `http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${API_KEY}&libraries=services`;
            document.head.appendChild(script);
        }
    },
    destroyed() {
        this.$store.commit("GET_PLACE_REVIEW_DATA", []);
    },
};
</script>

<style scoped>
.place-info {
    width: 100vw;
    height: 33.33vw;
    margin-top: 14.49vw;
    display: flex;
}
.place-img {
    width: 29.71vw;
    height: 33.33vw;
    display: flex;
    flex-direction: row-reverse;
}
.place-profile {
    width: 60%;
    height: 33.33vw;
    padding-left: 5%;
}
.placedata-name {
    width: 100%;
    font-size: 4.35vw;
    word-break: break-all;
    margin-bottom: 2.42vw;
}
.placedata-phone {
    width: 100%;
    font-size: 3.86vw;
    word-break: break-all;
    margin-bottom: 2.42vw;
}
.placedata-location {
    width: 100%;
    height: 25%;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 2.9vw;
    word-break: break-all;
}
.pacedata-oper {
    width: 100%;
    height: 25%;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 2.9vw;
    word-break: break-all;
    white-space: nowrap;
    color: #c4c4c4;
}
.tap-review {
    font-weight: 400;
    font-size: 3.86vw;
    line-height: 7.25vw;
}
.place-img-src {
    background-size: cover;
    width: 27vw;
    height: 27vw;
    border-radius: 0;
}

#place-map {
    width: 90%;
    margin-left: 5%;
    height: 35vw;
}
.selected-tap {
    background-color: rgba(255, 198, 180, 0.5);
}
.place-tap {
    width: 100vw;
    height: 9.66vw;
    margin-top: 4.35vw;
    display: flex;
    justify-content: space-around;
}
.place-tap button {
    width: 50%;
}
.place-lists {
    display: block;
    margin-left: 5%;
    width: 100vw;
}

.place-reviews {
    width: 90%;
    min-height: 21.98vw;
    display: flex;
    border-top: 1px solid rgba(0, 0, 0, 0.16);
}
.place-review {
    width: 83%;
    min-height: 21.98vw;
}
.place-review-body {
    width: 95%;
    font-weight: 300;
    font-size: 3.14vw;
    line-height: 4.83vw;
}
.place-review-header {
    height: 6.04vw;
    display: flex;
}
.review-user-name {
    width: 45vw;
    font-weight: bold;
    font-size: 3.62vw;
    line-height: 7.25vw;
}
.place-review-img {
    background-size: cover;
    width: 14.49vw;
    height: 14.49vw;
    /*border-radius: 50%;*/
}
.place-review-img-wrap {
    width: 14.49vw;
    min-height: 21.98vw;
    padding-top: 3.62vw;
    background-color: white;
}
.place-review-write {
    width: 90%;
    min-height: 21.98vw;
    border-top: 1px solid rgba(0, 0, 0, 0.16);
}
.review-star {
    width: 100%;
    height: 8.45vw;
    flex-direction: row-reverse;
    display: flex;
    justify-content: flex-end;
}
.review-star input {
    display: none;
}
.review-star label {
    margin-left: 0.72vw;
    -webkit-text-fill-color: transparent; /* Will override color (regardless of order) */
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: #f4a261;
    cursor: pointer;
}
.review-star :checked ~ label {
    -webkit-text-fill-color: #f4a261;
}
.review-star label:hover,
.review-star label:hover ~ label {
    -webkit-text-fill-color: #f4a261;
}
.review-txtarea {
    border: 1px solid rgba(0, 0, 0, 0.08);
    margin-top: 1px;
    padding-top: 3px;
    width: 100%;
    height: 43.48vw;
}
.review-txtarea::placeholder {
    color: #c4c4c4;
    font-weight: 300;
}
@media screen and (min-width: 500px) {
    .place-info {
        width: 414px;
        height: 138px;
        margin-top: 60px;
    }
    .place-img {
        width: 138px;
        height: 138px;
    }
    .place-profile {
        width: 60%;
        height: 138px;
    }
    .placedata-name {
        width: 100%;
        font-size: 18px;
        word-break: break-all;
        margin-bottom: 10px;
    }
    .placedata-phone {
        width: 100%;
        font-size: 16px;
        word-break: break-all;
        margin-bottom: 10px;
    }
    .placedata-location {
        width: 100%;
        height: 180px;
        font-size: 12px;
    }
    .pacedata-oper {
        width: 100%;
        height: 180px;
        font-size: 12px;
    }
    .tap-review {
        font-weight: 400;
        font-size: 16px;
        line-height: 30px;
    }
    .place-img-src {
        width: 100px;
        height: 100px;
        border-radius: 0;
    }

    #place-map {
        width: 370px;
        margin-left: 22px;
        height: 250px;
    }
    .place-tap {
        width: 414px;
        height: 40px;
        margin-top: 18px;
    }
    .place-lists {
        margin-left: 22px;
        width: 370px;
    }

    .place-reviews {
        width: 90%;
        min-height: 90px;
    }
    .place-review {
        width: 83%;
        min-height: 90px;
    }
    .place-review-body {
        width: 95%;
        font-size: 14px;
        line-height: 20px;
    }
    .place-review-header {
        height: 25px;
    }
    .review-user-name {
        width: 180px;
        font-size: 14px;
        line-height: 20px;
    }
    .place-review-img {
        width: 60px;
        height: 60px;
        /*border-radius: 50%;*/
    }
    .place-review-img-wrap {
        width: 60px;
        min-height: 90px;
        padding-top: 14px;
    }
    .place-review-write {
        width: 90%;
        min-height: 90px;
    }
    .review-star {
        width: 100%;
        height: 35px;
    }
    .review-star label {
        margin-left: 3px;
    }
    .review-txtarea {
        border: 1px solid rgba(0, 0, 0, 0.08);
        margin-top: 1px;
        padding-top: 3px;
        width: 100%;
        height: 180px;
    }
}
</style>
