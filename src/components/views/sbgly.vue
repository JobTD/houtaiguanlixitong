<template>
 <div class="wrapper">
     <h4>设备列表页</h4>
     <el-row class="new">
     <el-button type="success" round style="padding 0" @click="drunp()" v-if="local!='2'">新建</el-button>
     </el-row>
      <el-table
    :data="tableData"
    stripe
    style="width: 85%">
    <el-table-column
      prop="sbnum"
      label="序号"
      type=index
      width="80">
    </el-table-column>
    <el-table-column
      prop="ip"
      label="ip"
      width="150">
    </el-table-column>

    <el-table-column
      prop="door"
      label="机房"
      width="120">
    </el-table-column>
    <el-table-column
      prop="num"
      label="编号"
      width="100">
    </el-table-column>
    <el-table-column
      prop="width"
      label="宽带"
      width="100">
    </el-table-column>
         <el-table-column  label="状态" width="90">
           <template  slot-scope="scope">
             <span>{{scope.row.status=="1"?"空闲":"已出售"}}</span>
           </template>
         </el-table-column>
    <el-table-column label="操作" width="200">
       <template slot-scope="scope">
        <el-button type="primary" round @click="handleEdit(scope.$index, scope.row)" v-if="local!='2'">查看</el-button>
        <el-button type="danger" round @click="handleDelete(scope.$index, scope.row)" v-if="local!='2'">删除</el-button>
        <el-button type="primary" round @click="handleBuy(scope.row.id)" v-if="local=='2'"  :disabled="scope.row.status=='0'">购买</el-button>
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
   local:'',
     tableData: [
        //  {
        //   sbnum: 1,
        //   sbip: '10.10.21.216',
        //   sbjf:'0304',
        //   sbbh:'07',
        //   sbkd:'5M',
        //   sbsy:'已售完'
        // }
        ]
 };
 },
 watch: {},
 computed: {},
 methods: {
drunp(){   
     this.$router.push('/cIndex/equipment/creat/'+0)
   },
   handleEdit(inex,row){
     this.$router.push('/cIndex/equipment/creat/'+row.id)
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
       url:API.delDevice,
       methods:'get',
       params:data
     }).then(d=>{
       if(d.data.code==-1){
         fn.errCallback(this,d)
          }
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
   },
   handleBuy(id){
      this.$http({
        url:API.updateDevice,
        params:{
          id:id,
          status:'0'
        }
      }).then(d=>{
        if(d.data.code==-1){
          fn.errCallback(this,d)
        }
        if(d.data.isok){
          this.$message({
              message:"购买成功",
              type: 'success'
            });
             this.reload()
        }else{
          this.$message({
              message:"购买失败，请重试",
              type: 'warning'
            });
        }
      })
   }
 },
 mounted () {
   
  var local=localStorage.getItem("key")
  if(local=='0'){
     this.local='0'
   }else if(local=='1'){
     this.local='1'
   }else if(local=='2'){
     this.local='2'
   }
    this.$http({
    url:API.findDevice,
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