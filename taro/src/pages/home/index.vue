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
    <scroll-view class="tag-scroll" scroll-x show-scrollbar="false">
      <view class="tag-list">
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
    </scroll-view>

    <!-- 空间列表 -->
    <view class="space-list">
      <view
        v-for="(item, index) in filteredList"
        :key="item.id"
        class="space-card"
        :style="{ animationDelay: index * 0.06 + 's' }"
        @tap="onCardClick(item)"
      >
        <view class="card-image-wrapper">
          <view v-if="!imagesLoaded[item.id]" class="image-skeleton"></view>
          <image
            class="card-image"
            :src="item.image"
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
            <text v-for="(tag, ti) in item.tags" :key="tag">
              {{ tag }}<text v-if="ti < item.tags.length - 1" class="tag-divider"> · </text>
            </text>
          </view>

          <view class="card-meta">
            <text class="meta-rating">★ {{ item.rating }}</text>
            <text class="meta-reviews">{{ item.reviewCount }}条评价</text>
            <text class="meta-divider">|</text>
            <text class="meta-distance">{{ item.distance }}</text>
          </view>

          <view class="card-address">{{ item.address }}</view>

          <view class="card-footer">
            <text class="card-hours">{{ item.businessHours }}</text>
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
import { ref, computed, onMounted } from "vue";
import Taro, { usePullDownRefresh } from "@tarojs/taro";
import { spaceList as mockSpaceList, type Space } from "@/datasets";
import "./index.css";

interface Category {
  key: string;
  label: string;
}

interface SortOption {
  key: string;
  label: string;
}

const categoryList: Category[] = [
  { key: "all", label: "全部" },
  { key: "elegant", label: "雅致" },
  { key: "business", label: "商务" },
  { key: "metro", label: "近地铁" },
  { key: "artistic", label: "文艺" },
  { key: "heritage", label: "老洋房" },
];

const sortOptions: SortOption[] = [
  { key: "distance", label: "距离最近" },
  { key: "price", label: "价格最低" },
  { key: "rating", label: "评分最高" },
];

const searchKeyword = ref("");
const activeCategory = ref("all");
const activeSort = ref("distance");
const imagesLoaded = ref<Record<number, boolean>>({});
const spaceList = ref<Space[]>([...mockSpaceList]);

const filteredList = computed(() => {
  let list = spaceList.value;

  if (activeCategory.value !== "all") {
    list = list.filter((item) => item.category === activeCategory.value);
  }

  if (searchKeyword.value.trim()) {
    const kw = searchKeyword.value.trim().toLowerCase();
    list = list.filter((item) =>
      item.name.toLowerCase().includes(kw) || item.address.toLowerCase().includes(kw)
    );
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

const onCardClick = (item: Space) => {
  Taro.navigateTo({
    url: `/pages/space/index?id=${item.id}`,
  });
};

const onFeaturedClick = () => {
  Taro.showToast({ title: "夏日龙井活动", icon: "none" });
};

const onSearch = () => {
  // handled by computed
};

const clearSearch = () => {
  searchKeyword.value = "";
};

const onImageLoad = (id: number) => {
  imagesLoaded.value[id] = true;
};

const onImageError = (id: number) => {
  imagesLoaded.value[id] = true;
};

onMounted(() => {
  // 页面初始化
});

usePullDownRefresh(() => {
  setTimeout(() => {
    Taro.stopPullDownRefresh();
  }, 1500);
});
</script>
