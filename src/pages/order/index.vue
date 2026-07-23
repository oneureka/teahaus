<template>
  <view class="order-detail">
    <scroll-view
      v-if="order"
      class="scroll-content"
      :class="{ 'has-bottom-bar': order.status === 'UNPAID' }"
      scroll-y
    >
      <!-- 订单状态 -->
      <view class="order-status">
        <text class="status-text">{{ statusLabel(order.status) }}</text>
        <view class="status-time-row">
          <image
            class="clock-icon"
            src="@/assets/icons/icon-clock@2x.png"
            mode="aspectFill"
          />
          <text class="status-time">{{
            formatRelativeTime(order.createdAt)
          }}</text>
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

      <!-- 预订信息 -->
      <view class="section">
        <view class="section-title">预订信息</view>
        <view class="info-row">
          <text class="label">预订时间</text>
          <text class="value"
            >{{ order.startTime }}<text class="time-separator"> - </text
            >{{ order.endTime }}</text
          >
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
import { ref, onMounted } from 'vue'
import Taro, { useRouter } from '@tarojs/taro'
import { ROUTES, buildRoute } from '@/constants/routes'
import { orderList, type Order } from '@/datasets/orders'
import { spaceList } from '@/datasets/spaces'
import { getImageUrl } from '@/utils/image'
import { formatRelativeTime } from '@/utils/time'
import { statusLabel, getSpaceName, getRoomName } from '@/utils/order'
import { PLACEHOLDER_IMAGE } from '@/constants/app'
import SpaceInfoCard from '@/components/SpaceInfoCard/index.vue'
import BottomBar from '@/components/BottomBar/index.vue'
import './index.css'

const router = useRouter()

const order = ref<Order | null>(null)

const getSpaceImage = (spaceId: string): string => {
  const space = spaceList.find((s) => s.id === spaceId)
  return getImageUrl(space?.images?.[0] ?? PLACEHOLDER_IMAGE, { width: 460 })
}

const onSpaceClick = () => {
  if (!order.value) return
  Taro.navigateTo({
    url: buildRoute(ROUTES.space, { id: order.value.spaceId })
  })
}

const onContactClick = () => {
  if (!order.value) return
  Taro.makePhoneCall({
    phoneNumber: order.value.contactPhone
  })
}

const onCancel = () => {
  Taro.showModal({
    title: '取消订单',
    content: '确定要取消该订单吗？',
    success: (res) => {
      if (res.confirm) {
        Taro.showToast({
          title: '订单已取消',
          icon: 'success'
        })
      }
    }
  })
}

const onPay = () => {
  Taro.showToast({
    title: '发起支付',
    icon: 'none'
  })
}

onMounted(() => {
  const params = router.params
  if (params.id) {
    const found = orderList.find((o) => o.id === params.id)
    if (found) order.value = found
  }
})
</script>
