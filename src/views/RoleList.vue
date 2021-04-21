<template>
    <div>
        <a-page-header title="角色管理" @back="() => $router.go(-1)" >
            <template slot="extra">
                <a-button @click="fetch()">查询</a-button>
                <a-button type="primary" @click="handleCreate()">新建</a-button>
            </template>
            <a-descriptions size="small" :column="3">
                <a-descriptions-item label="角色名称">
                    <a-input v-model="schForm.name" placeholder="请输入角色名称" />
                </a-descriptions-item>
                <a-descriptions-item label="角色编码">
                    <a-input v-model="schForm.code" placeholder="请输入角色编码" />
                </a-descriptions-item>
                <a-descriptions-item label="状态">
                    <a-select v-model="schForm.status" :allowClear="true" style="width: 60px;">
                        <a-select-option value="1">新建</a-select-option>
                        <a-select-option value="2">正常</a-select-option>
                        <a-select-option value="3">禁用</a-select-option>
                    </a-select>
                </a-descriptions-item>
            </a-descriptions>
        </a-page-header>

        <a-table :row-key="record => record.id" :columns="columns" :data-source="data" :pagination="pagination" :loading="loading" @change="handleTableChange">
            <template slot="status" slot-scope="text">
                <span v-if="text == 1">新建</span>
                <span v-if="text == 2">正常</span>
                <span v-if="text == 9">禁用</span>
            </template>
            <template slot="action" slot-scope="text,record">
                <a href="javascript:;" @click="handleEdit(record)">详情</a>
                <a-divider type="vertical" />
                <a-popconfirm title="请点击确定删除" @confirm="() => handleDelete(record.id)"><a href="javascript:;">删除</a></a-popconfirm>
                <a-divider type="vertical" />
                <a-dropdown :trigger="['click']">
                    <a class="ant-dropdown-link">更多<a-icon type="down"></a-icon></a>
                    <a-menu slot="overlay" @click="handleMoreActionClick">
                        <a-menu-item key="1">
                            <a href="javascript:;" @click="handleLinkMenu(record)">关联菜单</a>
                        </a-menu-item>
                        <a-menu-item key="2">
                            <a-popconfirm v-if="data.length" title="请点击确定启用" @confirm="() => handleEnable(record.id)"><a href="javascript:;">启用</a></a-popconfirm>
                        </a-menu-item>
                        <a-menu-item key="3">
                            <a-popconfirm v-if="data.length" title="请点击确定禁用" @confirm="() => handleDisable(record.id)"><a href="javascript:;">禁用</a></a-popconfirm>
                        </a-menu-item>
                    </a-menu>
                </a-dropdown>
            </template>
        </a-table>
        <role-detail ref="roleDetail"></role-detail>
    </div>
</template>
<script>
    import reqwest from 'reqwest';
    import RoleDetail from './RoleDetail.vue';
    const columns = [{
        title: '角色名称',
        dataIndex: 'name',
        key: 'name'
    },{
        title: '角色编码',
        dataIndex: 'code',
        key: 'code'
    },{
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        scopedSlots: {customRender: 'status'},
    },{
        title: '操作',
        scopedSlots: {customRender: 'action'},
    }];

    export default{
        components: { RoleDetail },
        data(){
            return {
                schForm:{
                    name:null,
                    code:null,
                    status:null
                },
                columns,
                data:[],
                loading:false,
                pagination:{pageSize: 5},
            };
        },
        methods:{
            fetch(params = {}){
                params=this.schForm;
                params.pageNumber = this.pagination.current;
                params.pageSize = this.pagination.pageSize;
                this.loading = true;
                reqwest({
                    url: 'http://localhost:8080/role',
                    method: 'get',
                    data: params,
                    type: 'json'
                }).then(data => {
                    console.log(data);
                    this.loading = false;
                    this.data = data.data.content;
                    const pagination = {...this.pagination};
                    pagination.total = data.data.totalElements;
                    this.pagination = pagination;
                });
            },
            handleTableChange(pagination){
                this.pagination = pagination;
                this.fetch();
            },
            handleCreate(){
                this.$refs.roleDetail.parentHandleShow();
            },
            handleEdit(record){
                this.$refs.roleDetail.parentHandleShow(record);
            },
            handleDelete(id){
                console.log(id);
            },
            handleMoreActionClick(e){
                console.log(e.key);
            },
            handleLinkMenu(record){
                console.log(record);
            },
            handleEnable(id){
                console.log(id);
            },
            handleDisable(id){
                console.log(id);
            },
        },
        mounted(){
            this.fetch();
        },
    };
</script>
<style>

</style>