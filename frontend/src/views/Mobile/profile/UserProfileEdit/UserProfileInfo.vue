<template>
    <div id="info-wrap">
        <!-- 계정 정보 -->
        <div class="info-sub-wrap">
            <div class="d-flex justify-content-between">
                <p>닉네임</p>
                <input
                    v-model="userInfo.nickname"
                    type="text"
                    class="profile-input"
                />
            </div>
            <hr />
            <div class="d-flex justify-content-between">
                <p>바이오</p>
                <input
                    v-model="userInfo.bio"
                    type="text"
                    class="profile-input"
                />
            </div>
            <hr />
            <div class="d-flex justify-content-between">
                <p>전화번호</p>
                <p class="profile-info">
                    전화번호 하드코딩 없음
                    <router-link v-bind:to="{ name: 'EditProfileMPhone' }">
                        <button class="change-button">변경</button>
                    </router-link>
                </p>
            </div>
            <hr />
            <router-link v-bind:to="{ name: 'EditProfileMPassword' }">
                <p class="router-link">비밀번호 변경</p>
            </router-link>
        </div>
        <hr class="thick-hr" />
        <!-- 알림 설정 -->
        <h2>알림 설정</h2>
        <div class="info-sub-wrap">
            <div class="d-flex justify-content-between">
                <span>계정 공개</span>
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" />
                </div>
            </div>
            <hr />
            <div class="d-flex justify-content-between">
                <span>댓글 알림</span>
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" />
                </div>
            </div>
            <hr />
            <div class="d-flex justify-content-between">
                <span>팔로우 알림</span>
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" />
                </div>
            </div>
        </div>
        <hr class="thick-hr" />
        <!-- 로그아웃/수정하기 버튼 -->
        <div class="d-flex justify-content-center">
            <button v-on:click="modifyUser" class="button-modify">정보 수정</button>
        </div>
        <hr class="thick-hr" />
        <div class="d-flex justify-content-end">
            <button v-on:click="logout">
                <i class="fas fa-sign-out-alt"></i>로그아웃
            </button>
            <router-link v-bind:to="{ name: 'EditProfileMWithdraw' }" id="withdraw-button">
                <p class="router-link">회원탈퇴</p>
            </router-link>
        </div>
    </div>
</template>

<script>
import UserApi from "@/apis/UserApi";

export default {
    name: "EditProfileInfo",
    data() {
        return {
            userInfo: {},
        };
    },
    methods: {
        // 로그아웃 버튼 클릭 시
        logout: function () {
            localStorage.removeItem("jwt");
            localStorage.removeItem("nickname");
            this.$router.push({ name: "Home" });
        },
        // 정보 수정 버튼 클릭 시
        modifyUser: function () {
            const info = {
                bio: this.userInfo.bio,
                nickname: this.userInfo.nickname,
                phone_number: "no phone num",
                profile_image: this.userInfo.profile_image,
            };
            UserApi.requestModifyInfo(info).then((res) => {
                this.userInfo = res.data;
                this.$router.push({ name: "Profile" });
            });
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
#info-wrap {
    font-size: 16px;
}

.info-sub-wrap {
    margin: 15px 0 0 0;
}

#info-wrap h2 {
    font-size: 20px;
    color: #9b9b9b;
}

.profile-input {
    padding: 15px;
    border: none;
    height: 30px;
    text-align: right;
}

.profile-info {
    color: #9b9b9b;    
}

.change-button {
    width: 45px;
    height: 30px;
    border-radius: 12px;
    background-color: #ff993c;
    margin: 0 0 0 10px;
}

#info-wrap hr {
    color: #ff993c;
    margin: 8px;
}

.thick-hr {
    height: 3px;
}

.router-link {
    color: black;
}

.button-modify {
    width: 200px;
    height: 35px;
    border-radius: 8px;
    background-color: #ff993c;
}

#withdraw-button {
    margin: 0 0 0 10px;
}
</style>