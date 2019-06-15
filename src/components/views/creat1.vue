<template>
 <div class="wrapper">
         <div id="yh" v-show="1<2">
        <h4>添加/修改用户</h4>
       <div class="box">账号  <el-input v-model="yninput" placeholder="请输入内容" style="width:750px" :disabled='a'></el-input></div>
      <div class="box"> 密码  <el-input placeholder="请输入密码" v-model="ypinput" show-password style="width:750px" :disabled='a'></el-input></div>
       <div class="box"  v-show="idd==0"> 确认密码  <el-input placeholder="请输入密码" v-model="ypinput1" show-password style="width:750px"></el-input></div>
       <div class="box">电话  <el-input v-model="ydinput" placeholder="请输入内容" style="width:750px"></el-input></div>
       <div class="box">邮箱  <el-input v-model="yyinput" placeholder="请输入内容" style="width:750px"></el-input></div>
       <div class="radio">性别  <template><el-radio v-model="radio" label="1" :disabled='a'>男</el-radio>
        <el-radio v-model="radio" label="2" :disabled='a'>女</el-radio></template></div>
        <div class="box">身份证号  <el-input v-model="ysfinput" placeholder="请输入内容" style="width:750px" :disabled='a'></el-input ></div>
        <div class="box">备注  <el-input v-model="ybzinput" placeholder="请输入内容" style="width:750px"></el-input></div>
       <div class="box">
        <div class="block">
          <span class="demonstration">日期</span>
          <el-date-picker v-model="value" type="date" placeholder="选择日期" style="width:750px">
          </el-date-picker>
        </div>
        <div class="btn">
            <el-row>
                <el-button type="primary" round @click="zhuce()">{{b}}</el-button>
                <el-button type="primary" round @click="back()">返回</el-button>
            </el-row>
        </div>
       </div>
     </div>
 </div>

</template>

<script type="text/ecmascript-6">
import API from '../../commont/js/API'
import fn from '../../commont/js/diaoxian'
import yz from '../../commont/js/tankuang'
import yza from '../../commont/js/yanzheng'
export default {
 components: {},
 props: {},
 data () {
 return {
      yninput:'',
      ypinput:'',
      ypinput1:'',
      ydinput:'',
      yyinput:'',
      ysfinput:'',
      ybzinput:'',
      pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        value: '',
        radio: '',
        a:false,
        b:'注册',
        idd:''
 };
 },
 watch: {},
 computed: {},
 methods: {
   zhuce(){
     console.log(111)
     var name=this.yninput
     var pass=this.ypinput
     var pass1=this.ypinput1
     var tel=this.ydinput
     var email=this.yyinput
     var sex=this.radio==1?'男':'女'
     var idx=this.ysfinput
     var des=this.ybzinput
     var time=this.value
     var id=this.idd
     var usera={
         name,
         pass,
         tel,
         email,
         sex,
         idx,
         des,
         time
       }
     if (!yza.canshu(usera)){
        yz.kong(this)
      return 
    }
    if(!yza.use(name)){
        yz.zh(this)
        return 
    }
    if(!yza.pho(tel)){
        yz.sj(this)
        return 
    }
    if(!yza.ema(email)){
        yz.yx(this)
        return 
    }
    if(!yza.sfid(idx)){
        yz.sfz(this)
        return 
    }
     if(this.a==true){
         var user={
            id,
            tel,
            email,
            des,
            time
          }
          this.$http({
           url:API.updateUser,
           method:'get',
           params:user
             }).then(d=>{
    if(d.data.code==-1){
         fn.errCallback(this,d)
          }
               if(d.data.code==0){
                this.idd=''
                  this.$router.push('/cIndex/user')
                  this.$message({
                message:d.data.info,
                type: 'success'
                  })
                }else{
                  this.$message({
                  message:d.data.info,
                  type: 'warning'
                 });
                }
             })


     }else{

      var user={
         name,
         pass,
         tel,
         email,
         sex,
         idx,
         des,
         time
       }
      if (!yza.mima(pass,pass1)){
          yz.mima(this)
          return 
        }
       this.$http({
            url:API.addUser,
            method:'get',
            params:user
         }).then(d=>{
            if(d.data.code==-1){
         fn.errCallback(this,d)
          }
              if(d.data.code==0){
                  this.$router.push('/cIndex/user')
                  this.$message({
                message:d.data.info,
                type: 'success'
                  })
                }else{
                  this.$message({
                  message:d.data.info,
                  type: 'warning'
                 });
                }
         })
     }

   },
   back(){
     this.$router.go(-1)
   }
 },
 mounted () {
   var id=this.$route.params.id 
 console.log('1111111111111');
 console.log(id);
   //  var data={
  //    id
  //  }
  this.$http({
    url:API.findUser,
    method:'get'
 }).then(b=>{
    if(b.data.code==-1){
         fn.errCallback(this,b)
          }
   var da=b.data.data
   for(var i=0;i<da.length;i++){
     if(da[i].id==id){
       this.a=true
       this.b='修改'
       this.idd=id
       this.ydinput=da[i].tel
       this.yyinput=da[i].email
       this.ybzinput=da[i].des
       this.value=da[i].time
       this.yninput=da[i].name
       this.ypinput=da[i].pass
       this.radio=da[i].sex=='男'?'1':'2'
       this.ysfinput=da[i].idx     
     }
   }
 })
 }
};
</script>
<style lang='stylus' scoped>
.wrapper
    overflow hidden
    padding 20px
    .yh
        width 100%
    h4
        font-size 26px
        line-height 40px
        font-weight normal
    .box
        float right
        margin 10px
        margin-left 0
        margin-right 280px

    .btn
        margin-top 20px
        text-align center
        margin-right 70px
    .radio
        float left
        margin-left 52px
        height 60px 
        line-height 60px
        width 100%
    .aa.el-row
        width 200px
        height 50px

    
</style>