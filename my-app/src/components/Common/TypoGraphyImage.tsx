import { Typography } from "@mui/material";
import { getNameAcronym } from "../../helper/common";

interface TypoGraphyImageProps {
  name: string;
  url?: string | undefined;
  isSelected?: boolean;
  onClick?: Function;
  id?: string;
  color?: string;
  sx?: any;
}

export const TypoGraphyImage = ({
  id,
  name,
  url,
  isSelected,
  onClick,
  color,
  sx,
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
      boxShadow: "0px 1px 4px 1px gray",
      justifyContent: "center",
      alignItems: "center",
      borderWidth: isSelected ? "0.5px" : "",
      borderStyle: isSelected ? "solid" : "",
      borderColor: "grey",
      ...sx,
    }}
    className="profile-shadow"
    variant="h5"
  >
    {url ? <img src={url} alt="Product image" /> : getNameAcronym(name)}
  </Typography>
);
