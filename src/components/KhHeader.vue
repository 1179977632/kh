<template>
  <mt-header fixed :title="khHeader.centerTitle">
    <router-link class="xhx" :to="khHeader.leftPath" slot="left">
      <slot name="leftTop"></slot>
      {{khHeader.leftText}}</router-link>
    <router-link class="xhx" :to="khHeader.rightPath" slot="right">
      <slot name="rightTop"></slot>
      {{khHeader.rightText}}</router-link>
  </mt-header>
</template>

<script>
  export default {
    name: "khHeader",
    data() {
      return {
      }
    },
    props:['khHeader']
  }
</script>

<style scoped>
  .xhx{
    text-decoration: none;
  }
  .mint-header{
    height: 12vw;
  }
</style>
