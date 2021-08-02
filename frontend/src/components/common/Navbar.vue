<template>
    <div>
        <router-link v-bind:to="{name:'Home'}">
            <span class="name" v-bind:style="isWhite ? {'color': '#EA526F'} : {'color': '#ffffff'}">
                MYCHÉLIN
            </span>
        </router-link>

        <div class="search-bar" v-if="!isHome">
            <input type="text" name="" id="nav_search" />
            <i class="fa fa-search fa-flip-horizontal" id="nav-search-btn"></i>
        </div>
        <router-link v-bind:to="{name:'Login'}" v-if="!islogin">
            <button class="nav-login-btn" type="button"></button>
            <span class="nav-login-btn-txt">로그인</span>
        </router-link>
        <router-link v-bind:to="{name:'Home'}" v-else>
            <button class="nav-login-btn" type="button"></button>
            <span class="nav-login-btn-txt" style="left:1298px">로그아웃</span>
        </router-link>
    </div>
</template>

<script>
export default {
    name: "navbar",
    props : [],
    computed:{
        islogin(){
            return this.$store.state.isUser;
        },
        isWhite(){
            return this.$store.state.isWhite;
        },
        isHome(){
            return this.$store.state.isHome;
        }
    },
    methods: {
    },
    data: () => {
        return {
        }
    },
}
</script>

<style>
* { font-family: 'Spoqa Han Sans Neo', 'sans-serif'; }

@media screen and (min-width: 800px) {
}
</style>
