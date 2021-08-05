import store from './store'
export default {
    LOG_IN_STATE() {
        store.state.isUser = true
    },
    LOG_OUT_STATE() {
        store.state.isUser = false
    },
    SWAP_PAGE(state, page) {
        store.state.currentPage = page
    },
    FILL_MAIN_POSTS(state, posts) {
        store.state.mainPosts = posts
    },
    FILL_MAIN_RESTAURANTS(state, restaurants) {
        store.state.mainRestaurants = restaurants
    },
    FILL_MAIN_MYCHELIN(state, mychelin) {
        store.state.mainMychelin = mychelin
    },
    GET_SEARCH_KEYWORD(state, keyword){
        store.state.searchKeyword = keyword
    },
    GET_PLACE_DATA(state, keyword){
        store.state.placeData = keyword
    },
    GET_PLACE_REVIEW_DATA(state, keyword){
        store.state.placeReviewData = keyword
    },
    GET_POST_COMMENT_DATA(state, keyword){
        store.state.postCommentData = keyword
    },
}