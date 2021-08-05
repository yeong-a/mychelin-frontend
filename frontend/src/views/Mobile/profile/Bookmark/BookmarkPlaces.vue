<template>
    <div>
        <ReturnNav inputTxt="저장한 식당" />
        <div class="nav-gap"></div>
        <div v-for="(place, id) in places" v-bind:key="id">
            <div class="d-flex">
                <router-link :to="{ name: 'Place', params: { id: place.placeId } }" class="d-flex align-items-center router-link">
                    <img v-bind:src="place.image" class="place-img">
                    <div>
                        <h2>{{ place.placeName }}</h2>
                        <p>{{ place.location }}</p>
                    </div>
                </router-link>
                <button v-on:click="deleteBookmark(place.placeId, id)" class="delete-btn">
                    <i class="fas fa-minus-circle"></i>
                </button>
            </div>
            <hr>
        </div>
    </div>
</template>

<script>
import BookmarkApi from "@/apis/BookmarkApi"
import ReturnNav from '@/components/user/ReturnNav.vue'

export default {
    name: 'BookmarkPlaces',
    components: {
        ReturnNav
    },
    data() {
        return {
            places: []
        }
    },
    created() {
        // 정상적으로 작성하면 400 error가 발생
        // error에 정상 응답 데이터가 담겨오므로 일단 그것 활용
        // 추후 수정 필요
        BookmarkApi.requestBookmarkPlaces().catch(err => {
            this.places = err.response.data.data
        })
    },
    methods: {
        deleteBookmark: function (placeId, idx) {
            BookmarkApi.bookmarkPlaces(placeId).then(
                this.places.splice(idx, 1)
            )
        }
    }
}
</script>

<style scoped>
.nav-gap {
    margin: 60px;
}

.router-link {
    color: black;
    width: 90%;
}

.place-img {
    width: 80px;
}

.delete-btn {
    font-size: 25px;
    color: #ff993c;
}

hr {
    color: #ff993c;
    height: 2px;
}
</style>