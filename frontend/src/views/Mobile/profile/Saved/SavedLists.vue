<template>
    <div>
        <ReturnNav inputTxt="저장한 맛집 리스트" />
        <div class="nav-gap"></div>
        <div v-for="(place, id) in places" v-bind:key="id">
            <div class="d-flex">
                <router-link :to="{ name: 'Place', params: { id: 73 } }" class="d-flex align-items-center router-link">
                    <h2>{{ place.name }}</h2>
                </router-link>
                <button v-on:click="deleteSaved" class="delete-btn">
                    <i class="fas fa-minus-circle"></i>
                </button>
            </div>
            <hr>
        </div>
    </div>
</template>

<script>
import ReturnNav from '@/components/user/ReturnNav.vue'

export default {
    name: 'SavedLists',
    components: {
        ReturnNav
    },
    data() {
        return {
            places: [
                {
                    name: '맛집 리스트 이름'
                },
                {
                    name: '맛집 리스트 이름'
                },
                {
                    name: '맛집 리스트 이름'
                },
                {
                    name: '맛집 리스트 이름'
                },
            ]
        }
    },
    methods: {
        deleteSaved: function () {
            return
        }
    }
}
</script>

<style scoped>
.nav-gap {
    margin: 60px;
}

.router-link {
    color: black;
    width: 90%;
}

.place-img {
    width: 80px;
}

.delete-btn {
    font-size: 25px;
    color: #ff993c;
}

hr {
    color: #ff993c;
    height: 2px;
}
</style>