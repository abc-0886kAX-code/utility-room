/*
 * @Author: zhangyang
 * @Date: 2021-10-08 17:06:29
 * @LastEditors: zhangyang
 * @LastEditTime: 2021-12-28 11:12:33
 * @Description: file content
 */
import { mapActions } from "vuex";
import { default as useSocketClient } from '@/utils/socket';
// process.env.VUE_APP_SOCKET_URL

export default {
    name: 'socket-mixins',
    mixins: [],
    components: {},
    props: {},
    data() {
        //这里存放数据
        return {
            ...useSocketClient(process.env.VUE_APP_SOCKET_URL, this.handlerMessage)
        };
    },
    //监听属性 类似于data概念
    computed: {
        token() {
            return this.$store.getters.token;
        },
    },
    //监控data中的数据变化
    watch: {
        token: {
            handler(newVal) {
                if (!newVal) return false;
                this.client.connect(newVal);
            },
            immediate: true,
        },
    },
    //方法集合
    methods: {
        ...mapActions("siteWarning", [
            '_setWarningData'
        ]),
        handlerMessage(response) {
            const { type, content } = response;
            if (type === 'warning') this._setWarningData(content);
        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() { },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() { },
    beforeCreate() { }, //生命周期 - 创建之前
    beforeMount() { }, //生命周期 - 挂载之前
    beforeUpdate() { }, //生命周期 - 更新之前
    updated() { }, //生命周期 - 更新之后
    beforeDestroy() {
        this.client.closed();
    }, //生命周期 - 销毁之前
    destroyed() { }, //生命周期 - 销毁完成
    activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
};