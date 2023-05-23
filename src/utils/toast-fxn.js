import { ToastContainer, toast } from 'react-toastify';

export const notifySuccessFxn = (message) =>
toast.success(message, {
  position: 'bottom-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined
});

export const notifyErrorFxn = (message) =>
toast.error(message, {
  position: 'bottom-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined
});