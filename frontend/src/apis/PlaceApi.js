import axios from "axios";
import store from "../vuex/store";

const baseUrl = "http://i5a206.p.ssafy.io:8080"; // 임시
axios.interceptors.request.use(
    function(config) {
        // 요청을 보내기 전에 수행할 일
        // ...
        //console.log("loading");
        store.state.loading = true;
        return config;
    },
    function(error) {
        // 오류 요청을 보내기전 수행할 일
        // ...\
        store.state.loading = false;
        return Promise.reject(error);
    }
);
axios.interceptors.response.use(
    function(response) {
        // 응답 데이터를 가공
        // ...
        //console.log("loading끝");
        store.state.loading = false;
        return response;
    },
    function(error) {
        // 오류 응답을 처리
        // ...
        store.state.loading = false;
        return Promise.reject(error);
    }
);

// 식당 정보 가져오기
const requestPlace = (data, callback, errorCallback) => {
    axios
        .get(baseUrl + `/place/${data}`)
        .then(function(response) {
            store.commit("GET_PLACE_DATA", response.data.data);
        })
        .catch((e) => {
            errorCallback();
        });
};

// 식당 정보 간단 가져오기
const requestPlaceSimple = (data) => {
    return axios.get(baseUrl + `/place/${data}`, {
        headers: {
            Authorization: localStorage.getItem("jwt"),
        },
    });
};
// 맛집리스트 정보 간단 가져오기
const requestPlaceListSimple = (data) => {
    return axios.get(baseUrl + `/placelist?id=${data}`, {
        headers: {
            Authorization: localStorage.getItem("jwt"),
        },
    });
};

// 특정 식당 리뷰 가져오기
const requestPlaceReview = (data, callback, errorCallback) => {
    axios
        .get(baseUrl + `/place/review/${data}`)
        .then(function(response) {
            store.commit("GET_PLACE_REVIEW_DATA", response.data.data.reviews);
        })
        .catch((e) => {
            errorCallback();
        });
};
// infinite loading
const requestPlaceReviewIL = (data, callback, errorCallback) => {
    return axios.get(baseUrl + `/place/review/${data.id}?page=${data.limit}`);
};

// 특정 식당 리뷰 작성하기
const requestReviewWrite = (data, callback, errorCallback) => {
    axios({
        method: "post",
        url: baseUrl + `/place/review`,
        headers: {
            Authorization: localStorage.getItem("jwt"),
        },
        data: data,
    })
        .then((res) => {
            callback();
        })
        .catch((e) => {
            errorCallback();
        });
};

// 특정 식당 리뷰 수정하기
const requestReviewEdit = (data, callback, errorCallback) => {
    axios({
        method: "put",
        url: baseUrl + `/place/review`,
        headers: {
            Authorization: localStorage.getItem("jwt"),
        },
        data: data,
    })
        .then((res) => {
            callback();
        })
        .catch((e) => {
            errorCallback();
        });
};

// 특정 식당 리뷰 삭제하기
const requestReviewDelete = (data, callback, errorCallback) => {
    axios({
        method: "delete",
        url: baseUrl + `/place/review`,
        headers: {
            Authorization: localStorage.getItem("jwt"),
        },
        data: data,
    })
        .then((res) => {
            callback();
        })
        .catch((e) => {
            errorCallback();
        });
};

// 식당 추천 가져오기
const requestPlaceRecommend = () => {
    axios({
        method: "get",
        url: baseUrl + `/place/recommend`,
        headers: {
            Authorization: localStorage.getItem("jwt"),
        },
    })
        .then((res) => {
            store.commit("GET_PLACE_RECOMMEND_DATA", res.data.data);
        })
        .catch((e) => {
            //window.swal(e.response.data.message);
            window
                .swal({
                    title: e.response.data.message,
                    text: "나에게 맞는 식당을 추천해 드립니다! \n설문하러 갈까요?",
                    buttons: true,
                    dangerMode: true,
                })
                .then((willDelete) => {
                    if (willDelete) {
                        this.$router.push({ name: "MftiPage" });
                    } else {
                        window.swal("다음에 참여해 주세요!").then(() => {
                            window.location.reload();
                        });
                    }
                });
        });
};
// 리스트 추천 가져오기
const requestPlaceListRecommend = () => {
    axios({
        method: "get",
        url: baseUrl + `/placelist/recommend`,
        headers: {
            Authorization: localStorage.getItem("jwt"),
        },
    })
        .then((res) => {
            store.commit("GET_PLACELIST_RECOMMEND_DATA", res.data.data);
        })
        .catch((e) => {});
};
const PlaceApi = {
    requestPlace: (data, callback, errorCallback) => requestPlace(data, callback, errorCallback),
    requestPlaceSimple: (data) => requestPlaceSimple(data),
    requestPlaceListSimple: (data) => requestPlaceListSimple(data),
    requestPlaceReview: (data, callback, errorCallback) => requestPlaceReview(data, callback, errorCallback),
    requestPlaceReviewIL: (data, callback, errorCallback) => requestPlaceReviewIL(data, callback, errorCallback),
    requestReviewWrite: (data, callback, errorCallback) => requestReviewWrite(data, callback, errorCallback),
    requestReviewEdit: (data, callback, errorCallback) => requestReviewEdit(data, callback, errorCallback),
    requestReviewDelete: (data, callback, errorCallback) => requestReviewDelete(data, callback, errorCallback),
    requestPlaceRecommend: () => requestPlaceRecommend(),
    requestPlaceListRecommend: () => requestPlaceListRecommend(),
};

export default PlaceApi;
