//MOD
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//COMP
import CustomInput from "../../common/customInput";
import { TOOLBAR_BTN_PRIMARY } from "../../common/toolbarStyles";

// REDUX
import {
  resetUpdateUserPassword,
  updateUserPassword,
} from "../../../redux/user/updateUserPasswordSlice";

const EditUserPassword = ({ user }) => {
  const toastId = useRef();
  const dispatch = useDispatch();

  const { loading, success, error } = useSelector(
    (state) => state.user.updatePassword
  );

  const [userPassword, setUserPassword] = useState({
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (loading) {
      toastId.current = toast.loading("İşleniyor...");
    } else if (error) {
      dispatch(resetUpdateUserPassword());
    } else if (success) {
      toast.dismiss(toastId.current);
      toast.success("Şifreniz başarıyla güncellendi");
      setUserPassword({
        password: "",
        confirmPassword: "",
      });
      dispatch(resetUpdateUserPassword());
    }
  }, [loading, success, error, dispatch]);

  function handleSubmit(e) {
    e.preventDefault();

    if (userPassword.confirmPassword !== userPassword.password) {
      toast.error("Şifreler aynı değil");
      return;
    }

    dispatch(
      updateUserPassword({
        newPassword: userPassword.password,
        newPasswordConfirm: userPassword.confirmPassword,
      })
    );
  }

  return (
    <section className="w-full max-w-2xl pt-6 min-h-0">
      <form className="w-full" onSubmit={handleSubmit}>
        <h3 className="text-base font-semibold text-[--black-1]">
          Şifrenizi değiştirin
        </h3>
        <p className="mt-1 text-sm text-[--gr-1]">
          Yeni şifreniz 4-20 karakter uzunluğunda olmalıdır.
        </p>

        <div className="grid gap-x-4 sm:grid-cols-2">
          <CustomInput
            required
            label="Şifre"
            placeholder="Şifre"
            className="text-sm"
            letIcon={true}
            value={userPassword.password}
            onChange={(e) => {
              setUserPassword((prev) => {
                return {
                  ...prev,
                  password: e,
                };
              });
            }}
            minLength={4}
            maxLength={20}
          />
          <CustomInput
            required
            label="Şifreyi onayla"
            placeholder="Şifre"
            className="text-sm"
            letIcon={true}
            value={userPassword.confirmPassword}
            onChange={(e) => {
              setUserPassword((prev) => {
                return {
                  ...prev,
                  confirmPassword: e,
                };
              });
            }}
            minLength={4}
            maxLength={20}
          />
        </div>

        <div className="flex justify-end mt-8">
          <button
            type="submit"
            disabled={loading}
            className={TOOLBAR_BTN_PRIMARY}
          >
            Kaydet
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditUserPassword;
