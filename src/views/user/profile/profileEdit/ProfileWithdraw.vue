<template>
    <div>
        <BackNav navTitle="회원탈퇴" :routeBackTo="{ name: 'ProfileEdit' }" />
        <div id="body-wrap">
            <p id="pg-withdraw">정말 탈퇴하시겠습니까?</p>
            <button v-on:click="withdraw" id="button-confirm">탈퇴하기</button>
        </div>
    </div>
</template>

<script>
import UserApi from "@/apis/UserApi";
import BackNav from '@/components/navs/BackNav.vue'

export default {
    name: "UserProfileWithdraw",
    components: {
        BackNav,
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