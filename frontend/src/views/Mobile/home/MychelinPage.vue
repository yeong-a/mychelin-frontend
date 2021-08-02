<template>
    <div class="container main-contents px-5">
        <div class="mb-3 d-flex p-2 justify-content-between">
            <transition name="fade">
                <input type="text" class="input-search" v-model="searchKeyword" v-show="show">
            </transition>
            <div v-on:click="clickSearch">
                <PlusBtn v-bind:data="btnWord"/>
            </div>
        </div>
        <div class="row shadow p-3 mb-3 rounded height-middle" v-for="my in mychelin" :key="my.id">
            
            <div v-on:click="clickMychelinDetail(my.id)">{{ my.title }}</div>
            
        </div>
        
    </div>
</template>

<script>
import PlusBtn from '@/components/btn/PlusBtn'
import Mychelin from '@/apis/Mychelin.js'
export default {
    components: {
        PlusBtn,
    },
    data() {
        return {
            show: false,
            searchKeyword: '',
            btnWord: '내 맛집 리스트'
        }
    },
    computed: {
		mychelin() {
			return this.$store.getters.mainMychelin
		}
	},
    methods: {
        clickMychelinDetail(id) {
            this.$router.push({ name: 'Mychelin', params: { id: id }})
        },
        clickSearch(){
            this.show  = !this.show
            if (this.btnWord === '내 맛집 리스트') this.btnWord = '추가하기'
            else {
                let sk = this.searchKeyword  // 왜 꼭 변수지정을해야되는지모르겠음
                Mychelin.addMychelinList(sk)
                this.btnWord = '내 맛집 리스트'
            }
            
        }
    }
}
</script>

<style>
.input-search {
    width: 50%;
    height: 2.5em;
    /* position:absolute; */
    background: #FFFFFF;
    /* Light Orange */
    border: 0.125em solid #FF993C;
    box-sizing: border-box;
    border-radius: 1.5em;
}

.height-middle {
    height: 8vh;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}



</style>