<template>
 <div class="wrapper">
      <div id="sb" v-show="1<2">
        <h4>添加/修改设备</h4>
       <div class="box">ip  <el-input v-model="inputsb1" placeholder="请输入内容" style="width:850px"></el-input></div>
       <div class="box">机房  <el-input v-model="inputsb2" placeholder="请输入内容" style="width:850px"></el-input></div>
       <div class="box">编号  <el-input v-model="inputsb3" placeholder="请输入内容" style="width:850px"></el-input></div>
       <div class="box">宽带  <el-input v-model="inputsb4" placeholder="请输入内容" style="width:850px"></el-input></div>

        <div class="radio">状态&nbsp;&nbsp;&nbsp;&nbsp;<template><el-radio v-model="radio" label="1">空闲</el-radio>
        <el-radio v-model="radio" label="0">已出售</el-radio></template>
        </div>
        <div class="btn1">
            <el-row class="aa">
                <el-button type="primary" round @click="zhuce()">{{b}}</el-button>
                <el-button type="primary" round @click="back()">返回</el-button>
            </el-row>
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
   id:0,
   b:'注册',
   inputsb1:'',
   inputsb2:'',
   inputsb3:'',
   inputsb4:'',
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
        radio:"0"
 };
 },
 watch: {},
 computed: {},
 methods: {
   zhuce(){
     console.log(this.radio);
     
     var ip=this.inputsb1
     var door=this.inputsb2
     var num=this.inputsb3
     var width=this.inputsb4   
     var status=this.radio=='1'?'空闲':'已出售'
       var sb={
       ip,
       door,
       num,
       width,
       status
     }
     if (!yza.canshu(sb)){
      yz.kong(this)
      return 
    }
    if (!yza.ipdz(ip)){
      yz.ym(this)
      return 
    }
     if(this.id!=0){
       var id=this.id
       var sb1={
       id,
       ip,
       door,
       num,
       width,
       status
       }     
     this.$http({
         url:API.updateDevice,
         method:'get',
         params:sb1
       }).then(d=>{
       if(d.data.code==-1){
         fn.errCallback(this,d)
         }
         this.id=0
         console.log(d);
         if(d.data.code==0){
           this.$router.push('/cIndex/equipment')
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
       this.$http({
         url:API.addDevice,
         method:'get',
         params:sb
       }).then(d=>{
          if(d.data.code==-1){
         fn.errCallback(this,d)
          }
         console.log(d);
         if(d.data.code==0){
                  this.$router.push('/cIndex/equipment')
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
  console.log(id);
  
  this.$http({
     url:API.findDevice,
     method:'get'
   }).then(b=>{
   if(b.data.code==-1){
    fn.errCallback(this,b)
     }  
   var da=b.data.data
   for(var i=0;i<da.length;i++){
     if(da[i].id==id){
       console.log(this.radio);
       this.b='修改'
       this.id=id
       this.inputsb1=da[i].ip
       this.inputsb2=da[i].door
       this.inputsb3=da[i].num
       this.inputsb4=da[i].width
       this.radio=da[i].status=='空闲'?"1":"0"    
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
    .sb
        width 100%
        overflow hidden
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
    .btn1
        display block
        padding-left 400px

    
</style>