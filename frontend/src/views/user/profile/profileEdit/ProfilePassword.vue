<template>
    <div>
        <ReturnNav inputTxt="비밀번호 변경" />
        <div id="body-wrap">
            <p>안전한 비밀번호로 내 정보를 보호하세요</p>
            <div class="check-messages">
                <div :class="notChange ? 'not-valid' : 'valid' ">
                    <i class="fas fa-check"></i>
                    <span>현재 사용중인 비밀번호와 달라야 합니다</span>
                </div>
                <div :class="notValid ? 'not-valid' : 'valid' ">
                    <i class="fas fa-check"></i>
                    <span>영어 대소문자, 숫자 포함 8자리 이상이어야 합니다</span>
                </div>
                <div v-show="notMatchShow" :class="notMatch ? 'not-valid' : 'valid' ">
                    <i class="fas fa-check"></i>
                    <span>새 비밀번호와 비밀번호 확인이 일치하지 않습니다</span>
                </div>
            </div>
            <div class="input-wrap d-flex">
                <label for="">현재 비밀번호</label>
                <input
                    type="password"
                    v-model="password"
                    class="input-password"
                />
            </div>
            <div class="input-wrap d-flex">
                <label for="">새로운 비밀번호</label>
                <input
                    type="password"
                    v-model="newPassword"
                    class="input-password"
                />
            </div>
            <div class="input-wrap d-flex">
                <label for="">비밀번호 확인</label>
                <input
                    type="password"
                    v-model="newPasswordCheck"
                    class="input-password"
                />
            </div>
            <button v-on:click="changePassword" id="button-confirm">
                비밀번호 변경
            </button>
        </div>
    </div>
</template>

<script>
import PV from "password-validator";
import UserApi from "@/apis/UserApi";
import ReturnNav from "@/components/user/ReturnNav.vue";

export default {
    name: "ProfilePassword",
    components: {
        ReturnNav,
    },
    data() {
        return {
            password: "",
            newPassword: "",
            newPasswordCheck: "",
            passwordSchema: new PV(),
            notChange: false,
            notValid: false,
            notMatchShow: false,
            notMatch: false,
        };
    },
    watch: {
        newPassword() {
            if (!this.passwordSchema.validate(this.newPassword))
                this.notValid = true
            else
                this.notValid = false
            // 현재 비밀번호와 변경 비밀번호가 같을 경우
            if (this.password === this.newPassword)
                this.notChange = true
            else
                this.notChange = false
        },
        newPasswordCheck() {
            this.notMatchShow = true
            // 변경 비밀번호와 비밀번호 확인이 일치하지 않을 경우
            if (
                this.newPasswordCheck.length > 0 &&
                this.newPassword != this.newPasswordCheck
            )
                this.notMatch = true;
            else this.notMatch = false;
        },
    },
    created() {
        this.passwordSchema
        .is().min(8)
        .has().digits()
        .has().letters()
    },
    methods: {
        changePassword: function () {
            let passwords = {
                password: this.password,
                newPassword: this.newPassword,
            };
            UserApi.requestPasswordChange(passwords).then((res) => {
                this.notCurrent = false
                this.$router.push({ name: "ProfileEdit" });
            })
            .catch(err => {
                console.log(err.response)
                if (err.response.data.message === '비밀번호가 일치하지 않습니다.')
                    window.swal('현재 ' + err.response.data.message)
            })
        },
    },
};
</script>

<style scoped>
#body-wrap {
    margin: 90px 35px 0;
    font-size: 14px;
}

.check-messages {
    margin: 20px 0 0;
    height: 120px;
}

.check-messages > div {
    margin: 10px 0;
}

.valid {
    color: green;
}

.not-valid {
    color: red;
}

.input-wrap {
    margin: 10px 0;
    padding: 10px;
    border: solid 1px #ff993c;
}

.input-wrap > label {
    min-width: 94px;
    color: #9b9b9b;
}

.input-password {
    border-style: none;
    height: 21px;
    align-items: center;
}

.match {
    display: hidden;
}

#button-confirm {
    width: 250px;
    height: 40px;
    display: block;
    margin: 30px auto auto;
    border-radius: 8px;
    background-color: #ff993c;
    color: white;
    font-size: 15px;
}
</style>