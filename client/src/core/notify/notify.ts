import {toast} from "react-toastify";
import {ToastOptions} from "react-toastify";

const NOTIFY_OPTIONS: ToastOptions = {
	theme: 'dark',
	hideProgressBar: true,
	autoClose: 3000,
}

export const notifySuccess = (message: string): void => {
	toast.success(message, NOTIFY_OPTIONS)
}

export const notifyError = (message: string): void => {
	toast.error(message, NOTIFY_OPTIONS)
}