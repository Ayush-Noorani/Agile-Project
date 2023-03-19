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
