//MODULES
import { isEqual } from "lodash";
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";

//COMP
import { cn } from "../../../lib/utils";
import { googleMap } from "../../../utils/utils";
import PopupShell from "../../common/popupShell";
import CustomInput from "../../common/customInput";
import CustomSelect from "../../common/customSelector";
import { usePopup } from "../../../context/PopupContext";
import CustomTextarea from "../../common/customTextarea";
import CustomPhoneInput from "../../common/customPhoneInput";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { getCities } from "../../../redux/data/getCitiesSlice";
import {
  TOOLBAR_BTN,
  TOOLBAR_BTN_PRIMARY,
} from "../../../components/common/toolbarStyles";
import {
  getDistricts,
  resetGetDistrictsState,
} from "../../../redux/data/getDistrictsSlice";
import {
  getNeighs,
  resetGetNeighsState,
} from "../../../redux/data/getNeighsSlice";
import {
  getLocation,
  resetGetLocationState,
} from "../../../redux/data/getLocationSlice";
import {
  addRestaurant,
  resetAddRestaurantState,
} from "../../../redux/restaurants/addRestaurantSlice";
import {
  getUserAddress,
  resetGetUserAddress,
} from "../../../redux/data/getUserAddressSlice";

const AddRestaurant = ({ onSuccess }) => {
  const { setPopupContent } = usePopup();
  const handleClick = () => {
    setPopupContent(<AddRestaurantPopup onSuccess={onSuccess} />);
  };

  return (
    <button
      className={TOOLBAR_BTN_PRIMARY}
      onClick={handleClick}
    >
      Restoran Ekle
    </button>
  );
};

export default AddRestaurant;

// EDIT RESTAURANT POPUP
function AddRestaurantPopup({ onSuccess }) {
  const toastId = useRef();
  const dispatch = useDispatch();

  const { setPopupContent } = usePopup();

  const { loading, success, error } = useSelector(
    (state) => state.restaurants.addRestaurant
  );

  const { cities: citiesData } = useSelector((state) => state.data.getCities);

  const { districts: districtsData, success: districtsSuccess } = useSelector(
    (state) => state.data.getDistricts
  );

  const { neighs: neighsData, success: neighsSuccess } = useSelector(
    (state) => state.data.getNeighs
  );

  const { success: locationSuccess, location } = useSelector(
    (state) => state.data.getLocation
  );

  const { address, error: addressErr } = useSelector(
    (state) => state.data.getUserAddress
  );

  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [locationData, setLocationData] = useState({
    location: null,
    before: null,
  });
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [neighs, setNeighs] = useState([]);
  const [restaurantData, setRestaurantData] = useState({
    name: "",
    phoneNumber: "90",
    latitude: "",
    longitude: "",
    city: null,
    district: null,
    neighbourhood: null,
    address: "",
    isActive: true,
  });

  const closeForm = () => {
    setPopupContent(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addRestaurant({ ...restaurantData }));
    // console.log(restaurantData);
  };

  async function handleOpenMap() {
    if (locationData.location) {
      setIsMapOpen(true);
      googleMap(lat, lng, setLat, setLng, locationData.location);
    }
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
      dispatch(resetAddRestaurantState());
    } else if (success) {
      onSuccess();
      setPopupContent(null);
      toast.dismiss(toastId.current);
      toast.success("Restoran başarıyla eklendi");
      dispatch(resetAddRestaurantState());
    }
  }, [loading, success, error]);

  // GET AND SET CITIES IF THERE IS NO CITIES
  useEffect(() => {
    if (!citiesData) {
      dispatch(getCities());
    } else {
      setCities(citiesData);
    }
  }, [citiesData]);

  // GET DISTRICTS WHENEVER USER'S CITY CHANGES
  useEffect(() => {
    if (restaurantData.city?.id) {
      dispatch(getDistricts({ cityId: restaurantData.city.id }));
    }
  }, [restaurantData.city]);

  // SET DISTRICTS
  useEffect(() => {
    if (districtsSuccess) {
      setDistricts(districtsData);
      //check if there is a district with no id, coz it only comes from getUserAddress
      if (restaurantData.district && !restaurantData.district.id) {
        const foundDistrict = districtsData.find(
          (d) => d.value === restaurantData.district.value
        );
        if (foundDistrict) {
          setRestaurantData((prev) => {
            return {
              ...prev,
              district: foundDistrict,
            };
          });
        }
      } else {
        setRestaurantData((prev) => {
          return {
            ...prev,
            district: null,
          };
        });
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
    }
  }, [restaurantData.district]);

  // SET NEIGHBOURHOODS
  useEffect(() => {
    if (neighsSuccess) {
      setNeighs(neighsData);
      dispatch(resetGetNeighsState());
    }
    //check if there is a neighbourhood with no id, coz it only comes from getUserAddress
    if (restaurantData.neighbourhood && !restaurantData.neighbourhood.id) {
      const foundDistrict = neighsData.find(
        (d) => d.value === restaurantData.neighbourhood.value
      );
      if (foundDistrict) {
        setRestaurantData((prev) => {
          return {
            ...prev,
            neighbourhood: foundDistrict,
          };
        });
      }
    } else {
      setRestaurantData((prev) => {
        return {
          ...prev,
          neighbourhood: null,
        };
      });
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

      setRestaurantData((prev) => {
        return {
          ...prev,
          latitude: averageLat,
          longitude: averageLng,
        };
      });
      setLocationData((prev) => {
        return {
          ...prev,
          location,
        };
      });
      setLat(averageLat);
      setLng(averageLng);
      dispatch(resetGetLocationState());
    }
  }, [locationSuccess]);

  //GET THE USER ADDRESS
  useEffect(() => {
    if (!restaurantData.city) {
      dispatch(getUserAddress());
    }
  }, [restaurantData.city]);

  //SET THE USER ADDRESS
  useEffect(() => {
    if (address) {
      const city_ = address.city;
      const district_ = address.district;
      const neigh_ = address.neighbourhood;

      setRestaurantData((prev) => {
        return {
          ...prev,
          city: {
            label: city_,
            value: city_,
            id:
              citiesData?.filter((city) => city.value === city_)[0]?.id || null,
          },
          district: {
            label: district_,
            value: district_,
            id: null,
          },
          neighbourhood: {
            label: neigh_,
            value: neigh_,
            id: null,
          },
          longitude: address.lng,
          latitude: address.lat,
          address: address.address,
        };
      });
      setLocationData((prev) => {
        return {
          ...prev,
          before: address.address,
        };
      });

      const address_ = `${city_}, ${district_}, ${neigh_}`;
      dispatch(getLocation({ address: address_ }));
      dispatch(resetGetUserAddress());
    }
    if (address || addressErr) {
      dispatch(resetGetUserAddress());
    }
  }, [address, addressErr]);

  return (
    <PopupShell
      title="Restoran Ekle"
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
            form="add-restaurant-form"
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
      <form id="add-restaurant-form" onSubmit={handleSubmit}>
        <div className="grid gap-x-4 sm:grid-cols-2">
          <CustomInput
            required
            label="Restoran Adı"
            placeholder="Restoran Adı"
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
            required
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
            required
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
            required
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
            required
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
          required
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
              required
              label="Enlem"
              placeholder="Enlem"
              className="text-sm"
              value={restaurantData.latitude}
              onChange={() => {}}
              onClick={() => {}}
              readOnly={true}
            />
            <CustomInput
              required
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
