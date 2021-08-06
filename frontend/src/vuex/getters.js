export default {
    isUser: state => {
      return !(localStorage.getItem('jwt') === null)
    },
    mainPosts: state => {
        return state.mainPosts
    },
    mainPostsFol: state => {
        return state.mainPostsFol
    },
    searchKeyword: state => {
      return state.searchKeyword
    },
    mainPlaces: state => {
      return state.mainRestaurants
    },
    currentPage: state => {
      return state.currentPage
    },
    placeData: state =>{
      return state.placeData
    },
    mainMychelin: state => {
      return state.mainMychelin
    },
    placeReviewData: state =>{
      return state.placeReviewData
    },
    postCommentData: state =>{
      return state.postCommentData
    },
}