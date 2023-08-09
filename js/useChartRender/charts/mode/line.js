/*
 * @Author: zhangyang
 * @Date: 2021-05-19 13:25:55
 * @LastEditors: zhangyang
 * @LastEditTime: 2021-05-19 14:57:32
 * @Description: file content
 */
import { LineChart } from 'echarts/charts';
import { default as RenderECharts, MountECharts } from './common';

MountECharts({
    charts: [LineChart]
})

function aloneData(data) {
    return {
        data,
        type: "line"
    }
}

function baseDataHandler(baseData = []) {
    return baseData.map(aloneData)
}

function RenderLineChart(chartbox, options = {}) {
    const lineEchart = RenderECharts(chartbox);

    const { baseData } = options;

    lineEchart.setOption({
        ...options,
        series: baseDataHandler(baseData)
    });

    return lineEchart;
}

export default RenderLineChart;