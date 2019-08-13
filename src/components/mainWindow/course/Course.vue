<template>
  <div>
    <!--抽屉-->
    <div class="drawer-wrap" :class="{'drawer-wrap-animation':sideSlip}" @touchmove.prevent>
      <userCenter></userCenter>
    </div>
    <!--遮罩-->
    <div class="drawer-mask" :class="{'drawer-mask-animation':sideSlip}" @click="sideSlip=!sideSlip" @touchmove.prevent>
    </div>
    <!--主容器-->
    <div class="content-wrap">
      <khHeader :khHeader="khHeader">
        <span slot="leftTop">
          <a @click="sideSlip=!sideSlip">我</a>
        </span>
        <span slot="rightTop">
          <img class="searchIcon" src="@/assets/img/search.png" />
        </span>
      </khHeader>
      <div class="courses">
        <!--<mt-cell class="course" v-for="course in courses" :title="course.coursename" to="/" value=""></mt-cell>-->
        <div class="course" v-for="course in courses">
          <div class="course_wapper">
            <div class="course_title">
              <span class="course_a" @click="intoCourse(course)">{{course}}</span>
              <!--<router-link class="course_a" to="/intoCourse">{{course}}</router-link>-->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import userCenter from '../UserCenter'
  import khHeader from '../../KhHeader'
  import api from '../../../utils/api'
  import {mapState} from 'vuex'

  export default {
    name: "course",
    data() {
      return {
        khHeader:{
          centerTitle:'课程',
          leftText:'',
          leftPath:'',
          rightText:'',
          rightPath:'',
        },
        courses:[],
        sideSlip:false
      }
    },
    computed: mapState({
      userInfo: state => state.userInfo
    }),
    methods:{
      intoCourse(courseName){
        let info={}
        info.userEmail=this.userInfo.userEmail
        info.courseName=courseName
        this.$store.commit('localStorage_setUserCourse', info)
        this.$router.push({
          path: '/chat',
        })
      }
    },
    created(){
      api.courseNameList('/course/namelist').then(res=>{
        console.log(res)
        this.courses=res.data
      }).catch(err=>{
        console.log(err)
      })
    },
    components:{
      khHeader,
      userCenter
    }
  }
</script>

<style scoped>
  .drawer-wrap{
    position: fixed;
    left: -75%;
    width: 75%;
    height: 100vh;
    z-index: 20;
  }
  .content-wrap {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
  .drawer-mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: -100%;
    width: 100%;
    height: 100vh;
    background-color: rgba(50, 50, 50, 0.60);
    z-index: 10;
  }
  .drawer-mask-animation{
    -webkit-animation-name: drawer-mask-animation;
    -webkit-animation-duration: 1.0s;
    -webkit-animation-fill-mode: forwards;
  }
  @-webkit-keyframes drawer-mask-animation{
    from{
      left: -100%;
    }
    to{
      left: 0%;
    }
  }
  .drawer-wrap-animation{
    -webkit-animation-name: drawer-wrap-animation;
    -webkit-animation-duration: 1.0s;
    -webkit-animation-fill-mode: forwards;
  }
  @-webkit-keyframes drawer-wrap-animation{
    from{
      left: -75%;
    }
    to{
      left: 0%;
    }
  }
  .searchIcon{
    width: 5vw;
    height: 5vw;
    filter: brightness(100);
  }
  .courses{
    margin-top: 12vw;
  }
  .course{
    min-height: 12vw;
    padding: 0 7%;
    display:flex;
    align-items: center;
    /*background-image: none;*/
    border-bottom: 1px solid rgba(132, 132, 132, 0.78);
  }
  .course_a{
    text-decoration: none;
  }
</style>
