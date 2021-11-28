import { KeyStogare } from "../KeyStorage";

export const getToken = async () => localStorage.getItem(KeyStogare.Token);
