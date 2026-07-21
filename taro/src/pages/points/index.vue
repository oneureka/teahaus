<template>
  <view class="points">
    <view class="points-header">
      <view class="points-left">
        <text class="points-title">我的积分</text>
        <view class="points-amount-wrapper">
          <text class="points-amount">{{ userStore.points }}</text>
          <text class="points-unit">积分</text>
        </view>
      </view>
      <view class="points-rules" @tap="showUsageModal">
        <text>积分规则</text>
        <text class="rules-arrow">▸</text>
      </view>
    </view>
    <Modal v-model="showModal" title="积分规则">
      <view class="usage-item">
        <text class="usage-text">100 积分 = 1 元</text>
        <text class="usage-detail">可在下单时抵扣现金</text>
      </view>
      <view class="usage-item">
        <text class="usage-text">有效期</text>
        <text class="usage-detail"
          >积分自获取之日起 12 个月内有效，逾期自动清零</text
        >
      </view>
    </Modal>

    <view class="points-records">
      <text class="records-title">积分明细</text>
      <TransactionList
        class="records-list"
        :items="pointTransactions"
        :type-labels="pointsTypeLabels"
        amount-key="points"
        unit=""
        empty-text="暂无积分明细"
      />
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { usePullDownRefresh } from '@tarojs/taro'
import { useUserStore } from '@/stores/user'
import {
  pointTransactions as pointTransactionList,
  type PointTransaction
} from '@/datasets/points'
import { usePullRefresh } from '@/composables/useMockSubmit'
import TransactionList from '@/components/TransactionList/index.vue'
import Modal from '@/components/Modal/index.vue'
import './index.css'

const userStore = useUserStore()

const showModal = ref(false)
const pointTransactions = ref<PointTransaction[]>([...pointTransactionList])

const pointsTypeLabels: Record<string, string> = {
  EARN: '获得',
  BURN: '消耗'
}

const showUsageModal = () => {
  showModal.value = true
}

usePullDownRefresh(usePullRefresh())
</script>
