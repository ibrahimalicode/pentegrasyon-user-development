import { useEffect, useRef, useState } from "react";
import { ArrowID, ArrowIU } from "../../../assets/icon";
import CustomInput from "../../common/CustomInput";
import CustomSelect from "../../common/CustomSelector";
import CustomTextarea from "../../common/customTextarea";
import isEqual from "lodash/isEqual";
import toast from "react-hot-toast";

//REDUX
import { useDispatch, useSelector } from "react-redux";
import { getDistricts } from "../../../redux/data/getDistrictsSlice";
import { getNeighs } from "../../../redux/data/getNeighsSlice";
import {
  resetUpdateUserInvoice,
  updateUserInvoice,
} from "../../../redux/users/updateUserInvoiceSlice";

const EditUserInvoice = ({
  cities,
  submitInvoice,
  setSubmitInvoice,
  submit,
  setSubmit,
  dispatcher,
}) => {
  const dispatch = useDispatch();
  const toastId = useRef();

  const { user } = useSelector((state) => state.users.getUser);

  const { loading, success, error } = useSelector(
    (state) => state.users.updateInvoice
  );

  const { districts: districtsData, success: districtsSuccess } = useSelector(
    (state) => state.data.getDistricts
  );

  const { neighs: neighsData, success: neighsSuccess } = useSelector(
    (state) => state.data.getNeighs
  );

  const [districts, setDistricts] = useState([]);
  const [neighs, setNeighs] = useState([]);
  const [openFatura, setOpenFatura] = useState(false);
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

  //TOAST
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
      setSubmit(false);
      setSubmitInvoice({ status: false, submit: false });
      dispatch(resetUpdateUserInvoice());
    } else if (success) {
      toastId.current && toast.dismiss(toastId.current);
      toast.success("Invoice updated successfully");
      dispatch(resetUpdateUserInvoice());
    }
  }, [loading, success, error, dispatch]);

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
      dispatcher.current = "userInvoice";
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
          dispatcher.current = "userInvoice";
          setUserInvoice((prev) => {
            return {
              ...prev,
              district: null,
            };
          });
        }
      }
    }
  }, [userInvoice.city]);

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
          setUserInvoice((prev) => {
            return {
              ...prev,
              neighbourhood: null,
            };
          });
        }
      }
    }
  }, [userInvoice.district]);

  // SET DISTRICTS ACCORDING TO USER OR INVOICE
  useEffect(() => {
    if (districtsSuccess) {
      if ((dispatcher.current = "userInvoice")) {
        setDistricts(districtsData);
      }
    }
  }, [districtsSuccess]);

  // SET NEIGHBOURHOODS
  useEffect(() => {
    if (neighsSuccess) {
      setNeighs(neighsData);
    }
  }, [neighsSuccess]);

  // TELL THE PARENT THE STATUS
  useEffect(() => {
    if (submitInvoice.submit) {
      setSubmitInvoice({ status: true, submit: false });
    }
  }, [submitInvoice.submit]);

  useEffect(() => {
    if (submit) {
      if (openFatura) {
        const equalData = isEqual(userInvoiceBefore, userInvoice);
        if (!equalData) {
          if (userInvoiceBefore) {
            dispatch(updateUserInvoice({ userId: user.id, ...userInvoice }));
          } else {
            console.log("Add Invoice");
          }
        }
      }
    }
  }, [submit]);

  return (
    <>
      <div
        className="w-full flex border-b border-solid border-[--border-1] cursor-pointer mt-14"
        onClick={() => setOpenFatura(!openFatura)}
      >
        <h1 className="w-full text-center text-lg font-normal text-[--black-3]">
          Fatura Adresi
        </h1>
        <span>
          {openFatura ? (
            <ArrowIU className="size-5" />
          ) : (
            <ArrowID className="size-5" />
          )}
        </span>
      </div>
      {openFatura && (
        <>
          <div className="flex gap-4">
            <CustomInput
              required={true}
              label="Resmi Ünvan"
              placeholder="Resmi Ünvan"
              className="py-[.45rem] text-sm"
              value={userInvoice.title}
              onChange={(e) => {
                setUserInvoice((prev) => {
                  return {
                    ...prev,
                    title: e.target.value,
                  };
                });
              }}
            />
          </div>
          <div className="flex gap-4">
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
                    tradeRegistryNumber: e.target.value,
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
                    taxOffice: e.target.value,
                  };
                });
              }}
            />
          </div>
          <div className="flex gap-4">
            <CustomInput
              required={true}
              type="number"
              label="VTic.Sic.No"
              placeholder="VTic.Sic.No"
              className="py-[.45rem] text-sm"
              value={userInvoice.taxNumber}
              onChange={(e) => {
                setUserInvoice((prev) => {
                  return {
                    ...prev,
                    taxNumber: e.target.value,
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
                    mersisNumber: e.target.value,
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
          <div className="flex gap-4">
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
      )}
    </>
  );
};

export default EditUserInvoice;
