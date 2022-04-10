<template>
    <div class="add">
        <!-- 添加商品 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>添加商品</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- card -->
        <el-card>
            <!-- alert -->
            <el-alert title="添加商品信息" type="info" show-icon center :closable="false"></el-alert>
            <el-steps :space="200" finish-status="success" :active="actindex-0" align-center>
                <el-step title="基本信息"></el-step>
                <el-step title="商品参数"></el-step>
                <el-step title="商品属性"></el-step>
                <el-step title="商品图片"></el-step>
                <el-step title="商品内容"></el-step>
                <el-step title="完成"></el-step>
            </el-steps>
            <!--  form-->
            <el-form label-position="top" label-width="100px"  :model="addForm" :rules="rules" ref="addruleForm">
                <el-tabs tab-position="left"
                       :before-leave="beforeTableleave"
                       @tab-click="tabclickId"
                       
                      v-model="actindex"
                       >
                       <!-- 基本信息 -->
                    <el-tab-pane label="基本信息" name="0">
                        <el-form-item label="商品名称" prop="goods_name">
                            <el-input v-model="addForm.goods_name"></el-input>
                        </el-form-item>
                        <el-form-item label="商品价格" >
                            <el-input v-model="addForm.goods_price" type="number"></el-input>
                        </el-form-item>
                        <el-form-item label="商品重量" prop="goods_weight">
                            <el-input v-model="addForm.goods_weight" type="number"></el-input>
                        </el-form-item>
                        <el-form-item label="商品数量" prop="goods_number">
                            <el-input v-model="addForm.goods_number" type="number"></el-input>
                        </el-form-item>
                        <el-form-item label="商品分类" prop="goods_cat">
                            <el-cascader
                             v-model="addForm.goods_cat"
                             :options="cateList"
                             :props="goodProps"
                             @change="handleChange">
                             </el-cascader>
                        </el-form-item>
                    </el-tab-pane>
                    <!-- 分类参数 -->
                    <el-tab-pane label="商品参数">
                        <!-- 动态 -->
                        <el-form-item v-for="item in manyData" :key="item.attr_id" :label="item.attr_name">
                              <el-checkbox-group v-model="item.attr_vals">
                                <el-checkbox :label="cb" v-for="(cb, i) in item.attr_vals" :key="i" border></el-checkbox>
                              </el-checkbox-group>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="商品属性">
                        <!-- 静态 -->
                         <el-form-item :label="item.attr_name" v-for="item in onlyData" :key="item.attr_id">
                           <el-input v-model="item.attr_vals"></el-input>
                         </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="商品图片">
                      <el-upload
                        class="upload-demo"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :file-list="fileList"
                        list-type="picture">
                        <el-button size="small" type="primary">点击上传</el-button>
                      </el-upload>
                    </el-tab-pane>
                    <el-tab-pane label="商品内容">
                        <!-- 富文本编辑器 -->
                         <quillEditor v-model="addForm.goods_introduce"></quillEditor>
                          <!-- 添加商品 -->
                        <el-button type="primary" class="btn" @click="add">添加商品</el-button>
                    </el-tab-pane>
                </el-tabs>
            </el-form>
        </el-card>
    </div>
</template>

<script>
// 富文本
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { addQuillTitle } from '../../text/quill-title.js'

// 方法
import {goodcate_list,cateparams,addgood,} from "@/http/api"
export default {
  components:{quillEditor},
  data() {
    return {
      actindex: "0", //步骤条默认激活
      tabPosition: "left", //左边
      goods:[],//添加商品数据
      addForm: {
        //添加表单
        goods_name: "",
        goods_cat: "",//商品分类
        goods_price: "",
        goods_number: "",
        goods_weight: "",
        goods_introduce: "",
        pics: [],//图片
        attrs: []//参数
      },
      cateList:[],//接收商品列表
      goodProps:{//配置
           expandTrigger: 'hover',
            value: 'cat_id',//唯一
            label: 'cat_name',
            children:'children',
      },
       rules: {//验证
         goods_name: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        goods_weight: [
          { required: true, message: "请输入重量", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
         goods_number: [
          { required: true, message: "请输入数量", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        //  goods_cat: [
        //   { required: true, message: "请输入商品分类", trigger: "blur" },
        //   { min: 10, max: 50, message: "长度在 10 到 50 个字符", trigger: "blur" }
        // ],
       },
       manyData:[],//动态参数列表
       onlyData:[],//静态参数列表

    //    上传
    fileList: []
    };

  },
  mounted() {
     
      this.goodcate_list()
     addQuillTitle(); 
  },
  computed:{//获取动态参数
    getCateId(){
        if (this.addForm.goods_cat.length===3) {
            return this.addForm.goods_cat[2]
        }
        return null
    }
  },
  methods: {
      async  goodcate_list(){
        let res =await goodcate_list()
        // console.log(res,'list');
        if (res.data.meta.status===200) {
            this.cateList=res.data.data
        }
        
      },
       handleChange(value) {//级联菜单选中触发
         if (this.addForm.goods_cat.length !==3) {
              this.addForm.goods_cat =[]
         }
      },
      beforeTableleave(activeName, oldActiveName){ //阻止向下跳转 before-leave
           if (oldActiveName==='0' && this.addForm.goods_cat.length !==3) {
                this.$message.error("请选择商品分类")
                return false
           }
      },
      async tabclickId(){ //点击每一个tab触发 
           if (this.actindex==='1') {
           let res = await cateparams({id:this.getCateId,sel:'many'}) 
             console.log(res,'11');
                 if (res.data.meta.status !==200) {   
                      return this.$message.error('获取动态参数列表失败！')
                 } 
                  res.data.data.forEach(item => {//去掉字符串 变蓝
                   item.attr_vals =
                     item.attr_vals.length === 0 ? [] : item.attr_vals.split(' ')
                 })
       
             this.manyData=res.data.data
           } else {//静态
                let res = await cateparams({id:this.getCateId,sel:'only'}) 
                  console.log(res,'22');
                 if (res.data.meta.status!==200) {                   
                   return this.$message.error('获取静态参数列表失败！')
                 } 
              this.onlyData=res.data.data
           }
      },
      handleRemove(file, fileList) {//图片上传
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
     add(){//添加商品
          this.addForm.goods_cat = this.addForm.goods_cat.join(',')//join
         this.$refs.addruleForm.validate(async (valid) => {
             if (valid) {  //对象格式传
               let form =this.addForm.goods_name
             let res =await addgood({
               goods_name:this.addForm.goods_name,
              goods_cat:this.addForm.goods_cat,
               goods_price:this.addForm.goods_price,
              goods_number:this.addForm.goods_number,
               goods_weight:this.addForm.goods_weight,
               goods_introduce:this.addForm.goods_introduce,
             })
              if (res.data.meta.status===201) {
                 this.goods = res.data.data
                  this.goodcate_list()
                 this.$message.success("添加成功")
                this.$router.push("/goods")
              } else {
               this.$message.error("添加失败")
                
              }
             console.log(res,'good');
             
             } else {
               this.$message.error("验证格式不对")
             }
         })
    
      }

  }
};
</script>

<style lang="scss" scoped>
.add {
  width: 100%;
  height: 100%;
  background: rgb(234, 237, 241);
  .el-alert {
    margin: 10px 0;
  }
  .el-steps {
    margin: 10px 0;
  }
}

.btn{
  margin: 10px;
}


.ql-editor{
  height: 400px;
  .ql-container{
  height: 300px;
 }
}
</style>
<style lang="scss">
 .ql-editor{
  height: 400px;
  .ql-container{
  height: 300px;
}
}

</style>
