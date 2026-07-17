<template>
  <view class="order-detail">
    <scroll-view class="scroll-content" scroll-y>
      <!-- 订单状态 -->
      <view class="order-status">
        <text class="status-text">{{ order.statusText }}</text>
        <text class="status-time">{{ order.createTime }}</text>
      </view>

      <!-- 空间信息 -->
      <view class="section">
        <view class="space-info" @tap="onSpaceClick">
          <image
            class="space-image"
            :src="order.spaceImage"
            mode="aspectFill"
          />
          <view class="space-detail">
            <text class="space-name">{{ order.spaceName }}</text>
            <text class="room-name">{{ order.roomName }}</text>
          </view>
          <text class="arrow">›</text>
        </view>
      </view>

      <!-- 预定信息 -->
      <view class="section">
        <view class="info-row">
          <text class="label">预定时间</text>
          <text class="value">{{ order.reserveTime }}</text>
        </view>
        <view class="info-row">
          <text class="label">使用人数</text>
          <text class="value">{{ order.partySize }} 人</text>
        </view>
        <view class="info-row">
          <text class="label">订单编号</text>
          <text class="value">{{ order.orderNo }}</text>
        </view>
      </view>

      <!-- 费用明细 -->
      <view class="section">
        <view class="price-row">
          <text class="label">房间费用</text>
          <text class="value">¥{{ order.roomPrice }}</text>
        </view>
        <view class="price-row">
          <text class="label">服务费</text>
          <text class="value">¥{{ order.serviceFee }}</text>
        </view>
        <view class="price-row total">
          <text class="label">实付款</text>
          <text class="value total-price">¥{{ order.totalPrice }}</text>
        </view>
      </view>

      <!-- 联系信息 -->
      <view class="section">
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
    <view class="bottom-bar" v-if="order.status === OrderStatus.UNPAID">
      <view class="cancel-btn" @tap="onCancel">取消订单</view>
      <view class="pay-btn" @tap="onPay">立即支付</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Taro, { useRouter } from "@tarojs/taro";
import "./index.css";

enum OrderStatus {
  UNPAID = 0,
  PAID = 1,
  IN_PROGRESS = 2,
  COMPLETED = 3,
  CANCELLED = 4,
}

interface Order {
  id: number;
  orderNo: string;
  status: OrderStatus;
  statusText: string;
  createTime: string;
  spaceId: number;
  spaceName: string;
  spaceImage: string;
  roomId: number;
  roomName: string;
  reserveTime: string;
  partySize: number;
  roomPrice: string;
  serviceFee: string;
  totalPrice: string;
  contactName: string;
  contactPhone: string;
}

const router = useRouter();
const orderId = ref<number>(0);

const order = ref<Order>({
  id: 0,
  orderNo: "",
  status: OrderStatus.UNPAID,
  statusText: "待支付",
  createTime: "",
  spaceId: 0,
  spaceName: "",
  spaceImage: "",
  roomId: 0,
  roomName: "",
  reserveTime: "",
  partySize: 0,
  roomPrice: "",
  serviceFee: "",
  totalPrice: "",
  contactName: "",
  contactPhone: "",
});

const onSpaceClick = () => {
  Taro.navigateTo({
    url: `/pages/space/index?id=${order.value.spaceId}`,
  });
};

const onContactClick = () => {
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
    orderId.value = Number(params.id);
    console.log("Order ID:", orderId.value);
  }
});
</script>
