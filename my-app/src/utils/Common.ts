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
