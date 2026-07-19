<template>
  <view class="image-upload">
    <view v-for="(img, index) in modelValue" :key="index" class="image-item">
      <image class="upload-image" :src="img" mode="aspectFill" />
      <view class="delete-btn" @tap="onDelete(index)">
        <text>✕</text>
      </view>
    </view>
    <view
      v-if="modelValue.length < max"
      class="upload-btn"
      @tap="onUpload"
    >
      <text class="upload-icon">+</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import Taro from "@tarojs/taro";

interface Props {
  modelValue: string[];
  max?: number;
}

const props = withDefaults(defineProps<Props>(), {
  max: 9,
});

const emit = defineEmits<{
  "update:modelValue": [value: string[]];
}>();

const onUpload = () => {
  const remain = props.max - props.modelValue.length;
  if (remain <= 0) return;
  Taro.chooseImage({
    count: remain,
    sizeType: ["compressed"],
    sourceType: ["album", "camera"],
    success: (res) => {
      emit("update:modelValue", [...props.modelValue, ...res.tempFilePaths]);
    },
  });
};

const onDelete = (index: number) => {
  const next = [...props.modelValue];
  next.splice(index, 1);
  emit("update:modelValue", next);
};
</script>

<style scoped>
.image-upload {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
}

.image-item {
  position: relative;
  width: 180rpx;
  height: 180rpx;
}

.upload-image {
  width: 100%;
  height: 100%;
  border-radius: 16rpx;
}

.delete-btn {
  position: absolute;
  top: -12rpx;
  right: -12rpx;
  width: 48rpx;
  height: 48rpx;
  background-color: var(--color-error);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4rpx 12rpx rgba(252, 149, 129, 0.4);
}

.delete-btn text {
  font-size: 24rpx;
  color: var(--color-error-content);
  font-weight: bold;
}

.upload-btn {
  width: 180rpx;
  height: 180rpx;
  border: 2rpx dashed var(--color-taupe-400);
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-base-100);
}

.upload-icon {
  font-size: 60rpx;
  color: var(--color-taupe-400);
}
</style>
