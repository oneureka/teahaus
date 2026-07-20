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
          <text class="date-text">{{ formatDate(checkoutInfo.date) }}</text>
        </view>

        <!-- 日期快捷选择 -->
        <view class="date-quick-list">
            <view
            v-for="date in quickDates"
            :key="date.value"
            class="date-chip"
            :class="{ active: checkoutInfo.date === date.value }"
            @tap="selectQuickDate(date.value)"
          >
            <text class="date-chip-week">{{ date.weekday }}</text>
            <text class="date-chip-day">{{ date.day }}</text>
          </view>
        </view>

        <!-- 时间段选择 -->
        <view class="form-item no-border">
          <text class="label">时间段</text>
        </view>
        <view class="time-slot-group">
          <view class="time-period">
            <text class="period-label">上午</text>
            <view class="time-row">
            <view class="time-chip" v-for="time in morningSlots" :key="time">
              <Chip
                :active="selectedTimeSlot === time"
                :disabled="!isSlotAvailable(time)"
                @tap="selectTimeSlot(time)"
              >
                {{ time }}
              </Chip>
            </view>
            </view>
          </view>
          <view class="time-period">
            <text class="period-label">下午</text>
            <view class="time-row">
            <view class="time-chip" v-for="time in afternoonSlots" :key="time">
              <Chip
                :active="selectedTimeSlot === time"
                :disabled="!isSlotAvailable(time)"
                @tap="selectTimeSlot(time)"
              >
                {{ time }}
              </Chip>
            </view>
            </view>
          </view>
          <view class="time-period">
            <text class="period-label">晚间</text>
            <view class="time-row">
            <view class="time-chip" v-for="time in eveningSlots" :key="time">
              <Chip
                :active="selectedTimeSlot === time"
                :disabled="!isSlotAvailable(time)"
                @tap="selectTimeSlot(time)"
              >
                {{ time }}
              </Chip>
            </view>
            </view>
          </view>
        </view>

        <!-- 时长选择 -->
        <view class="form-item no-border">
          <text class="label">时长</text>
          <view class="duration-list">
            <view class="duration-chip" v-for="hour in durationOptions" :key="hour">
              <Chip
                :active="selectedDuration === hour"
                @tap="selectedDuration = hour"
              >
                {{ hour }}小时
              </Chip>
            </view>
          </view>
        </view>

        <!-- 人数 -->
        <view class="form-item no-border">
          <text class="label">人数</text>
          <view class="stepper">
            <view class="stepper-btn" :class="{ disabled: checkoutInfo.partySize <= 1 }" @tap="decreasePartySize">−</view>
            <text class="stepper-value">{{ checkoutInfo.partySize }}</text>
            <view class="stepper-btn" :class="{ disabled: isMaxParty }" @tap="increasePartySize">+</view>
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
          <text class="total-value">¥{{ total }}</text>
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
        <text class="bottom-total">¥{{ total }}</text>
      </view>
      <SubmitButton text="提交订单" variant="pill" :disabled="!canSubmit" @tap="onSubmit" />
    </BottomBar>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import Taro, { useRouter } from "@tarojs/taro";
import { ROUTES, buildRoute } from "@/constants/routes";
import { getSpaceDetail } from "@/datasets/spaces";
import { roomList as allRooms } from "@/datasets/rooms";
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
  couponId?: number;
  couponName?: string;
}

const router = useRouter();
const weekdays = ["日", "一", "二", "三", "四", "五", "六"];

const quickDates = computed(() => {
  const today = new Date();
  const dates: { value: string; weekday: string; day: string }[] = [];
  for (let i = 0; i < 5; i++) {
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

const morningSlots = ["09:00", "10:00", "11:00"];
const afternoonSlots = ["12:00", "13:00", "14:00", "15:00", "16:00"];
const eveningSlots = ["17:00", "18:00", "19:00", "20:00", "21:00"];

const durationOptions = [1, 2, 3];

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
});

const total = computed(() => {
  const roomTotal = checkoutInfo.value.roomPrice * selectedDuration.value;
  return roomTotal + checkoutInfo.value.serviceFee;
});

const isValidPhone = (v: string) => /^1\d{10}$/.test(v);

const isMaxParty = computed(() => checkoutInfo.value.partySize >= 6);

const canSubmit = computed(() =>
  !!selectedTimeSlot.value
  && !!checkoutInfo.value.contactName.trim()
  && isValidPhone(checkoutInfo.value.contactPhone.trim())
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
  if (checkoutInfo.value.partySize < 6) {
    checkoutInfo.value.partySize++;
  }
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
  if (!isValidPhone(checkoutInfo.value.contactPhone)) {
    Taro.showToast({ title: "手机号格式不正确", icon: "none" });
    return;
  }
  Taro.showToast({ title: "订单提交成功", icon: "success" });
};

onMounted(() => {
  const params = router.params;
  if (!params.roomId || !params.spaceId) {
    Taro.showToast({ title: "订单信息缺失", icon: "none" });
    setTimeout(() => Taro.navigateBack(), 1500);
    return;
  }
  checkoutInfo.value.roomId = params.roomId;
  checkoutInfo.value.spaceId = params.spaceId;

  const space = getSpaceDetail(params.spaceId);
  const room = allRooms.find((r) => r.id === params.roomId);
  if (!space || !room) {
    Taro.showToast({ title: "门店或房间不存在", icon: "none" });
    setTimeout(() => Taro.navigateBack(), 1500);
    return;
  }
  checkoutInfo.value.spaceName = space.name;
  checkoutInfo.value.spaceImage = space.image;
  checkoutInfo.value.roomName = room.name;
  checkoutInfo.value.roomPrice = room.price;
  Taro.setNavigationBarTitle({ title: space.name });
});
</script>
