<template>
  <div class="roles">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片         ≥1200px 隐藏-->
    <div class="dd hidden-lg-only"></div>
    <el-card>
      <el-row :gutter="20">
        <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
          <el-button type="primary" @click="adddialogFormVisible = true"
            >添加用户</el-button
          >
        </el-col>
      </el-row>
      <!-- table -->
      <el-table :data="tableData" border="">
        <el-table-column type="expand">
          <!-- 当前行 -->
          <template slot-scope="aa">
            <!-- 1级 -->
            <el-row
              v-for="(item, i1) in aa.row.children"
              :key="item.id"
              :class="[
                'bbottom',
                'bleft',
                'bright',
                'bcenter',
                i1 === 0 ? 'btop' : '',
              ]"
            >
              <el-col :span="5" class="bbcenter">
                <el-tag @close="close_state(aa.row, item.id)" closable>{{
                  item.authName
                }}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="19">
                <!-- 2级3级 -->
                <el-row
                  v-for="(it2, i2) in item.children"
                  :key="it2.id"
                  :class="['bleft', 'bcenter', i2 === 0 ? '' : 'btop']"
                >
                  <el-col :span="6" class="bbcenter">
                    <el-tag
                      @close="close_state(aa.row, it2.id)"
                      type="success"
                      closable
                      >{{ it2.authName }}</el-tag
                    >
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <!-- 3级 -->
                  <el-col :span="18">
                    <el-tag
                      @close="close_state(aa.row, it3.id)"
                      closable
                      type="warning"
                      v-for="it3 in it2.children"
                      :key="it3.id"
                      >{{ it3.authName }}</el-tag
                    >
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index" label="索引"></el-table-column>
        <el-table-column prop="roleName" label="角色名称"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              @click="xiu(scope.row.id)"
              type="primary"
              icon="el-icon-edit"
              size="mini"
              >编辑</el-button
            >
            <el-button
              @click="del(scope.row.id)"
              type="danger"
              icon="el-icon-delete"
              size="mini"
              >删除</el-button
            >
            <el-tooltip
              class="item"
              effect="dark"
              content="分配权限"
              placement="top-start"
            >
              <el-button
                @click="fenpei(scope.row)"
                type="warning"
                icon="el-icon-setting"
                size="mini"
                >分配权限</el-button
              >
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!--dialong 添加角色  -->
    <el-dialog title="添加" :visible.sync="adddialogFormVisible">
      <el-form :model="addform" :rules="rules" ref="addruleForm">
        <el-form-item label="角色名称" label-width="80px" prop="roleName">
          <el-input v-model="addform.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width="80px" prop="roleDesc">
          <el-input v-model="addform.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="adddialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addroles">确 定</el-button>
      </div>
    </el-dialog>
    <!--dialong 角色修改  -->
    <el-dialog title="角色修改" :visible.sync="xiuialogFormVisible">
      <el-form :model="xiuform" :rules="rules" ref="addruleForm">
        <el-form-item label="角色名称" label-width="80px" prop="roleName">
          <el-input v-model="xiuform.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width="80px" prop="roleDesc">
          <el-input v-model="xiuform.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="xiuialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="qdxiu">确 定</el-button>
      </div>
    </el-dialog>
    <!--dialong 分配权限  -->
    <el-dialog title="分配权限" :visible.sync="fendalogFormVisible">
      <el-tree
        :data="rightslist"
        :props="defaultProps"
        show-checkbox
        default-expand-all
        node-key="id"
        :default-checked-keys="defaultKeys"
        ref="treeRef"
      >
      </el-tree>

      <div slot="footer" class="dialog-footer">
        <el-button @click="fendalogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="qdfen">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  usersData,
  add_roles,
  list_roles,
  del_roles,
  put1_roles,
  put2_roles,
  xdel_roles,
  right_list,
  roles_rights,
} from "@/http/api.js";

