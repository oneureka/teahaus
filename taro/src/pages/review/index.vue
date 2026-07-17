<template>
  <view class="review">
    <scroll-view class="scroll-content" scroll-y>
      <!-- 空间信息 -->
      <view class="section space-section">
        <image
          class="space-image"
          :src="reviewInfo.spaceImage"
          mode="aspectFill"
        />
        <view class="space-info">
          <text class="space-name">{{ reviewInfo.spaceName }}</text>
          <text class="room-name">{{ reviewInfo.roomName }}</text>
        </view>
      </view>

      <!-- 评分 -->
      <view class="section">
        <view class="section-title">整体评分</view>
        <view class="rating-section">
          <view class="stars">
            <text
              v-for="star in 5"
              :key="star"
              class="star-icon"
              :class="{ active: star <= reviewInfo.rating }"
              @tap="onRatingClick(star)"
            >
              ★
            </text>
          </view>
          <text class="rating-text">{{ ratingText }}</text>
        </view>
      </view>

      <!-- 评价标签 -->
      <view class="section">
        <view class="section-title">选择标签</view>
        <view class="tags-grid">
          <view
            v-for="tag in tags"
            :key="tag.id"
            class="tag-item"
            :class="{ active: tag.selected }"
            @tap="onTagClick(tag)"
          >
            {{ tag.name }}
          </view>
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
        <view class="image-upload">
          <view
            v-for="(img, index) in reviewInfo.images"
            :key="index"
            class="image-item"
          >
            <image class="upload-image" :src="img" mode="aspectFill" />
            <view class="delete-btn" @tap="onDeleteImage(index)">
              <text>✕</text>
            </view>
          </view>
          <view
            v-if="reviewInfo.images.length < 9"
            class="upload-btn"
            @tap="onUploadImage"
          >
            <text class="upload-icon">+</text>
          </view>
        </view>
      </view>

      <!-- 匿名评价 -->
      <view class="section">
        <view class="anonymous-row">
          <text class="label">匿名评价</text>
          <switch
            :checked="reviewInfo.isAnonymous"
            @change="onAnonymousChange"
            color="#7D5E4A"
          />
        </view>
      </view>
    </scroll-view>

    <!-- 底部提交按钮 -->
    <view class="bottom-bar">
      <view class="submit-btn" @tap="onSubmit">提交评价</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import Taro, { useRouter } from "@tarojs/taro";
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

const router = useRouter();

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

const onRatingClick = (star: number) => {
  reviewInfo.value.rating = star;
};

const onTagClick = (tag: Tag) => {
  tag.selected = !tag.selected;
  if (tag.selected) {
    reviewInfo.value.tags.push(tag.id);
  } else {
    reviewInfo.value.tags = reviewInfo.value.tags.filter((id) => id !== tag.id);
  }
};

const onUploadImage = () => {
  Taro.chooseImage({
    count: 9 - reviewInfo.value.images.length,
    sizeType: ["compressed"],
    sourceType: ["album", "camera"],
    success: (res) => {
      reviewInfo.value.images = [
        ...reviewInfo.value.images,
        ...res.tempFilePaths,
      ];
    },
  });
};

const onDeleteImage = (index: number) => {
  reviewInfo.value.images.splice(index, 1);
};

const onAnonymousChange = (e: any) => {
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

  console.log("提交评价:", reviewInfo.value);
  Taro.showLoading({ title: "提交中..." });

  setTimeout(() => {
    Taro.hideLoading();
    Taro.showToast({
      title: "评价成功",
      icon: "success",
    });
    setTimeout(() => {
      Taro.navigateBack();
    }, 1500);
  }, 1000);
};

onMounted(() => {
  const params = router.params;
  if (params.orderId) {
    reviewInfo.value.orderId = Number(params.orderId);
  }
  if (params.spaceId) {
    reviewInfo.value.spaceId = Number(params.spaceId);
  }
  if (params.roomId) {
    reviewInfo.value.roomId = Number(params.roomId);
  }
  if (params.spaceName) {
    reviewInfo.value.spaceName = params.spaceName;
  }
  if (params.roomName) {
    reviewInfo.value.roomName = params.roomName;
  }
});
</script>
