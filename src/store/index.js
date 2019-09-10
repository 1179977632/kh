import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 定义状态
  state: {
    userInfo:JSON.parse(sessionStorage.getItem("userInfo")) || {},
    chatInfo:JSON.parse(sessionStorage.getItem("chatInfo")) || {}
  },
  mutations: {
    sessionStorage_setUserInfo(state,val){
      sessionStorage.setItem('userInfo', JSON.stringify(val)); //将传递的数据先保存到sessionStorage中
      state.userInfo = val;// 之后才是修改state中的状态
    },
    sessionStorage_setChatInfo(state, val){
      sessionStorage.setItem('chatInfo', JSON.stringify(val)); //将传递的数据先保存到sessionStorage中
      state.chatInfo = val;// 之后才是修改state中的状态
    }
  }
})

export default store
