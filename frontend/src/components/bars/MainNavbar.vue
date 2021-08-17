<template>
    <div class="main-nav-bar">
        <div>
            <div class="c1" style="padding-top:0.5em">
                <span class="logo-letter" v-on:click="goHome" style="font-weight:normal">MYCHÉLIN</span>
            </div>
            <div class="c2">
                <span class="icon-orange" v-on:click="goSearchPage"><i class="bi bi-search"></i></span>
                <span class="icon-orange"><i class="bi bi-bell"></i></span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        goHome() {
            window.scrollTo(0, 0);
            if (this.$route.path === "/main") {
                //this.$router.go(); // reload
                window.location.reload();
            } else {
                this.$router.push({ name: "MainPage" });
            }
        },
        goSearchPage() {
            this.$router.push({name: 'SearchPage'})
        }
    }
}
</script>

<style scoped>
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