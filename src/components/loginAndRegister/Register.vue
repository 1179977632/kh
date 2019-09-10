<template>
  <div>
    <khHeader :khHeader="khHeader">
      <span slot="leftTop">
        <a @click="goBack">{{leftText}}</a>
      </span>
    </khHeader>
    <div class="logo">
      <img class="logoImg" src="@/assets/img/tb.png"/>
    </div>
    <div class="content" ref="userFrom" v-model="userFrom">
      <div v-show="next">
        <mt-field class="txt_text" label="邮箱：" placeholder="请输入邮箱" v-model="userFrom.userEmail" :state="registerState.emailState" type="email" @blur.native.capture="isEmail(userFrom.userEmail)"></mt-field>
        <mt-field class="txt_text" label="密码：" placeholder="请输入密码" v-model="userFrom.userPassword" :state="registerState.passwordState" type="password" @blur.native.capture="isValidLength(userFrom.userPassword,6)"></mt-field>
        <mt-field class="txt_text" label="确认：" placeholder="请再次输入密码" v-model="confirmPassword" :state="registerState.confirmPasswordState" type="password" @blur.native.capture="isPassword(confirmPassword)"></mt-field>
        <mt-field class="txt_text" label="呢称：" placeholder="请输入呢称" v-model="userFrom.userName" :state="registerState.nameState" @blur.native.capture="isName(userFrom.userName,2,4)"></mt-field>
        <mt-button class="btu" size="small" type="primary" @click="goNext">下一步</mt-button>
      </div>
      <div v-show="!next">
        <mt-field class="txt_text" label="年龄：" placeholder="请输入年龄" v-model="userFrom.userAge" :state="registerState.ageState" type="number" @blur.native.capture="isNumber(userFrom.userAge)"></mt-field>
        <!--<mt-field class="txt_text" label="学校：" placeholder="请输入学校" v-model="userFrom.schoolName" :state="registerState.schoolNameState" @blur.native.capture="isSchoolName(userFrom.schoolName)"></mt-field>-->
        <mt-field class="txt_text" label="工作：" placeholder="请输入工作" v-model="userFrom.userJob" :state="registerState.jobState" @blur.native.capture="isJob(userFrom.userJob)"></mt-field>
        <div class="txt_text" style="border: none;width: 70%;display: flex;margin-left: 15%;">
          <label style="width: 25%;">学校：</label>
          <select class="school_select" v-model="userFrom.schoolName">
            <option v-for="school in schools">{{school.schoolName}}</option>
          </select>
        </div>
        <div style="margin-bottom: 10vw;">
          <label class="sex"><input name="sex" type="radio" value="男" v-model="userFrom.userSex" checked="checked"/>男</label>
          <label class="sex"><input name="sex" type="radio" value="女" v-model="userFrom.userSex"/>女</label>
        </div>
        <mt-button class="btu" size="small" type="primary" @click="register">注册</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
  import khHeader from '../KhHeader'
  import api from '../../utils/api'
  import {Toast} from 'mint-ui';
  export default {
    name: "register",
    data() {
      return {
        khHeader:{
          centerTitle:'注册',
          leftText:'',
          leftPath:'',
          rightText:'登录',
          rightPath:'/login',
        },
        userFrom:{
          userEmail:'',
          userPassword:'',
          userName:'',
          userSex:'男',
          userAge:null,
          schoolName:'',
          userJob:''
        },
        registerState:{
          emailState:'',
          passwordState:'',
          confirmPasswordState:'',
          nameState:'',
          ageState:'',
          schoolNameState:'',
          jobState:''
        },
        schools:[],
        allState:false,
        confirmPassword:'',
        leftText:'返回',
        next:true
      }
    },
    methods:{
      goBack(){
        if(this.next){
          this.khHeader.leftPath = '/load'
        }else{
          this.next = true
          this.leftText = '返回'
        }
      },
      goNext(){
        this.next = false
        this.leftText = '上一步'
      },
      register(){
        console.log(this.userFrom)
        this.isSchoolName(this.userFrom.schoolName)
        this.isState()
        if(this.allState){
          api.register('/user/register',this.userFrom).then(res=>{
            Toast({ message: '注册成功',duration: 2000 })
            this.$router.push({
              path:'/login',
            })
          }).catch(err=>{
            Toast({ message: '注册失败',duration: 2000 })
            this.allState = false
          })
        }else {
          Toast({ message: '信息没有完善',duration: 2000 })
        }
      },
      isEmail(email){
        var re=/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
        if (re.test(email) != true) {
          this.registerState.emailState = 'error'
        }else{
          api.isExistUserEmail('/user/isexistemail/'+email).then(res=>{
            console.log(res)
            if(res.data.message==='邮箱未注册'){
              this.registerState.emailState = 'success'
            }else {
              Toast({ message: '邮箱已注册',duration: 2000 })
              this.registerState.emailState = 'error'
            }
          }).catch(err=>{
            this.registerState.emailState = 'error'
            console.log(err)
          })
        }
      },
      isValidLength(password, len) {
        if (password.length < len) {
          this.registerState.passwordState = 'error'
        }else {
          this.registerState.passwordState = 'success'
        }
      },
      isPassword(confirmPassword){
        if(this.userFrom.userPassword!==confirmPassword){
          this.registerState.confirmPasswordState = 'error'
        }else {
          this.registerState.confirmPasswordState = 'success'
        }
      },
      isName(name,min,max){
        if (name.length < min||name.length > max) {
          this.registerState.nameState = 'error'
        }else {
          api.isExistUserName('/user/isexistname/'+name).then(res=>{
            console.log(res)
            if(res.data.message==='呢称未存在'){
              this.registerState.nameState = 'success'
            }else {
              Toast({ message: '呢称已存在',duration: 2000 })
              this.registerState.nameState = 'error'
            }
          }).catch(err=>{
            this.registerState.nameState = 'error'
            console.log(err)
          })
        }
      },
      isNumber(number){
        let reg = /^\+?[1-9][0-9]*$/
        if(!reg.test(number)){
          this.registerState.ageState = 'error'
        }else {
          this.registerState.ageState = 'success'
        }
      },
      isSchoolName(name){
        if(name===''){
          this.registerState.schoolNameState = 'error'
        }else{
          this.registerState.schoolNameState = 'success'
        }
      },
      isJob(job){
        if(job===''){
          this.registerState.jobState = 'error'
        }else{
          this.registerState.jobState = 'success'
        }
      },
      isState(){
        let flag = true
        for(let i in this.registerState){
          if(this.registerState[i]!=='success'){
            flag = false
          }
        }
        if(flag){
          this.allState = true
        }
      }
    },
    created(){
      api.schoolList('/school/list').then(res=>{
        console.log(res)
        this.schools=res.data.data
      }).catch(err=>{
        console.log(err)
      })
    },
    components:{
      khHeader
    }
  }
</script>

<style scoped>
  .logo{
    width: 100%;
    height: 80vw;
    /*background-color: bisque;*/
  }
  .logoImg{
    margin-top: 30vw;
    margin-left: 30%;
    width: 40%;
    height: 40vw;
  }
  .txt_text{
    margin-left: 10%;
    margin-bottom: 10vw;
    width: 80%;
    min-height: 3vw;
    border: 1px solid darkgray;
    border-radius: 10px;
  }
  .school_select{
    width: 75%;
    min-height: 3vw;
    border: 1px solid darkgray;
    border-radius: 10px;
  }
  .content /deep/ .mint-cell-title{
    width: 15vw;
    min-width: 15vw;
  }
  .sex{
    margin-left: 26vw;
    width: 11vw;
  }
  .btu{
    margin-left: 35%;
/*    margin-top: 10vw;*/
    width: 30%;
  }
</style>
