// About user
import SignUp from '@/views/user/SignUp.vue'
import Login from '@/views/user/Login.vue'
import ProfilePage from '@/views/user/profile/ProfilePage.vue'
import ProfileEdit from '@/views/user/profile/profileEdit/ProfileEdit.vue'
import ProfileImageChange from '@/views/user/profile/profileEdit/ProfileImageChange.vue'
import ProfilePassword from '@/views/user/profile/profileEdit/ProfilePassword.vue'
import ProfileWithdraw from '@/views/user/profile/profileEdit/ProfileWithdraw.vue'
import BookmarkPage from '@/views/user/bookmark/BookmarkPage.vue'
import BookmarkPagePlaces from '@/views/user/bookmark/BookmarkPagePlaces.vue'
import BookmarkPageLists from '@/views/user/bookmark/BookmarkPageLists.vue'
import MftiPage from '@/views/user/mfti/MftiPage.vue'
import MftiResult from '@/views/user/mfti/MftiResult.vue'

// About main
import HomePage from '@/views/main/HomePage.vue'
import MainPage from '@/views/main/MainPage.vue'
import FeedPosting from '@/views/main/feed/FeedPosting.vue'
import PlaceListDetail from '@/views/main/placeList/PlaceListDetail.vue'
import FeedComment from '@/views/main/feed/FeedComment.vue'
import PlaceDetail from '@/views/main/place/PlaceDetail.vue'

// About etc
import PageNotFound from '@/views/etc/PageNotFound.vue'
import ErrorPage from '@/views/etc/ErrorPage.vue'

export default [
    {
        path : '/',
        name : 'HomePage',
        component : HomePage,
        beforeEnter: (to, from, next) => {
            if (localStorage.getItem('jwt') === null) next()
            else next({ name: 'MainPage'})
        }
    },
    {
        path : '/main',
        name : 'MainPage',
        component : MainPage,
        beforeEnter: (to, from, next) => {
            if (localStorage.getItem('jwt') === null) next({ name: 'HomePage' })
            else next()
        }
    },
    {
        path : '/login',
        name : 'Login',
        component : Login
    },
    {
        path : '/signup',
        name : 'SignUp',
        component : SignUp
    },
    {
        path : '/user/edit',
        name : 'ProfileEdit',
        component : ProfileEdit
    },
    {
        path : '/user/edit/password',
        name : 'ProfilePassword',
        component : ProfilePassword
    },
    {
        path : '/user/edit/withdraw',
        name : 'ProfileWithdraw',
        component : ProfileWithdraw
    },
    {
        path : '/user/edit/image',
        name : 'ProfileImageChange',
        component : ProfileImageChange
    },
    {
        path : '/user/bookmark',
        component : BookmarkPage,
        children: [
            {
                path : 'places',
                name : 'BookmarkPagePlaces',
                component : BookmarkPagePlaces,
            },
            {
                path : 'lists',
                name : 'BookmarkPageLists',
                component : BookmarkPageLists,
            },
        ],
    },
    {
        path : '/user/:nickname',
        name : 'ProfilePage',
        component : ProfilePage
    },
    {
        path : '/posting',
        name : 'FeedPosting',
        component : FeedPosting
    },
    {
        path : '/posting/:id',
        name : 'FeedPostingModify',
        component : FeedPosting
    },
    {
        path : '/place/:id',
        name : 'PlaceDetail',
        component : PlaceDetail
    },
    {
        path : '/placelist/:id',
        name : 'PlaceListDetail',
        component : PlaceListDetail
    },
    {
        path : '/feed/:id/comment',
        name : 'FeedComment',
        component : FeedComment
    },
    {
        path : '/mfti',
        name : 'MftiPage',
        component : MftiPage
    },
    {
        path : '/mfti/result',
        name : 'MftiResult',
        component : MftiResult
    },
    {
        path : '/error',
        name : 'ErrorPage',
        component : ErrorPage
    },
    {
        path : '/:pathMatch(.*)*',
        name: "NotFound",
        component: PageNotFound
    },
]