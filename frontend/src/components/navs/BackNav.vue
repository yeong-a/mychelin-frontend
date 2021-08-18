<template>
    <div class="nav-wrap">
        <div class="nav-left">
            <div @click="routeBack" class="icon-wrap">
                <i class="fas fa-angle-left back-icon"></i>
            </div>
            {{ navTitle }}
        </div>
        <div>
            <!-- 오른쪽에 넣을 버튼이 있다면 추가 -->
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        navTitle: String,
        // router name과 params를 Object 형태로 전달
        // ex)
        // routeBackTo: {
        //     name: 'name',
        //     params: {
        //         param: param,
        //     },
        // },
        routeBackTo: {
            type: Object,
            required: false,
        },
    },
    methods: {
        routeBack() {
            if (this.routeBackTo)
                this.$router.push(this.routeBackTo)
            else
                this.$router.go(-1)
        }
    }
};
</script>

<style scoped>
.nav-wrap {
    position: fixed;
    top: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    font-size: 18px;
    font-weight: 500;
    background-color: #FFF;
    z-index:3;
}
.nav-left {
    display: flex;
    align-items: center;
}
.icon-wrap {
    display: flex;
    align-items: center;
}
.back-icon {
    margin: 0 12px 0 20px;
    font-size: 25px;
}
</style>