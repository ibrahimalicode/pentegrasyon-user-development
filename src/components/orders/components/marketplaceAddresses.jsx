export const GetirYemekAddress = ({ order }) => {
  return (
    <span>
      <span>{order.client.address}</span>
      {order.client.aptNo && <span>Apt No: {order.client.aptNo}</span>}
      {order.client.doorNo && <span> Daire No: {order.client.doorNo}</span>}
      {order.client.floor && <span> Kat: {order.client.floor}</span>}
    </span>
  );
};

export const YemekSepetiAddress = ({ order, className }) => {
  const customerAddress = `
  ${order.customer.city ?? ""},
  ${order.customer.deliveryMainArea ?? ""},
  ${order.customer.street ?? ""},`;

  return (
    <div className={`flex flex-wrap ${className}`}>
      <p>{customerAddress && customerAddress}</p>
      {order.customer.building && (
        <p className="min-w-max px-0.5"> Bina: {order.customer.building}, </p>
      )}
      {order.customer.number && (
        <p className="min-w-max "> Bina No: {order.customer.number}, </p>
      )}
      {order.customer.entrance && (
        <p className="min-w-max px-0.5">
          {" "}
          Daire No: {order.customer.entrance},{" "}
        </p>
      )}
      {order.customer.floor && (
        <p className="min-w-max"> Kat: {order.customer.floor}</p>
      )}
    </div>
  );
};

export const MigrosYemekAddress = ({ order, className }) => {
  const customerAddress = `
  ${order.customer.city ?? ""},
  ${order.customer.district ?? ""},
  ${order.customer.streetName ?? ""},`;

  return (
    <div className={`flex flex-wrap ${className}`}>
      <p>{customerAddress}</p>
      {order.customer.buildingNumber && (
        <p className="min-w-max ">
          {" "}
          Bina No: {order.customer.buildingNumber},{" "}
        </p>
      )}
      {order.customer.doorNumber && (
        <p className="min-w-max px-0.5">
          {" "}
          Daire No: {order.customer.doorNumber},{" "}
        </p>
      )}
      {order.customer.floorNumber && (
        <p className="min-w-max"> Kat: {order.customer.floorNumber}</p>
      )}
    </div>
  );
};

// Trendyol GO tickets fill every customer address field with a "TGO Yemek"
// (older tickets: "Trendyol Yemek") placeholder — the real address stays
// with Trendyol's courier. Show "Kurye Bilgisinde" instead of the raw
// placeholder wherever such a field is displayed.
const TRENDYOL_ADDRESS_PLACEHOLDERS = ["TGO Yemek", "Trendyol Yemek"];
export const trendyolAddressText = (value) =>
  TRENDYOL_ADDRESS_PLACEHOLDERS.includes(value) ? "Kurye Bilgisinde" : value;

export const TrendyolYemekAddress = ({ order, className }) => {
  if (TRENDYOL_ADDRESS_PLACEHOLDERS.includes(order.customer.address1)) {
    return (
      <div className={`flex flex-wrap ${className}`}>
        <p>Kurye Bilgisinde</p>
      </div>
    );
  }

  const customerAddress = `
    ${order.customer.city},
    ${order.customer.district},
    ${order.customer.address1}`;

  return (
    <div className={`flex flex-wrap ${className}`}>
      <p>{customerAddress && customerAddress}</p>
      {order.customer.apartmentNumber && (
        <p className="min-w-max px-0.5">
          Apt No: {order.customer.apartmentNumber}
        </p>
      )}
      {order.customer.doorNumber && (
        <p className="min-w-max px-0.5">
          Daire No: {order.customer.doorNumber}
        </p>
      )}
      {order.customer.floor && (
        <p className="min-w-max px-0.5"> Kat: {order.customer.floor}</p>
      )}
    </div>
  );
};
