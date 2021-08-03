<template>
    <div>
        <div>
            <ReturnNav inputTxt="프로필 수정" />
            <!-- 프로필 내용 -->
            <div id="profile">
                <div class="header-wrap d-flex">
                    <div id="profile-img-container">
                        <img
                            v-if="isImage"
                            v-bind:src="userInfo.profileImage"
                            id="profile-img"
                        />
                        <div v-else class="blank-image"></div>
                        <i class="far fa-edit" id="profile-img-edit" />
                    </div>
                    <div
                        class="
                            d-flex
                            flex-column
                            justify-content-center
                            font-fourteen
                        "
                    >
                        <p id="profile-username">{{ userInfo.nickname }}</p>
                        <p>MFTI : {{ userInfo.MFTI }}</p>
                        <p>gender : gender 하드코딩 없음</p>
                    </div>
                </div>
                <router-view />
            </div>
        </div>
    </div>
</template>

<script>
import UserApi from "@/apis/UserApi";
import ReturnNav from '@/components/user/ReturnNav.vue'

export default {
    name: "EditProfile",
    components: {
        ReturnNav
    },
    data() {
        return {
            userInfo: {},
        };
    },
    computed: {
        isImage: function () {
            if (this.userInfo.profileImage) return true;
            return false;
        },
    },
    created() {
        const nickname = localStorage.getItem("nickname");
        UserApi.requestProfile(nickname).then((res) => {
            this.userInfo = res.data;
        });
    },
};
</script>

<style scoped>
#profile {
    margin: 70px 20px 0;
}

.header-wrap {
    margin: 25px 0;
}

#profile-img-container {
    margin: 0 20px 0 0;
    position: relative;
}

#profile-img {
    width: 80px;
    border-radius: 50%;
}

.blank-image {
    width: 80px;
    height: 80px;
}

#profile-img-edit {
    position: absolute;
    font-size: 250%;
    bottom: 3px;
    right: 3px;
    z-index: 1;
    width: 35%;
    height: 35%;
    padding: 4px 3px 6px 7px;
    background: orange;
    border-radius: 50%;
}

#profile-username {
    font-size: 18px;
    font-weight: bold;
}

.font-eighteen {
    font-size: 18px;
}

.font-fourteen {
    font-size: 14px;
}
</style>