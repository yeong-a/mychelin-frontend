import axios from "axios";
import mftiQ from "../assets/mfti.json";

const BASEURL = "http://i5a206.p.ssafy.io:8080";

const getMFTIQ = () => {
    return mftiQ
}

const getMFTI = () => {
    return mftiQ
}

const postMfti = (data) => {
    const headerJWT = {
        Authorization: localStorage.getItem("jwt"),
    };
    return axios({
        method: "post",
        url: BASEURL + "/preference",
        headers: headerJWT,
        data: data,
    });
}

const getMftiResult = () => {
    const headerJWT = {
        Authorization: localStorage.getItem("jwt"),
    };
    return axios({
        method: "get",
        url: BASEURL + "/preference",
        headers: headerJWT,
    })
}

const MftiApi = {
    getMFTIQ,
    getMFTI,
    postMfti,
    getMftiResult,
}

export default MftiApi;
