import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";

Vue.use(Vuex);

const state = {
    isUser: false,
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
};

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions,
});
