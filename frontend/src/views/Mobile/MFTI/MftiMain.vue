<template>
    <div> 
        <div class=""></div>
        <div class="container mfti-bgi">
            <MtfiDetail :data="dt" :op="options(dt)"/>
            <a class="button-3d" v-on:click="goNext">다음</a>
        </div>
    </div>
</template>

<script>
import MftiApi from '@/apis/MftiApi'
import MtfiDetail from './MftiDetail'
export default {
    components: {
        MtfiDetail,
    },
    data() {
        return {
            data: Object,
            index: Number,
        }
    },
    created() {
        this.data = MftiApi.getQTemp().data;
        this.index = 0;
    },
    computed: {
        dt() {
            return this.data[this.index];
        }
    },
    methods: {
        goNext() {
            if (this.index < this.data.length - 1) this.index = this.index + 1;
            else this.$router.push({ name: "MftiResult" })
            
        },
        options(dt) {
            let result = [];
            for(let q of dt.questions){
                result.push(Array(q.options.length).fill(false))
            }
            return result
        }
    }
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
  text-align:center;
  padding:1em 1.5em 1em;
  box-shadow: 0.3em 0.3em 0.7em #666;
  
  margin-right: 1em;
  float:right;
  
}

.mfti-bgi {
    /* position: absolute; */
    background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('../../../assets/images/daan-evers-tKN1WXrzQ3s-unsplash.jpg');
    top:0px;
    /* z-index:-1; */
}


</style>