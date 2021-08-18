import axios from "axios";
import mftiQ from '../assets/mfti.json'

const BASEURL = "http://i5a206.p.ssafy.io:8080";
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
        data: data
    });
}


const MftiApi = {
    getMFTI,
    postMfti
}

export default MftiApi