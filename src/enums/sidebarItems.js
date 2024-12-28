const sidebarItems = [
  {
    text: "Gösterge Paneli",
    to: "/dashboard",
    path: "dashboard",
    id: "dashboard",
    show: true,
  },
  {
    text: "Restoranlar",
    to: "/restaurants",
    path: "restaurants",
    id: "restaurants",
    show: true,
  },
  {
    text: "Kuryeler",
    to: "/couriers",
    path: "couriers",
    id: "couriers",
    show: true,
  },
  {
    text: "Lisanslar",
    to: "/licenses",
    path: "licenses",
    id: "licenses",
    show: true,
  },
  {
    text: "Siparişler",
    to: "/orders",
    path: "orders",
    id: "tickets",
    show: false,
  },
  {
    text: "İşlem Kayıtları",
    to: "/activity-logs",
    path: "activity-logs",
    id: "logs",
    show: true,
  },
  {
    text: "Ödemeler",
    to: "/payments",
    path: "payments",
    id: "payments",
    show: true,
  },
  {
    text: "Yetki Koruması",
    to: "/locked-pages",
    path: "locked-pages",
    id: "locked-pages",
    show: false,
  },
  {
    text: "Mesajlar",
    to: "/messages",
    path: "messages",
    id: "messages",
    show: true,
  },
];

export default sidebarItems;
