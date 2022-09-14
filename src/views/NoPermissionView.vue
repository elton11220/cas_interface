<template>
  <div class="container">
    <n-result
      status="403"
      title="403 没有权限"
      description="总有些门是对你关闭的"
    >
      <template #footer>
        <n-button
          type="primary"
          secondary
          @click="onBtnExitClicked"
          v-if="authorized"
          >退出登录</n-button
        >
      </template>
    </n-result>
  </div>
</template>

<script setup lang="ts">
import request from "@/utils/request";
import { useRouter } from "vue-router";
import { computed } from "vue";

const router = useRouter();
const message = useMessage();
window.$message = useMessage();

const authorized = computed(() => {
  return window.localStorage.getItem("authorized") !== null;
});

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
