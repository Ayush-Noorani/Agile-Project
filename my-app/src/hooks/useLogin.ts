import React from "react";

export const useLogin = () => {
  
  const onSubmit = (
    value: any,
    setLoader: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setLoader(true);
    console.log(value);
    setLoader(false);
  };
  return { onSubmit };
};
