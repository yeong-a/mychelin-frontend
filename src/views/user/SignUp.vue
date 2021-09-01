<template>
    <div>
        <div class="sign-bgi"></div>

        <router-link v-bind:to="{ name: 'HomePage' }"> <span class="login-name">MYCHÉLIN</span></router-link>

        <div class="sign-input">
            <p class="sign-title">간편하게 가입하고 <br class="title-web" />다양한 기능을 누려보세요.</p>

            <div class="sign-icon-web">
                <div class="icon-with-txt">
                    <div class="icon-part" style="background-color:#FFC6B4;"><i class="far fa-comment-dots icon-part-icon"></i></div>
                    <div class="text-part">Chatting</div>
                </div>
                <div class="icon-with-txt">
                    <div class="icon-part" style="background-color:#DBD8A1;"><i class="fas fa-list icon-part-icon"></i></div>
                    <div class="text-part">Favorite</div>
                </div>
                <div class="icon-with-txt">
                    <div class="icon-part" style="background-color:#B3ECFF;"><i class="fas fa-users icon-part-icon"></i></div>
                    <div class="text-part">Follow</div>
                </div>
            </div>

            <div class="sign-input-box">
                <div class="sign-input-both" id="email-j">
                    <label for="email-j">이메일</label>
                    <input
                        class="sign-input-input"
                        v-model="email"
                        v-bind:class="{ error: error.email, complete: !error.email && email.length !== 0 }"
                        @keyup.enter="signUp"
                        placeholder="이메일을 입력하세요."
                        tabindex="1"
                        id="emailemail"
                        type="text"
                    />
                    <button type="button" class="sign-input-btn" v-on:click="sendEmail" v-if="certifyStatus === 1 && certifyStatus2 === 1">인증요청</button>
                    <button type="button" class="sign-input-btn" v-on:click="sendEmail" v-if="certifyStatus === 2 && certifyStatus2 === 1">&nbsp;재요청&nbsp;</button>
                    <button type="button" class="sign-input-btn" v-if="certifyStatus2 === 2">인증완료</button>
                </div>
                <div class="sign-input-error" v-if="error.email">
                    {{ error.email }}
                </div>
            </div>

            <div class="sign-input-box">
                <div class="sign-input-both" id="certification">
                    <label for="certification">인증번호</label>
                    <input
                        class="sign-input-input"
                        v-model="certification"
                        type="text"
                        v-bind:class="{ error: error.certification, complete: !error.certification && certification.length !== 0 }"
                        @keyup.enter="certify"
                        tabindex="2"
                        id="certcert"
                        placeholder="인증 번호를 입력해주세요"
                    />
                    <button type="button" class="sign-input-btn" v-on:click="certify" v-if="certifyStatus2 === 1">인증확인</button>
                    <button type="button" class="sign-input-btn" v-if="certifyStatus2 === 2">인증완료</button>
                </div>
                <div class="sign-input-error" v-if="error.certification">
                    {{ error.certification }}
                </div>
            </div>

            <div class="sign-input-box">
                <div class="sign-input-both" id="nickName">
                    <label for="nickName">닉네임</label>
                    <input
                        class="sign-input-input"
                        v-model="nickName"
                        type="text"
                        v-bind:class="{ error: error.nickName, complete: !error.nickName && nickName.length !== 0 }"
                        @keyup.enter="signUp"
                        tabindex="3"
                        placeholder="닉네임을 입력하세요."
                    />
                </div>
                <div class="sign-input-error" v-if="error.nickName">
                    {{ error.nickName }}
                </div>
            </div>

            <div class="sign-input-box">
                <div class="sign-input-both" id="password-j">
                    <label for="password-j">비밀번호</label>
                    <input
                        class="sign-input-input"
                        v-model="password"
                        type="password"
                        v-bind:class="{ error: error.password, complete: !error.password && password.length !== 0 }"
                        @keyup.enter="signUp"
                        tabindex="4"
                        placeholder="비밀번호를 입력하세요."
                    />
                </div>
                <div class="sign-input-error" v-if="error.password">
                    {{ error.password }}
                </div>
            </div>

            <div class="sign-input-box">
                <div class="sign-input-both" id="password-confirm">
                    <label for="password-confirm">비밀번호 확인</label>
                    <input
                        class="sign-input-input"
                        v-model="passwordConfirm"
                        type="password"
                        v-bind:class="{ error: error.passwordConfirm, complete: !error.passwordConfirm && passwordConfirm.length !== 0 }"
                        @keyup.enter="signUp"
                        tabindex="5"
                        placeholder="비밀번호를 다시 한 번 입력하세요."
                    />
                </div>
                <div class="sign-input-error" v-if="error.passwordConfirm">
                    {{ error.passwordConfirm }}
                </div>
            </div>

            <button class="sign-login-btn" v-on:click="signup" :disabled="!isSubmit" :class="{ disabled: !isSubmit }">
                가입하기
            </button>
        </div>
    </div>
