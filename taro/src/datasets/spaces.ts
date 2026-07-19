export interface Space {
  id: string;
  name: string;
  category: string;
  description: string;
  businessHours: string;
  address: string;
  district: string;
  lat: string;
  lng: string;
  phone: string;
  minPrice: number;
  isFeatured: boolean;
  tags: string[];
  images: string[];
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
  lat: number;
  lng: number;
}

export const spaceList: Space[] = [
  {
    id: "cmrnipkl10000obe9w860hukt",
    name: "鼓浪听涛",
    category: "海景茶舍",
    description: "坐落于鼓浪屿的百年老别墅内，面朝大海，琴声相伴。精选闽南乌龙茶，配以手作茶点，在钢琴声中度过惬意午后。",
    businessHours: "09:00 - 22:00",
    address: "厦门市思明区鼓浪屿龙头路80号",
    district: "思明区",
    lat: "24.4467086",
    lng: "118.0668666",
    phone: "0592-2068888",
    minPrice: 88,
    isFeatured: true,
    tags: [],
    images: [],
  },
  {
    id: "cmrniploo0001obe91snjg8vw",
    name: "南普陀茶苑",
    category: "禅意茶苑",
    description: "毗邻南普陀寺，依山而建。提供素雅禅意空间，精选武夷岩茶与素斋茶点，可远眺厦门大学与五老峰。",
    businessHours: "08:00 - 21:00",
    address: "厦门市思明区南普陀寺旁思明南路515号",
    district: "思明区",
    lat: "24.4463889",
    lng: "118.0877778",
    phone: "0592-2096666",
    minPrice: 68,
    isFeatured: false,
    tags: [],
    images: [],
  },
  {
    id: "cmrnipn3f0002obe9lddjcxc4",
    name: "曾厝清风",
    category: "文艺茶舍",
    description: "藏于曾厝垵文创村的清新小院，面朝大海，花香四溢。简约文艺的装修风格，适合发呆、阅读、创作。",
    businessHours: "10:00 - 22:00",
    address: "厦门市思明区曾厝垵文创村378号",
    district: "思明区",
    lat: "24.4358333",
    lng: "118.1013889",
    phone: "0592-2081122",
    minPrice: 58,
    isFeatured: false,
    tags: [],
    images: [],
  },
  {
    id: "cmrnipohw0003obe94jkqojbo",
    name: "环岛路壹号",
    category: "海景茶吧",
    description: "环岛路一线海景茶吧，落地窗直面台湾海峡。现代简约设计搭配精品茶饮，黄昏时分的日落景观绝佳。",
    businessHours: "09:00 - 23:30",
    address: "厦门市思明区环岛南路1号",
    district: "思明区",
    lat: "24.4322222",
    lng: "118.1138889",
    phone: "0592-2567788",
    minPrice: 98,
    isFeatured: true,
    tags: [],
    images: [],
  },
  {
    id: "cmrnippx10004obe9pwwpy8cl",
    name: "沙坡尾时光",
    category: "复古茶舍",
    description: "位于沙坡尾避风坞旁的老厂房改建茶舍，保留工业风原始肌理。老渔船、旧渔具点缀其间，是厦门最文艺的角落。",
    businessHours: "10:00 - 22:00",
    address: "厦门市思明区沙坡尾艺术区60号",
    district: "思明区",
    lat: "24.4441667",
    lng: "118.0805556",
    phone: "0592-2092233",
    minPrice: 68,
    isFeatured: false,
    tags: [],
    images: [],
  },
  {
    id: "cmrniprn90005obe9fix1utvy",
    name: "集美学村",
    category: "人文茶苑",
    description: "集美学村内，嘉庚建筑风格的静谧茶苑。面朝龙舟池，书香茶韵交融，是学子和文人墨客的聚集地。",
    businessHours: "09:00 - 21:00",
    address: "厦门市集美区集美学村嘉庚路88号",
    district: "集美区",
    lat: "24.5677778",
    lng: "118.0966667",
    phone: "0592-6100888",
    minPrice: 48,
    isFeatured: false,
    tags: [],
    images: [],
  },
  {
    id: "cmrnipspb0006obe9wauvfjev",
    name: "梧桐山居",
    category: "山景茶居",
    description: "梧桐山脚下的庭院茶居，被山林环绕。春季可赏杜鹃，秋季可品山果。提供山泉泡茶，清新雅致。",
    businessHours: "09:00 - 22:00",
    address: "深圳市罗湖区梧桐山风景区内",
    district: "罗湖区",
    lat: "22.5805556",
    lng: "114.2055556",
    phone: "0755-25667888",
    minPrice: 78,
    isFeatured: false,
    tags: [],
    images: [],
  },
  {
    id: "cmrnipu1f0007obe98xeua9yz",
    name: "华侨城雅集",
    category: "艺术茶吧",
    description: "华侨城创意园内的艺术茶空间，定期举办茶艺展演与文化沙龙。空间由知名设计师打造，光影与茶香交织。",
    businessHours: "10:00 - 23:00",
    address: "深圳市南山区华侨城创意园北区B10栋",
    district: "南山区",
    lat: "22.5402778",
    lng: "113.9780556",
    phone: "0755-26912233",
    minPrice: 88,
    isFeatured: true,
    tags: [],
    images: [],
  },
  {
    id: "cmrnipvjc0008obe9dlvcyoon",
    name: "小公园茶舍",
    category: "工夫茶馆",
    description: "汕头小公园开埠区骑楼群中的正宗工夫茶馆。传承潮汕工夫茶文化，提供凤凰单丛等本地茗茶，配以朥饼、腐乳饼等传统茶点。",
    businessHours: "08:00 - 23:00",
    address: "汕头市金平区小公园街区安平路38号",
    district: "金平区",
    lat: "23.3655556",
    lng: "116.7138889",
    phone: "0754-88278888",
    minPrice: 38,
    isFeatured: true,
    tags: [],
    images: [],
  },
  {
    id: "cmrnipwoy0009obe9s8y5wczr",
    name: "南澳听海",
    category: "海景茶舍",
    description: "南澳岛青澳湾畔的休闲茶舍，坐拥一线海景。吹着海风品单丛，看日出日落，是海岛度假的绝佳去处。",
    businessHours: "08:00 - 22:00",
    address: "汕头市南澳县青澳湾东角山1号",
    district: "南澳县",
    lat: "23.4219444",
    lng: "117.1191667",
    phone: "0754-89803333",
    minPrice: 68,
    isFeatured: false,
    tags: [],
    images: [],
  },
  {
    id: "cmrnipz4t000aobe96be9pr2h",
    name: "广济桥畔",
    category: "古城茶馆",
    description: "立于广济桥畔的百年老宅改建茶馆，推窗可见韩江与湘子桥。供应正宗潮州工夫茶，凤凰单丛品种齐全。",
    businessHours: "09:00 - 22:00",
    address: "潮州市湘桥区牌坊街甲第巷16号",
    district: "湘桥区",
    lat: "23.6697222",
    lng: "116.6561111",
    phone: "0768-2236888",
    minPrice: 48,
    isFeatured: false,
    tags: [],
    images: [],
  },
  {
    id: "cmrniq0kd000bobe9jibhhrv2",
    name: "云水谣居",
    category: "古镇茶舍",
    description: "云水谣古镇溪边的土楼风格茶舍，依千年古榕而建。品茗赏景，听溪水潺潺，感受土楼人家的质朴生活。",
    businessHours: "08:00 - 21:00",
    address: "漳州市南靖县云水谣古镇大水车旁",
    district: "南靖县",
    lat: "24.6172222",
    lng: "117.0566667",
    phone: "0596-7880999",
    minPrice: 58,
    isFeatured: false,
    tags: [],
    images: [],
  },
  {
    id: "cmrniq1mm000cobe9lbcjgqs0",
    name: "崂山茶苑",
    category: "山景茶苑",
    description: "崂山太清宫旁的高山茶园茶苑，面朝大海，云雾缭绕。自产崂山绿茶，以山泉水冲泡，甘甜清冽。",
    businessHours: "08:00 - 18:00",
    address: "青岛市崂山区崂山风景区太清游览区",
    district: "崂山区",
    lat: "36.0947222",
    lng: "120.6155556",
    phone: "0532-88831888",
    minPrice: 68,
    isFeatured: false,
    tags: [],
    images: [],
  },
  {
    id: "cmrniq2pg000dobe9sxa1eot5",
    name: "三坊七巷",
    category: "古厝茶舍",
    description: "福州三坊七巷明清古厝中的茉莉花茶馆，庭院深深，茉莉飘香。还原福州百年茶文化，是闹市中的一方净土。",
    businessHours: "09:00 - 22:00",
    address: "福州市鼓楼区三坊七巷南后街68号",
    district: "鼓楼区",
    lat: "26.0825000",
    lng: "119.2961111",
    phone: "0591-87850999",
    minPrice: 58,
    isFeatured: false,
    tags: [],
    images: [],
  },
  {
    id: "cmrniq4fy000eobe9kzg9eyn8",
    name: "龙井草堂",
    category: "庭院茶馆",
    description: "龙井村内的百年庭院草堂，四周茶园环绕。每年清明前后可体验手工炒茶，品鉴明前龙井，感受茶都魅力。",
    businessHours: "09:00 - 21:00",
    address: "杭州市西湖区龙井村龙井路168号",
    district: "西湖区",
    lat: "30.2202778",
    lng: "120.1172222",
    phone: "0571-87997888",
    minPrice: 128,
    isFeatured: true,
    tags: [],
    images: [],
  },
  {
    id: "cmrniq5w9000fobe96ep6hdgw",
    name: "清源茗居",
    category: "山景茶居",
    description: "清源山老君岩旁的山腰茶居，可俯瞰泉州古城。以铁观音为主打，配以闽南茶点，是感受泉州茶文化的绝佳去处。",
    businessHours: "08:00 - 21:00",
    address: "泉州市丰泽区清源山风景区老君岩旁",
    district: "丰泽区",
    lat: "24.9297222",
    lng: "118.5830556",
    phone: "0595-22792888",
    minPrice: 48,
    isFeatured: false,
    tags: [],
    images: [],
  },
];

const DEFAULT_SPACE_IMAGE =
  "https://images.unsplash.com/photo-1610375233775-6e0166927193";

const DEFAULT_FACILITIES = ["高速WiFi", "茶水", "充电宝", "停车位"];

export function getSpaceById(id: string | number): Space | undefined {
  const key = String(id);
  return spaceList.find((space) => String(space.id) === key);
}

export function getSpaceDetail(id: string | number): SpaceDetail | null {
  const space = getSpaceById(id);
  if (!space) return null;

  return {
    id: Number(space.id),
    name: space.name,
    image: space.images[0] || DEFAULT_SPACE_IMAGE,
    businessHours: space.businessHours,
    address: space.address,
    district: space.district,
    phone: space.phone,
    rating: 4.8,
    reviewCount: 128,
    tags: space.tags.length ? space.tags : [space.category],
    facilities: DEFAULT_FACILITIES,
    isFeatured: space.isFeatured,
    lat: Number(space.lat) || 0,
    lng: Number(space.lng) || 0,
  };
}



