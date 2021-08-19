<template>
    <div class="hansans">
        <div class="container mfti-bgi">
            <div v-on:click="goMain"><CloseBtn /></div>
            <div class="mb-3">
                <h1 class="mfti-title">MFTI</h1>
                <p class="mfti-description">(My Food Type Indicator)</p>
            </div>
            <div class="">
                <!-- <div>
                    <div class="list-circle"></div>
                </div> -->
                <div><h2 class="mfti-subtitle">나는 어떤 맛을 좋아할까?</h2></div>
            </div>
            <p class="mfti-content">내가 식당을 선택하는 기준으로<br> 나와 닮은 동물을 찾아보자!<br>🐶🦝🦊🦔🐇🐢</p>
            <div>
                <button class="start-btn" v-on:click="goMfti">시작하기</button>
            </div>
        </div>
    </div>
</template>

<script>
import CloseBtn from '@/components/btn/CloseBtn'
export default {
    components: {
        CloseBtn
    },
    methods: {
        goMain() {
             window.swal("메인 화면으로 돌아가시겠습니까?", {
                dangerMode: true,
                buttons: {
                    cancel: "Cancel",
                    ok: {text:'Yes'},
                },
                })
            .then((value) => {
                if (value === 'ok') this.$router.push({name: 'MainPage'})
            })
            
        },
        goMfti() {
            this.$router.push({ name: "MftiPage" });
        },
    }
}   
</script>

<style scoped>
.mfti-bgi {
    background: linear-gradient(120deg, #DBD8A1, pink);
    /* background-color: #DBD8A1; */
    /* top:0px; */
}

.mfti-description {
    font-family: 'Spoqa Han Sans';
    font-size: 16px;
    font-weight: 500;
    color: #777;
    text-align: center;
}

.list-circle {
    position: relative;
    top: 50%;
    transform: translate(0, -50%);
    height: 1em;
    width: 1em;
    background-color: #777;
    border-radius: 5em;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    margin-left: 1em;
    margin-right: 1em;
}
.mfti-title {
    font-family: 'Spoqa Han Sans';
    font-size: 48px;
    font-weight: 800;
    color: #555;
    text-align: center;
    padding-top: 30px;
}

.mfti-subtitle {
    font-family: 'Spoqa Han Sans';
    font-size: 24px;
    font-weight: 500;
    color: #777;
    text-align: center;
    margin-top: 4em;
    margin-bottom: 0.5em;
    
    /* padding-top: 30px; */
}

.mfti-content {
    font-family: 'Spoqa Han Sans';
    font-size: 16px;
    font-weight: 500;
    color: #444;
    margin-left: 30px;
    margin-right: 30px;
    text-align: center;
}
.start-btn {
    width: 90%;
    height: 40px;
    display: block;
    margin: 30px auto auto;
    border-radius: 8px;
    background-color: #F85C70;
    color: white;
    font-size: 15px;
    
}
</style>