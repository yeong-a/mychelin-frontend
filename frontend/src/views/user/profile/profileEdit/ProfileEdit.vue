<template>
    <div>
        <BackNav nav-title="프로필 수정" :route-back-to="backNavProps" />
        <!-- 프로필 내용 -->
        <div id="profile-edit">
            <ProfileImage
                :profile-img="userInfo.profileImage"
                id="profile-img"
            />
            <ProfileInfo />
        </div>
    </div>
</template>

<script>
import UserApi from "@/apis/UserApi"
import BackNav from '@/components/navs/BackNav.vue'
import ProfileImage from "./ProfileImage.vue"
import ProfileInfo from "./ProfileInfo.vue"

export default {
    name: "EditProfile",
    components: {
        BackNav,
        ProfileImage,
        ProfileInfo,
    },
    data() {
        return {
            userInfo: {},
            backNavProps: {
                name: 'ProfilePage',
                params: {
                    nickname: localStorage.getItem('nickname'),
                },
            },
        };
    },
    created() {
        const nickname = localStorage.getItem("nickname")
        UserApi.requestProfile(nickname).then((res) => {
            this.userInfo = res.data;
        })
    },
    methods: {
        getUserInfo() {
            const nickname = localStorage.getItem("nickname")
            UserApi.requestProfile(nickname).then((res) => {
                this.userInfo = res.data;
            })
        }
    },
    // Vue router 네비게이션 가드 활용
    // router를 통해 컴포넌트로 들어올 때, 컴포넌트가 렌더링되기 전 호출된다
    // 다만, next 안에 callback function을 넣음으로서 this 인스턴스에 접근할 수 있다
    beforeRouteEnter(to, from, next) {
        next(vm => {
            if (from.name === 'ProfileImageChange')
                setTimeout(vm.getUserInfo(), 1000)
        })
    },
    afterEach(to, from) {
        console.log(from)
    }
}
</script>

<style scoped>
#profile-edit {
    margin: 70px 20px 0;
}

#profile-img {
    margin: auto;
}
</style>