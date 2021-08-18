<template>
    <div class="main-contents">
        <div v-if="isEmpty">
            <EmptySearchContent :data="searchKeyword" />
        </div>
        <div class="border-top border-bottom py-2 px-2" v-for="user in users" v-bind:key="user.id">
            <div class="d-flex" v-on:click="clickProfile(user.nickname)">
                <div class="mx-2">
                    <img class="img-user" :src="user.profileImage" onerror="restmb_idxmake.jpg" />
                </div>
                <div class="ms-2">
                    <p class="user-nickname">{{ user.nickname}}</p>
                    <p class="user-bio">{{ user.bio }}</p>
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
    methods: {
        clickProfile(nickname) {
            this.$router.push({ name: "ProfilePage", params: { nickname: nickname } });
        },
    },
    computed: {
        searchKeyword() {
            return this.$store.getters.searchPageKeyword;
        },
        isEmpty() {
            return this.users.length === 0;
        },
        users() {
            return this.$store.getters.searchUser;
        }
    }
}
</script>

<style scoped>
.img-user {
    position: relative;
    width: 3.8em;
    height: 3.8em;
    border-radius: 5em;
}

.user-nickname {
    font-family: Spoqa Han Sans Neo;
    font-style: normal;
    font-weight: 500;
    font-size: 1.2em;
    color: #000000;
}

.user-bio {
    color: rgba(0, 0, 0, 0.4);
}
</style>