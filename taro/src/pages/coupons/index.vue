<template>
  <view class="coupons">
    <view class="status-filter">
      <view
        v-for="(filter, index) in statusFilters"
        :key="filter.key || index"
        class="status-tag"
        :class="{ 'status-tag-active': activeTab === filter.type }"
        @tap="onTabChange(index, filter)"
      >
        <text>{{ filter.title }}</text>
      </view>
    </view>
    <scroll-view
      :style="{ height: scrollHeight + 'px' }"
      refresher-background="var(--color-base-200)"
      :refresher-enabled="true"
      :refresher-triggered="refreshing"
      @refresherrefresh="onRefresh"
    >
      <view class="coupons-list">
        <view v-if="filteredCoupons.length === 0" class="empty">
          <image
            class="empty-image"
            :src="emptyCouponsImage"
            mode="aspectFit"
          />
          <text v-if="activeTab === CouponStatus.ALL" class="empty-text">还没有卡券呢</text>
          <text v-else class="empty-text">暂无相关卡券</text>
          <view
            v-if="activeTab === CouponStatus.ALL"
            class="btn-get-coupons"
            @tap="getMoreCoupons"
          >
            <text>去领取</text>
          </view>
        </view>
        <view
          v-else
          v-for="coupon in filteredCoupons"
          :key="coupon.id"
          class="coupon-card"
          :class="{ 'coupon-used': coupon.status === CouponStatus.USED }"
          @tap="handleCouponTap(coupon)"
        >
          <view class="coupon-info">
            <view class="coupon-header">
              <text class="coupon-name">{{ coupon.name }}</text>
              <text :class="couponStatusClass(coupon)">{{ couponStatusLabel(coupon) }}</text>
            </view>
            <view class="coupon-details">
              <text class="coupon-value">¥{{ coupon.value }}</text>
              <text class="coupon-desc">{{ coupon.description }}</text>
            </view>
            <view class="coupon-footer">
              <text class="coupon-conditions">{{ coupon.conditions }}</text>
              <text class="coupon-valid-date">
                有效期至 {{ coupon.expireDate }}
              </text>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import Taro from "@tarojs/taro";
import { useSystemStore } from "@/stores/system";
import emptyCouponsImage from "@/assets/images/no-coupons.png";
import { couponList, CouponStatus, type Coupon } from "@/datasets";
import "./index.css";

interface StatusFilter {
  title: string;
  key: string;
  type: CouponStatus;
}

const statusFilters: StatusFilter[] = [
  { title: "全部", key: "all", type: CouponStatus.ALL },
  { title: "可用", key: "new", type: CouponStatus.NEW },
  { title: "即将过期", key: "expiring", type: CouponStatus.EXPIRING },
  { title: "已使用", key: "used", type: CouponStatus.USED },
];

const activeTab = ref<CouponStatus>(CouponStatus.ALL);
const refreshing = ref(false);

const systemStore = useSystemStore();
systemStore.init();

const scrollHeight = computed(() => {
  return systemStore.systemViewHeight.windowHeight - 100;
});

const onRefresh = () => {
  refreshing.value = true;
  setTimeout(() => {
    refreshing.value = false;
  }, 2000);
};

const coupons = ref<Coupon[]>([...couponList]);

const onTabChange = (_index: number, filter: StatusFilter) => {
  activeTab.value = filter.type;
};

const isExpiringSoon = (coupon: Coupon): boolean => {
  const expireDate = new Date(coupon.expireDate);
  const now = new Date();
  const daysUntilExpire = Math.floor(
    (expireDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
  );
  return daysUntilExpire <= 30 && daysUntilExpire >= 0;
};

const isExpired = (coupon: Coupon): boolean => {
  return new Date(coupon.expireDate) < new Date();
};

const couponStatusLabel = (coupon: Coupon): string => {
  if (coupon.status === CouponStatus.USED) return "已使用";
  if (isExpired(coupon)) return "已过期";
  if (isExpiringSoon(coupon)) return "即将过期";
  return "可用";
};

const couponStatusClass = (coupon: Coupon): string => {
  if (coupon.status === CouponStatus.USED) return "coupon-status-used";
  if (isExpired(coupon)) return "coupon-status-expired";
  if (isExpiringSoon(coupon)) return "coupon-status-expiring";
  return "coupon-status-new";
};

const filteredCoupons = computed(() => {
  const currentStatus = activeTab.value;
  if (currentStatus === CouponStatus.ALL) {
    return coupons.value;
  }
  if (currentStatus === CouponStatus.EXPIRING) {
    return coupons.value.filter(
      (c) => c.status === CouponStatus.NEW && isExpiringSoon(c),
    );
  }
  if (currentStatus === CouponStatus.NEW) {
    return coupons.value.filter(
      (c) => c.status === CouponStatus.NEW && !isExpired(c),
    );
  }
  return coupons.value.filter((coupon) => coupon.status === currentStatus);
});

const handleCouponTap = (coupon: Coupon) => {
  if (coupon.status === CouponStatus.USED) {
    Taro.showToast({
      title: "该卡券已使用",
      icon: "none",
    });
    return;
  }
  Taro.showToast({
    title: `使用 ${coupon.name}`,
    icon: "none",
  });
};

const getMoreCoupons = () => {
  Taro.showToast({
    title: "跳转到领取中心",
    icon: "none",
  });
};
</script>
