<template>
 <div class="wrapper">
     <div id="xt">
        <h4>添加/修改管理员</h4>
       <div class="box">账号  <el-input v-model="gninput" placeholder="请输入内容" style="width:850px" :disabled='a' ></el-input></div>
      <div class="box"> 密码  <el-input placeholder="请输入密码" v-model="gpinput" show-password style="width:850px" :disabled='a'></el-input></div>
       <div class="box" v-show="idx==0"> 确认密码  <el-input placeholder="请输入密码" v-model="gpinput1" show-password style="width:850px"></el-input></div>
       <div class="box">属性  <el-input v-model="gsinput" placeholder="请输入内容" style="width:850px"></el-input></div>
       <div class="box">  
        <div class="block">
          <span class="demonstration">日期</span>
          <el-date-picker v-model="value" type="date" placeholder="选择日期" style="width:850px">
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
      gninput: '',
      gsinput: '',
      gpinput:'',
      gpinput1:'',
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
        idx:'',
        a:false,
        b:'注册'
 };
 },
 watch: {},
 computed: {},
 methods: {
   zhuce(){
     var name=this.gninput
     var pass=this.gpinput
     var prop=this.gsinput
     var time=this.value
     var pass1=this.gpinput1  
     var id=this.idx 
      var usera={
            name,
            pass,
            prop,
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

     if(this.a==true){

       var user={
            id,
            prop,
            time
          }
          // var datae=this.$qs.stringify(user)
          // console.log(datae);
            this.$http({
                 url:API.updateManage,
                 method:'get',
                 params:user
             }).then(d=>{
                if(d.data.code==-1){
         fn.errCallback(this,d)
          }
               console.log(d);
               
              if(d.data.code==0){
                console.log(id)
                this.idx=''
                  this.$router.push('/cIndex/manage')
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
      if (!yza.mima(pass,pass1)){
      yz.mima(this)
      return 
            }
          // var time=fn(time)
          var user={
            name,
            pass,
            prop,
            time
          }    
          var data=this.$qs.stringify(user)
            this.$http({
                 url:API.addManage,
                 method:'get',
                 params:user
             }).then(d=>{
                if(d.data.code==-1){
         fn.errCallback(this,d)
          }
               if(d.data.code==0){
                  this.$router.push('/cIndex/manage')
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
  var id= this.$route.params.id
  // var data={
  //   id
  // }
  // data=this.$qs.stringify(data)
  this.$http({
                 url:API.findManage,
                 method:'get'
             }).then(b=>{
                if(b.data.code==-1){
         fn.errCallback(this,b)
          }
               var da=b.data.data
               for(var i=0;i<da.length;i++){
                 if(da[i].id==id){
                    console.log(da[i]);
                    this.a=true
                    this.gninput=da[i].name
                    this.gpinput=da[i].pass
                    this.gsinput=da[i].prop
                    this.value=da[i].time
                    this.b='修改'
                    this.idx=id
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
    .xt
        width 100%
    h4
        font-size 26px
        line-height 40px
        font-weight normal
    .box
        float right
        margin 10px
        margin-left 0
        margin-right 190px
    .btn
        margin-top 20px
        text-align center
    .radio
        float left
        margin-left 52px
        height 60px 
        line-height 60px
        width 100%
    .textarea
        margin-left 90px;
        overflow hidden
        .text
            float left
            width 850px;
        .nr
            float left
            padding-right 7px
    .aa.el-row
        width 200px
        height 50px

    
</style>
