<template>
    <div class="lor">
      <mt-button class="lBtu" @click="login">登录</mt-button>
      <mt-button class="rBtu" @click="register">注册</mt-button>
    </div>
</template>

<script>
    import MtButton from "mint-ui/packages/button/src/button";

    export default {
      components: {MtButton},
      name: "login-or-register",
      methods:{
        login(){
          this.$router.push({  //核心语句
            path:'/login',   //跳转的路径
          })
        },
        register(){
          this.$router.push({  //核心语句
            path:'/register',   //跳转的路径
          })
        }
      }
    }
</script>

<style scoped>
  .lor{
    position: fixed;
    bottom: 10vh;
  }
  .lBtu{
    margin-left: 20vw;
    margin-right: 8vw;
    width: 25vw;
    height: 5vh;
    background-color: dodgerblue;
    color: white;
  }
  .rBtu{
    margin-right: 20vw;
    width: 25vw;
    height: 5vh;
    background-color: white;
    border:1px solid;
  }
</style>
