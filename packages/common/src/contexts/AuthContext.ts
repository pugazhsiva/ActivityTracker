import { createContext, SetStateAction } from "react";

export const AuthContext = createContext<{
  token: {
    access_token: string;
    refresh_token: string;
  } | null;
  setToken: React.Dispatch<
    SetStateAction<{ access_token: string; refresh_token: string } | null>
  >;
}>({
  token: null,
  setToken: () => {},
});
