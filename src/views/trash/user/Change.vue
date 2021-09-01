<template>
    <div>
        <div class="wrapC" style="margin-top: 5%">
        <h1>비밀번호 변경하기</h1>

            <div class="input-with-label">
                <input v-model="cur_password" type="password"
                        id="cur_password"
                        @keyup.enter="change"
                        placeholder="현재 비밀번호를 입력하세요."/>
                <label for="cur_password">현재 비밀번호</label>
            </div>

            <div class="input-with-label">
                <input v-model="new_password" type="password"
                       v-bind:class="{error : error.new_password, complete:!error.new_password&&new_password.length!==0}"
                       id="new_password"
                       @keyup.enter="change"
                       placeholder="영문,숫자 포함 8 자리이상이어야 합니다."/>
                <label for="new_password">새 비밀번호</label>
                <div class="error-text" v-if="error.new_password">
                    {{error.new_password}}
                </div>
            </div>

            <div class="input-with-label">
                <input v-model="passwordConfirm" :type="passwordConfirmType"
                        v-bind:class="{error : error.passwordConfirm, complete:!error.passwordConfirm&&passwordConfirm.length!==0}"
                        id="password-confirm"
                        @keyup.enter="change"
                       placeholder="새 비밀번호를 다시한번 입력하세요."/>
                <label for="password-confirm">새 비밀번호 확인</label>
                <div class="error-text" v-if="error.passwordConfirm">
                    {{error.passwordConfirm}}
                </div>
            </div>
        
        <button class="btn--back btn" v-on:click="change" :disabled="!isSubmit"
                    :class="{disabled : !isSubmit}">
            변경하기
        </button>

        </div>

    </div>
</template>

<script>
    import '@/assets/css/style.scss'
    import '@/assets/css/user.scss'
    import PV from 'password-validator'
    import UserApi from '@/apis/UserApi'

    export default {
        components: {
        },
        created(){
            this.component = this;

            this.passwordSchema
                .is().min(8)
                .is().max(100)
                .has().digits()
                .has().letters();


        },
        watch: {
            cur_password: function (v){
                this.checkForm();
            },
            new_password: function (v) {
                this.checkForm();
            },
            passwordConfirm: function (v) {
                this.checkForm();
            },
        },
        methods: {
            checkForm(){
                if(this.cur_password.length == 0 || this.cur_password.length > 30)
                    this.error.cur_password = true;
                else
                    this.error.cur_password = false;
                
                if (this.new_password.length > 0 && !this.passwordSchema.validate(this.new_password))
                    this.error.new_password = '영문,숫자 포함 8 자리이상이어야 합니다.'
                else
                    this.error.new_password = false;

                if (this.passwordConfirm.length > 0 && this.passwordConfirm != this.new_password)
                    this.error.passwordConfirm = '비밀번호가 다릅니다.'
                else
                    this.error.passwordConfirm = false;

                let isSubmit = true;
                Object.values(this.error).map(v => {
                    if (v) isSubmit = false;
                })

                if(this.passwordConfirm.length == 0 || this.new_password.length == 0)
                    isSubmit = false;
                
                this.isSubmit = isSubmit;

            },
            change(){
                if (this.isSubmit) {
                    let {email,cur_password, new_password} = this;
                    // 대문자 -> 소문자
                    email = email.toLowerCase();
                         
                    let data = {
                        "email": email,
                        "cur_password": cur_password,
                        "new_password": new_password
                    }

                    
                    // 요청 후에는 버튼 비활성화
                    this.isSubmit = false;
                    
                    UserApi.requestChangePw(data, res => {
                        alert(` 비밀번호가 변경되었습니다!.\n
                            email : ${email}\n 
                            password : ${new_password}
                        `);
                        this.$router.push('Login');
                    },error=>{  
                        alert("ERROR가 발생했습니다.")
                    })
                }
            }
        },
        data: () => {
            return {
                email: '',
                cur_password: '',
                new_password: '',
                passwordConfirm: '',
                isLoading: false,
                passwordSchema: new PV(),
                error: {
                    email: false,
                    new_password: false,
                    cur_password: false,
                    passwordConfirm: false,
                },
                isSubmit: false,
                passwordType: "password",
                passwordConfirmType: "password",
            }
        }

    }

</script>
