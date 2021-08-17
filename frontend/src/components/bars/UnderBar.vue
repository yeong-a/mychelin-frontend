<template>
    <div class="under-bar d-flex ">
        <div class="split-4" v-on:click="clickFeed">
            <span class="icon-middle">
                <i class="bi bi-house-fill" style="color:orange" v-if="currentPage === 0"></i>
                <i class="bi bi-house-fill" style="color:blue" v-else-if="currentPage === 4"></i>
                <i class="bi bi-house" style="color:#FFC6B4" v-else></i>
            </span>
        </div>
        <!-- <div class="split-5" v-on:click="clickPlace">
            <span class="icon-middle">
                <i class="bi bi-geo-alt-fill" style="color:orange" v-if="currentPage === 1"></i>
                <i class="bi bi-geo-alt" style="color:#FFC6B4" v-else></i>
            </span>
        </div> -->
        <div class="split-4">
            <span class="icon-middle" v-on:click="clickPosting">
                <i class="bi bi-plus-circle-fill" style="color:orange" v-if="currentPage === 1"></i>
                <i class="bi bi-plus-circle" style="color:#FFC6B4" v-else></i>
            </span>
        </div>
        <div class="split-4" v-on:click="clickMychelin">
            <span class="icon-middle">
                <i class="bi bi-geo-alt-fill" style="color:orange" v-if="currentPage === 2"></i>
                <i class="bi bi-geo-alt" style="color:#FFC6B4" v-else></i>
            </span>
        </div>
        <div class="split-4">
            <span class="icon-middle" v-on:click="goProfile">
                <img :src="userProfileImage" v-if="userProfileImage" alt="" style="width:28px;height:28px;border-radius:50%;" />

                <span v-else>
                    <i class="bi bi-person-circle-fill" style="color:orange" v-if="currentPage === 3"></i>
                    <i class="bi bi-person-circle" style="color:#FFC6B4" v-else></i>
                </span>
            </span>
        </div>
    </div>
</template>

<script>
import PostsApi from "@/apis/PostsApi";
import UserApi from "@/apis/UserApi";

export default {
    data: () => {
        return {
            userProfileImage: localStorage.getItem("profileImg"),
        };
    },
    created() {
        console.log("Cre");
        UserApi.requestProfile(localStorage.getItem("nickname")).then((res) => {
            if (this.userProfileImage !== res.data.profileImage) {
                localStorage.setItem("profileImg", res.data.profileImage);
                this.userProfileImage = res.data.profileImage;
            }
        });
    },
    methods: {
        clickFeed() {
            // PostsApi.requestPosts(this.$store.getters.searchKeyword);
            window.scrollTo(0, 0);
            this.$store.state.infinitefeed = 3;
            this.$store.state.feedlimit = 2;
            this.$store.state.infinitefeedfol = 3;
            this.$store.state.feedlimitfol = 2;
            if (this.currentPage == 0) this.$store.commit("SWAP_PAGE", 4);
            else this.$store.commit("SWAP_PAGE", 0);
        },
        /*clickPlace() {
            window.scrollTo(0, 0);
            this.$store.state.searchKeyword = "";
            PostsApi.requestRestaurants(this.$store.getters.searchKeyword);
            this.$store.commit("SWAP_PAGE", 1);
        },*/
        clickPosting() {
            window.scrollTo(0, 0);
            if (!localStorage.getItem("jwt") || !localStorage.getItem("nickname")) window.swal("로그인 후 이용해 주세요!");
            else this.$router.push({ name: "FeedPosting" });
        },
        clickMychelin() {
            window.scrollTo(0, 0);
            this.$store.state.searchKeyword = "";
            PostsApi.requestMychelin(this.$store.getters.searchKeyword);

            this.$store.commit("SWAP_PAGE", 2);
        },
        goProfile() {
            window.scrollTo(0, 0);
            if (localStorage.getItem("jwt") === null) {
                window.swal(`로그인이 필요합니다!`).then(() => {
                    this.$router.push({ name: "Login" });
                });
            } else this.$router.push({ name: "ProfilePage", params: { nickname: localStorage.getItem("nickname") } });
        },
    },
    computed: {
        currentPage() {
            return this.$store.getters.currentPage;
        },
    },
};
</script>

<style>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css");

.icon-middle {
    font-size: 2em;
}

.split-4 {
    width: 25%;
    text-align: center;
    height: 3em;
    line-height: 3.2em;
}
.bg-orange {
    background-color: #ff742e;
}

.under-bar {
    width: 100%;
    height: 4em;
    background-color: #ffffff;
    position: fixed;
    bottom: 0;
    z-index: 3;
}
</style>
