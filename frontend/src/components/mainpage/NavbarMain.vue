<template>
<div>
    <router-link v-bind:to="{name:'Home'}">
        <span class="main-name">
            MYCHÉLIN
        </span>
    </router-link>

    <div class="main-search-bar">
        <input type="text" name="" class="main-search-input" />
        <i class="fa fa-search fa-flip-horizontal main-search-btn"></i>
    </div>

    <router-link v-bind:to="{name:'Login'}" v-if="!islogin">
        <button class="main-login-btn" type="button">로그인</button>
    </router-link>
    <router-link v-else>
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

.main-name {
    position: absolute;
    width: 249px;
    height: 44px;
    left: 6.6%;
    top: 38px;

    font-style: normal;
    font-weight: bold;
    font-size: 36px;
    line-height: 45px;
    letter-spacing: -0.05em;

    color: #FF742E;
}

.main-search-bar{
    position: absolute;
    width: 41.66%;
    height: 44px;
    left: 29.1%;
    top: 38px;
    display: flex;
    background: #FFFFFF;

    border: 2px solid #FF993C;
    box-sizing: border-box;
    border-radius: 30px;
}
@media screen and (max-width: 840px) {
     .main-search-bar{ display:none; } 
}

.main-search-input{
    height: 44px;
    width: 100%;
    border: none;
    padding-bottom: 1px;
}

.main-search-btn{
    margin: 9px 19px 0 0;
    font-size: 24px;
    color: #FF993C;
    font-weight: lighter;
}

.main-login-btn{
    position: absolute;
    width: 110px;
    height: 33px;
    left: 85.41%;
    top: 38px;

    font-weight: bold;
    font-size: 20px;
    line-height: 23px;
    color: #ffffff;

    background: #FF993C;
    border-radius: 33px;
}
</style>
