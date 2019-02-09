import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Home from '../views/Home.vue';
import Layout from '../views/mainLayout/Layout.vue';
import loginPage from '../views/Login/Login.vue';
import ProductsPage from '../views/ProductsPage.vue';
import ProductsChildren from '../views/ProductsChildren.vue';
import UsersPage from '../views/UsersPage.vue';
import ProfilePage from '../views/ProfilePage.vue';
import SettingsPage from '../views/SettingsPage.vue';

import NotFound from '../views/_404.vue';

import { isAuthenticated, isNotAuthenticated , canAccess } from '../utils/helpers'

export const routes = [
    {
        path: '/',
        component: Layout,
        beforeEnter: isAuthenticated,
        children:[
            {
                path: "/",
                redirect: "/home"
            },
            {
                path: "/home",
                name: "home",
                component: Home,
                meta:{
                    breadcrumb: {
                        title: "Home"
                    }
                },
            },
            {
                path: "/products",
                name: "products",
                component: ProductsPage,
                meta:{
                    breadcrumb: {
                        title: "Products"
                    }
                },
                children: [
                    {
                        path: "add",
                        name: "addProducts",
                        component: ProductsChildren,
                        meta:{
                            breadcrumb: {
                                title: "productsadd",
                            },
                        },
                    }
                ]
            },
            {
                path: "/users",
                name: "users",
                component: UsersPage,
                beforeEnter: canAccess,
                meta:{
                    breadcrumb: {
                        title: "users"
                    },
                    role:['Owner']
                },

            },
            {
                path: '/profile',
                name: 'profile',
                component: ProfilePage,
                meta:{
                    breadcrumb: {
                        title: "Profile"
                    },
                }
            },
            {
                path: '/settings',
                name: 'settings',
                component: SettingsPage,
                meta:{
                    breadcrumb: {
                        title: "Settings"
                    },
                }
            },
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: loginPage,
        meta: {
            breadcrumb: {
                title: "Login"
            },
        },
        beforeEnter: isNotAuthenticated
    },
    {
        path: '/404',
        name: '404',
        component: NotFound
    },
    {
        path: '*',
        redirect: '/404',
    },
];



const router = new VueRouter({
    routes,
    scrollBehavior: () => ({ y: 0 }),
    linkExactActiveClass: 'is-active',
    mode: 'hash'
});

export default router;











// import { i18n } from '../plugins/i18n';
// import Home from '../components/Home.vue';
// import Products from '../components/Products.vue';
// import About from '../components/About.vue';
// import NotFound from '../components/_404.vue';
//
// import Admin from '../components/admin/Home.vue';
// import adminProducts from '../components/admin/pages/ProductsPage.vue';
// import adminLoginPage from '../components/admin/pages/Login.vue';
// import adminRegisterPage from '../components/admin/pages/Register.vue';
//
// import Lang from '../components/Lang.vue';
// import Vue from "vue/types/index";
//
// const ifNotAuthenticated = (to, from, next) => {
//     const userData = localStorage.getItem('user-token') || '';
//     if (!userData.token) {
//         next()
//         return
//     }
//     next('/admin')
// }
//
// const canAccess = (to, from, next) => {
//
//     const userData = JSON.parse(localStorage.getItem('user-token')) || '';
//     if (userData.token && to.meta.role.includes(userData.role)) {
//         next()
//         return
//     }
//     next('*')
// }
//
// const ifAuthenticated = (to, from, next) => {
//     const userData = localStorage.getItem('user-token') || '';
//     if (to.matched.some(route => route.meta.auth) && !userData.token) {
//         next('/admin/login');
//     } else {
//         next();
//     }
// }
//
// const routeMiddleware = (to, from, next) => {
//
//     // Load async message files here
//     const lang = to.params.lang;
//     console.log(to.params);
//     if(!['en', 'ru', 'ua'].includes(lang)){
//         console.log(lang);
//         return next('en');
//     }
//     if(i18n.locale !== lang){
//         console.log(lang, '1');
//         i18n.locale = lang;
//     }
//     return next();
// }
//
// const routes = [
//     {
//         path: '/',
//         redirect: { name: 'home'}
//     },
//     {
//         path: '/:lang',
//         component: Lang,
//         beforeEnter: routeMiddleware,
//         children: [
//             {
//                 path: '',
//                 name:'home',
//                 component: Home,
//                 children:[
//                     {
//                         path: 'products',
//                         name:'products',
//                         component: Products,
//                         meta:{
//                             breadcrumb: [{
//                                 name: "Products",
//                                 link: "products"
//                             }]
//                         },
//                     },
//                     {
//                         path: 'about',
//                         name:'about',
//                         component: About,
//                     },
//                     {
//                         path: 'admin',
//                         name: 'admin',
//                         component: Admin,
//                         meta:{
//                             breadcrumb: [{
//                                 name: "Admin",
//                                 link: "admin"
//                             }]
//                         },
//                         children:[
//                             {
//                                 path: 'adminproducts',
//                                 name: 'adminproducts',
//                                 meta: { auth: true },
//                                 component: adminProducts,
//                                 beforeEnter: canAccess,
//                                 meta:{
//                                     role:['Admin']
//                                 },
//                                 // beforeEnter: ifAuthenticated
//                             },
//                             {
//                                 path: 'login',
//                                 name: 'adminlogin',
//                                 component: adminLoginPage,
//                                 meta:{
//                                     breadcrumb: [
//                                         {
//                                             name: "Admin",
//                                             link: "admin"
//                                         },
//                                         {
//                                             name: "Login"
//                                         }]
//                                 }
//                                 // beforeEnter: ifNotAuthenticated
//                             },
//                             {
//                                 path: 'register',
//                                 name: 'adminRegisterPage',
//                                 component: adminRegisterPage
//
//                             }
//                         ]
//                     },
//                     // {
//                     //     path: '404',
//                     //     name: '404',
//                     //     component: NotFound,
//                     //     // Allows props to be passed to the 404 page through route
//                     //     // params, such as `resource` to define what wasn't found.
//                     //     props: true,
//                     // },
//                     // // Redirect any unmatched routes to the 404 page. This may
//                     // // require some server configuration to work in production:
//                     // // https://router.vuejs.org/en/essentials/history-mode.html#example-server-configurations
//                     // {
//                     //     path: '*',
//                     //     redirect: '404',
//                     // },
//
//                 ]
//             },
//             {
//                 path: '404',
//                 name: '404',
//                 component: NotFound,
//                 // Allows props to be passed to the 404 page through route
//                 // params, such as `resource` to define what wasn't found.
//                 props: true,
//             },
//             // Redirect any unmatched routes to the 404 page. This may
//             // require some server configuration to work in production:
//             // https://router.vuejs.org/en/essentials/history-mode.html#example-server-configurations
//             {
//                 path: '*',
//                 redirect: '404',
//             },
//
//         ]
//     },
//
//
// ];
//
// const router = new VueRouter({
//     routes,
//     linkExactActiveClass: 'is-active',
//     mode: 'hash'
// });
//
//
//
// // router.beforeEach((to, from, next) => {
// //     // redirect to login page if not logged in and trying to access a restricted page
// //
// //     console.log(to, from, next);
// // });
//




