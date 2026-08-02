import toast from "react-hot-toast";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

// Standard toast lifecycle for one async slice:
//   loading → loading toast
//   error   → dismiss, optional error toast / onError, dispatch reset
//   success → dismiss, optional success toast, onSuccess, dispatch reset
//
// Options:
//   loadingMessage  string (default "İşleniyor...")
//   loadingToastId  optional stable toast id for the loading toast
//   successMessage  string | (arg) => string/ReactNode — omit for no success toast
//   errorMessage    true → show error.message_TR || error.message;
//                   string | (error) => string — custom; omit for silent errors
//   onSuccess       callback fired on success (close popup, refresh list, ...)
//   onError         callback fired on error
//   reset           redux action creator dispatched after success and error
export const useAsyncActionToast = (
  { loading, success, error },
  {
    loadingMessage = "İşleniyor...",
    loadingToastId,
    successMessage,
    errorMessage,
    onSuccess,
    onError,
    reset,
  }
) => {
  const toastId = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (loading) {
      toastId.current = toast.loading(
        loadingMessage,
        loadingToastId ? { id: loadingToastId } : undefined
      );
    }
    if (error) {
      toast.dismiss(toastId.current);
      if (errorMessage === true) {
        toast.error(error?.message_TR || error?.message || "Bir hata oluştu");
      } else if (typeof errorMessage === "function") {
        toast.error(errorMessage(error));
      } else if (errorMessage) {
        toast.error(errorMessage);
      }
      onError && onError(error);
      reset && dispatch(reset());
    }
    if (success) {
      toast.dismiss(toastId.current);
      if (successMessage) {
        toast.success(
          typeof successMessage === "function" ? successMessage() : successMessage
        );
      }
      onSuccess && onSuccess();
      reset && dispatch(reset());
    }
  }, [loading, success, error]);
};
