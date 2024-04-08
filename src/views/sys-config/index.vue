<template>
  <div>
    <span>首页公告配置</span>
    <div style="height: 100px; background-color: blueviolet">
      <span>当前的公告：{{ announcement }}</span>

      <el-input
        v-model="newAannouncement"
        placeholder="请输入新公告内容"
      ></el-input>
      <el-button type="primary" @click="updateAannouncement">修改</el-button>
    </div>

    <span>轮播图配置</span>
    <div style="height: 100px; background-color: bisque">
    <span>当前轮播图链接：</span>
    <!-- 点击链接显示轮播图详细信息 -->
    <a href="https://www.baidu.com" >1</a>
    </div>

    <span>置顶商品配置</span>
    <div style="height: 100px; background-color: aqua"></div>
  </div>
</template>


<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "sys-config",
  data() {
    return {
      announcement: "这是旧公告",
      newAannouncement: "这是新公告",
     
    };
  },
  methods: {
    
  },
});
</script>

<style scoped>
</style>
