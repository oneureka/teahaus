<template>
  <view
    class="coupon-card"
    :class="{ 'coupon-used': coupon.status === CouponStatus.USED }"
    @tap="onClick"
  >
    <view class="coupon-info">
      <view class="coupon-header">
        <text class="coupon-name">{{ coupon.name }}</text>
        <text :class="statusClass">{{ statusLabel }}</text>
      </view>
      <view class="coupon-details">
        <text class="coupon-value">¥{{ coupon.value }}</text>
        <text class="coupon-desc">{{ coupon.description }}</text>
      </view>
      <view class="coupon-footer">
        <text class="coupon-conditions">{{ coupon.conditions }}</text>
        <text class="coupon-valid-date">有效期至 {{ coupon.expireDate }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { CouponStatus, type Coupon } from "@/datasets/coupons";

const props = defineProps<{
  coupon: Coupon;
}>();

const emit = defineEmits<{
  tap: [coupon: Coupon];
}>();

interface CouponStatusMeta {
  label: string;
  className: string;
}

function getStatusMeta(coupon: Coupon): CouponStatusMeta {
  if (coupon.status === CouponStatus.USED) {
    return { label: "已使用", className: "coupon-status-used" };
  }
  const expireDate = new Date(coupon.expireDate);
  const now = new Date();
  const daysUntilExpire = Math.floor(
    (expireDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
  );
  if (daysUntilExpire < 0) return { label: "已过期", className: "coupon-status-expired" };
  if (daysUntilExpire <= 30) {
    return { label: "即将过期", className: "coupon-status-expiring" };
  }
  return { label: "可用", className: "coupon-status-new" };
}

const statusLabel = computed(() => getStatusMeta(props.coupon).label);
const statusClass = computed(() => getStatusMeta(props.coupon).className);

const onClick = () => {
  emit("tap", props.coupon);
};
</script>
