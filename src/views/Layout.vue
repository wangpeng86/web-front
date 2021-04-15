<template>
    <a-layout id="components-layout-demo-custom-trigger"  style="min-height: 100vh">
        <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
            <div class="logo"><span>管理</span></div>
            <a-menu theme="dark" mode="inline" :default-selected-keys="['1']">
                <a-sub-menu key="sub1">
                    <span slot="title"><a-icon type="control"/><span>系统管理</span></span>
                        <a-menu-item key="1">
                            <router-link to="/userList">用户管理</router-link>
                        </a-menu-item>
                        <a-menu-item key="2">
                            <router-link to="/roleList">角色管理</router-link>
                        </a-menu-item>
                        <a-menu-item key="3">
                            <router-link to="/userList">菜单管理</router-link>
                        </a-menu-item>
                </a-sub-menu>
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header style="background: #fff; padding: 0">
                <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                    @click="() => (collapsed = !collapsed)" />
            </a-layout-header>
            <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
                <router-view></router-view>
            </a-layout-content>
          <a-layout-footer style="text-align: center">
            Ant Design ©2018 Created by Ant UED
          </a-layout-footer>
        </a-layout>
    </a-layout>
</template>
<script>
    export default {
        data() {
            return {
                collapsed: false,
            };
        },
    };
</script>
<style>
    #components-layout-demo-custom-trigger .trigger {
        font-size: 18px;
        line-height: 64px;
        padding: 0 24px;
        cursor: pointer;
        transition: color 0.3s;
    }

    #components-layout-demo-custom-trigger .trigger:hover {
        color: #1890ff;
    }

    #components-layout-demo-custom-trigger .logo {
        height: 32px;
        background: rgba(255, 255, 255, 0.2);
        margin: 16px;
        text-align: center;
        font-size: 18px;
        color: #FFFFFF;
    }
</style>

