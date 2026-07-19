<template>
  <view class="tabs-container">
    <view class="tabs-header">
      <view
        v-for="(tab, index) in tabs"
        :key="tab.key || index"
        class="tab-item"
        :class="{ active: activeIndex === index }"
        @tap="onTabClick(index)"
      >
        {{ tab.title }}
      </view>
    </view>
    <view class="tabs-content">
      <slot :activeIndex="activeIndex" :activeTab="tabs[activeIndex]" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, PropType } from "vue";

interface TabItem {
  title: string;
  key: string;
}

interface Props {
  tabs: TabItem[];
  initialIndex?: number;
}

const props = withDefaults(defineProps<Props>(), {
  initialIndex: 0,
});

const emit = defineEmits<{
  change: [index: number, tab: TabItem];
}>();

const activeIndex = ref(props.initialIndex);

const onTabClick = (index: number) => {
  if (index >= 0 && index < props.tabs.length) {
    activeIndex.value = index;
    emit("change", index, props.tabs[index]);
  }
};

defineExpose({
  activeIndex,
  setActiveIndex: (index: number) => {
    if (index >= 0 && index < props.tabs.length) {
      activeIndex.value = index;
    }
  },
});
</script>

<style>
.tabs-container {
  position: sticky;
  top: 0;
  z-index: 100;
}

.tabs-header {
  display: flex;
  background-color: var(--color-base-100);
  border-bottom: 1rpx solid var(--color-taupe-200);
}

.tab-item {
  flex: 1;
  text-align: center;
  padding: 24rpx 0;
  font-size: 32rpx;
  color: var(--color-taupe-500);
  position: relative;
}

.tab-item.active {
  color: var(--color-primary);
  font-weight: bold;
}

.tab-item.active::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60rpx;
  height: 4rpx;
  background-color: var(--color-primary);
}

.tabs-content {
  /* 内容区域由父组件决定 */
}
</style>
