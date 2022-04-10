<template>
    <div>
        <headeo :one="'权限管理'" :two="'角色列表'" />
        <el-card class="box-card">
            <div class="header">
                <el-button type="primary" @click="addro">添加角色</el-button>
            </div>
            <template>
                <el-table :data="list" style="width: 100%" border>
                    <!-- 展开视图 -->
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-row :key="tag.id" v-for="tag in props.row.children" class="one">
                                <!-- 一级权限 -->
                                <el-col :span="5" class="one_1">
                                    <el-tag closable :disable-transitions="false" @close="del(tag,props.row)">
                                        {{tag.authName}}
                                    </el-tag>
                                    <i class="el-icon-caret-right"></i>
                                </el-col>
                                <el-col :span="19" class="two">
                                    <el-row :key="tags.id" v-for="tags in tag.children" class="two_son">
                                        <el-col :span="4">
                                            <el-tag @close="del(tags,props.row)" type="success" closable :disable-transitions="false">{{ tags.authName }}</el-tag>
                                            <i class="el-icon-caret-right"></i>
                                        </el-col>
                                        <el-col :span="20">
                                            <el-tag @close="del(tagss,props.row)" class="thre" type="warning" v-for="tagss in tags.children" :key="tagss.id" closable :disable-transitions="false">{{ tagss.authName}}</el-tag>
                                        </el-col>
                                    </el-row>
                                </el-col>
                            </el-row>
                        </template>
                    </el-table-column>
                    <!-- 表格视图 -->
                    <el-table-column label="索引" type="index" width="50">
                    </el-table-column>
                    <el-table-column label="角色名称" prop="roleName">
                    </el-table-column>
                    <el-table-column label="角色描述" prop="roleDesc">
                    </el-table-column>
                    <el-table-column prop="address" label="操作">
                        <template slot-scope="scope">
                            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editroe(scope.row)">编辑</el-button>
                            <el-button type="danger" icon="el-icon-delete" size="mini" @click="delroe(scope.row.id)">删除</el-button>
                            <el-button type="warning" icon="el-icon-setting" size="mini" @click="fenqun(scope.row.id)">分配权限</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </el-card>
        <el-dialog :title="title" :visible.sync="flag" width="40%">
            <div>
                <el-form :model="from" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="角色名称" prop="roleName">
                        <el-input v-model="from.roleName"></el-input>
                    </el-form-item>
                    <el-form-item label="角色描述">
                        <el-input v-model="from.roleDesc"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="resetForm('ruleForm')">取消</el-button>
                        <el-button type="primary" @click="add('ruleForm')" v-if="editId">确定</el-button>
                        <el-button type="primary" @click="editroo('ruleForm')" v-else>确定</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
        <el-dialog title="分配权限" :visible.sync="quanflag" width="60%">
            <div>
                <el-tree :data="quanlist" show-checkbox node-key="id" ref="treeRef" :default-expand-all="true" :default-checked-keys="checkedlist" :props="defaultProps">
                </el-tree>
                <div>
                    <el-button @click="quanflag=false">取消</el-button>
                    <el-button type="primary" @click="addquan">确定</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import {
  roles,
  delrole,
  addrole,
  delro,
  editore,
  treequan,
  addq
} from "@/api/user";
import headeo from "@/components/headeo";
export default {
  components: { headeo },
  data() {
    return {
      id: 0,
      list: [],
      flag: false,
      quanflag: false,
      title: "添加角色",
      from: {
        roleName: "",
        roleDesc: "",
        id: 0
      },
      editId: false,
      quanlist: [],
      rules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" }
        ]
      },
      defaultProps: {
        children: "children",
        label: "authName"
      },
      checkedlist: []
    };
  },
  methods: {
    async role() {
      let { data: data } = await roles();
      this.list = data.data;
      console.log(this.list);
    },
    /* 删除权限 */
    del(item1, item2) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let { data: data } = await delrole({
            roleId: item2.id,
            rightId: item1.id
          });
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
          this.role();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    /* 删除角色 */
    delroe(i) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let { data: data } = await delro({ id: i });
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
          this.role();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    addro() {
      this.title = "添加角色";
      this.editId = true;
      this.flag = true;
    },
    add(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let { data: data } = await addrole(this.from);
          console.log(data);
          if (data.meta.status == 201) {
            this.$message.success("添加角色成功");
          } else {
            this.$message.error("添加角色失败");
          }
          this.flag = false;
          this.editId = false;
          this.from = {};
          this.role();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.editId = false;
      this.flag = false;
      this.from = {};
      this.$refs[formName].resetFields();
    },
    editroe(item) {
      this.title = "编辑角色";
      this.from = {
        roleName: item.roleName,
        roleDesc: item.roleDesc,
        id: item.id
      };
      this.flag = true;
    },
    editroo(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let { data: data } = await editore(this.from);
          if (data.meta.status == 200) {
            this.$message.success("更新角色信息成功");
          } else {
            this.$message.error("更新角色失败");
          }
          this.flag = false;
          this.editId = false;
          this.from = {};
          this.role();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async fenqun(i) {
      this.id = i;
      let is = this.list.findIndex(item => {
        return item.id == i;
      });
      let arr = [];                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
      this.list[is].children.forEach(item => {
        item.children.forEach(ite => {
          ite.children.forEach(it => {
            arr.push(it.id);
          });
        });
      });
      console.log(arr);
      this.checkedlist = arr;
      let { data: data } = await treequan({
        type: "tree"
      });
      console.log(data);
      this.quanflag = true;
      this.quanlist = data.data;
    },
    async addquan() {
      let arr = this.$refs.treeRef.getHalfCheckedKeys();
      let arr1 = this.$refs.treeRef.getCheckedKeys();
      let cont = [...arr, ...arr1];
      let { data: data } = await addq({
        id: this.id,
        rids: cont.join(",")
      });
      if (data.meta.status == 200) {
        this.$message.success("分配权限成功");
      } else {
        this.$message.error("分配权限失败");
      }
      this.quanflag = false;
      this.role();
    }
  },
  created() {
    this.role();
  }
};
</script>
<style lang="scss" scoped>
.box-card {
  width: 100%;
  margin-top: 15px;
}
.header {
  margin-bottom: 15px;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-row {
  display: flex;
  align-items: center;
  margin: 0;
}
.one {
  border-bottom: 1px solid #eee;
  .one_1 {
    padding-left: 15px;
  }
  .two {
    border-left: 1px solid #eee;
    .two_son {
      padding: 15px 0;
      padding-left: 15px;
      border-bottom: 1px solid #eee;
    }
    :last-child {
      border-bottom: none;
    }
  }
}
.one:nth-child(1) {
  border-top: 1px solid #eee;
}
.thre {
  margin-left: 5px;
}
/deep/.el-form-item__content {
  display: flex;
  justify-content: flex-end;
}
</style>


