<template>
    <div>
        <ReturnNav inputTxt="프로필 사진 변경" />
        <div id="body-wrap">
            <input type="file" />
        </div>
        <button @click="registerImg">변경</button>
    </div>
</template>

<script>
import UserApi from "@/apis/UserApi";
import ReturnNav from "@/components/user/ReturnNav.vue";

export default {
    name: "EditProfileImageChange",
    components: {
        ReturnNav,
    },
    data() {
        return {
            img: "ss",
        };
    },
    methods: {
        registerImg: function () {
            UserApi.registerProfileImage().then({
                
            });
        },
    },
};
</script>

<style scoped>
#body-wrap {
    margin: 90px 20px 0;
}
</style>