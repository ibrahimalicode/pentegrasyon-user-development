//MODULES
import { isEqual } from "lodash";
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//COMP
import { cn } from "../../../lib/utils";
import { EditI } from "../../../assets/icon";
import PopupShell from "../../common/popupShell";
import CustomInput from "../../common/customInput";
import ActionButton from "../../common/actionButton";
import CustomSelect from "../../common/customSelector";
import { usePopup } from "../../../context/PopupContext";
import CustomPhoneInput from "../../common/customPhoneInput";
import {
  TOOLBAR_BTN,
  TOOLBAR_BTN_PRIMARY,
} from "../../common/toolbarStyles";

//UTILS
import { googleMap } from "../../../utils/utils";

//REDUX
import {
  getLocation,
  resetGetLocationState,
} from "../../../redux/data/getLocationSlice";
import {
  getDistricts,
  resetGetDistrictsState,
} from "../../../redux/data/getDistrictsSlice";
import {
  getNeighs,
  resetGetNeighsState,
} from "../../../redux/data/getNeighsSlice";
import CustomTextarea from "../../common/customTextarea";
import {
  resetUpdateRestaurant,
  updateRestaurant,
} from "../../../redux/restaurants/updateRestaurantSlice";
import { getCities } from "../../../redux/data/getCitiesSlice";

const EditRestaurant = ({ restaurant, onSuccess }) => {
  const { setPopupContent } = usePopup();
  const handleClick = () => {
    setPopupContent(
      <EditRestaurantPopup restaurant={restaurant} onSuccess={onSuccess} />
    );
  };

  return (
    <ActionButton
      element={<EditI className="w-5" strokeWidth="1.8" />}
      element2="Düzenle"
      onClick={handleClick}
    />
  );
};

export default EditRestaurant;

