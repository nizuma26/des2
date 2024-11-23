import { toast } from 'sonner';

import './toast.css';

import { getValidationError } from '../../utils/get-validation-error';
import { Toast, ToastError } from './toast';

type Position =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'top-center'
  | 'bottom-center';

interface notify {
  msg: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
  position?: Position;
  icon?: string;
}

interface Data {
  message?: string;
  total?: number;
}

const ToastUtilities = {
  notify({ msg, type, duration = 6000, position = 'top-right', icon }: notify) {
    const toastId = toast('Sonner');
    toast(<Toast msg={msg} icon={icon} color={type} />, {
      duration: duration,
      position: position,
      id: toastId,
    });
  },
  success({
    msg = 'Accion realizada exitosamente!',
    type = 'success',
    position,
    duration,
    icon = 'lets-icons:check-round-fill',
  }: notify) {
    this.notify({ msg, type, duration, position, icon });
  },
  error({
    msg = 'Ha ocurrido un error!',
    type = 'error',
    position,
    duration,
    icon = 'fluent:error-circle-12-filled',
  }: notify) {
    this.notify({ msg, type, duration, position, icon });
  },
  info({
    msg = 'Notificación!',
    type = 'info',
    position,
    duration,
    icon = 'icon-park-solid:info',
  }: notify) {
    this.notify({ msg, type, duration, position, icon });
  },
  warning({
    msg = 'Advertencia!',
    type = 'warning',
    position,
    duration,
    icon = 'pajamas:warning-solid',
  }: notify) {
    this.notify({ msg, type, duration, position, icon });
  },
  promise({
    promise,
    success = () => {},
    error = () => {},
  }: {
    promise: Promise<Data>;
    success?: (response: Data) => void;
    error?: (response: Error) => void;
  }) {
    toast.promise(promise, {
      loading: <Toast msg="Procesando" icon="eos-icons:bubble-loading" color="default" />,
      position: 'top-right',
      duration: 6000,
      success: (data: Data) => {
        const msg = data?.message ? data?.message : 'Accion realizada con exito';
        success(data);
        return <Toast msg={msg} />;
      },
      error: (err) => {
        const hasError = err?.response?.data?.error
          ? err?.response?.data?.error
          : getValidationError(err?.code);
          error(hasError);
        return <ToastError error={hasError} />;
      },
    });
  },
};

export default ToastUtilities;
