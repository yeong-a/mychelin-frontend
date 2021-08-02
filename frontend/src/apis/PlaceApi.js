import axios from 'axios'
import store from '../vuex/store'

const baseUrl = 'http://i5a206.p.ssafy.io:8080'  // 임시
const headerJWT = {
    'Authorization': localStorage.getItem('jwt')
}

const requestPlace = (data,callback,errorCallback) => {
    axios.get(baseUrl + `/place/${data}`)
    .then(function(response){
        store.commit('GET_PLACE_DATA', response.data.data)
    }).catch(e => {
        errorCallback();
    })
}

const requestPlaceReview = (data,callback,errorCallback) => {
    axios.get(baseUrl + `/place/review/${data}`)
    .then(function(response){
        store.commit('GET_PLACE_REVIEW_DATA', response.data.data)
    }).catch(e => {
        errorCallback();
    })
}

const requestReviewWrite = (data,callback,errorCallback) => {
    axios({
        method: 'post',
        url: baseUrl + `/place/review`,
        headers: headerJWT,
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
    requestPlaceReview:(data,callback,errorCallback)=>requestPlaceReview(data,callback,errorCallback),
    requestReviewWrite:(data,callback,errorCallback)=>requestReviewWrite(data,callback,errorCallback),
}

export default PlaceApi
