import { instance } from "./axios";

const path = {
  signup: "user/add",
};

export const AuthApi = {
  signup({ fullName, address }) {
    return instance.post(path.signup, { fullName, address });
  },
};
