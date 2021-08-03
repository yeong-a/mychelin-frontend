<template>
  <div>
      <ReturnNav inputTxt="새 게시물"/>
      <SweetModal ref="modal" title="맛집 검색">     
            <input type="text" class="input-search" v-model="searchKeyword">
        </SweetModal>
        <div class="main-contents mx-4 mb-3 d-flex p-2 justify-content-between">
            <div v-on:click="searchRestaurant">
                <PlusBtn data="내 맛집 추가"/>
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
import { SweetModal } from 'sweet-modal-vue'
import PlusBtn from '@/components/btn/PlusBtn'
import PostsApi from '@/apis/PostsApi'
import Mychelin from '@/apis/Mychelin.js'
import ReturnNav from '@/components/user/ReturnNav.vue'
export default {
    components:{
        SweetModal,
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
            this.mychelinList = res.data.place_list_item
        })
    },
    methods: {
        searchRestaurant() {
            this.$refs.modal.open()
        },
    }
}
</script>

<style>

</style>