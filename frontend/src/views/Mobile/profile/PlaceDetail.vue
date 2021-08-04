<template>
  <div>
        <div class="place-header">
            <ReturnNav :inputTxt="placedata.name"/>
        </div>

        <div class="place-info">
            <div class="place-img" style="width:29.71vw; height: 33.33vw; display:flex; flex-direction: row-reverse;"><img class="place-img-src" :src="placedata.image" /></div>
            <div class="place-profile" style="width:60%; height: 33.33vw; padding-left: 5%">
                <div style="width:100%; font-size:4.35vw; word-break:break-all; margin-bottom:2.42vw">{{ placedata.name }}</div>
                <div style="width:100%; font-size:3.86vw; word-break:break-all; margin-bottom:2.42vw">{{ placedata.phone }}</div>
                <div style="width:100%; height:25%; text-overflow: ellipsis; overflow: hidden; font-size:2.90vw; word-break:break-all;" >{{ placedata.location }}</div>
                <div style="width:100%; height:25%; text-overflow: ellipsis; overflow: hidden; font-size:2.90vw; word-break:break-all; white-space:nowrap; color:#C4C4C4" v-on:click="operationhour(placedata.operationHours)">{{ placedata.operationHours }}</div>
            </div>
            <div>
                <button type="button" v-on:click="bookmark"><i class="far fa-bookmark"></i></button>
            </div>
        </div>

        <div id="place-map">

        </div>

        <div class="place-tap">
            <button type="button" v-on:click="changetapreview" style="font-weight:400; font-size:3.86vw; line-height:7.25vw;">리뷰</button>
            <button type="button" v-on:click="changetapreviewwrite" ><i class="fas fa-pen"></i>&nbsp;리뷰 작성하기</button>
        </div>

        <div class="place-lists">
            <div v-if="currentTap === 1">
                <div class="place-reviews" v-if="placereviewdata.length === 0">리뷰가 없어요<br>리뷰를 작성해 보세요!</div>
                <div class="place-reviews" v-for="reviewD in placereviewdata" v-bind:key="reviewD.review_id">
                    <div class="place-review">
                        <div class="place-review-header">
                            <div style="width:45vw;font-weight: bold; font-size: 3.62vw; line-height:7.25vw;">{{reviewD.user_nickname}}
                                <span style="font-weight: 300; font-size: 3.14vw; line-height:7.25vw; color:#C4C4C4;" v-if="mynickname === reviewD.user_nickname" v-on:click="changetapedit(reviewD.review_id, reviewD.content)">&nbsp;&nbsp;수정</span>
                                <span style="font-weight: 300; font-size: 3.14vw; line-height:7.25vw; color:#C4C4C4;" v-if="mynickname === reviewD.user_nickname" v-on:click="deleteReview(reviewD.review_id)">&nbsp;&nbsp;삭제</span>
                            </div>
                            <span style="font-weight: bold; font-size: 3.38vw; line-height:7.25vw;; color:#F4A261;"><i class="far fa-star"></i>{{reviewD.star_rate.toFixed(1)}}</span>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <span style="font-weight: 300; font-size: 3.14vw; line-height:7.25vw; color:#C4C4C4;">{{reviewD.craete_date.slice(2,10)}}</span>
                        </div>
                        <div class="place-review-body">{{reviewD.content}}</div>
                    </div>

                    <div class="place-review-img-wrap" style="width:14.49vw; min-height: 21.98vw; padding-top:3.62vw;background-color:white;">
                        <img :src="reviewD.user_profile_image" onerror="this.style.display='none'" alt="" class="place-review-img">
                    </div>
                </div>
            </div>

            <div v-if="currentTap === 2">
                <div class="place-review-write">
                    <div style="display:flex">
                        <div class="review-star" style="font-size:4.83vw; color:#F4A261; line-height:7.25vw;">
                            <div>&nbsp;{{ratings}}</div>
                            <input type="radio" id="5-stars" name="rating" value="5" v-model="ratings"/>
                            <label for="5-stars" class="star pr-4">★</label>
                            <input type="radio" id="4-stars" name="rating" value="4" v-model="ratings"/>
                            <label for="4-stars" class="star">★</label>
                            <input type="radio" id="3-stars" name="rating" value="3" v-model="ratings"/>
                            <label for="3-stars" class="star">★</label>
                            <input type="radio" id="2-stars" name="rating" value="2" v-model="ratings"/>
                            <label for="2-stars" class="star">★</label>
                            <input type="radio" id="1-star" name="rating" value="1" v-model="ratings" />
                            <label for="1-star" class="star">★</label>
                        </div>
                        <button v-on:click="writeReview" type="button" style="margin-right:1.21vw; font-size:3.90vw; color:#FF742E">게시</button>
                    </div>

                    <textarea placeholder="리뷰를 작성해보세요!" id="" cols="30" rows="10" class="review-txtarea"
                        v-bind:value="inputReview" v-on:input="updateReview"></textarea>
                </div>
            </div>

            <div v-if="currentTap === 3">
                <div class="place-review-write">
                    <div style="display:flex">
                        <div class="review-star" style="font-size:4.83vw; color:#F4A261; line-height:7.25vw;">
                            <div>&nbsp;{{ratings}}</div>
                            <input type="radio" id="5-stars" name="rating" value="5" v-model="ratings"/>
                            <label for="5-stars" class="star pr-4">★</label>
                            <input type="radio" id="4-stars" name="rating" value="4" v-model="ratings"/>
                            <label for="4-stars" class="star">★</label>
                            <input type="radio" id="3-stars" name="rating" value="3" v-model="ratings"/>
                            <label for="3-stars" class="star">★</label>
                            <input type="radio" id="2-stars" name="rating" value="2" v-model="ratings"/>
                            <label for="2-stars" class="star">★</label>
                            <input type="radio" id="1-star" name="rating" value="1" v-model="ratings" />
                            <label for="1-star" class="star">★</label>
                        </div>
                        <button v-on:click="writeEditReview" type="button" style="margin-right:1.21vw; font-size:3.90vw; color:#FF742E">수정</button>
                    </div>

                    <textarea placeholder="" id="" cols="30" rows="10" class="review-txtarea"
                        v-bind:value="editReview" v-on:input="updateeditReview"></textarea>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ReturnNav from '@/components/user/ReturnNav.vue'
