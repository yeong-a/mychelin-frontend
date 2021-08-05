<template>
    <div class="container">
        <MtfiDetail :data="data[0]"/>
        <a class="button-3d">다음</a>
        
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
            data: Object 
        }
    },
    created() {
        this.data = MftiApi.getQTemp().data
    }
}
</script>

<style scoped>
.button-3d {
  position:relative;
  width: auto;
  color:#ecf0f1;
  text-decoration:none;
  border-radius:5px;
  border:solid 1px #f39c12;
  background:#e67e22;
  text-align:center;
  padding:16px 18px 14px;

  -webkit-transition: all 0.1s;
  -moz-transition: all 0.1s;
  transition: all 0.1s;

  -webkit-box-shadow: 0px 6px 0px #d35400;
  -moz-box-shadow: 0px 6px 0px #d35400;
  box-shadow: 0px 6px 0px #d35400;
}
</style>