/*
 * @Author: zhangyang
 * @Date: 2021-05-19 13:09:20
 * @LastEditors: zhangyang
 * @LastEditTime: 2021-05-26 17:17:26
 * @Description: file content
 */
import { isArray } from 'lodash';
import { default as RenderECharts, MountECharts } from './mode/common';
import { default as RenderLineChart } from './mode/line';
import { default as RenderBarChart } from './mode/bar';
import { default as RenderPieChart } from './mode/pie';
import { default as RenderPictorialBarChart } from './mode/pictorialBar';

const CutAttribute = (attribut) => (debris) => debris[attribut];

const SectionData = (baseData, cutFunc = {}) => {
    const data = {};

    baseData.forEach(debris => {
        for (const key in cutFunc) {

            if (!isArray(data[key])) data[key] = [];

            data[key].push(cutFunc[key](debris))
        }
    });

    return data;
};

export {
    SectionData,
    CutAttribute,

    MountECharts,
    RenderLineChart,
    RenderBarChart,
    RenderPieChart,
    RenderPictorialBarChart
}

export default RenderECharts;