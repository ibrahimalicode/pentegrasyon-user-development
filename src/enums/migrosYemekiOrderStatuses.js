const migrosYemekiOrderStatuses = [
  {
    bg: "--status-green-",
    color: "--green-1",
    label: "Onay Bekliyor", //Beklemede
    value: true,
    id: "NEW_PENDING",
    nextId: "COLLECTING",
  },
  {
    bg: "--status-green-",
    color: "--green-1",
    label: "Hazırlanıyor", //Hazırlanıyor
    value: true,
    text: "Onayla",
    id: "COLLECTING",
    nextId: "COLLECTION_APPROVED",
  },
  {
    bg: "--status-green-",
    color: "--green-1",
    label: "Kuryeye Verilecek", //Kuryeye Verilecek
    value: true,
    text: "Hazırla",
    id: "COLLECTION_APPROVED",
    nextId: "IN_DELIVERY",
  },
  {
    bg: "--status-green-",
    color: "--green-1",
    label: "Teslim Edilecek", //Teslim Edilecek veya Yola Çıktı
    value: true,
    text: "Yola Çıkart",
    id: "IN_DELIVERY",
    nextId: "DELIVERED",
  },
  {
    bg: "--status-green-",
    color: "--green-1",
    label: "Teslim Edildi", //Teslim Edildi
    value: true,
    text: "Teslim Et",
    id: "DELIVERED",
  },
  {
    bg: "--status-green-",
    color: "--green-1",
    label: "İptal Edildi", //İptal Edildi
    value: true,
    text: "İptal Et",
    id: "Cancelled",
  },
];

export default migrosYemekiOrderStatuses;

// {
//   NEW_PENDING,         //Beklemede

//   Approved,            //Onayla
//   COLLECTING,          //Hazırlanıyor

//   Prepared,            //Hazırla
//   COLLECTION_APPROVED, //Kuryeye Verilecek

//   Delivery,            //Yola Çıkart
//   IN_DELIVERY,         //Teslim Edilecek

//   Completed,           //Teslim Et
//   DELIVERED,           //Teslim Edildi

//   Rejected,            //Reddedildi
//   Cancelled,           //İptal Edildi
// }
