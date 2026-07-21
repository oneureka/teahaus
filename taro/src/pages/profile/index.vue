<template>
  <view class="profile">
    <view class="custom-navbar" :style="{ paddingTop: statusBarHeight + 'px' }">
      <view class="navbar-content" :style="{ height: navBarHeight + 'px' }">
        <text class="navbar-title">我的</text>
      </view>
    </view>
    <view
      class="user-section"
      :style="{ paddingTop: statusBarHeight + navBarHeight + 'px' }"
    >
      <view class="user-info">
        <button open-type="chooseAvatar" class="avatar-btn" @chooseavatar="onChooseAvatar">
          <image class="avatar" :src="userStore.userInfo.avatar" mode="aspectFill" />
        </button>
        <view class="user-text">
          <text v-if="!editingNick" class="username" @tap="onStartEditNickname">{{ userStore.userInfo.nickname }}</text>
          <input
            v-else
            type="nickname"
            class="nickname-input"
            :value="userStore.userInfo.nickname"
            placeholder="输入昵称"
            @blur="onNicknameDone"
            @confirm="onNicknameDone"
            focus
          />
          <text class="user-title">{{ userStore.userTitle }}</text>
        </view>
      </view>
      <view class="stats-divider">
        <view class="stats-divider-line"></view>
        <text class="stats-divider-icon">❖</text>
        <view class="stats-divider-line"></view>
      </view>
      <view class="stats-card">
        <view class="stat-item" @tap="navigateTo(ROUTES.coupons)">
          <text class="stat-value">{{ couponCount }}</text>
          <text class="stat-label">卡券</text>
        </view>
        <view class="stat-divider"></view>
        <view class="stat-item" @tap="navigateTo(ROUTES.wallet)">
          <text class="stat-value">¥{{ userStore.balance }}</text>
          <text class="stat-label">余额</text>
        </view>
        <view class="stat-divider"></view>
        <view class="stat-item" @tap="navigateTo(ROUTES.points)">
          <text class="stat-value">{{ userStore.points }}</text>
          <text class="stat-label">积分</text>
        </view>
      </view>
    </view>
    <view class="menu-section">
      <view class="menu-list">
        <view
          v-for="(item, index) in menuList"
          :key="index"
          class="menu-list-item"

          @tap="onMenuClick(item)"
        >
          <view class="menu-list-left">
            <image class="menu-list-icon" :src="item.icon" mode="aspectFit" />
            <text class="menu-list-title">{{ item.title }}</text>
          </view>
          <view class="menu-list-right">
            <image
              class="menu-list-arrow"
              src="@/assets/icons/icon-arrow@2x.png"
              mode="aspectFit"
            />
          </view>
        </view>
      </view>
    </view>
    <view class="divider-deco">
      <text class="deco-line"></text>
      <text class="deco-icon">❖</text>
      <text class="deco-line"></text>
    </view>
    <view class="version-info">v1.0.0</view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Taro from "@tarojs/taro";
import iconOrder from "@/assets/icons/icon-order@2x.png";
import iconCoupon from "@/assets/icons/icon-coupon@2x.png";
import iconFaq from "@/assets/icons/icon-faq@2x.png";
import iconContact from "@/assets/icons/icon-contact@2x.png";
import iconFeedback from "@/assets/icons/icon-feedback@2x.png";
import { useUserStore } from "@/stores/user";
import { useSystemStore } from "@/stores/system";
import { couponList, CouponStatus } from "@/datasets/coupons";
import { ROUTES } from "@/constants/routes";
import "./index.css";

const userStore = useUserStore();
const systemStore = useSystemStore();

const statusBarHeight = ref(0);
const navBarHeight = ref(44);
const editingNick = ref(false);

onMounted(() => {
  statusBarHeight.value = systemStore.systemViewHeight.statusBarHeight || 20;
  navBarHeight.value = systemStore.systemViewHeight.navBarHeight;
  try {
    const saved = Taro.getStorageSync("profile_user");
    if (saved && typeof saved === "object") {
      if (saved.nickname) userStore.setUserInfo({ nickname: saved.nickname });
      if (saved.avatar) userStore.setUserInfo({ avatar: saved.avatar });
    }
  } catch {} // first visit, no saved data
});

// 菜单列表
interface MenuItem {
  title: string;
  icon: string;
  path: string;
  badge?: string;
  type: "navigate" | "switchTab" | "customerService" | "modal";
}

const menuList = ref<MenuItem[]>([
  {
    title: "我的订单",
    icon: iconOrder,
    path: ROUTES.orders,
    type: "switchTab",
  },
  {
    title: "团购验券",
    icon: iconCoupon,
    path: ROUTES.verify,
    type: "navigate",
  },
  {
    title: "常见问题",
    icon: iconFaq,
    path: ROUTES.faq,
    type: "navigate",
  },
  {
    title: "联系客服",
    icon: iconContact,
    path: "",
    type: "customerService",
  },
  {
    title: "留言反馈",
    icon: iconFeedback,
    path: ROUTES.feedback,
    type: "navigate",
  },
]);

const couponCount = couponList.filter(
  (c) => c.status === CouponStatus.NEW,
).length;

const loadProfile = (): Record<string, unknown> => {
  try {
    const saved = Taro.getStorageSync("profile_user") as Record<string, unknown>;
    return saved && typeof saved === "object" ? saved : {};
  } catch {
    return {};
  }
};

const saveProfile = (patch: Record<string, unknown>) => {
  Taro.setStorageSync("profile_user", { ...loadProfile(), ...patch });
};

const onChooseAvatar = (e: { detail: { avatarUrl: string } }) => {
  const { avatarUrl } = e.detail;
  userStore.setUserInfo({ avatar: avatarUrl });
  saveProfile({ avatar: avatarUrl });
};

const onStartEditNickname = () => {
  editingNick.value = true;
};

const onNicknameDone = (e: { detail: { value: string } }) => {
  const val = e.detail.value?.trim();
  if (val) {
    userStore.setUserInfo({ nickname: val });
    saveProfile({ nickname: val });
  }
  editingNick.value = false;
};

// 导航到指定页面
const navigateTo = (path: string) => {
  if (path) {
    Taro.navigateTo({ url: path });
  }
};

// 点击菜单项
const onMenuClick = (item: MenuItem) => {
  if (item.type === "switchTab") {
    Taro.switchTab({ url: item.path });
  } else if (item.type === "navigate") {
    navigateTo(item.path);
  } else if (item.type === "customerService") {
    Taro.openCustomerServiceChat({
      extInfo: { url: "" },
      corpId: "",
      fail: () =>
        Taro.showToast({
          title: "当前未接入微信客服系统，如有问题请通过「留言反馈」联系我们",
          icon: "none",
        }),
    });
  }
};
</script>
