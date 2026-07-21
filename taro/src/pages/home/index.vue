<template>
  <view class="home">
    <!-- 精选推荐 -->
    <view class="featured-card" @tap="onFeaturedClick">
      <view class="featured-bg">
        <view class="featured-content">
          <text class="featured-label">Seasonal Selection</text>
          <text class="featured-title">夏日龙井 · 当季新茶上市</text>
          <text class="featured-desc">精选明前龙井，配以雅致茶席。预订即赠茶点一份。</text>
          <view class="featured-link">
            <text>立即查看</text>
            <text class="featured-arrow">→</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 排序栏 -->
    <view class="sort-bar">
      <view
        v-for="s in sortOptions"
        :key="s.key"
        class="sort-item"
        :class="{ active: activeSort === s.key }"
        @tap="onSortChange(s.key)"
      >
        <text>{{ s.label }}</text>
      </view>
    </view>

    <!-- 分类标签 -->
    <view class="tag-scroll">
      <view
        v-for="cat in categoryList"
        :key="cat.key"
        class="tag-item"
        :class="{ active: activeCategory === cat.key }"
        @tap="onCategoryChange(cat.key)"
      >
        <text>{{ cat.label }}</text>
      </view>
    </view>

    <!-- 空间列表 -->
    <view class="space-list">
      <view
        v-for="(item, index) in filteredList"
        :key="item.id"
        class="space-card"
        :class="{ 'space-card-last': index === filteredList.length - 1 }"
        :style="{ animationDelay: index * 0.06 + 's' }"
        @tap="onCardClick(item)"
      >
        <view class="card-image-wrapper">
          <view v-if="!imagesLoaded[item.id]" class="image-skeleton"></view>
          <image
            class="card-image"
            :src="getImageUrl(item.images[0] || PLACEHOLDER_IMAGE, { width: 1600 })"
            mode="aspectFill"
            lazy-load
            @load="onImageLoad(item.id)"
            @error="onImageError(item.id)"
          />
          <text class="card-district">{{ item.district }}</text>
        </view>

        <view class="card-body">
          <view class="card-title-row">
            <text class="card-title">{{ item.name }}</text>
            <text v-if="item.isFeatured" class="card-featured">精选</text>
          </view>

          <view class="card-tags">
            <text>{{ item.category }}</text>
          </view>

          <view class="card-meta">
            <text class="meta-rating">★ {{ item.rating }}</text>
            <text class="meta-reviews">{{ item.reviewCount }}条评价</text>
            <text class="meta-divider">|</text>
            <text class="meta-distance">{{ item.distance }}</text>
          </view>
          <view class="card-address">{{ item.address }}</view>
          <view class="card-footer">
            <view class="card-hours">
              <image class="hours-icon" src="@/assets/icons/icon-clock@2x.png" mode="aspectFill" />
              <text>营业时间 {{ item.businessHours }}</text>
            </view>
            <text class="card-price">¥{{ item.minPrice }}/时起</text>
          </view>
        </view>
      </view>

      <view v-if="filteredList.length === 0" class="empty">
        <text class="empty-text">未找到匹配的茶室</text>
        <text class="empty-hint">试试调整筛选条件</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import Taro, { usePullDownRefresh } from "@tarojs/taro";
import { spaceList as mockSpaceList, type Space } from "@/datasets/spaces";
import { ROUTES, buildRoute } from "@/constants/routes";
import { usePullRefresh } from "@/composables/useMockSubmit";
import { getImageUrl } from "@/utils/image";
import { PLACEHOLDER_IMAGE } from "@/constants/app";
import { useSystemStore } from "@/stores/system";
import { getDistance, formatDistance } from "@/utils/geo";
import "./index.css";

interface SpaceDisplay extends Space {
  rating: number;
  reviewCount: number;
  distance: string;
  distanceValue: number;
}

interface SortOption {
  key: string;
  label: string;
}

const categoryList = [
  { key: "all", label: "全部" },
  { key: "海景茶舍", label: "海景" },
  { key: "禅意茶苑", label: "禅意" },
  { key: "文艺茶舍", label: "文艺" },
  { key: "山景茶居", label: "山景" },
  { key: "工夫茶馆", label: "工夫茶" },
  { key: "古城茶馆", label: "古城" },
];

const sortOptions: SortOption[] = [
  { key: "distance", label: "距离最近" },
  { key: "price", label: "价格最低" },
  { key: "rating", label: "评分最高" },
];

const activeCategory = ref("all");
const activeSort = ref("distance");
const imagesLoaded = ref<Record<string, boolean>>({});
const systemStore = useSystemStore();

const spaceList = computed<SpaceDisplay[]>(() =>
  mockSpaceList.map((s, i) => {
    const distanceMeters = getDistance(
      {
        latitude: systemStore.userLatitude || 24.48,
        longitude: systemStore.userLongitude || 118.09,
      },
      { latitude: Number(s.lat), longitude: Number(s.lng) },
    );
    const distanceKm = distanceMeters / 1000;
    return {
      ...s,
      rating: +(4.5 + (i % 5) * 0.1).toFixed(1),
      reviewCount: 200 + i * 80,
      distance: formatDistance(distanceMeters),
      distanceValue: distanceKm,
    };
  }),
);

const filteredList = computed(() => {
  let list = spaceList.value;

  if (activeCategory.value !== "all") {
    list = list.filter((item) => item.category === activeCategory.value);
  }

  const sorted = [...list];
  if (activeSort.value === "distance") {
    sorted.sort((a, b) => a.distanceValue - b.distanceValue);
  } else if (activeSort.value === "price") {
    sorted.sort((a, b) => a.minPrice - b.minPrice);
  } else if (activeSort.value === "rating") {
    sorted.sort((a, b) => b.rating - a.rating);
  }

  return sorted;
});

const onCategoryChange = (key: string) => {
  activeCategory.value = key;
};

const onSortChange = (key: string) => {
  activeSort.value = key;
};

const onCardClick = (item: SpaceDisplay) => {
  Taro.navigateTo({
    url: buildRoute(ROUTES.space, { id: item.id }),
  });
};

const onFeaturedClick = () => {
  Taro.showToast({ title: "夏日龙井活动", icon: "none" });
};

const onImageLoad = (id: string) => {
  imagesLoaded.value[id] = true;
};

const onImageError = (id: string) => {
  imagesLoaded.value[id] = true;
};

usePullDownRefresh(usePullRefresh(() => {
  activeCategory.value = "all";
  activeSort.value = "distance";
}));
</script>
