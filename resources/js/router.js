import Vue from "vue";
import VueRouter from "vue-router";
import Index from "./components/Fruit/Index";
import Login from "./components/User/Login";
import Registration from "./components/User/Registration";
import Personal from "./components/User/Personal";

Vue.use(VueRouter)

const route = new VueRouter({
    mode: "history",
    routes: [
        {
            path: '/fruits', component: () => import ('./components/Fruit/Index'),
            name: 'fruit.index'
        },
        {
            path: '/users/login', component: () => import ('./components/User/Login'),
            name: 'user.login'
        },
        {
            path: '/users/registration', component: () => import ('./components/User/Registration'),
            name: 'user.registration'
        },
        {
            path: '/users/personal', component: () => import ('./components/User/Personal'),
            name: 'user.personal'
        },
        {
            path: '*', component: () => import ('./components/User/Personal'),
            name: '404'
        }
    ]
})

route.beforeEach((to, from, next) => {
    const accessToken = localStorage.getItem('access_token')

    if (accessToken) {
        if ((to.name === 'user.login') || (to.name === 'user.registration')) {
            return next({
                name: 'user.personal'
            })
        }
    } else {
        if ((to.name !== 'user.login') && (to.name !== 'user.registration')) {
            return next({
                name: 'user.login'
            })
        }
    }
    return next();
})

export default route;
