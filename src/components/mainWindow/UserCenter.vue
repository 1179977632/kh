<template>
  <div class="sidebar">
    <div class="user">
      <img class="userImg" src="">
      <div>
        <a class="login">用户呢称</a>
        <mt-button class="zcBtu" type="primary" size="small" @click="SignIn">立即签到</mt-button>
      </div>
    </div>
    <div class="sideItem">
        <mt-cell-swipe title="我的收藏"  >
          <span></span>
          <!--<img class="tag" slot="icon" src="../assets/image/s5.png" width="24" height="24">-->
        </mt-cell-swipe>
        <mt-cell-swipe title="历史记录"  >
          <span></span>
          <!--<img class="tag" slot="icon" src="../assets/image/s6.png" width="24" height="24">-->
        </mt-cell-swipe>
        <mt-cell-swipe title="我的关注"  >
          <span></span>
          <!--<img class="tag" slot="icon" src="../assets/image/s7.png" width="24" height="24">-->
        </mt-cell-swipe>
        <mt-cell-swipe title="主题选择"  >
          <span></span>
          <!--<img class="tag" slot="icon" src="../assets/image/s9.png" width="24" height="24">-->
        </mt-cell-swipe>
        <mt-cell-swipe title="设置与帮助"  >
          <span></span>
          <!--<img class="tag" slot="icon" src="../assets/image/s11.png" width="24" height="24">-->
        </mt-cell-swipe>
    </div>
  </div>
</template>

<script>
  import {delCookie} from "../../utils/cookie";
  export default {
    name: "user-center",
    methods:{
      SignIn(){
        delCookie('userEmail')
      }
    }
  }
</script>

<style scoped>
  .sidebar{
    width: 100%;
    height: 100vh;
  }
  .user{
    width: 100%;
    height: 45vw;
    background-color: dodgerblue;
  }
  .userImg{
    margin-top: 15vw;
    margin-left: 5vw;
    width: 15vw;
    height: 15vw;
    border-radius:50%;
  }
  .login{
    margin-left: 5vw;
    color: white;
  }
  .zcBtu{
    margin-left: 20%;
    border: 1px solid white;
  }
  .sideItem{
    width: 100%;
    height: 100%;
    background-color: white;
  }
</style>
