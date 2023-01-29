import { DragAndDrop } from "../../components/DragAndDrop";
import data from "../../res/initial-data";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import { Create, Info } from "@mui/icons-material";
interface HomeProps {}

export const Home = ({}: HomeProps) => {
  const actions: {
    icon: JSX.Element;
    name: string;
  }[] = [
    { icon: <Create />, name: "Create Task" },
    { icon: <Info />, name: "Project Details" },
  ];

  return (
    <>
      <DragAndDrop data={data} />
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </>
  );
};
