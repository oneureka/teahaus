<template>
  <view class="detail" v-if="space">
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
          <view class="info-label">
            <image class="info-icon" src="@/assets/icons/icon-clock@2x.png" mode="aspectFill" />
            <text>营业时间</text>
          </view>
          <text class="info-value">{{ space.businessHours }}</text>
        </view>
      </view>

      <!-- 地址 -->
      <view class="card" @tap="onLocationClick">
        <view class="info-row arrow-row">
          <view class="info-left">
            <view class="info-label">
              <image class="info-icon" src="@/assets/icons/icon-location@2x.png" mode="aspectFill" />
              <text>地址</text>
            </view>
            <text class="info-value address">{{ space.address }}</text>
          </view>
            <image class="arrow-img" src="@/assets/icons/icon-arrow@2x.png" mode="aspectFill" />
        </view>
      </view>

      <!-- 联系商家 -->
      <view class="card" @tap="onContact">
        <view class="info-row arrow-row">
          <view class="info-left">
            <view class="info-label">
              <text>📞 联系商家</text>
            </view>
            <text class="info-value">{{ space.phone }}</text>
          </view>
            <image class="arrow-img" src="@/assets/icons/icon-arrow@2x.png" mode="aspectFill" />
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
              <text class="room-desc">{{ room.description }}</text>
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
    <BottomBar justify="between">
      <view class="bar-actions">
        <view class="bar-action" @tap="onFavorite">
          <image class="bar-action-icon-img" :src="favorited ? iconFavorited : iconFavorite" mode="aspectFill" />
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
    </BottomBar>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Taro, { useRouter, usePullDownRefresh } from "@tarojs/taro";
import { getSpaceDetail, type SpaceDetail } from "@/datasets/spaces";
import { roomList as allRooms, type Room } from "@/datasets/rooms";
import { spaceReviews, type Review } from "@/datasets/reviews";
import { ROUTES, buildRoute } from "@/constants/routes";
import { usePullRefresh } from "@/composables/useMockSubmit";
import BottomBar from "@/components/BottomBar/index.vue";
import iconFavorite from "@/assets/icons/icon-favorite@2x.png";
import iconFavorited from "@/assets/icons/icon-favorited@2x.png";
import "./index.css";

const router = useRouter();
const favorited = ref(false);

const space = ref<SpaceDetail | null>(null);

const roomList = ref<Room[]>([]);

const selectedRoom = ref<Room | null>(null);

const reviews = ref<Review[]>([...spaceReviews]);

usePullDownRefresh(usePullRefresh());

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
  if (!space.value) return;
  Taro.openLocation({
    latitude: space.value.lat,
    longitude: space.value.lng,
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
  if (!space.value) return;
  Taro.makePhoneCall({
    phoneNumber: space.value.phone,
  });
};

const onBook = () => {
  if (!space.value || !selectedRoom.value) {
    Taro.showToast({
      title: "请先选择房间",
      icon: "none",
    });
    return;
  }
  Taro.navigateTo({
    url: buildRoute(ROUTES.checkout, {
      roomId: selectedRoom.value.id,
      spaceId: space.value.id,
      roomName: selectedRoom.value.name,
      spaceName: space.value.name,
      roomPrice: selectedRoom.value.price,
    }),
  });
};

const onViewAllReviews = () => {
  Taro.showToast({ title: "查看全部评价", icon: "none" });
};

onMounted(() => {
  const detail = getSpaceDetail(router.params.id || "");
  if (!detail) {
    Taro.showToast({ title: "门店不存在", icon: "none" });
    return;
  }
  space.value = detail;
  roomList.value = allRooms.filter((room) => room.spaceId === detail.id);
});
</script>
