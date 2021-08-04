<template>
    <div class="container main-contents">
		<div v-for="restaurant in restaurants" v-bind:key="restaurant.id">
            <PlaceElement :restaurant="restaurant"/>
        </div>
    </div>
</template>

<script>
import PlaceElement from './PlaceElement'
export default {
    components: {
        PlaceElement,
    },
    computed: {
        restaurants() {
            return this.$store.getters.mainPlaces
        },
    },
    
}
</script>

<style>

</style>