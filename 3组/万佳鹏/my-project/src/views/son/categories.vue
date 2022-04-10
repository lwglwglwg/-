<template>
  <div>
    <headeo :one="'商品管理'" :two="'商品分类'" />
    <el-card class="box-card">
      <el-button type="primary" @click="add" style="margin-bottom:15px;">添加分类</el-button>
      <tree-table :data="cateList" :columns="columns" :selection-type="false" :expand-type="false" show-index index-text="索引" border>
        <template v-slot:isok="scope">
          <i class="el-icon-success" style="color: lightgreen" v-if="scope.row.cat_deleted === false"></i>
          <i class="el-icon-error" style="color: red" v-else></i></template>
        <template v-slot:pai="scope">
          <el-tag v-if="scope.row.cat_level==0">一级</el-tag>
          <el-tag v-if="scope.row.cat_level==1" type="success">二级</el-tag>
          <el-tag v-if="scope.row.cat_level==2" type="danger">三级</el-tag>
        </template>
        <template v-slot:cao="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="editshu(scope.row)">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="del(scope.row)">删除</el-button>
        </template>
      </tree-table>
      <div>
        <el-pagination :page-sizes="[2,5,10,15]" :page-size="from.pagesize" :pager-count="5" layout="total, sizes, prev, pager, next, jumper" :total="total" :current-page="from.pagenum" @size-change="editpagesize" @current-change="editpagenum">
        </el-pagination>
      </div>
      <el-dialog :title="title" :visible.sync="dialogVisible" width="50%">
        <el-form :model="froms" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="分类名称" prop="cat_name">
            <el-input v-model="froms.cat_name"></el-input>
          </el-form-item>
          <el-form-item label="商品分类" v-show="title=='添加分类'">
            <el-cascader v-model="handlerValue" ref="refHandle" :options="options" :props="defaultProps" @change="handleChange" clearable></el-cascader>
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
import { categories, addfen, delfen, editfen } from "@/api/user";
export default {
  components: { headeo },
  data() {
    return {
      columns: [
        {
          label: "分类名称",
          prop: "cat_name"
        },
        {
          label: "是否有效",
          type: "template",
          template: "isok"
        },
        {
          label: "排序",
          type: "template",
          template: "pai"
        },
        {
          label: "操作",
          // 表示将当前列定义为模板列
          type: "template",
          // 表示当前这一列的模板名称
          template: "cao"
        }
      ],
      cateList: [],
      from: {
        type: "",
        pagenum: 1,
        pagesize: 5
      },
      title: "添加分类",
      total: 0,
      dialogVisible: false,
      rules: {
        cat_name: [{ required: true, message: "参数名称", trigger: "blur" }]
      },
      froms: {
        cat_name: "",
        cat_pid: 0,
        cat_level: 0
      },
      options: [],
      defaultProps: {
        children: "children",
        label: "cat_name",
        expandTrigger: "hover",
        value: "cat_id",
        checkStrictly: true
      },
      handlerValue: ""
    };
  },
  methods: {
    async getlist() {
      let { data: data } = await categories(this.from);
      console.log(data);
      this.total = data.data.total;
      this.cateList = data.data.result;
    },
    editpagesize(i) {
      this.from.pagesize = i;
      this.getlist();
    },
    editpagenum(i) {
      this.from.pagenum = i;
      this.getlist();
    },
    async add() {
      (this.title = "添加分类"), (this.dialogVisible = true);
      let { data: data } = await categories({
        type: 2
      });
      console.log(data);
      this.options = data.data;
    },
    addcategories(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          if (this.title == "添加分类") {
            let { data: data } = await addfen(this.froms);
            if (data.meta.status == 201) {
              this.$message.success("添加分类成功");
              this.getlist();
              this.dialogVisible = false;
            } else {
              this.$message.error("添加分类失败");
            }
          } else {
            let { data: data } = await editfen({
              id: this.froms.cat_pid,
              cat_name: this.froms.cat_name
            });
            console.log(data);
            if (data.meta.status == 200) {
              this.$message.success("更新分类成功");
              this.getlist();
              this.dialogVisible = false;
            } else {
              this.$message.error("更新分类失败");
            }
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleChange(value) {
      console.log(value);
      if (value) {
        this.froms.cat_pid = value[value.length - 1];
        this.froms.cat_level = value.length;
        console.log(this.froms);
      }
    },
    async del(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let { data: data } = await delfen({
            id: row.cat_id
          });
          if (data.meta.status == 200) {
            this.$message.success("分类删除成功");
            this.getlist();
          } else {
            this.$message.error("分类删除失败");
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    async editshu(row) {
      console.log(row);
      (this.title = "编辑分类"), (this.dialogVisible = true);
      this.froms={
        cat_name : row.cat_name,
        cat_pid :row.cat_id,
        cat_level: 0
      }
      
    }
  },
  created() {
    this.getlist();
  },
  mounted() {
    //点击文本就让它自动点击前面的input就可以触发选择。但是因组件阻止了冒泡，暂时想不到好方法来触发。
    //这种比较耗性能，暂时想不到其他的，能实现效果了。
  /*   setInterval(function() {
      document.querySelectorAll(".el-cascader-node__label").forEach(el => {
        el.onclick = function() {
          if (this.previousElementSibling) this.previousElementSibling.click();
        };
      });
    }, 1000); */
  },
  watch: {
    handlerValue() {
      if (this.$refs.refHandle) {
        console.log(33);
        this.$refs.refHandle.dropDownVisible = false; //监听值发生变化就关闭它
      }
    },
    dialogVisible(val) {
      if (!val) {
        this.froms = {};
        this.$refs.refHandle.$refs.panel.clearCheckedNodes();
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.box-card {
  width: 100%;
  margin-top: 15px;
}
</style>
<style>
/* 改变样式 */
.el-cascader-panel .el-radio {
  width: 100%;
  height: 100%;
  z-index: 10;
  position: absolute;
  top: 0px;
  right: 0px;
}
.el-cascader-panel .el-radio__input {
  visibility: hidden;
}
</style>



