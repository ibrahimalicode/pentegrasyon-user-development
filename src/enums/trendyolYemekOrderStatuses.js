const trendyolYemekOrderStatuses = [
  {
    bg: "--status-yellow",
    color: "--yellow-1",
    label: "Onay Bekliyor",
    value: true,
    id: "Created",
    nextId: "Picking",
  },
  {
    bg: "--status-green",
    color: "--green-1",
    label: "Hazırlanıyor",
    value: true,
    id: "Picking",
    text: "Onayla",
    nextId: "Invoiced",
  },
  {
    bg: "--status-purple",
    color: "--purple-1",
    label: "Yola Çıktı",
    value: true,
    id: "Invoiced",
    text: "Yola Çıkart",
    nextId: "Delivered",
  },
  {
    bg: "--status-purple",
    color: "--purple-1",
    label: "Yola Çıktı",
    value: true,
    id: "Shipped",
    text: "Yola Çıkart",
    nextId: "Delivered",
  },
  {
    bg: "--status-green",
    color: "--green-1",
    transColor: "rgba(57, 186, 109, 0.8)",
    label: "Teslim Edildi",
    value: true,
    text: "Teslim Et",
    id: "Delivered",
  },
  {
    bg: "--status-red",
    color: "--red-1",
    transColor: "#fca5a5",
    label: "İptal Edildi",
    value: true,
    text: "İptal Et",
    id: "Cancelled",
  },
  {
    bg: "--status-red",
    color: "--red-1",
    transColor: "#fca5a5",
    label: "İptal Edildi",
    value: true,
    text: "İptal Et",
    id: "UnSupplied",
  },
];

// Created = 0
// Picking = 1
// Invoiced = 2
// Shipped = 3
// Delivered = 4
// Cancelled = 5 //Cancelled by customer
// UnSupplied = 5 //Cancelled by restaurant

export default trendyolYemekOrderStatuses;
