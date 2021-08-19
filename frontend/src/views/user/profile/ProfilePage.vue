<template>
    <div>
        <!-- 프로필 내용 -->
        <BackNav :navTitle="nickname" :routeBackTo="backNavProps" />
        <div class="container margin-nav">
            <SweetModal ref="modalr" title="Followers">
                <div v-if="!existFollower"><EmptyContent data="팔로워가" /></div>
                <div class="container" v-if="existFollower">
                    <div class="row border-bottom py-2" v-for="fwr in modalFollower" :key="fwr.id">
                        <img class="col-3 img-prf" :src="fwr.profileImage" />
                        <div class="col-3">{{ fwr.nickname }}</div>
                        <div class="col-6">{{ fwr.bio }}</div>
                    </div>
                </div>
            </SweetModal>

            <SweetModal ref="modali" title="Followings">
                <div v-if="!existFollowing"><EmptyContent data="팔로잉이" /></div>
                <div class="container" v-if="existFollowing">
                    <div class="row border-bottom py-2" v-for="fwi in modalFollowing" :key="fwi.id">
                        <img class="col-3 img-prf" :src="fwi.profileImage" />
                        <div class="col-3">{{ fwi.nickname }}</div>
                        <div class="col-6">{{ fwi.bio }}</div>
                    </div>
                </div>
            </SweetModal>
            <div class="logo-location d-flex" v-if="isMe">
                <div v-on:click="goBookmark">
                    <BookmarkBtn />
                </div>
                <div v-on:click="goProfileEdit">
                    <SettingsBtn />
                </div>
            </div>
            <div class="row">
                <div class="col-3 text-center">
                    <img class="img-profile" :src="userInfo.profileImage" />
                    <!-- <span class="nickname">{{ userInfo.nickname }}</span> -->
                </div>
                <div class="col-3 d-flex align-items-end">
                    <div class="text-center-box">
                        <!-- <p v-if="checkActive"><i class="fas fa-check-circle"></i></p> -->
                        <div v-if="followActive" v-on:click="clickFollow"><FollowBtn /></div>
                        <div v-if="cancelFollowActive" v-on:click="cancelFollow"><CancelFollowBtn /></div>
                        <div v-if="unfollowActive" v-on:click="clickUnfollow"><UnfollowBtn /></div>
                        <div v-on:click="openFollower">
                            <p>팔로워</p>
                            <p>{{ userInfo.follower }}</p>
                        </div>
                    </div>
                </div>

                <div class="col-3 d-flex align-items-end" v-on:click="openFollowing">
                    <div class="text-center-box">
                        <p>팔로잉</p>
                        <p>{{ userInfo.follow }}</p>
                    </div>
                </div>
                <div class="col-3 d-flex align-items-end">
                    <div class="text-center-box">
                        <p>포크 지수</p>
                        <p><i class="fas fa-utensils"></i> {{ userInfo.like }}</p>
                    </div>
                </div>
            </div>

            <div class="row m-3">
                {{ userInfo.bio }}
            </div>
            <!-- 포스트/리뷰/맛집리스트 탭 -->
            <div class="row d-flex justify-content-center mb-3">
                <div class="col border-bottom d-flex justify-content-center mx-3" v-on:click="clickFeeds" v-bind:class="{ 'border-dark': selected === 1, 'border-light': selected !== 1 }">
                    포스트
                </div>
                <div class="col border-bottom d-flex justify-content-center mx-3" v-on:click="clickReviews" v-bind:class="{ 'border-dark': selected === 2, 'border-light': selected !== 2 }">
                    리뷰
                </div>
                <div class="col border-bottom d-flex justify-content-center mx-3" v-on:click="clickMychelin" v-bind:class="{ 'border-dark': selected === 3, 'border-light': selected !== 3 }">
                    맛집 리스트
                </div>
            </div>
            <!-- 피드일때 -->

            <div v-if="selected === 1">
                <ProfileFeed :posts="posts" />
            </div>
            <!-- 리뷰일때 -->
            <div class="row" v-if="selected === 2">
                <ProfilePlaceReview :posts="posts" />
            </div>
            <!-- 맛집리스트일 때 -->
            <div class="row mx-3" v-if="selected === 3">
                <ProfilePlaceList :placeList="posts" />

                <!-- <div class="row border-bottom p-3" v-for="post in posts" v-bind:key="post.id"> 
            <div class="offset-1 col-9">{{post.listName}}</div>
            <div class="col-1">
                <span style="font-size: 1em; color: Black; position: top;">
                <i class="fas fa-sort-down"></i>
                </span>
            </div>
            </div> -->
            </div>
            <!-- container 끝 -->
        </div>
    </div>
</template>

<script>
import { SweetModal } from "sweet-modal-vue";
import UserApi from "@/apis/UserApi";
import PostApi from "@/apis/PostsApi";
import EmptyContent from "@/components/error/EmptyContent";
import BackNav from '@/components/navs/BackNav.vue'
import FollowBtn from "@/components/btn/FollowBtn";
import CancelFollowBtn from "@/components/btn/CancelFollowBtn";
import UnfollowBtn from "@/components/btn/UnfollowBtn";
import SettingsBtn from "@/components/btn/SettingsBtn";
import BookmarkBtn from "@/components/btn/BookmarkBtn";
import ProfileFeed from "./ProfileFeed";
import ProfilePlaceReview from "./ProfilePlaceReview";
import ProfilePlaceList from "./ProfilePlaceList";

