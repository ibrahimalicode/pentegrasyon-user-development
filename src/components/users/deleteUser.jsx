import React, { useEffect, useState } from "react";
import { usePopup } from "../../context/PopupContext";
import { DeleteI } from "../../assets/icon";
import CustomCheckbox from "../common/customCheckbox";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, resetDeleteUser } from "../../redux/users/deleteUserSlice";
import toast from "react-hot-toast";
import {
  getUserRestaurants,
  resetGetUserRestaurants,
} from "../../redux/restaurants/getUserRestaurantsSlice";
import LoadingI from "../../assets/anim/loading";
import {
  getUserLicenses,
  resetGetUserLicenses,
} from "../../redux/licenses/getUserLicensesSlice";

const DeleteUser = ({ user: data, setOpenMenu }) => {
  const dispatch = useDispatch();

  const { loading, success, error } = useSelector(
    (state) => state.users.delete
  );
  const { success: userRestaurantsSuccess, userRestaurants } = useSelector(
    (state) => state.restaurants.getUserRestaurants
  );
  const { success: userLicensesSuccess, userLicenses } = useSelector(
    (state) => state.licenses.getUserLicenses
  );

  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [checked2, setChecked2] = useState(true);
  const [user, setUser] = useState(data);
  const [restorantNumber, setRestorantNumber] = useState(null);
  const [licenseNumber, setLicenseNumber] = useState(null);
  const { setShowPopup } = usePopup();

  const handleDelete = () => {
    console.log(user);
    dispatch(deleteUser({ userId: data.id }));
  };

  const handlePopup = () => {
    setOpen(true);
    setShowPopup(true);

    dispatch(getUserRestaurants({ userId: data.id })).then(() => {
      dispatch(getUserLicenses({ userId: data.id }));
    });
  };

  useEffect(() => {
    if (loading) {
      toast.dismiss();
      toast.loading("Logging in..");
    } else if (error) {
      toast.dismiss();
      if (error?.message_TR) {
        toast.error(error.message_TR);
      } else {
        toast.error("Something went wrong");
      }
      dispatch(resetDeleteUser());
    } else if (success) {
      toast.dismiss();
      toast.success("Successfuly Deleted");
      dispatch(resetDeleteUser());
    }
  }, [loading, success, error, dispatch]);

  useEffect(() => {
    if (userRestaurantsSuccess) {
      if (userRestaurants?.data) {
        setRestorantNumber(userRestaurants?.data.length);
      }
      dispatch(resetGetUserRestaurants());
    }
  }, [userRestaurantsSuccess, userRestaurants, dispatch]);

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
      <button
        className="w-full flex items-center gap-2 py-2 pl-6 text-left text-[--red-1] cursor-pointer"
        onClick={handlePopup}
      >
        <DeleteI className="w-[1.1rem]" />
        Sil
      </button>
      {open && (
        <div
          className={`fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center transition-colors p-[2%] z-[999] ${
            open ? "visible bg-black/20" : "invisible"
          }`}
        >
          <div
            className={`bg-[--btn-txt] w-full max-w-[45rem] rounded-xl shadow transition-all ${
              open ? "scale-100 opacity-100" : "scale-125 opacity-0"
            }`}
          >
            <div className="flex flex-col w-full pt-12 pb-8 bg-[--white-1] rounded-lg border-2 border-solid border-[--border-1] text-[--black-2] text-base">
              <h1 className="self-center text-2xl font-bold">Silinecek</h1>
              <div className="flex flex-col px-4 sm:px-14 mt-9 w-full text-left">
                <p className="">
                  Kullanıcı{" "}
                  <span className="font-bold text-[--primary-2]">
                    {user.fullName}
                  </span>{" "}
                  ve bağlı olan
                </p>
                <div className="flex  items-center gap-2 mt-6">
                  {restorantNumber || restorantNumber === 0 ? (
                    restorantNumber
                  ) : (
                    <span className="text-[--green-1]">
                      <LoadingI className="fill-[--red-1]" />
                    </span>
                  )}{" "}
                  <p className=" text-[--red-1]">Restoran</p>
                </div>

                <div className="flex  items-center gap-2 mt-6">
                  {licenseNumber || licenseNumber === 0 ? (
                    licenseNumber
                  ) : (
                    <span className="text-[--green-1]">
                      <LoadingI className="fill-[--red-1]" />
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
                  💡(Silmeden önce bağlı restoranları başka bir kullanıcıya
                  transfer edebilirsiniz)
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
                      setOpen(false);
                      setShowPopup(false);
                      setChecked(false);
                    }}
                  >
                    Vazgeç
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteUser;
