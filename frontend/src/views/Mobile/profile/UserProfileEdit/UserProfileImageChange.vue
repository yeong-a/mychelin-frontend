l<template>
    <div>
        <ReturnNav inputTxt="프로필 사진 변경" />
        <div id="body-wrap" class="d-flex flex-column align-items-center">
            <img :src="image" alt="" class="profile-img" />
            <label for="img-input">
                <button class="img-button">파일 선택</button>
            </label>
            <input type="file" accept="image/*" @change="convertImage" id="img-input" />
        </div>
        <button @click="registerImg" class="img-button" id="register-button">등록</button>
    </div>
</template>

<script>
import PostingApi from "@/apis/PostingApi";
import UserApi from "@/apis/UserApi";
import ReturnNav from "@/components/user/ReturnNav.vue";

export default {
    name: "EditProfileImageChange",
    components: {
        ReturnNav,
    },
    data() {
        return {
            image: null,
            imageTypeValid: true,
            imageSizeValid: true,
        };
    },
    methods: {
        convertImage: function (event) {
            let image = event.target.files[0];
            if (!this.validateImg(image)) {
                return;
            }
            let formData = new FormData();
            formData.append("file", image);
            PostingApi.requestImageUrl(formData).then((res) => {
                this.image = res.data.data.image;
            });
        },
        validateImg: function (image) {
            if (["image/jpeg", "image/jpg", "image/png"].includes(image.type)) {
                this.imageTypeValid = true;
            } else {
                this.imageTypeValid = false;
                return false;
            }
            if (image.size > 1024 * 1024 * 10) {
                this.imageSizeValid = false;
                return false;
            }
            this.imageSizeValid = true;
            return true;
        },
        registerImg: function () {
            PostingApi.requestImageUrl();
            UserApi.registerProfileImage(this.image).then(
                this.$router.push({ name: "EditProfileM" })
            );
        },
    },
    created() {
        UserApi.requestProfile(localStorage.getItem('nickname')).then(res => {
            this.image = res.data.profileImage
        })
    }
};
</script>

<style scoped>
#body-wrap {
    margin: 90px 20px 0;
}

#img-input {
    visibility: hidden;
}

.profile-img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
}

.img-button {
    background-color: #ff993c;
    border-radius: 5px;
    font-size: 18px;
    padding: 5px 10px;
}

#register-button {
    width: 150px;
    display: block;
    margin: auto;
}
</style>