<template>
  <view class="detail">
    <scroll-view class="scroll-content" scroll-y>
      <!-- 顶部图片 -->
      <view class="header-image-wrapper">
        <image class="header-image" :src="space.image" mode="aspectFill" />
        <text class="header-district">{{ space.district }}</text>
      </view>

      <!-- 基本信息 -->
      <view class="card">
        <view class="card-header">
          <text class="card-title">{{ space.name }}</text>
          <text v-if="space.isFeatured" class="card-featured">精选</text>
        </view>
        <view class="card-tags">
          <text v-for="(tag, ti) in space.tags" :key="tag">
            {{ tag }}<text v-if="ti < space.tags.length - 1" class="tag-divider"> · </text>
          </text>
        </view>
        <view class="card-meta">
          <text class="meta-rating">★ {{ space.rating }}</text>
          <text class="meta-reviews">{{ space.reviewCount }}条评价</text>
        </view>
      </view>

      <!-- 营业时间 -->
      <view class="card">
        <view class="info-row">
          <text class="info-label">🕐 营业时间</text>
          <text class="info-value">{{ space.businessHours }}</text>
        </view>
      </view>

      <!-- 地址 -->
      <view class="card" @tap="onLocationClick">
        <view class="info-row arrow-row">
          <view class="info-left">
            <text class="info-label">📍 地址</text>
            <text class="info-value address">{{ space.address }}</text>
          </view>
          <text class="arrow">›</text>
        </view>
      </view>

      <!-- 联系商家 -->
      <view class="card" @tap="onContact">
        <view class="info-row arrow-row">
          <view class="info-left">
            <text class="info-label">📞 联系商家</text>
            <text class="info-value">{{ space.phone }}</text>
          </view>
          <text class="arrow">›</text>
        </view>
      </view>

      <!-- 选择房间 -->
      <view class="card">
        <view class="section-header">
          <text class="section-title">选择房间</text>
        </view>
        <view class="room-list">
          <view
            v-for="room in roomList"
            :key="room.id"
            class="room-item"
            :class="{ active: selectedRoom?.id === room.id }"
            @tap="selectRoom(room)"
          >
            <view class="room-left">
              <text class="room-name">{{ room.name }}</text>
              <text class="room-capacity">可容纳 {{ room.capacity }} 人</text>
            </view>
            <view class="room-right">
              <text class="room-price">¥{{ room.price }}/时</text>
              <view v-if="selectedRoom?.id === room.id" class="room-checked">
                <text class="room-checked-icon">✓</text>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 设施服务 -->
      <view class="card">
        <view class="section-header">
          <text class="section-title">设施服务</text>
        </view>
        <view class="facilities-grid">
          <view
            v-for="facility in space.facilities"
            :key="facility"
            class="facility-item"
          >
            <text class="facility-icon">{{ getFacilityIcon(facility) }}</text>
            <text class="facility-name">{{ facility }}</text>
          </view>
        </view>
      </view>

      <!-- 用户评价 -->
      <view class="card">
        <view class="section-header">
          <text class="section-title">用户评价</text>
          <text class="view-all" @tap="onViewAllReviews">查看全部 ›</text>
        </view>
        <view class="reviews-list">
          <view v-for="review in reviews" :key="review.id" class="review-item">
            <view class="review-header">
              <image
                class="review-avatar"
                :src="review.avatar"
                mode="aspectFill"
              />
              <view class="review-user">
                <text class="review-name">{{ review.username }}</text>
                <text class="review-time">{{ review.time }}</text>
              </view>
            </view>
            <text class="review-content">{{ review.content }}</text>
            <view v-if="review.images?.length" class="review-images">
              <image
                v-for="img in review.images"
                :key="img"
                class="review-image"
                :src="img"
                mode="aspectFill"
              />
            </view>
          </view>
        </view>
      </view>

      <view style="height: 140rpx"></view>
    </scroll-view>

    <!-- 底部操作栏 -->
    <view class="bottom-bar">
      <view class="bar-actions">
        <view class="bar-action" @tap="onFavorite">
          <text class="bar-action-icon">{{ favorited ? '❤️' : '🤍' }}</text>
          <text class="bar-action-text">收藏</text>
        </view>
        <view class="bar-action" @tap="onContact">
          <text class="bar-action-icon">📞</text>
          <text class="bar-action-text">联系</text>
        </view>
      </view>
      <view class="book-btn" @tap="onBook">
        <text class="book-text">立即预定</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Taro, { useRouter } from "@tarojs/taro";
import {
  spaceDetail,
  roomList as mockRoomList,
  spaceReviews,
  type SpaceDetail,
  type Room,
  type Review,
} from "@/datasets";
import "./index.css";

const router = useRouter();
const spaceId = ref<number>(0);
const favorited = ref(false);

const space = ref<SpaceDetail>({ ...spaceDetail });

const roomList = ref<Room[]>([...mockRoomList]);

const selectedRoom = ref<Room | null>(null);

const reviews = ref<Review[]>([...spaceReviews]);

const getFacilityIcon = (facility: string) => {
  const iconMap: Record<string, string> = {
    WiFi: "📶",
    停车场: "🅿️",
    充电宝: "🔋",
    茶水: "🍵",
    点心: "🍪",
  };
  return iconMap[facility] || "✓";
};

const onLocationClick = () => {
  Taro.openLocation({
    latitude: 31.2244,
    longitude: 121.4586,
    name: space.value.name,
    address: space.value.address,
  });
};

const selectRoom = (room: Room) => {
  selectedRoom.value = room;
};

const onFavorite = () => {
  favorited.value = !favorited.value;
  Taro.showToast({
    title: favorited.value ? "已收藏" : "取消收藏",
    icon: "none",
  });
};

const onContact = () => {
  Taro.makePhoneCall({
    phoneNumber: space.value.phone,
  });
};

const onBook = () => {
  if (!selectedRoom.value) {
    Taro.showToast({
      title: "请先选择房间",
      icon: "none",
    });
    return;
  }
  Taro.navigateTo({
    url: `/pages/checkout/index?roomId=${selectedRoom.value.id}&spaceId=${space.value.id}&roomName=${selectedRoom.value.name}&spaceName=${space.value.name}&roomPrice=${selectedRoom.value.price}`,
  });
};

const onViewAllReviews = () => {
  Taro.showToast({ title: "查看全部评价", icon: "none" });
};

onMounted(() => {
  const params = router.params;
  if (params.id) {
    spaceId.value = Number(params.id);
  }
});
</script>
