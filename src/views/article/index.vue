<template>
  <div class="container">
    <!-- 用户列表，分页显示，每页10条 -->

    <div class="top">
      <el-button type="primary" @click="addArticle">添加文章</el-button>
    </div>
    <el-table :data="articleList" max-height="600"
    :default-sort="{ prop: 'publishDate', order: 'descending' }"
    >
      <el-table-column
        type="index"
        label="序号"
        width="60"
        fixed=""
      ></el-table-column>
      <el-table-column prop="id" width="200" label="ID"> </el-table-column>

      <el-table-column prop="userId" label="用户id"> </el-table-column>

      <el-table-column width="200" prop="publishDate" label="发布日期">
      </el-table-column>

      <el-table-column prop="modifyDate" label="修改日期" width="200">
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
      <el-table-column label="操作" width="200" fixed="right">
        <template v-slot="scope">
          <el-button type="info" @click="viewArticle(scope.$index)"
            >查看</el-button
          >
          <el-dropdown>
            <el-button type="primary"> 操作 </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="viewArticle(scope.$index, 'edit')"
                  >编辑</el-dropdown-item
                >
                <el-dropdown-item @click="banArticle(scope.$index)">{{
                  scope.row.status === 0 ? "重新上架" : "下架"
                }}</el-dropdown-item>
                <el-dropdown-item @click="removeArticle(scope.$index)"
                  >删除</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </el-table-column>
      <!-- <el-table-column>
        <template #header>
          <el-input
            v-model="search"
            size="small"
            type="button"
            placeholder="Type to search"
          />
        </template>
      </el-table-column> -->
    </el-table>

    <!-- 显示和编辑商品的模态框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="(edit ? '编辑' : '查看') + '商品数据'"
      width="500"
      :before-close="handleClose"
    >
      <!-- TODO 问题来了,这里为什么会多出两项空白项出来呢? -->
      <el-input
        v-for="(item, index) in articleList"
        :key="item.id"
        v-model="viewArticleData[Object.keys(item)[index]]"
        :disabled="!edit || disabled(index)"
        class="articleinfo-input"
      >
        <template #prepend>
          <span class="articleinfo-prefix">{{ Object.keys(item)[index] }}</span>
        </template>
      </el-input>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="doneEditArticle">
            Confirm
          </el-button>
        </div>
      </template>
    </el-dialog>

    <div class="bottom">
      <el-pagination
        :total="articleList.length"
        layout="prev ,pager ,next"
        @current-change="changePage"
        @prev-click="prePage"
        @next-click="nextPage"
      ></el-pagination>
    </div>
  </div>
</template>
  
  <script>
import { defineComponent } from "vue";
import {
  fetchList,
  updateArticle,
  deleteArticle,
  createArticle,
} from "@/api/article";
import { toRaw } from "@vue/reactivity";

export default defineComponent({
  name: "article",
  data() {
    return {
      name: "article",
      defaultAvatar: "/src/static/png/Vue.png",
      articleList: [
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
      viewArticleData: {},
      pageQuery: {
        page: 0,
        size: 10,
      },
      show: false,
      dialogVisible: false,
      edit: false,
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
    viewArticle(index, edit) {
      this.edit = edit;
      this.viewArticleData = JSON.parse(
        JSON.stringify(this.articleList[index])
      );

      // TODO 显示商品信息弹窗
      this.dialogVisible = true;
    },
    doneEditArticle() {
      if (this.edit === "edit") {
        updateArticle(toRaw(this.viewArticleData))
          .then((result) => {
            this.dialogVisible = false;
            this.queryArticleList();
          })
          .catch((err) => {
            ElMessage.error(err)
          });
      } else if (this.edit === "add") {
        createArticle(toRaw(this.viewArticleData))
          .then((result) => {
            console.log(result.data);
            this.dialogVisible = false;
            this.queryArticleList();
          })
          .catch((err) => {
            ElMessage.error(err)
          });
      }
    },
    banArticle(index) {
      const article = JSON.parse(JSON.stringify(this.articleList[index]));
      artilce.status ^= 1;
      updateArticle(article)
        .then((result) => {
          this.dialogVisible = false;
          this.queryArticleList();
        })
        .catch((err) => {
          ElMessage.error(err)
        });
    },
    removeArticle(index) {
      deleteArticle({ id: this.articleList[index].id })
        .then((result) => {
          this.queryArticleList();
        })
        .catch((err) => {
          ElMessage.error(err)
        });
    },

    queryArticleList() {
      fetchList(this.pageQuery)
        .then((result) => {
          const { data } = result;
          this.articleList = data.content;
        })
        .catch((err) => {
          ElMessage.error(err)
        });
    },

    disabled(index) {
      const name = Object.keys(this.articleList[index])[index];
      return !this.edit || name.includes("Date") || name === "id";
    },
    // handleClose(){

    // }
    addArticle() {
      this.dialogVisible = true;
      this.edit = "add";
    },
  },
  mounted() {
    this.queryArticleList();
  },
});
</script>
  
  <style scoped>
.container {
  width: 100%;
}
.top {
  text-align: center;
  margin: 10px;
}
.bottom {
  display: flex;
  justify-content: center;
  /* text-align: center; */
  /* margin: auto; */
}

.articleinfo-prefix {
  width: 80px;
}
.articleinfo-input {
  margin-bottom: 2px;
}
</style>
  