<template>
    <div id="info-wrap">
        <!-- 계정 정보 -->
        <div class="info-sub-wrap">
            <div>
                <div class="d-flex under-orange-line">
                    <p class="hansans">소개</p>
                    <div class="flex-grow-1">
                    <input v-model="userInfo.bio" type="text" maxlength="30" class="bio-input" />
                    </div>
                </div>
                <p v-show="error.bio" class="not-valid-message">
                        {{ error.bio }}
                </p>
            </div>

            <div v-for="(item, idx) in inputItems" :key="idx">
                <div>
                    <div class="d-flex under-orange-line pt-2">
                        <p class="hansans">{{ item.inKorean }}</p>
                        <div class="flex-grow-1">
                            <input v-model="$data['userInfo'][item.value]" type="text" maxlength="12" class="profile-input" />
                        </div>
                    </div>
                    <p v-show="$data['error'][item.value]" class="not-valid-message">
                        {{ $data["error"][item.value] }}
                    </p>
                </div>
            </div>
            <div class="under-orange-line">
                <router-link v-bind:to="{ name: 'ProfilePassword' }">
                    <p class="router-link">비밀번호 변경</p>
                </router-link>
            </div>
        </div>
        <!-- <hr class="thick-hr" /> -->
        <!-- 로그아웃/수정하기 버튼 -->
        <div class="d-flex justify-content-center under-orange-line" style="padding-bottom: 1em;">
            <button v-on:click="modifyUser" class="button-modify">
                정보 수정
            </button>
        </div>
        <!-- <hr class="thick-hr" /> -->
        <div class="d-flex justify-content-end">
            <button v-on:click="logout"><i class="fas fa-sign-out-alt"></i>로그아웃</button>
            <router-link v-bind:to="{ name: 'ProfileWithdraw' }" id="withdraw-button">
                <p class="resign-btn">회원탈퇴</p>
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
                if (infos.nickname) {
                    if (infos.nickname.length < 2 || infos.nickname.length > 8) this.error.nickname = "2~8자의 닉네임을 작성해주세요";
                    else this.error.nickname = false;
                }
                if (infos.bio) {
                    if (infos.bio.length > 25) this.error.bio = "25자 이하의 소개를 작성해주세요";
                    else this.error.bio = false;
                }
                if (infos.phoneNumber) {
                    if (infos.phoneNumber.length > 0 && (!/^\d+$/.test(infos.phoneNumber) || infos.phoneNumber.length !== 11)) this.error.phoneNumber = "11자리 숫자로 작성해주세요";
                    else this.error.phoneNumber = false;
                }
            },
        },
    },
    created() {
        const nickname = localStorage.getItem("nickname");
        UserApi.requestProfile(nickname).then((res) => {
            this.userInfo = res.data.userProfile;
        });
    },
    methods: {
        // 로그아웃 버튼 클릭 시
        logout: function() {
            localStorage.removeItem("jwt");
            localStorage.removeItem("nickname");
            window.swal("로그아웃 되었습니다.").then(() => {
                this.$router.push({ name: "HomePage" });
            });
        },
        // 정보 수정 버튼 클릭 시
        modifyUser: function() {
            const info = {
                bio: this.userInfo.bio,
                nickname: this.userInfo.nickname,
                phoneNumber: this.userInfo.phoneNumber,
            };
            if ([...new Set(Object.values(this.error))].length === 1) {
                UserApi.requestModifyInfo(info).then((res) => {
                    localStorage.removeItem('nickname')
                    localStorage.setItem('nickname', res.data.data.userProfile.nickname)
                    this.$router.push({
                        name: "ProfilePage",
                        params: { nickname: this.userInfo.nickname },
                    });
                })
                .catch((err) => {
                    window.swal('중복된 닉네임입니다.')
                });
            } else {
                var items = document.getElementsByClassName("not-valid-message");
                for (var i = 0; i < items.length; i++) {
                    items[i].style.color = "red";
                }
            }
        },
    },
};
</script>

<style scoped>
.under-orange-line {
    border-bottom: 0.5px solid #ff993c;
    padding-bottom: 0.5em;
    padding-top: 1em;
}
.hansans {
    font-family: 'Spoqa Han Sans';
    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    /* identical to box height */

    color: #000000;
}
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
    /* padding: 15px; */
    padding-right: 3px;
    border: none;
    /* height: 30px; */
    height: 100%;
    width: 100%;
    font-size: 14px;
    color: #999;
    text-align: right;
}

.profile-input {
    /* padding: 15px; */
    border: none;
    width: 100%;
    height: 100%;
    padding-right: 3px;
    font-size: 14px;
    color: #999;
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
    font-family: 'Spoqa Han Sans';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    text-decoration: underline;
}

.button-modify {
    /* width: 250px; */
    width: 100%;
    height: 40px;
    border-radius: 8px;
    background-color: #ff993c;
    color: white;
    font-size: 15px;
}
.resign-btn {
    color: rgba(255, 10, 10, 0.9);
    font-family: 'Spoqa Han Sans';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    text-decoration: underline;
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