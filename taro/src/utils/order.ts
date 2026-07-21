import type { OrderStatus } from "@/datasets/orders";

const LABEL_MAP: Record<OrderStatus, string> = {
  UNPAID: "未支付",
  PAID: "已支付",
  IN_PROGRESS: "进行中",
  COMPLETED: "已完成",
  CANCELLED: "已取消",
};

export function statusLabel(status: OrderStatus): string {
  return LABEL_MAP[status];
}
