<template>
  <div class="main">
    <img class="loadImg" src="@/assets/img/load.png"/>
    <loginOrRegister></loginOrRegister>
  </div>
</template>

<script>
  import loginOrRegister from './LoginOrRegister'
  export default {
    name: "load",
    data() {
      return {
      }
    },
    components:{
      loginOrRegister
    }
  }
</script>

<style scoped>
  .main{
    width: 100%;
    height: 100vh;
    /*background-color: bisque;*/
  }
  .loadImg{
    width: 100%;
    height: 100vh;
    display: block;
  }
</style>
