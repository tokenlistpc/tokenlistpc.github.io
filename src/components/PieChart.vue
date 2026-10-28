<script setup>
import * as echarts from "echarts";
import { onMounted, onUnmounted, watch } from "vue";


const props = defineProps({
    data: {
        type: Array,
        default: []
    },
    tokenSymbol: {
        type: String,
        default: ""
    }
})

onUnmounted(() => {
    echarts.dispose;
});

watch(
    () => [props.data, props.tokenName],
    (value) => {
        initChart();
    },
)

function initChart() {
    let chart = echarts.init(document.getElementById("pieEchart"));
    chart.setOption({
        tooltip: {
            trigger: 'item'
        },
        tooltip: {
            show: true,
        },
        color: ['#FFB0E3', '#58CFFF', '#7A79FF'],
        legend: {
            orient: "vertical",  //竖直展示，如果横着的话，这个可以直接去掉
            right: 20,
            top: "center",
            align: "left",
            itemGap: 20,  //数据上下的距离
            icon: "circle", //圆形小点展示，默认为方形，去掉就是方形展示
            itemWidth: 16, // 设置宽度
            textStyle: {
                fontSize: '14px',
            },
            data: props.data,
        },
        series: [
            {
                type: 'pie',
                radius: ['60%', '90%'],
                avoidLabelOverlap: false,
                label: {
                    show: true,
                    position: 'center',
                    formatter: () => {
                        return props.tokenName
                    },
                    fontStyle: 'bold',
                    fontSize: '24px',
                    emphasis: {//中间文字显示
                        show: true,
                    }
                },
                labelLine: {
                    // show: false
                },
                data: props.data
            }
        ]
    });
    window.onresize = function () {
        chart.resize();
    };
}



</script>
<template>
    <div class="echart-box">
        <div class="pie-echart" id="pieEchart"></div>
    </div>
</template>

<style scoped lang='scss'>
.echart-box {
    height: 260px;
    .pie-echart {
        width: 100%;
        height: 100%;
        max-width: 520px;
        margin: 0 auto;
    }
}
</style>