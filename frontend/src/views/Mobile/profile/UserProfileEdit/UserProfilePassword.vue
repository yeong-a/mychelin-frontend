<template>
    <div id="body-wrap">
        <div class="d-flex justify-content-between">
            <label for="">현재 비밀번호</label>
            <input type="password" v-model="password" class="input-password" />
        </div>
        <div class="d-flex justify-content-between">
            <label for="">변경 비밀번호</label>
            <input
                type="password"
                v-model="newPassword"
                class="input-password"
            />
        </div>
        <div>
            <div class="d-flex justify-content-between">
                <label for="">비밀번호 확인</label>
                <input
                    type="password"
                    v-model="newPasswordCheck"
                    class="input-password"
                />
            </div>
            <p
                v-bind:style="{ visibility: notMatch ? 'visible' : 'hidden' }"
                id="not-match-message"
            >
                비밀번호가 다릅니다
            </p>
        </div>
        <button v-on:click="changePassword" id="button-confirm">
            수정하기
        </button>
    </div>
</template>

<script>
import UserApi from "@/apis/UserApi";

export default {
    name: "EditProfilePassword",
    data() {
        return {
            password: "",
            newPassword: "",
            newPasswordCheck: "",
            notMatch: false,
        };
    },
    watch: {
        newPasswordCheck: function (input) {
            if (
                this.newPasswordCheck.length > 0 &&
                this.newPassword != this.newPasswordCheck
            )
                this.notMatch = true;
            else this.notMatch = false;
        },
    },
    methods: {
        changePassword: function () {
            let passwords = {
                'password': this.password,
                'newPassword': this.newPassword
            };
            UserApi.requestPasswordChange(passwords).then((res) => {
                this.userInfo = res.data;
                this.$router.push({ name: "EditProfileMInfo" });
            })
        },
    },
};
</script>

<style scoped>
#body-wrap {
    font-size: 18px;
}

#body-wrap > div {
    margin: 20px 0;
}

.input-password {
    border-style: none none solid none;
    border-color: #ff993c;
    height: 30px;
}

#not-match-message {
    text-align: right;
    font-size: 14px;
    color: #9b9b9b;
}

.match {
    display: hidden;
}

#button-confirm {
    width: 110px;
    height: 40px;
    display: block;
    margin: 30px auto auto;
    border-radius: 8px;
    background-color: #ff993c;
}
</style>