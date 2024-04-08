<template>
    <div class="container">
      <!-- 用户列表，分页显示，每页10条 -->
      <el-table :data="articleList">
        <el-table-column type="index" label="序号" fixed=""></el-table-column>
        <el-table-column prop="id" label="ID"> </el-table-column>
  
        <el-table-column prop="userId" label="用户id"> </el-table-column>
  
        <el-table-column prop="publishDate" label="发布日期"> </el-table-column>
  
        <el-table-column prop="modifyDate" label="修改日期" width="400">
        </el-table-column>
  
        <el-table-column prop="content" label="内容"> </el-table-column>
  
        <el-table-column prop="likeCount" label="喜欢数量"> </el-table-column>
        <el-table-column prop="title" label="标题"> </el-table-column>
        <el-table-column prop="status" label="状态"> </el-table-column>
  
        <el-table-column label="pics">
          <template v-slot="scope">
            <el-avatar
              :src="scope.row.pics || '/src/static/png/defaultAvatar.png'"
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
          :total="articleList.length"
          layout="prev ,pager ,next"
          @current-change="changePage"
          @prev-click="prePage"
          @next-click="nextPage"
        ></el-pagination>
      </div>
      <!-- 显示和编辑商品的模态框 -->
    </div>
  </template>
    
    <script>
  import { defineComponent } from "vue";
  import { getOrderList } from "@/api/order";
  export default defineComponent({
    name: "article",
    data() {
      return {
        name: "Goods",
        defaultAvatar: "/src/static/png/Vue.png",
        articleList: [
          {
            id: "1",
            userId: "123",
            publishDate: new Date(),
            modifyDate: new Date(),
            title: "这是文章",
            cateId: 1,
            content: "车厘子",
            likeCount: 1,
            typeId: "123",
            pics: "",
            status: 1, //1代表正常
          },
          {
            id: "1",
            price: "张三",
            publishDate: 11111111,
            modifyDate: new Date(),
            description: 1123,
            viewCount: 1,
            title: "null",
            count: "四川省绵阳市涪城区西南科技大学",
            userId: "",
            pics: "",
            status: 1, //1代表在售
          },
          {
            id: "1",
            price: "张三",
            publishDate: 11111111,
            modifyDate: new Date(),
            description: 1123,
            viewCount: 1,
            title: "null",
            count: "四川省绵阳市涪城区西南科技大学",
            userId: "",
            pics: "",
            status: 1, //1代表在售
          },
          {
            id: "1",
            price: "张三",
            publishDate: 11111111,
            modifyDate: new Date(),
            description: 1123,
            viewCount: 1,
            title: "null",
            count: "四川省绵阳市涪城区西南科技大学",
            userId: "",
            pics: "",
            status: 1, //1代表在售
          },
          {
            id: "1",
            price: "张三",
            publishDate: 11111111,
            modifyDate: new Date(),
            description: 1123,
            viewCount: 1,
            title: "null",
            count: "四川省绵阳市涪城区西南科技大学",
            userId: "",
            pics: "",
            status: 1, //1代表在售
          },
        ], //商品列表数据
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
      viewGoods(index, edit) {
        console.log(index);
        this.edit = edit;
        this.viewUserData = this.userList[index];
  
        // TODO 显示商品信息弹窗
      },
    },
    mounted() {
      console.log(getOrderList);
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
    