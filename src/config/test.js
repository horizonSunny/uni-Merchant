let diseasesHistory = [
  {
    name: '过往病史',
    id: '0',
    status: 0,
    diseases: [
      '糖',
      '恶性肿瘤',
      '心脏病',
      '糖尿病',
      '恶性肿瘤',
      '心脏病',
      '糖尿病',
      '恶性肿瘤',
      '心脏病'
    ]
  },
  {
    name: '过敏史',
    id: '1',
    status: 0,
    diseases: ['过敏史病', '恶性肿瘤', '心脏病']
  },
  {
    name: '家族病史',
    id: '2',
    status: 0,
    diseases: ['家族病史', '恶性肿瘤', '心脏病']
  },
  {
    name: '肾功能',
    id: '3',
    status: 0,
    diseases: ['肾功能', '恶性肿瘤', '心脏病']
  },
  {
    name: '肝功能',
    id: '4',
    status: 1,
    diseases: ['肝功能', '恶性肿瘤', '心脏病']
  }
]
let browsingHistory = [
  {
    time: '2019-01-08',
    product: [
      {
        imgSrc: '',
        productName: '商品品牌 通用名',
        specification: '20mlX48支/盒',
        price: '232.00'
      },
      {
        imgSrc: '',
        productName: '商品品牌 通用名',
        specification: '20mlX48支/盒',
        price: '232.00'
      },
      {
        imgSrc: '',
        productName: '商品品牌 通用名',
        specification: '20mlX48支/盒',
        price: '232.00'
      }
    ]
  },
  {
    time: '2019-01-23',
    product: [
      {
        imgSrc: '',
        productName: '商品品牌 通用名',
        specification: '20mlX48支/盒',
        price: '232.00'
      },
      {
        imgSrc: '',
        productName: '商品品牌 通用名',
        specification: '20mlX48支/盒',
        price: '232.00'
      },
      {
        imgSrc: '',
        productName: '商品品牌 通用名',
        specification: '20mlX48支/盒',
        price: '232.00'
      }
    ]
  },
  {
    time: '2019-01-15',
    product: [
      {
        imgSrc: '',
        productName: '商品品牌 通用名',
        specification: '20mlX48支/盒',
        price: '232.00'
      },
      {
        imgSrc: '',
        productName: '商品品牌 通用名',
        specification: '20mlX48支/盒',
        price: '232.00'
      },
      {
        imgSrc: '',
        productName: '商品品牌 通用名',
        specification: '20mlX48支/盒',
        price: '232.00'
      }
    ]
  }
]
let collect = [
  {
    imgSrc: '',
    productName: '商品品牌 通用名',
    specification: '20mlX48支/盒',
    price: '232.00'
  },
  {
    imgSrc: '',
    productName: '商品品牌 通用名',
    specification: '20mlX48支/盒',
    price: '232.00'
  },
  {
    imgSrc: '',
    productName: '商品品牌 通用名',
    specification: '20mlX48支/盒',
    price: '232.00'
  },
  {
    imgSrc: '',
    productName: '商品品牌 通用名',
    specification: '20mlX48支/盒',
    price: '232.00'
  },
  {
    imgSrc: '',
    productName: '商品品牌 通用名',
    specification: '20mlX48支/盒',
    price: '232.00'
  },
  {
    imgSrc: '',
    productName: '商品品牌 通用名',
    specification: '20mlX48支/盒',
    price: '232.00'
  },
  {
    imgSrc: '',
    productName: '商品品牌 通用名',
    specification: '20mlX48支/盒',
    price: '232.00'
  },
  {
    imgSrc: '',
    productName: '商品品牌 通用名',
    specification: '20mlX48支/盒',
    price: '232.00'
  },
  {
    imgSrc: '',
    productName: '商品品牌 通用名',
    specification: '20mlX48支/盒',
    price: '232.00'
  }
]
// 订单假数据
let myIndent = [
  {
    orderNumber: '091238729778778',
    orderStatus: 0,
    amount: 3,
    totalPrice: '464.00',
    prodcutInfo: [
      {
        imgSrc: '',
        productName: '商品品牌 通用名',
        specification: '20mlX48支/盒',
        price: '232.00'
      },
      {
        imgSrc: '',
        productName: '商品品牌 通用名',
        specification: '20mlX48支/盒',
        price: '232.00'
      },
      {
        imgSrc: '',
        productName: '商品品牌 通用名',
        specification: '20mlX48支/盒',
        price: '232.00'
      }
    ]
  },
  {
    orderNumber: '091238729778778',
    orderStatus: 0,
    amount: 3,
    totalPrice: '464.00',
    prodcutInfo: [
      {
        imgSrc: '',
        productName: '商品品牌 通用名',
        specification: '20mlX48支/盒',
        price: '232.00'
      },
      {
        imgSrc: '',
        productName: '商品品牌 通用名',
        specification: '20mlX48支/盒',
        price: '232.00'
      },
      {
        imgSrc: '',
        productName: '商品品牌 通用名',
        specification: '20mlX48支/盒',
        price: '232.00'
      }
    ]
  },
  {
    orderNumber: '091238729778778',
    orderStatus: 0,
    amount: 3,
    totalPrice: '464.00',
    prodcutInfo: [
      {
        imgSrc: '',
        productName: '商品品牌 通用名',
        specification: '20mlX48支/盒',
        price: '232.00'
      },
      {
        imgSrc: '',
        productName: '商品品牌 通用名',
        specification: '20mlX48支/盒',
        price: '232.00'
      },
      {
        imgSrc: '',
        productName: '商品品牌 通用名',
        specification: '20mlX48支/盒',
        price: '232.00'
      }
    ]
  }
]
export { diseasesHistory, browsingHistory, collect, myIndent }