export default {
    name: "profile",
    components: {
        SweetModal,
        // SweetModalTab,
        EmptyContent,
        BackNav,
        FollowBtn,
        CancelFollowBtn,
        SettingsBtn,
        BookmarkBtn,
        UnfollowBtn,
        ProfileFeed,
        ProfilePlaceReview,
        ProfilePlaceList,
    },
    data() {
        return {
            userInfo: {},
            posts: [],
            selected: 1,
            followingUsers: [],
            followerUsers: [],
            backNavProps: {},
        };
    },
    created() {
        window.scrollTo(0, 0);
        UserApi.requestProfile(this.$route.params.nickname).then((res) => {
            this.userInfo = res.data;
            UserApi.requestFeeds(this.nickname).then((res) => {
                this.posts = res.data.data;
            });
        });
    },
    computed: {
        nickname() {
            // return this.userInfo.nickname
            return this.$route.params.nickname;
        },
        mfti() {
            return "MFTI: " + this.userInfo.MFTI;
        },
        followers() {
            return "Followers: " + this.userInfo.follwers;
        },
        followings() {
            return "Followings: " + this.userInfo.follow;
        },
        checkActive() {
            //return this.userInfo.isFollowing === null || this.userInfo.isFollowing;
            // 본인이거나 팔로우를 승인 했거나?
            return this.userInfo.isFollowing == 2;
        },
        followActive() {
            return !this.isMe && this.userInfo.isFollowing === 0;
        },
        cancelFollowActive() {
            return !this.isMe && this.userInfo.isFollowing === 1;
        },
        unfollowActive() {
            return !this.isMe && this.userInfo.isFollowing === 2;
        },
        modalFollowing() {
            return this.followingUsers;
        },
        modalFollower() {
            return this.followerUsers;
        },
        existFollowing() {
            return this.followingUsers !== null;
        },
        existFollower() {
            return this.followerUsers !== null;
        },
        isMe() {
            return this.userInfo.nickname === localStorage.getItem("nickname");
        },
    },
    methods: {
        clickFeeds() {
            // this.posts = UserApi.requestFeeds().data
            UserApi.requestFeeds(this.nickname).then((res) => {
                this.posts = res.data.data;
                this.selected = 1;
            });
        },
        clickReviews() {
            UserApi.requestReviews(this.nickname).then((res) => {
                this.posts = res.data.data.reviews;
                this.selected = 2;
            });
        },
        clickMychelin() {
            PostApi.requestMyMychelin(this.nickname).then((res) => {
                this.posts = res.data.data.placeListItem;
                this.selected = 3;
            });
            // this.posts = UserApi.requestLists().data
        },
        // clickFollow() {
        //     let data = { userNickname: this.nickname };
        //     UserApi.follow(data).then((res) => {
        //         if (res.data.message.includes('취소')) {
        //             window.swal("이미 팔로우 요청을 보낸 사용자입니다. 요청을 취소하시겠습니까?", {
        //             dangerMode: true,
        //             buttons: {
        //                 cancel: "Cancel",
        //                 ok: {text:'Yes',className:'sweet-warning'},
        //             },
        //             })
        //             .then((value) => {
        //                 // 요청취소를 취소하는거니까 다시 follow를 해야함
        //                 if (value !== 'ok') UserApi.follow(data)
        //             })
        //         } else {
        //             window.swal(`${this.nickname}님에게 팔로우 요청을 보냈습니다.`)
        //         }
        //     })
        // },
        clickFollow() {
            let data = { userNickname: this.nickname };
            UserApi.follow(data).then((res) => {
                window.swal(`${this.nickname}님에게 팔로우 요청을 보냈습니다.`);
                this.userInfo.isFollowing = 1;
            });
        },
        cancelFollow() {
            let data = { userNickname: this.nickname };
            UserApi.follow(data).then((res) => {
                window.swal(`팔로우 요청을 취소했습니다.`);
                this.userInfo.isFollowing = 0;
            });
        },
        clickUnfollow() {
            let data = { userNickname: this.nickname };
            UserApi.unfollow(data).then((res) => {
                window.swal(`${this.nickname}님의 팔로우를 취소했습니다!`).then(() => {
                    this.userInfo.isFollowing = 0;
                });
            });
        },
        openFollowing() {
            UserApi.getFollowings(this.nickname).then((res) => {
                this.followingUsers = res.data.data;
                this.$refs.modali.open();
            });
        },
        openFollower() {
            UserApi.getFollowers(this.nickname).then((res) => {
                this.followerUsers = res.data.data;
                this.$refs.modalr.open();
            });
        },
        goBookmark() {
            this.$router.push({ name: "BookmarkPagePlaces" });
        },
        goProfileEdit() {
            this.$router.push({ name: "ProfileEdit" });
        },
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            if (from.name === "SearchPage")
                vm.backNavProps = { name: 'SearchPage' }
            else
                vm.backNavProps = { name: 'MainPage' }
        })
    }
};
</script>
<style scoped>
.logo-location {
    position: fixed;
    top: 1em;
    right: 1.5em;
    /* font-size: 50px;
    color:#000000;*/
    z-index: 9;
}

.img-profile {
  /* width: 3em;
  height: 3em; */
  width: 5em;
  height: 5em;
  /* height: auto; */
  border-radius: 5em;
}
</style>
<style>
.margin-nav {
    margin-top: 5em;
}

.text-center-box {
    text-align: center;
}

.nickname {
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 1.5em;
    /* line-height: 30px; */
    /* or 125% */
    color: #000000;
}

.info {
    font-family: Roboto;
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 30px;
    /* or 125% */
    color: #000000;
}

.info-extra {
    font-family: Roboto;
    font-style: normal;
    font-size: 16px;
    /* identical to box height, or 125% */
    text-align: right;
    color: #999999;
}

.img-prf {
    position: relative;
    width: 10vh;
    height: 7vh;
}

.sweet-warning {
    background-color: red;
}

.sweet-title {
    padding-top: 1em;
}
</style>
