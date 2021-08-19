<template>
    <div> 
        <div class="container mfti-bgi">
            <div v-on:click="goMain"><CloseBtn /></div>
            <div class="mt-3"><p class="topic">{{topTopic}}</p></div>
            <div class="d-flex justify-content-center mt-2">
                <MftiProgressBar :filledCount="qIdx+1" :allCount="qLength"/>  
            </div>
            <!-- 질문 -->
            <div class="mb-3">
                <p v-bind:class="{'question-title-short': questionShort(question.question), 
                                    'question-title-long': !questionShort(question.question)}">{{ question.question }}
                </p>
            </div>
            <div class="mx-2">
                <div class="d-flex justify-content-center" v-for="(option, indexO) in question.options" v-bind:key="option.id">
                    <div v-bind:class="{'question-btn': !selectArray[indexO], 'question-btn-selected': selectArray[indexO]}"
                    v-on:click="selectOption(indexO)">{{ option }}</div>
                </div>
            </div>

            <!-- 다음 버튼 -->
            <div class="d-flex mt-3">
                <div class="left-mg" v-on:click="goBefore" v-show="beforeBtnVisible"><BeforeBtn /></div>
                <div class="ms-auto right-mg" v-on:click="goNext"><NextBtn /></div>
            </div>
            <!-- <a class="button-3d" v-on:click="goNext">다음</a> -->
        </div>
    </div>
</template>

<script>
import CloseBtn from '@/components/btn/CloseBtn'
import BeforeBtn from '@/components/btn/BeforeBtn'
import NextBtn from '@/components/btn/NextBtn'
import MftiApi from '@/apis/MftiApi'
import MftiProgressBar from './MftiProgressBar'
export default {
    components: {
        CloseBtn,
        BeforeBtn,
        NextBtn,
        MftiProgressBar,
    },
    data() {
        return {
            mftiResult: {},
            questions: [],
            qIdx: 0,
            selectArray: [],
            flavorQLength: 0,
        }
    },
    created() {
        let mftiInfo = MftiApi.getMFTIQ();
        let questions = mftiInfo.flavor.slice();
        this.flavorQLength = questions.length;
        questions.push(...mftiInfo.restaurant)
        this.questions = questions
        this.selectArray = Array(this.questions[0].options.length).fill(false)
    },
    methods: {
        selectOption(indexO) {
            this.selectArray = Array(this.selectArray.length).fill(false)
            this.$set(this.selectArray, indexO, true);
        }, 
        questionShort(title){
            if (title.length < 50) return true;
            else return false;
        },
        goNext() {
            let selectIdx = this.selectArray.indexOf(true)
            if (selectIdx === -1) {
                window.swal('선택지를 골라주세요!');
                return
            } else {
                let tot = 1 - selectIdx/(this.selectArray.length - 1)
                if (this.mftiResult[this.question.topic] === undefined || this.mftiResult[this.question.topic].length === 0) {
                    this.mftiResult[this.question.topic] = [tot]
                } else {
                    this.mftiResult[this.question.topic].push(tot)
                }
            }
            // 마지막 페이지
            if (this.qIdx === this.questions.length - 1) {
                let result = this.getScore(this.mftiResult)
                MftiApi.postMfti(result)
                .then((res) => {
                    console.log(res)
                    window.swal('결과 페이지로 이동합니다.')
                    .then(() => {
                        this.$router.push({name: 'MftiResult', params: {mftiResult: result}})
                    })
                })
                
                return
            }
            this.qIdx += 1
            this.selectArray = Array(this.question.options.length).fill(false)
        },
        goBefore() {
            this.qIdx -= 1
            this.mftiResult[this.question.topic].pop()
            this.selectArray = Array(this.question.options.length).fill(false)
        },
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
        getScore(mftiResult){
            let result = {}
            for (let key in mftiResult){
                result[key] = this.getScoreByArray(mftiResult[key])
            }
            return result

        },
        getScoreByArray(arr){
            let unique = [...new Set(arr)];
            let n = arr.length
            let weight = (n -1) * 0.1
            let summation = 0
            for (let i of arr){
                summation += i
            }
            if (summation === 0) return 0
            else {
                let result = parseInt((summation + weight) / (n + weight) * 100)
                if (result === 50) return 51
                else return result 
            }

        },
        
    },
    computed: {
        question() {
            return this.questions[this.qIdx];
        },
        qLength() {
            return this.questions.length;
        },
        beforeBtnVisible() {
            return this.qIdx > 0;
        },
        topTopic() {
            if (this.qIdx < this.flavorQLength) return '나는 어떤 맛을 좋아할까?'
            else return '내가 식당을 고르는 기준은?'
        }
    },
}
</script>

<style scoped>
.topic {
    font-family: Spoqa Han Sans Neo;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 20px;
    /* or 100% */
    text-align: center;
    color: #000000;
    margin-bottom: 1em;
}

.mfti-bgi {
    background: linear-gradient(120deg, #DBD8A1, pink);
    /* background-color: #DBD8A1; */
    /* top:0px; */
}

.question-title-short {
    margin: 1.5em 1.5em 1.5em;
    font-family: Spoqa Han Sans Neo;
    font-style: normal;
    font-weight: bold;
    font-size: 1.6em;
    line-height: 30px;
    /* display: flex; */
    align-items: center;    
    /* text-align: justify; */
    text-align: center;
    color: #000000;
}

.question-title-long {
    margin: 1.5em 1.5em 1.5em;
    font-family: Spoqa Han Sans Neo;
    font-style: normal;
    font-weight: bold;
    font-size: 1.4em;
    line-height: 30px;
    /* display: flex; */
    align-items: center;    
    /* text-align: justify; */
    /* text-align: center; */
    color: #000000;
}

.question-btn {
    background: #F2F0E6;
    width: 100%;
    border-radius: 12px;
    margin: 1em 1.5em 1em;
    padding: 0.5em;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}

.question-btn-selected {
    background: #FFF7CD;
    width: 100%;
    border-radius: 12px;
    margin: 1em 1.5em 1em;
    padding: 0.5em;
    /* filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.1)); */
}

.left-mg {
    margin-left: 2em;
}

.right-mg {
    margin-right: 2em;
}
</style>