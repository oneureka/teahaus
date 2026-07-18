<template>
  <view class="wallet">
    <view class="wallet-balance">
      <view class="balance-left">
        <text class="balance-title">我的余额</text>
        <text class="balance-amount">¥{{ balance }}</text>
      </view>
      <view class="balance-right">
        <text class="btn-recharge" @tap="goToRecharge">去充值</text>
        <text class="btn-withdraw" @tap="goToWithdraw">提现</text>
      </view>
    </view>

    <view class="wallet-records">
      <text class="records-title">账户明细</text>
      <scroll-view class="records-list">
        <view v-if="transactions.length === 0" class="empty-records">
          <text class="empty-text">暂无账户明细</text>
        </view>
        <view
          v-else
          v-for="transaction in transactions"
          :key="transaction.id"
          class="transaction-item"
        >
          <view class="transaction-info">
            <text class="transaction-type">{{ { RECHARGE: '充值', PAYMENT: '消费', REWARD: '奖励' }[transaction.type] || transaction.type }}</text>
            <text class="transaction-time">{{ transaction.createdAt.split('T')[0] }}</text>
          </view>
          <view
            class="transaction-amount"
            :class="{
              'amount-in': transaction.amount > 0,
              'amount-out': transaction.amount < 0,
            }"
          >
            <text v-if="transaction.amount > 0"
              >+¥{{ transaction.amount }}</text
            >
            <text v-else>-¥{{ Math.abs(transaction.amount) }}</text>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Taro from "@tarojs/taro";
import { user, transactionList, type Transaction } from "@/datasets";
import "./index.css";

const balance = ref(user.wallet.balance);
const transactions = ref<Transaction[]>([...transactionList]);

const goToRecharge = () => {
  Taro.navigateTo({
    url: "/pages/transfer/index?tab=recharge",
  });
};

const goToWithdraw = () => {
  Taro.navigateTo({
    url: "/pages/transfer/index?tab=withdraw",
  });
};
</script>
