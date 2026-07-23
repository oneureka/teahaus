<template>
  <view class="orders">
    <view class="orders-tabs">
      <view
        v-for="(tab, index) in tabs"
        :key="tab.key || index"
        class="orders-tab"
        :class="{ 'orders-tab-active': activeTab === tab.type }"
        @tap="onTabChange(tab.type)"
      >
        {{ tab.title }}
      </view>
    </view>
    <view class="orders-list">
      <EmptyState
        v-if="filteredOrders.length === 0"
        :image="emptyOrdersImage"
        :text="
          activeTab === 'ALL' ? '还没有订单呢' : `暂无${activeTabName}订单`
        "
      />
      <view
        v-else
        class="order-card"
        v-for="order in filteredOrders"
        :key="order.id"
        @tap="onOrderClick(order)"
      >
        <view class="card-header">
          <text class="card-order-no">{{ order.orderNo }}</text>
          <text class="card-status" :class="statusClass(order.status)">{{
            statusLabel(order.status)
          }}</text>
        </view>
        <text class="card-title">{{ getSpaceName(order.spaceId) }}</text>
        <view class="card-subtitle">
          <text class="card-room">{{ getRoomName(order.roomId) }}</text>
          <text class="card-divider">·</text>
          <text class="card-duration">{{
            calcDuration(order.startTime, order.endTime)
          }}</text>
          <text class="card-divider">·</text>
          <text class="card-reserve"
            >{{ order.startTime }}-{{ order.endTime }}</text
          >
        </view>
        <view class="card-footer">
          <text class="card-order-time">{{
            formatRelativeTime(order.createdAt)
          }}</text>
          <text class="card-price">¥{{ order.totalPrice }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import Taro, { usePullDownRefresh } from '@tarojs/taro'
import { ref, computed } from 'vue'
import emptyOrdersImage from '@/assets/images/no-orders.png'
import { orderList, type Order, type OrderStatus } from '@/datasets/orders'
import { ROUTES, buildRoute } from '@/constants/routes'
import { usePullRefresh } from '@/composables/useMockSubmit'
import { formatRelativeTime } from '@/utils/time'
import { statusLabel, getSpaceName, getRoomName } from '@/utils/order'
import EmptyState from '@/components/EmptyState/index.vue'
import './index.css'

type FilterStatus = OrderStatus | 'ALL'

interface TabItem {
  title: string
  key: string
  type: FilterStatus
}

const tabs: TabItem[] = [
  { title: '全部', key: 'all', type: 'ALL' },
  { title: '未支付', key: 'unpaid', type: 'UNPAID' },
  { title: '进行中', key: 'in-progress', type: 'IN_PROGRESS' },
  { title: '已完成', key: 'completed', type: 'COMPLETED' }
]

const activeTab = ref<FilterStatus>('ALL')

const orders = ref<Order[]>([...orderList])

const statusClass = (status: OrderStatus): string => {
  return status === 'CANCELLED' ? 'card-status-cancelled' : ''
}

usePullDownRefresh(usePullRefresh(undefined, { delay: 2000 }))

const onTabChange = (type: FilterStatus) => {
  activeTab.value = type
}

const activeTabName = computed(() => {
  const tab = tabs.find((t) => t.type === activeTab.value)
  return tab?.title || ''
})

const filteredOrders = computed(() => {
  const currentStatus = activeTab.value
  if (currentStatus === 'ALL') {
    return orders.value
  }
  return orders.value.filter((order) => order.status === currentStatus)
})

const calcDuration = (startTime: string, endTime: string): string => {
  const [sh, sm] = startTime.split(':').map(Number)
  const [eh, em] = endTime.split(':').map(Number)
  const start = sh * 60 + sm
  const end = eh * 60 + em
  const hours = (end - start) / 60
  return `共${hours}小时`
}

const onOrderClick = (order: Order) => {
  Taro.navigateTo({
    url: buildRoute(ROUTES.order, { id: order.id })
  })
}
</script>
