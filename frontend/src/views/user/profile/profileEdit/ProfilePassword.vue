<template>
    <div>
        <ReturnNav inputTxt="비밀번호 변경" />
        <div id="body-wrap">
            <div>
                <div class="d-flex justify-content-between">
                    <label for="">현재 비밀번호</label>
                    <input
                        type="password"
                        v-model="password"
                        class="input-password"
                    />
                </div>
                <p v-show="notCurrent" class="not-valid-message">
                    현재 비밀번호가 아닙니다
                </p>
            </div>
            <div>
                <div class="d-flex justify-content-between">
                    <label for="">변경 비밀번호</label>
                    <input
                        type="password"
                        v-model="newPassword"
                        class="input-password"
                    />
                </div>
                <p v-show="notChange" class="not-valid-message">
                    현재 비밀번호와 같습니다
                </p>
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
                    v-bind:style="{
                        visibility: notMatch ? 'visible' : 'hidden',
                    }"
                    class="not-valid-message"
                >
                    비밀번호가 다릅니다
                </p>
            </div>
            <button v-on:click="changePassword" id="button-confirm">
                수정하기
            </button>
        </div>
    </div>
</template>

<script>
import UserApi from "@/apis/UserApi";
import ReturnNav from "@/components/user/ReturnNav.vue";

export default {
    name: "EditProfilePassword",
    components: {
        ReturnNav,
    },
    data() {
        return {
            password: "",
            newPassword: "",
            newPasswordCheck: "",
            notChange: false,
            notMatch: false,
            notCurrent: false,
        };
    },
    watch: {
        newPassword() {
            // 현재 비밀번호와 변경 비밀번호가 같을 경우
            if (this.password === this.newPassword)
                this.notChange = true
            else
                this.notChange = false
        },
        newPasswordCheck() {
            // 변경 비밀번호와 비밀번호 확인이 일치하지 않을 경우
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
                password: this.password,
                newPassword: this.newPassword,
            };
            UserApi.requestPasswordChange(passwords).then((res) => {
                this.notCurrent = false
                this.$router.push({ name: "EditProfileM" });
            })
            .catch(err => {
                if (err.response.data.message === '비밀번호가 일치하지 않습니다.')
                    this.notCurrent = true
            })
        },
    },
};
</script>

<style scoped>
#body-wrap {
    margin: 90px 20px 0;
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

.not-valid-message {
    text-align: right;
    font-size: 14px;
    color: #9b9b9b;
}
</style>