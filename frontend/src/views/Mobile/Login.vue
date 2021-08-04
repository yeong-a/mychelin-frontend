
<template>
    <div>
        <div class="login-bgi"></div>
        
        <router-link v-bind:to="{name:'Home'}">
            <span class="login-name">MYCHÉLIN</span></router-link>

        <p class="login-title">
            MYCHÉLIN에 오신 걸 환영합니다.</p>

        <div class="login-input">
            <div class="login-input-box">
                <div class="login-input-both" id="email">
                    <label for="email">이메일</label>
                    <input class="login-input-input" v-model="email" v-bind:class="{error : error.email, complete:!error.email&&email.length!==0}"
                       @keyup.enter="login"
                       placeholder="이메일을 입력하세요."
                       type="text"/>
                </div>
                <div class="login-input-error"  v-if="error.email">
                    {{error.email}}
                </div>
            </div>
            <div class="login-input-box">
                <div class="login-input-both" id="password">
                    <label for="password">비밀번호</label>
                    <input class="login-input-input" v-model="password" type="password"
                       v-bind:class="{error : error.password, complete:!error.password&&password.length!==0}"
                       @keyup.enter="login"
                       placeholder="비밀번호를 입력하세요."/>
                </div>
                <div class="login-input-error"  v-if="error.password">
                    {{error.password}}
                </div>
            </div>

            <button class="login-login-btn" v-on:click="login" :disabled="!isSubmit"
                    :class="{disabled : !isSubmit}">
                로그인</button>
            
            <div class="login-signup">
                <router-link v-bind:to="{name:'Join'}" style="color:white">아직 MYCHÉLIN 회원이 아니신가요?</router-link>
            </div>
        </div>

        <div class="login-solid"></div>

        <div class="login-sns">
            <kakaoLogin :component="component"/>
            <GoogleLogin :component="component"/>
        </div>
    </div>
</template>

<script>
import PV from 'password-validator'
import * as EmailValidator from 'email-validator';
import KakaoLogin from '@/components/user/snsLogin/Kakao.vue'
import GoogleLogin from '@/components/user/snsLogin/Google.vue'
import LoginApi from '@/apis/LoginApi'

export default {
    components: {
        KakaoLogin,
        GoogleLogin,
    },
    created(){
        this.component = this;
        this.$store.state.isWhite = false;

        this.passwordSchema
            .is().min(8)
            .is().max(100)
            .has().digits()
            .has().letters();
    },
    watch: {
        password: function (v) {
            this.checkForm();
        },
        email: function (v) {
            this.checkForm();
        },
    },
    methods: {
        checkForm(){
            if (this.email.length > 0 && !EmailValidator.validate(this.email))
                this.error.email = "이메일 형식이 아닙니다."
            else this.error.email = false;

            if (this.password.length > 0 && !this.passwordSchema.validate(this.password))
                this.error.password = '영문,숫자 포함 8 자리이상이어야 합니다.'
            else this.error.password = false;

            let isSubmit = true;
                Object.values(this.error).map(v => {
                    if (v) isSubmit = false;
                })
                if(!this.email || !this.password) isSubmit = false;
                this.isSubmit = isSubmit;
        },
        login(){
            if (this.isSubmit) {
                let {email,password} = this;
                email = email.toLowerCase();
                    
                let data = {
                    "id": email,
                    "password": password
                }
                    
                //요청 후에는 버튼 비활성화
                this.isSubmit = false;
              
                LoginApi.requestLogin(data, res => {
                    let myNick = localStorage.getItem('nickname')
                    window.swal(`${myNick}님 반가워요!`);
                    this.$router.push({name: 'MainPage'})
                },error=>{  
                    alert("ERROR가 발생했습니다.")
                })
            }
        },
    },
    data: () => {
        return {
            email: '',
            password: '',
            passwordSchema: new PV(),
            error: {
                email: false,
                passowrd: false,
            },
            isSubmit: false,
            component: this
        }
    }
}
</script>

