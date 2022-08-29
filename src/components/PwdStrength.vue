<template>
  <div class="container">
    <div class="item">
      <div
        class="indicator"
        :style="{ backgroundColor: props.value >= 0 ? '#fa5151' : '#eee' }"
      />
      <div class="title">弱</div>
    </div>
    <div class="item">
      <div
        class="indicator"
        :style="{ backgroundColor: props.value >= 1 ? '#ffc300' : '#eee' }"
      />
      <div class="title">中</div>
    </div>
    <div class="item">
      <div
        class="indicator"
        :style="{ backgroundColor: props.value >= 2 ? '#00b578' : '#eee' }"
      />
      <div class="title">强</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  value: {
    type: Number,
    default: 0,
  },
});
</script>

<style scoped lang="scss">
.container {
  display: flex;
  gap: 15px;
  .item {
    width: 70px;
    height: 25px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    > .indicator {
      height: 5px;
      width: 100%;
    }
    > .title {
      font-size: 12px;
      color: #9e9e9e;
      user-select: none;
    }
  }
}
</style>
