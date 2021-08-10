import store from "./store";
export default {
    SWAP_PAGE(state, page) {
        store.state.currentPage = page;
    },
    FILL_MAIN_POSTS(state, posts) {
        store.state.mainPosts = posts;
    },
    FILL_MAIN_POSTS_IL(state, posts) {
        for (let i = 0, size = posts.length; i < size; i++) {
            store.state.mainPosts.push(posts[i]);
        }
    },
    FILL_MAIN_POSTSFOL(state, posts) {
        store.state.mainPostsFol = posts;
    },
    FILL_MAIN_POSTSFOL_IL(state, posts) {
        for (let i = 0, size = posts.length; i < size; i++) {
            store.state.mainPostsFol.push(posts[i]);
        }
    },
    FILL_MAIN_RESTAURANTS(state, restaurants) {
        store.state.mainRestaurants = restaurants;
    },
    FILL_MAIN_RESTAURANTS_IL(state, restaurants) {
        for (let i = 0, size = restaurants.length; i < size; i++) {
            store.state.mainRestaurants.push(restaurants[i]);
        }
    },
    FILL_MAIN_MYCHELIN(state, mychelin) {
        store.state.mainMychelin = mychelin;
    },
    GET_SEARCH_KEYWORD(state, keyword) {
        store.state.searchKeyword = keyword;
    },
    GET_PLACE_DATA(state, keyword) {
        store.state.placeData = keyword;
    },
    GET_PLACE_REVIEW_DATA(state, keyword) {
        store.state.placeReviewData = keyword;
    },
    GET_PLACE_REVIEW_DATA_IL(state, keyword) {
        for (let i = 0, size = keyword.length; i < size; i++) {
            store.state.placeReviewData.push(keyword[i]);
        }
    },
    GET_POST_COMMENT_DATA(state, keyword) {
        store.state.postCommentData = keyword;
    },
};
