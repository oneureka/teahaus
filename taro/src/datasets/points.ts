export interface PointTransaction {
  id: string;
  accountId: string;
  balanceAfter: number;
  type: string;
  points: number;
  orderId: string | null;
  createdAt: string;
}

export const pointTransactions: PointTransaction[] = [
  {
    id: "cmrnmjnua0000t2e9s14xiaki",
    accountId: "cmrnmeevd0000mte9p4ejqzhc",
    balanceAfter: 500,
    type: "EARN",
    points: 500,
    orderId: null,
    createdAt: "2026-07-16T14:48:44.146Z",
  },
  {
    id: "cmrnmjq6i0001t2e9o7x28hol",
    accountId: "cmrnmeevd0000mte9p4ejqzhc",
    balanceAfter: 388,
    type: "BURN",
    points: -112,
    orderId: null,
    createdAt: "2026-07-16T14:48:47.178Z",
  },
  {
    id: "cmrnmjrig0002t2e9js7g1fp2",
    accountId: "cmrnmeevd0000mte9p4ejqzhc",
    balanceAfter: 588,
    type: "EARN",
    points: 200,
    orderId: null,
    createdAt: "2026-07-16T14:48:48.904Z",
  },
  {
    id: "cmrnmjtr10003t2e9npg43mnt",
    accountId: "cmrnmeevd0000mte9p4ejqzhc",
    balanceAfter: 523,
    type: "BURN",
    points: -65,
    orderId: null,
    createdAt: "2026-07-16T14:48:51.805Z",
  },
  {
    id: "cmrnmjv1r0004t2e9awt4yrdx",
    accountId: "cmrnmeevd0000mte9p4ejqzhc",
    balanceAfter: 543,
    type: "EARN",
    points: 20,
    orderId: null,
    createdAt: "2026-07-16T14:48:53.487Z",
  },
  {
    id: "cmrnmjw9n0005t2e9x7ne87wr",
    accountId: "cmrnmeevd0000mte9p4ejqzhc",
    balanceAfter: 3043,
    type: "EARN",
    points: 2500,
    orderId: null,
    createdAt: "2026-07-16T14:48:55.067Z",
  },
  {
    id: "cmrnmjz000006t2e9ep3ezge2",
    accountId: "cmrnmeevd0000mte9p4ejqzhc",
    balanceAfter: 2560,
    type: "BURN",
    points: -483,
    orderId: null,
    createdAt: "2026-07-16T14:48:58.608Z",
  },
];
