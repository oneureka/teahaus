<template>
  <view class="transaction-list">
    <view v-if="items.length === 0" class="empty-records">
      <text class="empty-text">{{ emptyText }}</text>
    </view>
    <view
      v-else
      v-for="item in items"
      :key="item.id"
      class="transaction-item"
    >
      <view class="transaction-info">
        <text class="transaction-type">{{ getTypeLabel(item) }}</text>
        <text class="transaction-time">{{ formatDate(item) }}</text>
      </view>
      <view
        class="transaction-amount"
        :class="{
          'amount-in': getAmount(item) > 0,
          'amount-out': getAmount(item) < 0,
        }"
      >
        <text v-if="getAmount(item) > 0">+{{ unit }}{{ getAmount(item) }}</text>
        <text v-else>-{{ unit }}{{ Math.abs(getAmount(item)) }}</text>
      </view>
    </view>
    </view>
</template>

<script setup lang="ts">
import { PropType } from "vue";

export interface TransactionItem {
  id: string;
  type: string;
  createdAt: string;
  [key: string]: unknown;
}

export interface Props {
  items: TransactionItem[];
  typeLabels?: Record<string, string>;
  amountKey?: string;
  unit?: string;
  emptyText?: string;
}

const props = withDefaults(defineProps<Props>(), {
  typeLabels: () => ({}),
  amountKey: "amount",
  unit: "¥",
  emptyText: "暂无明细",
});

const getTypeLabel = (item: TransactionItem): string => {
  return props.typeLabels[item.type] || item.type;
};

const getAmount = (item: TransactionItem): number => {
  return Number(item[props.amountKey]) || 0;
};

const formatDate = (item: TransactionItem): string => {
  return String(item.createdAt).split("T")[0];
};
</script>

<style>
.transaction-list {
  flex: 1;
}

.empty-records {
  padding: 80rpx 0;
  text-align: center;
}

.empty-text {
  font-size: 28rpx;
  color: var(--color-taupe-400);
}

.transaction-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 28rpx 0;
  border-bottom: 1rpx solid var(--color-taupe-200);
}

.transaction-info {
  display: flex;
  flex-direction: column;
}

.transaction-type {
  font-size: 30rpx;
  color: var(--color-base-content);
}

.transaction-time {
  margin-top: 8rpx;
  font-size: 24rpx;
  color: var(--color-taupe-400);
}

.transaction-amount {
  font-size: 32rpx;
  font-weight: 500;
}

.amount-in {
  color: var(--color-success);
}

.amount-out {
  color: var(--color-error);
}
</style>
