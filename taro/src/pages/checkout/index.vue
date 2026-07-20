<template>
  <view class="checkout">
    <scroll-view class="scroll-content" scroll-y>
      <!-- 茶室信息 -->
      <view class="card">
        <SpaceInfoCard
          :image="checkoutInfo.spaceImage"
          :space-name="checkoutInfo.spaceName"
          :room-name="checkoutInfo.roomName"
          :price="`¥${checkoutInfo.roomPrice}/时`"
        />
      </view>

      <!-- 预订信息 -->
      <view class="card">
        <view class="section-header">
          <text class="section-title">预订信息</text>
        </view>

        <!-- 日期选择 -->
        <view class="form-item">
          <text class="label">日期</text>
          <picker mode="date" :value="checkoutInfo.date" @change="onDateChange">
            <view class="picker">
              <text>{{ formatDate(checkoutInfo.date) }}</text>
              <text class="arrow">›</text>
            </view>
          </picker>
        </view>

        <!-- 日期快捷选择 -->
        <view class="date-quick-list">
          <view
            v-for="d in quickDates"
            :key="d.value"
            class="date-chip"
            :class="{ active: checkoutInfo.date === d.value }"
            @tap="selectQuickDate(d.value)"
          >
            <text class="date-chip-week">{{ d.weekday }}</text>
            <text class="date-chip-day">{{ d.day }}</text>
          </view>
        </view>

        <!-- 时间段选择 -->
        <view class="form-item no-border">
          <text class="label">时间段</text>
        </view>
        <view class="time-slot-group">
          <view class="slot-period">
            <text class="period-label">上午</text>
            <view class="slot-row">
              <Chip
                v-for="slot in morningSlots"
                :key="slot"
                :active="selectedTimeSlot === slot"
                :disabled="!isSlotAvailable(slot)"
                @tap="selectTimeSlot(slot)"
              >
                {{ slot }}
              </Chip>
            </view>
          </view>
          <view class="slot-period">
            <text class="period-label">下午</text>
            <view class="slot-row">
              <Chip
                v-for="slot in afternoonSlots"
                :key="slot"
                :active="selectedTimeSlot === slot"
                :disabled="!isSlotAvailable(slot)"
                @tap="selectTimeSlot(slot)"
              >
                {{ slot }}
              </Chip>
            </view>
          </view>
          <view class="slot-period">
            <text class="period-label">晚间</text>
            <view class="slot-row">
              <Chip
                v-for="slot in eveningSlots"
                :key="slot"
                :active="selectedTimeSlot === slot"
                :disabled="!isSlotAvailable(slot)"
                @tap="selectTimeSlot(slot)"
              >
                {{ slot }}
              </Chip>
            </view>
          </view>
        </view>

        <!-- 时长选择 -->
        <view class="form-item no-border">
          <text class="label">时长</text>
          <view class="duration-list">
            <Chip
              v-for="d in durationOptions"
              :key="d"
              :active="selectedDuration === d"
              @tap="selectedDuration = d"
            >
              {{ d }}小时
            </Chip>
          </view>
        </view>

        <!-- 人数 -->
        <view class="form-item no-border">
          <text class="label">人数</text>
          <view class="stepper">
            <view class="stepper-btn" @tap="decreasePartySize">−</view>
            <text class="stepper-value">{{ checkoutInfo.partySize }}</text>
            <view class="stepper-btn" @tap="increasePartySize">+</view>
          </view>
        </view>
      </view>

      <!-- 联系人信息 -->
      <view class="card">
        <view class="section-header">
          <text class="section-title">联系人信息</text>
        </view>
        <view class="form-item">
          <text class="label">姓名</text>
          <input
            class="input"
            v-model="checkoutInfo.contactName"
            placeholder="请输入姓名"
          />
        </view>
        <view class="form-item no-border">
          <text class="label">手机号</text>
          <input
            class="input"
            type="number"
            v-model="checkoutInfo.contactPhone"
            placeholder="请输入手机号"
          />
        </view>
      </view>

      <!-- 费用明细 -->
      <view class="card">
        <view class="section-header">
          <text class="section-title">费用明细</text>
        </view>
        <view class="price-row">
          <text class="price-label">房间费用</text>
          <text class="price-value">¥{{ checkoutInfo.roomPrice }} × {{ selectedDuration }}小时</text>
        </view>
        <view class="price-row">
          <text class="price-label">服务费</text>
          <text class="price-value">¥{{ checkoutInfo.serviceFee }}</text>
        </view>
        <view class="price-total">
          <text class="price-label total-label">合计</text>
          <text class="total-value">¥{{ computedTotal }}</text>
        </view>
      </view>

      <!-- 优惠券 -->
      <view class="card coupon-card" @tap="onSelectCoupon">
        <view class="coupon-row">
          <view class="coupon-label">
            <text class="label">优惠券</text>
            <text v-if="checkoutInfo.couponName" class="coupon-name">
              {{ checkoutInfo.couponName }}
            </text>
            <text v-else class="coupon-placeholder">选择优惠券</text>
          </view>
          <text class="arrow">›</text>
        </view>
      </view>

      <view style="height: 140rpx"></view>
    </scroll-view>

    <!-- 底部结算栏 -->
    <BottomBar>
      <view class="bottom-price">
        <text class="bottom-label">实付款</text>
        <text class="bottom-total">¥{{ computedTotal }}</text>
      </view>
      <SubmitButton text="提交订单" variant="pill" :disabled="!canSubmit" @tap="onSubmit" />
    </BottomBar>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import Taro, { useRouter } from "@tarojs/taro";
