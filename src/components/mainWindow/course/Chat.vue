<template>
  <div>
    <khHeader :khHeader="khHeader">
      <span slot="leftTop">
        <a @click="intoCourse">返回</a>
      </span>
    </khHeader>
    <div class="content">
        <div v-for="chatMessage in chatMessages">
          <div style="margin: 5vw 3vw 2vw 3vw;">{{chatMessage.userName}}</div>
          <div style="margin-left: 5vw;">{{chatMessage.chatContent}}</div>
        </div>
    </div>
    <div class="bottomInput">
      <div class="imgBox">
        <a>图片</a>
      </div>
      <div class="inputBox">
        <input type="text" style="width: 100%;" v-model="msg"/>
      </div>
      <div class="btnBox">
        <mt-button type="primary" @click="sendMsg" size="small" style="width: 100%;">发送</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
  import khHeader from '../../KhHeader'
  import {mapState} from 'vuex'
  export default {
    name: "chat",
    data() {
      return {
        khHeader:{
          centerTitle:'聊天',
          leftText:'',
          leftPath:'',
          rightText:'问题',
          rightPath:'/question',
        },
        chatMessages:[
          {
            userName:'sdfas',
            chatContent:'ssddsasdf',
            chatImageUrl:'',
            createTime:''
          },{
            userName:'sdfas',
            chatContent:'ssddsasdf',
            chatImageUrl:'',
            createTime:''
          },
        ],
        msg:''
      }
    },
    components:{
      khHeader
    },
    computed: mapState({
      userCourse: state => state.userCourse
    }),
    methods:{
      intoCourse(){
        this.khHeader.leftPath = '/course'
      },
      sendMsg(){
        this.websock.send(this.msg)
        this.msg = null
      },
      initWebSocket(userCourse){
        this.websock = new WebSocket("ws://127.0.0.1:8050/websocket/"+userCourse);
        this.websock.onopen = this.webSocketOnOpen;
        this.websock.onerror = this.webSocketOnError;
        this.websock.onmessage = this.webSocketOnMessage;
        this.websock.onclose = this.webSocketClose;
      },
      webSocketOnOpen() {
        console.log("WebSocket连接");
      },
      webSocketOnError(e){
        console.log("WebSocket连接错误");
      },
      webSocketOnMessage(e){
        console.log('WebSocket连接成功');
      },
      webSocketClose(e){
        console.log("WebSocket连接关闭");
        this.websock.close();
      }
    },
    created(){
      let userCourse = this.userCourse.userEmail + '_' + this.userCourse.courseName
      this.initWebSocket(userCourse)
    },
    destroyed(){
      this.webSocketClose()
    }
  }
</script>

<style scoped>
  .content{
    margin-top: 12vw;
  }
  .bottomInput{
    position: fixed;
    display: flex;
    width: 100%;
    height: 10vw;
    bottom: 0;
    background-color: #26a2ff;
    align-items: center;
  }
  .imgBox{
    flex: 1;
    /*border-right: 1px solid darkgray;*/
    text-align: center;
    color: white;
  }
  .inputBox{
    flex: 5;
    /*border-right: 1px solid darkgray;*/
  }
  .btnBox{
    flex: 1.5;
  }
</style>
