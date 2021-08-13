<template>
    <div>
        <div class="d-flex flex-column text-center">
            <div v-if="isloading">
                <img class="img-empty" src="@/assets/images/asdasd.jpg" alt="" />
            </div>
            <div v-else>
                <img class="img-empty" src="@/assets/images/cat.jpg" alt="" />
                <p class="big-font">앗... 표시할 {{ data }}이(가) 없습니다...</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Child",
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
    width: 20vh;
    height: 20vh;
    border-radius: 10em;
}

.big-font {
    font-size: 1.2em;
}
</style>
