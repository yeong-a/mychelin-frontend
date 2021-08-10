<template>
    <div> 
        <div class=""></div>
        <div class="container mfti-bgi">
            <div class="row my-4">
                <!-- <h1>Topic : {{ topic }}</h1> -->
            </div>
            <div class="mb-5" v-for="(question, indexQ) in questions" v-bind:key="question.id">
                <div class="row mb-3">
                    <p class="question-title">{{ question.question }} {{ question.id }}</p>
                </div>
                <div class="row mx-2">
                    <div v-for="(option, indexO) in question.options" v-bind:key="option.id">
                        <div v-bind:class="{'question-btn': !options[indexQ][indexO], 'question-btn-selected': options[indexQ][indexO]}"
                        v-on:click="selectOption(indexQ, indexO)">{{ option }}</div>
                    </div>
                </div>
            </div>

            <!-- 다음 버튼 -->
            <a class="button-3d" v-on:click="goNext">다음</a>
        </div>
    </div>
</template>

<script>
import MftiApi from '@/apis/MftiApi'
export default {
    components: {
    },
    data() {
        return {
            data: Object,
            index: Number,
            options: [],
        }
    },
    created() {
        this.data = MftiApi.getQTemp().data;
        this.index = 0;
        let result = [];
        for(let q of this.data[this.index].questions){
            result.push(Array(q.options.length).fill(false))
        }
        this.options = result
    },
    methods: {
        goNext() {
            const sum = (accumulator, curr) => accumulator + curr;
            let selectedCount = 0
            for(let o of this.options) {
                selectedCount += o.reduce(sum)
            }
            if (selectedCount < this.dt.questions.length) {
                window.swal('모든 항목에 답변부탁드립니다!');
                return 0
            }
            if (this.index < this.data.length - 1) {
                this.index = this.index + 1;

                let result = [];
                for(let q of this.dt.questions){
                    result.push(Array(q.options.length  ).fill(false))
                }
                this.options = result
            }
            else 
                return // this.$router.push({ name: "MftiResult" }) 
        },
        selectOption(indexQ, indexO) {
            let temp = this.options[indexQ];
            temp = Array(temp.length).fill(false);
            temp[indexO] = true;
            this.options[indexQ] = temp;
            this.$set(this.options, indexQ, temp);
        }, 
    },
    computed: {
        dt() {
            return this.data[this.index]
        },
        topic() {
            return this.dt.topic
        },
        questions() {
            return this.dt.questions
        },
    },
}
</script>

<style scoped>
.button-3d {
  width: auto;
  color:#ecf0f1;
  text-decoration:none;
  border-radius:5px;
  border:solid 1px #f39c12;
  background:#e67e22;
  /* text-align:center; */
  padding:1em 1.5em 1em;
  box-shadow: 0.3em 0.3em 0.7em #666;
  
  margin-right: 1em;
  float:right;
  
}

.mfti-bgi {
    /* position: absolute; */
    /* background-image: linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url('../../../assets/images/daan-evers-tKN1WXrzQ3s-unsplash.jpg'); */
    background-color: rgba(186, 207, 90, 0.4);
    top:0px;
    /* z-index:-1; */
}

div {
    text-align: center;
}

.question-title {
    font-size: 1.5em;
    color: rgb(46, 45, 45);
    font-weight: 900;
    opacity: 0.9;
}

.question-btn {
    box-shadow: 5px 5px 7px rgb(141, 139, 139);
    border-radius: 3em;
    margin-bottom: 1.3em;
    background-color: #FFF;
    text-align: left;
    padding: 0.4em 1.1em 0.4em;
}

.question-btn:active {
  box-shadow: 0 0;
  transform: translateY(4px) translateX(4px);
}

.question-btn-selected {
    /* box-shadow: 5px 5px 7px #333; */
    background-color: #FF742E;
    border-radius: 3em;
    margin-bottom: 1.3em;
    text-align: left;
    padding: 0.4em 1em 0.4em;
}

</style>