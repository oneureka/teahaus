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
      <view v-if="filteredOrders.length === 0" class="empty">
        <image
          class="empty-image"
          :src="emptyOrdersImage"
          mode="aspectFit"
        />
        <text v-if="activeTab === OrderStatus.ALL" class="empty-text">还没有订单呢</text>
        <text v-else class="empty-text">暂无{{ activeTabName }}订单</text>
      </view>
      <view
        v-else
        class="order-card"
        v-for="order in filteredOrders"
        :key="order.id"
        @tap="onOrderClick(order)"
      >
        <view class="card-header">
          <text class="card-title">{{ order.roomName }}</text>
          <text class="card-status">{{ order.statusText }}</text>
        </view>
        <view class="card-subtitle">
          <text class="card-room">{{ order.room }}</text>
          <text class="card-divider">·</text>
          <text class="card-duration">{{ calcDuration(order.reserveTime) }}</text>
          <text class="card-divider">·</text>
          <text class="card-reserve">{{ order.reserveTime }}</text>
        </view>
        <view class="card-footer">
          <text class="card-price">¥{{ formatPrice(order.price) }}</text>
          <text class="card-order-time">{{ formatRelativeTime(order.time) }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import Taro, { usePullDownRefresh } from "@tarojs/taro";
import { ref, computed } from "vue";
import emptyOrdersImage from "@/assets/images/no-orders.png";
import { orderList, OrderStatus, type Order } from "@/datasets";
import "./index.css";

interface TabItem {
  title: string;
  key: string;
  type: OrderStatus;
}

const tabs: TabItem[] = [
  { title: "全部", key: "all", type: OrderStatus.ALL },
  { title: "未支付", key: "unpaid", type: OrderStatus.UNPAID },
  { title: "进行中", key: "in-progress", type: OrderStatus.IN_PROGRESS },
  { title: "已完成", key: "completed", type: OrderStatus.COMPLETED },
];

const activeTab = ref<OrderStatus>(OrderStatus.ALL);

const orders = ref<Order[]>([...orderList]);

usePullDownRefresh(() => {
  setTimeout(() => {
    Taro.stopPullDownRefresh();
  }, 2000);
});

const onTabChange = (type: OrderStatus) => {
  activeTab.value = type;
};

const activeTabName = computed(() => {
  const tab = tabs.find((t) => t.type === activeTab.value);
  return tab?.title || "";
});

const filteredOrders = computed(() => {
  const currentStatus = activeTab.value;
  if (currentStatus === OrderStatus.ALL) {
    return orders.value;
  }
  return orders.value.filter((order) => order.status === currentStatus);
});

const calcDuration = (reserveTime: string): string => {
  const match = reserveTime.match(/(\d+):(\d+)-(\d+):(\d+)/);
  if (!match) return "";
  const start = parseInt(match[1]) * 60 + parseInt(match[2]);
  const end = parseInt(match[3]) * 60 + parseInt(match[4]);
  const hours = (end - start) / 60;
  return `共${hours}小时`;
};

const formatRelativeTime = (dateStr: string): string => {
  const now = new Date();
  const date = new Date(dateStr);
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return "今天";
  if (days === 1) return "昨天";
  if (days < 30) return `${days}天前`;
  return dateStr.split(" ")[0];
};

const formatPrice = (price: string): string => {
  return price.replace(/\.00$/, "");
};

const onOrderClick = (order: Order) => {
  Taro.navigateTo({
    url: `/pages/order/index?id=${order.id}`,
  });
};
</script>
