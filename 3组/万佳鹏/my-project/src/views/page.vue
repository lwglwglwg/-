<template>
    <div id="page">
        <el-container>
            <el-header>
                <div>
                    <img src="../assets/logo.png" alt="">
                    <p>电商后台管理系统</p>
                </div>
                  <el-button type="info">退出</el-button>
            </el-header>
            <el-container>
                <el-aside width="">
                    <myleft></myleft>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
import myleft from "@/components/myleft"
export default {
    components:{myleft},
    data(){
        return{
            
        }
    },
    methods:{
        
    }
}
</script>

<style lang="scss" scoped>
#page {
  height: 100%;
}

.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  background: #373f41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    display: flex;
    align-items: center;
    img {
      width: 40px;
      height: 40px;
    }
    p {
      color: white;
      margin-left: 15px;
      font-size: 20px;
    }
  }
}

.el-aside {
  background-color: #d3dce6;
  background: #333744;
}

.el-main {
   background: #eaedf1;
  color: #333;
  height: 100%;
}
.el-container {
  height: 100%;
}
</style>

