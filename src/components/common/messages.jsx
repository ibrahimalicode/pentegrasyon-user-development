export const PhoneUserMessage = ({ number }) => {
  return (
    <>
      <span className="text-[--primary-1]">{number}</span> telefon numaranıza
      bir onay kodu gönderdik. Lütfen SMS mesajlarınızı kontrol edin ve kodu
      doğrulama işlemi için girin.
    </>
  );
};

export const EmailUserMessage = ({ mail }) => {
  return (
    <>
      <span className="text-[--primary-1]">{mail}</span> email adresinize bir
      onay kodu gönderdik. Lütfen e-posta mesajlarınızı kontrol edin ve kodu
      doğrulama işlemi için girin.
    </>
  );
};
