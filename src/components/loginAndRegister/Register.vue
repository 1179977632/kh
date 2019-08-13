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
    <div class="content">
      <div v-show="next">
        <mt-field class="txt_text" label="邮箱：" placeholder="请输入邮箱" type="email" state=""></mt-field>
        <mt-field class="txt_text" label="密码：" placeholder="请输入密码" type="password" state=""></mt-field>
        <mt-field class="txt_text" label="确认：" placeholder="请再次输入密码" type="password" state=""></mt-field>
        <mt-button class="btu" size="small" type="primary" @click="goNext">下一步</mt-button>
      </div>
      <div v-show="!next">
        <mt-field class="txt_text" label="呢称：" placeholder="请输入呢称" type="email" state=""></mt-field>
        <mt-field class="txt_text" label="学校：" placeholder="请输入学校" state=""></mt-field>
        <div>
          <label class="sex"><input name="sex" type="radio" value="男" v-model="sex" checked="checked"/>男</label>
          <label class="sex"><input name="sex" type="radio" value="女" v-model="sex"/>女</label>
        </div>
        <mt-button class="btu" size="small" type="primary">注册</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
  import khHeader from '../KhHeader'
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
        leftText:'返回',
        next:true,
        sex:'男'
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
    margin-bottom: 10vw;
    width: 80%;
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
    margin-top: 10vw;
    width: 30%;
  }
</style>
