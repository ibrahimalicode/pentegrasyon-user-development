const migrosYemekiOrderStatuses = [
  {
    bg: "--status-yellow",
    color: "--yellow-1",
    label: "Onay Bekliyor", //Beklemede
    value: true,
    id: 0,
    nextId: 2,
  },
  {
    bg: "--status-green",
    color: "--green-1",
    label: "Hazırlanıyor", //Hazırlanıyor
    value: true,
    text: "Onayla",
    id: 2,
    nextId: 6,
  },
  {
    bg: "--status-purple",
    color: "--purple-1",
    label: "Teslim Edilecek", //Teslim Edilecek veya Yola Çıktı
    value: true,
    text: "Yola Çıkart",
    id: 6,
    nextId: 8,
  },
  {
    bg: "--status-green",
    color: "--green-1",
    transColor: "rgba(57, 186, 109, 0.8)",
    label: "Teslim Edildi", //Teslim Edildi
    value: true,
    text: "Teslim Et",
    id: 8,
  },
  {
    bg: "--status-red",
    color: "--red-1",
    transColor: "#fca5a5",
    label: "İptal Edildi", //İptal Edildi
    value: true,
    text: "İptal Et",
    id: 9,
  },
  {
    bg: "--status-red",
    color: "--red-1",
    transColor: "#fca5a5",
    label: "İptal Edildi", //İptal Edildi
    value: true,
    text: "İptal Et",
    id: 10,
  },
];

export default migrosYemekiOrderStatuses;

// {
//   NEW_PENDING = 0,         //Beklemede

//--------//   Approved = 1,            //Onayla-------//
//   COLLECTING = 2,          //Hazırlanıyor

//---------   Prepared = 3,            //Hazırla
//---------   COLLECTION_APPROVED = 4, //Kuryeye Verilecek

//---------   Delivery = 5,            //Yola Çıkart
//   IN_DELIVERY = 6,         //Teslim Edilecek

//----------   Completed = 7,           //Teslim Et
//   DELIVERED = 8,           //Teslim Edildi

//   Rejected = 9,            //Reddedildi
//   Cancelled = 10,           //İptal Edildi
// }
