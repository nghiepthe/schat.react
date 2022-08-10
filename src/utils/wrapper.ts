interface IService {
  onStart?: (e?: any) => void;
  onFinish?: (e?: any) => void;
  onSuccess?: (e?: any) => void;
  onError?: (e?: any) => void;
  payload?: any;
}

function invoke(fn?: (e?: any) => void, data?: any) {
  if (!fn) return;
  fn(data);
}

export function wrapper(fn) {
  return ({onStart, onFinish, onSuccess, onError, payload}: IService = {}) => {
    invoke(onStart);
    setTimeout(
      () =>
        fn(payload)
          .then(success => invoke(onSuccess, success))
          .catch(error => invoke(onError, error))
          .finally(() => invoke(onFinish)),
      0,
    );
  };
}