</template>

<script>
import PV from "password-validator";
import * as EmailValidator from "email-validator";
import LoginApi from "../../apis/LoginApi";

export default {
    components: {},
    created() {
        this.component = this;
        this.passwordSchema
            .is()
            .min(8)
            .is()
            .max(100)
            .has()
            .digits()
            .has()
            .letters();
    },
    computed: {
        certifyStatus() {
            return this.certifystatus;
        },
        certifyStatus2() {
            return this.certifystatus2;
        },
    },
    watch: {
        password: function(v) {
            this.checkForm();
        },
        email: function(v) {
            this.checkForm();
        },
        nickName: function(v) {
            this.checkForm();
        },
        passwordConfirm: function(v) {
            this.checkForm();
        },
        certification: function(v) {
            this.checkForm();
        },
    },
    methods: {
        sendEmail() {
            let { email } = this;
            if (EmailValidator.validate(email)) {
                let data = {
                    email: email,
                };
                //window.swal("인증번호를 발송했습니다 !", email + " 메일을 확인해 주세요", "success");
                window.swal("잠시만 기다려 주세요");
                LoginApi.requestEmail(
                    data,
                    (res) => {
                        window.swal("인증번호를 발송했습니다 !", email + " 메일을 확인해 주세요", "success");
                    },
                    (error) => {
                        window.swal("에러가 발생했습니다 :(", "잠시 후 다시 시도해 주세요!", "error");
                    }
                );
                this.certifystatus = 2;
            } else {
                window.swal("", "이메일을 다시 확인해주세요 :(", "error");
            }
        },
        certify() {
            if (this.certifystatus2 === 1 && this.certification) {
                let data = {
                    email: this.email,
                    token: this.certification,
                };

                LoginApi.requestEmailCert(data)
                    .then((res) => {
                        this.certifystatus2 = 2;
                        window.swal("", "인증 완료", "success");
                        const target = document.getElementById("emailemail");
                        const target2 = document.getElementById("certcert");
                        target.readOnly = true;
                        target2.readOnly = true;
                        this.checkForm();
                        this.readonly = true;
                    })
                    .catch((e) => {
                        window.swal("", e.response.data.message, "error");
                        this.certifystatus2 = 1;
                    });
            }
        },
        checkForm() {
            if (this.nickName.length == 1 || this.nickName.length > 8) this.error.nickName = "2~8자로 입력해 주세요.";
            else this.error.nickName = false;

            if (this.email.length > 0 && !EmailValidator.validate(this.email)) this.error.email = "이메일 형식이 아닙니다.";
            else this.error.email = false;

            if (this.password.length > 0 && !this.passwordSchema.validate(this.password)) this.error.password = "영문,숫자 포함 8 자리이상이어야 합니다.";
            else this.error.password = false;

            if (this.passwordConfirm.length > 0 && this.passwordConfirm != this.password) this.error.passwordConfirm = "비밀번호가 다릅니다.";
            else this.error.passwordConfirm = false;

            let isSubmit = true;
            Object.values(this.error).map((v) => {
                if (v) isSubmit = false;
            });
            if (this.certifystatus2 !== 2) {
                isSubmit = false;
            }
            if (!this.email || !this.password || !this.passwordConfirm || !this.nickName) isSubmit = false;

            this.isSubmit = isSubmit;
        },
        signup() {
            if (this.isSubmit) {
                let { email, password, nickName, cellPhone } = this;

                // 대문자 -> 소문자
                email = email.toLowerCase();

                let data = {
                    id: email,
                    nickname: nickName,
                    password: password,
                    phoneNumber: cellPhone,
                };

                //요청 후에는 버튼 비활성화
                this.isSubmit = false;
                if (!email || !password || !nickName) return;

                //UserApi 통신
                LoginApi.requestJoin(
                    data,
                    (res) => {
                        window.swal("환영합니다~!", "회원가입을 완료했습니다.\n 로그인 후 이용해 주세요!", "success");
                        this.$router.push({ name: "Login" });
                    },
                    (error) => {
                        //alert("ERROR가 발생했습니다.")
                    }
                );
            }
        },
    },
    data: () => {
        return {
            email: "",
            password: "",
            passwordConfirm: "",
            nickName: "",
            cellPhone: "",
            certification: "",
            isLoading: false,
            passwordSchema: new PV(),
            error: {
                email: false,
                password: false,
                nickName: false,
                passwordConfirm: false,
                term: false,
                cellPhone: false,
                certification: false,
            },
            isSubmit: false,
            passwordType: "password",
            passwordConfirmType: "password",
            termPopup: false,
            authen: "인증하기",
            reAuthen: "",
            certifystatus: 1,
            certifystatus2: 1,
            readonly: false,
        };
    },
};
</script>

