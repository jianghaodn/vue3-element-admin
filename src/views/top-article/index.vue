<template>
  <div class="container">
    <!-- 用户列表，分页显示，每页10条 -->
    <el-table :data="userList">
      <el-table-column type="index" label="序号" fixed=""></el-table-column>
      <el-table-column prop="id" label="ID"> </el-table-column>

      <el-table-column prop="nickname" label="昵称"> </el-table-column>

      <el-table-column prop="phone" label="电话"> </el-table-column>

      <el-table-column prop="registerDate" label="注册日期" width="400">
      </el-table-column>

      <el-table-column prop="studentId" label="学号"> </el-table-column>

      <el-table-column prop="sex" label="性别"> </el-table-column>

      <el-table-column label="头像">
        <template v-slot="scope">
          <el-avatar
            :src="scope.row.avatar || '/src/static/png/defaultAvatar.png'"
          ></el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
      <el-table-column label="操作" width="200">
        <template v-slot="scope">
          <el-button type="info" @click="viewUser(scope.$index)"
            >查看</el-button
          >
          <el-button type="danger" @click="viewUser(scope.$index, true)"
            >操作</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <div class="bottom">
      <el-pagination
        :total="100"
        layout="prev ,pager ,next"
        @current-change="changePage"
        @prev-click="prePage"
        @next-click="nextPage"
      ></el-pagination>
    </div>
    <!-- 显示和编辑用户的模态框 -->
  </div>
</template>
  
  <script>
import { defineComponent } from "vue";
import {  fetchList } from "@/api/article";
export default defineComponent({
  name: "user",
  data() {
    return {
      name: "张三",
      defaultAvatar: "/src/static/png/Vue.png",
      userList: [
        {
          id: "1",
          nickname: "张三",
          phone: 11111111,
          registerDate: new Date(),
          studentId: 1123,
          sex: 1,
          avatar: "",
          address: "四川省绵阳市涪城区西南科技大学",
        },
        {
          id: "1",
          nickname: "张三",
          phone: 11111111,
          registerDate: new Date(),
          studentId: 1123,
          sex: 1,
          avatar: "",
          address: "四川省绵阳市涪城区西南科技大学",
        },
        {
          id: "1",
          nickname: "张三",
          phone: 11111111,
          registerDate: new Date(),
          studentId: 1123,
          sex: 1,
          avatar: "",
          address: "四川省绵阳市涪城区西南科技大学",
        },
        {
          id: "1",
          nickname: "张三",
          phone: 11111111,
          registerDate: new Date(),
          studentId: 1123,
          sex: 1,
          avatar: "",
          address: "四川省绵阳市涪城区西南科技大学",
        },
      ], //用户列表数据
      edit: false, //编辑数据
      viewUserData: {},
    };
  },

  methods: {
    changePage(pageNum) {
      alert("跳转到页面:" + pageNum);
    },
    prePage() {
      alert("上一页");
    },
    nextPage() {
      alert("下一页");
    },
    viewUser(index, edit) {
      console.log(index);

      this.edit = edit;
      this.viewUserData = this.userList[index];

      // TODO 显示用户信息弹窗
    },
  },
  mounted() {
    fetchList({isTop:true})
      .then((result) => {
        console.log("打印结果");
        console.log(result);
      })
      .catch((err) => {
        console.log("出现错误");
      });
  },
});
</script>
  
  
  
  <style scoped>
.container {
  width: 100%;
}
.bottom {
  display: flex;
  justify-content: center;
  /* text-align: center; */
  /* margin: auto; */
}
</style>
  