import axios from "axios";
import store from "../vuex/store";

const baseUrl = "http://i5a206.p.ssafy.io:8080"; // 임시

// 글 작성하기
const requestPosting = (data, callback, errorCallback) => {
    return axios({
        method: "post",
        url: baseUrl + `/post/upload`,
        headers: {
            Authorization: localStorage.getItem("jwt"),
            "Content-Type": "application/json",
        },
        data: data,
    });
};

// 글 수정하기
const requestEditPosting = (data, callback, errorCallback) => {
    axios({
        method: "put",
        url: baseUrl + `/post/${data.id}`,
        headers: {
            Authorization: localStorage.getItem("jwt"),
        },
        data: {
            content: data.content,
        },
    })
        .then((res) => {
            callback();
        })
        .catch((e) => {
            errorCallback();
        });
};

// 글 삭제하기
const requestdeletePosting = (data, callback, errorCallback) => {
    axios({
        method: "delete",
        url: baseUrl + `/post/${data}`,
        headers: {
            Authorization: localStorage.getItem("jwt"),
        },
    })
        .then((res) => {
            callback();
        })
        .catch((e) => {
            errorCallback();
        });
};

// 게시글에 댓글 가져오기
const requestPostComment = (data, callback, errorCallback) => {
    axios
        .get(baseUrl + `/comments/${data}`)
        .then(function(response) {
            store.commit("GET_POST_COMMENT_DATA", response.data.data);
        })
        .catch((e) => {
            errorCallback();
        });
};

// 게시글에 댓글 작성하기
const requestWriteComment = (data, callback, errorCallback) => {
    axios({
        method: "post",
        url: baseUrl + `/comments/${data.id}`,
        headers: {
            Authorization: localStorage.getItem("jwt"),
        },
        data: {
            message: data.message,
        },
    })
        .then((res) => {
            //console.log(res);
            callback();
        })
        .catch((e) => {
            errorCallback();
        });
};

// 게시글에 댓글 삭제하기
const requestDeleteComment = (data, callback, errorCallback) => {
    axios({
        method: "delete",
        url: baseUrl + `/comments/${data}`,
        headers: {
            Authorization: localStorage.getItem("jwt"),
        },
    })
        .then((res) => {
            callback();
        })
        .catch((e) => {
            errorCallback();
        });
};

// 이미지 추가하고 url 받아오기
const requestImageUrl = (data) => {
    return axios.post(baseUrl + `/image`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

const PostingApi = {
    requestPosting: (data, callback, errorCallback) => requestPosting(data, callback, errorCallback),
    requestEditPosting: (data, callback, errorCallback) => requestEditPosting(data, callback, errorCallback),
    requestdeletePosting: (data, callback, errorCallback) => requestdeletePosting(data, callback, errorCallback),
    requestPostComment: (data, callback, errorCallback) => requestPostComment(data, callback, errorCallback),
    requestWriteComment: (data, callback, errorCallback) => requestWriteComment(data, callback, errorCallback),
    requestDeleteComment: (data, callback, errorCallback) => requestDeleteComment(data, callback, errorCallback),
    requestImageUrl: (data) => requestImageUrl(data),
};

export default PostingApi;
