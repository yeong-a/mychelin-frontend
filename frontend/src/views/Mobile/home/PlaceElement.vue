<template>
    <div>
        <div class="row border pt-3" v-on:click="goPlaceDetail(restaurant.id)"> 
            <div class="row mb-3">
                <div class="col-4">
                    <img class="img-restaurant" :src="restaurant.image" />	
                </div>
                <div class="col-8">
                    <div class="head-font">
                    </div>
                    <div>
                        <p>평점 : {{ starRate(restaurant.placeStarRate) }}</p>
                        <p>{{ restaurant.location }}</p>
                        <p>{{ restaurant.phone }}</p>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        restaurant: Object
    },
    methods: {
        starRate(sr){
            // console.log(sr)
            if (sr === null) return '미평가';
            else return sr
        },
        goPlaceDetail(id){
            //console.log(id);
            this.$router.push({ name: 'Place', params: { id: id}});
        },
    }
}
</script>

<style scoped>
.img-restaurant {
    position:relative;
    width:14vh;
    height:14vh;
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