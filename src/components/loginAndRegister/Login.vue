<template>
    <div>
      <khHeader :khHeader="khHeader"></khHeader>
      <div class="logo">
        <img class="logoImg" src="@/assets/img/tb.png"/>
      </div>
      <form class="content" ref="userFrom" v-model="userFrom">
        <mt-field class="txt_text" label="邮箱：" v-model="userFrom.userEmail" placeholder="请输入邮箱" type="email" :state="emailState" @blur.native.capture="isEmail(userFrom.userEmail)"></mt-field>
        <mt-field class="txt_text" label="密码：" v-model="userFrom.userPassword" :type="inputType" placeholder="请输入密码，至少6位" type="password" :state="passwordState" @blur.native.capture="isValidLength(userFrom.userPassword,6)"></mt-field>
      </form>
      <mt-button class="lBtu" size="small" type="primary" @click="login">登录</mt-button>
    </div>
</template>

<script>
  import khHeader from '../KhHeader'
  import api from '../../utils/api'
  import {setCookie} from "../../utils/cookie";
  import {Toast} from 'mint-ui';

  export default {
    name: "login",
    data() {
      return {
        khHeader:{
          centerTitle:'登录',
          leftText:'返回',
          leftPath:'/',
          rightText:'注册',
          rightPath:'/register',
        },
        userFrom:{
          userEmail:'',
          userPassword:''
        },
        inputType:'password',
        emailState:'',
        passwordState:''
      }
    },
    methods:{
      login(){
        if(this.emailState === 'success'&&this.passwordState === 'success'){
          api.login('/user/login',this.userFrom).then(res=>{
            delete res.data.userPassword
            this.$store.commit('localStorage_setUserInfo', res.data)
            Toast({ message: '登录成功',duration: 2000 })
            setCookie('userEmail',this.userFrom.userEmail)
            this.$router.push({
              path:'/course',
            })
          }).catch(err=>{
            Toast({ message: '登录失败',duration: 2000 })
          })
        }
      },
      isEmail(str){
        var re=/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
        if (re.test(str) != true) {
          this.emailState = 'error'
        }else{
          this.emailState = 'success'
        }
      },
      isValidLength(chars, len) {
        if (chars.length < len) {
          this.passwordState = 'error'
        }else {
          this.passwordState = 'success'
        }
      }
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
    margin-top: 10vw;
    width: 80%;
    min-height: 3vw;
    border: 1px solid darkgray;
    border-radius: 10px;
  }
  .content /deep/ .mint-cell-title{
    width: 15vw;
    min-width: 15vw;
  }
  .lBtu{
    margin-left: 35%;
    margin-top: 15vw;
    width: 30%;
  }
</style>
