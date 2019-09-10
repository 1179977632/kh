<template>
  <div class="sidebar">
    <div class="user">
      <div class="user_img" @click="userData">
        <img v-if="userInfo.fileId===0" style="width: 15vw;height: 15vw;" src="../../assets/img/zanwu.png"/>
        <img v-else style="width: 15vw;height: 15vw;" :src="fileData.fileUrl"/>
      </div>
      <div>
        <a class="user_name">{{userInfo.userName}}</a>
        <mt-button class="zcBtu" type="primary" size="small" @click="SignIn">立即签到</mt-button>
      </div>
    </div>
    <div class="sideItem">
      <mt-cell-swipe title="个人资料"  >
        <span></span>
        <!--<img class="tag" slot="icon" src="../assets/image/s5.png" width="24" height="24">-->
      </mt-cell-swipe>
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
  import {mapState} from 'vuex'
  import api from '../../utils/api'
  export default {
    name: "user-center",
    data() {
      return {
        fileData:{}
      }
    },
    computed: mapState({
      userInfo: state => state.userInfo
    }),
    methods:{
      SignIn(){
      },
      userData(){
        this.$router.push({
          path:'/userdata',
        })
      }
    },
    created(){
      if(this.userInfo.fileId!==0){
        api.getFileByFileId('/file/getfile/'+this.userInfo.fileId).then(res=>{
          console.log(res)
          this.fileData = res.data.data
        }).catch(err=>{
          console.log(err)
        })
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
    height: 20vh;
    padding-top: 15vw;
    background-color: dodgerblue;
  }
  .user_img{
    margin-left: 5vw;
    width: 15vw;
    height: 15vw;
    border-radius:50%;
    overflow: hidden;
  }
  .user_name{
    margin-left: 5vw;
    color: white;
  }
  .zcBtu{
    margin-left: 20%;
    border: 1px solid white;
  }
  .sideItem{
    width: 100%;
    height: 80vh;
    background-color: white;
  }
</style>
