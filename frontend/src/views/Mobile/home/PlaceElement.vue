<template>
    <div>  
        <div class="row border pt-3" v-on:click="clickRestaurant(placeId)"> 
            <div class="row mb-3">
                <div class="col-4">
                    <img class="img-restaurant" :src="restaurant.image" />	
                </div>
                <div class="col-8">
                    <div class="head-font">
                    </div>
                    <div>
                        <p>{{ restaurant.name }}</p>
                        <p>평점 : {{ starRate(restaurant.starRate) }}</p>
                        <p>{{ restaurant.location }}</p>
                        <p>{{ restaurant.phone }}</p>
                        <!-- {{page}} -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Mychelin from '@/apis/Mychelin'
export default {
    props: {
        data: Object,
    },
    data() {
        return {
            restaurant: this.data.restaurant,
            page: this.data.page
        }
    },
    methods: {
        starRate(sr){
            if (sr === null) return '미평가';
            else return sr
        },
        clickRestaurant(id){
            if (this.page === 'main') this.$router.push({ name: 'Place', params: { id: id}});
            else if (this.page === 'mychelin') {
                let params = {
                    'listId': this.data.listId,
                    'placeId': {
                        'placeId': id
                    }
                }
                Mychelin.addMychelinRestaurant(params)
                .then((res) => {
                window.swal("맛집리스트 추가 완료!")
                .then(() => {
                    this.$router.go()
                    })
                })
                .catch((err) =>{
                    window.swal("이미 추가된 맛집입니다.")
                })
            }
        },
        
    },
    computed: {
        placeId() {
            return this.restaurant.id || this.restaurant.placeId  // 두개중에 한개가 진짜
        }
    }
}
</script>

<style scoped>
.img-restaurant {
    position:relative;
    width:12vh;
    height:12vh;
    border-radius: 5em;
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