<style scoped>
* { font-family: 'Spoqa Han Sans Neo', 'sans-serif'; }
input::placeholder{ font-weight: normal; }

.login-bgi{
    position: fixed;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('../../assets/images/food_background.jpg');
    background-size: cover;
    background-position: -330px 0px;
    width: 100vw;
    height: 100vh;
    top:0px
}
.login-name{
    position: absolute;
    width: 27.78vw;
    height: 7.25vw;
    left: 3.62vw;
    top: 4.11vw;
    font-size: 5.80vw;
    line-height: 7.25vw;
    color: #FFFFFF;
}
.login-title{
    position: absolute;
    width: 100vw;
    height: 7.25vw;
    left: 0px;
    top: 40.58vw;
    text-align: center;
    font-weight: bold;
    font-size: 5.80vw;
    line-height: 7.25vw;
    color: #FFFFFF;
}
.login-login-btn{
    width:77.29vw;
    height: 10vw;
    background: #FF742E;
    border-radius: 49px;
    font-weight: bold;
    font-size: 4.83vw;
    line-height: 6.04vw;
    color: #FFFFFF;
    cursor: pointer;}
    .login-login-btn:not([disabled]):hover, .login-login-btn:not([disabled]):focus, .login-login-btn:not([disabled]).active {
        box-shadow: none;
        -webkit-box-shadow: none; }
    .login-login-btn.disabled {
        background: #ccc; }

.login-input{
    position: absolute;
    top: 60.63vw;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.login-input-box{
    height: 8.56vh;
    width: 77.29vw;
    display: block;}
    .login-input-both{
        height: 5.84vh;
        display: flex;
        font-size: 2.90vw;
        box-sizing: border-box;
        background-color: white;}
        .login-input-both label{
            width:30vw;
            margin-left:2.90vw;
            margin-top:1.77vh;
            color:#9B9B9B;
            font-weight: bold;}
        .login-input-both:focus, .login-input-both:hover {
            border:solid 2px black;}
        .login-input-input{
            height: 5.84vh;
            width:100%;
            border:none;}
    .login-input-error{
        font-size:2.17vw;
        color:#FFC6B4;
        text-align: right;
        height: auto;
        font-weight: 300;}

.login-signup{
    font-size: 2.90vw;
    line-height: 3.62vw;
    text-decoration-line: underline;
    color: #FFFFFF;
    margin-top: 10px;
}
.login-solid{
    position: absolute;
    width: 77.29vw;
    height: 0.00vw;
    left: 10.39vw;
    top: 129.47vw;
    border:none;
    border-top:1px solid white;
}
.login-sns{
    display: flex;
    flex-wrap:wrap;
    justify-content: space-evenly;
    position: absolute;
    width: 77.29vw;
    height: 10vh;
    left: 10.39vw;
    top: 133.57vw;
}
@media screen and (min-width: 700px){
    .login-bgi{
        background-position: 0px 0px;
        width:100vw;
        height: 100vh;
    }
    .login-name{
        width: 166px;
        height: 45px;
        left: 90px;
        top: 30px;
        font-weight: 500;
        font-size:36px;
        line-height: 45px;
        letter-spacing: -0.05em;
    }
    .login-title{
        height: 45px;
        top: 25.78vh;
        font-size: 36px;
        line-height: 45px;
    }
    .login-input{
        top: 39.65vh;
    }
    .login-input-box{
        height: 78px;
        width: 600px;}
        .login-input-both{
            height: 56px;
            font-size: 16px}
            .login-input-both label{
                width:150px;
                margin-left:15px;
                margin-top:18px}
            .login-input-input{
                height: 56px;}
        .login-input-error{
            font-size:12px;
            font-weight: 400;}
            
    .login-login-btn{
        width: 600px;
        margin-top:10px;
        height: 50px;
        font-size: 20px;
        line-height: 25px; 
    }
    .login-signup{
        margin-top: 70px;
        font-size: 18px;
        line-height: 23px;
    }
    .login-solid{
        display: none;
    }
    .login-sns{
        display: none;
    }
}
</style>
