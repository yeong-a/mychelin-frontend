import axios from "axios";
import store from "../vuex/store";

const BASEURL = "http://localhost:8080"; // 임시
const requestChattingList = () => {
    return [
        {
            title: "입맛은 흥선대원군",
            sub: "한정식 지가 똑똑히 먹어봤구면유,,",
            img: "https://myimagebuckets5.s3.ap-northeast-2.amazonaws.com/1628498576323omE92HbXMX.jpg",
            tag: ["+종로", "+전통"],
            people: 7,
        },
        {
            title: "종로 티라노 공원",
            sub: "극한의 매운맛을 즐기는 티라노 환영",
            img: "https://myimagebuckets5.s3.ap-northeast-2.amazonaws.com/1628498576323omE92HbXMX.jpg",
            tag: ["+종로", "+캡사이신", "+매운음식"],
            people: 13,
        },
        {
            title: "종로구 민트초코 사랑단",
            sub: "민트초코의 매력은 민트 80 초코 20에서...",
            img: "https://myimagebuckets5.s3.ap-northeast-2.amazonaws.com/1628498576323omE92HbXMX.jpg",
            tag: ["+종로", "+카페", "+한정식"],
            people: 13,
        },
        {
            title: "최고의 젤라또를 찾아서",
            sub: "최고의 젤라또 맛집을 찾아 진지하게 ,,,",
            img: "https://myimagebuckets5.s3.ap-northeast-2.amazonaws.com/1628498576323omE92HbXMX.jpg",
            tag: ["+종로", "+젤라또", "+쌀 젤라또"],
            people: 3,
        },
        {
            title: "고수는 고수를 가리지 않는다.",
            sub: "고수가 왜 비누맛인지 이해 못하는 방",
            img: "https://myimagebuckets5.s3.ap-northeast-2.amazonaws.com/1628498576323omE92HbXMX.jpg",
            tag: ["+종로", "+고수"],
            people: 7,
        },
    ];
};

const ChattingApi = {
    requestChattingList,
};

export default ChattingApi;
