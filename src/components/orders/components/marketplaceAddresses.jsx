export const GetirYemekAddress = ({ order }) => {
  return (
    <>
      <span>{order.client.address}</span>
      {order.client.aptNo && <span>Apt No: {order.client.aptNo}</span>}
      {order.client.doorNo && <span> Daire No: {order.client.doorNo}</span>}
      {order.client.floor && <span> Kat: {order.client.floor}</span>}
    </>
  );
};

export const YemekSepetiAddress = ({ order }) => {
  const customerAddress = `
  ${order.customer.city},
  ${order.customer.deliveryMainArea},
  ${order.customer.street}`;

  return (
    <>
      <span>{customerAddress}</span>
      {order.customer.building && <span>Bina: {order.customer.building}</span>}
      {order.customer.entrance && (
        <span> Daire No: {order.customer.entrance}</span>
      )}
      {order.customer.floor && <span> Kat: {order.customer.floor}</span>}
    </>
  );
};
