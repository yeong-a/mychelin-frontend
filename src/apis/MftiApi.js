import axios from "axios";
import mftiQ from "../assets/mfti.json";

const BASEURL = "http://localhost:8080";

const getMFTIQ = () => {
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
    postMfti,
    getMftiResult,
}

export default MftiApi;
