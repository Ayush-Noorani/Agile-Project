import { Typography } from "@mui/material";
import { getNameAcronym } from "../../helper/common";

interface TypoGraphyImageProps {
  name: string;
  url?: string | undefined;
  isSelected?: boolean;
  onClick?: Function;
  id?: string;
  color?: string;
}

export const TypoGraphyImage = ({
  id,
  name,
  url,
  isSelected,
  onClick,
  color,
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
      backgroundColor: color ? color : "grey",
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
