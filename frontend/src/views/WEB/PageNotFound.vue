<template>
    <div>
        <div class="PNF-bgi"></div>  
        <router-link v-bind:to="{name:'Home'}">
            <span class="PNF-name">MYCHÉLIN</span></router-link>
        <p class="PNF-title">
            페이지를 찾을 수 없습니다 :(</p>
    </div>
</template>

<style scoped>
* { font-family: 'Spoqa Han Sans Neo', 'sans-serif'; }
.PNF-bgi{
    position: fixed;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('../../assets/images/food_background.jpg');
    background-size: cover;
    background-position: -330px 0px;
    width: 100vw;
    height: 100vh;
    top:0px
}
.PNF-name{
    position: absolute;
    width: 27.78vw;
    height: 7.25vw;
    left: 3.62vw;
    top: 4.11vw;
    font-size: 5.80vw;
    line-height: 7.25vw;
    color: #FFFFFF;
}
.PNF-title{
    position: absolute;
    width: 100vw;
    height: 7.25vw;
    left: 0px;
    top: 40.58vw;
    text-align: center;
    font-weight: bold;
    font-size: 5.80vw;
    line-height: 7.25vw;
    color: #FFFFFF;
}
@media screen and (min-width: 700px){
    .PNF-bgi{
        background-position: 0px 0px;
        width:100vw;
        height: 100vh;
    }
    .PNF-title{
        height: 45px;
        top: 25.78vh;
        font-size: 36px;
        line-height: 45px;
    }
    .PNF-name{
        width: 166px;
        height: 45px;
        left: 90px;
        top: 30px;
        font-weight: 500;
        font-size:36px;
        line-height: 45px;
        letter-spacing: -0.05em;
    }
}
</style>
