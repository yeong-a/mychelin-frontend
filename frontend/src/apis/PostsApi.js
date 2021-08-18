/*
 User API 예시
 */
// URI
import axios from "axios";
import store from "../vuex/store";

const BASEURL = "http://i5a206.p.ssafy.io:8080"; // 임시
const requestFeeds = () => {
    let posts = [];
    let data = {
        title: "맛있다",
        picture: "https://picsum.photos/200/200",
        created: "2021-07-15",
        feedId: 1,
    };
    for (let i = 0; i < 10; i++) {
        posts.push(data);
    }
    return {
        data: posts,
    };
};

const requestReviews = () => {
    let posts = [];
    let data = {
        title: "맛있다",
        picture: "https://picsum.photos/200/200", // 랜덤 이미지
        description: "죽기전에 꼭 가봐야할 식당!",
        score: 4.8,
        reviewId: 1,
        created: "2021-07-15",
    };

    for (let i = 0; i < 3; i++) {
        posts.push(data);
    }
    return {
        data: posts,
    };
};

const requestLists = () => {
    let posts = [];
    let data = {
        restaurant: "가나다 횟집",
        listName: "최애 초밥집",
    };
    for (let i = 0; i < 3; i++) {
        posts.push(data);
    }
    return {
        data: posts,
    };
};

const requestMainFeeds = () => {
    let url = BASEURL;
    url += "/post/main";

    const headerJWT = {
        Authorization: localStorage.getItem("jwt"),
    };
    return axios({
        method: "get",
        url: url,
        headers: headerJWT,
    }).then((res) => {
        let feeds = res.data.data.posts;
        // for (let feed of feeds) {
        //     feed["contentFront"] = feed["content"].slice(0, 100);
        //     feed["contentBack"] = feed["content"].slice(100);
        //     if (feed["contentBack"] === "") feed["long"] = false;
        //     else feed["long"] = true;
        //     feed["profilePic"] = "https://picsum.photos/200/200";
        //     feed["contentPic"] = "https://picsum.photos/360/360";
        // }
        store.commit("FILL_MAIN_POSTS", feeds);
    });
};
const requestMainFeedsIL = (page) => {
    const headerJWT = {
        Authorization: localStorage.getItem("jwt"),
    };
    return axios({
        method: "get",
        url: BASEURL + `/post/main?page=${page.limit}`,
        headers: headerJWT,
    });
};
const requestMainFeedsFolIL = (page) => {
    const headerJWT = {
        Authorization: localStorage.getItem("jwt"),
    };
    return axios({
        method: "get",
        url: BASEURL + `/post/following?page=${page.limit}`,
        headers: headerJWT,
    });
};

const requestMainFeedsFol = () => {
    let url = BASEURL;
    url += "/post/following";

    const headerJWT = {
        Authorization: localStorage.getItem("jwt"),
    };
    axios({
        method: "get",
        url: url,
        headers: headerJWT,
    }).then((res) => {
        let feeds = res.data.data.posts;
        for (let feed of feeds) {
            feed["contentFront"] = feed["content"].slice(0, 100);
            feed["contentBack"] = feed["content"].slice(100);
            if (feed["contentBack"] === "") feed["long"] = false;
            else feed["long"] = true;
            feed["profilePic"] = "https://picsum.photos/200/200";
            feed["contentPic"] = "https://picsum.photos/360/360";
        }
        store.commit("FILL_MAIN_POSTSFOL", feeds);
    });
};


const requestRestaurants = (keyword) => {
    if (keyword === "") keyword = "서울";
    axios.get(BASEURL + `/place?name=${keyword}`).then((res) => {
        if (res.data.data) {
            store.commit("FILL_MAIN_RESTAURANTS", res.data.data.data);
        } else {
            store.commit("FILL_MAIN_RESTAURANTS", []);
        }
    });
};
const requestRestaurantsIL = (keyword) => {
    if (keyword.name === "") keyword.name = "서울";
    return axios.get(BASEURL + `/place?name=${keyword.name}&page=${keyword.limit}`);
};

const requestRestaurantsSub = (keyword) => {
    return axios.get(BASEURL + `/place?name=${keyword}`);
};

const requestMychelin = (keyword) => {
    if (keyword === "") keyword = "나만";
    axios
        .get(BASEURL + `/placelist?title=${keyword}`, {
            headers: {
                Authorization: localStorage.getItem("jwt"),
            },
        })
        .then((res) => {
            if (res.data.data) {
                store.commit("FILL_MAIN_MYCHELIN", res.data.data.placeList);
            } else {
                store.commit("FILL_MAIN_MYCHELIN", []);
            }
        });
};
const requestMyMychelin = (nickname) => {
    return axios.get(BASEURL + `/placelist?nickname=${nickname}`, {
        headers: {
            Authorization: localStorage.getItem("jwt"),
        },
    });
};

// 참고 : https://stackoverflow.com/questions/48980380/returning-data-from-axios-api
const requestMychelinDetail = (id, page) => {
    // create a promise for the axios request
    // const promise = axios.get(BASEURL + '/placelist/' + id)
    // // using .then, create a new promise which extracts the data
    // const dataPromise = promise.then((response) => response.data)
    // // return it
    // return dataPromise
    return axios.get(BASEURL + `/placelist/${id}?page=${page}`, {
        headers: {
            Authorization: localStorage.getItem("jwt"),
        },
    });
    // return 0
};

// 게시글에 좋아요 누르기
const requestPostLike = (data, callback, errorCallback) => {
    axios({
        method: "put",
        url: BASEURL + `/post/like`,
        headers: {
            Authorization: localStorage.getItem("jwt"),
        },
        data: {
            postId: data,
        },
    })
        .then((res) => {
            callback();
        })
        .catch((e) => {
            errorCallback();
        });
};

// 게시글 1개의 정보 가져오기
const requestPostDetail = (id) => {
    return axios({
        method: 'get',
        url: BASEURL + `/post/` + id,
        headers: {
            Authorization: localStorage.getItem("jwt"),
        },
    })
}

const requestPostModify = (id, data) => {
    return axios({
        method: 'put',
        url: BASEURL + `/post/` + id,
        headers: {
            Authorization: localStorage.getItem("jwt"),
        },
        data: data,
    })
}

const UserApi = {
    requestFeeds,
    requestReviews,
    requestLists,
    requestMainFeeds,
    requestMainFeedsIL,
    requestMainFeedsFol,
    requestMainFeedsFolIL,
    requestRestaurants,
    requestRestaurantsIL,
    requestRestaurantsSub,
    requestMychelin,
    requestMyMychelin,
    requestMychelinDetail,
    requestPostLike,
    requestPostDetail,
    requestPostModify,
};

export default UserApi;
