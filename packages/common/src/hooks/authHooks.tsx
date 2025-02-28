import { useEffect, useContext } from "react";

const refreshSession = async () => {
  const data = await fetch("http://localhost:5000/refresh", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  if (data.status === 200) {
    return await data.json();
  } else {
    return null;
  }
};

const useAuthRefresh = () => {
  useEffect(() => {
    refreshSession().then(
      (value) => {
        console.log(value);
      },
      (e) => {
        console.log(e);
      }
    );
  });
};

export default useAuthRefresh;
