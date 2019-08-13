<template>
  <div class="bottomInput">
    <div class="imgBox">
      <a>图片</a>
    </div>
    <div class="inputBox">
      <input type="text" style="width: 100%;"/>
    </div>
    <div class="btnBox">
      <mt-button type="primary" size="small" style="width: 100%;">发送</mt-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "bottom-input",

  }
</script>

<style scoped>
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
