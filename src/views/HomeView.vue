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
      <n-tabs type="line" animated justify-content="space-evenly">
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
          <div class="px-3 mt-30">
            <n-button
              type="primary"
              block
              @click="submitLoginForm"
              :loading="loginFormSubmitLoading"
              >登 录</n-button
            >
          </div>
          <div class="options px-3">
            <router-link class="link" to="forgetPassword">已有账号，忘记密码？</router-link>
          </div>
          <div class="others">
            <div>其他登录方式</div>
            <n-icon size="28" @click="loginByGithub" style="cursor: pointer">
              <LogoGithub />
            </n-icon>
          </div>
        </n-tab-pane>
        <n-tab-pane name="loginByPhone" tab="手机号登录">
          <div class="formItems px-3">
            <div class="formItem">
              <n-input
                placeholder="请输入手机号"
                v-model:value="loginByPhoneForm.phone"
                :status="loginByPhoneFormValidate.phone ? 'error' : ''"
                :on-input="
                  () => {
                    loginByPhoneFormValidate.phone = false;
                  }
                "
                :maxlength="11"
              >
                <template v-slot:prefix>
                  <n-icon color="#333639">
                    <PhonePortraitOutline />
                  </n-icon>
                </template>
              </n-input>
            </div>
            <div class="formItem">
              <n-input
                placeholder="请输入验证码"
                v-model:value="loginByPhoneForm.code"
                :maxlength="6"
                :status="loginByPhoneFormValidate.code ? 'error' : ''"
                :on-input="
                  () => {
                    loginByPhoneFormValidate.code = false;
                  }
                "
              >
                <template v-slot:prefix>
                  <n-icon color="#333639">
                    <KeypadOutline />
                  </n-icon>
                </template>
              </n-input>
              <n-button @click="getMsgCode">获取验证码</n-button>
            </div>
          </div>
          <div class="px-3 mt-30">
            <n-button
              type="primary"
              block
              @click="submitLoginByPhoneForm"
              :loading="loginByPhoneFormSubmitLoading"
              >登 录</n-button
            >
          </div>
          <div class="options px-3">
            <router-link class="link" to="forgetPassword">已有账号，忘记密码？</router-link>
          </div>
          <div class="others">
            <div>其他登录方式</div>
            <n-icon size="28" @click="loginByGithub" style="cursor: pointer">
              <LogoGithub />
            </n-icon>
          </div>
        </n-tab-pane>
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
  PhonePortraitOutline,
  KeypadOutline,
} from "@vicons/ionicons5";
import { ref } from "vue";
import request from "@/utils/request";
import { useRouter } from "vue-router";

const message = useMessage();
window.$message = useMessage();

const router = useRouter();

// github OAuth
const loginByGithub = () => {
  const githubOptions = {
    clientId: "459ae6faf422ca9ac168",
    redirectUri: "http://localhost:5173/callback",
  };
  window.location.href = `https://github.com/login/oauth/authorize?client_id=${githubOptions.clientId}&redirect_uri=${githubOptions.redirectUri}`;
};
//

interface LoginFormType {
  username: string;
  password: string;
}

interface TgcResult {
  tgc: string;
  maxAge: string;
}

const loginForm = ref<LoginFormType>({
  username: "",
  password: "",
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

const submitLoginForm = async () => {
  if (validateLoginForm()) {
    loginFormSubmitLoading.value = true;
    const { data: tgcResult } = await request<TgcResult>({
      url: "/auth/getTgc",
      method: "POST",
      data: {
        username: loginForm.value.username,
        password: loginForm.value.password,
      },
      withCredentials: false,
    });
    if (tgcResult?.tgc == null) {
      loginFormSubmitLoading.value = false;
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
    loginFormSubmitLoading.value = false;
  }
};

const loginFormSubmitLoading = ref<boolean>(false);

// loginByPhone

interface LoginByPhoneFormType {
  phone: string;
  code: string;
}

const loginByPhoneForm = ref<LoginByPhoneFormType>({
  phone: "",
  code: "",
});

const loginByPhoneFormValidate = ref({
  phone: false,
  code: false,
});

const validatePhoneNumber = (phone: string) =>
  /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(
    phone
  );

const validateLoginByPhoneForm = () => {
  const { phone, code } = loginByPhoneForm.value;
  if (phone === "" || code === "") {
    loginByPhoneFormValidate.value.phone = phone === "";
    loginByPhoneFormValidate.value.code = code === "";
    message.error("手机号或验证码不能为空");
    return false;
  }
  if (validatePhoneNumber(phone) === false) {
    loginByPhoneFormValidate.value.phone = true;
    message.error("手机号格式错误");
    return false;
  }
  if (/^[0-9]{6}$/.test(code) === false) {
    loginByPhoneFormValidate.value.code = true;
    message.error("验证码只能为6位数字");
    return false;
  }
  return true;
};

const getMsgCode = () => {
  const { phone } = loginByPhoneForm.value;
  if (validatePhoneNumber(phone) === false) {
    loginByPhoneFormValidate.value.phone = true;
    message.error("手机号格式错误");
    return;
  }
  console.log("getMsgCode");
};

const submitLoginByPhoneForm = () => {
  if (validateLoginByPhoneForm()) {
    loginByPhoneFormSubmitLoading.value = true;
    console.log("submitting");
    console.log(loginByPhoneForm.value);
  }
};

const loginByPhoneFormSubmitLoading = ref<boolean>(false);
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

.link {
  color: #36ad6a;
  text-decoration: none;
}

.mt-30 {
  margin-top: 30px;
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
    padding-top: 15px;
    display: flex;
    justify-content: space-evenly;
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
