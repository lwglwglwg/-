<template>
  <div>
    <headeo :one="'商品管理'" :two="'添加商品'" />
    <el-card class="box-card">
      <el-alert title="添加商品信息" type="info" show-icon :closable="false">
      </el-alert>
      <el-steps :active="active" finish-status="success" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <template>
        <el-tabs tab-position="left" class="bodys" @tab-click="acti" v-model="active1" :before-leave="leaveab">
          <el-tab-pane name="0" label="基本信息">
            <el-form :model="from" :rules="rules" ref="ruleForm" class="demo-ruleForm">
              <el-form-item label="商品名称" prop="goods_name">
                <el-input v-model="from.goods_name"></el-input>
              </el-form-item>
              <el-form-item label="商品价格" prop="goods_price">
                <el-input type="number" v-model="from.goods_price"></el-input>
              </el-form-item>
              <el-form-item label="商品重量" prop="goods_weight">
                <el-input type="number" v-model="from.goods_weight"></el-input>
              </el-form-item>
              <el-form-item label="商品数量" prop="goods_number">
                <el-input type="number" v-model="from.goods_number"></el-input>
              </el-form-item>
              <el-form-item label="商品分类">
                <el-cascader :options="options" :props="defaultProps" @change="handleChange"></el-cascader>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane name="1" label="商品参数">
            <div v-for="(item,index) in manyList" :key="index" class="shopcan">
              <p>{{item.attr_name}}</p>
              <ul>
                <li v-for="(ite,ind) in manychild[index]" :key="ind" v-if="ite.name">
                  <el-checkbox v-model="ite.flag" :label="ite.name" border></el-checkbox>
                </li>
              </ul>
            </div>
          </el-tab-pane>
          <el-tab-pane name="2" label="商品属性">
            <ul class="shopshu">
              <li v-for="(item,index) in onlyList" :key="index">
                <p>{{item.attr_name}}</p>
                <el-input v-model="item.attr_vals"></el-input>
              </li>
            </ul>
          </el-tab-pane>
          <el-tab-pane name="3" label="商品图片">
            <el-upload action="https://www.liulongbin.top:8888/api/private/v1/upload" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :headers="headers" :on-success="addimg">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-tab-pane>
          <el-tab-pane name="4" label="商品内容">
            <quillEditor v-model="from.goods_introduce"></quillEditor>
            <el-button type="primary" @click="kan">添加商品</el-button>
          </el-tab-pane>
        </el-tabs>
      </template>
    </el-card>
  </div>
</template>
<script>
/* 导入quill-editor编辑器 */
import { quillEditor } from "vue-quill-editor";

import headeo from "@/components/headeo";
import { addQuillTitle } from "../../modules/quill-title.js";
import { categories, getcan, addgoods } from "@/api/user";
export default {
  components: { headeo, quillEditor },
  data() {
    return {
      active: 0,
      active1: "0",
      from: {
        goods_name: "" /* 名称 */,
        goods_cat: [] /* 分类列表 */,
        goods_price: 1 /* 价格 */,
        goods_number: 1 /* 数量 */,
        goods_weight: 1 /* 重量 */,
        goods_introduce: "" /* 介绍 */,
        pics: [] /*图片  */,
        attrs: [] /* 参数 */
      },
      options: [],
      manyList: [],
      manychild: [],
      onlyList: [],
      rules: {
        goods_name: [
          { required: true, message: "请输入商品昵称", trigger: "blur" }
        ],
        goods_price: [
          { required: true, message: "请输入商品价格", trigger: "blur" }
        ],
        goods_number: [
          { required: true, message: "请输入商品数量", trigger: "blur" }
        ],
        goods_weight: [
          { required: true, message: "请输入商品重量", trigger: "blur" }
        ]
      },
      value: 0,
      defaultProps: {
        children: "children",
        label: "cat_name",
        expandTrigger: "hover",
        value: "cat_id"
      },
      dialogImageUrl: "",
      dialogVisible: false,
      headers: {
        Authorization: JSON.parse(localStorage.getItem("token"))
      }
    };
  },
  methods: {
    kan() {
      let arr = [];
      for (let i = 0; i < this.manychild.length; i++) {
        for (let j = 0; j < this.manychild[i].length; j++) {
          if (this.manychild[i][j].flag == true) {
            arr.push({
              attr_id: this.manychild[i][j].id,
              attr_value: this.manychild[i][j].name
            });
          }
        }
      }
      this.from.attrs = arr;
      this.addgood();
      console.log(this.from);
    },
    async addgood() {
      let { data: data } = await addgoods(this.from);
      if (data.meta.status == 201) {
        this.$message({
          type: "success",
          message: "创建成功!"
        });
        this.$router.go(-1);
      } else {
        this.$message({
          type: "error",
          message: data.meta.msg
        });
      }
      console.log(data);
    },
    acti() {
      this.active = this.active1 * 1;
    },
    leaveab(a, b) {
      if (this.from.goods_cat.length > 0) {
        return true;
      } else {
        this.$message.error("请选择分类");
        return false;
      }
    },
    async getcategories() {
      let { data: data } = await categories();
      console.log(data);
      this.options = data.data;
    },
    handleChange(value) {
      this.value = value[value.length - 1];
      this.from.goods_cat = value.join(",");
    },
    async can(val) {
      let { data: data } = await getcan({
        id: this.value,
        sel: val
      });
      if (val == "many") {
        this.manyList = data.data;
        let arr = [];
        this.manyList.forEach(item => {
          arr.push(item.attr_vals.split(" "));
        });
        /*  console.log(data); */
        console.log(arr);
        for (let i = 0; i < arr.length; i++) {
          for (let j = 0; j < arr[i].length; j++) {
            arr[i][j] = {
              id: data.data[i].attr_id,
              name: arr[i][j],
              flag: true
            };
          }
        }
        /* console.log(arr, 77); */
        this.manychild = arr;
      } else {
        this.onlyList = data.data;
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    addimg(file) {
      console.log(file);
      this.from.pics.push({
        pic: "/" + file.data.tmp_path
      });
      /*  console.log(this.from.pics); */
    }
  },
  created() {
    this.getcategories();
  },
  mounted() {
    addQuillTitle();
  },
  watch: {
    "from.goods_cat": {
      handler: function(val) {
        this.can("only");
        this.can("many");
      }
    }
  }
};
</script>
<style lang="scss" scoped >
.box-card {
  width: 100%;
  margin-top: 15px;
  padding-top: 10px;
}
/deep/.el-steps {
  width: 70%;
  margin-top: 15px;
  margin-left: 10px;
}
.el-alert--info.is-light {
  display: flex;
  align-items: center;
  justify-content: center;
}
.bodys {
  margin-top: 15px;
}
/deep/.el-step__title {
  font-size: 12px;
}
.el-form-item {
  display: flex;
  flex-direction: column;
}
/deep/.el-form-item__label {
  text-align: left;
  margin-bottom: 10px;
}
.shopcan {
  p {
    font-size: 14px;
    margin: 30px 0;
  }
  ul {
    display: flex;
    align-items: center;
    li {
      margin: 0 10px;
    }
  }
}
li {
  list-style: none;
}
.shopshu {
  li {
    color: #606266;
    margin-bottom: 10px;
    p {
      margin: 20px 0;
      font-size: 14px;
    }
  }
}
.ql-container .ql-snow {
  height: 200px;
}
.quill-editor {
  height: 400px;
}
</style>
<style lang="scss">
.quill-editor {
  height: 300px;
  .ql-container {
    height: 300px;
  }
}
</style>