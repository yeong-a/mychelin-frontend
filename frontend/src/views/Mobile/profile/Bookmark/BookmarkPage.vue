<template>
    <div>
        <ReturnNav inputTxt="Bookmark" />
        <div class="container margin-nav">
            <div class="row d-flex justify-content-center mb-3">
                <div class="col border-bottom d-flex justify-content-center mx-3" v-on:click="clickPlaces" v-bind:class="{ 'border-dark': selected === 1, 'border-light': selected !== 1 }">
                    식당
                </div>
                <div class="col border-bottom d-flex justify-content-center mx-3" v-on:click="clickLists" v-bind:class="{ 'border-dark': selected === 2, 'border-light': selected !== 2 }">
                    맛집리스트
                </div>

                <!-- 식당일때 -->
                <div v-if="selected === 1">
                    <BookmarkPlaces />
                </div>
                <!-- 맛집리스트일 때 -->
                <div v-if="selected === 2">
                    <BookmarkLists />
                </div>

            </div>
        </div>

    </div>
</template>

<script>
import ReturnNav from "@/components/user/ReturnNav";
import BookmarkApi from '@/apis/BookmarkApi'
import BookmarkLists from './BookmarkLists'
import BookmarkPlaces from './BookmarkPlaces'
export default {
    components: {
        ReturnNav,
        BookmarkLists,
        BookmarkPlaces
    },
    data() {
        return {
            selected: 1,
        }
    },
    methods: {
        clickPlaces() {
            BookmarkApi.requestBookmarkPlaces()
            .then((res) => {
                this.selected = 1;
            })
        },
        clickLists() {
            BookmarkApi.requestBookmarkLists()
            .then((res) => {
                this.selected = 2;
            })
        },
    }
}
</script>

<style scoped>
</style>