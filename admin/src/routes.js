//import require components for routing
import Home from './components/Home.vue';
import Posts from './components/Todo/Posts.vue';
import Login from './components/Auth/Login.vue';
import SignUp from './components/Auth/SignUp.vue';
import Profile from './components/Admin/Profile.vue';
import EditPost from './components/Todo/EditPost.vue';
import CreatePost from './components/Todo/CreatePost.vue';
import UserDetail from './components/Admin/UserDetail.vue';
import Product from './components/User/Product/Product.vue';
import UserProfile from './components/User/UserProfile.vue';
import UpdateProfile from './components/Admin/UpdateProfile.vue';
import UpdateUserProfile from './components/User/UpdateUserProfile.vue';
import UpdateProduct from './components/User/Product/UpdateProduct.vue';
import ProductDetail from './components/Admin/Product/ProductDetail.vue';
import DisplayProduct from './components/User/Product/DisplayProduct.vue';
import UpdateProductByAdmin from './components/Admin/Product/UpdateProductByAdmin.vue';



//set routes of components
export const routes = [{
        path: '/login',
        component: Login,
        name: 'login',
    },
    {
        path: '/sign-up',
        component: SignUp,
        name: 'sign-up'
    },
    //User Routes
    {
        path: '/',
        component: Home,
        name: 'home',
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
                path: '/edit-product/:productId?',
                component: UpdateProduct,
                name: 'edit-product',
                params: true
            }
        ],
        meta: { 
        requiresAuth: true
      }

    },
    // Admin Routes
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
                path: '/update-product/:productId',
                component: UpdateProductByAdmin,
                name: 'update-product',
                params: true
            }

        ],
        meta: { 
        requiresAuth: true
      }
    },

    //Todo Routes

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
        redirect: '/login'
    }
]
