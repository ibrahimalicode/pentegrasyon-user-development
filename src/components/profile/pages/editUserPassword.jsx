//MOD
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//COMP
import CustomInput from "../../common/customInput";

// REDUX
import {
  resetUpdateUserPassword,
  updateUserPassword,
} from "../../../redux/user/updateUserPasswordSlice";
import Button from "../../common/button";

const EditUserPassword = () => {
  const toastId = useRef();
  const dispatch = useDispatch();

  const { loading, success, error } = useSelector(
    (state) => state.user.updatePassword
  );

  const [openPassword, setOpenPassword] = useState(false);
  const [userPassword, setUserPassword] = useState({
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (loading) {
      toastId.current = toast.loading("Updating user password...");
    } else if (error) {
      toast.dismiss(toastId.current);
      if (error?.message_TR) {
        toast.error(error.message_TR);
      } else {
        toast.error("Something went wrong");
      }
      dispatch(resetUpdateUserPassword());
    } else if (success) {
      toast.dismiss(toastId.current);
      toast.success("User password updated");
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
    <section className="flex flex-col items-start pt-3.5 pr-20 pl-6 mt-10 w-full bg-[--white-1] min-h-0 max-md:px-5">
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="flex gap-4 mt-4 max-sm:flex-col">
          <CustomInput
            required={openPassword}
            label="Şifre"
            placeholder="Şifre"
            className="py-3.5 text-sm"
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
          />
          <CustomInput
            required={openPassword}
            label="Şifreyi onayla"
            placeholder="Şifre"
            className="py-3.5 text-sm"
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
          />
        </div>

        <div className="flex justify-end mt-16">
          <Button
            text="Kaydet"
            className="bg-[--primary-1] text-[--white-1] text-[1.1rem] font-light rounded-xl py-[.8rem] sm:px-16 border-[0px]"
            type="submit"
          />
        </div>
      </form>
    </section>
  );
};

export default EditUserPassword;
