<template>
    <div class="users">
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
                    <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getusers">
                        <el-button slot="append" icon="el-icon-search" @click="getusers"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="16">
                    <el-button type="primary" @click="adddialogFormVisible= true">添加用户</el-button>
                </el-col>
            </el-row>
            <!-- table -->
            <el-table :data="tableData" border="">
                <el-table-column type="index" label="#" width="60"></el-table-column>
                <el-table-column prop="username" label="姓名" width="180"></el-table-column>
                <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
                <el-table-column prop="mobile" label="电话" width="180"></el-table-column>
                <el-table-column prop="role_name" label="角色" width="180"></el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.mg_state" @change="xiuState(scope.row)"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button @click="xiu(scope.row.id)" type="primary" icon="el-icon-edit" circle ></el-button>
                        <el-button @click="del(scope.row.id)" type="danger" icon="el-icon-delete" circle></el-button>
                         <el-tooltip class="item" effect="dark" content="角色分配" placement="top-start">
                          <el-button @click="fenpei(scope.row)"  type="warning" icon="el-icon-setting" circle></el-button>
                        </el-tooltip>
                       
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
        </el-card>
        <!--dialong 添加对话框  -->
        <el-dialog title="添加" :visible.sync="adddialogFormVisible">
            <el-form :model="addform" :rules="rules" ref="addruleForm">
                <el-form-item label="姓名" label-width="80px" prop="username">
                    <el-input v-model="addform.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" label-width="80px" prop="password">
                    <el-input v-model="addform.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" label-width="80px" prop="email">
                    <el-input v-model="addform.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号" label-width="80px" prop="mobile">
                    <el-input v-model="addform.mobile" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="adddialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addUser">确 定</el-button>
            </div>
        </el-dialog>
         <!--dialong 修改对话框  -->
        <el-dialog title="修改" :visible.sync="xiuialogFormVisible">
            <el-form :model="xiuform" :rules="rules" ref="addruleForm">
                <el-form-item label="姓名" label-width="80px" prop="username">
                    <el-input v-model="xiuform.username" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="邮箱" label-width="80px" prop="email">
                    <el-input v-model="xiuform.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号" label-width="80px" prop="mobile">
                    <el-input v-model="xiuform.mobile" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="xiuialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="qdxiu">确 定</el-button>
            </div>
        </el-dialog>
           <!--dialong 分配角色  -->
        <el-dialog title="分配角色" :visible.sync="fendalogFormVisible">
              <div class="f">
                  <p>当前用户: {{userinfo.username}}</p>
                  <p>当前角色: {{userinfo.role_name}}</p>
                   <div>
                       分配角色:
                       <el-select v-model="roleId" placeholder="请选择">
                     <el-option
                       v-for="item in rightsList"
                       :key="item.id"
                       :label="item.roleName"
                       :value="item.id">
                     </el-option>
                   </el-select>
                   </div>
              </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="fendalogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="qdfen">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { usersData, addusers ,delusers,put1users,put2users,swituses,rolelist,rolelist2} from "@/http/api.js";
