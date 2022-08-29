<template>
  <div class="container">
    <div class="header">
      <div class="icon">
        <img :src="naiveLogoImg" alt="" class="img" />
      </div>
      <h1>内网统一认证</h1>
      <span>Central Authentication Service</span>
    </div>
    <n-message-provider>
      <router-view />
    </n-message-provider>
  </div>
</template>

<script setup lang="ts">
import naiveLogoImg from "@/assets/naiveLogo.svg";
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
}

.header {
  position: absolute;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100vw;
  height: 90px;
  padding: 0 30px;
  display: flex;
  align-items: center;
  gap: 15px;
  background-color: #fff;
  > .icon {
    height: 40px;
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f0f2f5;
    border-radius: 50%;
    > .img {
      height: 60%;
      width: 60%;
      display: block;
    }
  }
  > h1 {
    font-size: 24px;
  }
  > span {
    font-size: 14px;
    color: #a0a0a0;
  }
}
</style>
