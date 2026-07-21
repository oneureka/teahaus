<template>
  <view v-if="loading" class="skeleton">
    <view class="skeleton-header"></view>
    <view class="skeleton-card"></view>
    <view class="skeleton-card"></view>
    <view class="skeleton-card"></view>
    <view class="skeleton-card"></view>
    <view class="skeleton-card"></view>
  </view>
  <view class="detail" v-else-if="space">
      <!-- 顶部图片 -->
      <view class="header-image-wrapper">
        <swiper class="header-swiper" :current="currentImageIndex" :indicator-dots="true" indicator-color="rgba(255,255,255,0.4)" indicator-active-color="#ffffff" autoplay circular @change="onSwiperChange">
          <swiper-item v-for="(img, i) in spaceImages" :key="i">
              <view class="swiper-slide" @tap="previewImage">
              <view v-if="!imagesLoaded[i]" class="image-skeleton"></view>
              <image
                class="header-image"
                :src="img"
                mode="aspectFill"
                @load="onImageLoad(i)"
                @error="onImageLoad(i)"
              />
            </view>
          </swiper-item>
        </swiper>
        <text class="header-district">{{ space.district }}</text>
      </view>

      <!-- 基本信息 -->
      <view class="card">
        <view class="card-header">
          <text class="card-title">{{ space.name }}</text>
          <text v-if="space.isFeatured" class="card-featured">精选</text>
          <view class="card-meta">
            <text class="meta-rating">★ {{ space.rating }}</text>
            <text class="meta-reviews">{{ space.reviewCount }}条评价</text>
          </view>
        </view>
        <view class="card-tags">
          <text v-for="(tag, ti) in space.tags" :key="tag">
            {{ tag }}<text v-if="ti < space.tags.length - 1" class="tag-divider"> · </text>
          </text>
        </view>
        <view class="hours-row">
          <image class="info-icon" src="@/assets/icons/icon-clock@2x.png" mode="aspectFill" />
          <text class="info-value">营业时间 {{ space.businessHours }}</text>
        </view>
      </view>

      <!-- 设施服务 -->
      <view class="card">
        <view class="section-title">空间设施</view>
        <view class="facilities-grid">
          <view
            v-for="facility in space.facilities"
            :key="facility"
            class="facility-item"
          >
            <image v-if="getFacilityIcon(facility)" class="facility-icon" :src="getFacilityIcon(facility)" mode="aspectFill" />
            <text class="facility-name">{{ facility }}</text>
          </view>
        </view>
      </view>

      <!-- 选择房间 -->
      <view class="card">
        <view class="section-title">选择房间</view>
        <view v-if="roomList.length > 0" class="room-list">
          <view
            v-for="room in roomList"
            :key="room.id"
            class="room-item"
            :class="{ active: selectedRoom?.id === room.id, disabled: !getRoomAvailable(room) }"
            @tap="selectRoom(room)"
          >
            <view class="room-left">
              <text class="room-name">{{ room.name }}</text>
              <text class="room-desc">{{ room.description }}</text>
              <text v-if="!getRoomAvailable(room)" class="room-item-tag">已约满</text>
            </view>
            <view class="room-right">
              <text class="room-price">¥{{ room.price }}/时</text>
              <view v-if="selectedRoom?.id === room.id" class="room-checked">
                <text class="room-checked-icon">✓</text>
              </view>
            </view>
          </view>
        </view>
        <view v-else class="room-empty">
          <text class="room-empty-text">暂无可用房间</text>
        </view>
      </view>

      <!-- 门店地址 -->
      <view class="card card-arrow-wrap" @tap="onLocationClick">
        <view class="section-title">所在位置</view>
        <view class="info-row">
          <view class="info-left">
            <view class="info-value-row">
              <image class="info-icon" src="@/assets/icons/icon-location@2x.png" mode="aspectFill" />
              <text class="info-value address">{{ space.address }}</text>
            </view>
          </view>
        </view>
        <image class="card-arrow" src="@/assets/icons/icon-arrow@2x.png" mode="aspectFill" />
      </view>

      <!-- 联系我们 -->
      <view class="card card-last card-arrow-wrap" @tap="onContact">
        <view class="section-title">联系茶室</view>
        <view class="info-row">
          <view class="info-left">
            <view class="info-value-row">
              <image class="info-icon" :src="iconPhone" mode="aspectFill" />
              <text class="info-value">{{ space.phone }}</text>
            </view>
          </view>
        </view>
        <image class="card-arrow" src="@/assets/icons/icon-arrow@2x.png" mode="aspectFill" />
      </view>
    </view>
    <BottomBar v-if="space" justify="between" shadow>
      <view class="bar-actions">
        <view class="bar-action">
          <button open-type="share" class="share-btn">
            <image class="bar-action-icon-img" :src="iconShare" mode="aspectFill" />
            <text class="bar-action-text">分享</text>
          </button>
        </view>
        <view class="bar-action" @tap="onFavorite">
          <image class="bar-action-icon-img" :src="favorited ? iconFavorited : iconFavorite" mode="aspectFill" />
          <text class="bar-action-text">收藏</text>
        </view>
      </view>
      <view class="book-btn" :class="{ disabled: !selectedRoom }" @tap="onBook">
        <text class="book-text">立即预订</text>
      </view>
    </BottomBar>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import Taro, { useRouter, usePullDownRefresh, useShareAppMessage } from "@tarojs/taro";
