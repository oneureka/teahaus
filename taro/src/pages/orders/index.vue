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
        :text="activeTab === 'ALL' ? '还没有订单呢' : `暂无${activeTabName}订单`"
      />
      <view
        v-else
        class="order-card"
        v-for="order in filteredOrders"
        :key="order.id"
        @tap="onOrderClick(order)"
      >
        <view class="card-header">
          <text class="card-title">{{ getRoomName(order.roomId) }}</text>
          <text class="card-status" :class="statusClass(order.status)">{{ statusLabel(order.status) }}</text>
        </view>
        <view class="card-subtitle">
          <text class="card-room">{{ getRoomName(order.roomId) }}</text>
          <text class="card-divider">·</text>
          <text class="card-duration">{{ calcDuration(order.startTime, order.endTime) }}</text>
          <text class="card-divider">·</text>
          <text class="card-reserve">{{ order.startTime }}-{{ order.endTime }}</text>
        </view>
        <view class="card-footer">
          <text class="card-price">¥{{ order.totalPrice }}</text>
          <text class="card-order-time">{{ formatRelativeTime(order.createdAt) }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import Taro, { usePullDownRefresh } from "@tarojs/taro";
import { ref, computed } from "vue";
import emptyOrdersImage from "@/assets/images/no-orders.png";
import { orderList, type Order, type OrderStatus } from "@/datasets/orders";
import { roomList } from "@/datasets/rooms";
import { ROUTES, buildRoute } from "@/constants/routes";
import { usePullRefresh } from "@/composables/useMockSubmit";
import EmptyState from "@/components/EmptyState/index.vue";
import "./index.css";

type FilterStatus = OrderStatus | "ALL";

interface TabItem {
  title: string;
  key: string;
  type: FilterStatus;
}

const tabs: TabItem[] = [
  { title: "全部", key: "all", type: "ALL" },
  { title: "未支付", key: "unpaid", type: "UNPAID" },
  { title: "进行中", key: "in-progress", type: "IN_PROGRESS" },
  { title: "已完成", key: "completed", type: "COMPLETED" },
];

const activeTab = ref<FilterStatus>("ALL");

const orders = ref<Order[]>([...orderList]);

const statusLabel = (status: OrderStatus): string => {
  const map: Record<OrderStatus, string> = {
    UNPAID: "未支付",
    PAID: "已支付",
    IN_PROGRESS: "进行中",
    COMPLETED: "已完成",
    CANCELLED: "已取消",
  };
  return map[status];
};

const statusClass = (status: OrderStatus): string => {
  return status === "CANCELLED" ? "card-status-cancelled" : "";
};

const getRoomName = (roomId: string): string => {
  const room = roomList.find((r) => r.id === roomId);
  return room?.name ?? "未知房间";
};

usePullDownRefresh(usePullRefresh(undefined, { delay: 2000 }));

const onTabChange = (type: FilterStatus) => {
  activeTab.value = type;
};

const activeTabName = computed(() => {
  const tab = tabs.find((t) => t.type === activeTab.value);
  return tab?.title || "";
});

const filteredOrders = computed(() => {
  const currentStatus = activeTab.value;
  if (currentStatus === "ALL") {
    return orders.value;
  }
  return orders.value.filter((order) => order.status === currentStatus);
});

const calcDuration = (startTime: string, endTime: string): string => {
  const [sh, sm] = startTime.split(":").map(Number);
  const [eh, em] = endTime.split(":").map(Number);
  const start = sh * 60 + sm;
  const end = eh * 60 + em;
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
  return dateStr.split("T")[0];
};

const onOrderClick = (order: Order) => {
  Taro.navigateTo({
    url: buildRoute(ROUTES.order, { id: order.id }),
  });
};
</script>