export default {
  data() {
    //qq
    var QQ = (rule, value, callback) => {
      const qq = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/;
      if (qq.test(value)) {
        return callback();
      } else {
        return callback("邮箱格式不对");
      }
    };
    //tel
    var Tel = (rule, value, callback) => {
      const tt = /^1[3-9]\d{9}$/;
      if (tt.test(value)) {
        return callback();
      } else {
        return callback("手机格式不对");
      }
    };
    return {
      tableData: [], //用户数据
      adddialogFormVisible: false, //添加显隐
      xiuialogFormVisible: false, //修改显隐
      fendalogFormVisible: false, //分配角色
      addform: {
        //添加
        roleName: "",
        roleDesc: "",
      },
      xiuform: {
        //修改
        roleName: "",
        roleDesc: "",
        roleId: 0, //number
      },
      rules: {
        //验证
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { min: 2, max: 6, message: "长度在 2 到 6 个字符", trigger: "blur" },
        ],
        roleDesc: [
          { required: true, message: "请输入角色描述", trigger: "blur" },
          {
            min: 2,
            max: 50,
            message: "长度在 2 到 50 个字符",
            trigger: "blur",
          },
        ],
      },

      rightslist: [], //权限列表
      defaultProps: {
        children: "children",
        label: "authName",
      },
      defaultKeys: [], //接收三级节点
      roleId1: "", //角色id
    };
  },
  mounted() {
    this.getlistroles(); //渲染数据
  },
  methods: {
    async fenpei(role) {
      //存role        1  所有权限列表
      this.fendalogFormVisible = true;
      let res = await right_list();
      console.log(res, "rr");
      if (res.data.meta.status === 200) {
        this.rightslist = res.data.data;
        this.roleId1 = role.id; //存role
        this.getdigui(role, this.defaultKeys); //角色,第3级节点
      }
    },
    getdigui(node, arr) {
      //3 用递归 获取3级节点
      if (!node.children) {
        arr.push(node.id); //添加id
      } else {
        node.children.forEach((item) => {
          this.getdigui(item, arr);
        });
      }
    },
    async qdfen() {
      //2 分配权限     用户id 角色id
      let keys = [
        ...this.$refs.treeRef.getCheckedKeys(), //选中的节点
        ...this.$refs.treeRef.getHalfCheckedKeys(), //半选
      ];

      let res = await roles_rights({ id: this.roleId1, rids: keys.join(",") });
      console.log(res, "fp");
      if (res.data.meta.status === 200) {
        this.getlistroles(); //查询渲染数据
        this.fendalogFormVisible = false; //关闭
        this.$message.success("权限分配成功");
      } else {
        this.$message.fail("权限分配失败");
      }
    },
    async getlistroles() {
      //角色列表
      let res = await list_roles();
      this.tableData = res.data.data;
      console.log(res);

      // this.total=res.data.data.total//赋值
    },
    async addroles() {
      //添加角色
      this.$refs.addruleForm.validate(async (valid) => {
        if (valid) {
          let res = await add_roles(this.addform);
          console.log(res);
          if (res.data.meta.status === 201) {
            this.getlistroles(); //重新调用角色
            this.$message.success("添加成功");
            this.adddialogFormVisible = false; //关闭
          } else {
            this.$message.error("添加失败");
          }
        } else {
          this.$message.error("校验格式不对");
        }
      });
    },
    del(id) {
      //删除角色 传id
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await del_roles(id); //传id
          this.getlistroles(); //重新调用
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    async xiu(id) {
      //传id 修改
      let res = await put1_roles(id);
      console.log(res, "id");
      if (res.data.meta.status === 200) {
        this.xiuform = res.data.data; //回填
        this.xiuialogFormVisible = true;
      }
    },
    async qdxiu() {
      // 确定修改 获取上面id
      let res = await put2_roles({
        id: this.xiuform.roleId,
        roleName: this.xiuform.roleName,
        roleDesc: this.xiuform.roleDesc,
      });
      // console.log(res,'f');//
      if (res.data.meta.status === 200) {
        this.getlistroles();
        this.$message.success(res.data.meta.msg);
        this.xiuialogFormVisible = false;
      } else {
        this.$message.error("修改失败");
      }
    },
    async close_state(row, rightId) {
      //删除指定权限
      let roleId = row.id; //角色id
      let res = await xdel_roles({ id: roleId, cid: rightId });
      if (res.data.meta.status === 200) {
        this.getlistroles(); //渲染数据
        this.$message.success("删除成功");
      } else {
        this.$message.fail("删除失败");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.roles {
  width: 100%;
  height: 100%;
  background: rgb(234, 237, 241);
}
.dd {
  width: 100px;
  height: 100px;
  background: red;
}

.el-tag {
  margin: 7px;
}
.bleft {
  border-left: 1px solid black;
}
.btop {
  border-top: 1px solid black;
}
.bbottom {
  border-bottom: 1px solid black;
}
.bcenter {
  display: flex;
  align-items: center;
}
.bbcenter {
  display: flex;
  align-items: center;
  justify-content: center;
}
.bright {
  border-right: 1px solid black;
}
</style>
