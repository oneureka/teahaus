export interface Transaction {
  id: string;
  walletId: string;
  balanceBefore: number;
  balanceAfter: number;
  amount: number;
  type: string;
  orderId: string | null;
  createdAt: string;
}

export const transactionList: Transaction[] = [
  {
    id: "cmrnmbfyf0000ixe9erv42dqi",
    walletId: "cmrnm43ng0000bbe9y2gkgcof",
    balanceBefore: 0,
    balanceAfter: 200,
    amount: 200,
    type: "RECHARGE",
    orderId: null,
    createdAt: "2026-05-28T01:00:00.000Z",
  },
  {
    id: "cmrnmbhtb0001ixe9ln85v9rd",
    walletId: "cmrnm43ng0000bbe9y2gkgcof",
    balanceBefore: 200,
    balanceAfter: -56,
    amount: -256,
    type: "PAYMENT",
    orderId: null,
    createdAt: "2026-06-01T06:00:00.000Z",
  },
  {
    id: "cmrnmbjgi0002ixe9tkpu9tw9",
    walletId: "cmrnm43ng0000bbe9y2gkgcof",
    balanceBefore: -56,
    balanceAfter: 244,
    amount: 300,
    type: "RECHARGE",
    orderId: null,
    createdAt: "2026-06-02T02:00:00.000Z",
  },
  {
    id: "cmrnmbl3w0003ixe98od3xc0u",
    walletId: "cmrnm43ng0000bbe9y2gkgcof",
    balanceBefore: 244,
    balanceAfter: 68,
    amount: -176,
    type: "PAYMENT",
    orderId: null,
    createdAt: "2026-06-02T04:00:00.000Z",
  },
  {
    id: "cmrnmbmeq0004ixe9g5ds20oz",
    walletId: "cmrnm43ng0000bbe9y2gkgcof",
    balanceBefore: 68,
    balanceAfter: 128.5,
    amount: 60.5,
    type: "REWARD",
    orderId: null,
    createdAt: "2026-06-05T03:30:00.000Z",
  },
];
