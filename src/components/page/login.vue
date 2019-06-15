<template>
 <div class="wrapper">
     <div class="box">
        <div class="top">
            后台管理系统
        </div>
        <div class="bottom">
            <el-select v-model="value" clearable placeholder="请选择您的角色" size='medium' style="width:280px" class="sele">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <el-input v-model="input1" placeholder="用户名" style="width:280px" class="user"></el-input>
            <el-input placeholder="密码" v-model="input2" show-password style="width:280px" class='pwd'></el-input>
            <el-button type="primary" plain class="btn" @click="toInd()">登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
        </div>
     </div>
 </div>
</template>

<script type="text/ecmascript-6">
import API from '../../commont/js/API'
export default {
 components: {},
 props: {},
 data () {
 return {
             options: [{
          value: '0',
          label: '超级管理员'
        }, {
          value: '1',
          label: '管理员'
        }, {
          value: '2',
          label: '用户'
        }],
        value: '',
        input1: '',
        input2:'',
 };
 },
 watch: {},
 computed: {},
 methods: {
     toInd(){
         if(this.options.value==''||this.input1==''||this.input2==''){
        this.$message({
          message: '角色、用户或密码不能为空',
          type: 'warning'
        });
         }else{
             var name=this.input1
             var pass=this.input2
             var type=this.value
             var user={
                 name,
                 pass,
                 type
             }
             var data=this.$qs.stringify(user)           
             this.$http({
                 url:API.login,
                 method:'post',
                 data:data
             }).then(d=>{
                 localStorage.setItem("key",d.data.isAdmin)
                 localStorage.setItem("name",user.name)
                 var a=localStorage.getItem("key");
                 var a=localStorage.getItem("name");
                 console.log(d);
                 console.log(a);
 
                 if(d.data.code!=0){
                     this.$message({
                      message: d.data.info,
                     type: 'warning'
                });
                 }else{
                    this.$router.push('/cIndex')
                    this.$message({
                     showClose: true,
                     message: d.data.info,
                     type: 'success'
                    }
                     )
                     
        
                    
                     
                 }              
             })
         }
     }
 },
 mounted () {
     
 }
};
</script>
<style lang='stylus' scoped>
@import '../../commont/stylus/index.styl'
.wrapper
    background url('../../assets/img/xinkong.gif') no-repeat
    background-size 100% 100%
    height 100vh
    .box
        color #fff
        font-size 26px
        width 320px
        height 500px;
        background rgba(252,255,255,0.5)
        position fixed
        left 80%;
        top 50%
        margin-left -160px;
        margin-top -250px;
        .top
            color #fff
            font-size 32px
            height 70px;
            border-bottom 1px solid #F3F3F3
            line-height 70px
            // letter-spacing 30px
            text-align center
            font-weight bold
        .bottom
            text-align center
            .sele
                margin-top 30px
            .user
                margin-top 100px
            .pwd
                margin-top 15px
            .btn
                margin-top 45px;
                width 280px
                font-size 20px
            
</style>
