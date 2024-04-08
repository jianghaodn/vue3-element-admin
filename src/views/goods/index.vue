<template>
  <div class="container">
    <!-- 用户列表，分页显示，每页10条 -->
    <el-table :data="goodsList" max-height="550">
      <el-table-column type="index" label="序号" fixed=""></el-table-column>
      <el-table-column width="200" prop="id" label="ID"> </el-table-column>

      <el-table-column prop="price" label="价格"> </el-table-column>

      <el-table-column width="200" prop="publishDate" label="发布日期">
      </el-table-column>

      <el-table-column width="200" prop="modifyDate" label="修改日期">
      </el-table-column>

      <el-table-column prop="description" label="描述"> </el-table-column>

      <el-table-column prop="viewCount" label="浏览量"> </el-table-column>
      <el-table-column prop="title" label="标题"> </el-table-column>
      <el-table-column prop="count" label="数量"> </el-table-column>
      <el-table-column prop="userId" label="用户"> </el-table-column>
      <el-table-column prop="status" label="状态"> </el-table-column>

      <el-table-column label="pics">
        <template v-slot="scope">
          <el-avatar
            :src="scope.row.pics || '/src/static/png/defaultAvatar.png'"
          ></el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template v-slot="scope">
          <el-button type="info" @click="viewGoods(scope.$index)"
            >查看</el-button
          >
          <el-dropdown>
            <el-button type="primary"> 操作 </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="viewGoods(scope.$index, true)"
                  >编辑</el-dropdown-item
                >
                <el-dropdown-item @click="banGoods(scope.$index)">{{
                  scope.row.status === 0 ? "重新上架" : "下架"
                }}</el-dropdown-item>
                <el-dropdown-item @click="removeGoods(scope.$index)"
                  >删除</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>

    <div class="bottom">
      <el-pagination
        :total="goodsList.length"
        layout="prev ,pager ,next"
        @current-change="changePage"
        @prev-click="prePage"
        @next-click="nextPage"
      ></el-pagination>
    </div>
    <!-- 显示和编辑商品的模态框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="(edit ? '编辑' : '查看') + '商品数据'"
      width="500"
      :before-close="handleClose"
    >
      <!-- TODO 问题来了,这里为什么会多出两项空白项出来呢? -->
      <el-input
        v-for="(item, index) in goodsList"
        :key="item.id"
        v-model="viewGoodsData[Object.keys(item)[index]]"
        :disabled="!edit"
        class="goodsinfo-input"
      >
        <template #prepend>
          <span class="goodsinfo-prefix">{{ Object.keys(item)[index] }}</span>
        </template>
      </el-input>
      <!-- <el-input
        v-model="viewGoodsData.id"
        :disabled="!edit"
        class="goodsinfo-input"
      >
        <template #prepend>
          <span class="goodsinfo-prefix">ID</span>
        </template>
      </el-input>
      <el-input
        v-model="viewGoodsData.price"
        type="number"
        :disabled="!edit"
        class="goodsinfo-input"
      >
        <template #prepend>
          <span class="goodsinfo-prefix">price</span>
        </template>
      </el-input>
      <el-input
        v-model="viewGoodsData.publishDate"
        :disabled="!edit"
        class="goodsinfo-input"
      >
        <template #prepend>
          <span class="goodsinfo-prefix">发布日期</span>
        </template>
      </el-input>
      <el-input
        v-model="viewGoodsData.modifyDate"
        :disabled="!edit"
        class="goodsinfo-input"
      >
        <template #prepend>
          <span class="goodsinfo-prefix">修改日期</span>
        </template>
      </el-input>
      <el-input
        v-model="viewGoodsData.description"
        :disabled="!edit"
        class="goodsinfo-input"
      >
        <template #prepend>
          <span class="goodsinfo-prefix">描述</span>
        </template>
      </el-input>
      <el-input
        v-model="viewGoodsData.viewCount"
        :disabled="!edit"
        class="goodsinfo-input"
      >
        <template #prepend>
          <span class="goodsinfo-prefix">浏览量</span>
        </template>
      </el-input>
      <el-input
        v-model="viewGoodsData.title"
        :disabled="!edit"
        class="goodsinfo-input"
      >
        <template #prepend>
          <span class="goodsinfo-prefix">标题</span>
        </template>
      </el-input>
      <el-input
        v-model="viewGoodsData.count"
        :disabled="!edit"
        class="goodsinfo-input"
      >
        <template #prepend>
          <span class="goodsinfo-prefix">数量</span>
        </template>
      </el-input>
      <el-input
        v-model="viewGoodsData.userId"
        :disabled="!edit"
        class="goodsinfo-input"
      >
        <template #prepend>
          <span class="goodsinfo-prefix">用户</span>
        </template>
      </el-input>

      <el-input
        v-model="viewGoodsData.status"
        type="number"
        class="goodsinfo-input"
        :disabled="!edit"
      >
        <template #prepend>
          <span class="goodsinfo-prefix">状态</span>
        </template>
      </el-input>
      <el-input
        v-model="viewGoodsData.status"
        type="number"
        class="goodsinfo-input"
        :disabled="!edit"
      >
        <template #prepend>
          <span class="goodsinfo-prefix">状态</span>
        </template>
      </el-input>

      <el-input
        v-model="viewGoodsData.pics"
        type="number"
        class="goodsinfo-input"
        :disabled="!edit"
      >
        <template #prepend>
          <span class="goodsinfo-prefix">图片</span>
        </template>
      </el-input>
      <el-input
        v-model="viewGoodsData.address"
        type="number"
        class="goodsinfo-input"
        :disabled="!edit"
      >
        <template #prepend>
          <span class="goodsinfo-prefix">地址</span>
        </template>
      </el-input> -->
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="doneEditGoods"> Confirm </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
  
  <script>
