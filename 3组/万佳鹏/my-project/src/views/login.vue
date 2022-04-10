<template>
    <div id="log">
        <div class="div">
            <div class="img">
                <div>
                    <img src="../assets/logo.png" alt="">
                </div>
            </div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="50px" class="demo-ruleForm">
                <el-form-item label="昵称" prop="name">
                    <!-- <i class="el-icon-user-solid"></i> -->
                    <el-input v-model="ruleForm.name" prefix-icon="iconfont icon-user"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pwd">
                    <!-- <i class="el-icon-lock"></i> -->
                    <el-input type="password" v-model="ruleForm.pwd" prefix-icon="iconfont icon-3702mima"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm">登录</el-button>
                    <el-button type="info" @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import { loging } from "@/api/user.js";
export default {
  data() {
    return {
      ruleForm: {
        name: "admin",
        pwd: "123456"
      },
      rules: {
        name: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        pwd: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    async submitForm() {
      console.log(111);
      let { data: data } = await loging({
        username: this.ruleForm.name,
        password: this.ruleForm.pwd
      });
      console.log(data);
      if (data.meta.status == 200) {
        this.$message({
          message: data.meta.msg,
          type: "success"
        });
        localStorage.setItem("token", JSON.stringify(data.data.token));
        this.$router.push("/page");
      } else {
        this.$message({
          message: data.meta.msg,
          type: "error"
        });
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
/* 样式 */
#log {
  background-color: #2b4b6b;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .div {
    background: white;
    width: 450px;
    height: 360px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding: 0 20px;
    .img {
      width: 130px;
      height: 130px;
      background: white;
      border-radius: 50%;
      position: absolute;
      top: -80px;
      left: 50%;
      transform: translate(-50%);
      box-shadow: 0 0 10px #ddd;
      padding: 10px;
      div {
        width: 100%;
        height: 100%;
        overflow: hidden;
        display: flex;
        border-radius: 50%;
        background-color: #eee;
      }
    }
    /deep/.demo-ruleForm {
      width: 100%;
      .el-form-item__label {
        width: 10%;
      }
      .el-form-item__content {
        input {
          padding-left: 25px;
        }
      }
    }
  }
}
</style>


