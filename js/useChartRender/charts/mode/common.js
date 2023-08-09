/*
 * @Author: zhangyang
 * @Date: 2021-05-19 13:20:36
 * @LastEditors: zhangyang
 * @LastEditTime: 2021-05-27 10:42:03
 * @Description: file content
 */
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core';

// 引入提示框，标题，直角坐标系组件，组件后缀都为 Component
import {
    ToolboxComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    DataZoomComponent,
    MarkLineComponent,
} from 'echarts/components';

// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import {
    CanvasRenderer
} from 'echarts/renderers';

function MountECharts({ charts = [], components = [] }) {
    // 注册必须的组件
    echarts.use([
        ...charts,
        ...components,
        ToolboxComponent,
        TooltipComponent,
        GridComponent,
        LegendComponent,
        DataZoomComponent,
        MarkLineComponent,
        CanvasRenderer
    ]);
}

function RenderECharts(chartbox) {
    return echarts.init(chartbox);
}

function CountStart(dataLength, threshold = 100) {
    const value = dataLength / threshold;

    return value >= 1 ? 90 : Math.floor(90 * value);
}

export {
    MountECharts,
    CountStart,
}

export default RenderECharts