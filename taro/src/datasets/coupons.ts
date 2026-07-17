export enum CouponStatus {
  ALL = 0,
  NEW = 1,
  EXPIRING = 2,
  USED = 3,
}

export interface Coupon {
  id: number;
  name: string;
  value: number;
  description: string;
  conditions: string;
  expireDate: string;
  status: CouponStatus;
}

export const couponList: Coupon[] = [
  {
    id: 1,
    name: "新人礼包",
    value: 20,
    description: "满 50 减 20 茶饮券",
    conditions: "单笔订单满 50 元可用",
    expireDate: "2026-09-01",
    status: CouponStatus.NEW,
  },
  {
    id: 2,
    name: "周末特惠",
    value: 15,
    description: "周末专用茶饮券",
    conditions: "周六日全天可用，不限金额",
    expireDate: "2026-05-01",
    status: CouponStatus.NEW,
  },
  {
    id: 3,
    name: "生日礼券",
    value: 30,
    description: "生日当天免单券",
    conditions: "生日当天可用，需本人身份证验证",
    expireDate: "2026-10-01",
    status: CouponStatus.USED,
  },
];
