<template>
  <view class="wallet">
    <view class="wallet-balance">
      <view class="balance-left">
        <text class="balance-title">我的余额</text>
        <text class="balance-amount">¥{{ userStore.balance }}</text>
      </view>
      <view class="balance-right">
        <text class="btn-recharge" @tap="goToRecharge">去充值</text>
        <text class="btn-withdraw" @tap="goToWithdraw">提现</text>
      </view>
    </view>

    <view class="wallet-records">
      <text class="records-title">账户明细</text>
      <TransactionList
        class="records-list"
        :items="transactions"
        :type-labels="walletTypeLabels"
        amount-key="amount"
        unit="¥"
        empty-text="暂无账户明细"
      />
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Taro from "@tarojs/taro";
import { useUserStore } from "@/stores/user";
import { transactionList, type Transaction } from "@/datasets/wallet";
import { ROUTES, buildRoute } from "@/constants/routes";
import TransactionList from "@/components/TransactionList/index.vue";
import "./index.css";

const userStore = useUserStore();

const transactions = ref<Transaction[]>([...transactionList]);

const walletTypeLabels: Record<string, string> = {
  RECHARGE: "充值",
  PAYMENT: "消费",
  REWARD: "奖励",
};

const goToRecharge = () => {
  Taro.navigateTo({
    url: buildRoute(ROUTES.transfer, { tab: "recharge" }),
  });
};

const goToWithdraw = () => {
  Taro.navigateTo({
    url: buildRoute(ROUTES.transfer, { tab: "withdraw" }),
  });
};
</script>
