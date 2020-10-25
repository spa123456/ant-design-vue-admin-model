import Vue from "vue";
import VueRouter from "vue-router";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {
  notification
} from 'ant-design-vue'
import {
  check,
  isLogin
} from "../utils/auth"
import {
  findLast
} from "lodash"
Vue.use(VueRouter);


//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


const routes = [{
    path: "/user",
    hideInMenu: true,
    component: {
      render: h => h('router-view')
    },
    children: [{
        path: "/user",
        redirect: '/user/login'
      },
      {
        path: '/user/login',
        name: 'login',
        component: () => import('../views/user/login.vue')
      },
      {
        path: '/user/register',
        name: 'register',
        component: () => import('../views/user/register.vue')
      },
    ]
  },
  {
    path: "/",
    component: () => import('../layout/mainView'),
    children: [{
        path: "/",
        redirect: "/dashboard/analysis"
      },
      //dashboard
      {
        path: "/dashboard",
        name: "dashboard",
        meta: {
          icon: "dashboard",
          title: "仪表盘",
          authority: ['admin', 'user']
        },
        component: {
          render: h => h('router-view')
        },
        children: [{
            path: "/dashboard",
            redirect: "/dashboard/analysis"
          },
          {
            path: "/dashboard/analysis",
            name: "analysis",
            meta: {
              title: "分析页"
            },
            component: () => import('../views/dashboard/analysis')
          }
        ]
      },
      //form
      {
        path: "/form",
        name: "form",
        meta: {
          icon: "form",
          title: "表单",
          authority: ['admin']
        },
        component: {
          render: h => h('router-view')
        },
        children: [{
            path: "/form/basic-form",
            name: "basicform",
            meta: {
              title: "基础表单"
            },
            component: () => import('../views/form/basicform')
          },
          {
            path: "/form/step-form",
            name: "stepform",
            hideInChildrenMenu: true,
            meta: {
              title: "分布表单"
            },
            component: () => import('../views/form/stepform'),
            children: [{
                path: "/form/step-form",
                redirect: "/form/step-form/info"
              },
              {
                path: "/form/step-form/info",
                name: "info",
                component: () => import('../views/form/stepform/step1')
              },
              {
                path: "/form/step-form/confirm",
                name: "confirm",
                component: () => import('../views/form/stepform/step2')
              },
              {
                path: "/form/step-form/result",
                name: "result",
                component: () => import('../views/form/stepform/step3')
              }
            ]
          },
        ]
      },
      {
        path: '/403',
        hideInMenu: true,
        component: () => import('../views/403')
      },
      {
        path: '*',
        hideInMenu: true,
        component: () => import('../views/404')
      },
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, form, next) => {
  to.path !== form.path ? NProgress.start() : ''
  const record = findLast(to.matched, record => record.meta.authority)
  if (record && !check(record.meta.authority)) {
    if (!isLogin() && to.path !== '/user/login') {
      next({
        path: "/user/login"
      })
    } else if (to.path !== '/403') {
      notification.error({
        message: '403',
        description: '你没有权限访问',
      });
      next({
        path: "/403"
      })
    }
    NProgress.done()
  }
  next()
})
router.afterEach(() => {
  NProgress.done()
})
export default router;