// EDIT RESTAURANT POPUP
function EditRestaurantPopup({ restaurant, onSuccess }) {
  const dispatch = useDispatch();
  const toastId = useRef();
  const { setPopupContent } = usePopup();
  const {
    id: restaurantId,
    dealerId,
    userId,
    name,
    phoneNumber,
    latitude,
    longitude,
    city,
    district,
    neighbourhood,
    address,
    isActive,
  } = restaurant;

  const { loading, success, error } = useSelector(
    (state) => state.restaurants.updateRestaurant
  );

  const { cities: citiesData } = useSelector((state) => state.data.getCities);

  const { districts: districtsData, success: districtsSuccess } = useSelector(
    (state) => state.data.getDistricts
  );

  const { neighs: neighsData, success: neighsSuccess } = useSelector(
    (state) => state.data.getNeighs
  );

  const {
    loading: locationLoading,
    success: locationSuccess,
    error: locationError,
    location,
  } = useSelector((state) => state.data.getLocation);

  const [lat, setLat] = useState(restaurant.latitude);
  const [lng, setLng] = useState(restaurant.longitude);
  const [locationData, setLocationData] = useState({
    location: null,
    before: null,
  });
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [neighs, setNeighs] = useState([]);
  const [restaurantDataBefore, setRestaurantDataBefore] = useState({
    restaurantId,
    dealerId,
    userId,
    name,
    phoneNumber: "90" + phoneNumber,
    latitude,
    longitude,
    city: { label: city, value: city, id: null },
    district: { label: district, value: district, id: null },
    neighbourhood: { label: neighbourhood, value: neighbourhood, id: null },
    address,
    isActive,
  });
  const [restaurantData, setRestaurantData] = useState({
    restaurantId,
    dealerId,
    userId,
    name,
    phoneNumber: "90" + phoneNumber,
    latitude,
    longitude,
    city: { label: city, value: city, id: null },
    district: { label: district, value: district, id: null },
    neighbourhood: { label: neighbourhood, value: neighbourhood, id: null },
    address,
    isActive,
  });

  const closeForm = () => {
    setPopupContent(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const equalData = isEqual(restaurantDataBefore, restaurantData);
    if (equalData) {
      toast("Hiç bir değişiklik yapmadınız.");
      return;
    }
    dispatch(updateRestaurant({ ...restaurantData }));
    // console.log(restaurantData);
  };

  async function handleOpenMap() {
    setIsMapOpen(true);
    googleMap(lat, lng, setLat, setLng, locationData.location);
  }

  function handleSetMap() {
    setRestaurantData((prev) => ({
      ...prev,
      latitude: lat,
      longitude: lng,
    }));
    // console.log(lat, lng);
    setIsMapOpen(false);
  }

  // TOAST
  useEffect(() => {
    if (loading) {
      toastId.current = toast.loading("İşleniyor...");
    }
    if (error) {
      dispatch(resetUpdateRestaurant());
    } else if (success) {
      onSuccess();
      setPopupContent(null);
      toast.dismiss(toastId.current);
      toast.success("Restoran başarıyla güncelendi");
      dispatch(resetUpdateRestaurant());
    }
  }, [loading, success, error]);

  // GET AND SET CITIES IF THERE IS NO CITIES
  useEffect(() => {
    if (!citiesData) {
      dispatch(getCities());
    } else {
      setCities(citiesData);
      if (!restaurantData.city?.id) {
        const city = citiesData.filter(
          (city) =>
            city?.label?.toLowerCase() ===
            restaurantData.city.label?.toLowerCase() //toLocaleLowerCase('tr-TR')
        )[0];

        if (city) {
          setRestaurantDataBefore((prev) => {
            return {
              ...prev,
              city,
            };
          });
          setRestaurantData((prev) => {
            return {
              ...prev,
              city,
            };
          });
        }
      }
    }
  }, [citiesData]);

  // GET DISTRICTS WHENEVER USER'S CITY CHANGES
  useEffect(() => {
    if (restaurantData.city?.id) {
      dispatch(getDistricts({ cityId: restaurantData.city.id }));
      setRestaurantData((prev) => {
        return {
          ...prev,
          district: null,
        };
      });
    }
  }, [restaurantData.city]);

  // SET DISTRICTS
  useEffect(() => {
    if (districtsSuccess) {
      setDistricts(districtsData);

      if (!restaurantData.district || !restaurantData.district?.id) {
        const district = districtsData.filter(
          (dist) =>
            dist?.label?.toLowerCase() ===
            restaurantDataBefore.district?.label?.toLowerCase()
        )[0];
        if (district) {
          setRestaurantDataBefore((prev) => {
            return {
              ...prev,
              district,
            };
          });
          setRestaurantData((prev) => {
            return {
              ...prev,
              district,
            };
          });
        }
      }
      dispatch(resetGetDistrictsState());
    }
  }, [districtsSuccess]);

  // GET NEIGHBOURHOODS WHENEVER THE INVOICE DISTRICT CHANGES
  useEffect(() => {
    if (restaurantData.district?.id && restaurantData.city?.id) {
      dispatch(
        getNeighs({
          cityId: restaurantData.city.id,
          districtId: restaurantData.district.id,
        })
      );
      setRestaurantData((prev) => {
        return {
          ...prev,
          neighbourhood: null,
        };
      });
    }
  }, [restaurantData.district]);

  // SET NEIGHBOURHOODS
  useEffect(() => {
    if (neighsSuccess) {
      setNeighs(neighsData);
      if (!restaurantData.neighbourhood) {
        const neigh = neighsData.filter(
          (neigh) =>
            neigh.label?.toLowerCase() ===
            restaurantDataBefore.neighbourhood.label?.toLowerCase()
        )[0];
        if (neigh) {
          setRestaurantDataBefore((prev) => {
            return {
              ...prev,
              neighbourhood: neigh,
            };
          });
          setRestaurantData((prev) => {
            return {
              ...prev,
              neighbourhood: neigh,
            };
          });
        }
      }
      dispatch(resetGetNeighsState());
    }
  }, [neighsSuccess]);

  // GET LOACTION IF THE NEIGH CHANGED
  useEffect(() => {
    const city = restaurantData.city;
    const district = restaurantData.district;
    const neighbourhood = restaurantData.neighbourhood;

    if (city?.id && district?.id && neighbourhood?.id) {
      const address = `${city.value}, ${district.value}, ${neighbourhood.value}`;
      if (!isEqual(address, locationData.before)) {
        dispatch(getLocation({ address }));
        setLocationData((prev) => {
          return {
            ...prev,
            before: address,
          };
        });
      }
    }
  }, [restaurantData.neighbourhood]);

  // SET LOCATION
  useEffect(() => {
    if (locationSuccess) {
      const averageLat = (
        location.reduce((sum, loc) => sum + loc.lat, 0) / location.length
      ).toFixed(6);
      const averageLng = (
        location.reduce((sum, loc) => sum + loc.lng, 0) / location.length
      ).toFixed(6);

      const neighbourhood = restaurantData.neighbourhood;
      if (neighbourhood?.id) {
        //CHECK THE ORIGINAL VALUE
        setRestaurantData((prev) => {
          return {
            ...prev,
            latitude: averageLat,
            longitude: averageLng,
          };
        });
        setLat(averageLat);
        setLng(averageLng);
      } else {
        setLat(latitude);
        setLng(longitude);
      }
      setLocationData((prev) => {
        return {
          ...prev,
          location,
        };
      });
      dispatch(resetGetLocationState());
    }
  }, [locationSuccess]);

  return (
    <PopupShell
      title="Restoran Düzenle"
      onClose={closeForm}
      footer={
        <>
          <button type="button" onClick={closeForm} className={TOOLBAR_BTN}>
            İptal
          </button>
          {/* The form lives in the scrollable body, so the submit reaches it
              via the form attribute rather than nesting. */}
          <button
            type="submit"
            form="edit-restaurant-form"
            disabled={loading}
            className={TOOLBAR_BTN_PRIMARY}
          >
            Kaydet
          </button>
        </>
      }
      overlay={
        // Kept in the DOM while hidden: googleMap() renders into #map, which
        // has to exist before the overlay becomes visible.
        <div
          className={`absolute inset-0 z-30 flex-col bg-[--white-1] ${
            isMapOpen ? "flex" : "hidden"
          }`}
        >
          <div id="map" className="min-h-0 w-full flex-1"></div>

          <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-solid border-[--border-1] px-4 py-3">
            <div className="flex gap-4 text-sm text-[--black-2]">
              <span>
                <span className="text-xs text-[--gr-1]">Enlem </span>
                {lat}
              </span>
              <span>
                <span className="text-xs text-[--gr-1]">Boylam </span>
                {lng}
              </span>
            </div>

            <div className="flex gap-2">
              {/* type="button": a bare <button> defaults to submit. */}
              <button
                type="button"
                className={cn(TOOLBAR_BTN, "h-9 px-3")}
                onClick={() => setIsMapOpen(false)}
              >
                Kapat
              </button>
              <button
                type="button"
                className={cn(TOOLBAR_BTN_PRIMARY, "h-9 px-4")}
                onClick={handleSetMap}
              >
                Kaydet
              </button>
            </div>
          </div>
        </div>
      }
    >
      <form id="edit-restaurant-form" onSubmit={handleSubmit}>
        <div className="grid gap-x-4 sm:grid-cols-2">
          <CustomInput
            required={true}
            label="Ad"
            placeholder="Ad"
            className="text-sm"
            value={restaurantData.name}
            onChange={(e) => {
              setRestaurantData((prev) => {
                return {
                  ...prev,
                  name: e,
                };
              });
            }}
          />
          <CustomPhoneInput
            required={true}
            label="Telefon"
            placeholder="Telefon"
            className="text-sm"
            value={restaurantData.phoneNumber}
            onChange={(phone) => {
              setRestaurantData((prev) => {
                return {
                  ...prev,
                  phoneNumber: phone,
                };
              });
            }}
            maxLength={14}
          />
        </div>

        {/* The cascade reads as one unit: city narrows district narrows
            neighbourhood, left to right on one row. */}
        <div className="grid gap-x-4 sm:grid-cols-3">
          <CustomSelect
            required={true}
            label="Şehir"
            className="text-sm"
            value={
              restaurantData.city
                ? restaurantData.city
                : { value: null, label: "Şehir seç" }
            }
            options={[{ value: null, label: "Şehir seç" }, ...cities]}
            onChange={(selectedOption) => {
              setRestaurantData((prev) => {
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
            className="text-sm"
            value={
              restaurantData.district
                ? restaurantData.district
                : { value: null, label: "İlçe seç" }
            }
            options={[{ value: null, label: "İlçe seç" }, ...districts]}
            onChange={(selectedOption) => {
              setRestaurantData((prev) => {
                return {
                  ...prev,
                  district: selectedOption,
                };
              });
            }}
          />
          <CustomSelect
            required={true}
            label="Mahalle"
            className="text-sm"
            value={
              restaurantData.neighbourhood
                ? restaurantData.neighbourhood
                : { value: null, label: "Mahalle Seç" }
            }
            options={[{ value: null, label: "Mahalle Seç" }, ...neighs]}
            onChange={(selectedOption) => {
              setRestaurantData((prev) => {
                return {
                  ...prev,
                  neighbourhood: selectedOption,
                };
              });
            }}
          />
        </div>

        {/* Full-width: pairing the textarea with a select left a dead gap
            under whichever was shorter. */}
        <CustomTextarea
          required={true}
          label="Adres"
          placeholder="Adres"
          className="h-20 text-sm"
          value={restaurantData.address}
          onChange={(e) => {
            setRestaurantData((prev) => {
              return {
                ...prev,
                address: e.target.value,
              };
            });
          }}
        />

        <div
          onClick={handleOpenMap}
          className="cursor-pointer"
          title="Konumu haritadan seçin"
        >
          <div className="pointer-events-none grid gap-x-4 sm:grid-cols-2">
            <CustomInput
              required={true}
              label="Enlem"
              placeholder="Enlem"
              className="text-sm"
              value={restaurantData.latitude}
              onChange={() => {}}
              onClick={() => {}}
              readOnly={true}
            />
            <CustomInput
              required={true}
              label="Boylam"
              placeholder="Boylam"
              className="text-sm"
              value={restaurantData.longitude}
              onChange={() => {}}
              onClick={() => {}}
              readOnly={true}
            />
          </div>
          {/* The readonly pair opens the map on click — say so, because
              nothing else hints that these aren't typable. */}
          <p className="mt-1.5 text-xs text-[--gr-1]">
            Konumu haritadan seçmek için tıklayın
          </p>
        </div>
      </form>
    </PopupShell>
  );
}
