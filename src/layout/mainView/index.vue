<template>
  <div :class="[`nav-theme-${navTheme}`, `nav-layout-${navLayout}`]">
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
      <a-layout-sider
        v-if="navLayout==='left'"
        :theme="navTheme"
        v-model="collapsed"
        collapsible
        width="210px"
        :trigger="null"
      >
        <div class="logo">LOGO</div>
        <Aside :theme="navTheme" :collapsed.sync="collapsed"/>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0;text-align:left">
          <a-icon
            class="collapsed-logo"
            v-if="navLayout==='left'"
            :type="collapsed?'menu-unfold':'menu-fold'"
            @click="collapsed = !collapsed"
          />
          <Header />
        </a-layout-header>
        <a-layout-content style="margin: 0 16px">
          <router-view></router-view>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          <Footer />
        </a-layout-footer>
      </a-layout>
    </a-layout>
    <Drawer />
  </div>
</template>
<script>
import Header from "./header";
import Footer from "./footer";
import Aside from "./aside";
import Drawer from "@/components/settingDrawer/index";
export default {
  components: { Header, Footer, Aside, Drawer },
  data() {
    return {
      collapsed: false
    };
  },
  computed: {
    navTheme() {
      return this.$route.query.navTheme || "dark";
    },
    navLayout() {
      return this.$route.query.navLayout || "left";
    }
  }
};
</script>
<style lang="less" scoped>
.nav-theme-dark /deep/ .logo {
  color: #fff;
}
.logo {
  height: 64px;
  font-size: 24px;
  text-align: center;
  line-height: 64px;
  &:hover {
    background: #001529;
    color: #fff;
  }
}
.collapsed-logo {
  font-size: 24px;
  padding: 20px;
  &:hover {
    background-color: #cccccc55;
  }
}
</style>