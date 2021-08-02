<template>
  <div id="body-wrap">
    <p id="pg-withdraw">정말 탈퇴하시겠습니까?</p>
    <button v-on:click="withdraw" id="button-confirm">탈퇴하기</button>
  </div>
</template>

<script>
import UserApi from '@/apis/UserApi'

export default {
  name: 'UserProfileWithdraw',
  methods: {
    withdraw: function () {
      
      UserApi.requestUserWithdraw()
      .then(res => {
        this.$router.push({ name: 'MainPage' })
      })
      .error(err => {
        console.log(err)
      })

    }
  }
}
</script>

<style scoped>
  #body-wrap {
    font-size: 18px;
  }

  #pg-withdraw {
    text-align: center;
  }

  #button-confirm {
    width: 110px;
    height: 40px;
    display: block;
    margin: 30px auto auto;
    border-radius: 8px;
    background-color: #ff993c;
  }
</style>