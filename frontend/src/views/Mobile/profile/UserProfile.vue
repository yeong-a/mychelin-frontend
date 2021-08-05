<template>
    <div>
        <!-- 프로필 내용 -->
        <ReturnNav inputTxt="profile"/>
        <div class="container margin-nav">
            <SweetModal ref="modal" title="Followers">
                <div v-if="!existFollowing"><EmptyContent data="팔로워"/></div>
                <div v-if="existFollowing">{{ modalFollowing }}</div>
            <!-- <sweet-button slot="button">That's fine!</sweet-button> -->
            </SweetModal>
            <div class="logo-location" v-on:click="goProfileEdit">
                <SettingsBtn/>
            </div>
            <div class="row">
                <div class="col-3 text-center"> 
                    <img class="img-profile" :src="userInfo.profileImage" />
                    <span class="nickname">{{ userInfo.nickname }}</span>
                </div>
                <div class="col-3 d-flex align-items-end">
                    <div class="text-center-box">
                        <p v-if="isFollowing"><i class="fas fa-check-circle"></i></p>
                        <div v-if="!isFollowing" v-on:click="clickFollow"><FollowBtn/></div>
                        <!-- <div v-if="isFollowing"><UnfollowBtn/></div> -->
                        <p>팔로워</p>
                        <p>{{ userInfo.follow }}</p>
                    </div>
                </div>

                <div class="col-3 d-flex align-items-end" v-on:click="openModal">
                    <div class="text-center-box">
                        <p>팔로잉</p>
                        <p>{{ userInfo.follower }}</p>
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
            <div class="col border-bottom d-flex justify-content-center mx-3"
            v-on:click="clickFeeds"
            v-bind:class="{'border-dark': selected === 1, 'border-light': selected !== 1}"
            >
                포스트
            </div>
            <div class="col border-bottom d-flex justify-content-center mx-3"
            v-on:click="clickReviews"
            v-bind:class="{'border-dark': selected === 2, 'border-light': selected !== 2}"
            >
                리뷰
            </div>
            <div class="col border-bottom d-flex justify-content-center mx-3"
            v-on:click="clickMychelin"
            v-bind:class="{'border-dark': selected === 3, 'border-light': selected !== 3}"
            >
                맛집 리스트
            </div>
        </div>
        <!-- 피드일때 -->
        <div v-if="selected === 1">
            <UserPost :posts="posts"/>
        </div>
        <!-- 리뷰일때 -->
        <div class="row" v-if="selected === 2">
            <UserReview :posts="posts"/>
        </div>
        <!-- 맛집리스트일 때 -->
        <div class="row mx-3" v-if="selected === 3">
            <UserMychelin :mychelin="posts"/>
            
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
import { SweetModal } from 'sweet-modal-vue'
import UserApi from '@/apis/UserApi'
import PostApi from '@/apis/PostsApi'
import EmptyContent from '@/components/error/EmptyContent'
import ReturnNav from '@/components/user/ReturnNav'
import FollowBtn from '@/components/btn/FollowBtn'
import SettingsBtn from '@/components/btn/SettingsBtn'
import UserPost from './UserPost'
import UserReview from './UserReview'
import UserMychelin from './UserMychelin'
 
// import UnfollowBtn from '@/components/btn/Unfollow'
export default {
    name: "profile",
    components:{
        SweetModal,
        // SweetModalTab,
        EmptyContent,
        ReturnNav,
        FollowBtn,
        SettingsBtn,
        // UnfollowBtn,
        UserPost,
        UserReview,
        UserMychelin
    },
    data() {
        return {
            userInfo: {},
            posts: [],
            selected: 1,
            followingUsers: [],
        }
    },
    created() {
        UserApi.requestProfile(this.$route.params.id)
        .then(res => {
            this.userInfo = res.data
            UserApi.requestFeeds(this.nickname)
            .then((res) => {
                this.posts = res.data.data
            })
        })
        
    },
    computed: {
        nickname() {
            // return this.userInfo.nickname
            return this.$route.params.id
        },
        mfti() {
            return 'MFTI: ' + this.userInfo.MFTI
        },
        followers() {
            return 'Followers: ' + this.userInfo.follwers
        },
        followings() {
            return 'Followings: ' + this.userInfo.follow
        },
        isFollowing() {
            return (this.userInfo.isFollowing === null) || (this.userInfo.isFollowing)
        },
        modalFollowing() {
            return this.followingUsers
        },
        existFollowing() {
            return this.followingUsers.length !== 0
        }
        

    },
    methods:{
        clickFeeds() {
            // this.posts = UserApi.requestFeeds().data
            UserApi.requestFeeds(this.nickname)
            .then((res) => {
                this.posts = res.data.data
                this.selected = 1
            })
        },
        clickReviews() {
            UserApi.requestReviews(this.$route.params.id)
            .then(res => {
                this.posts = res.data.data.reviews
                this.selected = 2
            })
            
        },
        clickMychelin() { 
            PostApi.requestMyMychelin(this.nickname)
            .then((res) => {
                this.posts = res.data.data.placeListItem
                this.selected = 3
            })
            // this.posts = UserApi.requestLists().data
            
        },
        clickFollow() {
            let data = {'userNickname': this.$route.params.id}
            UserApi.follow(data)
            .then((res) => {
                window.swal(`${this.$route.params.id}님에게 팔로우 요청을 보냈습니다!`)
                .then(
                    () => {
                    this.userInfo.isFollowing = true
                });  
            })
        },
        openModal() {
            UserApi.getFollowings(this.$route.params.id)
            .then((res) => {
                this.followingUsers = res.data.data
                this.$refs.modal.open()
            })
        },
        goProfileEdit() {
            this.$router.push({ name: 'EditProfileM'})
        }
    }
}
</script>
<style scoped>
.logo-location {
    position: fixed;
    top: 1em;
    right: 1.5em;
    /* font-size: 50px;
    color:#000000;
    z-index: 5; */
}
</style>
<style>

.margin-nav{
	margin-top: 5em;
}

.text-center-box { 
  text-align: center;
  }

.img-profile {
    width:70%;
    height:auto;
    border-radius: 5em;
}
.img-full {
    width:100%;
    height:auto;
}
/* .img-full-round {
    width:8vh;
    height:8vh;
    border-radius: 5em;
} */
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

.follow-btn {
    width: 3.8em;
    height: 1.5em;
    left: 8em;
    top: 0.5em;

    /* Background Orange */

    background: #FFC6B4;
    border-radius: 50px;
}

.bold-btn {
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 1em;
    /* line-height: 30px; */
    /* identical to box height, or 125% */
    text-align: center;
    color: #FFFFFF;
}

.info-extra {
    font-family: Roboto;
    font-style: normal;
    font-size: 16px;
    /* identical to box height, or 125% */
    text-align: right;
    color: #999999;
}
</style>