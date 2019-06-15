<template>
<div id="app">
<router-view v-if='isRouterAlive'>
 </router-view>
</div>
   
</template>

<script type="text/ecmascript-6">
export default {
  name:'app',
  provide(){
    return{
      reload:this.reload
    }
  },
 components: {},
 props: {},
 data () {
 return {
   isRouterAlive:true
 };
 },
 watch: {},
 computed: {},
 methods: {
   reload(){
     this.isRouterAlive=false
     this.$nextTick(function(){
       this.isRouterAlive=true
     })
   }
 },
 mounted () {}
};
</script>
<style lang='stylus' scoped>
>>>body
  margin 0
  padding 0
</style>


