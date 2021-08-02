import axios from 'axios'
import store from '../vuex/store'

const baseUrl = 'http://i5a206.p.ssafy.io:8080'  // 임시

const requestLogin = (data,callback,errorCallback) => {
    axios.post(baseUrl + `/user/login`, data)
    .then(function(response){
        // 로그인 성공(200)
        store.commit('LOG_IN_STATE')
        console.log(store.state.isUser)
        localStorage.setItem('nickname', response.data.nickname);  // 닉네임 저장
        localStorage.setItem('jwt',response.headers.authorization);
        callback();
    }).catch(e => {
        // 로그인 실패
        alert(e.response.data.data + "!");
    })
}

const requestJoin = (data,callback,errorCallback) => {
    // 백앤드와 회원가입 통신하는 부분
   axios.post(baseUrl + `/user/signup`, data)
    .then(res => {
        callback();
    }).catch(e=>{
        alert(e.response.data.data + "!");
    })
}

const LoginApi = {
    requestLogin:(data,callback,errorCallback)=>requestLogin(data,callback,errorCallback),
    requestJoin:(data,callback,errorCallback)=>requestJoin(data,callback,errorCallback),
}

export default LoginApi
