import { useEffect, useRef, useState } from "react";
import CustomCheckbox from "../../../common/customCheckbox";
import CustomInput from "../../../common/customInput";
import CustomPhoneInput from "../../../common/customPhoneInput";
import CustomSelect from "../../../common/customSelector";
import { formatEmail } from "../../../../utils/utils";
import toast from "react-hot-toast";
import isEqual from "lodash/isEqual";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { getDistricts } from "../../../../redux/data/getDistrictsSlice";
import {
  resetUpdateUser,
  updateUserData,
} from "../../../../redux/users/updateUserDataSlice";

const EditUserdata = ({
  cities,
  dispatcher,
  submit,
  setSubmit,
  setNoChange,
}) => {
  const dispatch = useDispatch();
  const toastId = useRef();

  const { loading, success, error } = useSelector(
    (state) => state.users.updateUser
  );

  const { user } = useSelector((state) => state.users.getUser);

  const { districts: districtsData, success: districtsSuccess } = useSelector(
    (state) => state.data.getDistricts
  );

  const [districts, setDistricts] = useState([]);
  const [userDataBefore, setUserDataBefore] = useState(null);
  const [userData, setUserData] = useState({
    userId: "",
    dealerId: "",
    email: "",
    phoneNumber: "",
    firstName: "",
    lastName: "",
    city: null,
    district: null,
    checked: false,
  });

  useEffect(() => {
    if (loading) {
      toastId.current = toast.loading("Updating user data...");
    } else if (error) {
      toastId.current && toast.remove(toastId.current);
      if (error?.message_TR) {
        toast.error(error.message_TR);
      } else {
        toast.error("Something went wrong");
      }
      setSubmit(false);
      dispatch(resetUpdateUser());
    } else if (success) {
      toastId.current && toast.remove(toastId.current);
      toast.success("User data updated successfully");
      dispatch(resetUpdateUser());
    }
  }, [loading, success, error, dispatch]);

  // GET AND SET USER IF THERE IS NOT
  useEffect(() => {
    if (user) {
      setUserDataBefore({
        userId: user.id,
        dealerId: user.dealerId,
        email: user.email,
        phoneNumber: "9" + user.phoneNumber,
        firstName: user.firstName,
        lastName: user.lastName,
        city: {
          value: user.city,
          label: user.city,
          id: null,
        },
        district: { value: user.district, label: user.district, id: null },
        checked: false,
      });
      setUserData({
        userId: user.id,
        dealerId: user.dealerId,
        email: user.email,
        phoneNumber: "9" + user.phoneNumber,
        firstName: user.firstName,
        lastName: user.lastName,
        city: {
          value: user.city,
          label: user.city,
          id: null,
        },
        district: { value: user.district, label: user.district, id: null },
        checked: false,
      });
    }
  }, [user]);

  // GET DISTRICTS WHENEVER USER'S CITY CHANGES
  useEffect(() => {
    if (userData.city?.id) {
      dispatch(getDistricts({ cityId: userData.city.id }));
      dispatcher.current = "userData";
      setUserData((prev) => {
        return {
          ...prev,
          district: null,
        };
      });
    } else if (userData.city?.label) {
      if (cities.length > 0) {
        const cityId = cities.filter(
          (city) =>
            city.label.toLowerCase() === userData.city.label.toLowerCase()
        )[0]?.id;
        if (cityId) {
          dispatch(getDistricts({ cityId: cityId }));
          dispatcher.current = "userData";
        }
      }
    }
  }, [userData.city]);

  // SET DISTRICTS ACCORDING TO USER OR INVOICE
  useEffect(() => {
    if (districtsSuccess) {
      if (dispatcher.current === "userData") {
        setDistricts(districtsData);
        // to set the district id in the first landing
        if (!userData.district || !userData.district?.id) {
          const district = districtsData.filter(
            (dist) =>
              dist?.label.toLowerCase() ===
              userData.district?.label.toLowerCase()
          )[0];
          if (district) {
            setUserDataBefore((prev) => {
              return {
                ...prev,
                district,
              };
            });
            setUserData((prev) => {
              return {
                ...prev,
                district,
              };
            });
          }
        }
      }
    }
  }, [districtsSuccess]);

  useEffect(() => {
    if (submit) {
      const equalData = isEqual(userDataBefore, userData);
      if (!equalData) {
        dispatch(updateUserData({ ...userData }));
        setNoChange((prev) => {
          return {
            ...prev,
            userData: false,
          };
        });
      } else {
        setSubmit(false);
        setNoChange((prev) => {
          return {
            ...prev,
            userData: true,
          };
        });
        // console.log("Her hangı bir deişiklik yapmadınız [user data]");
      }
    }
  }, [submit]);

  return (
    <>
      <div className="flex gap-4">
        <CustomInput
          required={true}
          label="Ad"
          placeholder="Ad"
          className="py-[.45rem] text-sm"
          value={userData.firstName}
          onChange={(e) => {
            setUserData((prev) => {
              return {
                ...prev,
                firstName: e,
              };
            });
          }}
        />
        <CustomInput
          required={true}
          label="Soyad"
          placeholder="Soyad"
          className="py-[.45rem] text-sm"
          value={userData.lastName}
          onChange={(e) => {
            setUserData((prev) => {
              return {
                ...prev,
                lastName: e,
              };
            });
          }}
        />
      </div>
      <div className="flex gap-4">
        <CustomPhoneInput
          required={true}
          label="Telefone"
          placeholder="Telefone"
          className="py-[.45rem] text-sm"
          value={userData.phoneNumber}
          onChange={(phone) => {
            setUserData((prev) => {
              return {
                ...prev,
                phoneNumber: phone,
              };
            });
          }}
          maxLength={14}
        />
        <CustomInput
          required={true}
          label="E-Posta"
          placeholder="E-Posta"
          className="py-[.45rem] text-sm"
          value={userData.email}
          onChange={(e) => {
            setUserData((prev) => {
              return {
                ...prev,
                email: formatEmail(e),
              };
            });
          }}
        />
      </div>

      <div className="flex gap-4">
        <CustomSelect
          required={true}
          label="Şehir"
          placeholder="Ad"
          style={{ padding: "1px 0px" }}
          className="text-sm"
          value={
            userData.city ? userData.city : { value: null, label: "Şehir seç" }
          }
          options={[{ value: null, label: "Şehir seç" }, ...cities]}
          onChange={(selectedOption) => {
            setUserData((prev) => {
              return {
                ...prev,
                city: selectedOption,
              };
            });
          }}
        />
        <CustomSelect
          required={true}
          label="İlçe"
          placeholder="Ad"
          style={{ padding: "1px 0px" }}
          className="text-sm"
          value={
            userData.district
              ? userData.district
              : { value: null, label: "İlçe seç" }
          }
          options={[{ value: null, label: "İlçe seç" }, ...districts]}
          onChange={(selectedOption) => {
            setUserData((prev) => {
              return {
                ...prev,
                district: selectedOption,
              };
            });
          }}
        />
      </div>

      <div className="w-full flex justify-between mt-8">
        <CustomCheckbox
          label="Kayıt Bilgilendirmesi gönder"
          className="scale-95 font-[350]"
          checked={userData.checked}
          onChange={() => {
            setUserData((prev) => {
              return {
                ...prev,
                checked: !userData.checked,
              };
            });
          }}
        />
      </div>
    </>
  );
};

export default EditUserdata;
