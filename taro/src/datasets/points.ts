export interface PointTransaction {
  id: number;
  type: string;
  time: string;
  points: number;
}

export const pointsBalance = 1860;

export const pointTransactionList: PointTransaction[] = [
  {
    id: 1,
    type: "新人注册礼",
    time: "2026-06-20 09:00",
    points: 500,
  },
  {
    id: 2,
    type: "预订消费得积分",
    time: "2026-06-28 09:40",
    points: 136,
  },
  {
    id: 3,
    type: "积分兑换茶礼",
    time: "2026-06-27 16:22",
    points: -800,
  },
  {
    id: 4,
    type: "邀请好友奖励",
    time: "2026-06-25 11:15",
    points: 300,
  },
  {
    id: 5,
    type: "每日签到",
    time: "2026-06-24 08:10",
    points: 10,
  },
];
