<template>
    <div>
        <div class="post-header" style="width:100vw; background-color:white; z-index:1; position:fixed">
            <ReturnNav inputTxt="새 게시물" />
            <button type="button" class="post-btn" v-on:click="posting">작성</button>
        </div>

        <div class="post-body" style="z-index:-1; padding-top:14.49vw;">
            <div style="display:flex;">
                <div v-for="inputImage in inputImages" v-bind:key="inputImage.id" class="post-imgfile" style="position:relative;">
                    <div v-if="inputImage.id <= 3">
                        <img id="added-pic" v-bind:src="inputImage.value" style="width: 21.74vw; height: 21.74vw; border-radius: 4.83vw;" />
                        <button type="button" style="position:absolute; right:5px; top:5px; color:#FF742E; z-index:2; font-size:4.83vw;" v-on:click="deleteImg(inputImage.id)">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div v-else-if="inputImage.id == 4" style="padding-top:50%; font-size:10vw; color:#C4C4C4"><i class="fas fa-ellipsis-h" style=""></i></div>
                </div>
            </div>
            <textarea name="" placeholder="내용을 입력하세요" class="post-content" v-bind:value="inputContent" v-on:input="updateContent"></textarea>
        </div>

        <div class="add-tag">
            <div v-if="savename">
                #{{ savename
                }}<button
                    type="button"
                    style="color:#C4C4C4"
                    v-on:click="
                        savename = '';
                        saveid = null;
                    "
                >
                    &nbsp;x
                </button>
            </div>
            <div v-if="savelistname">
                #{{ savelistname
                }}<button
                    type="button"
                    style="color:#C4C4C4"
                    v-on:click="
                        savelistname = '';
                        savelistid = null;
                    "
                >
                    &nbsp;x
                </button>
            </div>
        </div>

        <div class="post-underbar">
            <select class="post-select" v-model="selectedOption">
                <option value="option1" selected>전체공개</option>
                <option value="option2">팔로워에게만 공개</option>
                <option value="option3">비공개</option>
            </select>
            <div class="post-add">
                <form class="post-picture" enctype="multipart/form-data">
                    <label for="chooseFile"> <i class="far fa-image post-picture-icon"></i></label>
                    <input id="chooseFile" type="file" accept="image/*" v-on:change="updateImage" />
                </form>
                <div class="post-map" v-on:click="addPlace"><i class="fas fa-map-marker-alt"></i></div>
                <div class="post-maplist" v-on:click="addPlacelist"><i class="fas fa-map"></i></div>
            </div>
        </div>

        <SweetModal ref="modal3">
            <input type="text" placeholder="검색" @keyup.enter="searchplace(inputsearch)" v-bind:value="inputsearch" v-on:input="updatesearch" style="margin-bottom:10px" />
            <div v-for="restaurant in restaurants" v-bind:key="restaurant.id" style="border-bottom:solid 1px rgba(0,0,0,0.2); text-align:left; margin-top:3px">
                <div v-on:click="saveId(restaurant.id, restaurant.name)" style="font-weight:bold">{{ restaurant.name }}</div>
                <div style="color:#C4C4C4">{{ restaurant.location }}</div>
            </div>
        </SweetModal>

        <SweetModal ref="modal4">
            <input type="text" placeholder="검색" @keyup.enter="searchplacelist(inputsearch)" v-bind:value="inputsearch" v-on:input="updatesearch" style="margin-bottom:10px" />
            <div v-for="mychelin in mychelins" v-bind:key="mychelin.id" style="border-bottom:solid 1px rgba(0,0,0,0.2); text-align:left; margin-top:3px">
                <div v-on:click="savelistId(mychelin.id, mychelin.title)" style="font-weight:bold">{{ mychelin.title }}</div>
                <div style="color:#C4C4C4">{{ mychelin.nickname }}</div>
            </div>
        </SweetModal>
    </div>
</template>

<script>
import ReturnNav from "@/components/user/ReturnNav.vue";
import PostingApi from "@/apis/PostingApi.js"; // 게시글 작성
import { SweetModal } from "sweet-modal-vue";
import PostsApi from "@/apis/PostsApi.js";

