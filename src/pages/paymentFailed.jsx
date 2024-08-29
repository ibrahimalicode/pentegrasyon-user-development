import failed_card from "../assets/img/failed_card.png";

const PaymentFailed = () => {
  return (
    <section className="min-h-0 flex flex-col justify-start items-center pt-24">
      <div className="w-[25rem] overflow-visible">
        <img src={failed_card} alt="failed_card" />
      </div>

      <div className="pt-8 text-center">
        <p className="text-3xl mb-4">Ödeme Başarısız !</p>
        <p>
          İşleminiz teknik bir hata nedeniyle başarısız oldu. Lütfen tekrar
          deneyin.
        </p>
      </div>
    </section>
  );
};

export default PaymentFailed;
