<template>
    <div>
        <div class="my-3 d-flex justify-content-between padder">
            <transition name="fade">
                <input type="text" class="input-search p-3" v-model="placeListName" v-show="show" @keyup.enter="clickSearch"/>
            </transition>
            <div v-on:click="clickSearch">
                <PlusBtn v-bind:data="btnWord" />
            </div>
        </div>
    </div>
</template>

<script>
import Mychelin from '@/apis/Mychelin.js'
import SearchApi from '@/apis/SearchApi.js'
import PlusBtn from "@/components/btn/PlusBtn";
export default {
    components: {
        PlusBtn
    },
    data() {
        return {
            show: false,
            btnWord: "내 맛집 리스트",
            placeListName: "",
        };
    },
    methods: {
        clickSearch() {
            this.show = !this.show;
            if (this.btnWord === "내 맛집 리스트") this.btnWord = "추가하기";
            else {
                if (this.placeListName === "") {
                    window.swal("맛집 리스트 이름을 입력해 주세요.");
                    this.show = !this.show;
                    return;
                }
                let sk = this.placeListName; // 왜 꼭 변수지정을해야되는지모르겠음
                Mychelin.addMychelinList(sk).then((res) => {
                    window.swal("맛집리스트 생성 완료!").then(() => {
                        let data = {'keyword': this.$store.getters.searchPageKeyword, 'limit': 1}
                        SearchApi.requestPlaceList(data)
                        .then((res) =>{
                            this.placeListName = '';
                            this.btnWord = '내 맛집 리스트';
                            this.$store.commit('INIT_SEARCH_PLACELIST');
                            if (res.data.data) this.$store.commit('GET_SEARCH_PLACELIST', res.data.data.placeList);
                            else this.$store.commit('GET_SEARCH_PLACELIST', []);
                        })
                    });
                });
            }
        },
    }
}
</script>

<style scoped>
.padder {
    padding: 0 30px 0;
}
.input-search {
  width: 60%;
  height: 2.5em;
  /* position:absolute; */
  background: #ffffff;
  /* Light Orange */
  border: 0.125em solid #ff993c;
  box-sizing: border-box;
  border-radius: 1.5em;
}
</style>