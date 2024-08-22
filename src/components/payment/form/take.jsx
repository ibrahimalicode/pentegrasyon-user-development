import React, { useEffect, useState } from "react";

const className =
  "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2";

const PayTRForm = () => {
  const [context, setContext] = useState({
    merchant_id: "",
    user_ip: "",
    merchant_oid: "",
    email: "",
    payment_type: "",
    payment_amount: "",
    currency: "",
    test_mode: "",
    non_3d: "",
    merchant_ok_url: "",
    merchant_fail_url: "",
    user_name: "",
    user_address: "",
    user_phone: "",
    user_basket: "",
    debug_on: "",
    client_lang: "",
    token: "",
    non3d_test_failed: "",
    installment_count: "",
    no_installment: "",
    max_installment: "",
    lang: "",
    card_type: "",
  });
  const [isFetched, setIsFetched] = useState(false);

  const [cardNumber, setCardNumber] = useState(""); //4355084355084358
  const [Month, setMonth] = useState("12");
  const [Year, setYear] = useState("30");
  const [CVV, setCVV] = useState("000");

  // useEffect(() => {
  //   const fetchCredentials = async () => {
  //     if (!isFetched) {
  //       console.log("first");
  //       const data = await getPayTRCredentials();
  //       console.log(data);
  //       setContext(data);
  //       setIsFetched(true);
  //     }
  //   };

  //   fetchCredentials();
  // }, [context]);

  return (
    <form
      className="space-y-4 max-w-max"
      action="https://www.paytr.com/odeme"
      method="post"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Kart Sahibi Adı:
        </label>
        <input
          type="text"
          name="cc_owner"
          value="PAYTR TEST"
          className={className}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Kart Numarası:
        </label>
        <input
          type="text"
          name="card_number"
          className={className}
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Kart Son Kullanma Ay:
        </label>
        <input
          type="text"
          name="expiry_month"
          value="12"
          className={className}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Kart Son Kullanma Yıl:
        </label>
        <input
          type="text"
          name="expiry_year"
          value="24"
          className={className}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Kart Güvenlik Kodu:
        </label>
        <input type="text" name="cvv" value="000" className={className} />
      </div>

      {/* Hidden fields */}
      <input type="hidden" name="merchant_id" value={context.merchant_id} />
      <input type="hidden" name="user_ip" value={context.user_ip} />
      <input type="hidden" name="merchant_oid" value={context.merchant_oid} />
      <input type="hidden" name="email" value={context.email} />
      <input type="hidden" name="payment_type" value={context.payment_type} />
      <input
        type="hidden"
        name="payment_amount"
        value={context.payment_amount}
      />
      <input type="hidden" name="currency" value={context.currency} />
      <input type="hidden" name="test_mode" value={context.test_mode} />
      <input type="hidden" name="non_3d" value={context.non_3d} />
      <input
        type="hidden"
        name="merchant_ok_url"
        value={context.merchant_ok_url}
      />
      <input
        type="hidden"
        name="merchant_fail_url"
        value={context.merchant_fail_url}
      />
      <input type="hidden" name="user_name" value={context.user_name} />
      <input type="hidden" name="user_address" value={context.user_address} />
      <input type="hidden" name="user_phone" value={context.user_phone} />
      <input type="hidden" name="user_basket" value={context.user_basket} />
      <input type="hidden" name="debug_on" value={context.debug_on} />
      <input type="hidden" name="client_lang" value={context.client_lang} />
      <input type="hidden" name="paytr_token" value={context.token} />
      <input
        type="hidden"
        name="non3d_test_failed"
        value={context.non3d_test_failed}
      />
      <input
        type="hidden"
        name="installment_count"
        value={context.installment_count}
      />
      <input
        type="hidden"
        name="no_installment"
        value={context.no_installment}
      />
      <input
        type="hidden"
        name="max_installment"
        value={context.max_installment}
      />
      <input type="hidden" name="lang" value={context.lang} />
      <input type="hidden" name="card_type" value={context.card_type} />

      <button
        type="submit"
        className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Pay
      </button>
    </form>
  );
};

export default PayTRForm;
