<template>
  <view class="faq">
    <view class="faq-list">
      <view
        v-for="(item, index) in faqList"
        :key="item.question"
        class="faq-item"
        @tap="onFaqClick(index)"
      >
        <view class="faq-question">
          <text class="faq-question-text">{{ item.question }}</text>
          <image
            class="faq-arrow"
            :class="{ 'faq-arrow-expanded': item.expanded }"
            src="@/assets/icons/icon-arrow@2x.png"
            mode="aspectFit"
          />
        </view>
        <view v-if="item.expanded" class="faq-answer">
          <text class="faq-answer-text">{{ item.answer }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { faqList as mockFaqList, type FaqItem } from "@/datasets";
import "./index.css";

const faqList = ref<FaqItem[]>(
  mockFaqList.map((item) => ({ ...item }))
);

const onFaqClick = (index: number) => {
  faqList.value[index].expanded = !faqList.value[index].expanded;
};
</script>
