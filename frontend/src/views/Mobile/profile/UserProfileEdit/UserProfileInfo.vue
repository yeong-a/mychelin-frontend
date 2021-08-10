<template>
    <div id="info-wrap">
        <!-- 계정 정보 -->
        <div class="info-sub-wrap">
            <div>
                <p>소개</p>
                <input
                    v-model="userInfo.bio"
                    type="text"
                    maxlength="30"
                    class="bio-input"
                />
                <hr />
                <p v-show="error.bio" class="not-valid-message">
                    {{ error.bio }}
                </p>
            </div>
            <div v-for="(item, idx) in inputItems" :key="idx">
                <div class="d-flex justify-content-between">
                    <p>{{ item.inKorean }}</p>
                    <input
                        v-model="$data['userInfo'][item.value]"
                        type="text"
                        maxlength="12"
                        class="profile-input"
                    />
                </div>
                <p
                    v-show="$data['error'][item.value]"
                    class="not-valid-message"
                >
                    {{ $data["error"][item.value] }}
                </p>
                <hr />
            </div>
            <router-link v-bind:to="{ name: 'EditProfileMPassword' }">
                <p class="router-link">비밀번호 변경</p>
            </router-link>
        </div>
        <hr class="thick-hr" />
        <!-- 알림 설정 -->
        <!-- 아직 연결 안되어있음 -->
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
            <button v-on:click="modifyUser" class="button-modify">
                정보 수정
            </button>
        </div>
        <hr class="thick-hr" />
        <div class="d-flex justify-content-end">
            <button v-on:click="logout">
                <i class="fas fa-sign-out-alt"></i>로그아웃
            </button>
            <router-link
                v-bind:to="{ name: 'EditProfileMWithdraw' }"
                id="withdraw-button"
            >
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
            inputItems: [
                {
                    value: "nickname",
                    inKorean: "닉네임",
                },
                {
                    value: "phoneNumber",
                    inKorean: "전화번호",
                },
            ],
            error: {
                nickname: false,
                bio: false,
                phoneNumber: false,
            },
        };
    },
    watch: {
        userInfo: {
            deep: true,
            handler(infos) {
                if (infos.nickname.length < 2 || infos.nickname.length > 8)
                    this.error.nickname = "2~8자의 닉네임을 작성해주세요";
                else this.error.nickname = false;
                if (infos.bio.length > 25)
                    this.error.bio = "25자 이하의 소개를 작성해주세요";
                else this.error.bio = false;
                if (
                    !/^\d+$/.test(infos.phoneNumber) ||
                    infos.phoneNumber.length !== 11
                )
                    this.error.phoneNumber = "11자리 숫자로 작성해주세요";
                else this.error.phoneNumber = false;
            },
        },
    },
    created() {
        const nickname = localStorage.getItem("nickname");
        UserApi.requestProfile(nickname).then((res) => {
            this.userInfo = res.data;
        });
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
            const info = {
                bio: this.userInfo.bio,
                nickname: this.userInfo.nickname,
                phoneNumber: this.userInfo.phoneNumber,
            };
            if ([...new Set(Object.values(this.error))].length === 1) {
                UserApi.requestModifyInfo(info).then((res) => {
                    // this.userInfo = res.data;
                    // localStorage.removeItem('nickname')
                    // localStorage.setItem('nickname', res.data.nickname)
                    this.$router.push({
                        name: "Profile",
                        params: { id: this.userInfo.nickname },
                    });
                });
            } else {
                var items = document.getElementsByClassName("not-valid-message")
                for (var i=0; i < items.length; i++) {
                    items[i].style.color = 'red'
                }
            }
        },
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

.alert-red {
    color: red;
}

.bio-input {
    padding: 15px 15px 0 15px;
    border: none;
    height: 30px;
    width: 100%;
    font-size: 14px;
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

.not-valid-message {
    text-align: right;
    font-size: 14px;
    color: #9b9b9b;
}
</style>