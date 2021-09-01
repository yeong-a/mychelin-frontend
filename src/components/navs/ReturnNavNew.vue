<template>
    <div class="d-flex nav-container">
        <div class="return-btn-new" v-on:click="backButton"><i class="fas fa-angle-left"></i></div>
        <div class="return-title-new">{{ inputTxt }}</div>
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

<style scoped>
* {
    font-family: "Spoqa Han Sans Neo", "sans-serif";
}

.nav-container {
    width: 100%;
    height: 3em;
    font-weight: 500;
    position: fixed;
    background-color: white;
    z-index: 5;
}
.return-btn-new {
    font-size: 1.5em;
    margin-top: 0.5em;
    margin-left: 0.5em;
    z-index: 6;
}
.return-title-new {
    font-size: 1.5em;
    margin-top: 0.5em;
    margin-left: 0.5em;
    z-index: 6;
}

@media screen and (min-width: 992px) {
    .nav-container {
        /* left: 50%;
        transform: translate(-50%, 0); */
    }
    
}
/*
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
} */
</style>
