<template>
  <view class="verify">
    <view class="input-wrapper" :class="{ 'input-wrapper-focus': isFocus }">
      <input
        :key="inputKey"
        v-model="verificationCode"
        class="verify-input"
        type="text"
        placeholder="请输入核销码"
        placeholder-class="input-placeholder"
        maxlength="20"
        @focus="isFocus = true"
        @blur="isFocus = false"
      />
      <view class="scan-btn" @tap="handleScan">
        <image
          class="scan-icon"
          src="@/assets/icons/icon-scan@2x.png"
          mode="aspectFit"
        />
      </view>
    </view>

    <SubmitButton
      :text="submitting ? '核销中...' : '立即核销'"
      :disabled="submitting"
      @tap="handleSubmit"
    />
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Taro from "@tarojs/taro";
import { useMockSubmit } from "@/composables/useMockSubmit";
import SubmitButton from "@/components/SubmitButton/index.vue";
import "./index.css";

const verificationCode = ref("");
const isFocus = ref(false);
const inputKey = ref(0);

const { submitting, submit } = useMockSubmit({
  loadingText: "核销中...",
  successText: "核销成功",
  delay: 1500,
});

const handleScan = () => {
  Taro.scanCode({
    success: (res) => {
      if (res.result) {
        verificationCode.value = res.result;
        handleSubmit();
      }
    },
    fail: (err) => {
      if (err.errMsg === "scanCode:fail cancel") {
        return;
      }
      Taro.showToast({
        title: "扫码失败",
        icon: "none",
      });
    },
  });
};

const handleSubmit = () => {
  if (!verificationCode.value.trim()) {
    Taro.showToast({
      title: "请输入核销码",
      icon: "none",
    });
    return;
  }

  submit(() => {
    verificationCode.value = "";
    inputKey.value++;
  });
};
</script>
