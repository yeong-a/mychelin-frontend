<template>
    <div>
        <div>
            <div class="row my-4">
                <!-- <h1>Topic : {{ topic }}</h1> -->
            </div>
            <div class="mb-5" v-for="(question, indexQ) in questions" v-bind:key="question.id">
                <div class="row mb-3">
                    <p class="question-title">{{ question.question }} {{ question.id }}</p>
                </div>
                <div class="row mx-2">
                    <div v-for="(option, indexO) in question.options" v-bind:key="option.id">
                        <div v-bind:class="{'question-btn': !optionArray[indexQ][indexO], 'question-btn-selected': optionArray[indexQ][indexO]}"
                        v-on:click="selectOption(indexQ, indexO)">{{ option }}</div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        data: Object,
        op: Array
    },
    data() {
        return {
            options: this.op,
            test: true
        }
    },
    computed: {
        topic() {
            return this.data.topic
        },
        questions() {
            return this.data.questions
        },
        optionArray() {
            return this.options
        }
    },
    methods: {
        selectOption(indexQ, indexO) {
            let temp = this.options[indexQ];
            temp = Array(temp.length).fill(false);
            temp[indexO] = true;
            this.options[indexQ] = temp;
            this.$set(this.options, indexQ, temp);
        },

    },
    watch: {
        
    }
}
</script>

<style scoped>
div {
    text-align: center;
}

.question-title {
    font-size: 1.5em;
    color: #FF742E;
    font-weight: 900;
    opacity: 0.9;
}

.question-btn {
    box-shadow: 5px 5px 7px rgb(141, 139, 139);
    border-radius: 3em;
    margin-bottom: 1.3em;
    background-color: #FFF;
    padding: 0.4em;
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
    padding: 0.4em;
}
</style>