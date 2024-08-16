import React, { useEffect, useRef, useState } from "react";
import { usePopup } from "../../../context/PopupContext";
import { DeleteI } from "../../../assets/icon";
import CustomCheckbox from "../../common/customCheckbox";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  resetDeleteUser,
} from "../../../redux/users/deleteUserSlice";
import toast from "react-hot-toast";
import {
  getUserRestaurants,
  resetGetUserRestaurants,
} from "../../../redux/restaurants/getUserRestaurantsSlice";
import LoadingI from "../../../assets/anim/loading";
import {
  getUserLicenses,
  resetGetUserLicenses,
} from "../../../redux/licenses/getUserLicensesSlice";
import ActionButton from "../../common/actionButton";

const DeleteUser = ({ user, setOpenMenu, onSuccess }) => {
  const dispatch = useDispatch();
  const { setShowPopup, setPopupContent } = usePopup();

  const handlePopup = (event) => {
    event.stopPropagation();
    setShowPopup(true);
    setPopupContent(<DeletePopup data={user} onSuccess={onSuccess} />);
    //setOpenMenu(null);

    dispatch(getUserRestaurants({ userId: user.id })).then(() => {
      dispatch(getUserLicenses({ userId: user.id }));
    });
  };

  return (
    <ActionButton
      className="text-[--red-1]"
      element={<DeleteI className="w-[1.1rem]" />}
      element2="Sil"
      onClick={handlePopup}
    />
  );
};

export default DeleteUser;

const DeletePopup = ({ data, onSuccess }) => {
  const dispatch = useDispatch();
  const toastId = useRef();
  const { setShowPopup } = usePopup();

  const { loading, success, error } = useSelector(
    (state) => state.users.delete
  );

  const { success: userRestaurantsSuccess, restaurants } = useSelector(
    (state) => state.restaurants.getUserRestaurants
  );
  const { success: userLicensesSuccess, userLicenses } = useSelector(
    (state) => state.licenses.getUserLicenses
  );

  const [checked, setChecked] = useState(false);
  const [checked2, setChecked2] = useState(true);
  const [restorantNumber, setRestorantNumber] = useState(null);
  const [licenseNumber, setLicenseNumber] = useState(null);

  const handleDelete = () => {
    dispatch(deleteUser({ userId: data.id }));
  };

  useEffect(() => {
    if (loading) {
      toastId.current = toast.loading("Logging in..");
    }
    if (error) {
      toast.dismiss(toastId.current);
      if (error?.message_TR) {
        toast.error(error.message_TR);
      } else {
        toast.error("Something went wrong");
      }
      dispatch(resetDeleteUser());
    }
    if (success) {
      onSuccess(toastId.current);
      toast.dismiss();
      setChecked(false);
      setShowPopup(false);
      toast.success("Successfuly Deleted");
      dispatch(resetDeleteUser());
    }
  }, [loading, success, error, dispatch]);

  useEffect(() => {
    if (userRestaurantsSuccess) {
      if (restaurants) {
        setRestorantNumber(restaurants?.length);
      }
      dispatch(resetGetUserRestaurants());
    }
  }, [userRestaurantsSuccess, restaurants, dispatch]);

  useEffect(() => {
    if (userLicensesSuccess) {
      if (userLicenses?.data) {
        setLicenseNumber(userLicenses?.data.length);
      }
      dispatch(resetGetUserLicenses());
    }
  }, [userLicensesSuccess, userLicenses, dispatch]);

  return (
    <>
      <div className="flex flex-col w-full pt-12 pb-8 bg-[--white-1] rounded-lg border-2 border-solid border-[--border-1] text-[--black-2] text-base">
        <h1 className="self-center text-2xl font-bold">Silinecek</h1>
        <div className="flex flex-col px-4 sm:px-14 mt-9 w-full text-left">
          <p className="">
            Kullanıcı{" "}
            <span className="font-bold text-[--primary-2]">
              {data.fullName}
            </span>{" "}
            ve bağlı olan
          </p>
          <div className="flex  items-center gap-2 mt-6">
            {restorantNumber || restorantNumber === 0 ? (
              restorantNumber
            ) : (
              <span className="text-[--green-1]">
                <LoadingI className="fill-[--red-1] text-[--light-4]" />
              </span>
            )}{" "}
            <p className=" text-[--red-1]">Restoran</p>
          </div>

          <div className="flex  items-center gap-2 mt-6">
            {licenseNumber || licenseNumber === 0 ? (
              licenseNumber
            ) : (
              <span className="text-[--green-1]">
                <LoadingI className="fill-[--red-1] text-[--light-4]" />
              </span>
            )}{" "}
            <p className=" text-[--red-1]">Lisans</p>
          </div>
          <p className="mt-7">
            Silinecektir.
            <span className="text-[--primary-1]">
              {" "}
              Bu işlem geri alınamaz!{" "}
            </span>
            Emin misiniz?
          </p>
          <p className="mt-5">
            💡(Silmeden önce bağlı restoranları başka bir kullanıcıya transfer
            edebilirsiniz)
          </p>
          <div className="mt-10 flex flex-col gap-4">
            <CustomCheckbox
              checked={checked}
              onChange={() => setChecked(!checked)}
              label="Eminim sil"
            />
            <CustomCheckbox
              checked={checked2}
              onChange={() => setChecked2(!checked2)}
              label="Kullanıcı Silme Bilgilendirmesi gönder"
            />
          </div>
          <div className="flex gap-3 self-end max-sm:mt-4 mt-2 text-[--white-1]">
            <button
              className="px-10 py-2 text-base bg-[--red-1] rounded-lg disabled:cursor-not-allowed disabled:opacity-70"
              disabled={!checked}
              onClick={handleDelete}
            >
              Sil
            </button>
            <button
              className="px-6 py-2 text-base bg-[--primary-1] rounded-lg"
              onClick={() => {
                setShowPopup(false);
                setChecked(false);
              }}
            >
              Vazgeç
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
