import axios from 'axios'

const BASEURL = 'http://i5a206.p.ssafy.io:8080'  // 임시

const bookmarkPlaces = (placeId) => {
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
    return axios({
        method: 'get',
        url: BASEURL + '/bookmarks/places',
        headers: {
            'Authorization': localStorage.getItem('jwt'),
        }
    })
}

const bookmarkLists = (listId) => {
    const headerJWT = {
        'Authorization': localStorage.getItem('jwt')
    }
    return axios({
        method: 'put',
        url: BASEURL + '/bookmarks/lists',
        headers: headerJWT,
        data: {
            'placeListId': listId
        }
    })
}

const requestBookmarkLists = () => {
    return axios({
        method: 'get',
        url: BASEURL + '/bookmarks/lists',
        headers: {
            'Authorization': localStorage.getItem('jwt'),
        }
    })
}


const BookmarkApi = {
    bookmarkPlaces,
    requestBookmarkPlaces,
    bookmarkLists,
    requestBookmarkLists
}

export default BookmarkApi