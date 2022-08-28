<template>
  <div class="container">
    <div class="formWrapper">
      <div class="header">
        <div class="icon">
          <img :src="naiveLogoImg" alt="" class="img" />
        </div>
        <div class="appName">App Name</div>
      </div>
      <div class="subTitle">内网统一认证服务</div>
      <n-tabs
        type="line"
        animated
        justify-content="space-evenly"
        tab-style="font-size: 0.00729rem;"
      >
        <n-tab-pane name="login" tab="账号密码登录">
          <div class="formItems px-3">
            <div class="formItem">
              <n-input
                placeholder="请输入用户名"
                v-model:value="loginForm.username"
                :status="loginFormValidate.username ? 'error' : ''"
                :on-input="
                  () => {
                    loginFormValidate.username = false;
                  }
                "
                :maxlength="20"
              >
                <template v-slot:prefix>
                  <n-icon color="#333639">
                    <PersonOutline />
                  </n-icon>
                </template>
              </n-input>
            </div>
            <div class="formItem">
              <n-input
                placeholder="请输入密码"
                type="password"
                v-model:value="loginForm.password"
                show-password-on="mousedown"
                :maxlength="25"
                :status="loginFormValidate.password ? 'error' : ''"
                :on-input="
                  () => {
                    loginFormValidate.password = false;
                  }
                "
              >
                <template v-slot:prefix>
                  <n-icon color="#333639">
                    <LockClosedOutline />
                  </n-icon>
                </template>
              </n-input>
            </div>
          </div>
          <div class="options px-3">
            <n-checkbox
              size="small"
              label="自动登录"
              v-model:checked="loginForm.autoLogin"
            />
            <n-button text type="primary">找回密码</n-button>
          </div>
          <div class="px-3">
            <n-button
            type="primary"
            block
            @click="submitLoginForm"
            :loading="loginFormSubmitLoading"
            >登 录</n-button
          >
          </div>
          <div class="others">
            <div>其他登录方式</div>
            <n-icon size="0.1458rem">
              <LogoGithub />
            </n-icon>
          </div>
        </n-tab-pane>
        <n-tab-pane name="loginByPhone" tab="手机号登录"> </n-tab-pane>
      </n-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import naiveLogoImg from "@/assets/naiveLogo.svg";
import {
  PersonOutline,
  LockClosedOutline,
  LogoGithub,
} from "@vicons/ionicons5";
import { ref } from "vue";

const message = useMessage();

interface LoginFormType {
  username: string;
  password: string;
  autoLogin: boolean;
}

const loginForm = ref<LoginFormType>({
  username: "",
  password: "",
  autoLogin: true,
});

const loginFormValidate = ref({
  username: false,
  password: false,
});

const validateLoginForm = () => {
  const { username, password } = loginForm.value;
  if (username === "" || password === "") {
    loginFormValidate.value.username = username === "";
    loginFormValidate.value.password = password === "";
    message.error("用户名或密码不能为空");
    return false;
  }
  return true;
};

const submitLoginForm = () => {
  if (validateLoginForm()) {
    loginFormSubmitLoading.value = true;
    console.log("submitting");
    console.log(loginForm.value)
  }
};

const loginFormSubmitLoading = ref<boolean>(false);
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
  > .header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    > .icon {
      width: 36px;
      height: 36px;
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
    > .appName {
      font-size: 25px;
      color: #9e9e9e;
    }
  }
  > .subTitle {
    font-size: 14px;
    color: #9e9e9e;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding-top: 8px;
  }
  .formItems {
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding-top: 13px;
    > .formItem {
      display: flex;
      align-items: center;
      gap: 10px;
    }
  }
  .options {
    padding: 30px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .others {
    padding-top: 30px;
    display: flex;
    align-items: center;
    gap: 20px;
    font-size: 14px;
  }
}
.flex {
  display: flex;
}

.justify-center {
  justify-content: center;
}

.items-center {
  align-items: center;
}

.justify-between {
  justify-content: space-between;
}

.flex-col {
  flex-direction: column;
}
</style>
