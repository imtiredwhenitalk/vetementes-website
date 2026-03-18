export interface Product {
  id: number
  name: string
  category: string
  price: number
  originalPrice?: number
  image: string
  hoverImage: string
  badge?: string
  description: string
  sizes: string[]
  colors: { name: string; hex: string }[]
  isNew?: boolean
  isSale?: boolean
}

export const products: Product[] = [
  {
    id: 1,
    name: "Oversized Logo Hoodie",
    category: "Hoodies",
    price: 890,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=750&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1578768079470-4e0e22c4fa9c?w=600&h=750&fit=crop",
    badge: "BESTSELLER",
    description: "Наш іконічний оверсайз худі з вишитим логотипом VETEMENTES. Преміум бавовна 400gsm.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Чорний", hex: "#0a0a0a" },
      { name: "Сірий", hex: "#4a4a4a" },
      { name: "Слонова кістка", hex: "#f5f0e8" },
      { name: "Темно-синій", hex: "#1a1a3e" },
      { name: "Оливковий", hex: "#556b2f" }
    ],
    isNew: true
  },
  {
    id: 2,
    name: "Deconstructed Blazer",
    category: "Верхній одяг",
    price: 1450,
    originalPrice: 1890,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=750&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1608063615781-e2ef8c73d114?w=600&h=750&fit=crop",
    badge: "SALE",
    description: "Деконструйований блейзер з асиметричним кроєм. Італійська вовна.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Чорний", hex: "#0a0a0a" },
      { name: "Темно-синій", hex: "#1a1a3e" },
      { name: "Коричневий", hex: "#4a3a2a" }
    ],
    isSale: true
  },
  {
    id: 3,
    name: "Distressed Wide Jeans",
    category: "Штани",
    price: 720,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=750&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&h=750&fit=crop",
    description: "Широкі джинси з ефектом потертості. Японський денім 14oz.",
    sizes: ["28", "30", "32", "34", "36"],
    colors: [
      { name: "Washed Blue", hex: "#5c7a99" },
      { name: "Чорний", hex: "#0a0a0a" },
      { name: "Світло-синій", hex: "#8bb4d9" },
      { name: "Темний деним", hex: "#2e4a62" }
    ],
    isNew: true
  },
  {
    id: 4,
    name: "Graphic Print Tee",
    category: "Футболки",
    price: 390,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=750&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&h=750&fit=crop",
    description: "Футболка з ексклюзивним принтом. 100% органічна бавовна.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Білий", hex: "#ffffff" },
      { name: "Чорний", hex: "#0a0a0a" },
      { name: "Пісочний", hex: "#c4a882" },
      { name: "Сірий", hex: "#808080" },
      { name: "Темно-зелений", hex: "#2d5016" }
    ]
  },
  {
    id: 5,
    name: "Leather Cargo Pants",
    category: "Штани",
    price: 1680,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=750&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&h=750&fit=crop",
    badge: "EXCLUSIVE",
    description: "Карго штани з преміум еко-шкіри. Лімітована колекція SS26.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Чорний", hex: "#0a0a0a" },
      { name: "Коричневий", hex: "#4a3a2a" }
    ],
    isNew: true
  },
  {
    id: 6,
    name: "Cropped Puffer Jacket",
    category: "Верхній одяг",
    price: 1290,
    image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&h=750&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=750&fit=crop",
    description: "Укорочена пуховка з матового нейлону. Гусячий пух 800 fill power.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Чорний", hex: "#0a0a0a" },
      { name: "Олива", hex: "#556b2f" },
      { name: "Крем", hex: "#f5f0e0" },
      { name: "Темно-сірий", hex: "#3a3a3a" },
      { name: "Бордо", hex: "#6b1423" }
    ]
  },
  {
    id: 7,
    name: "Knit Balaclava",
    category: "Аксесуари",
    price: 280,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=750&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=600&h=750&fit=crop",
    badge: "TRENDING",
    description: "В'язана балаклава з мериносової вовни. Логотип VETEMENTES.",
    sizes: ["ONE SIZE"],
    colors: [
      { name: "Чорний", hex: "#0a0a0a" },
      { name: "Сірий", hex: "#808080" },
      { name: "Бежевий", hex: "#c8b896" }
    ]
  },
  {
    id: 8,
    name: "Chain Link Necklace",
    category: "Аксесуари",
    price: 520,
    originalPrice: 680,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=750&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=600&h=750&fit=crop",
    badge: "SALE",
    description: "Масивний ланцюг з нержавіючої сталі. Позолота 18k.",
    sizes: ["50cm", "60cm"],
    colors: [
      { name: "Золото", hex: "#c8a96e" },
      { name: "Срібло", hex: "#c0c0c0" }
    ],
    isSale: true
  },
  {
    id: 9,
    name: "Tactical Vest",
    category: "Верхній одяг",
    price: 980,
    image: "https://images.unsplash.com/photo-1559582798-678dfc68ccd8?w=600&h=750&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=600&h=750&fit=crop",
    description: "Тактичний жилет з множинними кишенями. Ripstop нейлон.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Чорний", hex: "#0a0a0a" },
      { name: "Хакі", hex: "#8b7355" }
    ],
    isNew: true
  },
  {
    id: 10,
    name: "Embroidered Sweatpants",
    category: "Штани",
    price: 590,
    image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600&h=750&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1580906853305-2e542f1f0dce?w=600&h=750&fit=crop",
    description: "Джоґери з вишивкою по всій довжині. Французька махра 360gsm.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Чорний", hex: "#0a0a0a" },
      { name: "Сірий меланж", hex: "#9e9e9e" }
    ]
  },
  {
    id: 11,
    name: "Mesh Layering Top",
    category: "Футболки",
    price: 340,
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&h=750&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=600&h=750&fit=crop",
    description: "Прозорий меш-топ для лейерінгу. Поліамід/еластан.",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Чорний", hex: "#0a0a0a" },
      { name: "Білий", hex: "#ffffff" }
    ]
  },
  {
    id: 12,
    name: "Double Zip Boots",
    category: "Взуття",
    price: 1890,
    image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&h=750&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1605812860427-4024433a70fd?w=600&h=750&fit=crop",
    badge: "NEW DROP",
    description: "Черевики з подвійною блискавкою. Натуральна шкіра, вібрам підошва.",
    sizes: ["39", "40", "41", "42", "43", "44", "45"],
    colors: [
      { name: "Чорний", hex: "#0a0a0a" }
    ],
    isNew: true
  },
  {
    id: 13,
    name: "Oversized Denim Jacket",
    category: "Верхній одяг",
    price: 1150,
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&h=750&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1548126032-079a0fb0099d?w=600&h=750&fit=crop",
    badge: "NEW",
    description: "Оверсайз денімова куртка з вінтажним wash ефектом. Підкладка з органічної бавовни.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Індиго", hex: "#3f51b5" },
      { name: "Washed Black", hex: "#2c2c2c" }
    ],
    isNew: true
  },
  {
    id: 14,
    name: "Logo Tape Track Pants",
    category: "Штани",
    price: 680,
    image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&h=750&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1515664069236-68a74a229389?w=600&h=750&fit=crop",
    description: "Спортивні штани з логотип-стрічкою по боках. Технічний поліестер.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Чорний", hex: "#0a0a0a" },
      { name: "Темно-синій", hex: "#1a237e" },
      { name: "Червоний", hex: "#b71c1c" }
    ]
  },
  {
    id: 15,
    name: "Reversible Bomber",
    category: "Верхній одяг",
    price: 1380,
    originalPrice: 1750,
    image: "https://images.unsplash.com/photo-1520975954732-35dd22299614?w=600&h=750&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1544441893-675973e31985?w=600&h=750&fit=crop",
    badge: "SALE",
    description: "Двостороння куртка-бомбер. Сатинова сторона / нейлонова сторона.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Чорний/Золото", hex: "#0a0a0a" },
      { name: "Олива/Чорний", hex: "#556b2f" }
    ],
    isSale: true
  },
  {
    id: 16,
    name: "Destroyed Logo Tee",
    category: "Футболки",
    price: 420,
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&h=750&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=600&h=750&fit=crop",
    badge: "HOT",
    description: "Футболка з ефектом 'destroyed'. Вільний крій, принт VETEMENTES спереду та ззаду.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Чорний", hex: "#0a0a0a" },
      { name: "Білий", hex: "#ffffff" },
      { name: "Vintage Grey", hex: "#7a7a7a" }
    ],
    isNew: true
  },
  {
    id: 17,
    name: "Padded Scarf",
    category: "Аксесуари",
    price: 350,
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&h=750&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1609803384069-19f3e5a70e75?w=600&h=750&fit=crop",
    description: "Дутий шарф з логотипом. Водовідштовхувальний нейлон, пухове наповнення.",
    sizes: ["ONE SIZE"],
    colors: [
      { name: "Чорний", hex: "#0a0a0a" },
      { name: "Бежевий", hex: "#d4c5a9" },
      { name: "Зелений", hex: "#2e7d32" }
    ]
  },
  {
    id: 18,
    name: "Platform Chelsea Boots",
    category: "Взуття",
    price: 1450,
    image: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=600&h=750&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=600&h=750&fit=crop",
    description: "Челсі на масивній платформі. Натуральна шкіра, трактор підошва 6см.",
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44"],
    colors: [
      { name: "Чорний", hex: "#0a0a0a" },
      { name: "Cream", hex: "#f5e6d3" }
    ],
    isNew: true
  },
  {
    id: 19,
    name: "Zip-Up Cropped Hoodie",
    category: "Hoodies",
    price: 760,
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&h=750&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1614975059251-992f11792571?w=600&h=750&fit=crop",
    description: "Укорочене худі на блискавці з вишитим лого на спині. Heavyweight cotton 450gsm.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Washed Black", hex: "#1a1a1a" },
      { name: "Dusty Pink", hex: "#c9a0a0" },
      { name: "Sage", hex: "#8fbc8f" }
    ]
  },
  {
    id: 20,
    name: "Cargo Utility Shorts",
    category: "Штани",
    price: 520,
    image: "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=600&h=750&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600&h=750&fit=crop",
    description: "Утилітарні карго-шорти з подвійними кишенями. Рипстоп бавовна.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Чорний", hex: "#0a0a0a" },
      { name: "Хакі", hex: "#8b7355" },
      { name: "Пісочний", hex: "#c2b280" }
    ]
  },
  {
    id: 21,
    name: "Oversized Trench Coat",
    category: "Верхній одяг",
    price: 2100,
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&h=750&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=600&h=750&fit=crop",
    badge: "PREMIUM",
    description: "Оверсайз тренч з водовідштовхувальної тканини. Подвійна застібка, знімний пояс.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Бежевий", hex: "#c8b896" },
      { name: "Чорний", hex: "#0a0a0a" }
    ],
    isNew: true
  },
  {
    id: 22,
    name: "Metal Frame Sunglasses",
    category: "Аксесуари",
    price: 380,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=750&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&h=750&fit=crop",
    description: "Сонцезахисні окуляри з металевою оправою. UV400, поляризовані лінзи.",
    sizes: ["ONE SIZE"],
    colors: [
      { name: "Золото/Чорний", hex: "#c8a96e" },
      { name: "Срібло/Сірий", hex: "#c0c0c0" }
    ]
  },
  {
    id: 23,
    name: "Embossed Logo Belt",
    category: "Аксесуари",
    price: 290,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=750&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=600&h=750&fit=crop",
    description: "Шкіряний ремінь з тисненим логотипом. Італійська шкіра, важка пряжка.",
    sizes: ["85", "90", "95", "100", "105"],
    colors: [
      { name: "Чорний", hex: "#0a0a0a" },
      { name: "Коричневий", hex: "#5d4037" }
    ]
  },
  {
    id: 24,
    name: "Heavy Knit Sweater",
    category: "Hoodies",
    price: 840,
    originalPrice: 1050,
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cda3a29?w=600&h=750&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=600&h=750&fit=crop",
    badge: "SALE",
    description: "Важкий в'язаний светр з мериносової вовни. Об'ємна в'язка, оверсайз крій.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Cream", hex: "#f5f0e0" },
      { name: "Чорний", hex: "#0a0a0a" },
      { name: "Camel", hex: "#c19a6b" }
    ],
    isSale: true
  },
  {
    id: 25,
    name: "Stitched Logo Cap",
    category: "Аксесуари",
    price: 180,
    image: "https://images.unsplash.com/photo-1588850561407-ed78c334e67a?w=600&h=750&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=600&h=750&fit=crop",
    description: "Кепка з вишитим логотипом. Регульована застібка, попередньо зігнутий козирок.",
    sizes: ["ONE SIZE"],
    colors: [
      { name: "Чорний", hex: "#0a0a0a" },
      { name: "Білий", hex: "#ffffff" },
      { name: "Бежевий", hex: "#c8b896" },
      { name: "Хакі", hex: "#556b2f" }
    ]
  },
  {
    id: 26,
    name: "Sleeveless Utility Vest",
    category: "Верхній одяг",
    price: 870,
    image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=600&h=750&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=750&fit=crop",
    description: "Утілітарний жилет без рукавів з 8 кишенями. Технічний нейлон.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Чорний", hex: "#0a0a0a" },
      { name: "Олива", hex: "#556b2f" }
    ]
  },
  {
    id: 27,
    name: "Raw Hem Long Sleeve",
    category: "Футболки",
    price: 450,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=750&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1564859228273-274232fdb516?w=600&h=750&fit=crop",
    description: "Лонгслів з необробленими краями. Оверсайз fit, бавовна 280gsm.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Чорний", hex: "#0a0a0a" },
      { name: "Charcoal", hex: "#36454f" },
      { name: "Off-White", hex: "#f5f0e8" }
    ]
  },
  {
    id: 28,
    name: "Chunky Platform Sneakers",
    category: "Взуття",
    price: 950,
    image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=600&h=750&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=600&h=750&fit=crop",
    badge: "NEW",
    description: "Масивні кросівки на платформі. Нео-ретро дизайн, подвійна амортизація.",
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"],
    colors: [
      { name: "White/Black", hex: "#ffffff" },
      { name: "Triple Black", hex: "#0a0a0a" },
      { name: "Cream/Brown", hex: "#f5e6d3" }
    ],
    isNew: true
  }
]

export const categories = [
  "Все",
  "Hoodies",
  "Футболки",
  "Штани",
  "Верхній одяг",
  "Аксесуари",
  "Взуття"
]