export default {
  data() {
     var validateName = (rule, value, callback) => {
    let reg=/^[\u2E80-\u9FFF]\w\d{10}$/;//Unicode编码中的汉字范围 + \w英文 \d 数字
     if (value && value.length > 0) {
        if(!reg.test(value)){
            callback([new Error('姓名输入不合法')]);
        }else{
            callback();
        }
     }else if(value.length == 0){
        callback();
     } else {
        callback(new Error('姓名输入不合法'));
     }
    };
    //qq
    var QQ = (rule, value, callback) => {
      const qq = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/;
      if (qq.test(value)) {
        return callback();
      } else {
        return callback("邮箱格式不对");
      }
    };
    //tel
    var Tel = (rule, value, callback) => {
      const tt = /^1[3-9]\d{9}$/;
      if (tt.test(value)) {
        return callback();
      } else {
        return callback("手机格式不对");
      }
    };
    return {
      tableData: [], //用户数据
      queryInfo: {
        query: "", //查询参数
        pagenum: 1,
        pagesize: 2
      },
    total:0,//总条数
      adddialogFormVisible: false, //添加显隐
      xiuialogFormVisible:false,//修改显隐
      fendalogFormVisible:false,//分配角色
      addform: {//添加
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
       xiuform: {//修改
        username: "",
        email: "",
        mobile: ""
      },
      rules: {//验证
        username: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: QQ, trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { validator: Tel, trigger: "blur" }
        ]
      },

       roleId:'',//保存角色id
       rightsList:[],//权限列表
       userinfo:{},//用户信息
       
    };
  },
  mounted() {
    this.getusers();
  },
  methods: {
    async  fenpei(row){//1 角色列表 分配角色
        this.fendalogFormVisible=true
       let res =await  rolelist()
       this.userinfo=row//赋值
       if (res.data.meta.status===200) {
         this.rightsList=res.data.data//获取角色列表
       }        
   },
    async  qdfen(row){//确定分配     用户id 角色id
          if (!this.roleId) {//角色不能为空
              this.$message.info('角色不能为空')
          } else {
             let res =await rolelist2({id:this.userinfo.id,rid:this.roleId})
             if (res.data.meta.status===400) {
                 this.$message.error("不能为admin分配角色")
             }else if(res.data.meta.status===200){
                this.getusers()//查询渲染
                this.fendalogFormVisible=false
                this.$message({
                    type:'success',
                    message: '<i class="el-icon-s-promotion"></i>角色分配成功',
                     dangerouslyUseHTMLString: true,
                    center: true,
                })
             }else{
                 this.$message.error("分配角色失败")

             }
          }
     
        //  let res =await rolelist2({id:this.userinfo.id,rid:this.roleId})
        //  if (res.data.meta.status===200) {
        //      this.$message.success("分配角色设置成功")
        //      console.log(res,'22');
             
        //  }
      
       
   },


    async getusers() {
      //用户列表
      let res = await usersData(this.queryInfo);
        console.log(res.data,'111');
      this.tableData = res.data.data.users;
      this.total=res.data.data.total//赋值
    },
    addUser() { //添加
      this.$refs.addruleForm.validate(async valid => {
        if (valid) {
          let res = await addusers(this.addform);
        //   console.log(res);
          if (res.data.meta.status === 201) {
            this.getusers(); //重新调用
            this.$message.success("添加成功");
            this.adddialogFormVisible = false; //关闭
          } else {
            this.$message.error("添加失败");
          }
        } else {
          this.$message.error("校验格式不对");
        }
      });
    },
    del(id){//删除用户 
       this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
         let res =await  delusers(id)
         this.getusers()//重新调用
        //  console.log(res);
           
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
    async xiu(id){//修改
       let res =await put1users(id)
     //    console.log(res);
       if (res.data.meta.status===200) {
           this.xiuform=res.data.data//回填
           this.xiuialogFormVisible=true
       }
    },
    async  qdxiu(){// 确定修改 id ， 
        let res =await put2users({id:this.xiuform.id,email:this.xiuform.email,mobile:this.xiuform.mobile}) 
        console.log(this.xiuform,'f');//
        if (res.data.meta.status===200) {
            this.getusers()
            this.$message.success(res.data.meta.msg)
           this.xiuialogFormVisible=false

        }else{
            this.$message.error("修改失败")
        }   
    },
      handleSizeChange(val) {//分页
       this.queryInfo.pagesize=val
       this.getusers()
      },
      handleCurrentChange(val) {
       this.queryInfo.pagenum=val
       this.getusers()
      },
   async xiuState(row){//修改状态chang事件
        let UId= row.id//用户id
        let stateId = row.mg_state //用户状态
        let res = await swituses(UId+'/state/'+stateId) 
          console.log(res,'sw');
          if (res.data.meta.status===200) {
              this.getusers()
              this.$message.success('用户'+res.data.meta.msg)
          }else{
              this.$message.error("修改状态失败")

          }
          
      
   },
  


  }
};
</script>

<style lang="scss" scoped>
.users {
  width: 100%;
  height: 100%;
  background: rgb(234, 237, 241);
}
</style>