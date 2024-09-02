//MODULE
import toast from "react-hot-toast";
import isEqual from "lodash/isEqual";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//COMP
import Button from "../../common/button";
import CustomInput from "../../common/customInput";
import CustomSelect from "../../common/customSelector";
import CustomTextarea from "../../common/customTextarea";

//REDUX
import {
  addUserInvoice,
  resetaddUserInvoice,
} from "../../../redux/user/addUserInvoiceSlice";
import {
  updateUserInvoice,
  resetUpdateUserInvoice,
} from "../../../redux/user/updateUserInvoiceSlice";
import { getUser } from "../../../redux/user/getUserSlice";
import { getNeighs } from "../../../redux/data/getNeighsSlice";
import { getDistricts } from "../../../redux/data/getDistrictsSlice";

const EditUserInvoice = ({ cities, user }) => {
  const toastId = useRef();
  const dispatch = useDispatch();

  const { loading, success, error } = useSelector(
    (state) => state.user.updateInvoice
  );

  const {
    loading: addInvoiceLoading,
    success: addInvoiceSuccess,
    error: addInvoiceError,
  } = useSelector((state) => state.users.addInvoice);

  const { districts: districtsData, success: districtsSuccess } = useSelector(
    (state) => state.data.getDistricts
  );

  const { neighs: neighsData, success: neighsSuccess } = useSelector(
    (state) => state.data.getNeighs
  );

  const [neighs, setNeighs] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [userInvoiceBefore, setUserInvoiceBefore] = useState();
  const [userInvoice, setUserInvoice] = useState({
    taxOffice: "",
    taxNumber: "",
    title: "",
    address: "",
    city: null,
    district: null,
    neighbourhood: "",
    tradeRegistryNumber: "",
    mersisNumber: "",
  });

  //TOAST TO UPDATE
  useEffect(() => {
    if (loading) {
      toastId.current = toast.loading("Updating Invoice...");
    } else if (error) {
      toastId.current && toast.dismiss(toastId.current);
      if (error?.message_TR) {
        toast.error(error.message_TR);
      } else {
        toast.error("Something went wrong");
      }
      dispatch(resetUpdateUserInvoice());
    } else if (success) {
      toastId.current && toast.dismiss(toastId.current);
      toast.success("Invoice updated successfully");
      dispatch(resetUpdateUserInvoice());
      dispatch(getUser());
    }
  }, [loading, success, error, dispatch]);

  //TOAST TO ADD INVOICE IF THERE IS NO
  useEffect(() => {
    if (addInvoiceLoading) {
      toastId.current = toast.loading("Updating Invoice...");
    } else if (addInvoiceError) {
      toastId.current && toast.dismiss(toastId.current);
      if (addInvoiceError?.message_TR) {
        toast.error(addInvoiceError.message_TR);
      } else {
        toast.error("Something went wrong");
      }
      dispatch(resetaddUserInvoice());
    } else if (addInvoiceSuccess) {
      toastId.current && toast.dismiss(toastId.current);
      toast.success("Invoice updated successfully");
      dispatch(resetaddUserInvoice());
      dispatch(getUser());
    }
  }, [addInvoiceLoading, success, addInvoiceError, dispatch]);

  // GET AND SET INVOICE IF THERE IS
  useEffect(() => {
    if (user) {
      if (user.userInvoiceAddressDTO) {
        const userInv = user.userInvoiceAddressDTO;
        setUserInvoiceBefore({
          taxOffice: userInv.taxOffice,
          taxNumber: userInv.taxNumber,
          title: userInv.title,
          address: userInv.address,
          city: { value: userInv.city, label: userInv.city, id: null },
          district: {
            value: userInv.district,
            label: userInv.district,
            id: null,
          },
          neighbourhood: {
            value: userInv.neighbourhood,
            label: userInv.neighbourhood,
            id: null,
          },
          tradeRegistryNumber: userInv.tradeRegistryNumber,
          mersisNumber: userInv.mersisNumber,
        });
        setUserInvoice({
          taxOffice: userInv.taxOffice,
          taxNumber: userInv.taxNumber,
          title: userInv.title,
          address: userInv.address,
          city: { value: userInv.city, label: userInv.city, id: null },
          district: {
            value: userInv.district,
            label: userInv.district,
            id: null,
          },
          neighbourhood: {
            value: userInv.neighbourhood,
            label: userInv.neighbourhood,
            id: null,
          },
          tradeRegistryNumber: userInv.tradeRegistryNumber,
          mersisNumber: userInv.mersisNumber,
        });
      }
    }
  }, [user]);

  // GET DISTRICTS WHENEVER INVOICE'S CITY CHANGES
  useEffect(() => {
    if (userInvoice.city?.id) {
      dispatch(getDistricts({ cityId: userInvoice.city.id }));
      setUserInvoice((prev) => {
        return {
          ...prev,
          district: null,
        };
      });
    } else if (userInvoice.city?.label) {
      if (cities.length > 0) {
        const cityId = cities.filter(
          (city) =>
            city.label.toLowerCase() === userInvoice.city.label.toLowerCase()
        )[0]?.id;
        if (cityId) {
          dispatch(getDistricts({ cityId: cityId }));
        }
      }
    }
  }, [userInvoice.city]);

  // SET DISTRICTS
  useEffect(() => {
    if (districtsSuccess) {
      setDistricts(districtsData);
      if (!userInvoice.district || !userInvoice.district?.id) {
        const district = districtsData.filter(
          (dist) =>
            dist?.label.toLowerCase() ===
            userInvoice.district?.label.toLowerCase()
        )[0];
        if (district) {
          setUserInvoiceBefore((prev) => {
            return {
              ...prev,
              district,
            };
          });
          setUserInvoice((prev) => {
            return {
              ...prev,
              district,
            };
          });
        }
      }
    }
  }, [districtsSuccess]);

  // GET NEIGHBOURHOODS WHENEVER THE INVOICE DISTRICT CHANGES
  useEffect(() => {
    if (userInvoice.district?.id && userInvoice.city?.id) {
      dispatch(
        getNeighs({
          cityId: userInvoice.city.id,
          districtId: userInvoice.district.id,
        })
      );
      setUserInvoice((prev) => {
        return {
          ...prev,
          neighbourhood: null,
        };
      });
    } else if (userInvoice.district?.label && userInvoice.city?.label) {
      if (cities.length > 0 && districts.length > 0) {
        const cityLabel = (userInvoice.city?.label).toLowerCase();
        const districtLabel = (userInvoice.district?.label).toLowerCase();

        const cityId = cities.filter(
          (city) => city.label.toLowerCase() === cityLabel
        )[0]?.id;

        const districtId = districts.filter(
          (district) => district.label.toLowerCase() === districtLabel
        )[0]?.id;
        if (cityId && districtId) {
          dispatch(getNeighs({ cityId, districtId }));
        }
      }
    }
  }, [userInvoice.district]);

  // SET NEIGHBOURHOODS
  useEffect(() => {
    if (neighsSuccess) {
      setNeighs(neighsData);
      if (!userInvoice.neighbourhood?.id && userInvoice.neighbourhood?.label) {
        const neigh = neighsData.filter(
          (neigh) =>
            neigh.label.toLowerCase() ===
            userInvoice.neighbourhood.label.toLowerCase()
        )[0];
        if (neigh) {
          setUserInvoice((prev) => {
            return {
              ...prev,
              neighbourhood: neigh,
            };
          });
          setUserInvoiceBefore((prev) => {
            return {
              ...prev,
              neighbourhood: neigh,
            };
          });
        }
      }
    }
  }, [neighsSuccess]);

  // SUBMIT
  function handleSubmit(e) {
    e.preventDefault();

    const equalData = isEqual(userInvoiceBefore, userInvoice);

    if (!equalData) {
      if (userInvoiceBefore) {
        dispatch(updateUserInvoice({ userId: user.id, ...userInvoice }));
      } else {
        dispatch(addUserInvoice({ userId: user.id, ...userInvoice }));
      }
    } else {
      toast.error("Hiç bir geğişiklik yapmadınız");
    }
  }

  return (
    <section className="flex flex-col items-start pt-3.5 pr-20 pl-6 mt-10 w-full bg-[--white-1] min-h-0 max-md:px-5">
      <form className="w-full" onSubmit={handleSubmit}>
        <>
          <div className="flex gap-4 max-sm:flex-col mt-4">
            <CustomInput
              required={true}
              label="İsim/Ünvan"
              placeholder="İsim/Ünvan"
              className="py-[.45rem] text-sm"
              value={userInvoice.title}
              onChange={(e) => {
                setUserInvoice((prev) => {
                  return {
                    ...prev,
                    title: e,
                  };
                });
              }}
            />
          </div>
          <div className="flex gap-4 max-sm:flex-col">
            <CustomInput
              required={true}
              label="VKN veya TCKN"
              placeholder="VKN veya TCKN"
              className="py-[.45rem] text-sm"
              value={userInvoice.tradeRegistryNumber}
              onChange={(e) => {
                setUserInvoice((prev) => {
                  return {
                    ...prev,
                    tradeRegistryNumber: e,
                  };
                });
              }}
            />
            <CustomInput
              required={true}
              label="Vergi Dairesi"
              placeholder="Vergi Dairesi"
              className="py-[.45rem] text-sm"
              value={userInvoice.taxOffice}
              onChange={(e) => {
                setUserInvoice((prev) => {
                  return {
                    ...prev,
                    taxOffice: e,
                  };
                });
              }}
            />
          </div>
          <div className="flex gap-4 max-sm:flex-col">
            <CustomInput
              required={true}
              type="number"
              label="Tic.Sic.No"
              placeholder="Tic.Sic.No"
              className="py-[.45rem] text-sm"
              value={userInvoice.taxNumber}
              onChange={(e) => {
                setUserInvoice((prev) => {
                  return {
                    ...prev,
                    taxNumber: e,
                  };
                });
              }}
            />
            <CustomInput
              required={true}
              type="number"
              label="Mersis No"
              placeholder="Mersis No"
              className="py-[.45rem] text-sm"
              value={userInvoice.mersisNumber}
              onChange={(e) => {
                setUserInvoice((prev) => {
                  return {
                    ...prev,
                    mersisNumber: e,
                  };
                });
              }}
            />
          </div>
          <div className="flex gap-4 max-sm:flex-col">
            <CustomSelect
              required={true}
              label="Şehir"
              placeholder="Ad"
              style={{ padding: "1px 0px" }}
              className="text-sm"
              value={
                userInvoice.city
                  ? userInvoice.city
                  : { value: null, label: "Şehir seç" }
              }
              options={[{ value: null, label: "Şehir seç" }, ...cities]}
              onChange={(selectedOption) => {
                setUserInvoice((prev) => {
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
                userInvoice.district
                  ? userInvoice.district
                  : { value: null, label: "İlçe seç" }
              }
              options={[{ value: null, label: "İlçe seç" }, ...districts]}
              onChange={(selectedOption) => {
                setUserInvoice((prev) => {
                  return {
                    ...prev,
                    district: selectedOption,
                  };
                });
              }}
            />
          </div>
          <div className="flex gap-4 max-sm:flex-col">
            <CustomSelect
              required={true}
              label="Mahalle"
              placeholder="Ad"
              style={{ padding: "1px 0px" }}
              className="text-sm"
              value={
                userInvoice.neighbourhood
                  ? userInvoice.neighbourhood
                  : { value: null, label: "Mahalle Seç" }
              }
              options={[{ value: null, label: "Mahalle Seç" }, ...neighs]}
              onChange={(selectedOption) => {
                setUserInvoice((prev) => {
                  return {
                    ...prev,
                    neighbourhood: selectedOption,
                  };
                });
              }}
            />
            <CustomTextarea
              required={true}
              label="Adres"
              placeholder="Adres"
              className="pb-14 text-sm"
              value={userInvoice.address}
              onChange={(e) => {
                setUserInvoice((prev) => {
                  return {
                    ...prev,
                    address: e.target.value,
                  };
                });
              }}
            />
          </div>
        </>

        <div className="flex justify-end mt-16">
          <Button
            text="Kaydet"
            className="bg-[--primary-1] text-[--white-1] text-lg rounded-xl py-[.8rem] sm:px-16 border-[0px]"
            type="submit"
          />
        </div>
      </form>
    </section>
  );
};

export default EditUserInvoice;
