<template>
    <div class="oder">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>订单管理</el-breadcrumb-item>
            <el-breadcrumb-item>订单列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片          11111 -->
        <el-card>
            <el-row :gutter="20">
                <el-col :span="8">
                    <!-- input  -->
                    <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getusers">
                        <el-button slot="append" icon="el-icon-search" @click="getusers"></el-button>
                    </el-input>
                </el-col>
            </el-row>
            <!-- table -->
            <el-table :data="tableData" border="">
                <el-table-column type="index" label="#" width="60"></el-table-column>
                <el-table-column prop="order_number" label="订单编号" width="180"></el-table-column>
                <el-table-column prop="order_price" label="订单价格" width="180"></el-table-column>
                <el-table-column label="是否付款" width="180">
                    <template slot-scope="aa"> 
                         <el-tag v-if="aa.row.order_pay==0" size="mini" type="danger" >未付款</el-tag>
                         <el-tag v-else size="mini" type="success">以付款</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="is_send" label="是否发货" width="180"> </el-table-column>
                <el-table-column :formatter="format" label="下单时间" width="180"></el-table-column>

                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button @click="xiu(scope.row.id)" type="primary" icon="el-icon-edit" size="mini"></el-button>
                         <el-tooltip class="item" effect="dark" content="地址" placement="top-start">
                          <el-button @click="kan"  type="success" icon="el-icon-location" size="mini"></el-button>
                        </el-tooltip>                       
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
        </el-card>
         <!--dialong 修改对话框  -->
        <el-dialog title="修改地址" :visible.sync="xiuialogFormVisible" @close="addressClose">
            <el-form :model="addressForm" :rules="rules" ref="xiuruleForm">
                <el-form-item label="省市区/县" label-width="100px" prop="address1">
                         <!-- 省市区/县 -->
                      <el-cascader
                        v-model="addressForm.address1"
                        :options="cityData"
                        :props="{ expandTrigger: 'hover' }"
                        @change="handleChange">
                        </el-cascader>
                </el-form-item>
                <el-form-item label="详细地址" label-width="100px" prop="address2">
                    <el-input v-model="addressForm.address2" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="xiuialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="qdxiu">确 定</el-button>
            </div>
        </el-dialog>

          <!--dialong 物流信息  -->
        <el-dialog title="物流信息" :visible.sync="wualogFormVisible" @close="addressClose">
            <el-form :model="addressForm" :rules="rules" ref="xiuruleForm">
                 <el-timeline :reverse="reverse">
    <el-timeline-item
      v-for="(activity, index) in activities"
      :key="index"
      :timestamp="activity.timestamp">
      {{activity.content}}
    </el-timeline-item>
  </el-timeline>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="xiuialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="kan2">确 定</el-button>
            </div>
        </el-dialog>
        
    </div>
</template>

<script>
// 引入时间差
   import moment from 'moment'
//引入城市
import cityData from "./citydata.js" 
console.log(cityData);

import { orders,kanxx,} from "@/http/api.js";
         
export default {
  data() {
    return {
      tableData: [], //用户数据
      queryInfo: {
        query: "", //查询参数
        pagenum: 1,
        pagesize: 6
      },
    total:0,//总条数
      xiuialogFormVisible:false,//修改显隐
      wualogFormVisible:false,//分配角色

     
       cityData,// json数据
       city: [],
       addressForm:{
           address1:'',
           address2:'',
       },

      rules: {//验证
       address1: [
          { required: true, message: "请选择省市区县", trigger: "blur" },
          { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" }
        ],
        address2: [
          { required: true, message: "请输入描述", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
      },


        reverse: true,
        activities:[]


    };
  },
  mounted() {
    this.getusers();
  },
  methods: {
   

    async getusers() {
      //用户列表
      let res = await  orders(this.queryInfo);
        console.log(res,'oder');
        if (res.data.meta.status===200) {
            this.tableData=res.data.data.goods
            this.total=res.data.data.total
        }
    },
    async xiu(id){//修改
      this.xiuialogFormVisible=true

       
    },
    async  qdxiu(){// 确定修改 id ， 
        this.$message.success("修改成功")

     
    },
      handleChange(value) {//级联hover
        console.log(value);
      },
      handleSizeChange(val) {//分页
       this.queryInfo.pagesize=val
       this.getusers()
      },
      handleCurrentChange(val) {
       this.queryInfo.pagenum=val
       this.getusers()
      },
      addressClose(){//重置表单
          this.$refs.xiuruleForm.resetFields()
     },
     kan2(){
       this.wualogFormVisible=false
     },
     async kan(){//物流信息
      this.wualogFormVisible=true
       var Id='1106975712662'
      let res =await kanxx({id:Id})
      console.log(res,'kan');
     

     },
      format(row){//格式化时间 moment
         return  moment(row.created_time).format('YYYY-MM-DD HH:mm:ss')
       }
  


    }
};
</script>

<style lang="scss" scoped>
.oder {
  width: 100%;
  height: 100%;
  background: rgb(234, 237, 241);
 
 .el-cascader {
    display: inline-block;
    position: relative;
    font-size: 14px;
    width: 100%;
    line-height: 40px;
}
}
</style>