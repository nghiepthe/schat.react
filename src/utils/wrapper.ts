interface IService {
  onStart?: (e?: any) => void;
  onFinish?: (e?: any) => void;
  onSuccess?: (e?: any) => void;
  onError?: (e?: any) => void;
  payload?: any;
}

function invoke(fn?: (e?: any) => void, data?: any) {
  console.log('Invoke ' + fn?.name);
  if (!fn) return;
  fn(data);
}

export function wrapper(fn) {
  return ({onStart, onFinish, onSuccess, onError, payload}: IService = {}) => {
    console.log('Wrapper Fn');
    invoke(onStart);
    fn(payload)
      .then(success => invoke(onSuccess, success))
      .catch(error => invoke(onError, error))
      .finally(() => invoke(onFinish));
  };
}