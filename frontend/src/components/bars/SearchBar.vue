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
    props: {
        selectedIdx: Number
    },
    data() {
        return {
            searchKeyword: "",
        };
    },
    methods: {
        searchByKeyword() {
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
                        this.$store.commit('INIT_SEARCH_FEED')
                        this.$emit('fetch-data', {'response': res.data, 'searchKeyword': this.searchKeyword})
                    })
                }
                // 유저 요청
                if (this.selectedIdx === 1) {
                    console.log('usr')
                    let data = {'keyword': this.searchKeyword}
                    SearchApi.requestUsers(data)
                    .then((res) =>{
                        this.$emit('fetch-data', {'response': res.data, 'searchKeyword': this.searchKeyword})
                    })
                }
                // 식당 요청
                else if (this.selectedIdx === 2) {
                    console.log('res')
                    let data = {'keyword': this.searchKeyword, 'limit': 1}
                    SearchApi.requestRestaurants(data)
                    .then((res) =>{
                        this.$store.commit('INIT_SEARCH_PLACE')
                        this.$emit('fetch-data', {'response': res.data, 'searchKeyword': this.searchKeyword})
                    })
                }
                else if (this.selectedIdx === 3) {
                    let data = {'keyword': this.searchKeyword, 'limit': 1}
                    SearchApi.requestPlaceList(data)
                    .then((res) =>{
                        this.$store.commit('INIT_SEARCH_PLACELIST')
                        this.$emit('fetch-data', {'response': res.data, 'searchKeyword': this.searchKeyword})
                    })
                }
            }
        },
        goBack() {
            this.$router.go(-1)
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
