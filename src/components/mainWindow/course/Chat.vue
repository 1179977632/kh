<template>
  <div style="height: 100vh;">
    <khHeader :khHeader="khHeader">
      <span slot="leftTop">
        <a @click="intoCourse">返回</a>
      </span>
    </khHeader>
    <div class="content">
      <div style="height: 12vw;"></div>
      <div class="main_msg">
        <div v-for="(chatMessage,index) in chatMessages">
          <div style="position: relative;">
            <div v-if="isTimeShow(chatMessage,index)" style="text-align: center;margin: 2vw;">{{chatTime(chatMessage.createTime)}}</div>
            <div v-if="chatMessage.sendId!==chatInfo.userId" style="margin: 2vw;">
              <div class="msg_img" style="float: left;">
                <img v-if="chatMessage.fileId===0" style="width: 10vw;height: 10vw;" src="../../../assets/img/zanwu.png">
              </div>
              <div class="msg_content" style="float: left;">
                <div style="text-align: left;margin-bottom: 1vw;font-size: 12px;">
                  <span>{{chatMessage.sendName}}</span>
                </div>
                <div style="background-color: white;color: #232121;margin-right: 20vw;border-radius: 2vw;padding: 1vw;">
                  <span>{{chatMessage.chatContent}}</span>
                </div>
              </div>
              <div style="clear: both;"></div>
            </div>
            <div v-else style="margin: 2vw;">
              <div class="msg_img" style="float: right;">
                <img v-if="chatMessage.fileId===0" style="width: 10vw;height: 10vw;" src="../../../assets/img/zanwu.png">
              </div>
              <div class="msg_content" style="float: right;">
                <div style="text-align: right;margin-bottom: 1vw;font-size: 12px;">
                  <span>{{chatMessage.sendName}}</span>
                </div>
                <div style="background-color: dodgerblue;color: white;margin-left: 20vw;border-radius: 2vw;padding: 1vw;">
                  <span>{{chatMessage.chatContent}}</span>
                </div>
              </div>
              <div style="clear: both;"></div>
            </div>
          </div>
        </div>
      </div>
      <div style="width:100%;height: 30vw;"></div>
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
  import api from '../../../utils/api'
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
        chatMessages:[],
        msgTimeIndex:0,
        msg:''
      }
    },
    components:{
      khHeader
    },
    computed: mapState({
      chatInfo: state => state.chatInfo
    }),
    watch:{
      chatMessages(){
        this.$nextTick(() => {
          let scrollTop = this.$el.querySelector('.content')
          scrollTop.scrollTop = scrollTop.scrollHeight
        })
      }
    },
    methods:{
      intoCourse(){
        this.khHeader.leftPath = '/course'
      },
      sendMsg(){
        if(this.msg !== ''){
          let sendMsg = {}
          sendMsg.chatContent = this.msg
          console.log(sendMsg.chatContent)
          this.msg = ''
          sendMsg.fileId = 0
          sendMsg.createTime = new Date().getTime()
          this.websock.send(JSON.stringify(sendMsg))
        }
      },
      selectRecord(){
        let selectInfo = {}
        selectInfo.sendId = null
        selectInfo.receiveId = null
        selectInfo.schoolId = this.chatInfo.schoolId
        selectInfo.courseId = this.chatInfo.courseId
        api.selectRecord('/chat/record',selectInfo).then(res=>{
          this.chatMessages = res.data.data
        }).catch(err=>{
          console.log("获取消息记录失败")
        })
      },
      initWebSocket(chatUrl){
        this.websock = new WebSocket("ws://127.0.0.1:8050/websocket/"+chatUrl);
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
        if(e.data!=='连接成功'){
          let chatMessage = JSON.parse(e.data)
          //this.countTime(chatMessage,this.msgTimeIndex)
          /*api.getUserName('/user/getname/'+chatMessage.sendId).then(res=>{
            chatMessage.sendName = res.data.data
          }).catch(err=>{
            alert("getName失败")
            console.log(err)
          })*/
          this.chatMessages.push(chatMessage)
        }
        console.log('WebSocket消息接收成功');
      },
      webSocketClose(e){
        console.log("WebSocket连接关闭");
        this.websock.close();
      },
      isTimeShow(chatMessage,index){
        if(index === 0){
          return true
        }else {
          let time1 = this.chatMessages[index].createTime/1000
          let time2 = this.chatMessages[index-1].createTime/1000
          if(Math.floor((time1-time2)/60)>=1){
            return true
          }else {
            return false
          }
        }
        /*if(this.chatMessages.length!==1){
          let nTime = ((chatMessage.createTime/1000) - (this.chatMessages[index].createTime/1000))
          if(Math.floor(nTime/60)>=1){
            this.msgTimeIndex=this.chatMessages.length
            return true
          }else {
            return false
          }
        }else {
          return true
        }*/
      },
      chatTime(createTime){
        var date = new Date(createTime + 8 * 3600 * 1000);
        return date.toJSON().substr(0, 19).replace('T', ' ')
      }
    },
    created(){
      let chatUrl = 'group' + '_' + this.chatInfo.userId + '_' + this.chatInfo.receiveId + '_' + this.chatInfo.schoolId + '_' + this.chatInfo.courseId
      this.initWebSocket(chatUrl)
      this.selectRecord()
    },
    destroyed(){
      this.webSocketClose()
    }
  }
</script>

<style scoped>
  .content{
    /*margin-top: 12vw;
    margin-bottom: 10vw;*/
    height: 100%;
    /*width: 100%;
    height: 100vh;
    padding-top: 12vw;
    padding-bottom: 10vw;*/
    overflow: scroll;
    background-color: #dfdfdf;
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
  .msg_img{
    width: 10vw;
    height: 10vw;
    margin: 1vw;
    border-radius: 50%;
    overflow: hidden;
  }
  .msg_name{
    margin: 1vw 2vw 2vw 2vw;
  }
  .msg_content{
    /*border-radius: 2vw;
    padding: 1vw;
    max-width: 45vw;*/
    margin: 1vw 1vw 2vw 1vw;
    max-width: 65vw;
  }
</style>