import PlaceApi from '@/apis/PlaceApi.js'
import dotenv from 'dotenv'

export default {
    components:{
        ReturnNav
    },
    data:() => {
        return {
            currenttap:1,
            currentstar:5,
            ratings:"4",
            inputReview: "",
            isReview: true,
            editReview:"",
            editReviewId:0,
            currentPlaceName:"",
            currentPlaceLocation:"",
        }
    },
    computed:{
        placedata(){
            return this.$store.getters.placeData;
        },
        placereviewdata(){
            return this.$store.getters.placeReviewData;
        },
        currentTap(){
            return this.currenttap;
        },
        returnStar(){
            return this.currentstar;
        },
        mynickname(){
            return localStorage.getItem("nickname")
        }
    },
    methods:{
        placeid() {
            return this.$route.params.id
        },
        placename() {
            return this.$store.getters.placeData.name;
        },
        placeloca() {
            return this.$store.getters.placeData.location;
        },
        operationhour(oh){
            window.swal(oh);
        },
        changetapreview() {
            this.currenttap = 1;
        },
        changetapreviewwrite() {
            if(!localStorage.getItem("jwt") || !localStorage.getItem("nickname")) window.swal("로그인 후 이용해 주세요!");
            else this.currenttap = 2;
        },
        changetapedit(review_id, review_con){
            this.editReview = review_con;
            this.editReviewId = review_id;
            this.currenttap = 3;
        },
        updateReview: function(e){
            let updatedReview = e.target.value;
            this.inputReview = updatedReview;
        },
        updateeditReview:function(e){
            let updatededitReview = e.target.value;
            this.editReview = updatededitReview;
        },
        writeReview(){
            let id = this.placeid();
            let {inputReview} = this;

            let data = {
                "content":inputReview,
                "place_id": id,
                "star_rate": Number(this.ratings),
            }   
            PlaceApi.requestReviewWrite(data, res => {
                window.swal("소중한 리뷰 감사합니다").then(() => {this.$router.go();});
            }, err => {
                window.swal("로그인 후 이용해 주세요!").then(() => {this.$router.go();});
            });

            
        },
        writeEditReview(){
            let id = this.placeid();
            let review_id = this.editReviewId;
            let conten = this.editReview;

            if(!conten) return;

            let data = {
                "content":conten,
                "place_id": id,
                "star_rate": Number(this.ratings),
                "id": review_id,
            }

            PlaceApi.requestReviewEdit(data, res => {}, err => {})

            window.swal("리뷰를 수정했습니다.").then(() => {this.$router.go();});
        },
        deleteReview(id){
            let review_id = id

            let data = {
                "id": review_id,
            }   
            PlaceApi.requestReviewDelete(data, res => {}, err => {});

            window.swal("리뷰를 삭제했습니다.").then(() => {this.$router.go();});
        },
        initMap () {
            const container = document.querySelector('#place-map')
            const options = {
                center: new kakao.maps.LatLng(35.19656853772262, 129.0807270648317),
                level: 3
            }
            const map = new kakao.maps.Map(container, options)
            /*const markerPosition = new kakao.maps.LatLng(35.19656853772262, 129.0807270648317);

            const marker = new kakao.maps.Marker({
                position: markerPosition
            });
            marker.setMap(map)*/
            
            this.currentPlaceName = this.placename();
            this.currentPlaceLocation = this.placeloca();
            
            //console.log(this.currentPlaceName);
            var geocoder = new kakao.maps.services.Geocoder();
            geocoder.addressSearch(`${this.currentPlaceLocation}`, function(result, status) {
            //geocoder.addressSearch(`제주특별자치도 제주시 첨단로 242`, function(result, status) {
                // 정상적으로 검색이 완료됐으면 
                if (status === kakao.maps.services.Status.OK) {
                    var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
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
            });
        },
        bookmark(){

        }
    },
    created(){
        let id = this.placeid();
        
        PlaceApi.requestPlace(id, function(res) {
            }, error=>{  
                window.swal("삭제된 페이지입니다")
                this.$router.push({name:'Main'})
            });
    
        PlaceApi.requestPlaceReview(id, function(res) {}, error=>{});
    },
    beforeMount(){
    },
    mounted(){
        if (window.kakao && window.kakao.maps) {
            window.setTimeout(this.initMap, 500);
        } else {
            dotenv.config();
            let API_KEY = process.env.VUE_APP_API_KEY;
            const script = document.createElement('script')
            script.onload = () => kakao.maps.load(this.initMap);
            script.src = `http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${API_KEY}&libraries=services`
            document.head.appendChild(script)
        }
    }
}
</script>

<style scoped>
.place-info{
    width:100vw;
    height: 33.33vw;
    margin-top:14.49vw;
    display: flex;}
    .place-img-src{
        background-size: cover;
        width: 27vw;
        height: 27vw;
        border-radius: 50%;}

#place-map{
    width: 90%;
    margin-left:5%;
    height: 35vw;
}

