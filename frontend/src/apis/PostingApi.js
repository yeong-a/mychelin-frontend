import axios from 'axios'
import store from '../vuex/store'

const baseUrl = 'http://i5a206.p.ssafy.io:8080'  // 임시

// 글 작성하기
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

// 게시글에 댓글 가져오기
const requestPostComment = (data,callback,errorCallback) => {
    axios.get(baseUrl + `/comments/${data}`)
    .then(function(response){
        store.commit('GET_POST_COMMENT_DATA', response.data.data)
    }).catch(e => {
        errorCallback();
    })
}

// 게시글에 댓글 작성하기 
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
        //console.log(res);
        callback();
    }).catch(e => {
        errorCallback();
    })
}

// 게시글에 댓글 삭제하기
const requestDeleteComment = (data,callback,errorCallback) => {
    axios({
        method: 'delete',
        url: baseUrl + `/comments/${data}`,
        headers: {
            'Authorization': localStorage.getItem('jwt'),
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
    requestDeleteComment:(data,callback,errorCallback)=>requestDeleteComment(data,callback,errorCallback),
}

export default PostingApi
