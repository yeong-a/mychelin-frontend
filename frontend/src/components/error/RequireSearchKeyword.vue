<template>
    <div class="main-contents">
        <div class="d-flex flex-column text-center">
            <div v-if="isloading">
                <img class="img-empty" src="@/assets/images/asdasd.jpg" alt="" />
            </div>
            <div v-else>
                <img class="img-empty" src="@/assets/images/cat.jpg" alt="" />
                <p class="big-font">검색어를 입력해 주세요!</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        data: String,
    },
    computed: {
        isloading() {
            return this.$store.state.loading;
        },
    },
};
</script>

<style scoped>
.img-empty {
    width: 150px;
    height: 150px;
    border-radius: 10em;
}

.big-font {
    font-size: 1.2em;
}
</style>
