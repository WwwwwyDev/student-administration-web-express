<template>
  <div class="app-container">
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="4">
            <el-input
              placeholder="请输入查找的用户名"
              v-model.lazy="usernameSearchInput"
              clearable
            >
            </el-input>
          </el-col>
          <el-col :span="1" :offset="0" style="padding-left: 10px">
            <el-button
              icon="el-icon-search"
              circle
              @click="searchUsername"
            ></el-button>
          </el-col>
          <el-col :span="1" :offset="1">
            <el-button type="primary" @click="openAddDialog" round
              >添加用户</el-button
            >
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-table
          v-loading="loading"
          :data="usersInfo"
          element-loading-text="Loading"
          border
          fit
          highlight-current-row
          ><el-table-column label="头像" align="center">
            <template slot-scope="scope">
              <el-avatar :size="50" :src="scope.row.avatar | avatarFilter"></el-avatar>
            </template>
          </el-table-column>
          <el-table-column label="用户名">
            <template slot-scope="scope">
              <span>{{ scope.row.username }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150" fixed="right">
            <template slot-scope="scope">
              <el-popconfirm
                title="确定删除吗?"
                @onConfirm="deleteRow(scope.row.id)"
                icon="el-icon-info"
                icon-color="red"
              >
                <el-button
                  slot="reference"
                  type="danger"
                  icon="el-icon-delete"
                  circle
                ></el-button>
              </el-popconfirm>
              <el-button
                type="primary"
                icon="el-icon-edit"
                circle
                @click="
                  openEditDialog(
                    scope.row.id,
                    scope.row.username,
                    scope.row.avatar
                  )
                "
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <el-footer>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[5, 10, 20, 100]"
          :page-size="limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </el-footer>
    </el-container>
    <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="500px">
      <el-form
        :model="addForm"
        :rules="FormRules"
        ref="addForm"
        label-width="90px"
        @submit.native.prevent
      >
        <el-form-item label="用户账号" prop="username">
          <el-input
            placeholder="请输入账号"
            v-model="addForm.username"
            clearable
          >
          </el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="password">
          <el-input
            placeholder="请输入密码"
            v-model="addForm.password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="用户头像">
          <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :auto-upload="false"
            :on-change="changePhotoFile"
          >
            <img v-if="addForm.avatar" :src="addForm.avatar | avatarFilter" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <imageCropper ref="imageCropper" @getFile="getAddFile"></imageCropper>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAddForm">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="编辑用户" :visible.sync="editDialogVisible" width="500px">
      <el-form
        :model="editForm"
        :rules="FormRules"
        ref="editForm"
        label-width="90px"
        @submit.native.prevent
      >
        <el-form-item label="用户账号">
          <el-input placeholder="" v-model="editForm.username" :disabled="true">
          </el-input>
        </el-form-item>
        <el-form-item label="修改密码" prop="password">
          <el-input
            placeholder="请输入密码"
            v-model="editForm.password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="用户头像">
          <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :auto-upload="false"
            :on-change="changePhotoFile"
          >
            <img v-if="editForm.avatar" :src="editForm.avatar | avatarFilter" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <imageCropper
            ref="imageCropper"
            @getFile="getEditFile"
          ></imageCropper>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEditForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getUsers, addUser, deleteUser, updateUser } from "@/api/user";
