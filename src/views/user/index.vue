<template>
  <div class="container">
    <div class="top"><el-button type="primary" @click="addUser()">添加用户</el-button></div>
    <!-- 用户列表，分页显示，每页10条 -->
    <el-table :data="userList">
      <el-table-column
        width="60"
        type="index"
        label="序号"
        fixed=""
      ></el-table-column>
      <el-table-column prop="id" label="ID"> </el-table-column>

      <el-table-column prop="nickname" label="昵称"> </el-table-column>

      <el-table-column prop="phone" label="电话"> </el-table-column>

      <el-table-column prop="registerDate" label="注册日期" width="200">
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
      <el-table-column prop="status" label="状态"> </el-table-column>
      <el-table-column label="操作" width="200">
        <template v-slot="scope">
          <div class="doSome">
            <el-button type="info" @click="viewUser(scope.$index)"
              >查看</el-button
            >
            <!-- <el-button type="danger" @click="viewUser(scope.$index, true)"
            >操作</el-button> -->
            <el-dropdown>
              <el-button type="primary"> 操作 </el-button>

              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="viewUser(scope.$index, 'edit')"
                    >编辑</el-dropdown-item
                  >
                  <el-dropdown-item @click="banUser(scope.$index)">{{
                    scope.row.status === 0 ? "解封" : "封禁"
                  }}</el-dropdown-item>
                  <el-dropdown-item @click="removeUser(scope.$index)"
                    >删除</el-dropdown-item
                  >
                  <el-dropdown-item disabled>Action 4</el-dropdown-item>
                  <el-dropdown-item divided>Action 5</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
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
    <el-dialog
      v-model="dialogVisible"
      :title="viewUserTitle"
      width="500"
      :before-close="handleClose"
    >
      <el-input
        v-model="editUser.nickname"
        :disabled="!edit"
        class="userinfo-input"
      >
        <template #prepend>
          <span class="userinfo-prefix">nickname</span>
        </template>
      </el-input>
      <el-input v-if="edit==='add'"
        v-model="editUser.password"
        :disabled="!edit"
        class="userinfo-input"
      >
        <template #prepend>
          <span class="userinfo-prefix">password</span>
        </template>
      </el-input>

      <el-input
        v-model="editUser.phone"
        type="number"
        :disabled="!edit"
        class="userinfo-input"
      >
        <template #prepend>
          <span class="userinfo-prefix">phone</span>
        </template>
      </el-input>
      <el-input v-model="editUser.sex" :disabled="!edit" class="userinfo-input">
        <template #prepend>
          <span class="userinfo-prefix">sex</span>
        </template>
      </el-input>
      <el-input
        v-model="editUser.avatar"
        :disabled="!edit"
        class="userinfo-input"
      >
        <template #prepend>
          <span class="userinfo-prefix">avatar</span>
        </template>
      </el-input>
      <el-input
        v-model="editUser.address"
        :disabled="!edit"
        class="userinfo-input"
      >
        <template #prepend>
          <span class="userinfo-prefix">address</span>
        </template>
      </el-input>

      <el-input
        v-model="editUser.studentId"
        type="number"
        class="userinfo-input"
        :disabled="!edit"
      >
        <template #prepend>
          <span class="userinfo-prefix">studentId</span>
        </template>
      </el-input>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="doneEditUser"> Confirm </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { getUserList, editUser, removeUser, addUser } from "@/api/user";
import { ArrowDown } from "@element-plus/icons-vue";
import { toRaw } from "@vue/reactivity";

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
      queryParams: {
        page: 0,
        size: 10,
      },
      dialogVisible: false,
      editUser: {}, //待编辑的用户信息
    };
  },
  computed:{
    viewUserTitle(){
      return (this.edit==='edit' ? '编辑' :this.edit==='add'? '添加':'查看') + '用户数据'
    }
  },

  methods: {
    changePage(pageNum) {
      alert("跳转到页面:" + pageNum);
      this.queryParams.page = pageNum;
    },
    prePage() {
      alert("上一页");
    },
    nextPage() {
      alert("下一页");
    },
    updateLocalUser() {
      this.userList = this.userList.map((user) => {
        if (user.id === this.editUser.id) {
          return this.editUser;
        }
        return user;
      });

      //clear editUser
      this.editUser = {};
    },
    viewUser(index, edit) {
      console.log(index);

      this.edit = edit;

      this.editUser = this.userList[index];

      // TODO 显示用户信息弹窗
      this.editUser = JSON.parse(JSON.stringify(this.userList[index]));
      this.dialogVisible = true;
    },
    banUser(index) {
      this.editUser = JSON.parse(JSON.stringify(this.userList[index]));
      this.editUser.status ^= 1;
      editUser(toRaw(this.editUser))
        .then((result) => {
          const { data, statusCode } = result;
          console.log(data);
          this.updateLocalUser();
        })
        .catch((err) => {});
    },
    removeUser(index) {
      console.log("删除用户");
      console.log(this.userList[index].id);

      removeUser({ id: this.userList[index].id })
        .then((result) => {
          const { data } = result;
          console.log(data);
          this.getUserList();
        })
        .catch((err) => {});
    },
    doneEditUser() {
      if (this.edit === "edit")
        //上传
        editUser(toRaw(this.editUser))
          .then((result) => {
            const { data, statusCode } = result;
            if (statusCode === 200) {
              alert("修改成功！");
              console.log(data);
              this.dialogVisible = false;
              //更新本地用户信息
              this.updateLocalUser();
            }
          })
          .catch((err) => {});
      else if (this.edit === "add") {
        addUser(toRaw(this.editUser))
          .then((result) => {
            //添加成功
            this.getUserList();
            this.dialogVisible = false;
            this.editUser = {};
          })
          .catch((err) => {
            ElMessage.error(err);
          });
      }
    },
    getUserList() {
      getUserList(this.queryParams)
        .then((result) => {
          const { data } = result;
          this.userList = data.content;
          console.log(data.content);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    addUser() {
      this.edit = "add";
      this.dialogVisible = true;
    },
  },
  mounted() {
    this.getUserList();
  },
});
</script>



<style scoped>
.container {
  width: 100%;
}
.top{
  margin: 10px;
  text-align: center
}
.bottom {
  display: flex;
  justify-content: center;
  /* text-align: center; */
  /* margin: auto; */
}
.el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}

.doSome {
  display: flex;
}

.userinfo-input {
  margin-bottom: 5px;
}
.userinfo-prefix {
  width: 60px;
}
</style>