.place-tap{
    width:100vw;
    height: 9.66vw;
    margin-top:4.35vw;
    display: flex;
    justify-content: space-around;}
    .place-tap button{
        width:50%;}
    .place-lists{
        display: block;
        margin-left: 5%;
        width: 100vw;}

.place-reviews{
    width:90%;
    min-height: 21.98vw;
    display: flex;
    border-top:1px solid rgba(0, 0, 0, 0.16);}
    .place-review{
        width:83%;
        min-height: 21.98vw;}
        .place-review-body{
            width:95%;
            font-weight: 300; 
            font-size: 3.14vw; 
            line-height:4.83vw;}
        .place-review-header{
            height: 6.04vw;
            display: flex;}
    .place-review-img{
        background-size: cover;
        width:14.49vw;
        height: 14.49vw;
        border-radius: 50%;}

.place-review-write{
    width:90%;
    min-height: 21.98vw;
    border-top:1px solid rgba(0, 0, 0, 0.16);}
    .review-star{
        width: 100%;
        height: 8.45vw;
        flex-direction: row-reverse;
        display: flex;
        justify-content:flex-end;}
        .review-star input{ display: none;}
        .review-star label{
            margin-left:0.72vw;
            -webkit-text-fill-color: transparent; /* Will override color (regardless of order) */
            -webkit-text-stroke-width: 1px;
            -webkit-text-stroke-color: #F4A261;;
            cursor: pointer;}
        .review-star :checked ~ label {-webkit-text-fill-color: #F4A261;}
        .review-star label:hover,.review-star label:hover ~ label {
            -webkit-text-fill-color: #F4A261;}
    .review-txtarea{
        border:1px solid rgba(0, 0, 0, 0.08);
        margin-top:1px; padding-top:3px;
        width: 100%;
        height: 43.48vw;}
        .review-txtarea::placeholder{color: #C4C4C4; font-weight: 300;}

</style>