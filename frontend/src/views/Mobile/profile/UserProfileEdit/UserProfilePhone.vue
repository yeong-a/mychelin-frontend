<template>
    <div>
        <ReturnNav inputTxt="전화번호 변경" />
        <div id="body-wrap">
            <label>변경 전화번호</label>
            <div class="d-flex justify-content-between">
                <div>
                    <input
                        type="tel"
                        v-model="phoneInfo.phoneNumber"
                        id="input-phone"
                    />
                    <button id="phone-confirm-button">인증</button>
                </div>
            </div>
            <button
                v-on:click="changePhone"
                class="font-eighteen"
                id="button-confirm"
            >
                수정하기
            </button>
        </div>
    </div>
</template>

<script>
import ReturnNav from "@/components/user/ReturnNav.vue"

export default {
    name: "EditProfilePhone",
    components: {
        ReturnNav,
    },
    data() {
        return {
            phoneInfo: {
                phoneNumber: "",
            },
        };
    },
    methods: {
        changePhone: function () {
            this.$router.push({ name: "EditProfileMInfo" });
        },
    },
};
</script>

<style scoped>
#body-wrap {
    margin: 90px 20px 0;
    font-size: 16px;
}

label {
    font-size: 20px;
}

#input-phone {
    border-style: none none solid none;
    border-color: #ff993c;
    width: 240px;
    height: 30px;
}

#phone-confirm-button {
    width: 45px;
    height: 30px;
    border-radius: 12px;
    background-color: #ff993c;
    margin: 0 0 0 10px;
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