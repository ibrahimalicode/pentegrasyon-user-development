const yemekSepetiOrderStatuses = [
  {
    bg: "--status-yellow",
    color: "--yellow-1",
    label: "Onay Bekliyor",
    value: true,
    id: 0,
    nextId: 1,
  },
  {
    bg: "--status-green",
    color: "--green-1",
    label: "Hazırlanıyor",
    value: true,
    id: 1,
    text: "Onayla",
    nextId: 2,
  },
  {
    bg: "--status-purple",
    color: "--purple-1",
    label: "Yola Çıktı",
    value: true,
    id: 2,
    text: "Yola Çıkart",
    nextId: 3,
  },
  {
    bg: "--status-green",
    color: "--green-1",
    transColor: "rgba(57, 186, 109, 0.8)",
    label: "Teslim Edildi",
    value: true,
    text: "Teslim Et",
    id: 3,
  },
  {
    bg: "--status-red",
    color: "--red-1",
    transColor: "#fca5a5",
    label: "İptal Edildi",
    value: true,
    text: "İptal Et",
    id: 4,
  },
];
// NewTicket  = 0
// Preparing = 1
// OnTheWay = 2
// Delivered = 3
// Cancelled = 4

export default yemekSepetiOrderStatuses;
