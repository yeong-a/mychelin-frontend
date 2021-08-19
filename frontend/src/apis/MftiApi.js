import axios from "axios";
import mftiQ from "../assets/mfti.json";

const BASEURL = "http://i5a206.p.ssafy.io:8080";
const getMFTI = () => {
    const headerJWT = {
        Authorization: localStorage.getItem("jwt"),
    };
    return axios({
        method: "get",
        url: BASEURL + "/preference",
        headers: headerJWT,
    });
};

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
};

const MftiApi = {
    getMFTI,
    postMfti,
};

export default MftiApi;
