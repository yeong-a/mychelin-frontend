<template>
  <div class="user" id="complete" >
      <h1>temp</h1>
      <div class="wrapC">
        <h2>회원 가입 완료</h2>
        <button class="button" v-on:click="joinAdd">추가 정보 입력하러 가기</button>
      </div>  
  </div>
</template>

<script>
export default {
    methods: {
            joinAdd(){
                this.$router.push('JoinAdditional')                
            },
    }
}
</script>

<style>

</style>