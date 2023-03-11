import { Typography } from "@mui/material";
import { getNameAcronym } from "../../helper/common";

interface TypoGraphyImageProps {
  name: string;
  url: string | undefined;
  isSelected?: boolean;
  onClick?: Function;
  id?: string;
}

const generateRandomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
};

export const TypoGraphyImage = ({
  id,
  name,
  url,
  isSelected,
  onClick,
}: TypoGraphyImageProps) => (
  <Typography
    onClick={() => {
      if (onClick) {
        onClick(id);
      }
    }}
    sx={{
      display: "flex",
      flexDirection: "row",
      backgroundColor: generateRandomColor(),
      borderRadius: "40px",
      height: "40px",
      width: "40px",
      padding: "5px",
      color: "black",
      justifyContent: "center",
      alignItems: "center",
      borderWidth: isSelected ? "0.5px" : "",
      borderStyle: isSelected ? "solid" : "",
      borderColor: "grey",
    }}
    className="profile-shadow"
    variant="h5"
  >
    {url ? <img src={url} alt="Product image" /> : getNameAcronym(name)}
  </Typography>
);
