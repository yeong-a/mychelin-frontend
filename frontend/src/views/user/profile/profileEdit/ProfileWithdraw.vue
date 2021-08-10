<template>
    <div>
        <ReturnNav inputTxt="회원탈퇴" />
        <div id="body-wrap">
            <p id="pg-withdraw">정말 탈퇴하시겠습니까?</p>
            <button v-on:click="withdraw" id="button-confirm">탈퇴하기</button>
        </div>
    </div>
</template>

<script>
import UserApi from "@/apis/UserApi";
import ReturnNav from "@/components/user/ReturnNav.vue";

export default {
    name: "UserProfileWithdraw",
    components: {
        ReturnNav,
    },
    methods: {
        withdraw: function () {
            UserApi.requestUserWithdraw().then(() => {
                localStorage.removeItem("jwt");
                localStorage.removeItem("nickname");
                this.$router.push({ name: "HomePage" });
            });
        },
    },
};
</script>

<style scoped>
#body-wrap {
    margin: 90px 20px 0;
    font-size: 18px;
}

#pg-withdraw {
    text-align: center;
}

#button-confirm {
    width: 110px;
    height: 40px;
    display: block;
    margin: 30px auto auto;
    border-radius: 8px;
    background-color: #ff993c;
}
</style>