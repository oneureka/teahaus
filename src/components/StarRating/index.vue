<template>
  <view class="star-rating">
    <text
      v-for="star in count"
      :key="star"
      class="star-icon"
      :class="{ active: star <= modelValue }"
      @tap="onClick(star)"
    >
      ★
    </text>
  </view>
</template>

<script setup lang="ts">
interface Props {
  modelValue: number
  count?: number
  readonly?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  count: 5,
  readonly: false
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

const onClick = (star: number) => {
  if (!props.readonly) {
    emit('update:modelValue', star)
  }
}
</script>

<style scoped>
.star-rating {
  display: flex;
  gap: 16rpx;
}

.star-icon {
  font-size: 60rpx;
  color: var(--color-taupe-300);
  transition: color 0.2s ease;
}

.star-icon.active {
  color: var(--color-accent);
}
</style>
