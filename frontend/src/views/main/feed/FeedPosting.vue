<template>
    <div class="container">
        <div class="post-header" style="text-align:right;">
            <BackNav :navTitle="isModifying ? '게시물 수정' : '새 게시물'" :routeBackTo="{ name: 'MainPage' }" />
            <button type="button" class="post-btn" v-if="!isModifying" v-on:click="posting">작성</button>
            <button type="button" class="post-btn" v-if="isModifying" v-on:click="modifyPost">수정</button>
        </div>

        <div class="post-body">
            <div style="display:flex;">
                <div v-for="inputImage in inputImages" v-bind:key="inputImage.id" class="post-imgfile" style="position:relative;">
                    <div v-if="inputImage.id <= 3">
                        <img id="added-pic" v-bind:src="inputImage.value" />
                        <button type="button" style="position:absolute; right:5px; top:5px; color:#FF742E; z-index:2; font-size:20px;" v-on:click="deleteImg(inputImage.id)">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div v-else-if="inputImage.id == 4" style="padding-top:50%; font-size:40px; color:#C4C4C4"><i class="fas fa-ellipsis-h" style=""></i></div>
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
            <!--<select class="post-select" v-model="selectedOption">
                <option value="option1" selected>전체공개</option>
                <option value="option2">팔로워에게만 공개</option>
                <option value="option3">비공개</option>
            </select>-->
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
            <div class="search-main d-flex">
                <input type="text" placeholder="검색" class="search-input-f"
                 @keyup.enter="searchplace(inputsearch)" v-bind:value="inputsearch" v-on:input="updatesearch" style="" />
                <span class="icon-orange" v-on:click="searchplace(inputsearch)"><i class="bi bi-search"></i></span>
            </div>
            <div v-for="restaurant in restaurants" v-bind:key="restaurant.id" style="border-bottom:solid 1px rgba(0,0,0,0.2); text-align:left; margin-top:3px">
                <div v-on:click="saveId(restaurant.id, restaurant.name)" style="font-weight:bold">{{ restaurant.name }}</div>
                <div style="color:#C4C4C4">{{ restaurant.location }}</div>
            </div>
            <!-- <div id="list-map2"></div> -->
            <div v-if="restaurants.length === 0" style="color:#C4C4C4">검색 결과가 없습니다</div>
        </SweetModal>

        <SweetModal ref="modal4">
            <div class="search-main d-flex">
                <input type="text" placeholder="검색" class="search-input-f"
                @keyup.enter="searchplacelist(inputsearch)" v-bind:value="inputsearch" v-on:input="updatesearch" style=""/>
                <span class="icon-orange" v-on:click="searchplacelist(inputsearch)"><i class="bi bi-search"></i></span>
            </div>
             
            <div v-for="mychelin in mychelins" v-bind:key="mychelin.id" style="border-bottom:solid 1px rgba(0,0,0,0.2); text-align:left; margin-top:3px">
                <div v-on:click="savelistId(mychelin.id, mychelin.title)" style="font-weight:bold">{{ mychelin.title }}</div>
                <div style="color:#C4C4C4">{{ mychelin.nickname }}</div>
            </div>
            <div v-if="mychelins.length === 0" style="color:#C4C4C4">검색 결과가 없습니다</div>
        </SweetModal>
    </div>
</template>

<script>
import BackNav from "@/components/navs/BackNav.vue";
import PostingApi from "@/apis/PostingApi.js"; // 게시글 작성
import { SweetModal } from "sweet-modal-vue";
import PostsApi from "@/apis/PostsApi.js";
import PlaceApi from "@/apis/PlaceApi.js";

import dotenv from "dotenv";

