<template>
  <div class="container">
    <n-result
      status="403"
      title="403 没有权限"
      description="总有些门是对你关闭的"
    >
      <n-button type="primary" secondary @click="onBtnExitClicked"
        >退出登录</n-button
      >
    </n-result>
  </div>
</template>

<script setup lang="ts">
import request from "@/utils/request";
import { useRouter } from "vue-router";

const router = useRouter();

const onBtnExitClicked = () => {
  request({
    url: "/auth/logout",
    method: "POST",
  })
    .then(() => {
      window.localStorage.removeItem("authorized");
      router.push({
        path: "/",
      });
    })
    .catch(() => {
      router.push({
        name: "400",
      });
    });
};
</script>

<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
