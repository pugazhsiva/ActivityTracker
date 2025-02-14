import React, { createContext, SetStateAction } from "react";

export const TaskContext = createContext<{
  completed: boolean;
  setCompleted: React.Dispatch<SetStateAction<boolean>>;
}>({
  completed: false,
  setCompleted: () => {},
});

export const AuthContext = createContext<{
  token: null | string;
  setToken: React.Dispatch<SetStateAction<string | null>>;
}>({
  token: null,
  setToken: () => {},
});