<style scoped>
* {
    font-family: "Spoqa Han Sans Neo", "sans-serif";
}
input::placeholder {
    font-weight: normal;
}
.input-readonly {
    background-color: #e8e8e8;
}
.sign-bgi {
    position: fixed;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("../../assets/images/lily-banse--YHSwy6uqvk-unsplash.jpg");
    background-size: cover;
    background-position: -330px 0px;
    width: 100vw;
    height: 100vh;
    top: 0px;
}
.login-name {
    position: absolute;
    width: 27.78vw;
    height: 7.25vw;
    left: 3.62vw;
    top: 4.11vw;
    font-size: 5.8vw;
    line-height: 7.25vw;
    color: #ffffff;
}
.sign-title {
    width: 100vw;
    left: 0px;
    width: 77.29vw;
    margin-bottom: 7.25vw;
    text-align: left;
    font-weight: bold;
    font-size: 5.8vw;
    line-height: 7.25vw;
    color: #ffffff;
}
.sign-icon-web {
    display: none;
}
.sign-login-btn {
    width: 77.29vw;
    height: 10vw;
    background: #ff742e;
    border-radius: 49px;
    font-weight: bold;
    font-size: 4.83vw;
    line-height: 6.04vw;
    color: #ffffff;
    cursor: pointer;
}
.sign-login-btn:not([disabled]):hover,
.sign-login-btn:not([disabled]):focus,
.login-login-btn:not([disabled]).active {
    box-shadow: none;
    -webkit-box-shadow: none;
}
.sign-login-btn.disabled {
    background: #ccc;
}

.sign-input {
    top: 24.4vw;
    position: absolute;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.sign-input-box {
    height: 15.22vw;
    width: 77.29vw;
    display: block;
}
.sign-input-both {
    height: 10.39vw;
    display: flex;
    font-size: 2.9vw;
    box-sizing: border-box;
    background-color: white;
}
.sign-input-both label {
    width: 30vw;
    margin-left: 2.9vw;
    margin-top: 3.38vw;
    color: #9b9b9b;
    font-weight: bold;
}
.sign-input-input {
    height: 10.39vw;
    width: 100%;
    border: none;
    outline-offset: 0;
}
.sign-input-btn {
    height: 100%;
    width: 19.32vw;
    background-color: #ffc6b4;
    font-size: 3.38vw;
    font-weight: bold;
    padding-left: 2.9vw;
    padding-right: 2.9vw;
}
.sign-input-error {
    font-size: 2.17vw;
    color: #ffc6b4;
    text-align: right;
    height: auto;
    font-weight: 300;
}

@media screen and (min-width: 700px) {
    .sign-bgi {
        background-position: 0px 0px;
        width: 100vw;
        height: 100vh;
    }
    .login-name {
        width: 166px;
        height: 45px;
        left: 90px;
        top: 30px;
        font-weight: 500;
        font-size: 36px;
        line-height: 45px;
        letter-spacing: -0.05em;
    }
    .title-web {
        display: none;
    }
    .sign-title {
        width: 672px;
        height: 45px;
        font-weight: bold;
        font-size: 36px;
        line-height: 45px;
        text-align: center;
        margin-bottom: 1vw;
    }
    .sign-icon-web {
        display: block;
        width: 600px;
        height: 184px;
        margin-bottom: 1vh;
        display: flex;
        justify-content: space-around;
        border: none;
    }
    .icon-with-txt {
        border: none;
        height: 184px;
        width: 140px;
    }
    .icon-part {
        height: 140px;
        width: 100%;
        margin-bottom: 21px;
        border-radius: 50%;
    }
    .icon-part-icon {
        width: 70px;
        height: 70px;
        color: white;
        margin-top: 35px;
        margin-left: 35px;
    }
    .text-part {
        width: 100%;
        height: 23px;
        text-align: center;
        font-weight: bold;
        font-size: 18px;
        line-height: 23px;
        color: white;
    }

    .sign-login-btn {
        width: 600px;
        height: 56px;
        font-weight: bold;
        font-size: 20px;
        line-height: 25px;
        background: #ff742e;
        margin-bottom: 50px;
        border-radius: 28px;
    }
    .sign-input {
        top: 111px;
    }

    .sign-input-box {
        width: 600px;
        height: 78px;
        display: block;
    }
    .sign-input-both {
        height: 56px;
        display: flex;
        font-size: 20px;
        box-sizing: border-box;
        background-color: white;
    }
    .sign-input-both label {
        width: 200px;
        margin-left: 15px;
        margin-top: 15px;
        color: #9b9b9b;
        font-weight: bold;
    }
    .sign-input-both:focus,
    .sign-input-both:hover {
        border: solid 2px black;
    }
    .sign-input-input {
        height: 56px;
        width: 100%;
        border: none;
    }
    .sign-input-btn {
        height: 100%;
        width: 105px;
        background-color: #ffc6b4;
        font-size: 20px;
        font-weight: bold;
        padding-left: 15px;
        padding-right: 15px;
    }
    .sign-input-error {
        font-size: 16px;
    }
}
</style>
