<template>
  <div>
    <!-- 分类参数 -->
    <!-- 权限 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>参数列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片 -->
    <el-card>
      <el-alert title="注意：只允许为第三级分类设置相关参数！" type="warning" show-icon :closable="false"></el-alert>
      <div class="xbox">
        <b>选择商品分类:</b>
        <!-- selectKeys分类id -->
        <el-cascader
          v-model="selectKeys"
          :options="cateList"
          :props="goodProps"
          @change="handleChange"
        ></el-cascader>
      </div>
      <!-- 动态参数  -->
      <el-tabs v-model="activeName" @tab-click="handleTabsClick">
        <el-tab-pane label="动态参数" name="many">
          <el-button type="primary" size="mini" @click="addShow" :disabled="isBtn">添加参数</el-button>
          <el-table :data="ManyData" border="" stripe>
            <!-- 展开行 -->
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-tag
                  v-for="(item,i) in scope.row.attr_vals"
                  :key="i"
                  closable
                  @close="handleClose(i,scope.row)"
                >{{item}}</el-tag>
                <el-input
                  class="input-new-tag"
                  v-show="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                ></el-input>
                <el-button  v-show="!scope.row.inputVisible" class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag</el-button>
              </template>
            </el-table-column>
            <el-table-column type="index" label=""/>
            <el-table-column label="参数名称" prop="attr_name"/>
            <el-table-column>
              <template slot-scope="aa">
                <el-button
                  @click="xiu(aa.row.attr_id)"
                  size="mini"
                  type="primary"
                  icon="el-icon-edit"
                >编辑</el-button>
                <el-button
                  @click="del(aa.row.attr_id)"
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- 静态参数 -->
        <el-tab-pane label="静态参数" name="only">
          <el-button type="primary" size="mini" @click="addShow" :disabled="isBtn">添加属性</el-button>
          <el-table :data="OnlyData" border="" stripe>
            <!-- 展开行 -->
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-tag
                  v-for="(item,i) in scope.row.attr_vals"
                  :key="i"
                  closable
                  @close="handleClose(i,scope.row)"
                >{{item}}</el-tag>
                <el-input
                  class="input-new-tag"
                  v-show="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                ></el-input>
                <el-button  v-show="!scope.row.inputVisible" class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag</el-button>
              </template>
            </el-table-column>
            <el-table-column type="index" label=""/>
            <el-table-column label="属性名称" prop="attr_name"/>
            <el-table-column>
              <template slot-scope="aa">
                <el-button
                  @click="xiu(aa.row.attr_id)"
                  size="mini"
                  type="primary"
                  icon="el-icon-edit"
                >编辑</el-button>
                <el-button
                  @click="del(aa.row.attr_id)"
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!-- 添加参数对话框   111 -->
    <el-dialog :title="'添加'+addtext" :visible.sync="adddialogFormVisible" @close="closeadd">
      <el-form :model="addform" :rules="addrules" ref="addruleForm">
        <el-form-item :label="addtext" label-width="80px" prop="attr_name">
          <el-input v-model="addform.attr_name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="adddialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="qd">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改参数对话框 -->
    <el-dialog :title="'修改'+addtext" :visible.sync="xiudialogFormVisible">
      <el-form :model="xiuform" :rules="addrules" ref="addruleForm">
        <el-form-item :label="addtext" label-width="80px" prop="attr_name">
          <el-input v-model="xiuform.attr_name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="xiudialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="qdxiu">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  goodcate_list,
  paramsList,
  postparamsList,
  delparams,
  xiuparams,
  xiuparams2,

  xiuStage
} from "@/http/api";
export default {
  data() {
    return {
      selectKeys: "", //级联选中的值
      cateList: [], //接收商品列表
      goodProps: {
        //配置
        expandTrigger: "hover",
        value: "cat_id", //唯一
        label: "cat_name",
        children: "children"
      },
      adddialogFormVisible: false,
      xiudialogFormVisible: false,
      activeName: "many", //tabs  name="many"
      tableData: [], //列表
      ManyData: [], //动态参数列表
      OnlyData: [], //静态参数列表    11
      addform: {
        attr_name: ""
      },
      xiuform: {
        attr_name: ""
      },
      addrules: {
        //验证规则
        attr_name: [
          { required: true, message: "请输入参数名称", trigger: "blur" }
        ]
      },

      dynamicTags: [],
     
      cid:0
    };
  },
  mounted() {
    this.getcatelist(); //获取级联数据
  },
  computed: {
    isBtn() {
      //禁用
      if (this.selectKeys.length === 3) {
        return false;
      } else {
        return true;
      }
    },
    catId() {
      //获取参数 2级 分类id
      if (this.selectKeys.length === 3) {
        return this.selectKeys[2];
      }
        return null
    },
    addtext() {
      //添加动态参数或静态 对话框
      if (this.activeName === "many") {
        return "动态参数";
      } else {
        return "静态属性";
      }
    }
  },
  methods: {
    async getcatelist() {
      //获取级联数据
      let res = await goodcate_list();
      if (res.data.meta.status === 200) {
        this.cateList = res.data.data;
      }
    },
    handleChange() {///级联触发
        this.getParamsList();
    },
    handleTabsClick() { //点击tabs触发 (//调用封装接口 )
      this.getParamsList() 
    },
 async getParamsList() {
      // 2. 参数列表 判断是静态还是动态
      if (this.selectKeys.length !== 3) { // 只允许选择三级分类：
        this.selectKeys = []
        this.ManyData = []
        this.OnlyData = []
        return
      }
      let res = await paramsList({ id: this.catId, sel: this.activeName });
      
      console.log(res.data.data, "1"); 
      console.log(this.catId);
      


       if (res.data.meta.status === 200) {
          res.data.data.forEach(item=>{ //遍历字段 attr_vals
          item.attr_vals=item.attr_vals? item.attr_vals.split(' '):[]
          item.inputVisible = false// 添加控制显隐
          item.inputValue = ''//添加 值
          console.log(res,'input');
          
         })    
        if (this.activeName === "many") {
          this.ManyData = res.data.data;
        } else {
          this.OnlyData = res.data.data;
        }
      }
    },
    addShow() {
      //添加动态参数
      this.adddialogFormVisible = true;
    },
    qd() {
      //确定
      this.$refs.addruleForm.validate(async valid => {
        if (valid) {
          let res = await postparamsList({
            id: this.catId,
            attr_name: this.addform.attr_name,
            attr_sel: this.activeName
          });
          console.log(res, "111");
          if (res.data.meta.status === 201) {
            this.getParamsList(); //渲染 级联数据
            this.$message.success("添加成功");
            this.adddialogFormVisible = false;
          } else {
            this.$message.error("添加失败");
          }
        } else {
          this.$message.error("验证格式不对");
        }
      });
    },
    del(attr_id) {
      //删除参数 attr_id参数id
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let res = await delparams({ id: this.catId, cid: attr_id });
          // console.log(res,'del');
          if (res.data.meta.status === 200) {
            this.getParamsList(); //渲染
          }

          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    async xiu(attr_id) {
      this.xiudialogFormVisible = true; //打开
      let res = await xiuparams({
        id: this.catId,
        cid: attr_id,
        attr_sel: this.activeName
      });
      // console.log(res,'xiu');
      if (res.data.meta.status === 200) {
        this.xiuform = res.data.data; //表单回填
      }
    },
    qdxiu() {
      //确定
      this.$refs.addruleForm.validate(async valid => {
        if (valid) {
          let res = await xiuparams2({
            id: this.catId, //分类id
            cid: this.xiuform.attr_id, //参数id
            attr_name: this.xiuform.attr_name,
            attr_sel: this.activeName //类型
          });
          console.log(res, "qd");
          if (res.data.meta.status === 200) {
            this.getParamsList(); //渲染 参数列表
            this.$message.success("编辑成功");
            this.xiudialogFormVisible = false;
          } else {
            this.$message.error("编辑失败");
          }
        } else {
          this.$message.error("验证失败");
        }
      });
    },
    closeadd() {
      //静听对话框关闭事件
      this.$refs.addruleForm.resetFields();
    },



  //#######      tag   ##########
  
  showInput(row) {//1 点击按钮显示输入框
       console.log(row,'11');
       
      row.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
  async  handleInputConfirm(row) {//文本框失去焦点
      if (row.inputValue.trim().length===0) {
         row.inputValue=""
         row.inputVisible=false
         return 
      }
      row.attr_vals.push(row.inputValue.trim())
      row.inputValue=""
      row.inputVisible=false
      this.bcATTrVals(row)
    },
   async bcATTrVals(row){//保存到数据库
         let res =await xiuStage({
             cid:this.catId,
             id:row.attr_id,
             attr_name:row.attr_name,
             attr_sel:row.attr_sel,
             attr_vals:row.attr_vals.join(",")//转字符串格式
         }) 
         console.log(res,'tag');
         if (res.data.meta.status===200) {
               this.$message.success('修改参数项成功！')
         } else {
              this.$message.error('修改参数项失败！')
         }
    },
      handleClose(i,row) { //删除 对应参数可选
      row.attr_vals.splice(i,1)
      this.bcATTrVals(row)//渲染数据库
    },
  }
};
</script>

<style lang="scss" scoped>
.xbox {
  margin: 10px;
  font-size: 18px;
  box-sizing: border-box;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>