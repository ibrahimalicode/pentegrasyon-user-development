export const GetirYemekAddress = ({ order }) => {
  function splittedAddreses() {
    const adr = order.client.address.replace("Türkiye", "").split(",");
    // return `${adr[0]}, ${adr[1]}, ${adr[2]}, ${adr[5]}`;
    return order.client.address;
  }
  return (
    <>
      <span>{splittedAddreses()}</span>
      {order.client.aptNo && <span>Apt No: {order.client.aptNo}</span>}
      {order.client.doorNo && <span> Daire No: {order.client.doorNo}</span>}
      {order.client.floor && <span> Kat: {order.client.floor}</span>}
    </>
  );
};

export const YemekSepetiAddress = ({ order }) => {
  const customerAddress = `
  ${order.customer.city ?? ""},
  ${order.customer.deliveryMainArea ?? ""},
  ${order.customer.street ?? ""},`;

  return (
    <div className="flex flex-wrap justify-end">
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
