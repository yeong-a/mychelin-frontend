
<!--
    가입하기는 기본적인 폼만 제공됩니다
    기능명세에 따라 개발을 진행하세요.
    Sub PJT I에서는 UX, 디자인 등을 포함하여 백엔드를 제외하여 개발합니다.
 -->
<template>
    <div>
        <div class="wrapC" style="margin-top: 5%">
        <h1>MFTI 등 추가정보</h1>
            <div class="input-with-label">
                <input v-model="temp" text="temp"
                       id="temp"
                       placeholder="temp" type="text"/>
                <label for="temp">temp</label>
            </div>


        <button class="btn--back btn" v-on:click="signup" :disabled="!isSubmit"
                    :class="{disabled : !isSubmit}">
            완료
        </button>

        </div>

    </div>
</template>

<script>
    import '@/assets/css/style.scss'
    import '@/assets/css/user.scss'

    export default {
        components: {
        },
        created(){
            this.component = this;
        },
        methods: {
/*UserApi 통신
                    UserApi.requestLogin(data,res=>{
                        //통신을 통해 전달받은 값 콘솔에 출력
//                        console.log(res);

                        //요청이 끝나면 버튼 활성화
                        this.isSubmit = true;
                    },error=>{  
                        //요청이 끝나면 버튼 활성화
                        this.isSubmit = true;
                    })
*/
        },
        data: () => {
            return {
            }
        }

    }

</script>


