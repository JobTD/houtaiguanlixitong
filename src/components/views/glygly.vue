<template>
 <div class="wrapper">
     <h4>管理员列表页</h4>
     <el-row class="new">
     <el-button type="success" round style="padding 0" @click="drunp()">新建</el-button>
     </el-row>
      <el-table
    :data="tableData"
    stripe
    style="width: 85%">
    <el-table-column
      prop="index"
      label="序号"
      type=index
      width="80">
    </el-table-column>
    <el-table-column
      prop="name"
      label="账号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="prop"
      label="属性"
       width="180">
    </el-table-column>
    <el-table-column
      prop="time"
      label="注册时间"
       width="140">
       <template slot-scope="scope">
      <span>{{scope.row.time|filterTime}}</span>
      </template>
    </el-table-column>
    <el-table-column
      fixed=right
      width="200"
       label="操作">
       <template slot-scope="scope">
        <el-button type="primary" round @click="handleEdit(scope.$index, scope.row)">查看</el-button>
        <el-button type="danger" round @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
 </div>

</template>

<script type="text/ecmascript-6">
import API from '../../commont/js/API'
import fn from '../../commont/js/diaoxian'
export default {
 components: {},
 inject: ['reload'],
 props: {},
 data () {
 return {
     tableData: [
      //  {
      //     glnum: 1,
      //     glnm: 'wcq',
      //     glpro: '最低调的一个人',
      //     glzctime: '2019-08-04 00:00:00:00'
      //   }
        ],
 };
 },
 watch: {},
 computed: {

 },
 methods: {
   drunp(){   
     this.$router.push('/cIndex/manage/creat/'+0)
   },
   handleEdit(index, row){
     this.$router.push('/cIndex/manage/creat/'+row.id)
     console.log(row);
     
   },
   handleDelete(index, row){
     var id=row.id
     var data={
       id
     }
      this.$confirm('此操作将永久删除该账号, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
           this.$http({
       url:API.delManage,
       methods:'get',
       params:data
     }).then(d=>{
        if(d.data.code==-1){
         fn.errCallback(this,d)
          }
       console.log(d);
     })
        }).then(() => {
          this.reload()
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
   }
 },
 mounted () {
    this.$http({
    url:API.findManage,
    method:'get',
  }).then(b=>{
     if(b.data.code==-1){
         fn.errCallback(this,b)
          }
    console.log(b);
    this.tableData=b.data.data
  })
 }
};
</script>
<style lang='stylus' scoped>
.wrapper
    padding 20px
    h4
        font-size 26px
        line-height 40px
        font-weight normal
    .new
        margin-top 30px
        margin-bottom 20px
    >>>.el-table
        flex none
        height auto 
</style>
