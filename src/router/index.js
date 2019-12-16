import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Dashboard from '../views/Dashboard.vue';
import Search from '../views/Search.vue';
import UserDetail from '../views/UserDetail.vue';
import Messages from '../views/Messages.vue';
import MessageDetail from '../views/MessageDetail.vue';
import Invite from '../views/Invite.vue';
import CreateProfile from '../views/CreateProfile.vue';
import WhereToNext from '../views/WhereToNext.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/create-profile',
    name: 'createProfile',
    component: CreateProfile,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    redirect: '/find-your-friends',
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '/find-your-friends',
        name: 'search',
        component: Search,
        meta: {
          requiresAuth: true
        },
        children: [
          {
            path: '/user/:uid',
            name: 'userDetail',
            component: UserDetail,
            meta: {
              requiresAuth: true
            }
          }
        ]
      },
      {
        path: '/messages',
        name: 'messages',
        component: Messages,
        meta: {
          requiresAuth: true
        },
        children: [
          {
            path: '/message/:id',
            name: 'messageDetail',
            component: MessageDetail,
            meta: {
              requiresAuth: true
            }
          }
        ]
      },
      {
        path: '/invite',
        name: 'invite',
        component: Invite,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/where-to-next',
        name: 'whereToNext',
        component: WhereToNext,
        meta: {
          requiresAuth: true
        }
      }
    ]
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!localStorage.getItem('token')) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});

export default router;
