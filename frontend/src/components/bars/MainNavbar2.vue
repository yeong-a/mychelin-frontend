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
                <!-- <span class="icon-orange" v-on:click="mftiTemp"><i class="bi bi-bell"></i></span> -->

                <button type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" v-on:click="getNotice">
                    <span class="icon-orange"><i class="bi bi-bell"></i></span>
                </button>

                <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                    <div class="offcanvas-header" style=" padding-bottom:0">
                        <h3 id="offcanvasRightLabel" style="font-weight:500;">새소식</h3>
                        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body">
                        <div class="spinner-border text-primary" role="status" v-if="notice.length === 0">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        <div class="notices" v-else>
                            <div class="notice" v-for="noti in notice" v-bind:key="noti.key" v-bind:class="{ isRead: noti.read }" v-on:click="readNotice(noti.id, noti.type)">
                                <span v-if="noti.type === 'POSTLIKE'"
                                    ><span style="font-weight:500;">{{ noti.postLikeUserNickname }}</span
                                    >님이 회원님의 게시글에 좋아요를 눌렀습니다 <span style="color:#E8E8E8;font-weight:300">{{ noti.addTime.slice(5, 10) }}</span></span
                                >
                                <span v-else-if="noti.type === 'COMMENT'" style="white-space: noraml;overflow: hidden;text-overflow: ellipsis;"
                                    ><span style="font-weight:500">{{ noti.writerNickname }}</span
                                    >님이 회원님의 게시글에 댓글을 달았습니다: {{ noti.commentMessage }} <span style="color:#E8E8E8;font-weight:300">{{ noti.addTime.slice(5, 10) }}</span></span
                                >
                                <span v-else
                                    ><span style="font-weight:500">{{ noti.userNickname }}</span
                                    >님이 팔로우를 요청했습니다 <span style="color:#E8E8E8;font-weight:300">{{ noti.addTime.slice(5, 10) }}</span></span
                                >
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <span class="icon-orange"><i class="bi bi-bell"></i></span> -->
                <!-- <span class="icon-orange" v-on:click="goProfile"><i class="bi bi-person-circle"></i></span> -->
            </div>
        </div>
    </div>
</template>

<script>
import ReturnBtn from "@/components/btn/ReturnBtn";
import SearchBar from "./SearchBar";
import UserApi from "@/apis/UserApi.js";

var offcanvasElementList = [].slice.call(document.querySelectorAll(".offcanvas"));
var offcanvasList = offcanvasElementList.map(function(offcanvasEl) {
    return new window.Offcanvas(offcanvasEl);
});
export default {
    components: {
        ReturnBtn,
        SearchBar,
    },

    data() {
        return {
            status: 0, // 초기 상태
            notice: [],
        };
    },
    mounted() {},
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
        getNotice() {
            // console.log("nononotiti")
            UserApi.requestNotice()
                .then((res) => {
                    this.notice = res.data.data;
                })
                .catch((err) => {
                    window.swal(err.response.message);
                });
        },
        readNotice(id, type) {
            console.log(id, type);
            UserApi.readNotice(id, type);
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
.notice {
    height: 60px;
    border-top: 1px solid #c4c4c4;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.isRead {
    background-color: blue;
}
</style>
