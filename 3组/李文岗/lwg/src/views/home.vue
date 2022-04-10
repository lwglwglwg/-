<template>
  <el-container>
    <!-- 头部区域 -->
    <el-header>
      <div class="head">
        <div class="box-img">
          <img src="@/assets/logo.png" style="width: 40px; height: 40px" />
        </div>
        <b>电商后台管理系统</b>
      </div>
      <el-button type="info" @click="tui">退出</el-button>
    </el-header>
    <el-container>
      <!-- 侧边栏导航区域     -->
      <!-- <el-aside :width="isCollapse? '80px' :'200px'">
        <div class="san" @click="isCollapse=!isCollapse">|||</div>
        <el-menu background-color="#333744" text-color="#fff" unique-opened router
                 :collapse="isCollapse"  :collapse-transition="false"
        >
          <el-submenu :index="item1.id+''" v-for="item1 in menusList" :key="item1.id">
            <template slot="title">
              <i :class="iconObj[item1.id]"></i>
              <span>{{item1.authName}}</span>
            </template>
            <el-menu-item :index="'/'+item2.path" v-for="item2 in item1.children" :key="item2.id">
               <template >
              <i class="el-icon-menu"></i>
              <span>{{item2.authName}}</span>
            </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside> -->

      <el-aside :width="isCollapse ? '80px' : '200px'">
        <div class="san" @click="isCollapse = !isCollapse">|||</div>
        <!-- active-text-color     router跳转的属性 -->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409FFF"
          unique-opened
          router
          :collapse="isCollapse"
          :collapse-transition="false"
          :default-active="activePath"
        >
          <el-submenu
            :index="item.id + ''"
            v-for="item in menusList"
            :key="item.id"
          >
            <template slot="title">
              <i :class="iconObj[item.id]"></i>
              <span>{{ item.authName }}</span>
            </template>
            <el-menu-item
              :index="'/' + item2.path"
              v-for="item2 in item.children"
              :key="item2.id"
              @click="actPath('/' + item2.path)"
            >
              <i class="el-icon-menu"></i>
              <span slot="title">{{ item2.authName }}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 主体内容区域 -->
      <el-main>
        <!-- 占位符 -->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { menus } from "@/http/api.js";
export default {
  data() {
    return {
      isCollapse: false, //左右展开1111
      iconObj: {
        //把id转图标 映射
        125: "iconfont icon-users",
        103: "iconfont icon-tijikongjian",
        101: "iconfont icon-shangpin",
        102: "iconfont icon-danju",
        145: "iconfont icon-baobiao",
      },
      menusList: [], //左侧列表
      activePath: "", //激活的导航地址
    };
  },
  created() {
    //创建11111111111
    this.getmenusList();
    this.activePath = window.sessionStorage.getItem("activePath");
  },
  methods: {
    async getmenusList() {
      let res = await menus();
      if (res.data.meta.status === 200) {
        this.menusList = res.data.data; //赋值
        // console.log(res.data.data)
      }
    },
    actPath(activePath) {
      //点击保存高亮 存
      window.sessionStorage.setItem("activePath", activePath);
    },
    tui() {
      this.$confirm("此操作将退出, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          sessionStorage.removeItem("token");
          this.$router.push("/login");
          this.$message({
            type: "success",
            message: "退出成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出",
          });
        });
    },
  },
};
</script>

<style scoped>
.el-container {
  height: 100%;
}
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #373d41;
}
.el-header .head {
  display: flex;
  align-items: center;
  color: white;
  font-size: 18px;
}
.box-img {
  margin-left: -20px;
}
.el-main {
  background: #eaedf1;
}
.el-aside {
  background: #333744;
}
.el-menu {
  border-right: 0;
}
.san {
  background: rgba(100, 0，0, transparent);
  text-align: center;
  font-weight: bold;
  color: rgba(0, 0, 200, 0.6);
}
.iconfont {
  margin-right: 10px;
}
</style>
