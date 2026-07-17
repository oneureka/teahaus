import { defineStore } from "pinia";
import { ref, computed } from "vue";

export interface UserInfo {
  id?: string;
  nickname?: string;
  avatar?: string;
  phone?: string;
  [key: string]: any;
}

export const useUserStore = defineStore("user", () => {
  const token = ref<string>("");
  const userInfo = ref<UserInfo>({});

  const isLoggedIn = computed(() => !!token.value);
  const userId = computed(() => userInfo.value.id || "");
  const userNickname = computed(() => userInfo.value.nickname || "未登录");
  const userAvatar = computed(() => userInfo.value.avatar || "");

  function setToken(newToken: string) {
    token.value = newToken;
  }

  function setUserInfo(info: UserInfo) {
    userInfo.value = { ...userInfo.value, ...info };
  }

  function clearUser() {
    token.value = "";
    userInfo.value = {};
  }

  return {
    token,
    userInfo,
    isLoggedIn,
    userId,
    userNickname,
    userAvatar,
    setToken,
    setUserInfo,
    clearUser,
  };
});
