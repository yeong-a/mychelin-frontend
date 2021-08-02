/*
 User API 예시
 */
// URI
import axios from 'axios'
import store from '../vuex/store'

const BASEURL = 'http://i5a206.p.ssafy.io:8080'  // 임시
// const headerJWT = {
//     'Authorization': localStorage.getItem('jwt')
// }

// 나중에 request method로 변경
const requestProfile = (nickname) => {
    const headerJWT = {
    'Authorization': localStorage.getItem('jwt')
    }
    const promise = axios({
                        method: 'get',
                        url: BASEURL + '/user/profile/' + nickname,
                        headers: headerJWT,
                    })
    // using .then, create a new promise which extracts the data
    const dataPromise = promise.then((response) => response.data)
    // return it
    return dataPromise
}

const requestPasswordChange = (passwords) => {
    const headerJWT = {
        'Authorization': localStorage.getItem('jwt')
    }
    const promise = axios({
        method: 'put',
        url: BASEURL + '/user/changepwd',
        headers: headerJWT,
        data: passwords
    })
    const dataPromise = promise.then((res) => res.data)
    return dataPromise
}

const requestUserWithdraw = () => {
    const headerJWT = {
        'Authorization': localStorage.getItem('jwt')
    }
    const promise = axios({
        method: 'delete',
        url: BASEURL + '/user/delete',
        headers: headerJWT
    })
    const dataPromise = promise.then((res) => res.data)
    return dataPromise
}

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

const requestReviews = (nickname) => {
    return axios({
        method: 'get',
        url: BASEURL + '/place/review/user/' + nickname,
        })
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

const follow = (data) => {
    const headerJWT = {
    'Authorization': localStorage.getItem('jwt')
    }
    return axios({
        method: 'post',
        url: BASEURL + '/follow/request',
        data: data,
        headers: headerJWT,
        })
}

const getFollowings = (nickname) => {
    return axios({
        method: 'get',
        url: BASEURL + '/follow/list/' + nickname,
        })
}
const UserApi = {
    requestProfile,
    requestFeeds,
    requestReviews,
    requestLists,
    requestPasswordChange,
    requestUserWithdraw,
    follow,
    getFollowings
}

export default UserApi
