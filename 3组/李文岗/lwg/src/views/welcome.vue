<template>
    <div class="box">
        <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
        <div id="top" style="width: 1000px;height:700px;"></div>
        <!-- <div id="bottom" style="width: 600px;height:400px;"></div> -->

    </div>
</template>

<script>
//引入 ECharts 文件
const echarts = require("echarts");
export default {
      data(){
          return{}
      },
      methods:{
          
      },
  mounted() {
//     // 基于准备好的dom，初始化echarts实例
     var myChart = echarts.init(document.getElementById("top"));
     var  option = {
        legend: {},
        tooltip: {
            trigger: 'axis',
            showContent: false
        },
        dataset: {
            source: [
                ['product', '2012', '2013', '2014', '2015', '2016', '2017'],
                 ['Matcha Latte', 51.1, 51.4, 55.1, 53.3, 73.8, 68.7],
                ['Milk Tea', 56.5, 82.1, 88.7, 70.1, 53.4, 85.1],
               
                ['Cheese Cocoa', 40.1, 62.2, 69.5, 36.4, 45.2, 32.5],
                ['Walnut Brownie', 25.2, 37.1, 41.2, 18, 33.9, 49.1]
            ]
        },
        xAxis: {type: 'category'},
        yAxis: {gridIndex: 0},
        grid: {top: '55%'},
        series: [
            {type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: {focus: 'series'}},
            {type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: {focus: 'series'}},
            {type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: {focus: 'series'}},
            {type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: {focus: 'series'}},
            {
                type: 'pie',
                id: 'pie',
                radius: '30%',
                center: ['50%', '25%'],
                emphasis: {focus: 'data'},
                label: {
                    formatter: '{b}: {@2012} ({d}%)'
                },
                encode: {
                    itemName: 'product',
                    value: '2012',
                    tooltip: '2012'
                }
            }
        ]
    };

    myChart.on('updateAxisPointer', function (event) {
        var xAxisInfo = event.axesInfo[0];
        if (xAxisInfo) {
            var dimension = xAxisInfo.value + 1;
            myChart.setOption({
                series: {
                    id: 'pie',
                    label: {
                        formatter: '{b}: {@[' + dimension + ']} ({d}%)'
                    },
                    encode: {
                        value: dimension,
                        tooltip: dimension
                    }
                }
            });
        }
    });

    myChart.setOption(option);
  }



}
</script>

<style  scoped>
.box{
    width: 100%;
  margin-left: 200px;
}
</style>