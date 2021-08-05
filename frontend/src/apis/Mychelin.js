import axios from 'axios'
import store from '../vuex/store'
const BASEURL = 'http://i5a206.p.ssafy.io:8080'  // 임시

const addMychelinList = (data)=>{
    const headerJWT = {
    'Authorization': localStorage.getItem('jwt')
    }
    return axios({
        method: 'post',
        url: BASEURL + '/placelist',
        headers: headerJWT,
        data: {
            'title': data
        }
    })
}

const addMychelinRestaurant = (data)=>{
    const headerJWT = {
    'Authorization': localStorage.getItem('jwt')
    }
    return axios({
        method: 'post',
        url: BASEURL + '/placelist/' + data.listId,
        headers: headerJWT,
        data: data.placeId
    })
}


const Mychelin = {
    addMychelinList,
    addMychelinRestaurant
}

export default Mychelin