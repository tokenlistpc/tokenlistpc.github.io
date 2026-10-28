import { createRouter, createWebHistory } from "vue-router"
import i18n from "@/lang"
import { useStore } from '@/store'
import { useConfigStore } from '@/store/config'


const routes = [
    {
        path: "/",
        redirect: '/token/create',
    }, {
        path: "/launchpad/:pathMatch(.*)*",
        redirect: '/token/create',
    }, {
        path: "/test",
        component: () => import("../views/Test.vue"),
        meta: {
            title: "Test",
        },
    }, {
        path: "/tableTest",
        component: () => import("../views/TableTest.vue"),
        meta: {
            title: "Test",
        },
    },
    {
        path: "/token",
        component: () => import("../views/token/Index.vue"),
        redirect: '/token/create',
        children: [
            {
                path: "/token/create",
                component: () => import("../views/token/Create.vue"),
                meta: {
                    title: "Create Token",
                },
            },
            {
                path: "/token/list",
                component: () => import("../views/token/List.vue"),
                meta: {
                    title: "Create Token",
                },
            }
        ]
    },
    {
        path: "/token/manage/:deployerId/:chain/:tokenAddress",
        component: () => import("../views/token/Manage.vue"),
        meta: {
            title: "Create Token",
        },
        props: true,
    },
    {
        path: "/lock/list/:tokenType",
        component: () => import("../views/lock/Index.vue"),
        meta: {
            title: "Lock",
        },
    },
    {
        path: "/lock/detail/:tokenType/:lockId",
        component: () => import("../views/lock/Detail.vue"),
        meta: {
            title: "Lock",
        },
        props: true,
    },
    {
        path: "/lock/create",
        component: () => import("../views/lock/create/Index.vue"),
        children: [
            {
                path: "/lock/create/token",
                component: () => import("../views/lock/create/Token.vue"),
                meta: {
                    title: "Lock",
                },
            },
            {
                path: "/lock/create/lp",
                component: () => import("../views/lock/create/Lp.vue"),
                meta: {
                    title: "Lock",
                },
            },
            {
                path: "/lock/create/univ3",
                component: () => import("../views/lock/create/UniV3.vue"),
                meta: {
                    title: "Lock",
                },
            },
        ]
    },

    {
        path: "/transfer",
        component: () => import("../views/transfer/Index.vue"),
        children: [
            {
                path: "/transfer/multi",
                component: () => import("../views/transfer/Multi.vue"),
                meta: {
                    title: "Multi-transfer",
                },
            },
            {
                path: "/transfer/history",
                component: () => import("../views/transfer/History.vue"),
                meta: {
                    title: "Multi-transfer",
                },
            },
        ]
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})


router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        if (to.params.listType) {
            document.title = i18n.global.t(to.params.listType) + i18n.global.t(to.meta.title)
        } else {
            document.title = i18n.global.t(to.meta.title)
        }
    }
    const store = useStore()
    const configStore = useConfigStore()
    if (from.path == "/") {
        if (to.query.utm) {
            configStore.utm = to.query.utm
        }
    }
    if (configStore.utm && !to.query.utm) {
        next({
            path: to.path, query: {
                ...to.query,
                utm: configStore.utm
            }
        })
        return
    }
    next()
})

export default router
