<template>
        <a-modal title="用户详情" :visible="visible" :confirm-loading="confirmLoading" ok-text="保存" cancel-text="取消" :destroy-on-close="true" @ok="handleOk" @cancel="handleCancel" >
            <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
                <a-form-model-item label="用户名">
                    <a-input v-model="form.loginName" />
                </a-form-model-item>
                <a-form-model-item label="昵称">
                    <a-input v-model="form.nickName" />
                </a-form-model-item>
                <a-form-model-item label="真实姓名">
                    <a-input v-model="form.realName" />
                </a-form-model-item>
                <a-form-model-item label="性别">
                    <a-radio-group v-model="form.gender">
                        <a-radio value="1">男</a-radio>
                        <a-radio value="2">女</a-radio>
                    </a-radio-group>
                </a-form-model-item>
                <a-form-model-item label="手机号">
                    <a-input v-model="form.phone" />
                </a-form-model-item>
                <a-form-model-item label="邮箱">
                    <a-input v-model="form.email" />
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
                    loginName:'',
                    nickName:'',
                    realName:'',
                    gender:'',
                    phone:'',
                    email:'',
                },
            };
        },
        methods:{
            handleOk(){
                reqwest({
                    url:'http://localhost:8080/user',
                    method:'post',
                    data:JSON.stringify(this.form),
                    contentType:'application/json',
                    type:'json',
                }).then(data => {
                    console.log(data);
                });
            },
            handleCancel(){
                this.visible = false;
            },
            parentHandleShow(record){
                console.log(record);
                if(record === undefined){
                    this.form.id = '';
                    this.form.loginName = '';
                    this.form.nickName = '';
                    this.form.realName = '';
                    this.form.gender = '';
                    this.form.phone = '';
                    this.form.email = '';
                }else{
                    this.form.id = record.id;
                    this.form.loginName = record.loginName;
                    this.form.nickName = record.nickName;
                    this.form.realName = record.realName;
                    this.form.gender = record.gender;
                    this.form.phone = record.phone;
                    this.form.email = record.email;
                }
                this.visible = true;
            }
        },
    };
</script>