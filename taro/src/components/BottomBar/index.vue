<template>
  <view class="bottom-bar" :class="[justify, { tall, shadow }]">
    <slot />
  </view>
</template>

<script setup lang="ts">
interface Props {
  justify?: "between" | "end" | "center";
  tall?: boolean;
  shadow?: boolean;
}

withDefaults(defineProps<Props>(), {
  justify: "between",
  tall: false,
  shadow: false,
});
</script>

<style scoped>
.bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  padding: 20rpx 24rpx;
  padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
  background-color: var(--color-base-100);
  border-top: 2rpx solid var(--color-taupe-300);
  z-index: 100;
}

.bottom-bar.justify-between {
  justify-content: space-between;
}

.bottom-bar.justify-end {
  justify-content: flex-end;
  gap: 24rpx;
}

.bottom-bar.justify-center {
  justify-content: center;
}

.bottom-bar.tall {
  height: 120rpx;
  padding: 0 24rpx;
}

.bottom-bar.shadow {
  border-top: none;
  box-shadow: 0 -4rpx 20rpx var(--color-shadow-card);
}
</style>
