/*
 * @Author: zhangyang
 * @Date: 2021-05-19 15:01:52
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-04-26 10:32:21
 * @Description: file content
 */
import { PictorialBarChart } from 'echarts/charts';
import { default as RenderECharts, MountECharts } from './common';

MountECharts({
    charts: [PictorialBarChart]
})

function aloneData(data) {
    return {
        data,
        type: 'pictorialBar',
    }
}

function baseDataHandler(baseData = []) {
    return baseData.map(aloneData)
}

function RenderPictorialBarChart(chartbox, options = {}) {
    const pictorialBarEchart = RenderECharts(chartbox);

    const { baseData } = options;

    pictorialBarEchart.setOption({
        ...options,
        series: baseDataHandler(baseData)
    })

    return pictorialBarEchart;
}

export default RenderPictorialBarChart;