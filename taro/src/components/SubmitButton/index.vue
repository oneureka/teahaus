<template>
  <view
    class="submit-btn"
    :class="[variant, { disabled }]"
    @tap="onClick"
  >
    <text class="submit-btn-text">{{ text }}</text>
  </view>
</template>

<script setup lang="ts">
interface Props {
  text: string;
  variant?: "pill" | "square";
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "square",
  disabled: false,
});

const emit = defineEmits<{
  tap: [];
}>();

const onClick = () => {
  if (!props.disabled) {
    emit("tap");
  }
};
</script>

<style>
.submit-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: var(--gradient-button);
  box-shadow: 0 4rpx 16rpx var(--color-shadow-button);
  transition: opacity 0.15s ease;
}

.submit-btn:active {
  opacity: 0.9;
}

.submit-btn.pill {
  border-radius: 48rpx;
  padding: 22rpx 56rpx;
  box-shadow: 0 8rpx 24rpx var(--color-shadow-button);
}

.submit-btn.square {
  border-radius: 12rpx;
  padding: 28rpx 0;
}

.submit-btn.disabled {
  opacity: 0.6;
}

.submit-btn-text {
  font-weight: 600;
}

.submit-btn.pill .submit-btn-text {
  font-size: 30rpx;
  color: var(--color-taupe-200);
}

.submit-btn.square .submit-btn-text {
  font-size: 32rpx;
  color: var(--color-taupe-200);
}
</style>
