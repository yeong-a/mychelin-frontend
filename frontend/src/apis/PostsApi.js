/*
 User API 예시
 */
// URI
import axios from 'axios'
import store from '../vuex/store'

const BASEURL = 'http://i5a206.p.ssafy.io:8080'  // 임시
const requestFeeds = () => {
    let posts = [];
    let data = {
        'title' : '맛있다',    
        'picture' : 'https://picsum.photos/200/200',
        'created': '2021-07-15',
        'feedId': 1,
        };
    for (let i=0; i< 10; i++){
        posts.push(data)
    }
    return {
        'data': posts
        }
}

const requestReviews = () => {
    let posts = [];
    let data = {
        'title' : '맛있다',    
        'picture' : 'https://picsum.photos/200/200',  // 랜덤 이미지
        'description': '죽기전에 꼭 가봐야할 식당!',
        'score': 4.8,
        'reviewId': 1,
        'created': '2021-07-15',
        };

    for (let i=0; i< 3; i++){
        posts.push(data)
    }
    return {
        'data': posts
        }
}


const requestLists = () => {
    let posts = [];
    let data = {
        'restaurant': '가나다 횟집',
        'listName': '최애 초밥집'
    }
    for (let i=0; i< 3; i++){
        posts.push(data)
    }
    return {
        'data': posts
    }
}

const requestMainFeeds = () => {
    const headerJWT = {
        'Authorization': localStorage.getItem('jwt')
    }
    axios({
        method: 'get',
        url: BASEURL + '/post/main',
        headers: headerJWT,
    })
    .then(res => {
        let feeds = res.data.data
        for(let feed of feeds){
            feed['contentFront'] = feed['content'].slice(0, 100)
            feed['contentBack'] = feed['content'].slice(100,)
            if (feed['contentBack'] === "") feed['long'] = false;
            else feed['long'] = true;
            feed['profilePic'] = 'https://picsum.photos/200/200';
            feed['contentPic'] = 'https://picsum.photos/360/360'
        }
        store.commit('FILL_MAIN_POSTS', feeds)
    })
}

const requestPosts = (keyword)=>{
    let feeds = [
        {
            'nickname': '스폰지밥',
            'followers': 10,
            'created': '2021-07-18',
            'profilePic': 'https://picsum.photos/200/200',
            'contentPic': 'https://picsum.photos/360/361',
            'likes': 25,
            'title': keyword + 'test',
            'content': 'contents',
            'commentCount': 3,
            'id': 1,
        },
        {
            'nickname': '스폰지밥',
            'followers': 10,
            'created': '2021-07-18',
            'profilePic': 'https://picsum.photos/200/200',
            'contentPic': 'https://picsum.photos/360/360',
            'likes': 25,
            'title': '다람쥐의 헌쳇바퀴',
            'content': 'Lorem ipsum dolor sit amet, consectetur adipi scing elit, \
            sed do eiusmod tempor incidi dunt ut labore et dolore magna ...',
            'commentCount': 3,
            'id': 2,
        }
    ];
    for(let feed of feeds){
        feed['contentFront'] = feed['content'].slice(0, 100)
        feed['contentBack'] = feed['content'].slice(100,)
        if (feed['contentBack'] === "") feed['long'] = false;
        else feed['long'] = true;
    }
    store.commit('FILL_MAIN_POSTS', feeds)
}


const requestRestaurants = (keyword)=>{
    if (keyword === '') keyword = '서울';
    axios.get(BASEURL + `/place?name=${keyword}`)
    .then(res => {
        store.commit('FILL_MAIN_RESTAURANTS', res.data.data.data)
    })
}

const requestRestaurantsSub = (keyword)=>{
    return axios.get(BASEURL + `/place?name=${keyword}`)
}

const requestMychelin = (keyword) => {
    if (keyword === '') keyword = '나만';
    axios.get(BASEURL + `/placelist?title=${keyword}`,{
        headers: {
            'Authorization': localStorage.getItem('jwt'),
        },
    })
    .then(res => {
        store.commit('FILL_MAIN_MYCHELIN', res.data.data.placelist)
    })
}
const requestMyMychelin = (nickname) => {
    return axios.get(BASEURL + `/placelist?nickname=${nickname}`,{
        headers: {
            'Authorization': localStorage.getItem('jwt'),
        },
    })
}

// 참고 : https://stackoverflow.com/questions/48980380/returning-data-from-axios-api
const requestMychelinDetail = (id) => {
    // create a promise for the axios request
    // const promise = axios.get(BASEURL + '/placelist/' + id)
    // // using .then, create a new promise which extracts the data
    // const dataPromise = promise.then((response) => response.data)
    // // return it
    // return dataPromise
    return axios.get(BASEURL + `/placelist/${id}`,{
        headers: {
            'Authorization': localStorage.getItem('jwt'),
        },
    })
    // return 0
}

// 게시글에 좋아요 누르기
const requestPostLike = (data,callback,errorCallback) => {
    axios({
        method: 'put',
        url: BASEURL + `/post/like`,
        headers: {
            'Authorization': localStorage.getItem('jwt'),
        },
        data:{
            "postId":data
        }
    })
    .then(res => {
        callback();
    }).catch(e => {
        errorCallback();
    })
}


const UserApi = {
    requestFeeds,
    requestReviews,
    requestLists,
    requestMainFeeds,
    requestPosts,
    requestRestaurants,
    requestRestaurantsSub,
    requestMychelin,
    requestMyMychelin,
    requestMychelinDetail,
    requestPostLike,
}

export default UserApi
