<template>
    <div class="d-flex justify-content-between">
        <div v-on:click="goBack"><ReturnBtn/></div>
        <div class="search-main d-flex" style="">
            <input type="text" id="search-input" v-on:keyup.enter="searchByKeyword" v-model="searchKeyword"/>
            <label for="search-input" class="icon-orange" v-on:click="searchByKeyword"><i class="bi bi-search"></i></label>
        </div>
    </div>
</template>

<script>
import ReturnBtn from '@/components/btn/ReturnBtn'
import SearchApi from "@/apis/SearchApi";
export default {
    components: {
        ReturnBtn,
    },
    data() {
        return {
            searchKeyword: this.$store.getters.searchPageKeyword,
        };
    },
    computed: {
      selectedIdx() {
          return this.$store.getters.currentSearchPage;
      },
    },
    methods: {
        searchByKeyword() {
            this.$store.commit('SET_SEARCH_PAGE_KEYWORD', this.searchKeyword)
            if (this.searchKeyword === "") {
                window.swal("검색어를 입력해주세요!");
                return 
            } else {
                window.scrollTo(0, 0);
                // 피드 요청
                if (this.selectedIdx === 0) {
                    let data = {'keyword': this.searchKeyword, 'limit': 1}
                    SearchApi.requestFeeds(data)
                    .then((res) =>{
                        this.$store.commit('INIT_SEARCH_FEED');
                        if (res.data.data) this.$store.commit('GET_SEARCH_FEED', res.data.data.posts);
                        else this.$store.commit('GET_SEARCH_FEED', []);
                    })
                }
                // 유저 요청
                if (this.selectedIdx === 1) {
                    let data = {'keyword': this.searchKeyword}
                    SearchApi.requestUsers(data)
                    .then((res) =>{
                        if (res.data.data) this.$store.commit('GET_SEARCH_USER', res.data.data);
                        else this.$store.commit('GET_SEARCH_USER', []);
                    })
                }
                // 식당 요청
                else if (this.selectedIdx === 2) {
                    let data = {'keyword': this.searchKeyword, 'limit': 1}
                    SearchApi.requestRestaurants(data)
                    .then((res) =>{
                        this.$store.commit('INIT_SEARCH_PLACE')
                        if (res.data.data) this.$store.commit('GET_SEARCH_PLACE', res.data.data.data);
                        else this.$store.commit('GET_SEARCH_PLACE', []);
                    })
                }
                else if (this.selectedIdx === 3) {
                    let data = {'keyword': this.searchKeyword, 'limit': 1}
                    SearchApi.requestPlaceList(data)
                    .then((res) =>{
                        this.$store.commit('INIT_SEARCH_PLACELIST')
                        if (res.data.data) this.$store.commit('GET_SEARCH_PLACELIST', res.data.data.placeList);
                        else this.$store.commit('GET_SEARCH_PLACELIST', []);
                    })
                }
            }
        },
        goBack() {
            this.$router.push({ name: 'MainPage' })
        },
        updatesearch(event) {
            this.$store.commit('SET_SEARCH_PAGE_KEYWORD', event.target.value)
        }

    },
};
</script>

<style scoped>
.search-main {
    position:relative;
    padding: 0.1em 0.7em 0.1em;
    width:91%;
    margin-left: 5%;
    margin-right: 5%;
    height: 2.7em;
    background: #ffffff;
    border: 0.08em solid #ff993c;
    box-sizing: border-box;
    border-radius: 1.5em;
}

#search-input {
    height:100%;
    width:100%; 
    border:0;
    padding-left:0
}

.icon-orange {
    position:absolute; 
    right:9px;
    bottom:7px;
    color:#ff993c;
    font-size:1.5em;
}
</style>
