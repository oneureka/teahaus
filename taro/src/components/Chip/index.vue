<template>
  <view
    class="chip"
    :class="{ active, disabled, pill }"
    @tap="onClick"
  >
    <slot />
  </view>
</template>

<script setup lang="ts">
interface Props {
  active?: boolean;
  disabled?: boolean;
  pill?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  active: false,
  disabled: false,
  pill: false,
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

<style scoped>
.chip {
  padding: 14rpx 24rpx;
  border-radius: 12rpx;
  font-size: 26rpx;
  color: var(--color-base-content);
  background-color: var(--color-base-200);
  border: 2rpx solid var(--color-taupe-200);
  transition: all 0.15s ease;
}

.chip:active {
  transform: scale(0.95);
}

.chip.pill {
  border-radius: 32rpx;
  padding: 16rpx 28rpx;
}

.chip.active {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  color: var(--color-primary-content);
  font-weight: 600;
}

.chip.disabled {
  opacity: 0.35;
}
</style>
