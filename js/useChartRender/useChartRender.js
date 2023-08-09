/*
 * @Author: abc088_6kAX_code 86451477+abc-0886kAX-code@users.noreply.github.com
 * @Date: 2022-07-28 13:47:36
 * @LastEditors: abc088_6kAX_code 86451477+abc-0886kAX-code@users.noreply.github.com
 * @LastEditTime: 2022-07-28 17:20:36
 * @FilePath: \vue2.7_workflow\src\test\utils\useChartRender.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ref, onBeforeUnmount, unref, computed } from 'vue';

export const handlerDatasetOptions = (options, data) => {
    options.dataset.source = data;

    return options
}

const loadingStyle = {
    text: '加载中...',
    showSpinner: true,    // 隐藏加载中的转圈动图
    textColor: '#9d9d9d',
    maskColor: 'rgba(255, 255, 255, 1.0)',
    fontSize: '25px',
    fontWeight: 'bold',
    fontFamily: 'Microsoft YaHei'
}

const noDataLoadingStyle = {
    text: '暂无数据',
    showSpinner: false,    // 隐藏加载中的转圈动图
    textColor: '#9d9d9d',
    maskColor: 'rgba(255, 255, 255, 1.0)',
    fontSize: '25px',
    fontWeight: 'bold',
    fontFamily: 'Microsoft YaHei'
}
// *此方法仅是依附于外部shape方法的方法
// *整个过程为重新绘制，不会出现无法更新dom的情况，但也同时存在仅配置项中的接口数据变更配置项不变整个dom需要重新绘制的问题
// condition:{
//    useDataset 是否使用echarts数据集管理数据,
//    dataLength 数据长度
// }
// *useDataset为true的情况下
// **当使用echarts数据集管理数据时(也就是useDataset为true)，则需要提供数据长度进行判断是否有数据
// **当使用echarts数据集管理数据时(也就是useDataset为true)，则需要调用setupOptions方法以及setupData方法
// *useDataset为false的情况下,必须给定数据长度，否则会造成即使有数据的情况下也会展示暂无数据
// **当不使用echarts数据集管理数据时(也就是useDataset为false)，则数据交由外部处理,最终只需要调用setOptions方法即可
// *render函数中showLoading解释
// **由于整个方法echarts绘制部分在shape函数中,此loading效果仅是一个绘制完成的loading以及绘制完成后无数据展示的loading
// **其实可以将其替换为外部loading(从接口请求到绘制完成后)
export function useChartRender(shape) {
    let chartExample = null;
    const chartsRefs = ref(null);
    const options = ref({});
    const condition = ref({ useDataset: true, dataLength: 0 });
    const dataSource = ref([]);
    const dataSourceLength = computed(() => {
        return !unref(condition).useDataset ? unref(condition).dataLength : unref(dataSource).length
    })
    const setupOptions = (source, { useDataset = true, dataLength = 0 }) => {
        options.value = source;
        !useDataset ? (condition.value = { useDataset, dataLength }) && render() : ''
    };
    const setupData = (source) => {
        dataSource.value = source;
        unref(condition).useDataset && render();
    }
    const handlerOptions = () => {
        return unref(condition).useDataset ? handlerDatasetOptions(unref(options), unref(dataSource)) : unref(options);
    }

    // loading套餐
    // 挂载 loading;
    // return add loading and setupLoading
    // 外部 setupLoading(true); 在请求数据时调用;
    // 将下方 chartExample.showLoading(loadingStyle) and 延时器 delete;
    // 延时器中的内容 chartExample.hideLoading()  replace setupLoading()
    const loading = ref(false);
    const setupLoading = (state = false) => loading.value = state;

    const render = () => {
        chartExample && chartExample.dispose();
        chartExample = shape(unref(chartsRefs), handlerOptions());
        // chartExample.showLoading(loadingStyle);
        // setTimeout(() => {
        //     unref(dataSourceLength) > 0 ? chartExample.hideLoading() : chartExample.showLoading(noDataLoadingStyle);
        // }, 3000);
        unref(dataSourceLength) > 0 ? setupLoading() : chartExample.showLoading(noDataLoadingStyle);

        window.addEventListener('resize', () => chartExample.resize(), true);
    }

    onBeforeUnmount(() => {
        window.removeEventListener('resize', () => chartExample.resize(), true);
        chartExample.dispose();
    })


    return { chartsRefs, setupOptions, setupData, loading, setupLoading }
}
