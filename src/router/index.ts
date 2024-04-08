import { markRaw } from "vue";
import { createRouter, createWebHistory } from "vue-router"; // createWebHashHistory, createWebHistory
import type { Router, RouteRecordRaw, RouteComponent } from "vue-router";
import { Help as IconHelp } from "@element-plus/icons-vue";

/* Layout */
const Layout = (): RouteComponent => import("@/layout/index.vue");

/* Router Modules */
import componentsRouter from "./modules/components";
import chartsRouter from "./modules/charts";
import nestedRouter from "./modules/nested";
import tableRouter from "./modules/table";

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 *
 * 注意：hidden、alwaysShow 属性配置移动到了meta中！！！
 */
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/redirect",
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index.vue"),
      },
    ],
  },

  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    meta: { hidden: true },
  },
  {
    path: "/auth-redirect",
    component: () => import("@/views/login/auth-redirect.vue"),
    meta: { hidden: true },
  },
  {
    path: "/404",
    component: () => import("@/views/error-page/404.vue"),
    meta: { hidden: true },
  },
  {
    path: "/401",
    component: () => import("@/views/error-page/401.vue"),
    meta: { hidden: true },
  },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard1",
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        name: "Dashboard",
        meta: { title: "Dashboard", icon: "dashboard", affix: true },
      },
      {
        path: "dashboard1",
        component: () => import("@/views/dashboard/index.vue"),
        name: "Dashboard1",
        meta: { title: "Dashboard1", icon: "dashboard", affix: true },
      },
    ],
  },
  {
    path: "/documentation",
    component: Layout,
    children: [
      {
        path: "index",
        component: () => import("@/views/documentation/index.vue"),
        name: "Documentation",
        meta: { title: "Documentation", icon: "documentation", affix: true },
      },
    ],
  },
  {
    path: "/user",
    component: Layout,
    meta: {
      title: "user",
      icon: "user",
      affix: true,
    },
    children: [
      {
        path: "index",
        component: () => import("@/views/user/index.vue"),
        name: "user", //指定child的name属性，这样才会在面包屑导航显示
        meta: { title: "user", icon: "user", affix: true },//指定meta的title属性，才会在sidebar显示
      },
    ],
  },





  {
    path: "/goods",
    component: Layout,
    meta: {
      title: "商品",
      icon: "goods",
      affix: true,
    },
    children: [
      {
        path: "index",
        component: () => import("@/views/goods/index.vue"),
        name: "商品", //指定child的name属性，这样才会在面包屑导航显示
        meta: { title: "商品", icon: "goods", affix: true },//指定meta的title属性，才会在sidebar显示
      },
    ],
  },  {
    path: "/article",
    component: Layout,
    meta: {
      title: "文章",
      icon: "article",
      affix: true,
    },
    children: [
      {
        path: "index",
        component: () => import("@/views/article/index.vue"),
        name: "文章", //指定child的name属性，这样才会在面包屑导航显示
        meta: { title: "article", icon: "user", affix: true },//指定meta的title属性，才会在sidebar显示
      },
    ],
  },
  {
    path: "/sys-config",
    component: Layout,
    meta: {
      title: "系统配置",
      icon: "config",
      affix: true,
    },
    children: [
      {
        path: "index",
        component: () => import("@/views/sys-config/index.vue"),
        name: "sys-config", //指定child的name属性，这样才会在面包屑导航显示
        meta: { title: "系统配置", icon: "config", affix: true },//指定meta的title属性，才会在sidebar显示
      },
      {
        path: "top-article",
        component: () => import("@/views/top-article/index.vue"),
        name: "top-article", //指定child的name属性，这样才会在面包屑导航显示
        meta: { title: "置顶文章", icon: "top", affix: true },//指定meta的title属性，才会在sidebar显示
      },
    ],
  },













  {
    path: "/guide",
    component: Layout,
    redirect: "/guide/index",
    children: [
      {
        path: "index",
        component: () => import("@/views/guide/index.vue"),
        name: "Guide",
        meta: { title: "Guide", icon: "guide", noCache: true },
      },
    ],
  },
  {
    path: "/profile",
    component: Layout,
    redirect: "/profile/index",
    meta: { hidden: true },
    children: [
      {
        path: "index",
        component: () => import("@/views/profile/index.vue"),
        name: "Profile",
        meta: { title: "Profile", icon: "user", noCache: true },
      },
    ],
  },
];

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 *
 * 注意：hidden、alwaysShow 属性配置移动到了meta中！！！
 */
