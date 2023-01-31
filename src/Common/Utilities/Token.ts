import { getLocalStorage } from "@/Common/Utilities/SafeStorage";

export const enum CE_TokenName {
  ApiBearerToken = "ApiBearerToken",
}

export function saveToken(name: CE_TokenName, token: string) {
  if (token) {
    getLocalStorage().setItem(name, token);
  } else {
    getLocalStorage().removeItem(name);
  }
}

export function getToken(name: CE_TokenName) {
  return getLocalStorage().getItem(name)?.trim();
}
