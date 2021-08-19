import axios from "axios";

const BASEURL = "http://i5a206.p.ssafy.io:8080"; // 임시
const requestProfile = (nickname) => {
    const headerJWT = {
        Authorization: localStorage.getItem("jwt"),
    };
    const promise = axios({
        method: "get",
        url: BASEURL + "/user/profile/" + nickname,
        headers: headerJWT,
    });
    const dataPromise = promise.then((response) => response.data);
    return dataPromise;
};

const requestModifyInfo = (info) => {
    const headerJWT = {
        Authorization: localStorage.getItem("jwt"),
    };
    const promise = axios({
        method: "put",
        url: BASEURL + "/user/profile",
        headers: headerJWT,
        data: info,
    });
    const dataPromise = promise.then((res) => res.data);
    return dataPromise;
};

const requestPasswordChange = (passwords) => {
    const headerJWT = {
        Authorization: localStorage.getItem("jwt"),
    };
    return axios({
        method: "put",
        url: BASEURL + "/user/changepwd",
        headers: headerJWT,
        data: passwords,
    });
};

const requestUserWithdraw = () => {
    const headerJWT = {
        Authorization: localStorage.getItem("jwt"),
    };
    return axios({
        method: "delete",
        url: BASEURL + "/user/delete",
        headers: headerJWT,
    });
};

const requestFeeds = (nickname) => {
    return axios({
        method: "get",
        url: BASEURL + "/post/list/" + nickname,
        headers: {
            Authorization: localStorage.getItem("jwt"),
        },
    });
};

const requestReviews = (nickname) => {
    return axios({
        method: "get",
        url: BASEURL + "/place/review/user/" + nickname,
    });
};

const follow = (data) => {
    const headerJWT = {
        Authorization: localStorage.getItem("jwt"),
    };
    return axios({
        method: "post",
        url: BASEURL + "/follow/request",
        data: data,
        headers: headerJWT,
    });
};

const unfollow = (data) => {
    const headerJWT = {
        Authorization: localStorage.getItem("jwt"),
    };
    return axios({
        method: "delete",
        url: BASEURL + "/follow/request",
        data: data,
        headers: headerJWT,
    });
};

// 팔로우 요청 수락
const acceptFollow = (data) => {
    const headerJWT = {
        Authorization: localStorage.getItem("jwt"),
    };
    return axios({
        method: "put",
        url: BASEURL + "/follow/accept",
        data: data,
        headers: headerJWT,
    });
};

const getFollowings = (nickname) => {
    return axios({
        method: "get",
        url: BASEURL + "/follow/following/" + nickname,
    });
};

const getFollowers = (nickname) => {
    return axios({
        method: "get",
        url: BASEURL + "/follow/follower/" + nickname,
    });
};

const registerProfileImage = (img) => {
    const headerJWT = {
        Authorization: localStorage.getItem("jwt"),
    };
    return axios({
        method: "post",
        url: BASEURL + "/user/profile/image",
        data: {
            image: img,
        },
        headers: headerJWT,
    });
};
const requestNotice = () => {
    const headerJWT = {
        Authorization: localStorage.getItem("jwt"),
    };
    return axios({
        method: "get",
        url: BASEURL + "/notice",
        headers: headerJWT,
    });
};
const readNotice = (id, type) => {
    const headerJWT = {
        Authorization: localStorage.getItem("jwt"),
    };
    return axios({
        method: "put",
        url: BASEURL + "/notice",
        headers: headerJWT,
        body: {
            id,
            type,
        },
    });
};

const UserApi = {
    requestProfile,
    requestFeeds,
    requestReviews,
    requestPasswordChange,
    requestUserWithdraw,
    follow,
    unfollow,
    acceptFollow,
    getFollowings,
    getFollowers,
    requestModifyInfo,
    registerProfileImage,
    requestNotice,
    readNotice,
};

export default UserApi;
