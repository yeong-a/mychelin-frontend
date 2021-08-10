<template>
    <div class="bookmark-wrap">
        <div v-for="(place, id) in places" v-bind:key="id">
            <div class="bookmark-place d-flex">
                <router-link
                    :to="{ name: 'Place', params: { id: place.placeId } }"
                    class="d-flex align-items-center router-link"
                >
                    <img v-bind:src="place.image" class="place-img" />
                    <div class="place-info">
                        <p class="place-name">{{ place.placeName }}</p>
                        <p class="place-location">{{ place.location }}</p>
                    </div>
                </router-link>
                <button
                    v-on:click="deleteBookmark(place.placeId, id)"
                    class="delete-btn"
                >
                    <i class="fas fa-minus-circle"></i>
                </button>
            </div>
            <hr />
        </div>
    </div>
</template>

<script>
import BookmarkApi from "@/apis/BookmarkApi";

export default {
    name: "BookmarkPlaces",
    data() {
        return {
            places: [],
        };
    },
    created() {
        BookmarkApi.requestBookmarkPlaces().then(res => {
            this.places = res.data.data
        })
    },
    methods: {
        deleteBookmark: function (placeId, idx) {
            BookmarkApi.bookmarkPlaces(placeId).then(
                this.places.splice(idx, 1)
            );
        },
    },
};
</script>

<style scoped>
.bookmark-wrap {
    margin: 12px 0;
}

.bookmark-place {
    height: 60px;
}

.router-link {
    color: black;
    width: 90%;
    display: block;
}

.place-img {
    max-height: 100%;
    width: 80px;
    min-width: 80px;
    object-fit: cover;
}

.place-info {
    margin: 0 10px;
}

.place-location {
    font-size: 12px;
    color: #9b9b9b;
}

.delete-btn {
    font-size: 25px;
    color: #ff993c;
}

hr {
    color: #ff993c;
    height: 2px;
    margin: 12px 0;
}
</style>