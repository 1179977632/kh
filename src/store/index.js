import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 定义状态
  state: {
    userInfo:JSON.parse(localStorage.getItem("userInfo")) || {},
    userCourse:JSON.parse(localStorage.getItem("userCourse")) || {}
  },
  mutations: {
    localStorage_setUserInfo(state,val){
      localStorage.setItem('userInfo', JSON.stringify(val)); //将传递的数据先保存到localStorage中
      state.userInfo = val;// 之后才是修改state中的状态
    },
    localStorage_setUserCourse(state, val){
      localStorage.setItem('userCourse', JSON.stringify(val)); //将传递的数据先保存到localStorage中
      state.userCourse = val;// 之后才是修改state中的状态
    }
  }
})

export default store