import imageCropper from "@/components/ImageCropper";
export default {
  components: {
    imageCropper,
  },
  filters: {
    avatarFilter(avatar) {
      if(/^(http|https):\/\/[\s\S]*/.test(avatar)) return avatar
      if(/^(data):[\s\S]*/.test(avatar)) return avatar
      return process.env.VUE_APP_BASE_API + "/upload/" + avatar
    }
  },
  data() {
    return {
      usersInfo: null,
      loading: true,
      page: 1,
      limit: 5,
      usernameSearchInput: "",
      total: -1,
      addDialogVisible: false,
      addForm: {
        username: "",
        password: "",
        avatar: "",
      },
      editDialogVisible: false,
      editForm: {
        id: 0,
        username: "",
        password: "",
        avatar: "",
      },
      FormRules: {
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
          {
            pattern: /^(?=.*\d)(?=.*[a-zA-Z])[\da-zA-Z~!@#$%^&*]{6,18}$/,
            message: "密码不合法",
            trigger: "blur",
          },
        ],
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
          {
            min: 6,
            max: 12,
            message: "用户名长度应在6-12字符之间",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.fetchData({
      page: this.page,
      limit: this.limit,
      username: this.usernameSearchInput,
    });
  },
  methods: {
    async fetchData({ page, limit, username }) {
      this.loading = true;
      let res = await getUsers(page, limit, username);
      this.usersInfo = res.data.users;
      this.total = res.data.total;
      this.loading = false;
    },
    searchUsername() {
      this.fetchData({
        page: 1,
        limit: this.limit,
        username: this.usernameSearchInput,
      });
      this.page = 1;
    },
    handleSizeChange(limit) {
      this.fetchData({
        page: this.page,
        limit: limit,
        username: this.usernameSearchInput,
      });
      this.limit = limit;
    },
    handleCurrentChange(page) {
      this.fetchData({
        page: page,
        limit: this.limit,
        username: this.usernameSearchInput,
      });
      this.page = page;
    },
    async deleteRow(id) {
      let res = await deleteUser(id);
      this.$message({
        message: res.msg,
        type: "success",
      });
      this.fetchData({
        page: this.page,
        limit: this.limit,
        username: this.usernameSearchInput,
      });
    },
    clearAddForm() {
      this.addForm.avatar ="";
      this.addForm.username = "";
      this.addForm.password = "";
    },
    clearEditForm() {
      this.editForm.avatar = "";
      this.editForm.username = "";
      this.editForm.password = "";
    },
    openAddDialog() {
      this.clearAddForm();
      this.addDialogVisible = true;
    },
    openEditDialog(id, username, avatar, info) {
      this.clearEditForm();
      this.editForm.id = id;
      this.editForm.avatar = avatar;
      this.editForm.username = username;
      this.editForm.password = "";
      this.editDialogVisible = true;
    },
    submitAddForm() {
      this.$refs["addForm"].validate(async (valid) => {
        if (valid) {
          let res = await addUser(this.addForm);
          if (res.code === 200)
            this.$message({
              message: res.msg,
              type: "success",
            });
          this.addDialogVisible = false;
          this.fetchData({
            page: this.page,
            limit: this.limit,
            username: this.usernameSearchInput,
          });
        }
      });
    },
    submitEditForm() {
      this.$refs["editForm"].validate(async (valid) => {
        if (valid) {
        let res = await updateUser(this.editForm);
        if (res.code === 200)
          this.$message({
            message: res.msg,
            type: "success",
          });
        this.editDialogVisible = false;
        this.fetchData({
          page: this.page,
          limit: this.limit,
          username: this.usernameSearchInput,
        });
        }
      });
      
    },
    changePhotoFile(file, fileList) {
      if (fileList.length > 0) {
        this.photoList = [fileList[fileList.length - 1]];
      }
      var size = file.raw.size;
      var type = file.raw.type;
      if (type != "image/jpeg" && type != "image/jpg" && type != "image/png") {
        this.$message({
          message: "仅支持上传jpg、jpeg、png图片",
          type: "error",
        });
        return;
      }
      let sizeKB = 200;
      if (size > 1024 * sizeKB) {
        this.$message({
          message: `图片不能超过${sizeKB}k`,
          type: "error",
        });
        return;
      }
      this.handleCrop(file);
    },
    //file:原图
    handleCrop(file) {
      this.$nextTick(() => {
        this.$refs.imageCropper.open(file.raw || file);
      });
    },
    //file:裁剪后的图
    async getAddFile(file) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      var _this = this
      reader.onload = function () {
        _this.addForm.avatar = reader.result
      };
      // this.addForm.avatar = window.URL.createObjectURL(file);
      this.$refs.imageCropper.close();
    },
    //file:裁剪后的图
    async getEditFile(file) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      var _this = this
      reader.onload = function () {
        _this.editForm.avatar = reader.result
      };
      // this.editForm.avatar = window.URL.createObjectURL(file);
      this.$refs.imageCropper.close();
    },
  },
};
</script>
<style >
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border-radius: 50%;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
  border-radius: 50%;
}
</style>
