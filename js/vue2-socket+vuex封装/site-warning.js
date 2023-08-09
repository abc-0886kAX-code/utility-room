/*
 * @Author: zhangyang
 * @Date: 2021-09-10 15:31:39
 * @LastEditors: zhangyang
 * @LastEditTime: 2021-10-21 09:50:59
 * @Description: file content
 */
import { getoutGraphics } from "@/pages/pipmap/composables/useRenderSite";
import { SetGraphic } from "@/plugins/map-context/graph";
import WarningIcon from '@/assets/images/warning-icon.gif';

import TestWarningSite from '@/assets/json/test-warning-site.json';

const SiteRender = (site) => {
    const { lgtd: longitude, lttd: latitude } = site;
    // 创建点位
    return getoutGraphics(SetGraphic({
        attributes: { ...site, tp: "warning" },
        geometry: {
            type: "point",
            longitude,
            latitude,
        },
        symbol: {
            type: "picture-marker",
            width: "32px",
            height: "32px",
            url: WarningIcon,
        },
    }))
}

// 调试方法 用于从默认点位数据中随机取出数据
const RandomSelectData = (data) => {
    const indexes = [];
    const len = data.length;
    const step = Math.floor(Math.random() * 4 + 1);

    for (let index = 0; index < step; index++) indexes.push(Math.floor(Math.random() * len))

    const selectIndex = Array.from(new Set(indexes));

    return data.filter((_, index) => selectIndex.includes(index));
}

const state = {
    toUpdate: new Date().getTime(),
    warningData: [],
    warningThreshold: 0,
    warningStatus: false,
}

const getters = {
    getWarningData: (state) => state.warningData,
    getWarningStatus: (state) => state.warningStatus,
    useWarning: (state) => state.warningData.length > 0,
    hasToUpdate: (state) => state.toUpdate
}

const mutations = {
    setWarningData(state, data) {
        // const baseData = RandomSelectData(TestWarningSite.data);

        state.warningData = data.map(SiteRender);

        state.toUpdate = new Date().getTime();

        if (state.warningData.length >= state.warningThreshold) state.warningThreshold = state.warningData.length;

        if (state.warningStatus && state.warningData.length < state.warningThreshold) return false;

        state.warningStatus = true;
    },
    setWarningStatus(state, status = false) {
        state.warningStatus = status;
    }
}

const actions = {
    _setWarningData({ commit }, data) {
        commit('setWarningData', data);
    },
    _setWarningStatus({ commit }, status) {
        commit('setWarningStatus', status);
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}