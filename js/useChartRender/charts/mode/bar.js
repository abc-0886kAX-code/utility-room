/*
 * @Author: zhangyang
 * @Date: 2021-05-19 14:46:57
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-06-02 10:19:31
 * @Description: file content
 */
import { BarChart } from 'echarts/charts';
import { DatasetComponent } from 'echarts/components';
import { isNil } from 'lodash';
import { CountStart, default as RenderECharts, MountECharts } from './common';

MountECharts({
    charts: [BarChart],
    components: [DatasetComponent]
})

function RenderBarChart(chartbox, options = {}) {
    const barEchart = RenderECharts(chartbox);
    const { dataZoom, dataset, xAxis: xAxisBase, yAxis: yAxisBase, series: baseSeries } = options;
    const echartOptions = {
        ...options,
        animationEasing: "elasticOut",
        animationDelayUpdate: setAnimation(0),
        toolbox: setToolbox(options),
        tooltip: setTooltip(options),
        grid: setGrid(options),
        xAxis: xAxisBase.map(xAxisSet),
        yAxis: yAxisBase.map(yAxisSet),
        series: baseSeries.map(setSeries),
    }


    const dataLength = isNil(dataset) ? xAxisBase[0].data.length : dataset.source.length;

    echartOptions.dataZoom = isNil(dataZoom) ? setDataZoom(dataLength) : dataZoom;

    barEchart.setOption(echartOptions);

    return barEchart;
}

const setToolbox = (options) => {
    const { toolbox } = options;
    return toolbox ?? {
        show: true,
        feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: {
                show: true,
                type: ["stack", "line", "bar", "pictorialBar"],
            },
            restore: { show: true },
            saveAsImage: { show: true },
        },
    }
}

const setTooltip = (options) => {
    const { tooltip } = options;
    return tooltip ?? {
        trigger: "axis",
        axisPointer: {
            type: "shadow",
            label: {
                show: true,
            },
        },
    }
}

const setGrid = (options) => {
    const { grid } = options;
    return grid ?? {
        top: "14%",
        left: "6%",
        right: "6%",
        containLabel: true,
    }
}

const setDataZoom = (dataLength) => {
    return {
        start: CountStart(dataLength, 100),
        end: 100,
    }
}

const xAxisSet = (cell, index) => {
    return {
        ...cell,
        axisTick: {
            alignWithLabel: true,
        },
    }
}

const yAxisSet = (cell, index) => {
    return {
        ...cell,
        axisLine: {
            show: true,
        },
    }
}

const setSeries = (cell, index) => {
    const { yAxisIndex } = cell;

    return {
        ...cell,
        yAxisIndex: yAxisIndex ?? index,
        animationDelay: setAnimation(index * 100)
    }
}

const setAnimation = (offset) => (idx) => idx * 10 + offset;

export default RenderBarChart;