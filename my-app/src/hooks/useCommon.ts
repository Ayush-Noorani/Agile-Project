import { useNavigate } from "react-router-dom";

export const useCommon = () => {
  const navigate = useNavigate();

  return {
    navigate,
  };
};
