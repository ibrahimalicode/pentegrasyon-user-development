import { useEffect, useMemo, useState } from "react";
import CustomInput from "../../common/customInput";
import { getAuth } from "../../../redux/api";
import CustomPhoneInput from "../../common/customPhoneInput";
import { formatEmail } from "../../../utils/utils";
import Button from "../../common/button";
import CustomSelect from "../../common/customSelector";
import toast from "react-hot-toast";
import { isEqual } from "lodash";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../redux/user/getUserSlice";
import { getCities } from "../../../redux/data/getCitiesSlice";
import { getDistricts } from "../../../redux/data/getDistrictsSlice";
import {
  resetUpdateUserData,
  updateUserData,
} from "../../../redux/user/updateUserDataSlice";

const EditUserProfile = () => {
  const dispatch = useDispatch();

  const { loading, success, error } = useSelector(
    (state) => state.user.updateUserData
  );
  const {
    loading: getUserLoading,
    success: getUserSuccess,
    error: getUserError,
    user,
  } = useSelector((state) => state.user.getUser);

  const { cities } = useSelector((state) => state.data.getCities);
  const { success: districtsSuccess, districts } = useSelector(
    (state) => state.data.getDistricts
  );

  const [citiesData, setCitiesData] = useState([]);
  const [districtsData, setDistrictsData] = useState([]);
  const [userDataBefore, setUserDataBefore] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    city: null,
    district: null,
  });
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    city: null,
    district: null,
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (isEqual(userDataBefore, userData)) {
      toast.error("Hiç bir geğişiklik yapmadınız");
    } else {
      dispatch(
        updateUserData({
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
      dispatch(resetUpdateUserData());
    } else if (success) {
      dispatch(getUser());
      dispatch(resetUpdateUserData());
      toast.success("Profiliniz başarıyla güncelendi🤩");
    }
  }, [loading, success, error]);

  // GET THE ADMIN OR THE USER
  useEffect(() => {
    if (!user) {
      dispatch(getUser());
    }
  }, [user]);

  useEffect(() => {
    if (getUserSuccess) {
      setUserDataBefore((pre) => {
        return {
          ...pre,
          firstName: user.firstName,
          lastName: user.lastName,
          phoneNumber: "9" + user.phoneNumber,
          email: user.email,
          city: { label: user.city, value: null, id: null },
          district: { label: user.district, value: null, id: null },
          dealerId: user.dealerId,
        };
      });
      setUserData((pre) => {
        return {
          ...pre,
          firstName: user.firstName,
          lastName: user.lastName,
          phoneNumber: "9" + user.phoneNumber,
          email: user.email,
          city: { label: user.city, value: null, id: null },
          district: { label: user.district, value: null, id: null },
          dealerId: user.dealerId,
        };
      });
    }
  }, [getUserSuccess]);

  // GET CITIES IF THERE IS NOT
  useEffect(() => {
    if (!cities) {
      dispatch(getCities());
    } else if (cities) {
      setCitiesData(cities);
      if (!userData?.city?.id && userData?.city?.label) {
        const city = cities.filter(
          (city) => city.label === userData.city.label
        )[0];
        if (city) {
          setUserDataBefore((pre) => {
            return {
              ...pre,
              city,
            };
          });
          setUserData((pre) => {
            return {
              ...pre,
              city,
            };
          });
        }
      }
    }
  }, [cities, userData.city]);

  // GET DISTRICTS
  useEffect(() => {
    if (userData?.city?.id) {
      dispatch(getDistricts({ cityId: userData.city.id }));
    }
  }, [userData.city]);

  useEffect(() => {
    if (districtsSuccess) {
      setDistrictsData(districts);
    }
  }, [districtsSuccess, districts]);

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
        <div className="w-full max-w-3xl flex max-sm:flex-col sm:gap-10 gap-2 max-sm:items-center">
          <CustomSelect
            label="İl"
            options={citiesData}
            value={userData?.city ? userData.city : { label: "Şehir seç" }}
            onChange={(selectedOption) => {
              setUserData((pre) => {
                return {
                  ...pre,
                  city: selectedOption,
                };
              });
            }}
          />
          <CustomSelect
            label="İlçe"
            options={districtsData}
            value={
              userData?.district ? userData.district : { label: "İlçe seç" }
            }
            onChange={(selectedOption) => {
              setUserData((pre) => {
                return {
                  ...pre,
                  district: selectedOption,
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

export default EditUserProfile;
