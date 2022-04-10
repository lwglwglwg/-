<template>
  <div>
    <headeo :one="'商品管理'" :two="'商品列表'" />
    <el-card class="box-card">
      <div class="earch">
        <el-input placeholder="请输入内容" v-model="from.query" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="getlist"></el-button>
        </el-input>
        <el-button type="primary" @click="$router.push('/addgoods')">添加商品</el-button>
      </div>
      <template>
        <el-table :data="list" border style="width: 100%" :stripe="true">
          <el-table-column type="index" width="50" label="#">
          </el-table-column>
          <el-table-column prop="goods_name" label="商品名称" width="1000px">
          </el-table-column>
          <el-table-column prop="goods_price" label="商品价格(元)" width="90">
          </el-table-column>
          <el-table-column prop="goods_weight" label="商品重量" width="90">
          </el-table-column>
          <el-table-column prop="goods_number" label="商品数量" width="90">
          </el-table-column>
          <el-table-column label="创建时间" width="150">
            <template slot-scope="scope">
              <span>{{scope.row.add_time| fomartTime('yyyy-MM-dd hh:mm:ss')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="del(scope.row.goods_id)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <div>
        <el-pagination :page-sizes="[5,10,15,20]" :page-size="from.pagesize" :pager-count="5" layout="total, sizes, prev, pager, next, jumper" :total="total" :current-page="from.pagenum" @size-change="editpagesize" @current-change="editpagenum">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>
<script>
import { goodlist,delgood } from "@/api/user";
import headeo from "@/components/headeo";
export default {
  components: { headeo },
  data() {
    return {
      from: {
        query: "",
        pagenum: 1,
        pagesize: 10
      },
      total: 0,
      list: []
    };
  },
  methods: {
    async getlist() {
      let { data: data } = await goodlist(this.from);
      console.log(data);
      this.total = data.data.total;
      this.list = data.data.goods;
    },
    editpagesize(i) {
      this.from.pagesize = i;
      this.getlist();
    },
    editpagenum(i) {
      this.from.pagenum = i;
      this.getlist();
    },
    del(i) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          console.log(i);
          let { data: data } = await delgood({ id: i });
          console.log(data);
          if (data.meta.status == 200) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          } else {
            this.$message({
              type: "error",
              message: "删除失败!"
            });
          }
          this.getlist();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  created() {
    this.getlist();
  }
};
</script>
<style lang="scss" scoped>
.box-card {
  width: 100%;
  margin-top: 15px;
  padding-top: 10px;
}
.earch {
  display: flex;
  margin-bottom: 15px;
  .input-with-select {
    width: 25%;
    margin-right: 15px;
  }
}
/deep/.cell {
  font-size: 12px;
  padding: 0px 10px;
}
/deep/.el-table .el-table__cell {
  padding: 12px 0;
}
</style>


