<template>
  <div class="container">
    <div class="formWrapper">
      <div class="formItems px-3">
        <div class="formItem justify-center">
          <n-result
            status="404"
            title="已登录"
            description="但并不知道你要重定向到哪里"
          >
            <template #footer>
              <n-button @click="bonusClick">哦</n-button>
            </template>
          </n-result>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const message = useMessage();
  const bonusClick = () => {
    message.success("这是个彩蛋🍉")
    message.warning("这是个彩蛋😋")
    message.error("只是个彩蛋🍖")
    message.info("真的只是个彩蛋🍟")
  }
</script>

<style scoped lang="scss">
.container {
  width: 100vw;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  color: #333639;
  font-family: "Microsoft YaHei", Helvetica, "PingFang SC";
}

.tip {
  margin-top: 10px;
  font-size: 13px;
  color: #333639;
}

.px-3 {
  padding-left: 3px !important;
  padding-right: 3px !important;
}

.formWrapper {
  width: 380px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  .formItems {
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding-top: 25px;
    > .formItem {
      display: flex;
      align-items: center;
      gap: 10px;
    }
  }
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

.flex-col {
  flex-direction: column;
}

.select-none {
  user-select: none;
}
</style>
