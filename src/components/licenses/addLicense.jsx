import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePopup } from "../../context/PopupContext";
import {
  addLicense,
  resetAddLicenseState,
} from "../../redux/licenses/addLicenseSlice";
import toast from "react-hot-toast";
import { CancelI } from "../../assets/icon";
import { useLocation, useParams } from "react-router-dom";
import CustomSelect from "../common/customSelector";
import {
  getRestaurants,
  resetGetRestaurantsState,
} from "../../redux/restaurants/getRestaurantsSlice";
import {
  formatLisansPackages,
  formatSelectorData,
  getDateRange,
} from "../../utils/utils";
import {
  getLicensePackages,
  resetGetLicensePackages,
} from "../../redux/licensePackages/getLicensePackagesSlice";

const AddLicense = ({ onSuccess }) => {
  const { setShowPopup, setPopupContent } = usePopup();
  const params = useParams();
  const location = useLocation();
  const restaurantId = params.id;
  const { userId } = location.state || {};

  const handleClick = () => {
    setPopupContent(
      <AddLicensesPopup
        onSuccess={onSuccess}
        userId={userId}
        restaurantId={restaurantId}
      />
    );
    setShowPopup(true);
  };

  return (
    <button
      className="h-11 whitespace-nowrap text-[--primary-2] px-3 rounded-md text-sm font-normal border-[1.5px] border-solid border-[--primary-2]"
      onClick={handleClick}
    >
      Add License
    </button>
  );
};

export default AddLicense;

// EDIT RESTAURANT POPUP
function AddLicensesPopup({ onSuccess, userId, restaurantId }) {
  const dispatch = useDispatch();
  const toastId = useRef();

  const { setShowPopup, setPopupContent } = usePopup();

  const { loading, success, error } = useSelector(
    (state) => state.licenses.addLicense
  );

  const {
    loading: restaurantsLoading,
    success: restaurantsSuccess,
    error: restaurantsError,
    restaurants,
  } = useSelector((state) => state.restaurants.getRestaurants);

  const {
    loading: licensePackagesLoading,
    success: licensePackagesSuccess,
    error: licensePackagesError,
    licensePackages,
  } = useSelector((state) => state.licensePackages.getLicensePackages);

  const [licenseData, setLicenseData] = useState({
    restaurantId: { value: null, label: "Restoran Seç", id: null },
    marketplaceId: { value: null, label: "Lisans Paketi Seç", id: null },
    userId: null,
    time: null,
  });
  const [restaurantsData, setRestaurantsData] = useState([]);
  const [licensePackagesData, setLicensePackagesData] = useState([]);

  const closeForm = () => {
    setPopupContent(null);
    setShowPopup(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      addLicense({
        restaurantId: licenseData.restaurantId.id,
        userId: licenseData.userId,
        marketplaceId: licenseData.marketplaceId.id,
        startDateTime: getDateRange(licenseData.time).startDateTime,
        endDateTime: getDateRange(licenseData.time).endDateTime,
        isActive: true,
      })
    );
  };

  // TOAST
  useEffect(() => {
    if (loading) {
      toastId.current = toast.loading("İşleniyor 🤩...");
    }
    if (error) {
      toastId.current && toast.dismiss(toastId.current);
      if (error?.message_TR) {
        toast.error(error.message_TR + "🙁");
      } else {
        toast.error("Something went wrong");
      }
      dispatch(resetAddLicenseState());
    } else if (success) {
      toastId.current && toast.dismiss(toastId.current);
      onSuccess();
      setShowPopup(false);
      setPopupContent(null);
      toast.success("Lisans barıyla eklendi 🥳🥳");
      dispatch(resetAddLicenseState());
    }
  }, [loading, success, error]);

  //GET LISANS PACKAGES
  useEffect(() => {
    if (!licensePackages) {
      dispatch(getLicensePackages());
    } else {
      setLicensePackagesData(formatLisansPackages(licensePackages.data));
    }

    return () => {
      if (licensePackages) {
        dispatch(resetGetLicensePackages());
      }
    };
  }, [licensePackages]);

  // SET LISANS PACKAGES
  useEffect(() => {
    if (licensePackagesError) {
      if (error?.message_TR) {
        toast.error(licensePackagesError.message_TR);
      } else {
        toast.error("Something went wrong");
      }
      dispatch(resetGetLicensePackages());
    }
  }, [licensePackagesError]);

  // GET RESTAURANTS
  useEffect(() => {
    if (!restaurants) {
      dispatch(
        getRestaurants({
          pageNumber: 0,
          pageSize: 0,
          searchKey: null,
          active: null,
          city: null,
          district: null,
          neighbourhood: null,
        })
      );
    }
  }, [restaurants]);

  // SET RESTAURANTS
  useEffect(() => {
    if (restaurantsError) {
      if (restaurantsError?.message_TR) {
        toast.error(restaurantsError.message_TR);
      } else {
        toast.error("Something went wrong");
      }
      dispatch(resetGetRestaurantsState());
    }

    if (restaurants) {
      setRestaurantsData(formatSelectorData(restaurants.data, true));
      const restaurant = restaurants.data.filter(
        (data) => data.id === restaurantId
      )[0];
      if (restaurant) {
        setLicenseData((prev) => {
          return {
            ...prev,
            restaurantId: {
              value: restaurant.id,
              label: restaurant.name,
              id: restaurant.id,
            },
            userId: restaurant.userId,
          };
        });
      }
      dispatch(resetGetRestaurantsState());
    }
  }, [restaurants, restaurantsError]);

  return (
    <div className=" w-full pt-12 pb-8 bg-[--white-1] rounded-lg border-2 border-solid border-[--border-1] text-[--black-2] text-base overflow-visible relative">
      <div className="flex flex-col bg-[--white-1] relative">
        <div className="absolute -top-6 right-3 z-[50]">
          <div
            className="text-[--primary-2] p-2 border border-solid border-[--primary-2] rounded-full cursor-pointer hover:bg-[--primary-2] hover:text-[--white-1] transition-colors"
            onClick={closeForm}
          >
            <CancelI />
          </div>
        </div>

        <h1 className="self-center text-2xl font-bold">Lisans Ekle</h1>
        <div className="flex flex-col px-4 sm:px-14 mt-9 w-full text-left">
          <form onSubmit={handleSubmit}>
            <div className="flex max-sm:flex-col sm:gap-4">
              <CustomSelect
                label="Restoran"
                required={true}
                disabled={restaurantsLoading}
                value={licenseData.restaurantId}
                options={restaurantsData}
                onChange={(selectedOption) =>
                  setLicenseData((prev) => {
                    return {
                      ...prev,
                      restaurantId: selectedOption,
                      userId: selectedOption.userId,
                    };
                  })
                }
              />
              <CustomSelect
                label="Lisans Paketi"
                required={true}
                value={licenseData.marketplaceId}
                options={licensePackagesData}
                onChange={(selectedOption) =>
                  setLicenseData((prev) => {
                    return {
                      ...prev,
                      marketplaceId: selectedOption,
                      time: selectedOption.time,
                    };
                  })
                }
              />
            </div>

            <div className="w-full flex justify-end mt-10">
              <button
                disabled={false}
                className={`py-2 px-3 bg-[--primary-1] text-[--white-1] rounded-lg`}
                type="submit"
              >
                Kaydet
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
