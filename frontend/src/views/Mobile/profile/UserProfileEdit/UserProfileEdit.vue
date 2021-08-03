<template>
    <div>
        <ReturnNav inputTxt="프로필 수정" />
        <!-- 프로필 내용 -->
        <div id="profile-edit">
            <UserProfileImage
                profileImg="https://picsum.photos/200/200"
                id="profile-img"
            />
            <UserProfileInfo />
        </div>
    </div>
</template>

<script>
import UserApi from "@/apis/UserApi"
import ReturnNav from "@/components/user/ReturnNav.vue"
import UserProfileImage from "./UserProfileImage.vue"
import UserProfileInfo from "./UserProfileInfo.vue"

export default {
    name: "EditProfile",
    components: {
        ReturnNav,
        UserProfileImage,
        UserProfileInfo,
    },
    data() {
        return {
            userInfo: {},
        };
    },
    created() {
        const nickname = localStorage.getItem("nickname")
        UserApi.requestProfile(nickname).then((res) => {
            this.userInfo = res.data;
        })
    },
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