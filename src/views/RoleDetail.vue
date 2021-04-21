<template>
    <a-modal title="角色详情" :visible="visible" :confirm-loading="confirmLoading" ok-text="保存" cancel-text="取消" :destory-on-close="true" @ok="handleOk" @cancel="handleCancel">
        <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-form-model-item label="角色名称">
                <a-input v-model="form.name" />
            </a-form-model-item>
            <a-form-model-item label="角色编码">
                <a-input v-model="form.code" />
            </a-form-model-item>
        </a-form-model>
    </a-modal>
</template>
<script>
    import reqwest from 'reqwest';
    export default{
        data(){
            return {
                visible: false,
                confirmLoading: false,
                labelCol:{span:8},
                wrapperCol:{span:10},
                form:{
                    id:'',
                    name:'',
                    code:'',
                },
            };
        },
        methods:{
            parentHandleShow(record){
                console.log(record);
                if(record === undefined){
                    this.form.id = '';
                    this.form.name = '';
                    this.form.code = '';
                }else{
                    this.form.id = record.id;
                    this.form.name = record.name;
                    this.form.code = record.code;
                }
                this.visible = true;
            },
            handleOk(){
                var method = (this.form.id == '' ? 'post' : 'put');
                reqwest({
                    url:'http://localhost:8080/role',
                    method:method,
                    data:JSON.stringify(this.form),
                    contentType:'application/json',
                    type:'json',
                }).then(data => {
                    if(data.code == "0000"){
                        this.$message.success("success");
                        this.visible = false;
                    }else{
                        this.$message.error(data.msg);
                    }
                });
            },
            handleCancel(){
                this.visible = false;
            }
        },

    };
</script>
