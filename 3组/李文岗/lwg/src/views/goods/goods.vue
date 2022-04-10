<template>
    <div class="goods">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片          11111 -->
        
        <el-card>
            <el-row :gutter="20">
                <el-col :span="8">
                    <!-- input  -->
                    <el-input
                        placeholder="请输入内容"
                        v-model="queryInfo.query"
                        clearable
                        @clear="getgoodlist"
                    >
                        <el-button slot="append" icon="el-icon-search" @click="getgoodlist"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="16">
                    <el-button type="primary" @click="$router.push('/goods/add')">添加用户</el-button>
                </el-col>
            </el-row>
            <!-- table -->
            <el-table :data="tableData" border stripe  >
                <el-table-column type="index" ></el-table-column>
                <el-table-column prop="goods_name" label="商品名称" width="500px"></el-table-column>
                <el-table-column prop="goods_price" label="商品价格(元)" width="120px"></el-table-column>
                <el-table-column prop="goods_weight" label="商品重量" width="120px"></el-table-column>
                <el-table-column prop="goods_number" label="商品数量" width="120px"></el-table-column>
                <el-table-column prop="add_time" label="创建时间" width="200px">
                    <template slot-scope="scope">{{scope.row.add_time | Format}}</template>
                </el-table-column>
                <el-table-column label="操作" width="315px">
                    <template slot-scope="scope">
                        <el-button
                            @click="xiu(scope.row.goods_id)"
                            type="primary"
                            icon="el-icon-edit"
                            size="mini"
                        ></el-button>
                        <el-button
                            @click="del(scope.row.goods_id)"
                            type="danger"
                            icon="el-icon-delete"
                            size="mini"
                           
                        ></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryInfo.pagenum"
                :page-sizes="[5, 10, 20, 30]"
                :page-size="queryInfo.pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
            ></el-pagination>
        </el-card>
    </div>
</template>

<script>
import {goodlist,delgood} from '@/http/api.js'
export default {
  data() {
    return {
      tableData: [], //用户数据
      queryInfo: {
        query: "", //查询参数
        pagenum: 1,
        pagesize: 5
      },
      total: 0 //总条数
    };
  },
  mounted() {
    this.getgoodlist();
  },
  methods: {
    async getgoodlist() {
      //用户列表
      let res = await goodlist(this.queryInfo);
      // console.log(res, "111");
      if (res.data.meta.status===200) {
          this.tableData=res.data.data.goods
          this.total=res.data.data.total
      }
    //   this.tableData = res.data.data.users;
    //   this.total = res.data.data.total; //赋值
    },
    addUser() {
      //添加
      this.$refs.addruleForm.validate(async valid => {
        if (valid) {
          this.$message.error("添加失败");
        } else {
          this.$message.error("校验格式不对");
        }
      });
    },
    del(goods_id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          let res =await delgood(goods_id)
          console.log(res,'del');
          this.getgoodlist()//渲染
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },

    handleSizeChange(val) {
      //分页
      this.queryInfo.pagesize = val;
      this.getgoodlist();
    },
    handleCurrentChange(val) {
      this.queryInfo.pagenum = val;
      this.getgoodlist();
    },
    xiu() {}
  }
};
</script>

<style lang="scss" scoped>
.goods {
  width: 100%;
  height: 100%;
  background: rgb(234, 237, 241);
}
</style>