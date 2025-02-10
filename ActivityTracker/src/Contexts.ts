import { createContext, SetStateAction } from "react";

export const TaskContext = createContext<{
  completed: boolean;
  setCompleted: React.Dispatch<SetStateAction<boolean>>;
}>({
  completed: false,
  setCompleted: () => {},
});
