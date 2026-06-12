import { ChatThread } from "@/types";

export const chatThreads: ChatThread[] = [
  {
    id: "ch1",
    artisanId: "a1",
    artisanName: "Lakshmi Devi",
    avatar: "",
    online: true,
    lastMessage: "The saree will be ready in about 15 more days.",
    lastTime: "10:32 AM",
    unread: 2,
    messages: [
      {
        id: "m1",
        sender: "user",
        text: "Hello! I was interested in the Kanjeevaram Peacock Zari saree. Can you tell me more about the weaving process?",
        time: "Yesterday, 4:15 PM",
      },
      {
        id: "m2",
        sender: "artisan",
        text: "Namaste! So glad you reached out. This saree takes around 18 days on a pit loom. The zari is pure gold thread sourced from Surat.",
        time: "Yesterday, 5:02 PM",
      },
      {
        id: "m3",
        sender: "artisan",
        product: {
          name: "Kanjeevaram Silk Saree — Peacock Zari",
          image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200&q=80",
          price: 18500,
        },
        time: "Yesterday, 5:03 PM",
      },
      {
        id: "m4",
        sender: "user",
        text: "It's beautiful! Is there any customization possible for the border color?",
        time: "Today, 9:45 AM",
      },
      {
        id: "m5",
        sender: "artisan",
        text: "Yes! We can do crimson, deep blue, or traditional temple green for the border. The saree will be ready in about 15 more days.",
        time: "Today, 10:32 AM",
      },
    ],
  },
  {
    id: "ch2",
    artisanId: "a2",
    artisanName: "Ramesh Prajapati",
    avatar: "",
    online: false,
    lastMessage: "Thank you for your order! I'll begin work tomorrow.",
    lastTime: "Yesterday",
    unread: 0,
    messages: [
      {
        id: "m6",
        sender: "user",
        text: "Hi Ramesh! I just placed an order for the Blue Pottery Vase. When can I expect it?",
        time: "2 days ago",
      },
      {
        id: "m7",
        sender: "artisan",
        text: "Thank you for your order! I'll begin work tomorrow. Estimated delivery is 7–10 days. I'll send photos as it progresses!",
        time: "Yesterday",
      },
    ],
  },
  {
    id: "ch3",
    artisanId: "a3",
    artisanName: "Meera Bhandari",
    avatar: "",
    online: true,
    lastMessage: "The Sozni embroidery alone takes 4 months.",
    lastTime: "2 days ago",
    unread: 1,
    messages: [
      {
        id: "m8",
        sender: "user",
        text: "Meera ji, can you explain why the Pashmina shawl takes 6 months to make?",
        time: "2 days ago, 11:20 AM",
      },
      {
        id: "m9",
        sender: "artisan",
        text: "The Sozni embroidery alone takes 4 months — each stitch is done with a single hair-thin needle. The pashmina wool itself is combed by hand from the Changthangi goat.",
        time: "2 days ago, 2:45 PM",
      },
    ],
  },
  {
    id: "ch4",
    artisanId: "a4",
    artisanName: "Arjun Das",
    avatar: "",
    online: true,
    lastMessage: "Every piece is unique — no two are identical.",
    lastTime: "3 days ago",
    unread: 0,
    messages: [
      {
        id: "m10",
        sender: "user",
        text: "The Dhokra horse figurine looks amazing. How is it made?",
        time: "3 days ago",
      },
      {
        id: "m11",
        sender: "artisan",
        text: "We use the lost-wax technique — first sculpt in beeswax, then encase in clay, melt the wax out, and pour molten brass in. Every piece is unique — no two are identical.",
        time: "3 days ago",
      },
    ],
  },
];
