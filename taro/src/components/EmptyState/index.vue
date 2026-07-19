<template>
  <view class="empty-state">
    <image
      v-if="image"
      class="empty-image"
      :src="image"
      mode="aspectFit"
    />
    <text class="empty-text">{{ text }}</text>
    <view v-if="actionText" class="empty-action" @tap="onActionTap">
      <text>{{ actionText }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
export interface Props {
  image?: string
  text: string
  actionText?: string
}

const props = withDefaults(defineProps<Props>(), {
  image: "",
  actionText: "",
});

const emit = defineEmits<{
  action: []
}>();

const onActionTap = () => {
  emit("action");
};
</script>

<style>
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 120rpx 0;
}

.empty-image {
  width: 240rpx;
  height: 240rpx;
  margin-bottom: 24rpx;
}

.empty-text {
  font-size: 28rpx;
  color: var(--color-taupe-400);
}

.empty-action {
  margin-top: 32rpx;
  padding: 16rpx 48rpx;
  background-color: var(--color-primary);
  border-radius: 40rpx;
}

.empty-action text {
  font-size: 28rpx;
  color: var(--color-primary-content);
}
</style>
