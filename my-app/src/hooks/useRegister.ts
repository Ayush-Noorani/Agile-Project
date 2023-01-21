import React from "react";

export const useRegister = () => {
  
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
