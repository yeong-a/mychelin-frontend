import axios from 'axios'

const BASEURL = 'http://i5a206.p.ssafy.io:8080'  // 임시

const saveBookmarkPlaces = (placeId) => {
    const headerJWT = {
        'Authorization': localStorage.getItem('jwt')
    }
    return axios({
        method: 'put',
        url: BASEURL + '/bookmarks/places',
        headers: headerJWT,
        data: {
            'placeId': placeId
        }
    })
}

const requestBookmarkPlaces = () => {
    const headerJWT = {
        'Authorization': localStorage.getItem('jwt')
    }
    return axios({
        method: 'get',
        url: BASEURL + '/bookmarks/places',
        headers: headerJWT,
    })
}


const BookmarkApi = {
    saveBookmarkPlaces,
    requestBookmarkPlaces
}

export default BookmarkApi