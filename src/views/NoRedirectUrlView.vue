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
import request from "@/utils/request";
import { RequestError, RequestErrorTypes } from "@/utils/RequestError";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const message = useMessage();
window.$message = useMessage();
const bonusClick = () => {
  message.success("这是个彩蛋🍉");
  message.warning("这是个彩蛋😋");
  message.error("只是个彩蛋🍖");
  message.info("真的只是个彩蛋🍟");
};

onMounted(() => {
  const expiryTime = window.localStorage.getItem("authorized");
  if (
    window.localStorage.getItem("redirect") === null &&
    expiryTime !== null &&
    Number(expiryTime).toString() !== "NaN" &&
    new Date().getTime() < Number.parseInt(expiryTime)
  ) {
    // 用户已登录且不存在重定向URL
    // 验证TGC是否有效
    request({
      method: "POST",
      url: "/auth/validateTgc",
      withCredentials: true,
    }).catch((e) => {
      if (e instanceof RequestError) {
        if (e.errCode === RequestErrorTypes.FORBIDDEN) {
          window.localStorage.removeItem("authorized");
          router.push('/');
        }
      }
      router.push('/400');
    })
  }
});
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
