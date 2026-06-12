import { Order } from "@/types";

export const orders: Order[] = [
  {
    id: "ORD-10293",
    productId: "p2",
    productName: "Blue Pottery Hand-painted Vase",
    image: "https://images.unsplash.com/photo-1565193298357-4c89ac3a3d9a?w=200&q=80",
    date: "2026-05-28",
    status: "Delivered",
    price: 2400,
    quantity: 1,
  },
  {
    id: "ORD-10294",
    productId: "p11",
    productName: "Ajrakh Block-Printed Cotton Stole",
    image: "https://images.unsplash.com/photo-1582582494705-f8ce0b0c24f0?w=200&q=80",
    date: "2026-06-02",
    status: "Shipped",
    price: 1450,
    quantity: 2,
  },
  {
    id: "ORD-10301",
    productId: "p4",
    productName: "Dhokra Brass Tribal Horse Figurine",
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=200&q=80",
    date: "2026-06-08",
    status: "Processing",
    price: 3200,
    quantity: 1,
  },
  {
    id: "ORD-10240",
    productId: "p15",
    productName: "Hand-thrown Ceramic Tea Set",
    image: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=200&q=80",
    date: "2026-04-15",
    status: "Delivered",
    price: 2200,
    quantity: 1,
  },
  {
    id: "ORD-10180",
    productId: "p7",
    productName: "Madhubani Painting — Tree of Life",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=200&q=80",
    date: "2026-03-02",
    status: "Cancelled",
    price: 5600,
    quantity: 1,
  },
];

export const monthlySpend = [
  { month: "Jan", amount: 4200 },
  { month: "Feb", amount: 3100 },
  { month: "Mar", amount: 7800 },
  { month: "Apr", amount: 2200 },
  { month: "May", amount: 5650 },
  { month: "Jun", amount: 3200 },
];

export const categorySpend = [
  { name: "Textiles", value: 8350, color: "#C2683B" },
  { name: "Pottery", value: 4600, color: "#E0A75E" },
  { name: "Jewelry", value: 3600, color: "#7A8C6F" },
  { name: "Metal Crafts", value: 3200, color: "#8B3A2B" },
  { name: "Paintings", value: 5600, color: "#A6A6A6" },
];
