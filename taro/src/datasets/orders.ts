export enum OrderStatus {
  ALL = 0,
  UNPAID = 1,
  IN_PROGRESS = 2,
  COMPLETED = 3,
}

export interface Order {
  id: string;
  status: OrderStatus;
  time: string;
  price: string;
  statusText: string;
  roomName: string;
  reserveTime: string;
  room: string;
}

export const orderList: Order[] = [
  {
    id: "202606280001",
    status: OrderStatus.UNPAID,
    time: "2026-06-28 10:12",
    price: "100.00",
    statusText: "未支付",
    roomName: "小叙间",
    room: "3-4 人小包",
    reserveTime: "06-29 14:00-16:00",
  },
  {
    id: "202606280002",
    status: OrderStatus.IN_PROGRESS,
    time: "2026-06-28 09:40",
    price: "136.00",
    statusText: "进行中",
    roomName: "会客厅",
    room: "6-8 人中包",
    reserveTime: "06-28 09:00-11:00",
  },
  {
    id: "202606270003",
    status: OrderStatus.COMPLETED,
    time: "2026-06-27 15:05",
    price: "90.00",
    statusText: "已完成",
    roomName: "小叙间",
    room: "3-4 人小包",
    reserveTime: "06-27 15:00-17:00",
  },
  {
    id: "202606270004",
    status: OrderStatus.UNPAID,
    time: "2026-06-27 12:20",
    price: "196.00",
    statusText: "未支付",
    roomName: "会议包厢",
    room: "10-12 人会议室",
    reserveTime: "06-29 19:00-21:00",
  },
  {
    id: "202606260005",
    status: OrderStatus.COMPLETED,
    time: "2026-06-26 13:50",
    price: "204.00",
    statusText: "已完成",
    roomName: "会客厅",
    room: "6-8 人中包",
    reserveTime: "06-26 14:00-17:00",
  },
];