import { getSpaceDetail, type SpaceDetail } from "@/datasets/spaces";
import { roomList as allRooms, type Room } from "@/datasets/rooms";
import { ROUTES, buildRoute } from "@/constants/routes";
import { usePullRefresh } from "@/composables/useMockSubmit";
import { getImageUrl } from "@/utils/image";
import { PLACEHOLDER_IMAGE } from "@/constants/app";
import BottomBar from "@/components/BottomBar/index.vue";
import iconFavorite from "@/assets/icons/icon-favorite@2x.png";
import iconFavorited from "@/assets/icons/icon-favorited@2x.png";
import iconShare from "@/assets/icons/icon-share@2x.png";
import iconWifi from "@/assets/icons/icon-wifi@2x.png";
import iconTea from "@/assets/icons/icon-tea@2x.png";
import iconParking from "@/assets/icons/icon-parking@2x.png";
import iconPhone from "@/assets/icons/icon-phone@2x.png";
import "./index.css";

const router = useRouter();
const favorited = ref(false);

const space = ref<SpaceDetail | null>(null);

const roomList = ref<Room[]>([]);

const selectedRoom = ref<Room | null>(null);

const loading = ref(true);
const currentImageIndex = ref(0);
const imagesLoaded = ref<boolean[]>([]);

const onImageLoad = (index: number) => {
  imagesLoaded.value[index] = true;
};

const spaceImages = computed(() => {
  const images = [space.value?.image || PLACEHOLDER_IMAGE, PLACEHOLDER_IMAGE]
  return images.map((img) => getImageUrl(img, { width: 1600 }))
})

const UNAVAIL_ROOM_IDS = new Set(["cmrnjdy9x00015me9lbsj4txr", "cmrnje5d800065me9pzckx2jx"]);

const getRoomAvailable = (room: Room) => !UNAVAIL_ROOM_IDS.has(room.id);

const onSwiperChange = (e: { detail: { current: number } }) => {
  currentImageIndex.value = e.detail.current;
};

usePullDownRefresh(usePullRefresh());

useShareAppMessage(() => ({
  title: space.value?.name || "茶室详情",
  path: `/pages/space/index?id=${router.params.id}`,
  imageUrl: space.value?.image,
}));

const getFacilityIcon = (facility: string) => {
  const imageMap: Record<string, string> = {
    "WiFi": iconWifi,
    茶水: iconTea,
    停车位: iconParking,
  };
  return imageMap[facility] || "";
};

const previewImage = () => {
  Taro.previewImage({
    current: spaceImages.value[currentImageIndex.value],
    urls: spaceImages.value,
  });
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
  if (!getRoomAvailable(room)) return;
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
    }),
  });
};

onMounted(() => {
  const detail = getSpaceDetail(router.params.id || "");
  if (!detail) {
    Taro.showToast({ title: "门店不存在", icon: "none" });
    loading.value = false;
    return;
  }
  space.value = detail;
  roomList.value = allRooms
    .filter((room) => room.spaceId === detail.id)
    .sort((a, b) => a.sortOrder - b.sortOrder);
  imagesLoaded.value = new Array(spaceImages.value.length).fill(false);
  Taro.setNavigationBarTitle({ title: detail.name });
  loading.value = false;
});
</script>
