export const onChange = (
  e: any,
  key: any,
  setValue: React.Dispatch<React.SetStateAction<any>>
) => {
  setValue((prev: any) => ({
    ...prev,
    [key]: e,
  }));
};

export const formatDateTime = (date: any) => {
  const formateDate = date.toLocaleDateString();
  const formatTime = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return [formateDate, formatTime];
};

export const consoleStatement = (message: string, color: any, state?: any) => {
  return () =>
    console.log(
      `%c ${message} \n`,
      `background: ${color}; color: white;  font-weight: bold;`,
      state
    );
};

const hexToRgb = (hex: string) => {
  // Convert the hex value to an RGB value
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);
  return { r, g, b };
};

const calculateLuminance = (rgbColor: any) => {
  // Calculate the relative luminance of the color
  const r = rgbColor.r / 255;
  const g = rgbColor.g / 255;
  const b = rgbColor.b / 255;
  const luminance =
    0.2126 * Math.pow(r, 2.2) +
    0.7152 * Math.pow(g, 2.2) +
    0.0722 * Math.pow(b, 2.2);
  return luminance;
};
export const checkColorContrast = (color: string) => {
  // Convert the color to an RGB value
  const rgbColor = hexToRgb(color);

  // Calculate the relative luminance of the color
  const luminance = calculateLuminance(rgbColor);

  // If the color is too dark, change the text color to white
  if (luminance < 0.05) {
    return "white";
  } else {
    return "black";
  }
};
export const colors = {
  primary: "#F05454",
  secondary: "#30475E",
  error: "#f44336",
  warning: "#ff9800",
  info: "#2196f3",
  success: "#4caf50",
  tertiary: "#DDDDDD",
  dark: "#222831",
};
