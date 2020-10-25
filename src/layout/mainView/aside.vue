<template>
  <div style="width: 210px">
    <a-menu :selectedKeys="selectedKeys" :openKeys.sync="openKeys" mode="inline" :theme="theme">
      <template v-for="item in menuData">
        <a-menu-item
          v-if="!item.children"
          :key="item.path"
          @click="()=>$router.push({path:item.path,query:$route.query})"
        >
          <a-icon v-if="item.meta.icon" :type="item.meta.icon" />
          <span>{{ item.meta.title }}</span>
        </a-menu-item>
        <sub-menu v-else :key="item.path" :menu-info="item" />
      </template>
    </a-menu>
  </div>
</template>

<script>
import SubMenu from "./submenu";
import { check } from "../../utils/auth";
export default {
  components: {
    SubMenu
  },
  props: {
    theme: {
      type: String,
      default: ""
    },
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  data() {
    this.selectedKeysMap = {};
    this.openKeysMap = {};
    const menuData = this.getMenuData(this.$router.options.routes);
    return {
      selectedKeys: this.selectedKeysMap[this.$route.path],
      openKeys: this.collapsed ? [] : this.openKeysMap[this.$route.path],
      menuData
    };
  },
  watch: {
    "$route.path": function(val) {
      this.selectedKeys = this.selectedKeysMap[val];
      this.openKeys = this.collapsed ? [] : this.openKeysMap[val];
    },
    collapsed(val) {
      if (val) {
        this.cacheOpenKeys = this.openKeys;
        this.openKeys = [];
      } else {
        this.openKeys = this.cacheOpenKeys;
      }
    }
  },
  mounted() {
    console.log(this.selectedKeysMap["/dashboard/analysis"]);
  },
  methods: {
    getMenuData(routers = [], parentKeys = [], selectedKey) {
      const menuData = [];
      for (const item of routers) {
        if (item.meta&&item.meta.authority&&!check(item.meta.authority)) {
          break;
        }
        if (item.name && !item.hideInMenu) {
          this.openKeysMap[item.path] = parentKeys;
          this.selectedKeysMap[item.path] = [selectedKey || item.path];
          const newMenu = { ...item };
          delete newMenu.children;
          if (item.children && !item.hideInChildrenMenu) {
            newMenu.children = this.getMenuData(item.children, [
              ...parentKeys,
              item.path
            ]);
          } else {
            this.getMenuData(
              item.children,
              selectedKey ? parentKeys : [...parentKeys, item.path],
              selectedKey || item.path
            );
          }
          menuData.push(newMenu);
        } else if (
          item.children &&
          !item.hideInMenu &&
          !item.hideInChildrenMenu
        ) {
          menuData.push(
            ...this.getMenuData(item.children, [...parentKeys, item.path])
          );
        }
      }
      return menuData;
    }
  }
};
</script>
