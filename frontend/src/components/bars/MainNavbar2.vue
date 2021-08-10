<template>
    <div class="main-nav-bar">
        <div>
            <div class="c1" v-if="status === 0" style="padding-top:0.5em">
                <span class="logo-letter" v-on:click="goHome" style="font-weight:normal">MYCHÉLIN</span>
            </div>
            <div class="c1" v-if="status !== 0" v-on:click="status = 0" style="padding-top:0.5em">
                <ReturnBtn />
            </div>
            <div class="" v-if="status === 1" style="padding-top:0.5em">
                <SearchBar />
            </div>
            <div class="c2" v-if="!status" style="">
                <span class="icon-orange" v-on:click="status = 1"><i class="bi bi-search"></i></span>
                <span class="icon-orange" v-on:click="mftiTemp"><i class="bi bi-bell"></i></span>
                <span class="icon-orange" v-on:click="goProfile"><i class="bi bi-person-circle"></i></span>
            </div>
        </div>
    </div>
</template>

<script>
import ReturnBtn from "./ReturnBtn";
import SearchBar from "./SearchBar";

export default {
    components: {
        ReturnBtn,
        SearchBar,
    },

    data() {
        return {
            status: 0, // 초기 상태
        };
    },
    methods: {
        goHome() {
            window.scrollTo(0, 0);
            if (this.$route.path === "/main") {
                this.$router.go(); // reload
            } else {
                this.$router.push({ name: "MainPage" });
            }
        },
        goProfile() {
            window.scrollTo(0, 0);
            if (localStorage.getItem("jwt") === null) {
                window.swal(`로그인이 필요합니다!`).then(() => {
                    this.$router.push({ name: "Login" });
                });
            } else this.$router.push({ name: "ProfilePage", params: { nickname: localStorage.getItem("nickname") } });
        },
        mftiTemp() {
            window.scrollTo(0, 0);
            this.$router.push({ name: "MftiPage" });
        },
    },
};
</script>

<style>
.logo-letter {
    width: 7em;
    left: 1em;
    font-style: normal;
    font-weight: bold;
    font-size: 2em;
    letter-spacing: -0.05em;

    color: #ff742e;
}
.main-nav-bar {
    width: 100%;
    /* height: 4em; */
    background-color: #ffffff;
    position: fixed;
    z-index: 5;
    top: 0;
    padding: 0em 1em 0.5em 1em;
}

.c1 {
    float: left;
}
.c2 {
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
