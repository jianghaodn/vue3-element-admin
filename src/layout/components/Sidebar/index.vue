<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        class="left-menu"
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in permission_routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { mapState } from "pinia";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
// import variables from '@/styles/variables.modules.scss';
import store from "@/store";

export default defineComponent({
  name: "Sidebar",
  mounted() {
  },
  components: {
    SidebarItem,
    Logo,
  },
  data() {
    return {
      variables: {
        menuBg: "#304156",
        menuText: "#fff",
        menuActiveText: "#409EFF",
      },
    };
  },
  computed: {
    ...mapState(store.app, ["sidebar"]),
    ...mapState(store.permission, {
      permission_routes: "routes",
    }),
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    showLogo() {
      return store.settings().sidebarLogo;
    },
    isCollapse() {
      return !this.sidebar.opened;
    },
  },
});
</script>