import { ROUTES, buildRoute } from "@/constants/routes";
import SpaceInfoCard from "@/components/SpaceInfoCard/index.vue";
import SubmitButton from "@/components/SubmitButton/index.vue";
import BottomBar from "@/components/BottomBar/index.vue";
import Chip from "@/components/Chip/index.vue";
import "./index.css";

interface CheckoutInfo {
  spaceId: string;
  roomId: string;
  spaceName: string;
  spaceImage: string;
  roomName: string;
  date: string;
  partySize: number;
  contactName: string;
  contactPhone: string;
  roomPrice: number;
  serviceFee: number;
  totalPrice: number;
  couponId?: number;
  couponName?: string;
}

const router = useRouter();
const weekdays = ["日", "一", "二", "三", "四", "五", "六"];

const quickDates = computed(() => {
  const today = new Date();
  const dates: { value: string; weekday: string; day: string }[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const label = i === 0 ? "今天" : i === 1 ? "明天" : weekdays[d.getDay()];
    dates.push({
      value: `${y}-${m}-${day}`,
      weekday: label,
      day: String(d.getDate()),
    });
  }
  return dates;
});

const allTimeSlots = [
  "09:00", "10:00", "11:00",
  "12:00", "13:00", "14:00", "15:00", "16:00",
  "17:00", "18:00", "19:00", "20:00", "21:00",
];

const morningSlots = ["09:00", "10:00", "11:00"];
const afternoonSlots = ["12:00", "13:00", "14:00", "15:00", "16:00"];
const eveningSlots = ["17:00", "18:00", "19:00", "20:00", "21:00"];

const durationOptions = [1, 2, 3, 4];

const selectedTimeSlot = ref("");
const selectedDuration = ref(2);

const checkoutInfo = ref<CheckoutInfo>({
  spaceId: "",
  roomId: "",
  spaceName: "",
  spaceImage: "",
  roomName: "",
  date: new Date().toISOString().split("T")[0],
  partySize: 2,
  contactName: "",
  contactPhone: "",
  roomPrice: 0,
  serviceFee: 10,
  totalPrice: 0,
});

const computedTotal = computed(() => {
  const roomTotal = checkoutInfo.value.roomPrice * selectedDuration.value;
  return roomTotal + checkoutInfo.value.serviceFee;
});

const canSubmit = computed(() =>
  !!selectedTimeSlot.value
  && !!checkoutInfo.value.contactName.trim()
  && !!checkoutInfo.value.contactPhone.trim()
);

const isSlotAvailable = (slot: string) => {
  const now = new Date();
  const today = new Date().toISOString().split("T")[0];
  if (checkoutInfo.value.date !== today) return true;
  const [h] = slot.split(":").map(Number);
  return h > now.getHours();
};

const selectTimeSlot = (slot: string) => {
  if (!isSlotAvailable(slot)) return;
  selectedTimeSlot.value = slot;
};

const selectQuickDate = (date: string) => {
  checkoutInfo.value.date = date;
};

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  const m = d.getMonth() + 1;
  const day = d.getDate();
  const w = weekdays[d.getDay()];
  return `${m}月${day}日 周${w}`;
};

const decreasePartySize = () => {
  if (checkoutInfo.value.partySize > 1) {
    checkoutInfo.value.partySize--;
  }
};

const increasePartySize = () => {
  checkoutInfo.value.partySize++;
};

const onDateChange = (e: { detail: { value: string } }) => {
  checkoutInfo.value.date = e.detail.value;
};

const onSelectCoupon = () => {
  Taro.navigateTo({
    url: buildRoute(ROUTES.coupons, { selectMode: true }),
  });
};

const onSubmit = () => {
  if (!selectedTimeSlot.value) {
    Taro.showToast({ title: "请选择时间段", icon: "none" });
    return;
  }
  if (!checkoutInfo.value.contactName) {
    Taro.showToast({ title: "请输入联系人姓名", icon: "none" });
    return;
  }
  if (!checkoutInfo.value.contactPhone) {
    Taro.showToast({ title: "请输入联系人手机号", icon: "none" });
    return;
  }
  Taro.showToast({ title: "订单提交成功", icon: "success" });
};

onMounted(() => {
  const params = router.params;
  if (params.roomId) checkoutInfo.value.roomId = params.roomId;
  if (params.spaceId) checkoutInfo.value.spaceId = params.spaceId;
  if (params.roomName) checkoutInfo.value.roomName = params.roomName;
  if (params.spaceName) checkoutInfo.value.spaceName = params.spaceName;
  if (params.roomPrice) {
    checkoutInfo.value.roomPrice = Number(params.roomPrice);
  }
});
</script>
