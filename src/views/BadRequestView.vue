<template>
  <div class="container">
    <n-result status="500" title="400 请求失败" description="一切尽在不言中">
      <template #footer>
        <n-button v-if="redirect" @click="onBtnReturnClicked">返回</n-button>
      </template>
    </n-result>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const redirect = ref<string>();

onBeforeMount(() => {
  if (route.query?.redirect) {
    redirect.value = route.query.redirect as string;
  }
})

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
</style>
