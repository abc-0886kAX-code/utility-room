/*
 * @Author: zhangyang
 * @Date: 2021-05-19 15:01:52
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-04-26 10:32:21
 * @Description: file content
 */
import { PieChart } from 'echarts/charts';
import { default as RenderECharts, MountECharts } from './common';

MountECharts({
    charts: [PieChart]
})

function aloneData(data) {
    return {
        data,
        type: 'pie',
        radius: "50%",
    }
}

function baseDataHandler(baseData = []) {
    return baseData.map(aloneData)
}

function RenderPieChart(chartbox, options = {}) {
    const pieEchart = RenderECharts(chartbox);

    // const { baseData } = options;

    pieEchart.setOption({
        ...options,
        // series: baseDataHandler(baseData)
    })

    return pieEchart;
}

export default RenderPieChart;