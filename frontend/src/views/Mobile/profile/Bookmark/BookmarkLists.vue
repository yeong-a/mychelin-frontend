<template>
    <div>
        <ReturnNav inputTxt="저장한 맛집 리스트" />
        <div class="nav-gap"></div>
        <div v-for="(list, id) in lists" v-bind:key="id">
            <div class="d-flex">
                <router-link :to="{ name: 'Mychelin', params: { id: list.placeListId } }" class="d-flex align-items-center justify-content-between router-link">
                    <div>
                        <h2>{{ list.placeListName }}</h2>
                        <span>{{ list.placeCnt }}개의 맛집</span>
                    </div>
                    <span>{{ list.userNickname }}</span>
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
import ReturnNav from '@/components/user/ReturnNav.vue'

export default {
    name: 'BookmarkLists',
    components: {
        ReturnNav
    },
    data() {
        return {
            lists:[]
        }
    },
    created() {
        // 정상적으로 작성하면 400 error가 발생
        // error에 정상 응답 데이터가 담겨오므로 일단 그것 활용
        // 추후 수정 필요
        BookmarkApi.requestBookmarkLists().then(res => {
            this.lists = res.data.data
            // console.log(res.data.data)
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