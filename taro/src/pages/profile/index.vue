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
          <image class="avatar" :src="userInfo.avatar" mode="aspectFill" />
        </button>
        <view class="user-text">
          <text v-if="!editingNick" class="username" @tap="onSyncNickname">{{ userInfo.nickname }}</text>
          <input
            v-else
            type="nickname"
            class="nickname-input"
            :value="userInfo.nickname"
            placeholder="输入昵称"
            @blur="onNicknameDone"
            @confirm="onNicknameDone"
            focus
          />
          <text class="user-title">{{ userInfo.userTitle }}</text>
        </view>
      </view>
      <view class="stats-divider">
        <view class="stats-divider-line"></view>
        <text class="stats-divider-icon">❖</text>
        <view class="stats-divider-line"></view>
      </view>
      <view class="stats-card">
        <view class="stat-item" @tap="navigateTo('/pages/coupons/index')">
          <text class="stat-value">{{ userStats.coupons }}</text>
          <text class="stat-label">卡券</text>
        </view>
        <view class="stat-divider"></view>
        <view class="stat-item" @tap="navigateTo('/pages/wallet/index')">
          <text class="stat-value">¥{{ userStats.balance }}</text>
          <text class="stat-label">余额</text>
        </view>
        <view class="stat-divider"></view>
        <view class="stat-item" @tap="navigateTo('/pages/points/index')">
          <text class="stat-value">{{ userStats.points }}</text>
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
          hover-class="menu-item-press"
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
import { userInfo as mockUserInfo, userStats as mockUserStats } from "@/datasets";
import "./index.css";

const statusBarHeight = ref(0);
const navBarHeight = ref(44);
const editingNick = ref(false);

onMounted(() => {
  const systemInfo = Taro.getSystemInfoSync();
  statusBarHeight.value = systemInfo.statusBarHeight || 20;
  try {
    const saved = Taro.getStorageSync("profile_user");
    if (saved && typeof saved === "object") {
      if (saved.nickname) userInfo.value.nickname = saved.nickname;
      if (saved.avatar) userInfo.value.avatar = saved.avatar;
    }
  } catch {} // first visit, no saved data
});

// 用户信息
const userInfo = ref({ ...mockUserInfo });

// 用户统计数据
const userStats = ref({ ...mockUserStats });

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
    path: "/pages/orders/index",
    type: "switchTab",
  },
  {
    title: "团购验券",
    icon: iconCoupon,
    path: "/pages/verify/index",
    type: "navigate",
  },
  {
    title: "常见问题",
    icon: iconFaq,
    path: "/pages/faq/index",
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
    path: "/pages/feedback/index",
    type: "navigate",
  },
]);

const loadProfile = (): Record<string, any> => {
  try {
    const saved = Taro.getStorageSync("profile_user");
    return saved && typeof saved === "object" ? saved : {};
  } catch {
    return {};
  }
};

const saveProfile = (patch: Record<string, any>) => {
  Taro.setStorageSync("profile_user", { ...loadProfile(), ...patch });
};

const onChooseAvatar = (e: any) => {
  const { avatarUrl } = e.detail;
  userInfo.value.avatar = avatarUrl;
  saveProfile({ avatar: avatarUrl });
};

const onSyncNickname = () => {
  editingNick.value = true;
};

const onNicknameDone = (e: any) => {
  const val = e.detail.value?.trim();
  if (val) {
    userInfo.value.nickname = val;
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
          title: "打开客服失败",
          icon: "none",
        }),
    });
  }
};
</script>
