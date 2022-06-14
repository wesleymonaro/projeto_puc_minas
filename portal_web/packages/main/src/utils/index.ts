import { AxiosError } from "axios";
import { Auth } from "aws-amplify";
import { KEY_ACCESS_TOKEN, KEY_REFRESH_TOKEN } from "@doar/shared/consts";

export const is401 = (error: AxiosError): boolean => {
  console.log("Axios error", error);
  if (error.response?.status === 401) return true;

  return false;
};

export const refreshToken = async (): Promise<void> => {
  try {
    const session = await Auth.currentSession();
    localStorage.setItem(KEY_ACCESS_TOKEN, session.getIdToken().getJwtToken());
    localStorage.setItem(
      KEY_REFRESH_TOKEN,
      session.getRefreshToken().getToken()
    );
  } catch (error) {
    console.log("erro ao atualizar token", error);
  }
};
