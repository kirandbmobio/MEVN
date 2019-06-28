import Home from './components/Home.vue';
import Posts from './components/todo/Posts.vue';
import Login from './components/Auth/Login.vue';
import SignUp from './components/Auth/SignUp.vue';
import Profile from './components/admin/Profile.vue';
import UserHome from './components/user/UserHome.vue';
import EditPost from './components/todo/EditPost.vue';
import CreatePost from './components/todo/CreatePost.vue';
import UserDetail from './components/admin/UserDetail.vue';
import Product from './components/user/Product/Product.vue';
import UserProfile from './components/user/UserProfile.vue';
import UpdateProfile from './components/admin/UpdateProfile.vue';
import AddProduct from './components/admin/Product/AddProduct.vue';
import UpdateUserProfile from './components/user/UpdateUserProfile.vue';
import UpdateProduct from './components/user/Product/UpdateProduct.vue';
import ProductDetail from './components/admin/Product/ProductDetail.vue';
import DisplayProduct from './components/user/Product/DisplayProduct.vue';
import UpdateProductByAdmin from './components/admin/Product/UpdateProductByAdmin.vue';

export const routes = [{
        path: '/',
        component: Login,
        name: 'login',
    },
    {
        path: '/sign-up',
        component: SignUp,
        name: 'sign-up'
    },
    {
        path: '/',
        component: UserHome,
        name: 'user-home',
        children: [{
                path: '/user-profile',
                component: UserProfile,
                name: 'user-profile',
                params: true
            },
            {
                path: '/update-user-profile',
                component: UpdateUserProfile,
                name: 'update-user-profile',
                params: true
            },
            {
                path: '/product',
                component: Product,
                name: 'product',
                params: true,
            },
            {
                path: '/display-product',
                component: DisplayProduct,
                name: 'display-product',
                params: true
            },
            {
                path: '/edit-product/:productId',
                component: UpdateProduct,
                name: 'edit-product',
                params: true
            }
        ]

    },
    {
        path: '/',
        component: Home,
        name: 'home',
        children: [{
                path: '/profile',
                component: Profile,
                name: 'profile',
                params: true
            },

            {
                path: '/update-profile/:userId',
                component: UpdateProfile,
                name: 'update-profile',
                params: true
            },
            {
                path: '/user-detail',
                component: UserDetail,
                name: 'user-detail',
                params: true
            },
            {
                path: '/product-detail/:userId',
                component: ProductDetail,
                name: 'product-detail',
                params: true
            },
            {
                path: '/add-product/:userId',
                component: AddProduct,
                name: 'add-product',
                params: true
            },
            {
                path: '/update-product/:productId',
                component: UpdateProductByAdmin,
                name: 'update-product',
                params: true
            }

        ]
    },

    //Todo components

    {
        name: 'create',
        path: '/create',
        component: CreatePost
    },
    {
        name: 'posts',
        path: '/posts',
        component: Posts
    },
    {
        name: 'edit',
        path: '/edit/:id',
        component: EditPost
    },
    {
        path: '*',
        redirect: '/'
    }
]