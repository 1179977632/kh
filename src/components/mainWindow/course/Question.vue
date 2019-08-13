<template>
  <div>
    <khHeader :khHeader="khHeader"></khHeader>
  </div>
</template>

<script>
  import khHeader from '../../KhHeader'
  export default {
    name: "question",
    data() {
      return {
        khHeader:{
          centerTitle:'问题',
          leftText:'返回',
          leftPath:'/course',
          rightText:'聊天',
          rightPath:'/chat',
        }
      }
    },
    components:{
      khHeader
    }
  }
</script>

<style scoped>

</style>
