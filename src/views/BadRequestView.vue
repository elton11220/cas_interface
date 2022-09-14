<template>
  <div class="container">
    <n-result status="500" title="400 请求失败" description="一切尽在不言中">
      <template #footer>
        <div class="flex items-center gap-10 justify-center">
          <n-button type="primary" secondary @click="onBtnExitClicked"
            >退出登录</n-button
          >
          <n-button v-if="redirect" @click="onBtnReturnClicked" secondary
            >返回</n-button
          >
        </div>
      </template>
    </n-result>
  </div>
</template>

<script setup lang="ts">
import request from "@/utils/request";
import { ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";

const redirect = ref<string>();
const router = useRouter();
const message = useMessage();
window.$message = useMessage();

onBeforeMount(() => {
  if (window.history.state?.redirect) {
    redirect.value = window.history.state.redirect as string;
  }
});

const onBtnExitClicked = () => {
  request({
    url: "/auth/logout",
    method: "POST",
  }).then(() => {
    window.localStorage.removeItem("authorized");
    router.push({
      path: "/",
    });
  });
};

const onBtnReturnClicked = () => {
  if (redirect.value) {
    window.location.href = redirect.value;
  }
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

.justify-center {
  justify-content: center;
}

.items-center {
  align-items: center;
}

.flex {
  display: flex;
}

.gap-10 {
  gap: 10px;
}
</style>
