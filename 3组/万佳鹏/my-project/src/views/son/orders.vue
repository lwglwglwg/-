<template>
    <div id="ord">
        <headeo :one="'订单管理'" :two="'订单列表'" />
        <el-card class="box-card">
            <div class="earch">
                <el-input placeholder="请输入内容" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div>
            <template>
                <el-table :data="lists" border style="width: 100%" :stripe="true">
                    <el-table-column type="index" width="50" label="#">
                    </el-table-column>
                    <el-table-column prop="order_number" label="订单编号">
                    </el-table-column>
                    <el-table-column prop="order_price" label="订单价格">
                    </el-table-column>
                    <el-table-column label="是否付款">
                        <template slot-scope="scope">
                            <el-tag type="danger" v-if="scope.row.pay_status==0">未付款</el-tag>
                            <el-tag v-if="scope.row.pay_status==1">已付款</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="is_send" label="是否发货">
                    </el-table-column>
                    <el-table-column label="下单时间">
                        <template slot-scope="scope">
                            <span>{{scope.row.create_time| fomartTime('yyyy-MM-dd hh:mm:ss')}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="150">
                        <template slot-scope="scope">
                            <el-button type="primary" icon="el-icon-edit" size="mini" @click="quanflag=true"></el-button>
                            <el-button type="success" icon="el-icon-location" size="mini" @click="quanflags=true"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
            <el-pagination :page-sizes="[5,10,15,20]" :page-size="from.pagesize" :pager-count="5" layout="total, sizes, prev, pager, next, jumper" :total="total" :current-page="from.pagenum" @size-change="editpagesize" @current-change="editpagenum">
            </el-pagination>
            <el-dialog title="修改地址" :visible.sync="quanflag" width="60%">
                <div>
                    <el-form :model="froms" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="角色名称" prop="roleName">
                            <el-cascader :props="{ expandTrigger: 'hover' }" size="large" :options="options" v-model="selectedOptions" @change="handleChange">
                            </el-cascader>
                        </el-form-item>
                        <el-form-item label="详细地址" prop="consignee_addr">
                            <el-input v-model="froms.consignee_addr"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="resetForm('ruleForm')">取消</el-button>
                            <el-button type="primary" @click="editroo('ruleForm')">确定</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-dialog>
            <el-dialog title="物流进度" :visible.sync="quanflags" width="60%">
                <div>
                    <!-- <div class="block">
                        <el-timeline>
                            <el-timeline-item v-for="(activity, index) in activities" :key="index" :icon="activity.icon" :type="activity.type" :color="activity.color" :size="activity.size" :timestamp="activity.timestamp">
                                {{activity.content}}
                            </el-timeline-item>
                        </el-timeline>
                    </div> -->
                    <div>
                        <el-button>取消</el-button>
                        <el-button type="primary">确定</el-button>
                    </div>
                </div>
            </el-dialog>
        </el-card>
    </div>
</template>
<script>
import headeo from "@/components/headeo";
import { orders } from "@/api/user";
import { regionData, CodeToText, dizhi } from "element-china-area-data";
export default {
  components: { headeo },
  data() {
    return {
      from: {
        query: "",
        pagenum: 1,
        pagesize: 10
      },
      froms: {
        consignee_addr: ""
      },
      lists: [],
      total: 0,
      quanflag: false,
      quanflags: false,
      rules: {
        consignee_addr: [
          { required: true, message: "请输入角色名称", trigger: "blur" }
        ]
      },
      options: regionData,
      selectedOptions: []
    };
  },
  methods: {
    async getlist() {
      let { data: data } = await orders(this.from);
      console.log(data);
      this.lists = data.data.goods;
      this.total = data.data.total;
    },
    editpagesize(i) {
      this.from.pagesize = i;
      this.getlist();
    },
    editpagenum(i) {
      this.from.pagenum = i;
      this.getlist();
    },
    resetForm(formName) {
      this.quanflag = false;
      this.froms = {};
      this.$refs[formName].resetFields();
    },
    handleChange() {
      var loc = "";
      for (let i = 0; i < this.selectedOptions.length; i++) {
        loc += CodeToText[this.selectedOptions[i]];
      }
    }
  },
  created() {
    this.getlist();
  },
  watch: {
    quanflag(val) {
      if (!val) {
        console.log(3);
        this.froms = {};
        this.selectedOptions = [];
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
.earch {
  margin-bottom: 15px;
  .input-with-select {
    width: 25%;
    margin-right: 15px;
  }
}
</style>


