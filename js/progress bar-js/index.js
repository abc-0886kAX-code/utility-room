/*
 * @FilePath: \progress bar\index.js
 * @Author: zhangxin
 * @Date: 2022-12-09 14:54:08
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-12-09 17:08:47
 * @Description:
 */
function createProgressbar(el, total, use, color = '#e6a23c') {
    // 计算占比多少
    const occupy = (use / total) * 100;
    // 构建外层div 背景
    const buildChildElStyle = {
        height: '100%',
        width: '100%',
        backgroundColor: 'rgb(235, 238, 245)',
        borderRadius: '100px',
        overflow: 'hidden',
        position: 'relative',
        verticalAlign: 'middle',
    };
    const buildChildTem = `<div class="progress-bar__outer"></div>`;
    el.innerHTML += buildChildTem;
    const buildChildEl = document.querySelector('.progress-bar__outer');

    for (const key in buildChildElStyle) {
        buildChildEl.style[key] = buildChildElStyle[key];
    }

    // 构建占比div 内层

    const buildGrandsonElStyle = {
        height: '100%',
        width: `${occupy}%`,
        backgroundColor: color,
        borderRadius: '100px',
        textAlign: 'right',
        lineHeight: 1,
        whiteSpace: 'nowrap',
    };

    const buildGrandsonTem = '<div class="progress-bar__inner"></div>';

    buildChildEl.innerHTML += buildGrandsonTem;
    const buildGrandsonEl = document.querySelector('.progress-bar__inner');

    for (const key in buildGrandsonElStyle) {
        buildGrandsonEl.style[key] = buildGrandsonElStyle[key];
    }

    // 构建文本div
    // lineHeight 根据实际调整文本位置
    // occupy.toFixed(2) 计算出的小数展示多少位
    const buildTextElStyle = {
        display: 'inline',
        color: 'rgb(96, 98, 102)',
        verticalAlign: 'middle',
        fontSize: '12px',
        margin: '0 5px',
        lineHeight: '40px',
    };

    const buildTextTem = `<div class="progress-bar__innerText">${occupy.toFixed(2)}%</div>`;
    buildGrandsonEl.innerHTML += buildTextTem;

    const buildTextEl = document.querySelector('.progress-bar__innerText');
    for (const key in buildTextElStyle) {
        buildTextEl.style[key] = buildTextElStyle[key];
    }
}
