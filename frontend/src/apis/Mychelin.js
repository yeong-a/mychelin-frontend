import axios from 'axios'

const BASEURL = 'http://i5a206.p.ssafy.io:8080'  // 임시

const addMychelinList = (data)=>{
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
    console.log(data)
    // axios({
    //     method: 'post',
    //     url: BASEURL + '/placelist/listitems/items',
    //     headers: headerJWT,
    //     data: data
    // }).then((res) => {
    //     console.log(res)
    // })
}


const Mychelin = {
    addMychelinList,
    addMychelinRestaurant
}

export default Mychelin