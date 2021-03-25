import Vue from 'vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import VueRouter from 'vue-router'
import routers from './routers'
import App from './App.vue'

Vue.config.productionTip = false

Vue.use(Antd)
Vue.use(VueRouter)

const router = new VueRouter({
	mode: 'history',
	routes: routers
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

Vue.prototype.myConfirm = function(title, callback, ...args){
    this.$confirm({
        title: title,
        okText: '确定',
        cancelText: '取消',
        onOk() {
            callback(...args)
        },
    });
};
