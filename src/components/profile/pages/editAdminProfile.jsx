import { useEffect, useMemo, useState } from "react";
import CustomInput from "../../common/customInput";
import { getAuth } from "../../../redux/api";

import { useDispatch, useSelector } from "react-redux";
import { getAdmin } from "../../../redux/admin/getAdminSlice";
import CustomPhoneInput from "../../common/customPhoneInput";
import { formatEmail } from "../../../utils/utils";
import Button from "../../common/button";

import { isEqual } from "lodash";
import toast from "react-hot-toast";
import {
  resetUpdateAdminState,
  updateAdminData,
} from "../../../redux/admin/updateAdminDataSlice";

const EditAdminProfile = () => {
  const dispatch = useDispatch();

  const { loading, success, error } = useSelector(
    (state) => state.admin.updateAdminData
  );
  const {
    loading: getAdminLoading,
    success: getAdminSuccess,
    error: getAdminError,
    admin,
  } = useSelector((state) => state.admin.getAdmin);

  const [userDataBefore, setUserDataBefore] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
  });
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (isEqual(userDataBefore, userData)) {
      toast.error("Hiç bir geğişiklik yapmadınız");
    } else {
      dispatch(
        updateAdminData({
          ...userData,
          phoneNumber: userData.phoneNumber.slice(1),
        })
      );
    }
  }

  // TOAST
  useEffect(() => {
    if (error) {
      if (error?.message_TR) {
        toast.error(error.message_TR + "🙁");
      } else {
        toast.error("Something went wrong 🙁");
      }
      dispatch(resetUpdateAdminState());
    } else if (success) {
      toast.success("Profiliniz başarıyla güncelendi🤩");
      dispatch(getAdmin());
    }
  }, [loading, success, error]);

  // GET THE ADMIN
  useEffect(() => {
    if (!admin) {
      dispatch(getAdmin());
    }
  }, [admin]);

  useEffect(() => {
    if (getAdminSuccess) {
      setUserDataBefore((pre) => {
        return {
          ...pre,
          firstName: admin.firstName,
          lastName: admin.lastName,
          phoneNumber: "9" + admin.phoneNumber,
          email: admin.email,
          roleId: admin.roleId,
        };
      });
      setUserData((pre) => {
        return {
          ...pre,
          firstName: admin.firstName,
          lastName: admin.lastName,
          phoneNumber: "9" + admin.phoneNumber,
          email: admin.email,
          roleId: admin.roleId,
        };
      });
    }
  }, [getAdminSuccess]);

  return (
    <section className="flex flex-col items-start pt-3.5 pr-20 pb-96 pl-6 mt-10 w-full bg-[--white-1] min-h-0 max-md:px-5 max-md:pb-24">
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="w-full max-w-3xl flex max-sm:flex-col sm:gap-10 gap-2 max-sm:items-center">
          <CustomInput
            label="Ad"
            value={userData.firstName}
            onChange={(e) => {
              setUserData((pre) => {
                return {
                  ...pre,
                  firstName: e,
                };
              });
            }}
          />
          <CustomInput
            label="Soyad"
            value={userData.lastName}
            onChange={(e) => {
              setUserData((pre) => {
                return {
                  ...pre,
                  lastName: e,
                };
              });
            }}
          />
        </div>
        <div className="w-full max-w-3xl flex max-sm:flex-col sm:gap-10 gap-2 max-sm:items-center">
          <CustomPhoneInput
            label="Telefon"
            value={userData.phoneNumber}
            onChange={(e) => {
              setUserData((pre) => {
                return {
                  ...pre,
                  phoneNumber: e,
                };
              });
            }}
          />

          <CustomInput
            label="E-Posta"
            value={userData.email}
            onChange={(e) => {
              setUserData((pre) => {
                return {
                  ...pre,
                  email: formatEmail(e),
                };
              });
            }}
          />
        </div>

        <div className="flex justify-end mt-16">
          <Button
            text="Kaydet"
            className="bg-[--primary-1] text-[--white-1]"
            type="submit"
          />
        </div>
      </form>
    </section>
  );
};

export default EditAdminProfile;
