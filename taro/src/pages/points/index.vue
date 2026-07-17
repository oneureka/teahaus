<template>
  <view class="points">
    <view class="points-header">
      <view class="points-left">
        <text class="points-title">我的积分</text>
        <view class="points-amount-wrapper">
          <text class="points-amount">{{ points }}</text>
          <text class="points-unit">积分</text>
        </view>
      </view>
      <text class="points-rules" @tap="showUsageModal">积分规则</text>
    </view>
    <view v-if="showModal" class="modal-mask" @tap="closeModal">
      <view class="modal-content" @tap.stop>
        <view class="modal-header">
          <text class="modal-title">积分规则</text>
          <text class="modal-close" @tap="closeModal">✕</text>
        </view>
        <view class="modal-body">
          <view class="usage-item">
            <text class="usage-text">100 积分 = 1 元</text>
            <text class="usage-detail">可在下单时抵扣现金</text>
          </view>
        </view>
      </view>
    </view>

    <view class="points-records">
      <text class="records-title">积分明细</text>
      <scroll-view class="records-list">
        <view v-if="pointTransactions.length === 0" class="empty-records">
          <text class="empty-text">暂无积分明细</text>
        </view>
        <view
          v-else
          v-for="transaction in pointTransactions"
          :key="transaction.id"
          class="point-transaction-item"
        >
          <view class="transaction-info">
            <text class="transaction-type">{{ transaction.type }}</text>
            <text class="transaction-time">{{ transaction.time }}</text>
          </view>
          <view
            class="transaction-points"
            :class="{
              'points-in': transaction.points > 0,
              'points-out': transaction.points < 0,
            }"
          >
            <text v-if="transaction.points > 0">+{{ transaction.points }}</text>
            <text v-else>-{{ Math.abs(transaction.points) }}</text>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { pointsBalance, pointTransactionList, type PointTransaction } from "@/datasets";
import "./index.css";

const points = ref(pointsBalance);
const showModal = ref(false);
const pointTransactions = ref<PointTransaction[]>([...pointTransactionList]);

const showUsageModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};
</script>
