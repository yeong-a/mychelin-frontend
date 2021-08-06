import axios from 'axios'
import store from '../vuex/store'

const baseUrl = 'http://i5a206.p.ssafy.io:8080'  // 임시

// 로그인
const requestLogin = (data,callback,errorCallback) => {
    axios.post(baseUrl + `/user/login`, data)
    .then(function(response){
        // 로그인 성공(200)
        store.commit('LOG_IN_STATE')
        localStorage.setItem('nickname', response.data.nickname);  // 닉네임 저장
        localStorage.setItem('jwt',response.headers.authorization);
        callback();
    }).catch(e => {
        // 로그인 실패
        window.swal("아이디 또는 비밀번호를 확인해 주세요!");
    })
}

// 회원가입
const requestJoin = (data,callback,errorCallback) => {
   axios.post(baseUrl + `/user/signup`, data)
    .then(res => {
        callback();
    }).catch(e=>{
        window.swal(e.response.data.message + "!");
    })
}

// 이메일 인증 전송
const requestEmail = (data,callback,errorCallback) => {
    axios.post(baseUrl + `/user/check/email`, data)
     .then(res => {
         callback();
     }).catch(e=>{
         if(e.response.status == 404){
            window.swal("",e.response.data.message, "error");
         }
     })
}

// 이메일 인증 전송
/*const requestEmailCert = (data,callback,errorCallback) => {
    axios.post(baseUrl + `/user/check/emailToken`, data)
     .then(res => {
        if(res.status == 200){
            window.swal("",res.data.message,"success")
            console.log(res);
        }
     }).catch(e=>{
         alert(e.response.data.data + "!");
     })
}*/
const requestEmailCert = (data) => {
    return axios.post(baseUrl + `/user/check/emailToken`, data)
}

const LoginApi = {
    requestLogin:(data,callback,errorCallback)=>requestLogin(data,callback,errorCallback),
    requestJoin:(data,callback,errorCallback)=>requestJoin(data,callback,errorCallback),
    requestEmail:(data,callback,errorCallback)=>requestEmail(data,callback,errorCallback),
    //requestEmailCert:(data,callback,errorCallback)=>requestEmailCert(data,callback,errorCallback),
    requestEmailCert:(data)=>requestEmailCert(data),
}

export default LoginApi
