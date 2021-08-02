<template>
  <div>
      <ReturnNav inputTxt="새 게시물"/>
        <div class="main-contents mx-4 mb-3 d-flex p-2 justify-content-between">
            <transition name="fade">
                <input type="text" class="input-search" v-model="searchKeyword" v-show="show">
            </transition>
            <div v-on:click="clickSearch">
                <PlusBtn v-bind:data="btnWord"/>
            </div>
        </div>

      <div class="container px-5">
          <div class="row border mb-4" v-for="my in mychelinList" :key="my.placeId">
              <div class="col-6">
                  {{my.name}}
              </div>
              <div class="col-6">
                  {{my.description}}
              </div>
              
          </div>
      </div>
  </div>
</template>

<script>
import PlusBtn from '@/components/btn/PlusBtn'
import PostsApi from '@/apis/PostsApi'
import Mychelin from '@/apis/Mychelin.js'
import ReturnNav from '@/components/user/ReturnNav.vue'
export default {
    components:{
        ReturnNav,
        PlusBtn,
    },
    data() {
        return {
            mychelinList: [],
            show: false,
            searchKeyword: '',
            btnWord: '내 맛집'
        }
    },
    created() {
        PostsApi.requestMychelinDetail(this.$route.params.id)
        .then(res => {
            this.mychelinList = res.data
        })
    },
    methods: {
        clickSearch() {
            this.show  = !this.show
        //     if (this.btnWord === '내 맛집') this.btnWord = '맛집 추가'
        //     else {
        //         let data = this.searchKeyword  // 왜 꼭 변수지정을해야되는지모르겠음
        //         Mychelin.addMychelinRestaurant(sk)
        //         this.btnWord = '내 맛집'
        // }
        },
    }
}
</script>

<style>

</style>