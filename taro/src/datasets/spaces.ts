export interface Space {
  id: number;
  name: string;
  image: string;
  businessHours: string;
  address: string;
  district: string;
  distance: string;
  distanceValue: number;
  rating: number;
  reviewCount: number;
  minPrice: number;
  tags: string[];
  category: string;
  isFeatured: boolean;
  popularity: number;
}

export interface SpaceDetail {
  id: number;
  name: string;
  image: string;
  businessHours: string;
  address: string;
  district: string;
  phone: string;
  rating: number;
  reviewCount: number;
  tags: string[];
  facilities: string[];
  isFeatured: boolean;
}

export interface Room {
  id: number;
  name: string;
  capacity: number;
  price: number;
}

export const spaceList: Space[] = [
  {
    id: 1,
    name: "栖闲茶室·南京西路写字楼店",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    businessHours: "24 小时营业",
    address: "上海市静安区南京西路1266号恒隆广场2座18楼",
    district: "静安区",
    distance: "0.6km",
    distanceValue: 0.6,
    rating: 4.9,
    reviewCount: 1032,
    minPrice: 45,
    tags: ["24h自助", "商务洽谈", "近地铁"],
    category: "business",
    isFeatured: true,
    popularity: 96,
  },
  {
    id: 2,
    name: "半日闲·武康路社区店",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=300&fit=crop",
    businessHours: "08:00 - 24:00",
    address: "上海市徐汇区武康路210弄5号2楼",
    district: "徐汇区",
    distance: "2.1km",
    distanceValue: 2.1,
    rating: 4.8,
    reviewCount: 786,
    minPrice: 52,
    tags: ["安静私密", "闺蜜聚会", "老洋房"],
    category: "artistic",
    isFeatured: true,
    popularity: 90,
  },
  {
    id: 3,
    name: "一盏共享茶室·田子坊店",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=300&fit=crop",
    businessHours: "24 小时营业",
    address: "上海市黄浦区泰康路248弄3号楼4层",
    district: "黄浦区",
    distance: "3.4km",
    distanceValue: 3.4,
    rating: 4.6,
    reviewCount: 458,
    minPrice: 38,
    tags: ["棋牌桌游", "平价实惠", "24h自助"],
    category: "heritage",
    isFeatured: false,
    popularity: 82,
  },
  {
    id: 4,
    name: "云间茶隅·陆家嘴环球店",
    image: "https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?w=400&h=300&fit=crop",
    businessHours: "24 小时营业",
    address: "上海市浦东新区世纪大道100号环球金融中心56楼",
    district: "浦东新区",
    distance: "4.3km",
    distanceValue: 4.3,
    rating: 4.8,
    reviewCount: 694,
    minPrice: 68,
    tags: ["投影会议", "商务洽谈", "CBD"],
    category: "business",
    isFeatured: true,
    popularity: 88,
  },
  {
    id: 5,
    name: "拾光茶室·徐家汇地铁店",
    image: "https://images.unsplash.com/photo-1578496480157-3d14f496689b?w=400&h=300&fit=crop",
    businessHours: "07:30 - 23:30",
    address: "上海市徐汇区漕溪北路88号圣爱大厦12楼",
    district: "徐汇区",
    distance: "5.2km",
    distanceValue: 5.2,
    rating: 4.7,
    reviewCount: 540,
    minPrice: 42,
    tags: ["近地铁", "自习办公", "24h自助"],
    category: "metro",
    isFeatured: false,
    popularity: 78,
  },
  {
    id: 6,
    name: "叙茶·新天地聚会店",
    image: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=400&h=300&fit=crop",
    businessHours: "09:00 - 24:00",
    address: "上海市黄浦区马当路245号新天地企业天地1号楼9层",
    district: "黄浦区",
    distance: "2.6km",
    distanceValue: 2.6,
    rating: 4.7,
    reviewCount: 612,
    minPrice: 48,
    tags: ["朋友聚会", "雅致", "近地铁"],
    category: "elegant",
    isFeatured: false,
    popularity: 80,
  },
];

export const spaceDetail: SpaceDetail = {
  id: 1,
  name: "栖闲茶室·南京西路写字楼店",
  image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
  businessHours: "24 小时营业",
  address: "上海市静安区南京西路1266号恒隆广场2座18楼",
  district: "静安区",
  phone: "400-820-6688",
  rating: 4.9,
  reviewCount: 1032,
  tags: ["24h自助", "商务洽谈", "近地铁"],
  facilities: ["高速WiFi", "独立空调", "投影仪", "自助茶饮", "电子门锁", "充电插座"],
  isFeatured: true,
};

export const roomList: Room[] = [
  { id: 1, name: "小叙间（3-4 人）", capacity: 4, price: 45 },
  { id: 2, name: "会客厅（6-8 人）", capacity: 8, price: 68 },
  { id: 3, name: "会议包厢（10-12 人）", capacity: 12, price: 98 },
];
