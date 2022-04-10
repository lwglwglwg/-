<template>
  <div>
    <!-- 数据统计 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- 1 .准备一个盒子 -->
      <div class="box" ref="box1" style="width:1000px;height:500px;"></div>
    </el-card>
  </div>
</template>

<script>
import { tuData } from "@/http/api"; //方法
import _ from 'lodash'// 3.    _.merge 合并数据

export default {
  data() {
    return {
        // 4. option配置
      option: {
        color:['rgb(212, 113, 110)','rgb(109, 124, 135)','rgb(144, 188, 194)','rgb(225, 167, 147)','rgb(178, 216, 198)'],
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
           

          axisPointer: {
            // type: 'cross',
            label: {
              backgroundColor: 'rgba(50,50,50,0.7)' ,
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
         
          {
            boundaryGap: false,
          },
          
        ],
        yAxis: [
          {
            axisLine:{  //显示线       
              show: true ,
              onZero: true ,
              symbol: 'none' ,
              symbolSize: [10, 15] ,
              symbolOffset: [0, 0] ,
             },
            axisLabel:{
              show:true,
            }
          },
          
        ]
      }
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
        var myChart = this.$echarts.init(document.querySelector('.box')); //5. 获取box1初始化
      let res = await tuData();
      if (res.data.meta.status === 200) {
         const resData = _.merge(res.data.data,this.option)// 赋值
         myChart.setOption(resData) //6. 给实例对象
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>