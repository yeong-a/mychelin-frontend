export default {
    // search page 관련
    currentSearchPage: state => {
        return state.currentSearchPage
    },
    searchPageKeyword: (state) => {
        return state.searchPageKeyword
    },
    searchFeed: (state) => {
        return state.searchFeed
    },
    searchPlace: (state) => {
        return state.searchPlace
    },
    searchPlacelist: (state) => {
        return state.searchPlacelist
    },
    searchUser: (state) => {
        return state.searchUser
    },

    isUser: (state) => {
        return !(localStorage.getItem("jwt") === null);
    },
    mainPosts: (state) => {
        return state.mainPosts;
    },
    mainPostsFol: (state) => {
        return state.mainPostsFol;
    },
    searchKeyword: (state) => {
        return state.searchKeyword;
    },
    mainPlaces: (state) => {
        return state.mainRestaurants;
    },
    currentPage: (state) => {
        return state.currentPage;
    },
    placeData: (state) => {
        return state.placeData;
    },
    mainMychelin: (state) => {
        return state.mainMychelin;
    },
    placeReviewData: (state) => {
        return state.placeReviewData;
    },
    postCommentData: (state) => {
        return state.postCommentData;
    },
    placeRecommendData: (state) => {
        return state.placeRecommendData;
    },
    // Search page
    searchFeedLimit: state => {
      return state.searchFeedLimit
    },
    searchPlaceLimit: state => {
      return state.searchPlaceLimit
    },
    searchPlaceListLimit: state => {
      return state.searchPlaceListLimit
    }
}
