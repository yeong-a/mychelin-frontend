<template>
    <div>
        <MainNavbar />
        <UnderBar />
        <FeedPage v-if="currentPage === 0" />
        <FeedPageFol v-if="currentPage === 4" />
        <PlacePage v-if="currentPage === 1" />
        <MychelinPage v-if="currentPage === 2" />
        <ChattingPage v-if="currentPage === 3" />
    </div>
</template>

<script>
import UnderBar from "@/components/bars/UnderBar";
import MainNavbar from "@/components/bars/MainNavbar2";
import FeedPage from "./FeedPage";
import FeedPageFol from "./FeedPageFol";
import PlacePage from "./PlacePage";
import MychelinPage from "./MychelinPage";
import ChattingPage from "../home/Chatting.vue";
export default {
    name: "MainPage",
    components: {
        UnderBar,
        MainNavbar,
        FeedPage,
        PlacePage,
        MychelinPage,
        FeedPageFol,
        ChattingPage,
    },
    data: () => {
        return {
            feeds: [],
        };
    },
    computed: {
        currentPage() {
            return this.$store.getters.currentPage;
        },
    },
};
</script>
<style>
.main-contents {
    margin-top: 4em;
    margin-bottom: 3em;
}

.text-big {
    /* width: 77.44px;
	height: 14.85px; */
    font-family: Spoqa Han Sans Neo;
    font-style: normal;
    font-weight: 500;
    font-size: 1.2em;
    line-height: 1.5em;
    display: flex;
    align-items: center;
    color: #000000;
}

.text-center {
    text-align: center;
}
.img-profile {
    width: 3em;
    height: 3em;
    border-radius: 5em;
}

.img-full-round {
    width: 7vh;
    height: 7vh;
    border-radius: 5em;
}

.input-simple {
    border: none;
}
</style>
