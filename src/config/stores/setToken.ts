import { KeyStogare } from "../KeyStorage";

export const setToken = async (token: string) =>
  localStorage.setItem(KeyStogare.Token, token);
