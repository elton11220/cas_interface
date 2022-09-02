<template>
  <div class="container">
    <div class="formWrapper">
      <div class="formItems px-3">
        <div class="formItem justify-center">
          <n-spin size="small">
            <template #description>
              <div class="tip">第三方登录中</div>
            </template>
          </n-spin>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import request from "@/utils/request";
import { useRoute, useRouter } from "vue-router";
import { onMounted } from "vue";

const message = useMessage();
window.$message = useMessage();

const route = useRoute();
const router = useRouter();

interface TgcResult {
  tgc: string;
  maxAge: string;
}

onMounted(async () => {
  const {
    query: { code },
  } = route;
  try {
    const { data: tgcResult } = await request<TgcResult>({
      url: "/auth/getTgcByOauth",
      method: "POST",
      data: {
        provider: "github",
        code,
      },
      withCredentials: false,
    });
    if (tgcResult?.tgc == null) {
      throw new Error();
    }
    let redirect = window.localStorage.getItem("redirect");
    const expiryTime = new Date().getTime() + Number.parseInt(tgcResult.maxAge)
    window.localStorage.setItem("authorized", expiryTime.toString()); // 设置已登录状态
    if (redirect !== null) {
      const uri = router.resolve({
        path: redirect,
        query: {
          tgc: tgcResult?.tgc,
        },
      });
      window.localStorage.removeItem("redirect");
      window.location.href = uri.fullPath.replace(/^\//, "");
    } else {
      router.push("/noRedirectUrl");
    }
  } catch (e) {
    router.push("/");
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
</style>
