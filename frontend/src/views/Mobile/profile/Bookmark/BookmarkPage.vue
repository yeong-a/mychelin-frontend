<template>
    <div>
        <ReturnNav inputTxt="북마크" />
        <div class="margin-nav"></div>
        <div class="d-flex bottom-border">
            <div
                class="bookmark-tab d-flex"
                v-on:click="clickPlaces"
                :class="{
                    'bookmark-selected': selected === 1,
                    'bookmark-unselected': selected !== 1,
                }"
            >
                <p class="tab-text">식당</p>
            </div>
            <div
                class="bookmark-tab d-flex"
                v-on:click="clickLists"
                :class="{
                    'bookmark-selected': selected === 2,
                    'bookmark-unselected': selected !== 2,
                }"
            >
                <p class="tab-text">맛집 리스트</p>
            </div>
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
</template>

<script>
import ReturnNav from "@/components/user/ReturnNav";
import BookmarkApi from "@/apis/BookmarkApi";
import BookmarkLists from "./BookmarkLists";
import BookmarkPlaces from "./BookmarkPlaces";

export default {
    components: {
        ReturnNav,
        BookmarkLists,
        BookmarkPlaces,
    },
    data() {
        return {
            selected: 1,
        };
    },
    methods: {
        clickPlaces() {
            BookmarkApi.requestBookmarkPlaces().then((this.selected = 1));
        },
        clickLists() {
            BookmarkApi.requestBookmarkLists().then((this.selected = 2));
        },
    },
};
</script>

<style scoped>
.bottom-border {
    border-bottom: 3px solid #ff993c;
}

.bookmark-tab {
    width: 48%;
    height: 35px;
    margin: auto;
    border-radius: 10px 10px 0 0;
    text-align: center;
}

.bookmark-selected {
    background-color: #ff993c;
}

.bookmark-unselected {
    background-color: #9b9b9b;
}

.tab-text {
    margin: auto;
    color: white;
}
</style>