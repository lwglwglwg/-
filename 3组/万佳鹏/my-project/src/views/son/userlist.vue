<template>
    <div>
        <headeo :one="'用户管理'" :two="'用户列表'" />
        <el-card class="box-card">
            <div class="earch">
                <el-input placeholder="请输入内容" v-model="from.query" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search" @click="each"></el-button>
                </el-input>
                <el-button type="primary" @click="useradd">添加用户</el-button>
            </div>
            <template>
                <el-table :data="list" border style="width: 100%">
                    <el-table-column type="index" width="50" label="#">
                    </el-table-column>
                    <el-table-column prop="username" label="姓名">
                    </el-table-column>
                    <el-table-column prop="email" label="邮箱">
                    </el-table-column>
                    <el-table-column prop="mobile" label="电话">
                    </el-table-column>
                    <el-table-column prop="role_name" label="角色">
                    </el-table-column>
                    <el-table-column prop="address" label="状态">
                        <template slot-scope="scope">
                            <el-switch @change="edittype(scope.row)" v-model="scope.row.mg_state" active-color="#409EFF" inactive-color="#DCDFE6">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column prop="address" label="操作">
                        <template slot-scope="scope">
                            <el-button type="primary" icon="el-icon-edit" circle @click="edit(scope.row)"></el-button>
                            <el-button type="danger" icon="el-icon-delete" circle @click="del(scope.row.id)"></el-button>
                            <el-button type="warning" icon="el-icon-setting" circle @click="editjue(scope.row)"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
            <div>
                <el-pagination :page-sizes="[2,5,10,15]" :page-size="from.pagesize" :pager-count="5" layout="total, sizes, prev, pager, next, jumper" :total="total" :current-page="from.pagenum" @size-change="editpagesize" @current-change="editpagenum">
                </el-pagination>
            </div>
        </el-card>
        <el-dialog :title="title" :visible.sync="flag" width="50%">
            <userpage :flag="flag" :title="title" @no="flag=false" @adduser="addusers" :editde="editde" @edituser="edituser" @editrole="editrole"></userpage>
        </el-dialog>
    </div>
</template>
<script>
import { users, types, adduser, edituse, deluse, cole } from "@/api/user";
import headeo from "@/components/headeo";
import userpage from "@/components/userpage";
export default {
  components: { headeo, userpage },
  /* 耶斯莫拉 */
  data() {
    return {
      title: "添加用户",
      from: {
        query: "",
        pagenum: 1,
        pagesize: 5
      },
      flag: false,
      list: [],
      total: 0,
      editde: {},
    };
  },
  methods: {
    async lists() {
      let { data: data } = await users(this.from);
      this.list = data.data.users;
      console.log(data);
      this.total = data.data.total;
    },
    async addusers(item) {
      let { data: data } = await adduser(item);
      console.log(data);
      if ((data.meta.status = 200)) {
        this.$message.success("添加用户成功");
        this.flag = false;
      } else {
        this.$message.error("添加用户失败");
      }
      this.lists();
    },
    async edituser(item) {
      let { data: data } = await edituse({
        id: item.id,
        email: item.email,
        mobile: item.mobile
      });
      if ((data.meta.status = 200)) {
        this.$message.success("修改用户成功");
        this.flag = false;
      } else {
        this.$message.error("修改用户失败");
      }
      this.lists();
    },
    async editrole(item) {
      if (item.rid == "") {
        this.$message.error("请选择角色");
        return false;
      } else {
        let { data: data } = await cole(item);
        if ((data.meta.status = 200)) {
          this.$message.success(data.meta.msg);
          this.flag = false;
        } else {
          this.$message.error(data.meta.msg);
        }
        this.flag=false
        this.lists()
      }
    },
    editjue(item) {
      this.title = "分配角色";
      this.editde = {
        id: item.id,
        username: item.username,
        role_name: item.role_name
      };
      this.flag = true;
    },
    del(i) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let { data: data } = await deluse({ id: i });
          console.log(data);
          if (data.meta.status == 200) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          } else {
            this.$message({
              type: "error",
              message: "删除失败!"
            });
          }
          this.lists();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    edit(item) {
      this.flag = true;
      this.title = "修改用户信息";
      this.editde = {
        username: item.username,
        id: item.id,
        email: item.email,
        mobile: item.mobile
      };
    },
    useradd() {
      this.editde = {};
      this.flag = true;
      this.title = "添加用户";
    },
    editpagesize(i) {
      this.from.pagesize = i;
      this.lists();
    },
    editpagenum(i) {
      this.from.pagenum = i;
      this.lists();
    },
    async edittype(item) {
      let { data: data } = await types({
        id: item.id,
        type: item.mg_state
      });
      if (data.meta.status == 200) {
        this.$message.success("状态更新成功");
        this.lists();
      } else {
        this.$message.error("状态更新失败");
      }
      console.log(data);
    },
    each() {
      this.lists();
    }
  },
  created() {
    this.lists();
  },
  watch: {
    flag(val) {
      this.edited = {};
    }
  }
};
</script>
<style lang="scss" scoped>
/* 样式 */
.box-card {
  width: 100%;
  margin-top: 15px;
}
.earch {
  display: flex;
  margin-bottom: 15px;
  .input-with-select {
    width: 25%;
    margin-right: 15px;
  }
}
</style>


