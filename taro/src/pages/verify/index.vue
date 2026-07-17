<template>
  <view class="verify">
    <view class="input-wrapper" :class="{ 'input-wrapper-focus': isFocus }">
      <input
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

    <view class="btn-submit" :class="{ 'btn-submit-disabled': submitting }" @tap="handleSubmit">
      <text class="btn-submit-text">{{ submitting ? '核销中...' : '立即核销' }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Taro from "@tarojs/taro";
import "./index.css";

const verificationCode = ref("");
const isFocus = ref(false);
const submitting = ref(false);

const handleScan = () => {
  Taro.scanCode({
    success: (res) => {
      if (res.result) {
        verificationCode.value = res.result;
        Taro.showToast({
          title: "扫码成功",
          icon: "success",
        });
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
  if (submitting.value) return;

  if (!verificationCode.value.trim()) {
    Taro.showToast({
      title: "请输入核销码",
      icon: "none",
    });
    return;
  }

  submitting.value = true;
  Taro.showLoading({
    title: "核销中...",
  });

  setTimeout(() => {
    Taro.hideLoading();
    Taro.showToast({
      title: "核销成功",
      icon: "success",
    });
    verificationCode.value = "";
    submitting.value = false;
  }, 1500);
};
</script>
