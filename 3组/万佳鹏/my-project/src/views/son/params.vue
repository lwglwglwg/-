<template>
  <div>
    <headeo :one="'商品管理'" :two="'分类参数'" />
    <el-card class="box-card">
      <el-alert title="注意:只允许为第三级分类设置相关参数！" type="warning" show-icon :closable="false">
      </el-alert>
      <div style="margi n:10px 0;">
        <span>选择商品分类：</span>
        <el-cascader ref="refHandle" v-model="value" :options="options" :props="defaultProps" @change="handleChange" style="width:400px;"></el-cascader>
      </div>
      <template>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="动态参数" name="many">
            <el-button type="primary" size="mini" :disabled="flag" style="margin-bottom:20px;" @click="addcan">添加参数</el-button>
          </el-tab-pane>
          <el-tab-pane label="静态属性" name="only">
            <el-button type="primary" size="mini" :disabled="flag" style="margin-bottom:20px;" @click="addshu">添加属性</el-button>
          </el-tab-pane>
          <lis :lists="onlylist" @delsc="delsc" @delfen="delfen" @editshu="editshu"></lis>
        </el-tabs>
      </template>
      <el-dialog :title="title" :visible.sync="dialogVisible" width="50%">
        <el-form :model="from" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item :label="tit" prop="attr_name">
            <el-input v-model="from.attr_name"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addcategories('ruleForm')">确定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import headeo from "@/components/headeo";
import lis from "@/components/xiucan";
import { categories, getcan, delcan, shancan, addcans } from "@/api/user";
export default {
  components: { headeo, lis },
  data() {
    return {
      pid: 0,
      options: [],
      activeName: "many",
      onlylist: [],
      id: 0,
      defaultProps: {
        children: "children",
        label: "cat_name",
        expandTrigger: "hover",
        value: "cat_id"
      },
      flag: true,
      inputVisible: false,
      inputValue: "",
      value: "",
      dialogVisible: false,
      title: "添加动态参数",
      from: {
        attr_name: ""
      },
      tit: "动态参数",
      rules: {
        attr_name: [{ required: true, message: "参数名称", trigger: "blur" }]
      }
    };
  },
  methods: {
    addcan() {
      this.dialogVisible = true;
      this.title = "添加动态参数";
      this.tit = "动态参数";
      this.pid = 0;
    },
    addshu() {
      this.pid = 0;
      this.dialogVisible = true;
      this.title = "添加静态属性";
      this.tit = "静态属性";
    },
    addcategories(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          /* 判断添加还是修改pid为0是添加 */
          if (this.pid == 0) {
            let { data: data } = await addcans({
              id: this.id,
              attr_name: this.from.attr_name,
              attr_sel: this.activeName
            });
            if (data.meta.status == 201) {
              this.$message.success("添加参数成功");
              this.dialogVisible = false;
              this.from = {};
              this.handleClick();
            } else {
              this.$message.error(data.meta.msg);
            }
          } else {
            /* 判断添加还是修改pid为0是修改 */
            let arr = [];
            this.from.attr_vals.forEach(item => {
              arr.push(item.name);
            });
            let { data: data } = await delcan({
              id: this.id,
              attrid: this.from.id,
              attr_name: this.from.attr_name,
              attr_sel: this.activeName,
              attr_vals: arr.join(" ")
            });
            if (data.meta.status == 200) {
              this.$message.success("修改参数项成功");
              this.xiushi();
            } else {
              this.$message.error("修改参数项失败");
            }
            this.handleClick();
            console.log(data);
            this.dialogVisible = false;
            this.from = {};
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async list() {
      let { data: data } = await categories();
      console.log(data);
      this.options = data.data;
    },
    handleChange(val) {
      console.log(val);
      /* 判断是不是二级分类 */
      if (val.length < 3) {
        this.id = 0;
        this.value = "";
        this.$refs.refHandle.$refs.panel.clearCheckedNodes();
      } else {
        this.id = val[2];
      }
    },
    /* 获取列表 */
    async handleClick() {
      let { data: data } = await getcan({
        id: this.id,
        sel: this.activeName
      });
      this.onlylist = data.data;
      console.log(data.data, 99);
      this.xiushi();
    },
    /* 修改参数 */
    async delsc(i) {
      let arr = [];
      i.attr_vals.forEach(item => {
        arr.push(item.name);
      });
      let { data: data } = await delcan({
        id: this.id,
        attrid: i.attr_id,
        attr_name: i.attr_name,
        attr_sel: this.activeName,
        attr_vals: arr.join(" ")
      });
      console.log(data);
      if (data.meta.status == 200) {
        this.$message.success("修改参数项成功");
      } else {
        this.$message.error("修改参数项失败");
      }
    },
    async delfen(i) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let { data: data } = await shancan({
            id: this.id,
            attrid: i
          });
          console.log(data);
          if (data.meta.status == 200) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.handleClick();
          } else {
            this.$message({
              type: "error",
              message: "删除失败!"
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    xiushi() {
      for (let i = 0; i < this.onlylist.length; i++) {
        if (typeof this.onlylist[i].attr_vals == "string") {
          this.onlylist[i].attr_vals = this.onlylist[i].attr_vals.split(" ");
          for (let j = 0; j < this.onlylist[i].attr_vals.length; j++) {
            this.onlylist[i].attr_vals[j] = {
              id: this.onlylist[i].attr_id,
              name: this.onlylist[i].attr_vals[j],
              cid: j + 1
            };
          }
        }
      }
    },
    editshu(row) {
      this.pid = 1;
      this.from = {
        attr_name: row.attr_name,
        id: row.attr_id,
        attr_vals: row.attr_vals
      };
      console.log(row);
      if (this.activeName == "many") {
        this.title = "修改动态参数";
        this.tit = "动态参数";
        console.log(5);
      } else {
        console.log(4);
        this.title = "修改静态属性";
        this.tit = "静态属性";
      }
      this.dialogVisible = true;
    }
  },
  created() {
    this.list();
  },
  watch: {
    id(val) {
      this.handleClick();
      this.flag = false;
    },
    dialogVisible(val) {
      if (!val) {
        this.from = {};
      }
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
.el-card__body {
  padding: 10px 20px;
}
li {
  list-style: none;
}
.el-alert {
  margin-bottom: 10px;
}
</style>
