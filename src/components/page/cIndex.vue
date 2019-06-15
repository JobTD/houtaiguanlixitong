<template>
 <div class="wrapper">
   <div class='nav'>
     <div class="tou">
       <div class="nc">{{name|numFilter}}
         <div class='td' @click='tui()'>退出 登录</div>
       </div>
       <div class="tx"><img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3913721637,490556209&fm=27&gp=0.jpg"></div>
     </div>
   </div>
   <div class='content'>
     <div class="left">
         <router-link to="/cIndex/manage" active-class="select" class="li" v-if="this.local =='0'">管理员管理</router-link>
         <router-link to="/cIndex/user" active-class="select" class="li" v-if="this.local !='2'">用户管理</router-link>
         <router-link to="/cIndex/inform" active-class="select" class="li">通知</router-link>
         <router-link to="/cIndex/equipment" active-class="select" class="li">设备管理</router-link>
     </div>
     <div class="right">
       <router-view class="con">

      </router-view>
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
   name:'',
   local:''
 };
 },
 watch: {},
 computed: {},
 methods: {
   tui(){
     this.$confirm('此操作将退出登录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$http({
            url:API.exit,
            method:'get'
          }).then(d=>{
            this.$router.push('/login')
            this.$message({
            type: 'success',
            message:'退出成功!'
          });
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          });
        });
   }
 },
 mounted () {
   var local=localStorage.getItem("key")
   var name=localStorage.getItem("name")
   this.name=name
   if(local=='0'){
     this.local='0'
   }else if(local=='1'){
     this.local='1'
   }else if(local=='2'){
     this.local='2'
   }
 }
};
</script>
<style lang='stylus' scoped>
.wrapper
  display flex
  flex-direction column;
  min-height 83vh
  .nav
    height 70px
    background #E5E0B7
    border-bottom 1px #000 solid
    .tou
      height 70px
      float right
      padding-right 40px  
      div
        line-height 70px;
      .tx
        width 80px
        height 70px
        margin-top 7px 
        float right 
        img 
          display block
          width 55px
          height 55px
          border-radius 50%
      .nc
        width 120px
        height 70px
        text-align center
        line-height 70px
        float right 
        font-size 16px
        color #FFF 
        position relative
        cursor pointer
        .td
          position absolute
          right 0
          top 71px
          width 140px
          height 70px
          text-align center
          line-height 70px
          background #FFF
          display none
          color #CCC
      .nc:hover
        background #E8E8E0
        border-bottom 1px #000 solid
      .nc:hover .td
        display block
  .content
    flex 1
    display flex
    .left
      font-size 30px
      width 180px
      background #E6E1C5
      padding-top 20px
      .li
        width 180px
        display block
        color #333
        text-decoration none
        height 60px
        line-height 60px
        text-align center
        font-size 16px
      .li:hover
        background #ffffff
        color #000
        cursor pointer
      .select
        background #CBCCB2
        color #ffffff
    .right
      overflow hidden
      flex 1
      background #F4F5E0
</style>