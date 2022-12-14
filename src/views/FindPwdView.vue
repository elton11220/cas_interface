<template>
  <div class="container">
    <div class="formWrapper">
      <div class="header">
        <div class="icon">
          <img :src="naiveLogoImg" alt="" class="img" />
        </div>
        <div class="appName">App Name</div>
      </div>
      <div class="subTitle">找回密码</div>
      <div class="formItems px-3">
        <div class="formItem">
          <n-input
            placeholder="请输入手机号"
            v-model:value="findPwdForm.phone"
            :status="findPwdFormValidate.phone ? 'error' : ''"
            :on-input="
              () => {
                findPwdFormValidate.phone = false;
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
            v-model:value="findPwdForm.code"
            :maxlength="6"
            :status="findPwdFormValidate.code ? 'error' : ''"
            :on-input="
              () => {
                findPwdFormValidate.code = false;
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
        <div class="formItem flex-col gap-15">
          <n-input
            placeholder="请输入新密码"
            type="password"
            v-model:value="findPwdForm.newPwd"
            show-password-on="mousedown"
            :maxlength="25"
            :status="findPwdFormValidate.newPwd ? 'error' : ''"
            :on-input="
              () => {
                findPwdFormValidate.newPwd = false;
              }
            "
          >
            <template v-slot:prefix>
              <n-icon color="#333639">
                <KeyOutline />
              </n-icon>
            </template>
          </n-input>
          <PwdStrength :value="newPwdComplexity" />
        </div>
      </div>
      <div class="tip">*仅支持已绑定手机号的账户找回密码</div>
      <div class="px-3">
        <n-button
          type="primary"
          block
          @click="submitFindPwdForm"
          :loading="findPwdFormSubmitLoading"
          >修改密码</n-button
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import naiveLogoImg from "@/assets/naiveLogo.svg";
import {
  PhonePortraitOutline,
  KeypadOutline,
  KeyOutline,
} from "@vicons/ionicons5";
import { ref, computed } from "vue";
import PwdStrength from "../components/PwdStrength.vue";

const message = useMessage();

interface FindPwdFormType {
  phone: string;
  code: string;
  newPwd: string;
}

const findPwdForm = ref<FindPwdFormType>({
  phone: "",
  code: "",
  newPwd: "",
});

const findPwdFormValidate = ref({
  phone: false,
  code: false,
  newPwd: false,
});

const validatePhoneNumber = (phone: string) =>
  /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(
    phone
  );

const computeNewPwdComplexity = (password: string) => {
  let level = 0;
  // 6-18位，包括至少1个大写字母，1个小写字母，1个数字
  const level2RegExp = new RegExp(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{6,25}/
  );
  // 包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符，特殊字符只能是!@$%^*?~
  const level3RegExp = new RegExp(
    /^(?=.*\d)(?=.*[A-Za-z])(?=.*[!@$%^*?~])[\u4E00-\u9FA5A-Za-z0-9!@$%^*?~]{8,25}/
  );
  if (level2RegExp.test(password)) {
    level++;
  }
  if (level3RegExp.test(password)) {
    level++;
  }
  return level;
};

const newPwdComplexity = computed(() =>
  computeNewPwdComplexity(findPwdForm.value.newPwd)
);

const validateFindPwdForm = () => {
  const { phone, code, newPwd } = findPwdForm.value;
  if (phone === "" || code === "" || newPwd === "") {
    findPwdFormValidate.value.phone = phone === "";
    findPwdFormValidate.value.code = code === "";
    findPwdFormValidate.value.newPwd = newPwd === "";
    message.error("手机号、验证码或新密码不能为空");
    return false;
  }
  if (validatePhoneNumber(phone) === false) {
    findPwdFormValidate.value.phone = true;
    message.error("手机号格式错误");
    return false;
  }
  if (/^[0-9]{6}$/.test(code) === false) {
    findPwdFormValidate.value.code = true;
    message.error("验证码只能为6位数字");
    return false;
  }
  if (newPwdComplexity.value < 1) {
    findPwdFormValidate.value.newPwd = true;
    message.info("新密码推荐使用8-25位大写字母、小写字母、数字、特殊字符!@$%^*?~");
    message.error("禁止使用弱密码");
    return false;
  }
  return true;
};

const getMsgCode = () => {
  const { phone } = findPwdForm.value;
  if (validatePhoneNumber(phone) === false) {
    findPwdFormValidate.value.phone = true;
    message.error("手机号格式错误");
    return;
  }
  console.log("getMsgCode");
};

const submitFindPwdForm = () => {
  if (validateFindPwdForm()) {
    findPwdFormSubmitLoading.value = true;
    console.log("submitting");
    console.log(findPwdForm.value);
  }
};

const findPwdFormSubmitLoading = ref<boolean>(false);
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
  padding: 15px 0;
  font-size: 12px;
  color: #9e9e9e;
  font-weight: lighter;
  text-align: center;
  user-select: none;
}

.px-3 {
  padding-left: 3px !important;
  padding-right: 3px !important;
}

.gap-15 {
  gap: 15px !important;
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
    padding-top: 25px;
    > .formItem {
      display: flex;
      align-items: center;
      gap: 10px;
    }
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
