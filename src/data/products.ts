import { Product } from "@/types";

export const products: Product[] = [
  {
    id: "p1",
    name: "Kanjeevaram Silk Saree — Peacock Zari",
    category: "Textiles & Sarees",
    price: 18500,
    originalPrice: 24000,
    rating: 4.9,
    reviewCount: 86,
    images: [
      "/images/img_product_1781291560561_0.jpg",
      "/images/img_product_1781291560561_0.jpg",
      "/images/img_product_1781291561396_2.jpg",
    ],
    artisanId: "a1",
    artisanName: "Lakshmi Devi",
    description:
      "A handwoven Kanjeevaram silk saree featuring traditional peacock motifs in pure zari thread. Woven on a pit loom over 18 days using mulberry silk sourced from Karnataka.",
    materials: ["Mulberry Silk", "Pure Zari (Gold Thread)", "Natural Dyes"],
    stock: 4,
    trending: true,
    reviews: [
      { id: "r1", author: "Priya Nair", avatar: "/images/img_avatar_1781291561717_3.jpg", rating: 5, comment: "Absolutely stunning saree, the zari work is even more beautiful in person. Worth every rupee.", date: "2026-03-12" },
      { id: "r2", author: "Anjali Rao", avatar: "/images/img_avatar_1781291562019_4.jpg", rating: 4.5, comment: "Beautiful craftsmanship, took a little longer to deliver but the quality made up for it.", date: "2026-02-28" },
    ],
  },
  {
    id: "p2",
    name: "Blue Pottery Hand-painted Vase",
    category: "Pottery & Ceramics",
    price: 2400,
    rating: 4.7,
    reviewCount: 54,
    images: [
      "/images/img_fixed_lorem_p2_0.jpg",
      "/images/img_fixed_lorem_p2_1.jpg"
    ],
    artisanId: "a2",
    artisanName: "Ramesh Prajapati",
    description:
      "Traditional Jaipur blue pottery vase, hand-thrown and painted with cobalt floral motifs using a quartz-based ceramic body unique to the region.",
    materials: ["Quartz Clay", "Cobalt Oxide Glaze", "Natural Pigments"],
    stock: 12,
    trending: true,
    reviews: [
      { id: "r3", author: "Karan Mehta", avatar: "/images/img_avatar_1781291562375_7.jpg", rating: 5, comment: "The painting detail is incredible for the price. Looks amazing on my console table.", date: "2026-04-01" },
    ],
  },
  {
    id: "p3",
    name: "Pashmina Sozni Embroidered Shawl",
    category: "Textiles & Sarees",
    price: 32000,
    originalPrice: 38000,
    rating: 5.0,
    reviewCount: 41,
    images: [
      "/images/img_fixed_lorem_p3_0.jpg",
      "/images/img_fixed_lorem_p3_1.jpg"
    ],
    artisanId: "a3",
    artisanName: "Meera Bhandari",
    description:
      "Genuine Kashmiri Pashmina shawl with hand-embroidered Sozni needlework, taking over 6 months to complete a single piece using silk thread on cashmere wool.",
    materials: ["Pure Pashmina Wool", "Silk Thread", "Natural Vegetable Dyes"],
    stock: 2,
    trending: false,
    reviews: [
      { id: "r4", author: "Sneha Iyer", avatar: "/images/img_avatar_1781291562905_10.jpg", rating: 5, comment: "A true heirloom piece. The embroidery is finer than anything I've seen in stores.", date: "2026-01-15" },
    ],
  },
  {
    id: "p4",
    name: "Dhokra Brass Tribal Horse Figurine",
    category: "Metal Crafts",
    price: 3200,
    rating: 4.6,
    reviewCount: 29,
    images: [
      "/images/img_fixed_lorem_p4_0.jpg",
      "/images/img_fixed_lorem_p4_1.jpg"
    ],
    artisanId: "a4",
    artisanName: "Arjun Das",
    description:
      "Brass figurine crafted using the ancient lost-wax Dhokra technique, depicting a tribal horse motif common to Bastar folklore.",
    materials: ["Brass", "Beeswax (casting)", "Clay Mould"],
    stock: 8,
    trending: true,
    reviews: [],
  },
  {
    id: "p5",
    name: "Indigo Block-Printed Cotton Bedsheet Set",
    category: "Textiles & Sarees",
    price: 2800,
    originalPrice: 3500,
    rating: 4.8,
    reviewCount: 112,
    images: [
      "/images/img_fixed_lorem_p5_0.jpg",
      "/images/img_fixed_lorem_p5_1.jpg"
    ],
    artisanId: "a5",
    artisanName: "Fatima Sheikh",
    description:
      "100% cotton bedsheet set hand block-printed with natural indigo dye using century-old hand-carved teak blocks from Bagru.",
    materials: ["Cotton", "Natural Indigo Dye", "Madder Root Dye"],
    stock: 25,
    trending: true,
    reviews: [
      { id: "r5", author: "Vikram Shah", avatar: "/images/img_avatar_1781291563626_15.jpg", rating: 4.5, comment: "Great quality fabric and the print doesn't fade after washes.", date: "2026-03-20" },
    ],
  },
  {
    id: "p6",
    name: "Sheesham Wood Jaali Jewelry Box",
    category: "Wood & Decor",
    price: 4500,
    rating: 4.9,
    reviewCount: 38,
    images: [
      "/images/img_fixed_lorem_p6_0.jpg",
      "/images/img_fixed_lorem_p6_1.jpg"
    ],
    artisanId: "a6",
    artisanName: "Govind Lal",
    description:
      "Hand-carved sheesham wood jewelry box with intricate floral jaali lattice work, finished with natural lac polish.",
    materials: ["Sheesham Wood", "Brass Hinges", "Natural Lac Polish"],
    stock: 6,
    trending: false,
    reviews: [],
  },
  {
    id: "p7",
    name: "Madhubani Painting — Tree of Life",
    category: "Paintings",
    price: 5600,
    rating: 4.85,
    reviewCount: 22,
    images: [
      "/images/img_fixed_lorem_p7_0.jpg",
      "/images/img_fixed_lorem_p7_1.jpg"
    ],
    artisanId: "a1",
    artisanName: "Lakshmi Devi",
    description:
      "Traditional Madhubani folk painting on handmade paper, depicting the Tree of Life motif using natural pigments and bamboo brushes.",
    materials: ["Handmade Paper", "Natural Pigments", "Bamboo Brush"],
    stock: 5,
    trending: false,
    reviews: [],
  },
  {
    id: "p8",
    name: "Kundan Polki Bridal Necklace Set",
    category: "Jewelry",
    price: 14500,
    originalPrice: 17000,
    rating: 4.95,
    reviewCount: 67,
    images: [
      "/images/img_fixed_lorem_p8_0.jpg",
      "/images/img_fixed_lorem_p8_1.jpg"
    ],
    artisanId: "a3",
    artisanName: "Meera Bhandari",
    description:
      "Handcrafted Kundan Polki necklace set with uncut diamonds set in 22k gold-plated brass, traditional Jaipur craftsmanship.",
    materials: ["Gold-plated Brass", "Kundan Stones", "Polki Glass"],
    stock: 3,
    trending: true,
    reviews: [],
  },
  {
    id: "p9",
    name: "Terracotta Hand-painted Wall Plates (Set of 3)",
    category: "Pottery & Ceramics",
    price: 1800,
    rating: 4.5,
    reviewCount: 19,
    images: [
      "/images/img_fixed_lorem_p9_0.jpg",
      "/images/img_fixed_lorem_p9_1.jpg"
    ],
    artisanId: "a2",
    artisanName: "Ramesh Prajapati",
    description:
      "Set of three terracotta wall plates, hand-painted with traditional Rajasthani motifs in earthy tones.",
    materials: ["Terracotta Clay", "Acrylic Paint", "Matte Varnish"],
    stock: 15,
    trending: false,
    reviews: [],
  },
  {
    id: "p10",
    name: "Bastar Wrought Iron Wall Art",
    category: "Metal Crafts",
    price: 6700,
    rating: 4.7,
    reviewCount: 14,
    images: [
      "/images/img_fixed_lorem_p10_0.jpg",
      "/images/img_fixed_lorem_p10_1.jpg"
    ],
    artisanId: "a4",
    artisanName: "Arjun Das",
    description:
      "Hand-forged wrought iron wall art depicting Bastar tribal dance forms, finished with a matte black coating.",
    materials: ["Wrought Iron", "Matte Powder Coating"],
    stock: 7,
    trending: false,
    reviews: [],
  },
  {
    id: "p11",
    name: "Ajrakh Block-Printed Cotton Stole",
    category: "Textiles & Sarees",
    price: 1450,
    rating: 4.6,
    reviewCount: 73,
    images: [
      "/images/img_fixed_lorem_p11_0.jpg",
      "/images/img_fixed_lorem_p11_1.jpg"
    ],
    artisanId: "a5",
    artisanName: "Fatima Sheikh",
    description:
      "Lightweight cotton stole with traditional Ajrakh geometric block printing using natural dyes, perfect for everyday wear.",
    materials: ["Cotton", "Natural Indigo & Madder Dyes"],
    stock: 30,
    trending: true,
    reviews: [],
  },
  {
    id: "p12",
    name: "Carved Walnut Wood Wall Mirror Frame",
    category: "Wood & Decor",
    price: 8900,
    originalPrice: 10500,
    rating: 4.9,
    reviewCount: 11,
    images: [
      "/images/img_fixed_lorem_p12_0.jpg",
      "/images/img_fixed_lorem_p12_1.jpg"
    ],
    artisanId: "a6",
    artisanName: "Govind Lal",
    description:
      "Hand-carved walnut wood mirror frame from Kashmir, featuring chinar leaf motifs traditional to the valley's wood carving heritage.",
    materials: ["Walnut Wood", "Mirror Glass", "Natural Polish"],
    stock: 4,
    trending: false,
    reviews: [],
  },
  {
    id: "p13",
    name: "Silver Filigree Jhumka Earrings",
    category: "Jewelry",
    price: 3600,
    rating: 4.8,
    reviewCount: 45,
    images: [
      "/images/img_fixed_lorem_p13_0.jpg",
      "/images/img_fixed_lorem_p13_1.jpg"
    ],
    artisanId: "a3",
    artisanName: "Meera Bhandari",
    description:
      "Intricate silver filigree jhumka earrings from Cuttack, handcrafted by twisting fine silver wires into delicate lace-like patterns.",
    materials: ["925 Silver Wire"],
    stock: 18,
    trending: true,
    reviews: [],
  },
  {
    id: "p14",
    name: "Warli Art Hand-Painted Canvas",
    category: "Paintings",
    price: 3100,
    rating: 4.55,
    reviewCount: 16,
    images: [
      "/images/img_fixed_lorem_p14_0.jpg",
      "/images/img_fixed_lorem_p14_1.jpg"
    ],
    artisanId: "a1",
    artisanName: "Lakshmi Devi",
    description:
      "Warli tribal art canvas painting depicting a village harvest scene, painted with white pigment on a red ochre background.",
    materials: ["Canvas", "Natural White Pigment", "Bamboo Brush"],
    stock: 10,
    trending: false,
    reviews: [],
  },
  {
    id: "p15",
    name: "Hand-thrown Ceramic Tea Set",
    category: "Pottery & Ceramics",
    price: 2200,
    rating: 4.65,
    reviewCount: 33,
    images: [
      "/images/img_fixed_lorem_p15_0.jpg",
      "/images/img_fixed_lorem_p15_1.jpg"
    ],
    artisanId: "a2",
    artisanName: "Ramesh Prajapati",
    description:
      "6-piece hand-thrown ceramic tea set with hand-painted blue floral details, microwave and dishwasher safe.",
    materials: ["Stoneware Clay", "Cobalt Glaze"],
    stock: 9,
    trending: false,
    reviews: [],
  },
  {
    id: "p16",
    name: "Embroidered Phulkari Dupatta",
    category: "Textiles & Sarees",
    price: 4200,
    originalPrice: 5000,
    rating: 4.75,
    reviewCount: 58,
    images: [
      "/images/img_fixed_lorem_p16_0.jpg",
      "/images/img_fixed_lorem_p16_1.jpg"
    ],
    artisanId: "a5",
    artisanName: "Fatima Sheikh",
    description:
      "Vibrant Phulkari dupatta from Punjab, hand-embroidered with silk thread in geometric floral patterns on khaddar cotton.",
    materials: ["Khaddar Cotton", "Silk Embroidery Thread"],
    stock: 14,
    trending: true,
    reviews: [],
  },
];
