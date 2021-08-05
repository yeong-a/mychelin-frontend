import axios from 'axios'
import store from '../vuex/store'

const baseUrl = 'http://i5a206.p.ssafy.io:8080'  // 임시

// 식당 정보 가져오기
const requestPlace = (data,callback,errorCallback) => {
    axios.get(baseUrl + `/place/${data}`)
    .then(function(response){
        store.commit('GET_PLACE_DATA', response.data.data)
    }).catch(e => {
        errorCallback();
    })
}

// 식당 정보 간단 가져오기
const requestPlaceSimple = (data) => {
    return axios.get(baseUrl + `/place/${data}`,{
        headers: {
            'Authorization': localStorage.getItem('jwt'),
        },
    })
}
// 맛집리스트 정보 간단 가져오기
const requestPlaceListSimple = (data) => {
    return axios.get(baseUrl + `/placelist?id=${data}`,{
        headers: {
            'Authorization': localStorage.getItem('jwt'),
        },
    }
    )
}

// 특정 식당 리뷰 가져오기
const requestPlaceReview = (data,callback,errorCallback) => {
    axios.get(baseUrl + `/place/review/${data}`)
    .then(function(response){
        store.commit('GET_PLACE_REVIEW_DATA', response.data.data.reviews)
    }).catch(e => {
        errorCallback();
    })
}

// 특정 식당 리뷰 작성하기
const requestReviewWrite = (data,callback,errorCallback) => {
    axios({
        method: 'post',
        url: baseUrl + `/place/review`,
        headers: {
            'Authorization': localStorage.getItem('jwt'),
        },
        data: data,
    })
    .then(res => {
        callback();
    }).catch(e => {
        errorCallback();
    })
}

// 특정 식당 리뷰 수정하기
const requestReviewEdit = (data,callback,errorCallback) => {
    axios({
        method: 'put',
        url: baseUrl + `/place/review`,
        headers: {
            'Authorization': localStorage.getItem('jwt'),
        },
        data: data,
    })
    .then(res => {
        callback();
    }).catch(e => {
        errorCallback();
    })
}

// 특정 식당 리뷰 삭제하기
const requestReviewDelete = (data,callback,errorCallback) => {
    axios({
        method: 'delete',
        url: baseUrl + `/place/review`,
        headers: {
            'Authorization': localStorage.getItem('jwt'),
        },
        data: data,
    })
    .then(res => {
        callback();
    }).catch(e => {
        errorCallback();
    })
}
const PlaceApi = {
    requestPlace:(data,callback,errorCallback)=>requestPlace(data,callback,errorCallback),
    requestPlaceSimple:(data)=>requestPlaceSimple(data),
    requestPlaceListSimple:(data)=>requestPlaceListSimple(data),
    requestPlaceReview:(data,callback,errorCallback)=>requestPlaceReview(data,callback,errorCallback),
    requestReviewWrite:(data,callback,errorCallback)=>requestReviewWrite(data,callback,errorCallback),
    requestReviewEdit:(data,callback,errorCallback)=>requestReviewEdit(data,callback,errorCallback),
    requestReviewDelete:(data,callback,errorCallback)=>requestReviewDelete(data,callback,errorCallback),
}

export default PlaceApi
