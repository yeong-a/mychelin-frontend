<template>
    <div class="container main-contents">
		<div v-for="restaurant in restaurants.slice(0, 20)" v-bind:key="restaurant.id">
            <div class="row border pt-3" v-on:click="goPlaceDetail(restaurant.placeData.id)"> 
                <div class="row mb-3">
                    <div class="col-4">
                        <img class="img-restaurant" :src="restaurant.placeData.image" />	
                    </div>
                    <div class="col-8">
                        <div class="head-font">
                            {{ restaurant.placeData.name }}
                        </div>
                        <div>
                            <p>평점 : {{ starRate(restaurant.placeStarRate) }}</p>
                            <p>{{ restaurant.placeData.location }}</p>
                            <p>{{ restaurant.placeData.phone }}</p>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    components: {
    
    },
    computed: {
        restaurants() {
            return this.$store.getters.mainPlaces
        },
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

<style>
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