export default {
    components: {
        BackNav,
        SweetModal,
    },
    computed: {
        isModifying() {
            if (Object.keys(this.$route.params).length) return true;
            else return false;
        },
    },
    methods: {
        async posting() {
            let { inputContent, inputTag, selectedOption } = this;
            let inputImages = this.sendImages.map((x) => x.value);

            if (!inputContent) {
                window.swal("내용이 없어요");
                return;
            }

            const imageUrls = await this.convertToUrl(inputImages);
            let data = {
                content: inputContent,
                placeId: this.saveid,
                placeListId: this.savelistid,
                images: imageUrls,
            };

            try {
                await PostingApi.requestPosting(data);
                window.swal("", `글을 작성했습니다`, "success").then((result) => {
                    if (result) {
                        // this.$router.go();
                        window.location.reload();
                    }
                });
                this.$router.push({ name: "MainPage" });
            } catch (err) {
                console.log(err.response);
                window.swal(`에러: ${err.response.message}`);
            } finally {
                inputImages.map((x) => window.URL.revokeObjectURL(x));
            }
        },
        async convertToUrl(images) {
            let imageUrls = [];
            for (let i = 0; i < images.length; i++) {
                if (typeof images[i] != "string") {
                    const formData = new FormData();
                    formData.append("file", images[i]);
                    const res = await PostingApi.requestImageUrl(formData);
                    imageUrls.push(res.data.data.image);
                } else {
                    imageUrls.push(images[i]);
                }
            }
            return imageUrls;
        },
        updateContent: function(e) {
            let updatedContent = e.target.value;
            this.inputContent = updatedContent;
        },
        updateImage: function(e) {
            let getImage = e.target.files[0];
            e.target.value = "";

            let validateType = function(i) {
                return ["image/jpeg", "image/jpg", "image/png"].indexOf(i.type) > -1;
            };
            if (!getImage || !validateType(getImage)) {
                window.swal("지원하지 않는 형식입니다", "jpeg/jpg/png 확장자 파일만 올려주세요!", "error");
                return;
            }

            let imgSize = getImage.size;
            if (imgSize > 1024 * 1024 * 3) {
                window.swal("", "3MB 이하의 파일로 올려주세요!", "error");
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
            this.restaurants = [];
            this.mychelins = [];
            this.$refs.modal3.open();
        },
        addPlacelist() {
            this.restaurants = [];
            this.mychelins = [];
            this.$refs.modal4.open();
        },
        searchplace(keyword) {
            if (!keyword) return;
            PostsApi.requestRestaurants(keyword);
            setTimeout(this.waiting, 500);
        },
        searchplacelist(keyword) {
            if (!keyword) return;
            PostsApi.requestMychelin(keyword)
            setTimeout(this.waiting, 500);
        },
        updatesearch: function(e) {
            let updatedCon = e.target.value;
            this.inputsearch = updatedCon;
        },
        waiting() {
            this.restaurants = this.$store.getters.mainPlaces;
            this.mychelins = this.$store.getters.mainMychelin;
            this.inputsearch = "";
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
        async modifyPost() {
            if (!this.inputContent) {
                window.swal("작성 내용이 없습니다");
                return;
            }
            let images = this.sendImages.map((x) => x.value);
            const imageUrls = await this.convertToUrl(images);

            const modifyData = {
                content: this.inputContent,
                images: imageUrls,
                placeId: this.saveid,
                placelistId: this.savelistid,
            };
            PostsApi.requestPostModify(this.$route.params.id, modifyData)
                .then(() => {
                    this.$router.push({ name: "MainPage" });
                })
                .catch((err) => {
                    console.error(err);
                });
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
    mounted() {
        // parameter로 넘어온 id가 있다면(기존 글 수정이 목적이라면)
        if (this.isModifying) {
            PostsApi.requestPostDetail(this.$route.params.id).then((res) => {
                this.inputContent = res.data.data.content;
                for (var i = 0; i < res.data.data.images.length; i++) {
                    this.inputImages[i] = {
                        id: i,
                        value: res.data.data.images[i],
                    };
                    this.sendImages[i] = {
                        id: i,
                        value: res.data.data.images[i],
                    };
                }
                this.saveid = res.data.data.placeId;
                this.savelistid = res.data.data.placeListId;
                
                if (this.saveid) {
                    PlaceApi.requestPlaceSimple(this.saveid).then(res => {
                        this.savename = res.data.data.name
                    })
                }
                if (this.savelistid) {
                    PlaceApi.requestPlaceListSimple(this.savelistid).then(res => {
                        this.savelistname = res.data.data.title
                    })
                }
            });
        }
    },
};
</script>

<style>
* {
    font-family: "Spoqa Han Sans Neo", "sans-serif";
}
.post-content {
    width: 100%;
    font-weight: 500;
    font-size: 1.3em;
    margin-bottom: 3px;
    height: 55.94vh;
    word-wrap: break-word;
}

.post-content::placeholder {
    font-weight: 300;
    color: #c4c4c4;
    opacity: 1;
}
.post-body {
    z-index: -1;
    margin-top: 3em;
    margin-left: 2em;
    margin-right: 2em;
    /* padding-top: 14.49vw; */
}

.post-btn {
    position: relative;
    font-weight: bold;
    font-size: 1.5em;
    color: #ff742e;
    /* width: 11.35vw;
    height: 6.76vw;
    left: 82.37vw;
    top: 4.59vw; */
    margin-top: 0.5em;
    margin-right: 0.5em;
    z-index: 7;
}


.add-tag {
    width: 80%;
    margin-left: 10%;
    color: orange;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
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
    height: 14.49vh;
    width: 100%;
    text-align: right;
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
}

.post-picture #chooseFile {
    display: none;
}
.post-picture-icon {
    font-size: 2.3em;
    color: #ff742e;
}

.post-map {
    font-size: 2em;
    color: #ff742e;
    margin-right: 4.83vw;
    margin-bottom: 1px;
}
.post-maplist {
    font-size: 2em;
    color: #ff742e;
    margin-right: 4.83vw;
    margin-bottom: 1px;
}
.post-imgfile {
    margin-left: 5vw;
}
.post-header {
    /* width: 100vw; */
    background-color: white;
    z-index: 1;
    /* position: fixed; */
}

#added-pic {
    width: 21.74vw;
    height: 21.74vw;
    border-radius: 4.83vw;
}
#list-map2 {
    width: 100%;
    max-width: 420px;
    /*margin-left: 9%;*/
    height: 200px;
    margin-bottom: 15px;
    max-height: 420px;
    background-color: white;
}

@media screen and (min-width: 500px) {
    
}
</style>

<style scoped>

.search-main {
    position:relative;
    margin-bottom: 1em;
    padding: 0.1em 0.7em 0.1em;
    width:60%;
    height: 2.7em;
    background: #ffffff;
    border: 0.08em solid #ff993c;
    box-sizing: border-box;
    border-radius: 1.5em;
    left: 50%;
    transform: translateX(-50%);
}

.search-input-f {
    height:100%;
    width:100%; 
    border:0;
    padding-left:0
}
.icon-orange {
    position:absolute; 
    right:9px;
    bottom:7px;
    color:#ff993c;
    font-size:1.5em;
}
</style>