<template>
  <view class="review">
    <scroll-view class="scroll-content" scroll-y>
      <!-- 空间信息 -->
      <view class="section space-section">
        <SpaceInfoCard
          :image="reviewInfo.spaceImage"
          :space-name="reviewInfo.spaceName"
          :room-name="reviewInfo.roomName"
        />
      </view>

      <!-- 评分 -->
      <view class="section">
        <view class="section-title">整体评分</view>
        <view class="rating-section">
          <StarRating v-model="reviewInfo.rating" />
          <text class="rating-text">{{ ratingText }}</text>
        </view>
      </view>

      <!-- 评价标签 -->
      <view class="section">
        <view class="section-title">选择标签</view>
        <view class="tags-grid">
          <Chip
            v-for="tag in tags"
            :key="tag.id"
            :active="tag.selected"
            pill
            @tap="onTagClick(tag)"
          >
            {{ tag.name }}
          </Chip>
        </view>
      </view>

      <!-- 评价内容 -->
      <view class="section">
        <view class="section-title">评价内容</view>
        <textarea
          class="review-input"
          v-model="reviewInfo.content"
          placeholder="分享您的体验感受..."
          maxlength="500"
          :auto-height="true"
        />
        <text class="char-count">{{ reviewInfo.content.length }}/500</text>
      </view>

      <!-- 上传图片 -->
      <view class="section">
        <view class="section-title">上传图片（可选）</view>
        <ImageUpload v-model="reviewInfo.images" />
      </view>

      <!-- 匿名评价 -->
      <view class="section">
        <view class="anonymous-row">
          <text class="label">匿名评价</text>
          <switch
            :checked="reviewInfo.isAnonymous"
            @change="onAnonymousChange"
            color="#57534E"
          />
        </view>
      </view>
    </scroll-view>

    <!-- 底部提交按钮 -->
    <BottomBar justify="center" shadow>
      <SubmitButton text="提交评价" variant="pill" @tap="onSubmit" />
    </BottomBar>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import Taro from "@tarojs/taro";
import { useMockSubmit } from "@/composables/useMockSubmit";
import { useQueryParams } from "@/composables/useQueryParams";
import SpaceInfoCard from "@/components/SpaceInfoCard/index.vue";
import SubmitButton from "@/components/SubmitButton/index.vue";
import StarRating from "@/components/StarRating/index.vue";
import BottomBar from "@/components/BottomBar/index.vue";
import Chip from "@/components/Chip/index.vue";
import ImageUpload from "@/components/ImageUpload/index.vue";
import "./index.css";

interface Tag {
  id: number;
  name: string;
  selected: boolean;
}

interface ReviewInfo {
  orderId: number;
  spaceId: number;
  roomId: number;
  spaceName: string;
  spaceImage: string;
  roomName: string;
  rating: number;
  content: string;
  tags: number[];
  images: string[];
  isAnonymous: boolean;
}

const { submitting, submit } = useMockSubmit({
  loadingText: "提交中...",
  successText: "评价成功",
  delay: 1000,
});

const query = useQueryParams<{
  orderId: number;
  spaceId: number;
  roomId: number;
  spaceName: string;
  roomName: string;
}>({
  orderId: (v) => (v ? Number(v) : 0),
  spaceId: (v) => (v ? Number(v) : 0),
  roomId: (v) => (v ? Number(v) : 0),
  spaceName: (v) => v ?? "",
  roomName: (v) => v ?? "",
});

const tags = ref<Tag[]>([
  { id: 1, name: "环境优雅", selected: false },
  { id: 2, name: "服务周到", selected: false },
  { id: 3, name: "安静舒适", selected: false },
  { id: 4, name: "干净整洁", selected: false },
  { id: 5, name: "性价比高", selected: false },
  { id: 6, name: "设施齐全", selected: false },
  { id: 7, name: "交通便利", selected: false },
  { id: 8, name: "值得推荐", selected: false },
]);

const reviewInfo = ref<ReviewInfo>({
  orderId: 0,
  spaceId: 0,
  roomId: 0,
  spaceName: "",
  spaceImage: "",
  roomName: "",
  rating: 0,
  content: "",
  tags: [],
  images: [],
  isAnonymous: false,
});

const ratingText = computed(() => {
  const texts = ["", "非常不满意", "不满意", "一般", "满意", "非常满意"];
  return texts[reviewInfo.value.rating] || "";
});

const onTagClick = (tag: Tag) => {
  tag.selected = !tag.selected;
  if (tag.selected) {
    reviewInfo.value.tags.push(tag.id);
  } else {
    reviewInfo.value.tags = reviewInfo.value.tags.filter((id) => id !== tag.id);
  }
};

const onAnonymousChange = (e: { detail: { value: boolean } }) => {
  reviewInfo.value.isAnonymous = e.detail.value;
};

const onSubmit = () => {
  if (reviewInfo.value.rating === 0) {
    Taro.showToast({
      title: "请先评分",
      icon: "none",
    });
    return;
  }
  if (!reviewInfo.value.content.trim()) {
    Taro.showToast({
      title: "请填写评价内容",
      icon: "none",
    });
    return;
  }

  submit(() => {
    setTimeout(() => {
      Taro.navigateBack();
    }, 1500);
  });
};

onMounted(() => {
  reviewInfo.value.orderId = query.orderId;
  reviewInfo.value.spaceId = query.spaceId;
  reviewInfo.value.roomId = query.roomId;
  reviewInfo.value.spaceName = query.spaceName;
  reviewInfo.value.roomName = query.roomName;
});
</script>
