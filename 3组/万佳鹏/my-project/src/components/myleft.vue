<template>
    <div>
        <div class="toggle-button" @click="huan">|||</div>
        <el-row class="tac">
            <el-col :span="24">
                <el-menu :default-active="cid" :router="true" class="el-menu-vertical-demo" :collapse="isCollapse" :unique-opened="true" @open="handleOpen" @close="handleClose" background-color="#333744" text-color="#fff" active-text-color="rgb(64, 159, 255)">
                    <el-submenu  v-for="(item,index) in list" :key="item.id" :index="''+item.id+''">
                        <template slot="title">
                            <i :class="icon[index].icon"></i>
                            <span>{{item.authName}}</span>
                        </template>
                        <el-menu-item v-for="(ite,ind) in item.children" :key="ind" :index="'/'+ite.path" @click="ci(ite.path)"> <i class="el-icon-menu"></i> {{ite.authName}}</el-menu-item>
                    </el-submenu>
                    <!-- <el-submenu index="2">
                        <template slot="title">
                            <i class="iconfont icon-tijikongjian"></i>
                            <span>权限管理</span>
                        </template>
                        <el-menu-item index="2-1"> <i class="el-icon-menu"></i> 角色列表</el-menu-item>
                        <el-menu-item index="2-2"> <i class="el-icon-menu"></i> 权限列表</el-menu-item>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="iconfont icon-shangpin"></i>
                            <span>商品管理</span>
                        </template>
                        <el-menu-item index="3-1"> <i class="el-icon-menu"></i> 商品列表</el-menu-item>
                        <el-menu-item index="3-2">  <i class="el-icon-menu"></i> 分类参数</el-menu-item>
                        <el-menu-item index="3-3"> <i class="el-icon-menu"></i> 商品分类</el-menu-item>
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title">
                            <i class="iconfont icon-danju"></i>
                            <span>订单管理</span>
                        </template>
                        <el-menu-item index="4-1"> <i class="el-icon-menu"></i> 订单列表</el-menu-item>
                    </el-submenu>
                    <el-submenu index="5">
                        <template slot="title">
                            <i class="iconfont icon-baobiao"></i>
                            <span>数据统计</span>
                        </template>
                        <el-menu-item index="5-1"> <i class="el-icon-menu"></i> 数据报表</el-menu-item>
                    </el-submenu> -->
                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import {right} from "@/api/user"
export default {
  data() {
    return {
      isCollapse: false,
      list:[],
      icon:[
        {
          icon:'iconfont icon-user'
        },
        {
          icon:'iconfont icon-tijikongjian'
        },
        {
          icon:'iconfont icon-shangpin'
        },
        {
          icon:'iconfont icon-danju'
        },
        {
          icon:'iconfont icon-baobiao'
        }
      ],
      cid:sessionStorage.getItem("cid") || ''
    };
  },
  methods: {
    huan() {
      this.isCollapse = !this.isCollapse;
    },
    ci(i){
      this.cid='/'+i
      sessionStorage.setItem("cid",this.cid)
    },
    handleOpen() {},
    handleClose() {},
   async rights(){
     let {data:data}=await right()
     this.list=data.data
     /* console.log(this.list);
     console.log(data); */
    }
  },
  created(){
    this.rights()
  }
};
</script>
<style lang="scss" scoped>
/deep/.tac {
  width: 100%;
  .el-menu {
    border: none;
  }
  .el-submenu .el-menu-item {
    min-width: 0;
  }
  .el-submenu__title {
    display: flex;
    align-items: center;
    i{
        margin-right: 10px;
    }
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.toggle-button {
  background: #4a5064;
  padding: 2px 0;
  color: white;
  text-align: center;
}
</style>



