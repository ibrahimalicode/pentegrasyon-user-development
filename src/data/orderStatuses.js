const orderStatuses = [
  {
    bg: "--status-green",
    color: "--green-1",
    label: "Onaylandı", // Forward Order Pending Approval
    value: true,
    id: 325,
  },
  {
    bg: "--status-green",
    color: "--green-1",
    label: "Onaylandı", // Forward Order Approved
    value: true,
    id: 350,
  },
  {
    bg: "--status-yellow",
    color: "--yellow-1",
    label: "Bekliyor", // Waiting Restaurant Approval
    value: true,
    id: 400,
  },
  {
    bg: "--status-yellow",
    color: "--yellow-1",
    label: "Hazırlanıyor", // Order In Preparation
    value: true,
    id: 500,
  },
  {
    bg: "--status-orange",
    color: "--orange-1",
    label: "Hazırlandı", // Order Prepared
    value: true,
    id: 550,
  },
  {
    bg: "--status-orange",
    color: "--orange-1",
    label: "Kurye'ye verildi", // Delivered To Courier
    value: true,
    id: 600,
  },
  {
    bg: "--status-purple",
    color: "--purple-1",
    label: "Yolda", // Courier On The Way
    value: true,
    id: 700,
  },
  {
    bg: "--status-purple",
    color: "--purple-1",
    label: "Kurye Vardı", // Courier Arrived At Address
    value: true,
    id: 800,
  },
  {
    bg: "--status-brown",
    color: "--brown-1",
    label: "Teslim Edildi", //Order Delivered
    value: true,
    id: 900,
  },
  {
    bg: "--status-red",
    color: "--red-1",
    label: "İptal Edildi", // Order Cancelled By Admin
    value: true,
    id: 1500,
  },
  {
    bg: "--status-red",
    color: "--red-1",
    label: "İptal Edildi", // Order Cancelled By Restaurant
    value: true,
    id: 1600,
  },
];

export default orderStatuses;
