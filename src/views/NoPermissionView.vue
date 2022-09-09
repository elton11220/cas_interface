<template>
  <div class="container">
    <n-result
      status="403"
      title="403 没有权限"
      description="总有些门是对你关闭的"
    >
    </n-result>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
