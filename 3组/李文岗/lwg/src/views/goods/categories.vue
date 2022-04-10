<template>
  <div class="cate">
    <!-- 商品分类 -->
    <!-- 权限 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-button type="primary" @click="add1">添加分类</el-button>

      <!-- 树状表格 -->
      <zk-table
        :data="tableData"
        border=""
        :columns="columns"
        show-index
        index-text="#"
        :expand-type="false"
        :selection-type="false"
      >
        <!-- 是否有效 -->
        <template slot="isok" slot-scope="aa">
          <i v-if="aa.row.cat_deleted==0" style="color:rgb(144,238,144);" class="el-icon-success"></i>
          <i v-else style="color:red;" class="el-icon-error"></i>
        </template>
        <!-- <el-table-column type="index" label="索引"></el-table-column> -->
        <!-- 排序 -->
        <template slot="px" scope="aa">
          <el-tag v-if="aa.row.cat_level==0" type="primary">一级</el-tag>
          <el-tag v-else-if="aa.row.cat_level==1" type="success">二级</el-tag>
          <el-tag v-else type="danger">三级</el-tag>
        </template>
        <!-- 操作 -->
        <template slot="btn" slot-scope="scope">
          <el-button @click="xiu(scope.row.cat_id)" type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
          <el-button
            @click="del(scope.row.cat_id)"
            type="danger"
            icon="el-icon-delete"
            size="mini"
          >删除</el-button>
          <!-- <pre>{{bb.row.id}}</pre> -->
        </template>
      </zk-table>

      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!--dialong 添加分类  -->
    <el-dialog title="添加分类" :visible.sync="adddialogFormVisible">
      <el-form :model="addform" :rules="rules" ref="addruleForm"  >
        <el-form-item label="分类名称:" label-width="100px" prop="cat_name">
          <el-input v-model="addform.cat_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="父级分类:" label-width="100px">
            <el-cascader 
            v-model="addkeys" 
            :options="jllist" 
            :props="jlProps"
             @change="handleChange"
              clearable
            filterable
            style="width: 100%;"
             ></el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="adddialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add2">确 定</el-button>
      </div>
    </el-dialog>
    <!--dialong 修改分类  -->
    <el-dialog title="修改分类" :visible.sync="xiuialogFormVisible">
      <el-form :model="xiuform" :rules="rules" ref="addruleForm">
        <el-form-item label="角色名称" label-width="80px" prop="cat_name">
          <el-input v-model="xiuform.cat_name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="xiuialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="qdxiu">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { goodcate_list, addcate2, addcate, delcate,xiucate,xiucate2 } from "@/http/api.js";
export default {
  data() {
    return {
      // 表格
      tableData: [], //分类列表
      columns: [
        //配置
        {
          label: "分类名称",
          prop: "cat_name"
        },
        {
          label: "是否有效",
          prop: "cat_deleted",
          type: "template",
          template: "isok"
        },
        {
          label: "排序",
          prop: "cat_level",
          type: "template",
          template: "px"
        },
        {
          label: "操作",
          type: "template", //模块
          template: "btn" //名字
        }
      ],

      queryInfo: {
        // type:3, //查询参数
        pagenum: 1,
        pagesize: 5
      },
      total: 0, //总条数
      adddialogFormVisible: false, //添加显隐
      xiuialogFormVisible: false, //修改显隐
      fendalogFormVisible: false, //分配角色
      addform: {
        //添加
        cat_pid: 0,
        cat_name: "",
        cat_level: ""
      },
      xiuform: {
        //修改
        cat_pid: 0,
        cat_name: "",
        cat_level: ""
      },
      rules: {
        //验证
        cat_name: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
          { min: 5, max: 13, message: "长度在 5 到 15 个字符", trigger: "blur" }
        ]
      },

      addkeys: [], //保存
      jllist: [], //options 级联数据
      jlProps: {
        //配置
        label: "cat_name",
        children: "children", //节点
        value: "cat_id"
      }
    };
  },
  mounted() {
    this.getgoodcate_list();
  },
  methods: {
    async getgoodcate_list() {
      //获取数据列表
      let res = await goodcate_list(this.queryInfo);
      if (res.data.meta.status === 200) {
        this.tableData = res.data.data.result;
        console.log(res,'rr');
        this.total = res.data.data.total; //赋值数据
      }
    },
    handleChange() {
      //添加hover事件
      if (this.addkeys.length > 0) {
        //不是一级分类
        this.addform.cat_pid = this.addkeys[this.addkeys.length - 1]; //父id
        this.addform.cat_level = this.addkeys.length; //当前等级
      } else {
        this.addform.cat_pid = 0;
        this.addform.cat_level = 0;
      }
    },

    async add1() {
      //1 点击打开 获取2级分类
      this.adddialogFormVisible = true;//点击按钮请求数据
      let res = await addcate2({ type: 2 });
      if (res.data.meta.status === 200) {
        this.jllist = res.data.data;
      }
    },
    add2() {
      //确定添加分类
      this.$refs.addruleForm.validate(async valid => {
        if (valid) {
          let res = await addcate(this.addform);
          if (res.data.meta.status === 201) {
            this.getgoodcate_list(); //渲染
            this.adddialogFormVisible = false;
            this.$message.success("添加成功");
          } else {
            this.$message.fail("添加失败");
          }
          //   console.log(res, "1111");
        } else {
          this.$message.fail("验证格式不对");
        }
      });
    },

    del(id) { //删除
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let res = await delcate(id); //传id
          if (res.data.meta.status === 200) {
            this.getgoodcate_list();
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
    handleSizeChange(val) {
      //分页
      this.queryInfo.pagesize = val;
       this.getgoodcate_list();
    },
    handleCurrentChange(val) {
      this.queryInfo.pagenum = val;
        this.getgoodcate_list();
    },
    async xiu(id) {//修改
      let res =await xiucate(id)
      if (res.data.meta.status===200) {
        this.xiuform=res.data.data
        this.xiuialogFormVisible=true
      } 
    },
  async  qdxiu() { //确定修改
      let res =await xiucate2({id:this.xiuform.cat_id,cat_name:this.xiuform.cat_name})
      console.log(res,'xx');
      if (res.data.meta.status===200) {
        this.getgoodcate_list()//查询渲染11
        this.xiuialogFormVisible=false
          this.$message.success('编辑成功')
      } else {
          this.$message.fail('编辑失败')
        
      }
    }
  }
};
</script>

<style lang="scss" scoped>
/* .cate {
  width: 100%;
  height: 100%;
  background: rgb(234, 237, 241); el-popup-parent--hidden
}
 */
.el-cascader-panel {
  height: 100px !important;
}
.el-popup-parent--hidden {
  height: 100px !important;
}
.zk-table {
  margin-top: 10px;
}
</style>