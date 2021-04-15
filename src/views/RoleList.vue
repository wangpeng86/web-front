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

        </a-table>
    </div>
</template>
<script>
    import reqwest from 'reqwest';

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
        key: 'status'
    },{
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime'
    }];

    export default{
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
                alert("create");
            },
        },
        mounted(){
            this.fetch();
        },
    };
</script>
<style>

</style>