export interface FaqItem {
  question: string
  answer: string
  expanded: boolean
}

export const faqList: FaqItem[] = [
  {
    question: '到店后怎么进入茶室？',
    answer:
      '预订成功后小程序会生成一个专属二维码，到店在包厢门口的智能门锁上扫码即可开门。进门后水电、空调会自动开启，全程无需人工接待。',
    expanded: false
  },
  {
    question: '茶室是按什么方式收费的？',
    answer:
      '按小时计费，不同房型单价不同（当前 45~98 元/时），下单时选择时长即可，费用一目了然，没有其他隐形消费。',
    expanded: false
  },
  {
    question: '使用时间快到了可以续费吗？',
    answer:
      '可以。到期前 15 分钟系统会发送提醒，您可在小程序上一键续费；若未续费，到点后会自动断电结束，请留意保管好随身物品。',
    expanded: false
  },
  {
    question: '可以修改或取消预订吗？',
    answer:
      '在订单页面可申请改期或取消。使用开始前 2 小时可免费取消并原路退款，2 小时内取消将收取部分手续费。',
    expanded: false
  },
  {
    question: '茶室是 24 小时营业的吗？',
    answer:
      '大部分门店支持 7×24 小时自助预约使用，少数门店有营业时间限制，具体以每家门店详情页显示的营业时间为准。',
    expanded: false
  },
  {
    question: '可以自带茶叶或食物吗？',
    answer:
      '每间茶室都配有茶具和基础茶包，也可在大厅自助选购茶叶。欢迎自带茶叶冲泡；如需聚会用餐，请保持环境整洁并将垃圾带走。',
    expanded: false
  }
]
