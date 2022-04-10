<template>
    <div>
        <el-form :model="from" :rules="rules" ref="ruleForm" label-width="50px" class="demo-ruleForm" v-if="cid!=3">
            <el-form-item label="昵称" prop="username" v-if="cid==2">
                <el-input v-model="from.username"></el-input>
            </el-form-item>
            <el-form-item label="昵称" v-if="cid==1">
                <el-input v-model="from.username" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item v-if="cid==2" label="密码" prop="password">
                <el-input type="password" v-model="from.password"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input type="email" v-model="from.email"></el-input>
            </el-form-item>
            <el-form-item label="手机" prop="mobile">
                <el-input v-model="from.mobile"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="no('ruleForm')">取消</el-button>
                <el-button type="primary" @click="add('ruleForm')">确定</el-button>
            </el-form-item>
        </el-form>
        <div v-if="cid==3">
            <p class="p">当前用户: <span>{{editde.username}}</span></p>
            <p class="p">当前角色: <span>{{editde.role_name}}</span></p>
            <template>
                <el-select v-model="value" placeholder="请选择">
                    <el-option v-for="(item,index) in role" :key="index" :label="item.roleName" :value="item.id">
                    </el-option>
                </el-select>
            </template>
            <div class="el-form-item__content">
                <el-button @click="$emit('no')">取消</el-button>
                <el-button type="primary" @click="xiu">确定</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import { roles } from "@/api/user.js";
export default {
  props: ["title", "flag", "editde"],
  data() {
    return {
      cid: 0,
      from: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      rules: {
        username: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        mobile: [{ required: true, message: "请输入手机号", trigger: "blur" }]
      },
      id: "",
      role: [],
      value: ""
    };
  },
  methods: {
    add(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.cid == 2) {
            this.$emit("adduser", this.from);
          } else if (this.cid == 1) {
            this.$emit("edituser", {
              id: this.editde.id,
              email: this.from.email,
              mobile: this.from.mobile
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    no(formName) {
      this.$emit("no");
      this.$refs[formName].resetFields();
    },
    xiu() {
      this.$emit("editrole", {
        id: this.editde.id,
        rid: this.value
      });
    },
    async list() {
      let { data: data } = await roles();
      console.log(44);
      this.role = data.data;
    }
  },
  created() {
    this.list();
    if (this.editde.email) {
      this.from = this.editde;
      this.cid = 1;
    } else if (this.title == "分配角色") {
      this.cid = 3;
    } else {
      this.cid = 2;
    }
  },
  watch: {
    flag(val) {
      this.from = {};
      this.value=''
      if (val) {
        if (this.editde.email) {
          this.from = this.editde;
          this.cid = 1;
        } else if (this.title == "分配角色") {
          this.cid = 3;
        } else {
          this.cid = 2;
        }
      }
      console.log(this.cid);
      /*  this.$refs['formName'].resetFields(); */
    }
  }
};
</script>
<style lang="scss" scoped>
/deep/.el-form-item__content {
  display: flex;
  justify-content: flex-end;
}
.p{
    margin: 15px 0;
}
</style>

