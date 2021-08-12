<template>
    <div >
        <!-- <MainNavbar/> -->
        <div class="main-contents">
            <EmptyContent data="결과"/>
        </div>
        
    </div>
</template>

<script>
// import MainNavbar from '@/components/bars/MainNavbar2'
import EmptyContent from '@/components/error/EmptyContent'
export default {
    data() {
        return {
            result: {}
        }
    },
    created() {
        let result = this.$route.params.mftiResult;
        for (let key in result) {
            this.result[key] = result[key]['totalScore'] / result[key]['topicCount']
        }
        console.log(this.result)
    },
    components: {
        // MainNavbar,
        EmptyContent
    }
}
</script>

<style>

</style>