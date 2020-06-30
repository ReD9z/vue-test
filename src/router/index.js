import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        meta: {
            layout: 'home',
            auth: true
        },
        component: () => import('../views/Home'),
    },
    {
        path: '/auth',
        name: 'auth',
        meta: {
            layout: 'auth'
        },
        component: () => import('../views/Auth')
    }
];

const router = new VueRouter({
    mode: 'history',
    routes
});

router.beforeEach((to, from, next) => {
    const successUser = store.getters.isAuthenticated;
    const requareAuth = to.matched.some(record => record.meta.auth);
    if (!successUser && requareAuth) {
        next('/auth');
    } else if (to.path == '/auth' && successUser) {
        next('/')
    }
    else {
        next();
    }
});

export default router;
