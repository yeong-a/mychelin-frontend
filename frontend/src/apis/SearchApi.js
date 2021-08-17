import axios from "axios";
import store from "../vuex/store";

const BASEURL = "http://i5a206.p.ssafy.io:8080";

const requestFeeds = (data) => {
    return axios.get(`${BASEURL}/post/search?keyword=${data.keyword}&page=${data.limit}`);
};

const requestUsers = (data) => {
    return axios.get(`${BASEURL}/user/search?nickname=${data.keyword}`);
};

const requestRestaurants = (data) => {
    return axios.get(`${BASEURL}/place?name=${data.keyword}&page=${data.limit}`);
};

// Header 이슈
const requestPlaceList = (data) => {
    return axios.get(`${BASEURL}/placelist?title=${data.keyword}&page=${data.limit}`, {
            headers: {
                Authorization: localStorage.getItem("jwt"),
            },
        })
};
const SearchApi = {
    requestFeeds,
    requestUsers,
    requestRestaurants,
    requestPlaceList
};

export default SearchApi;