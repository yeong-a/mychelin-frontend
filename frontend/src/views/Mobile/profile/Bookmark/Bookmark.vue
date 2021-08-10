<template>
    <div class="container">
        <ReturnNav inputTxt="북마크" />
        <div class="nav-gap"></div>
        <div class="d-flex bottom-border">
            <div v-for="(tab, idx) in tabs" :key="idx" class="bookmark-tab" :class="tab.currentTab">
                <router-link :to="{ name: tab.component }" class="router-link d-flex">
                    <p class="tab-text">{{ tab.inKorean }}</p>
                </router-link>
            </div>
        </div>
        <router-view />
    </div>
</template>

<script>
import ReturnNav from '@/components/user/ReturnNav.vue'

export default {
    name: 'Bookmark',
    components: {
        ReturnNav,
    },
    data() {
        return {
            tabs: [
                {
                    component: 'BookmarkPlaces',
                    inKorean: '식당',
                    currentTab: 'bookmark-selected',
                },
                {
                    component: 'BookmarkLists',
                    inKorean: '맛집 리스트',
                    currentTab: 'bookmark-unselected',
                },
            ],
        }
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.checkRouter(to.name)
        })
    },
    beforeRouteUpdate(to, from, next) {
        this.checkRouter(to.name)
        next()
    },
    methods: {
        checkRouter(routerName) {
            for (var i=0; i<this.tabs.length; i++) {
                if (routerName === 'BookmarkPlaces') {
                    if (this.tabs[i].component === 'BookmarkPlaces')
                        this.tabs[i].currentTab = 'bookmark-selected'
                    else
                        this.tabs[i].currentTab = 'bookmark-unselected'
                } else {
                    if (this.tabs[i].component === 'BookmarkPlaces')
                        this.tabs[i].currentTab = 'bookmark-unselected'
                    else
                        this.tabs[i].currentTab = 'bookmark-selected'
                }
            }
        },
    },
}
</script>

<style scoped>
.nav-gap {
    margin: 60px;
}

.bottom-border {
    border-bottom: 3px solid #ff993c;
}

.bookmark-tab {
    width: 48%;
    height: 35px;
    margin: auto;
    border-radius: 10px 10px 0 0;
    text-align: center;
}

.bookmark-selected {
    background-color: #ff993c;
}

.bookmark-unselected {
    background-color: #9b9b9b;
}

.router-link {
    color: white;
    width: 100%;
    height: 100%;
}

.tab-text {
    margin: auto;
}
</style>