<template>
  <view v-if="modelValue" class="modal-mask" @tap="onMaskTap">
    <view class="modal-content" @tap.stop>
      <view class="modal-header">
        <text class="modal-title">{{ title }}</text>
        <text class="modal-close" @tap="onClose">✕</text>
      </view>
      <view class="modal-body">
        <slot />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean
  title?: string
  closeOnMask?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  closeOnMask: true
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const onClose = () => {
  emit('update:modelValue', false)
}

const onMaskTap = () => {
  if (props.closeOnMask) {
    onClose()
  }
}
</script>

<style>
.modal-mask {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  width: 600rpx;
  max-width: 86vw;
  background-color: var(--color-base-100);
  border-radius: 20rpx;
  overflow: hidden;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 28rpx 32rpx;
  border-bottom: 1rpx solid var(--color-taupe-200);
}

.modal-title {
  font-size: 32rpx;
  font-weight: 600;
  color: var(--color-base-content);
}

.modal-close {
  font-size: 32rpx;
  color: var(--color-taupe-400);
}

.modal-body {
  padding: 32rpx;
}
</style>