import { defineComponent } from "vue";
import { getGoodsList, updateGoods, removeGoods } from "@/api/goods";

import { toRaw } from "@vue/reactivity";

export default defineComponent({
  name: "user",
  data() {
    return {
      name: "Goods",
      defaultAvatar: "/src/static/png/Vue.png",
      goodsList: [
        {
          id: "1",
          price: 12.2,
          publishDate: new Date(),
          modifyDate: new Date(),
          description: "1123",
          viewCount: 1,
          title: "车厘子",
          count: 1,
          userId: "123",
          pics: "",
          status: 1, //1代表在售
        },
      ], //商品列表数据
      edit: false, //编辑数据
      viewGoodsData: {},
      pageQuery: {
        page: 0,
        size: 10,
      },
      dialogVisible: false,
    };
  },

  methods: {
    changePage(pageNum) {
      // alert("跳转到页面:" + pageNum);
      this.pageQuery.page = pageNum;
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
      this.viewGoodsData = JSON.parse(JSON.stringify(this.goodsList[index]));
      this.dialogVisible = true;

      // TODO 显示商品信息弹窗
    },
    doneEditGoods() {
      if (this.edit) {
        //上传
        updateGoods(toRaw(this.viewGoodsData))
          .then((result) => {
            const { data } = result;
            console.log(data);
            this.dialogVisible = false
            this.queryGoodsList()
          })
          .catch((err) => {});
      } else {
        this.dialogVisible = false;
      }
    },
    queryGoodsList() {
      getGoodsList(this.pageQuery)
        .then((result) => {
          const { data } = result;
          this.goodsList = data.content;
        })
        .catch((err) => {});
    },
    banGoods(index) {
      const goods = JSON.parse(JSON.stringify(this.goodsList[index]))

      goods.status ^=1
      updateGoods(goods)
          .then((result) => {
            const { data } = result;
            console.log(data);
            this.queryGoodsList()
          })
          .catch((err) => {});
    },
    removeGoods(index) {
      removeGoods({id:this.goodsList[index].id}).then((result) => {
        console.log(result.data);
        this.queryGoodsList()
        
      }).catch((err) => {
        
      });
    },
  },
  mounted() {
    this.queryGoodsList()
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

.goodsinfo-input {
  margin-bottom: 2px;
}
.goodsinfo-prefix {
  width: 60px;
}
</style>
  