<template>
    <div>
        <div class="d-flex">
            <div v-for="i in filledCount" :key="i.id"><div class="dot-filled"></div></div>
            <div v-for="i in notFilledCount" :key="i.id"><div class="dot-empty"></div></div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        filledCount: Number,
        allCount: Number
    },
    computed: {
        notFilledCount() {
            return this.allCount - this.filledCount
        }
    }
}
</script>

<style scoped>
.dot-filled {
    /* position: relative; */
    width: 10px;
    height: 10px;
    top: 1em;
    margin-right: 0.2em;
    border-radius: 100%;
    /* Dark Yellow Green */

    background: #475A19;
}

.dot-empty {
    /* position: relative; */
    width: 10px;
    height: 10px;
    top: 1em;
    margin-right: 0.2em;
    border-radius: 100%;
    /* Gray 6 */

    background: #F2F2F2;
}
</style>