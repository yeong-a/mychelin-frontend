<template>
    <div>
        <div id="img-wrap">
            <img :src="profileImg" id="profile-img">
            <router-link :to="{ name: 'EditProfileMImage' }">
                <button
                    id="button-edit"
                >
                    <i class="far fa-edit" id="icon-edit" />
                </button>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'UserProfileImage',
    props: {
        profileImg: String
    },
};
</script>

<style scoped>
#img-wrap {
    margin: auto;
    position: relative;
}
#profile-img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
}

#button-edit {
    position: absolute;
    right: 0;
    bottom: 0;;
    background: orange;
    width: 50px;
    height: 50px;
    border-radius: 50%;
}

#icon-edit {
    font-weight: 1;
    font-size: 240%;
    padding: 0 0 1px 5px;
}
</style>