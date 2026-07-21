<template>
  <view class="coupons">
    <view class="status-filter">
      <view
        v-for="(filter, index) in statusFilters"
        :key="filter.key"
        class="status-tag"
        :class="{ 'status-tag-active': activeTab === filter.type }"
        @tap="onTabChange(index, filter)"
      >
        <text>{{ filter.title }}</text>
      </view>
    </view>
    <scroll-view
      class="scroll-view"
      refresher-background="var(--color-base-200)"
      :refresher-enabled="true"
      :refresher-triggered="refreshing"
      @refresherrefresh="onRefresh"
    >
      <view class="coupons-list">
        <EmptyState
          v-if="filteredCoupons.length === 0"
          :image="emptyCouponsImage"
          :text="
            activeTab === CouponStatus.ALL ? '还没有卡券呢' : '暂无相关卡券'
          "
          :action-text="activeTab === CouponStatus.ALL ? '去领取' : ''"
          @action="getMoreCoupons"
        />
        <view v-else v-for="coupon in filteredCoupons" :key="coupon.id">
          <CouponCard :coupon="coupon" @tap="handleCouponTap" />
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Taro from '@tarojs/taro'
import emptyCouponsImage from '@/assets/images/no-coupons.png'
import { couponList, CouponStatus, type Coupon } from '@/datasets/coupons'
import { isExpiringSoon, isExpired } from '@/utils/coupon'
import EmptyState from '@/components/EmptyState/index.vue'
import CouponCard from '@/components/CouponCard/index.vue'
import './index.css'

interface StatusFilter {
  title: string
  key: string
  type: CouponStatus
}

const statusFilters: StatusFilter[] = [
  { title: '全部', key: 'all', type: CouponStatus.ALL },
  { title: '可用', key: 'new', type: CouponStatus.NEW },
  { title: '即将过期', key: 'expiring', type: CouponStatus.EXPIRING },
  { title: '已使用', key: 'used', type: CouponStatus.USED },
  { title: '已过期', key: 'expired', type: CouponStatus.EXPIRED }
]

const activeTab = ref<CouponStatus>(CouponStatus.ALL)
const refreshing = ref(false)

const onRefresh = () => {
  refreshing.value = true
  setTimeout(() => {
    refreshing.value = false
  }, 2000)
}

const coupons = ref<Coupon[]>([...couponList])

const onTabChange = (_index: number, filter: StatusFilter) => {
  activeTab.value = filter.type
}

const filteredCoupons = computed(() => {
  const currentStatus = activeTab.value
  if (currentStatus === CouponStatus.ALL) {
    return coupons.value
  }
  if (currentStatus === CouponStatus.EXPIRING) {
    return coupons.value.filter(
      (c) => c.status === CouponStatus.NEW && isExpiringSoon(c.expireDate)
    )
  }
  if (currentStatus === CouponStatus.NEW) {
    return coupons.value.filter(
      (c) => c.status === CouponStatus.NEW && !isExpired(c.expireDate)
    )
  }
  if (currentStatus === CouponStatus.EXPIRED) {
    return coupons.value.filter((c) => c.status === CouponStatus.EXPIRED)
  }
  return coupons.value.filter((coupon) => coupon.status === currentStatus)
})

const handleCouponTap = (coupon: Coupon) => {
  if (coupon.status === CouponStatus.USED) {
    Taro.showToast({
      title: '该卡券已使用',
      icon: 'none'
    })
    return
  }
  if (isExpired(coupon.expireDate)) {
    Taro.showToast({
      title: '该卡券已过期',
      icon: 'none'
    })
    return
  }
  Taro.showToast({
    title: `使用 ${coupon.name}`,
    icon: 'none'
  })
}

const getMoreCoupons = () => {
  Taro.showToast({
    title: '跳转到领取中心',
    icon: 'none'
  })
}
</script>
