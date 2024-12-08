import { useDispatch } from "react-redux";
import { usePopup } from "../../../context/PopupContext";
import { useProtectPages } from "../../../context/ProtectPagesContext";
import { updateUserLock } from "../../../redux/user/updateUserLockSlice";

export default function ConfirmationPopup({ user }) {
  const dispatch = useDispatch();
  const { setPopupContent } = usePopup();
  const { protectedPages } = useProtectPages();

  function handleSubmit() {
    dispatch(updateUserLock(protectedPages));
  }

  return (
    <main className="bg-[--white-1] text-center rounded-md overflow-clip">
      <div className="bg-[--status-red] text-[--red-1] py-2">Uyarı</div>

      <div className="py-4">
        <p>Yetki Parolanız aşağıdaki gibidir</p>
        <p className="text-[--green-1] mb-2">{protectedPages.password}</p>
        <p>
          Parola <span className="text-[--link-1]">{user.phoneNumber}</span>{" "}
          numaralı telefonunuza SMS gönderilecektir.
        </p>
      </div>

      <div className="flex gap-5 justify-center py-3">
        <button
          onClick={() => setPopupContent(null)}
          className="bg-[--status-red] text-[--red-1] py-1.5 px-3 rounded-md border border-[--red-1]"
        >
          Vazgeç
        </button>
        <button
          onClick={handleSubmit}
          className="bg-[--status-green] text-[--green-1] py-1.5 px-3 rounded-md border border-[--green-1]"
        >
          Tamam
        </button>
      </div>
    </main>
  );
}
