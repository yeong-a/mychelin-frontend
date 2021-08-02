<template>
  <div>
        <div class="place-header">
            <ReturnNav :inputTxt="placedata.placeData.name"/>
        </div>

        <div class="place-info">
            <div class="place-img" style="width:29.71vw; height: 33.33vw; display:flex; flex-direction: row-reverse;"><img class="place-img-src" :src="placedata.placeData.image" /></div>
            <div class="place-profile" style="width:60%; height: 33.33vw; padding-left: 5%">
                <div style="width:100%; font-size:4.35vw; word-break:break-all; margin-bottom:2.42vw">{{ placedata.placeData.name }}</div>
                <div style="width:100%; font-size:3.86vw; word-break:break-all; margin-bottom:2.42vw">{{ placedata.placeData.phone }}</div>
                <div style="width:100%; height:50%; text-overflow: ellipsis; overflow: hidden; font-size:2.90vw; word-break:break-all;" >{{ placedata.placeData.location }}</div>
            </div>
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
                            <div style="width:40vw;font-weight: bold; font-size: 3.62vw; line-height:7.25vw;">{{reviewD.user_nickname}}</div>
                            <span style="font-weight: bold; font-size: 3.38vw; line-height:7.25vw;; color:#F4A261;"><i class="far fa-star"></i>{{reviewD.star_rate}}</span>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <span style="font-weight: 300; font-size: 3.14vw; line-height:7.25vw; color:#C4C4C4;">{{reviewD.craete_date.slice(2,10)}}</span>
                        </div>
                        <div class="place-review-body">{{reviewD.content}}</div>
                    </div>

                    <div class="place-review-img-wrap" style="width:14.49vw; min-height: 21.98vw; padding-top:3.62vw;background-color:white;">
                        <img :src="placedata.placeData.image" alt="" class="place-review-img">
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
        </div>
    </div>
</template>

<script>
import ReturnNav from '@/components/user/ReturnNav.vue'
import PlaceApi from '@/apis/PlaceApi.js'

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
    },
    methods:{
        placeid() {
            return this.$route.params.id
        },
        changetapreview() {
            this.currenttap = 1;
        },
        changetapreviewwrite() {
            this.currenttap = 2;
        },
        updateReview: function(e){
            let updatedReview = e.target.value;
            this.inputReview = updatedReview;
        },
        writeReview(){
            let id = this.placeid();
            let {inputReview} = this;

            let data = {
                "content":inputReview,
                "place_id": id,
                "star_rate": Number(this.ratings),
            }   
            PlaceApi.requestReviewWrite(data, res => {}, err => {});

            window.swal("소중한 리뷰 감사합니다").then(() => {this.$router.go();});
        }
    },
    created(){
        let id = this.placeid();
        
        PlaceApi.requestPlace(id, function(res) {
            }, error=>{  
                alert("삭제된 페이지입니다")
                this.$router.push({name:'Main'})
            });
    
        PlaceApi.requestPlaceReview(id, function(res) {}, error=>{});
    },
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