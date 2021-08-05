<template>
    <div class="container main-contents">
        <div v-if="isEmpty">
            <EmptyContent data="식당" />
        </div>
		<div v-for="restaurant in restaurants" v-bind:key="restaurant.id">
            <PlaceElement :data="{
                    restaurant: restaurant,
                    page: 'main'
                    }"/>
        </div>
    </div>
</template>

<script>
import EmptyContent from '@/components/error/EmptyContent'
import PlaceElement from './PlaceElement'
export default {
    components: {
        EmptyContent,
        PlaceElement,
    },
    computed: {
        isEmpty() {
            return this.restaurants.length === 0
        },
        restaurants() {
            return this.$store.getters.mainPlaces
        },
    },
    
}
</script>

<style>

</style>