<template>
    <div>
        <headeo :one="'权限管理'" :two="'权限列表'" />
        <el-card class="box-card">
            <template>
                <el-table :data="lists" border style="width: 100%" :stripe="true">
                    <el-table-column type="index" width="50" label="#">
                    </el-table-column>
                    <el-table-column prop="authName" label="权限名称">
                    </el-table-column>
                    <el-table-column prop="path" label="路径">
                    </el-table-column>
                    <el-table-column prop="address" label="权限等级">
                        <template slot-scope="scope">
                            <el-tag v-if="scope.row.level==0">一级</el-tag>
                            <el-tag v-if="scope.row.level==1" type="success">二级</el-tag>
                            <el-tag v-if="scope.row.level==2" type="danger">三级</el-tag>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </el-card>
    </div>
</template>
<script>
import { treequan } from "@/api/user";
import headeo from "@/components/headeo";
export default {
  components: { headeo },
  data() {
    return {
      lists: []
    };
  },
  methods: {
    async list() {
      let { data: data } = await treequan({
        type: "list"
      });
      console.log(data);
      this.lists = data.data;
    }
  },
  created() {
    this.list();
  }
};
</script>
<style lang="scss" scoped>
/* 样式 */
.box-card {
  width: 100%;
  margin-top: 15px;
  padding-top: 10px;
}
/deep/.cell {
  font-size: 12px;
  padding: 0px 10px;
}
</style>

