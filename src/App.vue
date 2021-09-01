<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script>
import "@/assets/css/components.scss";
import "@/assets/css/style.scss";
import "@/assets/css/user.scss";
export default {
    name: "app",
    created() {
        // document.title = 'MYCHÉLIN'
    }
};
</script>
<style scoped></style>
