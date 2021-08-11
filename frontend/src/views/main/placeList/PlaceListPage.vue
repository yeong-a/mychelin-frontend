<template>
    <div class="container main-contents px-5">
        <div class="mb-3 d-flex py-2 justify-content-between">
            <transition name="fade">
                <input type="text" class="input-search" v-model="searchKeyword" v-show="show" />
            </transition>
            <div v-on:click="clickSearch">
                <PlusBtn v-bind:data="btnWord" />
            </div>
        </div>
        <div v-if="isEmpty">
            <EmptyContent data="맛집 리스트" />
        </div>
        <div class="shadow p-3 mb-3 select-box" v-for="my in mychelin" :key="my.id">
            <div class="d-flex justify-content-between" v-on:click="clickMychelinDetail(my)">
                <div>{{ my.title }}</div>
                <div><i class="fas fa-map-marker-alt"></i> {{ my.totalItemCnt }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import PostsApi from "@/apis/PostsApi";
import EmptyContent from "@/components/error/EmptyContent";
import PlusBtn from "@/components/btn/PlusBtn";
import Mychelin from "@/apis/Mychelin.js";
export default {
    components: {
        EmptyContent,
        PlusBtn,
    },
    data() {
        return {
            show: false,
            searchKeyword: "",
            btnWord: "내 맛집 리스트",
        };
    },
    computed: {
        mychelin() {
            return this.$store.getters.mainMychelin;
        },
        isEmpty() {
            return this.mychelin.length === 0;
        },
    },
    methods: {
        clickMychelinDetail(my) {
            this.$router.push({ name: "PlaceListDetail", params: { id: my.id, name: my.title } });
        },
        clickSearch() {
            this.show = !this.show;
            if (this.btnWord === "내 맛집 리스트") this.btnWord = "추가하기";
            else {
                    if (this.searchKeyword === '') {
                    window.swal('맛집 리스트 이름을 입력해 주세요.')
                    this.show = !this.show
                    return
                }
                let sk = this.searchKeyword  // 왜 꼭 변수지정을해야되는지모르겠음
                Mychelin.addMychelinList(sk)
                .then((res) => {
                    window.swal("맛집리스트 생성 완료!")
                    .then(() => {
                        PostsApi.requestMychelin(this.$store.getters.searchKeyword);
                        this.btnWord = "내 맛집 리스트";
                    });
                });
            }
        },
    },
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}
</style>
