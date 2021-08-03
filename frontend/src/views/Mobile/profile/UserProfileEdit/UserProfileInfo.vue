<template>
    <div id="body-wrap">
        <!-- 계정 정보 -->
        <h2>계정</h2>
        <div class="body-sub-wrap">
            <div class="d-flex justify-content-between">
                <p>전화번호</p>
                <p class="profile-info">
                    전화번호 하드코딩 없음
                    <router-link v-bind:to="{ name: 'EditProfileMPhone' }">
                        <button id="password-change-button">변경</button>
                    </router-link>
                </p>
            </div>
            <hr />
            <div class="d-flex justify-content-between">
                <p>이메일</p>
                <input
                    type="tel"
                    class="profile-input"
                    placeholder="이메일 하드코딩 없음"
                />
            </div>
            <hr />
            <router-link v-bind:to="{ name: 'EditProfileMPassword' }">
                <p class="router-pg">비밀번호 변경하기</p>
            </router-link>
            <hr />
            <router-link v-bind:to="{ name: 'EditProfileMWithdraw' }">
                <p class="router-pg">회원 탈퇴하기</p>
            </router-link>
        </div>
        <hr />
        <!-- 알림 설정 -->
        <h2>알림 설정</h2>
        <div class="body-sub-wrap">
            <div class="d-flex justify-content-between">
                <span>계정 공개</span>
                <div class="form-check form-switch">
                    <input class="form-check-input" />
                    <!-- type="checkbox"에러 -->
                </div>
            </div>
            <hr />
            <div class="d-flex justify-content-between">
                <span>댓글 알림</span>
                <div class="form-check form-switch">
                    <input class="form-check-input" />
                    <!-- type="checkbox"에러 -->
                </div>
            </div>
            <hr />
            <div class="d-flex justify-content-between">
                <span>팔로우 알림</span>
                <div class="form-check form-switch">
                    <input class="form-check-input" />
                    <!-- type="checkbox"에러 -->
                </div>
            </div>
        </div>
        <hr />
        <!-- 로그아웃/수정하기 버튼 -->
        <div id="buttons-wrap" class="d-flex">
            <button v-on:click="logout">
                <i class="fas fa-sign-out-alt"></i>로그아웃
            </button>
            <button v-on:click="modifyUser" class="button-modify">
                정보 수정
            </button>
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
            this.$router.push({ name: "MainPage" });
        },
        // 정보 수정 버튼 클릭 시
        modifyUser: function () {
            // API와 연결 필요

            this.$router.push({ name: "Profile" });
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
#body-wrap {
    font-size: 18px;
}

.body-sub-wrap {
    margin: 15px 0 0 0;
}

#body-wrap h2 {
    font-size: 20px;
    color: #9b9b9b;
}

.profile-info {
    font-size: 14px;
    margin: auto 0;
}

.profile-input {
    border: none;
    height: 30px;
    font-size: 14px;
}

#password-change-button {
    width: 45px;
    height: 30px;
    border-radius: 12px;
    background-color: #ff993c;
    margin: 0 0 0 10px;
}

#body-wrap hr {
    color: #ff993c;
}

#body-wrap > hr {
    height: 3px;
}

.router-pg {
    color: black;
}

#button-withdraw {
    height: 31px;
}

#buttons-wrap > button {
    width: 50%;
}

.button-modify {
    height: 35px;
    border-radius: 8px;
    background-color: #ff993c;
}
</style>