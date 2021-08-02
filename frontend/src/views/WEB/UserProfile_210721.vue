<template>
  <div>
      <NavbarComponent/>
      <!-- 프로필 내용 -->
      <div class="container mt-5">
          <div class="row">
              <div class="col-4">
                  <img class="img-profile" :src="userInfo.picture" />
              </div>        
              <div class="offset-1 col-7">
                  <div class="d-flex justify-content-between">
                    <div class="p-2 bd-highlight">
                        <p class="nickname mb-3" v-text="nickname"></p>
                    </div>
                    <div class="p-2 bd-highlight">
                        <span style="font-size: 2rem; color: Red; margin-right: 20px; position: top;">
                          <i class="fas fa-ban"></i>
                        </span>
                        <span style="font-size: 2rem; color: Red; margin-right: 20px;">
                          <i class="fas fa-bullhorn"></i>
                        </span>

                        <span style="font-size: 2rem; color: Gray">
                        <i class="fas fa-cog"></i>
                        </span>
                    </div>
                  </div>   
                  <p class="info" v-text="mfti"></p>
                  <p class="info" v-text="followers"></p>
                  <p class="info" v-text="followings"></p>
                  <p class="follow-btn bold-btn" v-on:click="follow">follow</p>
              </div>                    
          </div>      
        <!-- 사용자가 쓴 포스트 -->
        <div class="row d-flex justify-content-center">
            <div class="col border-bottom d-flex justify-content-center mx-3"
            v-on:click="clickFeeds"
            v-bind:class="{'border-dark': selected === 1, 'border-light': selected !== 1}"
            >
                포스트 or 피드
            </div>
            <div class="col border-bottom d-flex justify-content-center mx-3"
            v-on:click="clickReviews"
            v-bind:class="{'border-dark': selected === 2, 'border-light': selected !== 2}"
            >
                리뷰
            </div>
            <div class="col border-bottom d-flex justify-content-center mx-3"
            v-on:click="clickLists"
            v-bind:class="{'border-dark': selected === 3, 'border-light': selected !== 3}"
            >
                맛집 리스트
            </div>
        </div>
            <!-- 피드일때 -->
            <div class="row row-cols-4 g-3" v-if="selected === 1">
                <div class="col mb-3" v-for="post in posts" v-bind:key="post.id">
                    <div>
                        <img class="img-profile block" :src="post.picture" />
                    </div>
                    <div>{{post.title}}</div>
                    <div class="info-extra">{{post.created}}</div>
                </div>
            </div>

            <!-- 리뷰일때 -->
            <div class="row" v-if="selected === 2">
                <div class="row border-top p-3" v-for="post in posts" v-bind:key="post.id"> 
                    <div class="col-2">
                        <img class="img-small" :src="post.picture" />
                    </div>
                    <div class="offset-1 col-5">
                        <p class="nickname mb-3">{{ post.title }}</p>
                        <p>{{ post.description }}</p>
                    </div>
                    <div class="offset-3 col-1">
                        {{ post.score }}
                    </div>
                </div>
            </div>
        <!-- container 끝 -->
      </div>
  </div>
</template>

<script>
import NavbarComponent from '@/components/common/Navbar'
import UserApi from '@/apis/UserApi'
export default {
    name: "profile",
    components:{
        NavbarComponent
    },
    data() {
        return {
            userInfo: {},
            posts: [],
            selected: 1,
        }
    },
    created() {
        this.userInfo = UserApi.requestProfile()
        this.posts =  UserApi.requestFeeds().data
        console.log(this.$route.params.id)
    },
    computed: {
        nickname() {
            return this.userInfo.nickname
        },
        mfti() {
            return 'MFTI: ' + this.userInfo.MFTI
        },
        followers() {
            return 'Followers: ' + this.userInfo.follwers
        },
        followings() {
            return 'Followings: ' + this.userInfo.follow
        }

    },
    methods:{
        clickFeeds() {
            this.posts = UserApi.requestFeeds().data
            this.selected = 1
        },
        clickReviews() {
            this.posts = UserApi.requestReviews().data
            this.selected = 2
        },
        clickLists() { 
            this.selected = 3
        },
        follow() {
            
        }
    }
}
</script>

<style>
.img-profile {
    width:100%;
    height:100%;
    /* object-fit:cover; */
    border-radius: 50px;
}
.img-small {
    width:100%;
    height:100%;
    /* object-fit:cover; */
    border-radius: 50px;
}
.nickname {
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 30px;
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
    width: 80px;
    height: 30px;
    left: 16px;
    top: 177px;
    background: rgba(0, 119, 182, 0.8);
    border-radius: 50px;
}

.bold-btn {
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 30px;
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