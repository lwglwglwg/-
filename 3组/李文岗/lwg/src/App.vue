<template>
  <div id="app">
   
    <router-view/>
  </div>
</template>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
  
}
html,body, #app{
   width: 100%;
   height: 100%;
   background: rgb(43, 75, 107);
}
.el-card{
  margin: 10px 0;
  width: 100%;
}
.el-table{
  margin-top: 10px;
}
.el-cascader-panel{
  height: 300px;
}
</style>
