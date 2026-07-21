import type { OrderStatus } from "@/datasets/orders";
import { spaceList } from "@/datasets/spaces";
import { roomList } from "@/datasets/rooms";

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

export function getSpaceName(spaceId: string): string {
  const space = spaceList.find((s) => s.id === spaceId);
  return space?.name ?? "未知空间";
}

export function getRoomName(roomId: string): string {
  const room = roomList.find((r) => r.id === roomId);
  return room?.name ?? "未知房间";
}
