import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getContext,
  resetGetContextState,
} from "../../../redux/payTR/getContextSlice";

const className =
  "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2";

const PayTRForm = ({ cardData, setStep }) => {
  const dispatch = useDispatch();

  const { loading, success, error, context } = useSelector(
    (state) => state.getContext
  );

  const [contextData, setContextData] = useState({
    fetched: false,
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

  useEffect(() => {
    if (!contextData.fetched) {
      dispatch(getContext());
    }
  }, []);

  useEffect(() => {
    if (success) {
      // setStep(3);
      setContextData(context);
      dispatch(resetGetContextState());
    }
  }, [success]);

  return (
    <>
      <div>
        <label className="hidden text-sm font-medium text-gray-700">
          Kart Sahibi Adı:
        </label>
        <input
          type="hidden"
          name="cc_owner"
          className={className}
          value={cardData.userName}
          onChange={() => {}}
        />
      </div>

      <div>
        <label className="hidden text-sm font-medium text-gray-700">
          Kart Numarası:
        </label>
        <input
          type="hidden"
          name="card_number"
          value={cardData.cardNumber}
          className={className}
          onChange={() => {}}
        />
      </div>

      <div>
        <label className="hidden text-sm font-medium text-gray-700">
          Kart Son Kullanma Ay:
        </label>
        <input
          type="hidden"
          name="expiry_month"
          className={className}
          value={cardData.month}
          onChange={() => {}}
        />
      </div>

      <div>
        <label className="hidden text-sm font-medium text-gray-700">
          Kart Son Kullanma Yıl:
        </label>
        <input
          type="hidden"
          name="expiry_year"
          className={className}
          value={cardData.year}
          onChange={() => {}}
        />
      </div>

      <div>
        <label className="hidden text-sm font-medium text-gray-700">
          Kart Güvenlik Kodu:
        </label>
        <input
          type="hidden"
          name="cvv"
          className={className}
          value={cardData.cvv}
          onChange={() => {}}
        />
      </div>

      {/* Hidden fields */}
      <input type="hidden" name="merchant_id" value={contextData.merchant_id} />
      <input type="hidden" name="user_ip" value={contextData.user_ip} />
      <input
        type="hidden"
        name="merchant_oid"
        value={contextData.merchant_oid}
      />
      <input type="hidden" name="email" value={contextData.email} />
      <input
        type="hidden"
        name="payment_type"
        value={contextData.payment_type}
      />
      <input
        type="hidden"
        name="payment_amount"
        value={contextData.payment_amount}
      />
      <input type="hidden" name="currency" value={contextData.currency} />
      <input type="hidden" name="test_mode" value={contextData.test_mode} />
      <input type="hidden" name="non_3d" value={contextData.non_3d} />
      <input
        type="hidden"
        name="merchant_ok_url"
        value={contextData.merchant_ok_url}
      />
      <input
        type="hidden"
        name="merchant_fail_url"
        value={contextData.merchant_fail_url}
      />
      <input type="hidden" name="user_name" value={contextData.user_name} />
      <input
        type="hidden"
        name="user_address"
        value={contextData.user_address}
      />
      <input type="hidden" name="user_phone" value={contextData.user_phone} />
      <input type="hidden" name="user_basket" value={contextData.user_basket} />
      <input type="hidden" name="debug_on" value={contextData.debug_on} />
      <input type="hidden" name="client_lang" value={contextData.client_lang} />
      <input type="hidden" name="paytr_token" value={contextData.token} />
      <input
        type="hidden"
        name="non3d_test_failed"
        value={contextData.non3d_test_failed}
      />
      <input
        type="hidden"
        name="installment_count"
        value={contextData.installment_count}
      />
      <input
        type="hidden"
        name="no_installment"
        value={contextData.no_installment}
      />
      <input
        type="hidden"
        name="max_installment"
        value={contextData.max_installment}
      />
      <input type="hidden" name="lang" value={contextData.lang} />
      <input type="hidden" name="card_type" value={contextData.card_type} />

      <button
        type="submit"
        className="hidden w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Pay
      </button>
    </>
  );
};

export default PayTRForm;
