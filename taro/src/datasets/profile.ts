export interface UserInfo {
  avatar: string;
  nickname: string;
  userTitle: string;
}

export interface UserStats {
  coupons: number;
  balance: number;
  points: number;
}

export const userInfo: UserInfo = {
  avatar:
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop",
  nickname: "南风_",
  userTitle: "品茗会员",
};

export const userStats: UserStats = {
  coupons: 2,
  balance: 216.0,
  points: 1860,
};
