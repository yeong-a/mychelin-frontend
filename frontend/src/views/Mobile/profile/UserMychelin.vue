<template>
    <div>
        <div class="row shadow p-3 mb-3 select-box" v-for="my in mychelin" :key="my.id">
            <div v-on:click="clickMychelinDetail(my.id)">{{ my.title }}</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        mychelin: Array
    },
    
}
</script>

<style scoped>
.select-box {
    /* height: 8vh; */
    border-radius: 2em;
    background-color: #facfa4;
    opacity: 0.9;
    color: #333;
    font-weight: 700;
}
</style>