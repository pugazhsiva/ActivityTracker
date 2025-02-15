import { createContext, SetStateAction } from "react";

export const AuthContext = createContext<{
  token: null | string;
  setToken: React.Dispatch<SetStateAction<string | null>>;
}>({
  token: null,
  setToken: () => {},
});
