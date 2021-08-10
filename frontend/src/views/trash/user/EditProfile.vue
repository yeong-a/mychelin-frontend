<template>
  <div class="profile_whole_wrap">
      <div class="profile_nav">
        <div class="profile_home_btn">MYCHÉLIN</div>
        <div class="profile_prf_btn">
          <div class="profile_img"></div>
          <span class="profile_nickname">NICKNAME</span>
        </div>
      </div>
      <div class="profile_body">
        <div class="profile_tap">
          <div class="profile_num">User Profile</div>
          <div class="profile_num1" v-on:click="selected=1" v-bind:style="selected == 1 ? {'color': '#9B9B9B'} : {'color': '#E8E8E8'}"> <i class="far fa-user"></i>     유저 정보 변경</div>
          <div class="profile_num2" v-on:click="selected=2" v-bind:style="selected == 2 ? {'color': '#9B9B9B'} : {'color': '#E8E8E8'}"><i class="fas fa-cog"></i>   비밀번호 변경</div>
          <div class="profile_num3" v-on:click="selected=3" v-bind:style="selected == 3 ? {'color': '#9B9B9B'} : {'color': '#E8E8E8'}"><i class="far fa-bell"></i>   알림 설정</div>
          <div class="profile_num4" v-on:click="logout"><i class="fas fa-sign-out-alt"></i>   로그 아웃</div>
        </div>
        <div class="profile_dp">
          <div class="profile_dp_info" v-if="selected === 1">
            <div class="profile_info_img"><i class="far fa-edit" style="position:absolute; left:120px; top:115px; font-size: 24px; color:#9B9B9B;"></i></div>
            <div class="profile_info_name">KIM SSAFY</div>
            <div style="position:absolute; left:541px; top:300px;">nick</div>
            <input class="profile_info_nick"/>
            <div style="position:absolute; left:964px; top:300px;">e-mail</div>
            <input type="text" class="profile_info_gender"/>
            <div style="position:absolute; left:541px; top:410px;">gender</div>
            <input type="text" class="profile_info_email"/>
            <div style="position:absolute; left:964px; top:410px;">MFTI</div>
            <input type="text" class="profile_info_phone"/>
            <div style="position:absolute; left:541px; top:520px;">phon-number</div>
            <input type="text" class="profile_info_mfti"/>
            <button type="button" class="profile_info_save">Save Change</button>
          </div>
          <div class="profile_dp_pass" v-if="selected === 2">
          </div>
          <div class="profile_dp_alram" v-if="selected === 3">
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
    components: {
    },
    
    methods: {
      logout() {

      },
    },
    data() {
        return {
            userInfo: {},
            posts: [],
            selected: 1,
        }
    },
}
</script>

<style>
* { font-family: 'Spoqa Han Sans Neo', 'sans-serif'; }

.profile_whole_wrap{
  width: 100vw;
  height: 100vh;
  min-height: 740px;
  display: block;
  flex-direction: column;
}
.profile_nav{
  width: 100%;
  height: 7%;
  min-height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.profile_body{
  display: flex;
  width: 100%;
  height: 93%;
  background-color: #fffdfd;
}
.profile_dp{
  width: 70%;
  min-width: 1008px;
  height:100%;
}
.profile_tap{
  border-right:dashed 1px #C4C4C4;
  width: 23%;
  min-width: 344px;
  height: 100%;
}
.profile_home_btn{
  margin-left: 5%;
  
font-size: 28px;
line-height: 45px;
letter-spacing: -0.05em;

color: #FF742E;
}
.profile_prf_btn{
  width: 50vw;
  margin-right: 5%;
  height: 100%;
  display: flex;
  flex-direction: row;
}
.profile_img{
  width:40px;
  height: 40px;
  border:solid 2px #9B9B9B;
  border-radius: 50%;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('../../../assets/images/profile_default.png');
  background-size: cover;
  margin: auto 0 auto auto;
    
}
.profile_nickname{
  font-size: 24px;
  margin-left: 15px;
  margin-top: auto;
  margin-right: 0;
  margin-bottom: auto;
  color: #9B9B9B;
}

.profile_num{
position: absolute;
width: 203px;
height: 12px;
left: 85px;
top: 96px;

font-family: Spoqa Han Sans Neo;
font-style: normal;
font-weight: bold;
font-size: 34px;
line-height: 42px;

color: #9B9B9B;
}
.profile_num1{
  /* 유저 정보 변경 */
position: absolute;
width: 175px;
height: 29px;
left: 125px;
top: 194px;

font-size: 24px;
line-height: 28px;

color: #000000;
}
.profile_num2{
 
position: absolute;
width: 177px;
height: 31px;
left: 125px;
top: 284px;

font-size: 24px;
line-height: 28px;

color: #C4C4C4;
}
.profile_num3{
 position: absolute;
width: 177px;
height: 46px;
left: 125px;
top: 373px;

font-size: 24px;
line-height: 28px;

color: #C4C4C4;
}
.profile_num4{
 position: absolute;
width: 155px;
height: 29px;
left: 133px;
top: 623px;

font-size: 24px;
line-height: 28px;
/* identical to box height */


color: #FF742E;
}

.profile_info_img{
position: absolute;
width: 150px;
height: 150px;
left: 516px;
top: 130.64px;
background: url('../../../assets/images/profile_default.png');
background-size: cover;
border-radius: 100px;
border: 1px solid #C4C4C4;

}
.profile_info_name{
position: absolute;
width: 235px;
height: 44px;
left: 719px;
top: 174px;

font-size: 36px;
line-height: 42px;

color: #9B9B9B;
}
.profile_info_nick{
  
position: absolute;
width: 315px;
height: 46px;
left: 531px;
top: 320px;

background: rgba(255, 198, 180, 0.2);
border-radius: 30px;
}
.profile_info_gender{
position: absolute;
width: 315px;
height: 46px;
left: 954px;
top: 320px;

background: rgba(255, 198, 180, 0.2);
border-radius: 30px;
}
.profile_info_email{
  position: absolute;
width: 315px;
height: 46px;
left: 531px;
top: 430px;

background: rgba(255, 198, 180, 0.2);
border-radius: 30px;
}
.profile_info_phone{
position: absolute;
width: 315px;
height: 46px;
left: 954px;
top: 430px;

background: rgba(255, 198, 180, 0.2);
border-radius: 30px;
}
.profile_info_mfti{
position: absolute;
width: 315px;
height: 46px;
left: 531px;
top: 540px;

background: rgba(255, 198, 180, 0.2);
border-radius: 30px;
}
.profile_info_save{
  position: absolute;
width: 292px;
height: 62px;
left: 754px;
top: 650px;
color: white;
font-size: 24px;
background: #FF742E;
border-radius: 30px;
}
</style>