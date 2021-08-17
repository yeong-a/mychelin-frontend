<template>
    <div class="main-contents">
        <div v-if="isEmpty">
            <EmptySearchContent :data="searchKeyword" />
        </div>
        <div class="border py-2 px-2 my-2" v-for="user in users" v-bind:key="user.id">
            <div class="d-flex" v-on:click="clickProfile(user.nickname)">
                <div class="mx-2">
                    <img class="img-user" :src="user.profileImage" onerror="restmb_idxmake.jpg" />
                </div>
                <div class="ms-2">
                    <p class="user-nickname">{{ user.nickname}}</p>
                    <p>{{ user.bio }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import EmptySearchContent from '@/components/error/EmptySearchContent'
export default {
    components: {
        EmptySearchContent
    },
    props: {
        users: Array,
        searchKeyword: String,
    },
    methods: {
        clickProfile(nickname) {
            this.$router.push({ name: "ProfilePage", params: { nickname: nickname } });
        },
    },
    computed: {
        isEmpty() {
            return this.users.length === 0;
        },
    }
}
</script>

<style scoped>
.img-user {
    position: relative;
    width: 7vh;
    height: 7vh;
    border-radius: 5em;
}

.user-nickname {
    font-family: Spoqa Han Sans Neo;
    font-style: normal;
    font-weight: normal;
    font-size: 1.3em;
    color: #000000;
}
</style>