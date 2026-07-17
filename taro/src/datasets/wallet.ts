export interface Transaction {
  id: number;
  type: string;
  time: string;
  amount: number;
}

export const walletBalance = 216.0;

export const transactionList: Transaction[] = [
  {
    id: 1,
    type: "茶室预订消费",
    time: "2026-06-28 09:40",
    amount: -136.0,
  },
  {
    id: 2,
    type: "账户充值",
    time: "2026-06-27 20:10",
    amount: 200.0,
  },
  {
    id: 3,
    type: "预订取消退款",
    time: "2026-06-26 18:32",
    amount: 90.0,
  },
  {
    id: 4,
    type: "邀请好友奖励",
    time: "2026-06-25 11:15",
    amount: 30.0,
  },
];
