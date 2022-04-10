<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{one}}</el-breadcrumb-item>
            <el-breadcrumb-item>{{two}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>
<script>
export default {
    props:['one','two'],
    data(){
        return{

        }
    }
}
</script>
<style lang="scss" scoped>
/deep/.el-breadcrumb__item{
    font-size: 10px;
}
</style>

