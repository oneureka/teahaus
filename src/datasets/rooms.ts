export interface Room {
  id: string
  spaceId: string
  name: string
  price: number
  description: string
  sortOrder: number
}

export const roomList: Room[] = [
  {
    id: 'cmrnjdx7f00005me96c43msh4',
    spaceId: 'cmrnipkl10000obe9w860hukt',
    name: '钢琴雅室',
    price: 128,
    description: '配备复古钢琴的海景雅间，可一边品茗一边弹奏',
    sortOrder: 0
  },
  {
    id: 'cmrnjdy9x00015me9lbsj4txr',
    spaceId: 'cmrnipkl10000obe9w860hukt',
    name: '日光岩阁',
    price: 98,
    description: '可远眺日光岩的舒适茶室，落地窗采光极佳',
    sortOrder: 1
  },
  {
    id: 'cmrnjdzbt00025me9ft6ktu4c',
    spaceId: 'cmrniploo0001obe91snjg8vw',
    name: '禅意居',
    price: 88,
    description: '素雅禅意空间，竹帘蒲团，焚香品茗',
    sortOrder: 0
  },
  {
    id: 'cmrnje0s200035me9lgg1ky8q',
    spaceId: 'cmrniploo0001obe91snjg8vw',
    name: '素心阁',
    price: 68,
    description: '简洁明亮的茶室，适合独处静思',
    sortOrder: 1
  },
  {
    id: 'cmrnje2jj00045me9qa0hvcgo',
    spaceId: 'cmrnipn3f0002obe9lddjcxc4',
    name: '清风阁',
    price: 58,
    description: '文艺清新单人茶室，面朝庭院花园',
    sortOrder: 0
  },
  {
    id: 'cmrnje3nt00055me9e4hcz416',
    spaceId: 'cmrnipohw0003obe94jkqojbo',
    name: '观澜厅',
    price: 128,
    description: '一线海景大茶室，180度落地窗直面台湾海峡',
    sortOrder: 0
  },
  {
    id: 'cmrnje5d800065me9pzckx2jx',
    spaceId: 'cmrnipohw0003obe94jkqojbo',
    name: '听涛阁',
    price: 98,
    description: '侧海景双人雅间，适合两人对饮',
    sortOrder: 1
  },
  {
    id: 'cmrnje72700075me93wnamfx6',
    spaceId: 'cmrnippx10004obe9pwwpy8cl',
    name: '旧时光',
    price: 68,
    description: '复古风格茶室，老物件装饰，充满怀旧气息',
    sortOrder: 0
  },
  {
    id: 'cmrnje8gl00085me9cyei4gpo',
    spaceId: 'cmrniprn90005obe9fix1utvy',
    name: '南薰居',
    price: 68,
    description: '面朝龙舟池的雅室，嘉庚建筑风格',
    sortOrder: 0
  },
  {
    id: 'cmrnje9i800095me9y8rv5d3p',
    spaceId: 'cmrniprn90005obe9fix1utvy',
    name: '延平阁',
    price: 48,
    description: '安静阅读茶室，适合读书学习',
    sortOrder: 1
  },
  {
    id: 'cmrnjeavg000a5me9ao0mistp',
    spaceId: 'cmrnipspb0006obe9wauvfjev',
    name: '梧桐秋语',
    price: 98,
    description: '秋景观山茶室，窗外梧桐成林',
    sortOrder: 0
  },
  {
    id: 'cmrnjecbj000b5me9qmpnwpgs',
    spaceId: 'cmrnipspb0006obe9wauvfjev',
    name: '山居静舍',
    price: 78,
    description: '静谧山景单间，可听鸟鸣山风',
    sortOrder: 1
  },
  {
    id: 'cmrnjee0o000c5me9vgstwc4n',
    spaceId: 'cmrnipu1f0007obe98xeua9yz',
    name: '创意空间',
    price: 88,
    description: '艺术主题茶室，定期更换艺术家作品',
    sortOrder: 0
  },
  {
    id: 'cmrnjefeh000d5me9mokpbcph',
    spaceId: 'cmrnipvjc0008obe9dlvcyoon',
    name: '骑楼旧梦',
    price: 68,
    description: '骑楼风情主题房，窗外是小公园骑楼群',
    sortOrder: 0
  },
  {
    id: 'cmrnjeh3x000e5me98lift6dv',
    spaceId: 'cmrnipvjc0008obe9dlvcyoon',
    name: '潮韵茶香',
    price: 58,
    description: '潮汕工夫茶体验房，配备全套工夫茶具',
    sortOrder: 1
  },
  {
    id: 'cmrnjeih3000f5me9y6fqdupm',
    spaceId: 'cmrnipvjc0008obe9dlvcyoon',
    name: '老街时光',
    price: 48,
    description: '怀旧街景茶室，适合独坐看老街人来人往',
    sortOrder: 2
  },
  {
    id: 'cmrnjejl1000g5me9e0b797xj',
    spaceId: 'cmrnipvjc0008obe9dlvcyoon',
    name: '工夫茶道',
    price: 88,
    description: '专业工夫茶道房，由茶艺师驻场服务',
    sortOrder: 3
  },
  {
    id: 'cmrnjekmw000h5me9alde913t',
    spaceId: 'cmrnipvjc0008obe9dlvcyoon',
    name: '小公园景',
    price: 78,
    description: '正对小公园中山纪念亭景观房',
    sortOrder: 4
  },
  {
    id: 'cmrnjemcg000i5me97a563xp9',
    spaceId: 'cmrnipvjc0008obe9dlvcyoon',
    name: '潮汕人家',
    price: 38,
    description: '温馨家庭茶室，配备潮汕传统家居',
    sortOrder: 5
  },
  {
    id: 'cmrnjenqj000j5me94ahiagoq',
    spaceId: 'cmrnipwoy0009obe9s8y5wczr',
    name: '听海阁',
    price: 88,
    description: '无敌海景茶室，阳台直对青澳湾',
    sortOrder: 0
  },
  {
    id: 'cmrnjep5a000k5me9b1uoqagy',
    spaceId: 'cmrnipz4t000aobe96be9pr2h',
    name: '牌坊雅居',
    price: 68,
    description: '牌坊街景观房，可俯瞰古城的青瓦屋顶',
    sortOrder: 0
  },
  {
    id: 'cmrnjeqj9000l5me9tfjrkfa3',
    spaceId: 'cmrnipz4t000aobe96be9pr2h',
    name: '韩江观澜',
    price: 58,
    description: '临江茶室，推窗见韩江与广济桥',
    sortOrder: 1
  },
  {
    id: 'cmrnjerkn000m5me94e38ezbx',
    spaceId: 'cmrniq0kd000bobe9jibhhrv2',
    name: '水谣听风',
    price: 78,
    description: '临水茶室，窗外古榕苍苍，溪水潺潺',
    sortOrder: 0
  },
  {
    id: 'cmrnjesyc000n5me9kilocg9j',
    spaceId: 'cmrniq0kd000bobe9jibhhrv2',
    name: '土楼人家',
    price: 58,
    description: '土楼风格茶室，感受客家围屋文化',
    sortOrder: 1
  },
  {
    id: 'cmrnjeuz8000o5me9gjszklia',
    spaceId: 'cmrniq1mm000cobe9lbcjgqs0',
    name: '太清雅室',
    price: 88,
    description: '山海景观茶室，面朝大海背靠青山',
    sortOrder: 0
  },
  {
    id: 'cmrnjewnw000p5me99siwmr2b',
    spaceId: 'cmrniq1mm000cobe9lbcjgqs0',
    name: '巨峰云阁',
    price: 68,
    description: '高山云雾茶室，坐看云卷云舒',
    sortOrder: 1
  },
  {
    id: 'cmrnjey1a000q5me9kcchjiva',
    spaceId: 'cmrniq2pg000dobe9sxa1eot5',
    name: '茉莉轩',
    price: 68,
    description: '茉莉飘香古厝茶室，天井小院清幽雅致',
    sortOrder: 0
  },
  {
    id: 'cmrnjezfg000r5me99gnmu3g6',
    spaceId: 'cmrniq4fy000eobe9kzg9eyn8',
    name: '狮峰山房',
    price: 168,
    description: '明前龙井品鉴房，窗外即狮峰山茶园',
    sortOrder: 0
  },
  {
    id: 'cmrnjf0ux000s5me9pc79cqsv',
    spaceId: 'cmrniq4fy000eobe9kzg9eyn8',
    name: '九溪烟树',
    price: 128,
    description: '庭院景观茶室，私享日式枯山水庭院',
    sortOrder: 1
  },
  {
    id: 'cmrnjf2lo000t5me9spr1ttii',
    spaceId: 'cmrniq5w9000fobe96ep6hdgw',
    name: '老君岩居',
    price: 68,
    description: '近观老君岩的茶室，感受道家文化',
    sortOrder: 0
  },
  {
    id: 'cmrnjf3nl000u5me9a1e5fknn',
    spaceId: 'cmrniq5w9000fobe96ep6hdgw',
    name: '天湖云阁',
    price: 58,
    description: '天湖畔的茶室，湖光山色尽收眼底',
    sortOrder: 1
  }
]
