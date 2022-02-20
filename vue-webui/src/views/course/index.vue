<template>
  <div class="app-container">
    <el-container>
      <el-header>
        <el-col :span="3">
          <el-input
            placeholder="搜索课程号"
            v-model.lazy="searchNumInput"
            clearable
          >
          </el-input>
        </el-col>
        <el-col :span="3" :offset="1">
          <el-input
            placeholder="搜索课程名"
            v-model.lazy="searchNameInput"
            clearable
          >
          </el-input>
        </el-col>
        <el-col :span="3" :offset="1">
          <el-input
            placeholder="搜索教师"
            v-model.lazy="searchTeacherInput"
            clearable
          >
          </el-input>
        </el-col>
        <el-col :span="1" :offset="0" style="padding-left: 10px">
          <el-button icon="el-icon-search" circle @click="search"></el-button>
        </el-col>
        <el-col :span="1" :offset="1">
          <el-button type="primary" @click="openAddDialog" round
            >添加课程</el-button
          >
        </el-col>
      </el-header>
      <el-main>
        <el-table
          v-loading="listLoading"
          :data="list"
          element-loading-text="Loading"
          border
          fit
          highlight-current-row
        >
          <!--          <el-table-column align="center" label="ID" width="95">
            <template slot-scope="scope">
              {{ scope.row.id }}
            </template>
          </el-table-column> -->
          <el-table-column label="课程号" width="300" align="center">
            <template slot-scope="scope">
              <el-tag type="success">{{ scope.row.course_num }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="课程名" width="200" align="center">
            <template slot-scope="scope">
              {{ scope.row.course_name }}
            </template>
          </el-table-column>
          <el-table-column label="教师">
            <template slot-scope="scope">
              <span>{{ scope.row.course_teacher }}</span>
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
                @click="
                  openEditDialog(
                    scope.row.id,
                    scope.row.course_num,
                    scope.row.course_name,
                    scope.row.course_teacher
                  )
                "
                circle
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
    <el-dialog title="添加课程" :visible.sync="addDialogVisible" width="500px">
      <el-form
        :model="addForm"
        ref="addForm"
        label-width="90px"
        @submit.native.prevent
        :rules="FormRules"
      >
        <el-form-item label="课程号" prop="num">
          <el-input placeholder="请输入课程号" v-model="addForm.num" clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="课程名">
          <el-input placeholder="请输入课程名" v-model="addForm.name" clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="教师">
          <el-input
            placeholder="请输入教师"
            v-model="addForm.teacher"
            clearable
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAddForm">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="编辑课程" :visible.sync="editDialogVisible" width="500px">
      <el-form
        :model="editForm"
        ref="editForm"
        label-width="90px"
        @submit.native.prevent
        :rules="FormRules"
      >
        <el-form-item label="课程号">
          <el-input placeholder="请输入课程号" v-model="editForm.num" clearable  :disabled="true">
          </el-input>
        </el-form-item>
        <el-form-item label="课程名">
          <el-input placeholder="请输入课程名" v-model="editForm.name" clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="教师">
          <el-input
            placeholder="请输入教师"
            v-model="editForm.teacher"
            clearable
          ></el-input>
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
import {
  getCourses,
  deleteCourse,
  addCourse,
  updateCourse,
} from "@/api/course";

export default {
  data() {
    return {
      searchNumInput: "",
      searchNameInput: "",
      searchTeacherInput: "",
      list: null,
      listLoading: true,
      page: 1,
      limit: 10,
      total: 0,
      temp: {
        id: -1,
        num: "",
        name: "",
        teacher: "",
      },
      addDialogVisible: false,
      addForm: null,
      editDialogVisible: false,
      editForm: null,
      FormRules: {
        num: [
          {
            required: true,
            message: "请输入学号",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.addForm = { ...this.temp, id: undefined };
    this.editForm = { ...this.temp };
    this.refreshAll();
  },
  methods: {
    async fetchData({ page, limit, num, name, teacher }) {
      page = page || this.page;
      limit = limit || this.limit;
      num = num || this.searchNumInput;
      name = name || this.searchNameInput;
      teacher = teacher || this.searchTeacherInput;
      this.listLoading = true;
      let res = await getCourses(page, limit, num, name, teacher);
      let { courses, total } = res.data;
      this.list = courses;
      this.total = total;
      this.listLoading = false;
    },
    handleSizeChange(limit) {
      this.fetchData({
        limit,
      });
      this.limit = limit;
    },
    handleCurrentChange(page) {
      this.fetchData({
        page,
      });
      this.page = page;
    },
    refreshAll() {
      this.fetchData({});
    },
    search() {
      this.fetchData({
        page: 1,
      });
      this.page = 1;
    },
    async deleteRow(id) {
      let res = await deleteCourse(id);
      this.$message({
        message: res.msg,
        type: "success",
      });
      this.refreshAll();
    },
    clearAddForm() {
      this.addForm = { ...this.temp, id: undefined };
    },
    clearEditForm() {
      this.editForm = { ...this.temp };
    },
    openAddDialog() {
      this.clearAddForm();
      this.addDialogVisible = true;
    },
    openEditDialog(id, num, name, teacher) {
      this.clearEditForm();
      this.editForm = { id, num, name,  teacher };
      this.editDialogVisible = true;
    },
    submitAddForm() {
      this.$refs["addForm"].validate(async (valid) => {
        if (valid) {
          let res = await addCourse(this.addForm);
          if (res.code == 200)
            this.$message({
              message: res.msg,
              type: "success",
            });
          this.addDialogVisible = false;
          this.refreshAll();
        }
      });
    },
    submitEditForm() {
      this.$refs["editForm"].validate(async (valid) => {
        if (valid) {
          let res = await updateCourse(this.editForm);
          if (res.code == 200)
            this.$message({
              message: res.msg,
              type: "success",
            });
          this.editDialogVisible = false;
          this.refreshAll();
        }
      });
    },
  },
};
</script>