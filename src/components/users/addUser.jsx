import { useEffect, useRef, useState } from "react";
import { usePopup } from "../../context/PopupContext";
import CustomCheckbox from "../common/customCheckbox";
import CustomInput from "../common/CustomInput";
import CustomSelect from "../common/CustomSelector";
import { useDispatch, useSelector } from "react-redux";
import { getCities } from "../../redux/data/getCitiesSlice";
import CustomTextarea from "../common/customTextarea";
import { ArrowID, ArrowIU, CancelI } from "../../assets/icon";
import { getDistricts } from "../../redux/data/getDistrictsSlice";
import { getNeighs } from "../../redux/data/getNeighsSlice";
import toast from "react-hot-toast";
import { addUser, resetaddUserState } from "../../redux/users/addUserSlice";
import { formatPhoneNumber, formatSelectorData } from "../../utils/utils";
import { getDealers, resetDealers } from "../../redux/users/getUsersSlice";

const AddUser = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const formRef = useRef();
  const { setShowPopup, setPopupContent } = usePopup();

  const { loading, success, error } = useSelector(
    (state) => state.users.addUser
  );

  const { dealers: dealersData } = useSelector((state) => state.users.getUsers);

  const { cities: data, success: citiesSuccess } = useSelector(
    (state) => state.data.getCities
  );
  const { districts: districtsData, success: districtsSuccess } = useSelector(
    (state) => state.data.getDistricts
  );
  const { neighs: neighsData, success: neighsSuccess } = useSelector(
    (state) => state.data.getNeighs
  );

  const [phoneNumber, setPhoneNumber] = useState("0");
  const [city, setCity] = useState(null);
  const [district, setDistrict] = useState(null);
  const [neigh, setNeigh] = useState(null);
  const [dealer, setDealer] = useState(null);
  const [checked, setChecked] = useState(true);
  const [openFatura, setOpenFatura] = useState(false);

  const [dealers, setDealers] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [neighs, setNeighs] = useState([]);

  const handleAddUser = (e) => {
    e.preventDefault();
    const firstName = e.target[0].value;
    const lastName = e.target[1].value;
    const phoneNumber = e.target[2].value;
    const email = e.target[3].value;
    //const city = city?.value; //e.target[4].value
    const address = e.target[5].value;
    const password = e.target[6].value;
    const password2 = e.target[7].value;
    const dealerId = dealer.value; //e.target[8].value
    const checkBox = e.target[9].checked;

    let faturaCity;
    let title;
    let VKN;
    let taxOffice;
    let taxNumber;
    let mersisNumber;
    let dist;
    let neighbourhood;
    let billAddress;

    if (openFatura) {
      faturaCity = city?.value;
      title = e.target[10].value;
      VKN = e.target[11].value;
      taxOffice = e.target[12].value;
      taxNumber = e.target[13].value;
      mersisNumber = e.target[14].value;
      //const city = city?.value; //e.target[15].value
      dist = district?.value; //e.target[16].value;
      neighbourhood = neigh?.value; //e.target[17].value;
      billAddress = e.target[18].value;
    }

    if (password !== password2) {
      toast.error("Şifreler eşit değil");
      return;
    }

    if (openFatura) {
      dispatch(
        addUser({
          firstName,
          lastName,
          phoneNumber,
          email,
          city: city?.value,
          address,
          password,
          dealerId,
          userInvoiceAddressDTO: {
            taxOffice,
            taxNumber,
            title,
            address: billAddress,
            city: faturaCity,
            district: dist,
            neighbourhood,
            tradeRegistryNumber: VKN,
            mersisNumber,
          },
        })
      );
    } else {
      dispatch(
        addUser({
          firstName,
          lastName,
          phoneNumber,
          email,
          city: city?.value,
          address,
          password,
          dealerId,
        })
      );
    }
  };

  const clearForm = () => {
    setPopupContent(null);
    setShowPopup(false);
    setDealers([]);
  };

  useEffect(() => {
    if (loading) {
      toast.dismiss();
      toast.loading("Adding user...");
    }
    if (error) {
      toast.dismiss();
      if (error?.message_TR) {
        toast.error(error.message_TR);
      } else {
        toast.error("Something went wrong");
      }
      dispatch(resetaddUserState());
    } else if (success) {
      toast.dismiss();
      onSuccess();
      setShowPopup(false);
      setPopupContent(null);
      toast.success("User added successfuly");
      dispatch(resetaddUserState());
    }
  }, [loading, success, error]);

  useEffect(() => {
    if (!data) {
      dispatch(getCities());
    }
    if (citiesSuccess) {
      setCities(data);
    }
  }, [data, citiesSuccess]);

  useEffect(() => {
    if (city?.id) {
      dispatch(getDistricts({ cityId: city.id }));
      setDistrict(null);
    }
  }, [city]);

  useEffect(() => {
    if (districtsSuccess) {
      setDistricts(districtsData);
    }
  }, [districtsSuccess]);

  useEffect(() => {
    if (district?.id && city?.id) {
      dispatch(getNeighs({ cityId: city.id, districtId: district.id }));
      setNeigh(null);
    }
  }, [district, city]);

  useEffect(() => {
    if (neighsSuccess) {
      setNeighs(neighsData);
    }
  }, [neighsSuccess]);

  useEffect(() => {
    if (!dealersData && !dealers.length) {
      dispatch(getDealers({ dealer: true }));
    } else {
      setDealers(formatSelectorData(dealersData));
    }

    return () => {
      if (dealersData) {
        dispatch(resetDealers());
      }
    };
  }, [dealersData, dispatch]);

  return (
    <div className=" w-full pt-12 pb-8 bg-[--white-1] rounded-lg border-2 border-solid border-[--border-1] text-[--black-2] text-base max-h-[90dvh] overflow-y-scroll">
      <div className="flex flex-col bg-[--white-1] relative">
        <div className="absolute -top-6 right-3">
          <div
            className="text-[--primary-2] p-2 border border-solid border-[--primary-2] rounded-full cursor-pointer"
            onClick={clearForm}
          >
            <CancelI />
          </div>
        </div>
        <h1 className="self-center text-2xl font-bold">Kullanıcı Ekle</h1>
        <div className="flex flex-col px-4 sm:px-14 mt-9 w-full text-left">
          <form onSubmit={handleAddUser} ref={formRef}>
            <div className="flex gap-4">
              <CustomInput
                required={true}
                label="Ad"
                placeholder="Ad"
                className="py-[.45rem]"
              />
              <CustomInput
                required={true}
                label="Soyad"
                placeholder="Soyad"
                className="py-[.45rem]"
              />
            </div>
            <div className="flex gap-4">
              <CustomInput
                required={true}
                label="Telefone"
                placeholder="Telefone"
                className="py-[.45rem]"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(formatPhoneNumber(e))}
                maxLength={11}
              />
              <CustomInput
                required={true}
                label="E-Posta"
                placeholder="E-Posta"
                className="py-[.45rem]"
              />
            </div>

            <div className="flex gap-4">
              <CustomSelect
                required={true}
                label="Şehir"
                placeholder="Ad"
                style={{ padding: "1px 0px" }}
                className="text-sm"
                value={city ? city : { value: null, label: "Şehir seç" }}
                options={[{ value: null, label: "Şehir seç" }, ...cities]}
                onChange={setCity}
              />
              <CustomInput
                required={true}
                label="Adres"
                placeholder="Adres"
                className="py-[.45rem]"
              />
            </div>

            <div className="flex gap-4">
              <CustomInput
                required={true}
                label="Şifre"
                placeholder="Şifre"
                className="py-[.45rem]"
                letIcon={true}
              />
              <CustomInput
                required={true}
                label="Şifreyi onayla"
                placeholder="Şifre"
                className="py-[.45rem]"
                letIcon={true}
              />
            </div>

            <div className="flex gap-4 w-1/2">
              <CustomSelect
                required={true}
                label="Bayi"
                placeholder="Ad"
                style={{ padding: "1px 0px" }}
                className="text-sm"
                value={dealer ? dealer : { value: null, label: "Bayi seç" }}
                options={[{ value: null, label: "Bayi seç" }, ...dealers]}
                onChange={setDealer}
              />
            </div>

            <div className="w-full flex justify-between mt-8">
              <CustomCheckbox
                label="Kayıt Bilgilendirmesi gönder"
                checked={checked}
                onChange={() => setChecked(!checked)}
              />
              {/*  <button className="w-max px-2 py-2 bg-[--primary-2] text-[--white-1] text-sm rounded-md">
                Kaydet
              </button> */}
            </div>

            <div
              className="w-full flex border-b border-solid border-[--border-1] cursor-pointer mt-14"
              onClick={() => setOpenFatura(!openFatura)}
            >
              <h1 className="w-full text-center text-xl font-bold ">
                Fatura Adresi
              </h1>
              <span>{openFatura ? <ArrowIU /> : <ArrowID />}</span>
            </div>
            {openFatura && (
              <>
                <div className="flex gap-4">
                  <CustomInput
                    required={true}
                    label="Resmi Ünvan"
                    placeholder="Resmi Ünvan"
                    className="py-[.45rem] text-sm"
                  />
                </div>
                <div className="flex gap-4">
                  <CustomInput
                    required={true}
                    label="VKN veya TCKN"
                    placeholder="VKN veya TCKN"
                    className="py-[.45rem] text-sm"
                  />
                  <CustomInput
                    required={true}
                    label="Vergi Dairesi"
                    placeholder="Vergi Dairesi"
                    className="py-[.45rem] text-sm"
                  />
                </div>
                <div className="flex gap-4">
                  <CustomInput
                    required={true}
                    label="VTic.Sic.No"
                    placeholder="VTic.Sic.No"
                    className="py-[.45rem] text-sm"
                  />
                  <CustomInput
                    required={true}
                    label="Mersis No"
                    placeholder="Mersis No"
                    className="py-[.45rem] text-sm"
                  />
                </div>
                <div className="flex gap-4">
                  <CustomSelect
                    required={true}
                    label="Şehir"
                    style={{ padding: "1px 0px", fontSize: ".8rem" }}
                    className="text-sm"
                    value={city ? city : { value: null, label: "Şehir seç" }}
                    options={[{ value: null, label: "Şehir seç" }, ...cities]}
                    onChange={setCity}
                  />
                  <CustomSelect
                    required={true}
                    label="İlçe"
                    style={{ padding: "1px 0px", fontSize: ".8rem" }}
                    className="text-sm"
                    value={
                      district ? district : { value: null, label: "İlçe seç" }
                    }
                    options={[{ value: null, label: "İlçe seç" }, ...districts]}
                    onChange={setDistrict}
                  />
                </div>
                <div className="flex gap-4">
                  <CustomSelect
                    required={true}
                    label="Mahalle"
                    style={{ padding: "1px 0px", fontSize: ".8rem" }}
                    value={
                      neigh ? neigh : { value: null, label: "Mahalle Seç" }
                    }
                    className="text-sm"
                    options={[{ value: null, label: "Mahalle Seç" }, ...neighs]}
                    onChange={setNeigh}
                  />
                  <CustomTextarea
                    required={true}
                    label="Adres"
                    placeholder="Adres"
                    className="pb-14 text-sm"
                  />
                </div>
              </>
            )}
            <div className="w-full flex justify-end mt-10">
              <button
                className="py-2 px-3 bg-[--primary-1] text-[--white-1] rounded-lg"
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
};

export default AddUser;
