<template>
    <div class="main-nav-bar">
        <div>
            <div class="c1" v-if="status === 0"> 
                <span class="logo-letter" v-on:click="goHome">MYCHÉLIN</span>
            </div>
            <div class="c1" v-if="status !== 0" v-on:click="status=0">
                <ReturnBtn/>
            </div>
            <div class="" v-if="status === 1">
                <SearchBar/>
            </div>
            <div class="c2" v-if="!status">
                <span class="icon-orange" v-on:click="status=1"><i class="fas fa-search"></i></span>
                <span class="icon-orange"><i class="far fa-bell"></i></span>
                <span class="icon-orange" v-on:click="goProfile"><i class="far fa-user"></i></span>
            </div>
        </div>
  </div>
</template>

<script>
import ReturnBtn from './ReturnBtn'
import SearchBar from './SearchBar'

export default {
    components: {
        ReturnBtn,
        SearchBar
    },

    data() {
        return {
            status: 0 // 초기 상태
        }
    },
    methods: {
        goHome() {
            if (this.$route.path === '/main'){
                this.$router.go()  // reload
            } else {
            this.$router.push({name:'Main'})
            }
        },
        goProfile() {
            if (localStorage.getItem('jwt') === null){
                window.swal(`로그인이 필요합니다!`).then(
                    () => {this.$router.push({name: 'Login'})
                });
                
            } else this.$router.push({ name: 'Profile', params: { id: localStorage.getItem('nickname') }}) 
            
        },
    }
}
</script>

<style>
.logo-letter{
    width: 7em;
    left: 1em;
    font-style: normal;
    font-weight: bold;
    font-size: 2em;
    letter-spacing: -0.05em;

    color: #FF742E;
}
.main-nav-bar{
    width: 100%;
    /* height: 4em; */
    background-color: #FFFFFF;
    position: fixed;
    z-index: 5;
    top:0;
    padding:1em;
    
}

.c1{
    float: left;
}
.c2{
    float: right;
    /* position: relative; */
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>