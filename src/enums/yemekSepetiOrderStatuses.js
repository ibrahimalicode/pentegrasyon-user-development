const yemekSepetiOrderStatuses = [
  {
    bg: "--status-yellow",
    color: "--yellow-1",
    label: "Bekliyor",
    value: true,
    id: 0,
    nextId: 1,
  },
  {
    bg: "--status-green",
    color: "--green-1",
    label: "Onaylandı",
    value: true,
    id: 1,
    nextId: 2,
    text: "Onayla",
  },
  {
    bg: "--status-yellow",
    color: "--yellow-1",
    label: "Hazırlanıyor",
    value: true,
    id: 1,
    nextId: 2,
    text: "Hazırlan",
  },
  {
    bg: "--status-purple",
    color: "--purple-1",
    label: "Yola Çıktı",
    value: true,
    id: 2,
    nextId: 3,
    text: "Yola Çıkart",
  },
  {
    bg: "--status-brown",
    color: "--brown-1",
    label: "Teslim Edildi",
    value: true,
    id: 3,
    text: "Teslim Et",
  },
  {
    bg: "--status-red",
    color: "--red-1",
    label: "İptal Edildi",
    value: true,
    id: 4,
  },
];
// NewTicket  = 0
// Preparing = 1
// OnTheWay = 2
// Delivered = 3
// Cancelled = 4

export default yemekSepetiOrderStatuses;