export default {
    components: {
        ReturnNav,
        SweetModal,
    },
    methods: {
        async posting() {
            let { inputContent, inputTag, selectedOption } = this;
            let inputImages = this.sendImages.map((x) => x.value);

            if (!inputContent) {
                window.swal("내용이 없어요");
                return;
            }

            let size = inputImages.length;
            let inputImageUrl = [];
            if (size) {
                for (let i = 0; i < size; i++) {
                    const formData = new FormData();
                    formData.append("file", inputImages[i]);
                    const resp = await PostingApi.requestImageUrl(formData);
                    //console.log(resp.data);
                    inputImageUrl.push(String(resp.data.data.image));
                }
            }
            let data = {
                content: inputContent,
                placeId: this.saveid,
                placeListId: this.savelistid,
                images: inputImageUrl,
            };
            try {
                await PostingApi.requestPosting(data);
                window.swal("", `글을 작성했습니다`, "success");
                this.$router.push({ name: "MainPage" });
            } catch (err) {
                console.log(err.response);
                window.swal(`에러: ${err.response.message}`);
            } finally {
                inputImages.map((x) => window.URL.revokeObjectURL(x));
            }
        },
        updateContent: function(e) {
            let updatedContent = e.target.value;
            this.inputContent = updatedContent;
        },
        updateImage: function(e) {
            let getImage = e.target.files[0];
            e.target.value = "";
            //console.log(getImage);
            let validateType = function(i) {
                return ["image/jpeg", "image/jpg", "image/png"].indexOf(i.type) > -1;
            };
            if (!getImage || !validateType(getImage)) {
                window.swal("지원하지 않는 형식입니다", "jpeg/jpg/png 확장자 파일만 올려주세요!", "error");
                return;
            }

            let imgSize = getImage.size;
            if (imgSize > 1024 * 1024 * 10) {
                window.swal("", "10MB 이하의 파일로 올려주세요!", "error");
                return;
            }
            let updatedImage = getImage;
            updatedImage = window.URL.createObjectURL(updatedImage);
            this.inputImages.push({ id: this.inputImages.length + 1, value: updatedImage });
            this.sendImages.push({ id: this.sendImages.length + 1, value: getImage });
        },
        deleteImg: function(key) {
            let idx = this.inputImages.findIndex(function(item) {
                return item.id == key;
            });
            for (let i = idx, n = this.inputImages.length; i < n - 1; i++) {
                this.inputImages[i].value = this.inputImages[i + 1].value;
                this.sendImages[i].value = this.sendImages[i + 1].value;
            }
            this.inputImages.pop();
            this.sendImages.pop();
        },
        addPlace() {
            this.$refs.modal3.open();
        },
        addPlacelist() {
            this.$refs.modal4.open();
        },
        searchplace(keyword) {
            if (!keyword) return;
            PostsApi.requestRestaurants(keyword);
            setTimeout(this.waiting, 500);
        },
        searchplacelist(keyword) {
            if (!keyword) return;
            PostsApi.requestMychelin(keyword);
            setTimeout(this.waiting, 500);
        },
        updatesearch: function(e) {
            let updatedCon = e.target.value;
            this.inputsearch = updatedCon;
        },
        waiting() {
            this.restaurants = this.$store.getters.mainPlaces;
            this.mychelins = this.$store.getters.mainMychelin;
        },
        saveId(id, name) {
            this.saveid = id;
            this.savename = name;
            this.$refs.modal3.close();
        },
        savelistId(id, name) {
            this.savelistid = id;
            this.savelistname = name;
            this.$refs.modal4.close();
        },
    },
    data: () => {
        return {
            inputContent: "",
            inputImages: [],
            sendImages: [],
            inputTag: [],
            selectedOption: "option1",
            inputsearch: "",
            restaurants: [],
            mychelins: [],
            saveid: null,
            savename: "",
            savelistid: null,
            savelistname: "",
        };
    },
};
</script>

<style>
* {
    font-family: "Spoqa Han Sans Neo", "sans-serif";
}
.post-title::placeholder,
.post-content::placeholder {
    font-weight: 300;
    font-size: 4.83vw;
    line-height: 4.83vw;
    color: #c4c4c4;
    opacity: 1;
}
.post-btn {
    position: absolute;
    font-weight: bold;
    font-size: 4.83vw;
    color: #ff742e;
    width: 11.35vw;
    height: 6.76vw;
    left: 82.37vw;
    top: 4.59vw;
    z-index: 9;
}
.post-title {
    width: 90%;
    margin-left: 5%;
    height: 14.49vw;
    border: none;
    border-bottom: 1px solid #c4c4c4;
}
.post-content {
    margin-top: 4.59vw;
    width: 80%;
    margin-left: 10%;
    margin-bottom: 3px;
    height: 55.94vw;
    word-wrap: break-word;
}
.add-tag {
    width: 80%;
    margin-left: 10%;
    color: orange;
    display: flex;
    justify-content: space-between;
    /*height: 10px;*/
}
.post-underbar {
    width: 90%;
    margin-left: 5%;
    height: 14.49vw;
    border-top: 1px solid #c4c4c4;
    display: flex;
}
select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}
.select::-ms-expand {
    display: none;
}

.post-select {
    border: none;
    font-size: 4.83vw;
    line-height: 4.83vw;
    font-weight: 300;
    padding-left: 5vw;
    background-color: white;
}
.post-add {
    height: 14.49vw;
    width: 100%;
    text-align: right;
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
}
.post-picture {
}
.post-picture #chooseFile {
    display: none;
}
.post-picture-icon {
    font-size: 8vw;
    color: #ff742e;
}

.post-map {
    font-size: 6.5vw;
    color: #ff742e;
    margin-right: 4.83vw;
    margin-bottom: 1px;
}
.post-maplist {
    font-size: 6.5vw;
    color: #ff742e;
    margin-right: 4.83vw;
    margin-bottom: 1px;
}
.post-imgfile {
    margin-left: 5vw;
}
</style>
