<template>
  <view class="transfer">
    <view class="form">
      <view class="segment-group">
        <view
          class="segment"
          :class="{ active: activeTab === 'recharge' }"
          @tap="switchTab('recharge')"
        >充值</view>
        <view
          class="segment"
          :class="{ active: activeTab === 'withdraw' }"
          @tap="switchTab('withdraw')"
        >提现</view>
      </view>
      <view class="amount-section">
        <text class="label">
          {{ activeTab === 'recharge' ? '充值金额' : '提现金额' }}
        </text>
        <view class="amount-input">
          <text class="currency">¥</text>
          <input
            type="digit"
            class="input"
            :value="amount"
            @input="onAmountInput"
            placeholder="输入金额"
          />
        </view>
        <view class="amount-foot">
          <text class="balance-hint">
            {{ activeTab === 'withdraw' ? '可提现余额' : '当前余额' }}：¥{{ balance }}
          </text>
          <text v-if="activeTab === 'withdraw'" class="withdraw-all" @tap="onWithdrawAll">全部提现</text>
        </view>
      </view>

      <view class="preset-amounts" v-if="activeTab === 'recharge'">
        <view
          v-for="amt in presets"
          :key="amt"
          class="preset-item"
          :class="{ selected: amount === amt }"
          @tap="amount = amt"
        >¥{{ amt }}</view>
      </view>

      <SubmitButton
        :text="activeTab === 'recharge' ? '立即充值' : '提现'"
        @tap="onSubmit"
      />
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRouter } from "@tarojs/taro";
import Taro from "@tarojs/taro";
import { useUserStore } from "@/stores/user";
import SubmitButton from "@/components/SubmitButton/index.vue";
import "./index.css";

const userStore = useUserStore();

const router = useRouter();
const activeTab = ref<"recharge" | "withdraw">("recharge");
const amount = ref<number>(0);
const balance = ref(userStore.balance);

const presets = [50, 100, 200, 500];

const tabLabels: Record<string, string> = {
  recharge: "充值",
  withdraw: "提现",
};

const updateTitle = () => {
  Taro.setNavigationBarTitle({ title: tabLabels[activeTab.value] });
};

onMounted(() => {
  const tab = router.params.tab;
  if (tab === "withdraw" || tab === "recharge") {
    activeTab.value = tab;
  }
  updateTitle();
});

watch(activeTab, updateTitle);

const switchTab = (tab: "recharge" | "withdraw") => {
  activeTab.value = tab;
  amount.value = 0;
};

interface InputEvent {
  detail: { value: string };
}

const onAmountInput = (e: InputEvent) => {
  const raw = e.detail.value;
  const cleaned = raw.replace(/[^\d.]/g, "");
  const parts = cleaned.split(".");
  let val = parts[0];
  if (parts.length > 1) {
    val = parts[0] + "." + parts[1].slice(0, 2);
  }
  const num = parseFloat(val);
  amount.value = isNaN(num) ? 0 : Math.min(num, 999999.99);
};

const onWithdrawAll = () => {
  amount.value = balance.value;
};

const onSubmit = () => {
  if (amount.value <= 0) {
    Taro.showToast({ title: "请输入有效金额", icon: "none" });
    return;
  }
  const label = activeTab.value === "recharge" ? "充值" : "提现";
  Taro.showModal({
    title: "功能开发中",
    content: `${label} ${amount.value} 元，敬请期待`,
    showCancel: false,
    confirmText: "知道了",
  });
};
</script>