export const asyncRoutes: RouteRecordRaw[] = [
  {
    path: "/permission",
    component: Layout,
    redirect: "/permission/page",
    name: "Permission",
    meta: {
      alwaysShow: true, // will always show the root menu
      title: "Permission",
      icon: "lock",
      roles: ["admin", "editor"], // you can set roles in root nav
    },
    children: [
      {
        path: "page",
        component: () => import("@/views/permission/page.vue"),
        name: "PagePermission",
        meta: {
          title: "Page Permission",
          roles: ["admin"], // or you can only set roles in sub nav
        },
      },
      {
        path: "directive",
        component: () => import("@/views/permission/directive.vue"),
        name: "DirectivePermission",
        meta: {
          title: "Directive Permission",
          // if do not set roles, means: this page does not require permission
        },
      },
      {
        path: "role",
        component: () => import("@/views/permission/role.vue"),
        name: "RolePermission",
        meta: {
          title: "Role Permission",
          roles: ["admin"],
        },
      },
    ],
  },

  {
    path: "/icon",
    component: Layout,
    children: [
      {
        path: "index",
        component: () => import("@/views/icons/index.vue"),
        name: "Icons",
        meta: { title: "Icons", icon: "icon", noCache: true },
      },
    ],
  },

  // /** when your routing map is too long, you can split it into small modules **/
  componentsRouter,
  chartsRouter,
  nestedRouter,
  tableRouter,

  {
    path: "/",
    component: Layout,
    redirect: "dashboard",
    name: "dashboard",
    meta: {
      title: "dashboard",
      icon: "dashboard",
    },

    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        name: "dashboard",
        meta: { title: "dashboard", icon: "dashboard" },
      },
      {
        path: "dashboard1",
        component: () => import("@/views/dashboard/index.vue"),
        name: "dashboard1",
        meta: { title: "dashboard", icon: "dashboard" },
      },
    ],
  },
  {
    path: "/example",
    component: Layout,
    redirect: "/example/list",
    name: "Example",
    meta: {
      title: "Example",
      icon: markRaw(IconHelp),
    },
    children: [
      {
        path: "create",
        component: () => import("@/views/example/create.vue"),
        name: "CreateArticle",
        meta: { title: "Create Article", icon: "edit" },
      },
      {
        path: "edit/:id(\\d+)",
        component: () => import("@/views/example/edit.vue"),
        name: "EditArticle",
        meta: {
          hidden: true,
          title: "Edit Article",
          noCache: true,
          activeMenu: "/example/list",
        },
      },
      {
        path: "list",
        component: () => import("@/views/example/list.vue"),
        name: "ArticleList",
        meta: { title: "Article List", icon: "list" },
      },
    ],
  },

  {
    path: "/tab",
    component: Layout,
    children: [
      {
        path: "index",
        component: () => import("@/views/tab/index.vue"),
        name: "Tab",
        meta: { title: "Tab", icon: "tab" },
      },
    ],
  },

  {
    path: "/error",
    component: Layout,
    redirect: "noRedirect",
    name: "ErrorPages",
    meta: {
      title: "Error Pages",
      icon: "404",
    },
    children: [
      {
        path: "401",
        component: () => import("@/views/error-page/401.vue"),
        name: "Page401",
        meta: { title: "401", noCache: true },
      },
      {
        path: "404",
        component: () => import("@/views/error-page/404.vue"),
        name: "Page404",
        meta: { title: "404", noCache: true },
      },
    ],
  },

  {
    path: "/error-log",
    component: Layout,
    children: [
      {
        path: "log",
        component: () => import("@/views/error-log/index.vue"),
        name: "ErrorLog",
        meta: { title: "Error Log", icon: "bug" },
      },
    ],
  },

  {
    path: "/excel",
    component: Layout,
    redirect: "/excel/export-excel",
    name: "Excel",
    meta: {
      title: "Excel",
      icon: "excel",
    },
    children: [
      {
        path: "export-excel",
        component: () => import("@/views/excel/export-excel.vue"),
        name: "ExportExcel",
        meta: { title: "Export Excel" },
      },
      {
        path: "export-selected-excel",
        component: () => import("@/views/excel/select-excel.vue"),
        name: "SelectExcel",
        meta: { title: "Export Selected" },
      },
      {
        path: "export-merge-header",
        component: () => import("@/views/excel/merge-header.vue"),
        name: "MergeHeader",
        meta: { title: "Merge Header" },
      },
      {
        path: "upload-excel",
        component: () => import("@/views/excel/upload-excel.vue"),
        name: "UploadExcel",
        meta: { title: "Upload Excel" },
      },
    ],
  },

  {
    path: "/zip",
    component: Layout,
    redirect: "/zip/download",
    name: "Zip",
    meta: { alwaysShow: true, title: "Zip", icon: "zip" },
    children: [
      {
        path: "download",
        component: () => import("@/views/zip/index.vue"),
        name: "ExportZip",
        meta: { title: "Export Zip" },
      },
    ],
  },

  {
    path: "/pdf",
    component: Layout,
    redirect: "/pdf/index",
    children: [
      {
        path: "index",
        component: () => import("@/views/pdf/index.vue"),
        name: "PDF",
        meta: { title: "PDF", icon: "pdf" },
      },
    ],
  },
  {
    path: "/pdf/download",
    component: () => import("@/views/pdf/download.vue"),
    meta: { hidden: true },
  },

  {
    path: "/theme",
    component: Layout,
    children: [
      {
        path: "index",
        component: () => import("@/views/theme/index.vue"),
        name: "Theme",
        meta: { title: "Theme", icon: "theme" },
      },
    ],
  },

  {
    path: "/clipboard",
    component: Layout,
    children: [
      {
        path: "index",
        component: () => import("@/views/clipboard/index.vue"),
        name: "ClipboardDemo",
        meta: { title: "Clipboard", icon: "clipboard" },
      },
    ],
  },

  {
    path: "/external-link",
    component: Layout,
    children: [
      {
        path: "https://element-plus.midfar.com",
        meta: { title: "External Link", icon: "link" },
        redirect: "",
      },
    ],
  },

  {
    path: "/my-demo",
    component: Layout,
    name: "MyDemo",
    meta: {
      title: "MyDemo",
      icon: "component",
    },
    children: [
      {
        path: "element-demo",
        component: () => import("@/views/mydemo/ElementDemo.vue"),
        name: "ElementDemo",
        meta: { title: "ElementDemo", icon: "skill" },
      },
      {
        path: "store-demo",
        component: () => import("@/views/mydemo/StoreDemo.vue"),
        name: "StoreDemo",
        meta: { title: "StoreDemo", icon: "lock" },
      },
      {
        path: "webSocket-demo",
        component: () => import("@/views/mydemo/WebSocketDemo.vue"),
        name: "WebSocketDemo",
        meta: { title: "WebSocketDemo", icon: "lock" },
      },
    ],
  },

  // 404 page must be placed at the end !!!
  { path: "/:pathMatch(.*)*", redirect: "/404", meta: { hidden: true } },
];

console.log("BASE_URL=", import.meta.env);

const createTheRouter = (): Router =>
  createRouter({
    // history: createWebHashHistory(import.meta.env.BASE_URL),
    // 注意，如果要配置 HTML5 模式，则需要修改nginx配置，参考资料：
    // https://router.vuejs.org/zh/guide/essentials/history-mode.html
    history: createWebHistory(import.meta.env.BASE_URL),
    scrollBehavior: () => ({ top: 0 }),
    routes: constantRoutes,
  });

interface RouterPro extends Router {
  matcher: unknown;
}

const router = createTheRouter() as RouterPro;

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createTheRouter() as RouterPro;
  router.matcher = newRouter.matcher; // reset router
}

export default router;
