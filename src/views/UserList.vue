<template>
    <div>
        <a-page-header title="用户管理" @back="() => $router.go(-1)">
            <template slot="extra">
                <a-button @click="fetch()">查询</a-button>
                <a-button type="primary" @click="handleCreate()">新建</a-button>
            </template>
            <a-descriptions size="small" :column="3">
                <a-descriptions-item label="用户名">
                    <a-input placeholder="请输入用户名"></a-input>
                </a-descriptions-item>
                <a-descriptions-item label="手机号">
                    <a-input placeholder="请输入手机号"></a-input>
                </a-descriptions-item>
                <a-descriptions-item label="状态">
                    <a-select :allowClear="true" style="width: 60px;">
                        <a-select-option value = "1">
                            男
                        </a-select-option>
                        <a-select-option value="2">
                            女
                        </a-select-option>
                    </a-select>
                </a-descriptions-item>
            </a-descriptions>
        </a-page-header>
        
        <a-table :row-key="record => record.id" :columns="columns" :data-source='data' :pagination="pagination" :loading="loading" @change="handleTableChange">
            <template slot="action" slot-scope="text, record">
                <a href="javascript:;">详情</a>
                <a-divider type="vertical" />
                <a-propconfirm v-if="datasource.length" title="请点击确定删除" @confirm="() => handleDelete(record.id)"><a href="javascript:;">删除</a></a-propconfirm>
            </template>
        </a-table>
        
        <user-detail ref="userDetail"></user-detail>
    </div>
</template>
<script>
    import reqwest from 'reqwest';
    import UserDetail from './UserDetail.vue';
    const columns = [{
       title:'用户名',
        dataIndex: 'loginName',
        key: 'loginName'
    },{
        title: '真实姓名',
        dataIndex: 'realName',
        key: 'realName'
    },{
        title: '性别',
        dataIndex: 'gender',
        key: 'gender'
    },{
        title: '手机号',
        dataIndex: 'phone',
        key: 'phone'
    },{
        title: '邮箱',
        dataIndex: 'email',
        key: 'email'
    },{
        title: '状态',
        dataIndex: 'status',
        key: 'status'
    },{
        title: '操作',
        scopedSlots: { customRender: 'action' },
    }];
    
    export default{
        components: { UserDetail },
        data(){
            return {
                columns,
                data: [],
                loading:false,
                pagination: {current:0, pageSize: 10},
            };
        },
        methods:{
            fetch(params = {}){
                params.pageNumber = this.pagination.current;
                params.pageSize = this.pagination.pageSize;
                this.loading = true;
                reqwest({
                    url: 'http://localhost:8080/user',
                    method: 'get',
                    data: params,
                    type: 'json'
                }).then(data => {
                    this.loading = false;
                    this.data=data.content;
                    this.pagination.pageSize= data.pageable.pageSize;
                    this.pagination.current= data.pageable.pageNumber;
                    this.pagination.total= data.totalElements;
                });
            },
            handleTableChange(pagination){
                this.pagination = pagination;
                const params = {
                    pageNumber: pagination.current,
                    pageSize: pagination.pageSize
                };
                this.fetch(params);
            },
            handleCreate(){
                this.$refs.userDetail.parentHandleShow();
            },
        },
        mounted(){
            this.fetch();
        }
    };
</script>
<style></style>
