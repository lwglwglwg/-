<template>
    <div class="rights">
        <!-- 权限 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-table :data="tableData" border="">
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column prop="authName" label="权限名称"></el-table-column>
                <el-table-column prop="path" label="路径"></el-table-column>
                <el-table-column prop="name" label="权限等级">
                    <template slot-scope="aa">
                        <el-tag v-if="aa.row.level==0" type="primary">一级</el-tag>
                        <el-tag v-else-if="aa.row.level==1" type="success">二级</el-tag>
                        <el-tag v-else type="danger">三级</el-tag>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
import { right_Lists } from "@/http/api.js";
export default {
  data() {
    return {
      tableData: [] //权限列表
    };
  },
  mounted() {
    this.getright_Lists();
  },
  methods: {
    async getright_Lists() {
      let res = await right_Lists();
      console.log(res);
      if (res.data.meta.status === 200) {
        this.tableData = res.data.data;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.rights {
  width: 100%;
  height: 100%;
  background: rgb(234, 237, 241);
}
</style>