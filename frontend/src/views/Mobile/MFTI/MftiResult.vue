<template>
    <div >
        <MainNavbar/>
        <div class="main-contents">
            <EmptyContent data="결과"/>
        </div>
        
    </div>
</template>

<script>
import MainNavbar from '@/components/bars/MainNavbar2'
import EmptyContent from '@/components/error/EmptyContent'
export default {
    components: {
        MainNavbar,
        EmptyContent
    }
}
</script>

<style>

</style>