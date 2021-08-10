<template>
    <div id="wrap-main-page">
        <div class="main-header">
            <NavbarComponent/>
        </div>
        <div class="main-body">
            <div class="main-left-tap">
                <TapComponent/>
            </div>
            <div class="main-middle">
                내용내용
                내용내용
            </div>
            <div class="main-right-realtime">
                실검
            </div>
        </div>
    </div>
</template>

<script>
import NavbarComponent from '@/components/mainpage/NavbarMain.vue'
import TapComponent from '@/components/mainpage/TapMain.vue'

export default{
    name: "mainW",
    components:{
        NavbarComponent,
        TapComponent
    },
    created(){
        this.$store.state.isWhite = true;
    },
    data: () =>{
        return {
        }
    },
    methods:{

    }
}
</script>

<style scoped>
.main-header{
    position: fixed;
      width: 100vw;
    height: 120px;
    background-color: white;
    border-bottom: solid 1px #dad8d8;
}
.main-body{
    padding-top: 120px;
    width: 840px;
    margin:0 auto;
    display: flex;
    z-index: -1;
}
.main-middle{
    width: 600px;
    height: 1220px;
    background-color: chartreuse;
    border:solid 1px #ACACAC;
    margin-left:100px;
}
.main-left-tap{
    width: 100px;
    height: 240px;
    position: fixed;
}
.main-right-realtime{
    width: 140px;
    height: 366px;
    background-color: blue;
    position: fixed;
    margin-left: 700px;
}
</style>
