export const activitySeverity = [
  { label: "Bilgi", value: "Info", id: 0 },
  { label: "Uyarı", value: "Warning", id: 1 },
  { label: "Kritik", value: "Critical", id: 2 },
];

export const activitySource = [
  { label: "Kullanıcı", value: "User", id: 0 },
  { label: "Sistem", value: "System", id: 1 },
  { label: "Pazaryeri", value: "Marketplace", id: 2 },
];

export const activityEntityType = [
  { label: "Sipariş", value: "Order", id: 0 },
  { label: "Talep", value: "Ticket", id: 1 },
  { label: "Restoran", value: "Restaurant", id: 2 },
  { label: "Kullanıcı", value: "User", id: 3 },
];

export const activityActionType = [
  { label: "Oluşturma", value: "Create", id: 0 },
  { label: "Güncelleme", value: "Update", id: 1 },
  { label: "Silme", value: "Delete", id: 2 },
  { label: "Alındı", value: "Receive", id: 3 },
  { label: "Onay", value: "Approve", id: 4 },
  { label: "İptal", value: "Cancel", id: 5 },
  { label: "Giriş", value: "Login", id: 6 },
  { label: "Hesap Kilitlendi", value: "Account Locked", id: 7 },
];

const logsEnums = {
  activitySeverity,
  activitySource,
  activityEntityType,
  activityActionType,
};

export default logsEnums;
