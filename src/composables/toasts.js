import { useToast } from "vue-toastification";
const toast = useToast();

const showToast = (type, message, duration, position = 'top-right') => {
  let options = {
    position: position,
    timeout: duration,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: "button",
    icon: true,
    rtl: false
  }
  if (type === 'INFO') toast.info(message, options);
  if (type === 'SUCCESS') toast.success(message, options);
  if (type === 'ERROR') toast.error(message, options);
  if (type === 'WARNING') toast.warning(message, options);
  // ToDo: ver la manera de no redireccionar hasta que termine un toast.
}

export default showToast
