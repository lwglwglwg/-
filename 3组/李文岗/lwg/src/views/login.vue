<template>
  <div class="box">
    <div class="box-img">
      <img src="@/assets/logo.png" alt="" />
    </div>
    <el-form :model="addForm" :rules="rules" ref="ruleForm">
      <el-form-item label="姓名" prop="username" label-width="80px">
        <el-input
          v-model="addForm.username"
          prefix-icon="iconfont icon-user"
          clearable
        ></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password" label-width="80px">
        <el-input
          v-model="addForm.password"
          prefix-icon="iconfont icon-3702mima"
          clearable
        ></el-input>
      </el-form-item>

      <el-form-item class="btn">
        <el-button type="primary" @click="getLogin">登录</el-button>
        <el-button type="info" @click="chong">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { login } from "@/http/api.js";

export default {
  data() {
    return {
      addForm: {
        username: "admin",
        password: "123456",
      },
      rules: {
        //验证  11
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 6, message: "长度在 3 到 6 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 6, message: "长度在 3 到 6 个字符", trigger: "blur" },
        ],
      },
    };
  },

  methods: {
    getLogin() {
      //登录1111111
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          const res = await login({
            username: this.addForm.username,
            password: this.addForm.password,
          });

          console.log(res);
          if (res.data.meta.status === 200) {
            sessionStorage.token = res.data.data.token; //保存token
            this.$router.push("/home"); //去home
            this.$message.success("登录成功");
          } else {
            this.$message.error("登录失败");
          }
        } else {
          this.$message.error("验证格式不对");
        }
      });
    },
    chong() {
      //调用resetFields()11111111
      this.$refs.ruleForm.resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 300px;
  background: white;
  box-shadow: 0 0 10px white;
}
.box-img {
  position: relative;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: white;
  box-shadow: 0 0 10px white;
  padding: 12px;
  img {
    width: 100%;
    border-radius: 50%;
    background: rgb(238, 238, 238);
    box-shadow: 0 0 0 10px white;
  }
}
.el-form {
  position: absolute;
  width: 100%;
  top: 100px;
  margin: auto;
  box-sizing: border-box;
  padding: 0 20px 5px 40px;
  .el-input {
    margin: 1px 0;
  }
}
.btn {
  display: flex;
  justify-content: center;
}
</style>
