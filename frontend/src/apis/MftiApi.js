import axios from "axios";
import mftiQ from '../assets/mfti.json'

const BASEURL = "http://i5a206.p.ssafy.io:8080"; // 임시

const getMFTI = () => {
    return mftiQ
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
    getMFTI,
    getMftiResult,
}

export default MftiApi