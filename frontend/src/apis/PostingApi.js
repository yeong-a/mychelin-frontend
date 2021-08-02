import axios from 'axios'
import store from '../vuex/store'

const baseUrl = 'http://i5a206.p.ssafy.io:8080'  // 임시

const requestPosting = (data,callback,errorCallback) => {
    axios({
        method: 'post',
        url: baseUrl + `/post/upload`,
        headers: {
            'Authorization': localStorage.getItem('jwt'),
            //'Content-Type': 'multipart/form-data'
        },
        data: data,
    })
    .then(res => {
        callback();
    }).catch(e => {
        errorCallback();
    })
}

const requestPostComment = (data,callback,errorCallback) => {
    axios.get(baseUrl + `/comments/${data}`)
    .then(function(response){
        store.commit('GET_POST_COMMENT_DATA', response.data.data)
    }).catch(e => {
        errorCallback();
    })
}

const requestWriteComment = (data,callback,errorCallback) => {
    axios({
        method: 'post',
        url: baseUrl + `/comments/${data.id}`,
        headers: {
            'Authorization': localStorage.getItem('jwt'),
        },
        data: {
            "message": data.message,
        },
    })
    .then(res => {
        callback();
    }).catch(e => {
        errorCallback();
    })
}

const PostingApi = {
    requestPosting:(data,callback,errorCallback)=>requestPosting(data,callback,errorCallback),
    requestPostComment:(data,callback,errorCallback)=>requestPostComment(data,callback,errorCallback),
    requestWriteComment:(data,callback,errorCallback)=>requestWriteComment(data,callback,errorCallback),
}

export default PostingApi
