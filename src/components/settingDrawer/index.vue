<template>
  <div>
    <a-drawer
      title="Basic Drawer"
      placement="right"
      :closable="false"
      :visible="visible"
      @close="onClose"
      width="300px"
    >
      <template v-slot:handle>
        <div class="setting-drawer-handle" @click="visible = !visible">
          <a-icon :type="visible ? 'close' : 'setting'"></a-icon>
        </div>
      </template>
      <div>
        <h2>菜单主题</h2>
        <a-radio-group
          :value="$route.query.navTheme||'dark'"
          @change="e=>hanldeSettingChange('navTheme',e.target.value)"
        >
          <a-radio value="dark">黑色</a-radio>
          <a-radio value="light">白色</a-radio>
        </a-radio-group>
        <h2>菜单主题</h2>
        <a-radio-group
          :value="$route.query.navLayout||'left'"
          @change="e=>hanldeSettingChange('navLayout',e.target.value)"
        >
          <a-radio value="left">左侧</a-radio>
          <a-radio value="top">右侧</a-radio>
        </a-radio-group>
      </div>
    </a-drawer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false
    };
  },
  methods: {
    onClose() {
      this.visible = false;
    },
    hanldeSettingChange(type, val) {
      this.$router.push({ query: { ...this.$route.query, [type]: val } });
    }
  }
};
</script>
<style lang="less" scoped>
.setting-drawer-handle {
  position: absolute;
  top: 240px;
  right: 300px;
  width: 48px;
  height: 48px;
  background: #1890ff;
  color: #fff;
  font-size: 20px;
  text-align: center;
  line-height: 48px;
  border-radius: 3px 0 0 3px;
}
</style>