<template>
    <div class="wrap-return-nav">
        <div class="return-btn" v-on:click="backButton"><i class="fas fa-angle-left"></i></div>
        <div class="return-title">{{ inputTxt }}</div>
    </div>
</template>

<script>
export default {
    props: ["inputTxt"],
    methods: {
        backButton() {
            this.$router.go(-1);
        },
    },
};
</script>

<style>
* {
    font-family: "Spoqa Han Sans Neo", "sans-serif";
}

.wrap-return-nav {
    width: 100%;
    height: 14.49vw;
    font-weight: 500;
    position: fixed;
    left: 0;
    top: 0;
    background-color: white;
    line-height: 4.83vw;
    display: flex;
    z-index: 8;
}
.return-btn {
    font-size: 6.83vw;
    margin-left: 3.62vw;
    margin-top: 4.59vw;
    z-index: 8;
}
.return-title {
    font-size: 4.83vw;
    margin-left: 3.62vw;
    margin-top: 5.56vw;
    z-index: 8;
}

@media screen and (min-width: 500px) {
    .wrap-return-nav {
        width: 414px;
        height: 64px;
        font-weight: 500;
        position: fixed;
        left: 0;
        top: 0;
        background-color: white;
        line-height: 20px;
        display: flex;
        z-index: 8;
    }
    .return-btn {
        font-size: 20px;
        margin-left: 15px;
        margin-top: 19px;
        z-index: 8;
    }
    .return-title {
        font-size: 20px;
        margin-left: 15px;
        margin-top: 23px;
        z-index: 8;
    }
}
</style>
