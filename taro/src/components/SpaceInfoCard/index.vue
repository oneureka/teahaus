<template>
  <view class="space-info-card" :class="{ clickable }" @tap="onClick">
    <image class="space-image" :src="image" mode="aspectFill" />
    <view class="space-detail">
      <view class="space-top-row">
        <text class="space-name">{{ spaceName }}</text>
        <text v-if="price" class="room-price-info">{{ price }}</text>
      </view>
      <text class="room-name">{{ roomName }}</text>
    </view>
    <image v-if="showArrow" class="arrow" src="@/assets/icons/icon-arrow@2x.png" mode="aspectFill" />
  </view>
</template>

<script setup lang="ts">
interface Props {
  image: string;
  spaceName: string;
  roomName: string;
  price?: string;
  showArrow?: boolean;
  clickable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  price: "",
  showArrow: false,
  clickable: false,
});

const emit = defineEmits<{
  tap: [];
}>();

const onClick = () => {
  if (props.clickable) {
    emit("tap");
  }
};
</script>

<style>
.space-info-card {
  display: flex;
  align-items: center;
}

.space-info-card.clickable {
  cursor: pointer;
}

.space-image {
  width: 140rpx;
  height: 140rpx;
  border-radius: 12rpx;
  margin-right: 20rpx;
  display: block;
  border: 2rpx solid var(--color-base-100);
  outline: 2rpx solid var(--color-taupe-200);
  outline-offset: -4rpx;
}

.space-detail {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24rpx;
  min-width: 0;
}

.space-top-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.space-name {
  font-size: 30rpx;
  font-weight: 600;
  color: var(--color-base-content);
}

.room-name {
  font-size: 26rpx;
  color: var(--color-taupe-500);
}

.room-price-info {
  font-size: 30rpx;
  color: var(--color-gold);
  font-weight: 600;
}

.arrow {
  width: 32rpx;
  height: 32rpx;
  display: block;
  margin-left: 12rpx;
}
</style>
