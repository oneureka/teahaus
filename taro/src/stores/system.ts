import { defineStore } from "pinia";
import { ref, computed } from "vue";
import Taro from "@tarojs/taro";

export interface SystemInfo {
  screenWidth: number;
  screenHeight: number;
  statusBarHeight: number;
  platform: string;
  system: string;
  SDKVersion: string;
  version: string;
  model: string;
  brand: string;
  safeArea?: {
    bottom: number;
    top?: number;
  };
}

export interface SystemViewHeight {
  statusBarHeight: number;
  navBarHeight: number;
  safeAreaTop: number;
  safeAreaBottom: number;
  windowHeight: number;
  windowWidth: number;
  pixelRatio: number;
}

const defaultSystemViewHeight: SystemViewHeight = {
  statusBarHeight: 0,
  navBarHeight: 44,
  safeAreaTop: 0,
  safeAreaBottom: 0,
  windowHeight: 0,
  windowWidth: 0,
  pixelRatio: 1,
};

export const useSystemStore = defineStore("system", () => {
  const systemInfo = ref<SystemInfo | null>(null);
  const systemViewHeight = ref<SystemViewHeight>({
    ...defaultSystemViewHeight,
  });
  const isInitialized = ref(false);

  const userLatitude = ref(0);
  const userLongitude = ref(0);
  const locationLoaded = ref(false);

  async function initLocation() {
    try {
      const res = await Taro.getLocation({ type: "wgs84" });
      userLatitude.value = res.latitude;
      userLongitude.value = res.longitude;
      locationLoaded.value = true;
    } catch {
      locationLoaded.value = false;
    }
  }

  const safeAreaHeight = computed(() => {
    return (
      systemViewHeight.value.safeAreaTop + systemViewHeight.value.safeAreaBottom
    );
  });

  const fullNavBarHeight = computed(() => {
    return (
      systemViewHeight.value.statusBarHeight +
      systemViewHeight.value.navBarHeight
    );
  });

  const contentHeight = computed(() => {
    return systemViewHeight.value.windowHeight - fullNavBarHeight.value;
  });

  function init() {
    if (isInitialized.value) return;

    try {
      const sysInfo = Taro.getSystemInfoSync();
      systemInfo.value = {
        screenWidth: sysInfo.screenWidth,
        screenHeight: sysInfo.screenHeight,
        statusBarHeight: sysInfo.statusBarHeight || 0,
        platform: sysInfo.platform,
        system: sysInfo.system,
        SDKVersion: sysInfo.SDKVersion || "",
        version: sysInfo.version || "",
        model: sysInfo.model || "",
        brand: sysInfo.brand || "",
        safeArea: sysInfo.safeArea,
      };

      let navBarHeight = 44;
      let safeAreaTop = sysInfo.statusBarHeight || 0;
      let safeAreaBottom = 0;

      if (process.env.TARO_ENV === "weapp") {
        const menuButtonInfo = Taro.getMenuButtonBoundingClientRect();
        const gap = 8;
        navBarHeight = menuButtonInfo.height + gap * 2;
      }

      if (sysInfo.safeArea?.bottom) {
        safeAreaBottom = Math.max(sysInfo.screenHeight - sysInfo.safeArea.bottom, 0);
      }

      systemViewHeight.value = {
        statusBarHeight: safeAreaTop,
        navBarHeight,
        safeAreaTop,
        safeAreaBottom,
        windowHeight: sysInfo.windowHeight,
        windowWidth: sysInfo.screenWidth,
        pixelRatio: sysInfo.pixelRatio || 1,
      };

      isInitialized.value = true;
    } catch (error) {
      console.error("Failed to init system info:", error);
    }
  }

  function updateNavBarHeight(height: number) {
    systemViewHeight.value.navBarHeight = height;
  }

  return {
    systemInfo,
    systemViewHeight,
    isInitialized,
    safeAreaHeight,
    fullNavBarHeight,
    contentHeight,
    userLatitude,
    userLongitude,
    locationLoaded,
    init,
    initLocation,
    updateNavBarHeight,
  };
});
