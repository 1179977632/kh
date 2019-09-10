<template>
  <div>
    <div class="top">
      <khHeader :khHeader="khHeader"></khHeader>
      <div style="width: 30vw;height: 40vw;margin-left: 35vw;">
        <div style="margin-left: 5vw;">
          <img v-if="userInfo.fileId===0" style="width: 20vw;height: 20vw;border-radius: 50%;" src="../../assets/img/zanwu.png"/>
          <img v-else style="width: 20vw;height: 20vw;border-radius: 50%;" :src="fileData.fileUrl"/>
        </div>
        <div>
          <el-upload class="imgBtu" action="http://127.0.0.1:8050/file/upload"
                     :show-file-list="false" :on-success="handleSuccess">
            <el-button style="width: 30vw;border: 1px solid white;" size="medium" type="primary">更改头像</el-button>
          </el-upload>
          <!--<mt-button class="imgBtu" type="primary" size="small" @click="">更改头像</mt-button>-->
        </div>
      </div>
    </div>
    <div class="bottom">
      <div v-for="(value,key) in userData">
        <div style="margin-top: 5vw;">
          <span>{{judgeKey(key)}}</span>：<span>{{value}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import khHeader from '../KhHeader'
  import api from '../../utils/api'
  export default {
    name: "user-data",
    data() {
      return {
        khHeader:{
          centerTitle:'',
          leftText:'返回',
          leftPath:'/course',
          rightText:'',
          rightPath:'',
        },
        userData:{},
        fileData:{}
      }
    },
    computed: mapState({
      userInfo: state => state.userInfo
    }),
    methods:{
      judgeKey(key){
        if(key==='userId'){
          return 'ID'
        }
        if(key==='userEmail'){
          return '邮箱'
        }
        if(key==='userName'){
          return '呢称'
        }
        if(key==='userAge'){
          return '年龄'
        }
        if(key==='userSex'){
          return '性别'
        }
        if(key==='schoolName'){
          return '学校'
        }
        if(key==='userJob'){
          return '工作'
        }
      },
      handleSuccess(response, file, fileList){
        console.log(response)
        this.userInfo.fileId = response.data
        let info = {}
        info.userId = this.userInfo.userId
        info.fileId = this.userInfo.fileId
        api.updateFileIdByUserId('/user/fileid',info).then(res=>{
          this.$store.commit('sessionStorage_setUserInfo', this.userInfo)
          api.getFileByFileId('/file/getfile/'+this.userInfo.fileId).then(res=>{
            console.log(res)
            this.fileData = res.data.data
          }).catch(err=>{
            console.log(err)
          })
        }).catch(err=>{
          console.log(err)
        })
      }
    },
    created(){
      let userData = {}
      userData.userId = this.userInfo.userId
      userData.userEmail = this.userInfo.userEmail
      userData.userName = this.userInfo.userName
      userData.userSex = this.userInfo.userSex
      userData.userAge = this.userInfo.userAge
      userData.schoolName = this.userInfo.schoolName
      userData.userJob = this.userInfo.userJob
      this.userData = userData
      if(this.userInfo.fileId!==0){
        api.getFileByFileId('/file/getfile/'+this.userInfo.fileId).then(res=>{
          console.log(res)
          this.fileData = res.data.data
        }).catch(err=>{
          console.log(err)
        })
      }
    },
    components:{
      khHeader
    }
  }
</script>

<style scoped>
  .top{
    width: 100%;
    height: 30vh;
    padding-top: 25vw;
    background-color: dodgerblue;
  }
  .bottom{
    /*width: 100%;
    height: 70vh;*/
    margin-left: 15vw;
    margin-right: 15vw;
  }
  .imgBtu{
    width: 30vw;
    margin-top: 5vw;
  }
</style>
