<template>
  <view class="order-detail">
    <scroll-view v-if="order" class="scroll-content" scroll-y>
      <!-- 订单状态 -->
      <view class="order-status">
        <text class="status-text">{{ statusLabel(order.status) }}</text>
        <view class="status-time-row">
          <image class="clock-icon" src="@/assets/icons/icon-clock@2x.png" mode="aspectFill" />
          <text class="status-time">{{ formatRelativeTime(order.createdAt) }}</text>
        </view>
      </view>

      <!-- 空间信息 -->
      <view class="section">
        <SpaceInfoCard
          :image="getSpaceImage(order.spaceId)"
          :space-name="getSpaceName(order.spaceId)"
          :room-name="getRoomName(order.roomId)"
          show-arrow
          clickable
          @tap="onSpaceClick"
        />
      </view>

      <!-- 预定信息 -->
      <view class="section">
        <view class="section-title">预订信息</view>
        <view class="info-row">
          <text class="label">预定时间</text>
          <text class="value">{{ order.startTime }} - {{ order.endTime }}</text>
        </view>
        <view class="info-row">
          <text class="label">使用人数</text>
          <text class="value">2 人</text>
        </view>
        <view class="info-row">
          <text class="label">订单编号</text>
          <text class="value">{{ order.orderNo }}</text>
        </view>
      </view>

      <!-- 费用明细 -->
      <view class="section">
        <view class="section-title">费用明细</view>
        <view class="price-row">
          <text class="label">房间费用</text>
          <text class="value">¥{{ order.roomPrice }}</text>
        </view>
        <view class="price-row">
          <text class="label">服务费</text>
          <text class="value">¥0</text>
        </view>
        <view class="price-row total">
          <text class="label">实付款</text>
          <text class="value total-price">¥{{ order.totalPrice }}</text>
        </view>
      </view>

      <!-- 联系信息 -->
      <view class="section">
        <view class="section-title">联系信息</view>
        <view class="info-row">
          <text class="label">联系人</text>
          <text class="value">{{ order.contactName }}</text>
        </view>
        <view class="info-row">
          <text class="label">联系电话</text>
          <text class="value" @tap="onContactClick">{{
            order.contactPhone
          }}</text>
        </view>
      </view>
    </scroll-view>

    <!-- 底部操作栏 -->
    <BottomBar v-if="order?.status === 'UNPAID'" justify="end" shadow>
      <view class="cancel-btn" @tap="onCancel">取消订单</view>
      <view class="pay-btn" @tap="onPay">立即支付</view>
    </BottomBar>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Taro, { useRouter } from "@tarojs/taro";
import { ROUTES, buildRoute } from "@/constants/routes";
import { orderList, type Order, type OrderStatus } from "@/datasets/orders";
import { spaceList } from "@/datasets/spaces";
import { roomList } from "@/datasets/rooms";
import SpaceInfoCard from "@/components/SpaceInfoCard/index.vue";
import BottomBar from "@/components/BottomBar/index.vue";
import "./index.css";

const router = useRouter();

const order = ref<Order | null>(null);

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

const getSpaceName = (spaceId: string): string => {
  const space = spaceList.find((s) => s.id === spaceId);
  return space?.name ?? "未知空间";
};

const getRoomName = (roomId: string): string => {
  const room = roomList.find((r) => r.id === roomId);
  return room?.name ?? "未知房间";
};

const getSpaceImage = (spaceId: string): string => {
  const space = spaceList.find((s) => s.id === spaceId);
  const DEFAULT = "https://images.unsplash.com/photo-1558618666-fcd25c850cd64?w=800&h=600&fit=crop";
  return space?.images?.[0] ?? DEFAULT;
};

const onSpaceClick = () => {
  if (!order.value) return;
  Taro.navigateTo({
    url: buildRoute(ROUTES.space, { id: order.value.spaceId }),
  });
};

const onContactClick = () => {
  if (!order.value) return;
  Taro.makePhoneCall({
    phoneNumber: order.value.contactPhone,
  });
};

const onCancel = () => {
  Taro.showModal({
    title: "取消订单",
    content: "确定要取消该订单吗？",
    success: (res) => {
      if (res.confirm) {
        Taro.showToast({
          title: "订单已取消",
          icon: "success",
        });
      }
    },
  });
};

const onPay = () => {
  Taro.showToast({
    title: "发起支付",
    icon: "none",
  });
};

onMounted(() => {
  const params = router.params;
  if (params.id) {
    const found = orderList.find((o) => o.id === params.id);
    if (found) order.value = found;
  }
});
</script>
