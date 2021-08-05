import axios from 'axios'

const BASEURL = 'http://i5a206.p.ssafy.io:8080'  // 임시

const addMychelinList = (data)=>{
    console.log(data)
    const headerJWT = {
    'Authorization': localStorage.getItem('jwt')
    }
    axios({
        method: 'post',
        url: BASEURL + '/placelist',
        headers: headerJWT,
        data: {
            'title': data
        }
    }).then((res) => {
        console.log(res)
    })
}

const addMychelinRestaurant = (data)=>{
    const headerJWT = {
    'Authorization': localStorage.getItem('jwt')
    }
    return axios({
        method: 'post',
        url: BASEURL + '/placelist/listitems/items',
        headers: headerJWT,
        data: data
    })
}


const Mychelin = {
    addMychelinList,
    addMychelinRestaurant
}

export default Mychelin