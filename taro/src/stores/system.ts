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
        safeAreaTop = sysInfo.statusBarHeight || 0;
      }

      const ios = sysInfo.system?.toLowerCase().includes("ios");
      if (ios) {
        const iPhoneModels = ["iPhone14", "iPhone15", "iPhone16", "iPhone17"];
        const isNotch = iPhoneModels.some((model) =>
          sysInfo.model?.includes(model),
        );
        if (isNotch || sysInfo.safeArea?.bottom) {
          safeAreaBottom =
            sysInfo.screenHeight -
            (sysInfo.safeArea?.bottom || sysInfo.screenHeight);
          if (safeAreaBottom === 0) {
            safeAreaBottom = 34;
          }
        }
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
    init,
    updateNavBarHeight,
  };
});
