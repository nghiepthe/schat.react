import { RootStackScreenProps } from "@components/app.nav/types";
import { AuthApi } from "./../apis/auth";
import { MnemonicService } from "@services";

export const AuthService = {
  async signup(success, error, values) {
    const { fullName } = values;
    const { address, privateKey, mnemonic } = MnemonicService.generate();
    const { data } = await AuthApi.signup({ fullName, address });
    if (data?.success)
      return success({ fullName, address, mnemonic, privateKey });
    return error(data?.error);
  },
  async signin() {},
  async restore() {},
};
