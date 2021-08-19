import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";

Vue.use(Vuex);

const state = {
    // search page 관련
    currentSearchPage: 0,
    searchPageKeyword: '',
    searchFeed: [],
    searchPlace: [],
    searchPlacelist: [],
    searchUser: [],

    currentPage: 0,
    mainPosts: [],
    mainPostsFol: [],
    mainRestaurants: [],
    mainMychelin: [],
    searchKeyword: "",
    placeData: {},
    placeReviewData: [],
    postCommentData: [],
    infinite: 2,
    infinitefeed: 2,
    infinitefeedfol: 2,
    placelimit: 2,
    feedlimit: 2,
    feedlimitfol: 2,
    loading: false,
    placeRecommendData: [],
    placelistRecommendData: [],
    // Search페이지 Infinite 관련
    searchFeedLimit: 2,
    searchPlaceLimit: 2,
    searchPlaceListLimit: 2,
};

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions,
});
