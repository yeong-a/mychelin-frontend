<template>
    <div>
        <div id="img-wrap">
            <img :src="profileImg" id="profile-img">
            <button
                id="button-edit"
            >
                <i class="far fa-edit" id="icon-edit" />
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'UserProfileImage',
    props: {
        profileImg: String
    }
};
</script>

<style scoped>
#img-wrap {
    width: 150px;
    margin: auto;
    position: relative;
}
#profile-img {
    width: 100%;
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
    color: white;
    font-size: 240%;
    padding: 0 0 1px 5px;
}
</style>