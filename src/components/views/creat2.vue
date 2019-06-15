<template>
 <div class="wrapper">
      <div id="tz">
        <h4>添加/修改通知</h4>
       <div class="box">题目  <el-input v-model="tzinput" placeholder="请输入内容" style="width:850px" :disabled='a'></el-input></div>
       <div class="aa">
            <span class="con">内容&nbsp;</span>
         <el-input
          type="textarea"
          :autosize="{ minRows: 2}"
          placeholder="请输入内容"
          v-model="textarea" class="text"  :disabled='a'>
        </el-input>
        
       </div>
       <div class="box">
        <div class="block">
          <span class="demonstration">日期</span>
          <el-date-picker v-model="value" type="date" placeholder="选择日期" style="width:850px" :disabled='a'>
           
          </el-date-picker>
        </div>
        <div class="btn">
            <el-row>
                <el-button type="primary" round @click="fabu()" :disabled='a'>{{b}}</el-button>
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
      a:false,
      tzinput:'',
      textarea: '',
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
        id:0,
        b:'发布'
 };
 },
 watch: {},
 computed: {},
 methods: {
   fabu(){
     var tit=this.tzinput
     var con=this.textarea
     var time=this.value
     var id=this.id
       var news={
         tit,
         con,
         time
       }
    if (!yza.canshu(news)){
      yz.kong(this)
      return 
    }
       if(id!=0){   
          var newa={
          id,
          tit,
          con,
          time
       }         
        this.$http({
         url:API.updateNews,
         method:'get',
         params:newa
       }).then(d=>{
       if(d.data.code==-1){
         fn.errCallback(this,d)
          }
        if(d.data.code==0){
          this.id=0
        this.$router.push('/cIndex/inform')
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
         url:API.addNews,
         method:'get',
         params:news
       }).then(d=>{
       if(d.data.code==-1){
         fn.errCallback(this,d)
          }
         console.log(d);
         if(d.data.code==0){
                  this.$router.push('/cIndex/inform')
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
 mounted (){
    var local=localStorage.getItem("key")
  if(local=='2'){
     this.a=true
   }else{
     this.a=false
   }
  var id=this.$route.params.id
  console.log(id);
  
  this.$http({
     url:API.findNews,
     method:'get'
   }).then(b=>{
      if(b.data.code==-1){
         fn.errCallback(this,b)
          }
   var da=b.data.data
   for(var i=0;i<da.length;i++){
     if(da[i].id==id){
       this.b='修改'
       this.id=id
       this.tzinput=da[i].tit
       this.textarea=da[i].con
       this.value=da[i].time
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
  .tz
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
  .aa
    float right
    margin-right 190px
    .text
      width 850px
    .con
      line-height 32px    
</style>