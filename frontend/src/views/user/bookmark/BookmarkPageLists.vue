<template>
    <div class="bookmark-wrap">
        <div v-for="(list, id) in lists" v-bind:key="id">
            <div class="bookmark-list d-flex">
                <router-link :to="{ name: 'PlaceListDetail', params: { id: list.placeListId } }" class="d-flex align-items-center justify-content-between router-link">
                    <div>
                        <h2>{{ list.placeListName }}</h2>
                        <span>{{ list.placeCnt }}개의 맛집</span>
                    </div>
                </router-link>
                <button v-on:click="deleteBookmark" class="delete-btn">
                    <i class="fas fa-minus-circle"></i>
                </button>
            </div>
            <hr>
        </div>
    </div>
</template>

<script>
import BookmarkApi from "@/apis/BookmarkApi"

export default {
    name: 'BookmarkLists',
    data() {
        return {
            lists:[]
        }
    },
    created() {
        BookmarkApi.requestBookmarkLists().then(res => {
            this.lists = res.data.data
        })
    },
    methods: {
        deleteBookmark: function (listId, idx) {
            BookmarkApi.bookmarkLists(listId).then(
                this.lists.splice(idx, 1)
            )
        }
    }
}
</script>

<style scoped>
.bookmark-wrap {
    margin: 12px 0;
}

.bookmark-list {
    height: 60px;
    margin: 0 15px;
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