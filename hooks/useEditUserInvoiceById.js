//MODULES
import toast from "react-hot-toast";
import isEqual from "lodash/isEqual";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//REDUX
import { getDistricts } from "../src/redux/data/getDistrictsSlice";
import { getNeighs } from "../src/redux/data/getNeighsSlice";
import {
  addUserInvoiceById,
  resetaddUserInvoice,
} from "../src/redux/users/addUserInvoiceByIdSlice";
import {
  resetUpdateUserInvoice,
  updateUserInvoiceById,
} from "../src/redux/users/updateUserInvoiceByIdSlice";
import { getCities } from "../src/redux/data/getCitiesSlice";

export const useEditUserInvoiceById = (dispatcher, user) => {
  const toastId = useRef();
  const dispatch = useDispatch();

  const { loading, success, error } = useSelector(
    (state) => state.users.updateInvoice
  );

  const {
    loading: addInvoiceLoading,
    success: addInvoiceSuccess,
    error: addInvoiceError,
  } = useSelector((state) => state.users.addInvoice);

  const { cities: citiesData } = useSelector((state) => state.data.getCities);

  const { districts: districtsData, success: districtsSuccess } = useSelector(
    (state) => state.data.getDistricts
  );

  const { neighs: neighsData, success: neighsSuccess } = useSelector(
    (state) => state.data.getNeighs
  );

  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [neighs, setNeighs] = useState([]);
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
    }
  }, [loading, success, error, dispatch]);

  //TOAST TO ADD INVOICE IF THERE IS NO
  useEffect(() => {
    if (addInvoiceLoading) {
      toastId.current = toast.loading("Updating Invoice...");
    } else if (addInvoiceError) {
      toastId.current && toast.dismiss(toastId.current);
      if (error?.message_TR) {
        toast.error(error.message_TR);
      } else {
        toast.error("Something went wrong");
      }
      dispatch(resetaddUserInvoice());
    } else if (addInvoiceSuccess) {
      toastId.current && toast.dismiss(toastId.current);
      toast.success("Invoice updated successfully");
      dispatch(resetaddUserInvoice());
    }
  }, [addInvoiceLoading, success, addInvoiceError, dispatch]);

  // GET AND SET CITIES IF THERE IS NO CITIES
  useEffect(() => {
    if (!citiesData) {
      dispatch(getCities());
    } else {
      setCities(citiesData);
    }
  }, [citiesData]);

  // SET INVOICE IF THERE IS
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
        }
      }
    }
  }, [userInvoice.city]);

  // SET DISTRICTS
  useEffect(() => {
    if (districtsSuccess) {
      if (dispatcher.current === "userInvoice") {
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

  function handleSubmit() {
    const equalData = isEqual(userInvoiceBefore, userInvoice);
    if (!equalData && user) {
      if (userInvoiceBefore) {
        dispatch(updateUserInvoiceById({ userId: user?.id, ...userInvoice }));
        console.log({ userId: user?.id, ...userInvoice });
      } else {
        dispatch(addUserInvoiceById({ userId: user?.id, ...userInvoice }));
      }
    }
  }

  return {
    userInvoice,
    setUserInvoice,
    cities,
    districts,
    neighs,
    handleSubmit,
    userInvoiceBefore,
  };
};
