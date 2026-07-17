export interface Review {
  id: number;
  username: string;
  avatar: string;
  time: string;
  content: string;
  images?: string[];
}

export const spaceReviews: Review[] = [
  {
    id: 1,
    username: "出差的老周",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
    time: "2026-06-28",
    content:
      "小程序预约后扫码就能进，全程不用等人接待，很方便。隔音不错，约客户谈了两个小时都没被打扰，桌上的茶包和茶具都很齐全，按小时算下来性价比挺高。",
    images: [
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=200&h=200&fit=crop",
    ],
  },
  {
    id: 2,
    username: "周末不加班",
    avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop",
    time: "2026-06-24",
    content:
      "和朋友订了会客厅打牌，24 小时营业太适合我们这种熬夜党了。剩 15 分钟会收到续费提醒，续费也是手机上一键搞定，就是热门时段最好提前订。",
  },
];
