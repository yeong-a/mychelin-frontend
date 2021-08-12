<template>
    <div> 
        <div class="container mfti-bgi">
            <div v-on:click="goMain"><CloseBtn /></div>
            <div class="mt-3"><p class="topic">나는 어떤 맛을 좋아할까?</p></div>
            <div class="d-flex justify-content-center mt-2">
                <MftiProgressBar :filledCount="qIdx+1" :allCount="qLength"/>  
            </div>
            <!-- 질문 -->
            <div class="mb-3">
                <p class="question-title">{{ question.question }}</p>
            </div>
            <div class="mx-2">
                <div class="d-flex justify-content-center" v-for="(option, indexO) in question.options" v-bind:key="option.id">
                    <div v-bind:class="{'question-btn': !selectArray[indexO], 'question-btn-selected': selectArray[indexO]}"
                    v-on:click="selectOption(indexO)">{{ option }}</div>
                </div>
            </div>

            <!-- 다음 버튼 -->
            <div v-on:click="goNext"><NextBtn /></div>
            <!-- <a class="button-3d" v-on:click="goNext">다음</a> -->
        </div>
    </div>
</template>

<script>
import CloseBtn from '@/components/btn/CloseBtn'
import NextBtn from '@/components/btn/NextBtn'
import MftiApi from '@/apis/MftiApi'
import MftiProgressBar from './MftiProgressBar'
export default {
    components: {
        CloseBtn,
        NextBtn,
        MftiProgressBar,
    },
    data() {
        return {
            mftiResult: {},
            questions: [],
            qIdx: 0,
            selectArray: [],
        }
    },
    created() {
        this.questions = MftiApi.getMFTI().data;
        this.selectArray = Array(this.questions[0].options.length).fill(false)
    },
    methods: {
        selectOption(indexO) {
            this.selectArray = Array(this.selectArray.length).fill(false)
            this.$set(this.selectArray, indexO, true);
        }, 
        goNext() {
            let selectIdx = this.selectArray.indexOf(true)
            if (selectIdx === -1) {
                window.swal('선택지를 골라주세요!');
                return
            } else {
                let tot = 1 - selectIdx/(this.selectArray.length - 1)
                if (this.mftiResult[this.question.topic] === undefined) {
                    this.mftiResult[this.question.topic] = {'totalScore': tot, 'topicCount': 1}
                } else {
                    let temp = this.mftiResult[this.question.topic]
                    temp['totalScore'] = temp['totalScore'] + tot
                    temp['topicCount'] = temp['topicCount'] + 1
                    this.mftiResult[this.question.topic] = temp
                }
            }
            // 마지막 페이지
            if (this.qIdx === this.questions.length - 1) {
                window.swal('결과 페이지로 이동합니다.')
                .then(() => {
                    this.$router.push({name: 'MftiResult', params: {mftiResult: this.mftiResult}})
                })
                return
            }
            this.qIdx += 1
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
            
        }
    },
    computed: {
        question() {
            return this.questions[this.qIdx]
        },
        qLength() {
            return this.questions.length
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
    background-color: #DBD8A1;
    top:0px;
}

.question-title {
    /* position: static; */
    /* width: 266px;
    height: 60px; */
    margin: 1.5em 1.5em 1.5em;
    font-family: Spoqa Han Sans Neo;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 30px;
    display: flex;
    align-items: center;

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

</style>