
// About user
import Login from '@/views/Mobile/Login.vue'
import Join from '@/views/Mobile/SignUp.vue'
import JoinAdditional from '@/views/WEB/user/JoinAdditional.vue'
import Complete from '@/views/WEB/user/Complete.vue'
import EditProfile from '@/views/WEB/user/EditProfile.vue'
import EditProfileM from '@/views/Mobile/profile/UserProfileEdit/UserProfileEdit.vue'
import EditProfileMPassword from '@/views/Mobile/profile/UserProfileEdit/UserProfilePassword.vue'
import EditProfileMPhone from '@/views/Mobile/profile/UserProfileEdit/UserProfilePhone.vue'
import EditProfileMWithdraw from '@/views/Mobile/profile/UserProfileEdit/UserProfileWithdraw.vue'
import EditProfileMImage from '@/views/Mobile/profile/UserProfileEdit/UserProfileImageChange.vue'
import BookmarkPlaces from '@/views/Mobile/profile/Bookmark/BookmarkPlaces.vue'
import BookmarkLists from '@/views/Mobile/profile/Bookmark/BookmarkLists.vue'

// About contents
import Components from '@/views/Components.vue'
import Change from '@/views/WEB/user/Change.vue'
import NotFound from '@/views/WEB/PageNotFound.vue'
import ErrorPage from '@/views/WEB/ErrorPage.vue'
import Home from '@/views/WEB/Home.vue'
import MainPage from '@/views/Mobile/home/Mainpage.vue'
import MainW from '@/views/WEB/Mainpage.vue'
import Posting from '@/views/Mobile/home/Posting.vue'
import Mychelin from '@/views/Mobile/home/MychelinDetail.vue'
import Comment from '@/views/Mobile/home/WriteComment.vue'
// About profile
import Profile from '@/views/Mobile/profile/UserProfile.vue'
import Place from '@/views/Mobile/profile/PlaceDetail.vue'

export default [
    {
        path : '/',
        name : 'Home',
        component : Home
    },
    {
        path : '/main',
        name : 'MainPage',
        component : MainPage
    },
    {
        path : '/mainw',
        name : 'MainW',
        component : MainW,
    },
    {
        path : '/login',
        name : 'Login',
        component : Login
    },
    {
        path : '/user/join',
        name : 'Join',
        component : Join
    },
    {
        path : '/user/JoinAdditional',
        name : 'JoinAdditional',
        component : JoinAdditional
    },
    {
        path : '/user/complete',
        name : 'Complete',
        component : Complete
    },
    {
        path : '/user/editprofile',
        name : 'EditProfile',
        component : EditProfile
    },
    {
        path : '/user/editprofilem',
        name : 'EditProfileM',
        component : EditProfileM,
    },
    {
        path : '/user/editprofilem/password',
        name : 'EditProfileMPassword',
        component : EditProfileMPassword
    },
    {
        path : '/user/editprofilem/phone',
        name : 'EditProfileMPhone',
        component : EditProfileMPhone
    },
    {
        path : '/user/editprofilem/withdraw',
        name : 'EditProfileMWithdraw',
        component : EditProfileMWithdraw
    },
    {
        path : '/user/editprofilem/image',
        name : 'EditProfileMImage',
        component : EditProfileMImage
    },
    {
        path : '/user/Bookmark/places',
        name : 'BookmarkPlaces',
        component : BookmarkPlaces
    },
    {
        path : '/user/Bookmark/lists',
        name : 'BookmarkLists',
        component : BookmarkLists
    },
    {
        path : '/components',
        name : 'Components',
        component : Components
    },
    {
        path : '/change',
        name : 'Change',
        component : Change
    },
    {
        path : '/profile/:id',
        name : 'Profile',
        component : Profile
    },
    {
        path : '/user/posting/',
        name : 'Posting',
        component : Posting
    },
    {
        path : '/place/:id',
        name : 'Place',
        component : Place
    },
    {
        path : '/main/mychelin/:id',
        name : 'Mychelin',
        component : Mychelin
    },
    {
        path : '/feed/comments/:id',
        name : 'Comment',
        component : Comment
    },
    {
        path : '/error',
        name : 'Error',
        component : ErrorPage
    },
    {
        path : '/:pathMatch(.*)*',
        name: "notFound",
        component: NotFound
    }
]