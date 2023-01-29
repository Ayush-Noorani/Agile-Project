import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../css/project.css";
import { FormType } from "../../types/common";
import { Autocomplete, Box, Button, Fab, TextField } from "@mui/material";
import { onChange } from "../../utils/Common";
import { FormTextField, WeightLabel } from "../../components/Common/Common";
import { DateRange } from "react-date-range";
import { addDays } from "date-fns";
import { Add } from "@mui/icons-material";
interface ProjectDetailProps {}

interface ProjectData {
  name: string;
  description: string;
  members: string[];
  img: string;
  startDate: Date;
  expectedEndDate: Date;
  category: string;
  lead: string;
}
type state = {
  selection: {
    startDate: Date;
    endDate: Date;
    key: string;
  };
};

const form: FormType[] = [
  {
    label: "Project Name",
    type: "text",
    name: "name",
  },
  {
    label: "Description",
    type: "text",
    name: "description",
  },
];
export const ProjectDetail = ({}: ProjectDetailProps) => {
  const { type, id } = useParams();
  const [state, setState] = useState<any[]>([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  const [value, setValue] = useState<ProjectData>({
    name: "",
    description: "",
    members: [],
    img: "",
    startDate: new Date(),
    expectedEndDate: new Date(),
    category: "",
    lead: "",
  });
  useEffect(() => {
    if (type === "edit") {
      getExistingData();
    }
  }, [type]);

  const getExistingData = () => {
    // get existing data from server
  };
  return (
    <div className="create-view">
      <div style={{ position: "relative", width: "50%" }}>
        <img
          alt="img"
          src={
            value.img
              ? value.img
              : "https://images.unsplash.com/photo-1620121478247-ec786b9be2fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YmxvYnxlbnwwfHwwfHw%3D&w=1000&q=80"
          }
          height="200px"
          width="100%"
          style={{ borderRadius: "10px" }}
          className="box-shadow"
        />
        {/* <Fab
          variant="circular"
          color="primary"
          size="small"
          style={{
            zIndex: 1,

            position: "absolute",
            bottom: "10",
            right: "-50",
          }}
        >
          <Add />
        </Fab> */}
      </div>
      <form className="form" style={{ width: "400px" }}>
        {form.map((item, index) => (
          <FormTextField
            id="filled-basic"
            label={item.label}
            sx={{ width: "400px" }}
            value={value[item.name as keyof ProjectData]}
            onChange={(e: { target: { value: any } }) =>
              onChange(e.target.value, item.name, setValue)
            }
            variant="outlined"
          />
        ))}
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          className="margin"
          onChange={(e) => {}}
          sx={{ width: 400 }}
          renderInput={(params) => <TextField {...params} label="Category" />}
          options={[]}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          className="margin"
          onChange={(e) => {}}
          sx={{ width: 400 }}
          renderInput={(params) => <TextField {...params} label="Team Lead" />}
          options={[]}
        />
        <Box
          className="margin"
          style={{
            display: "flex",
            flexDirection: "column",
            width: "350px",
          }}
        >
          <WeightLabel weight={600}>
            Project start - expected end date
          </WeightLabel>
          <DateRange
            editableDateInputs={true}
            onChange={(item: any) => {
              onChange(item.selection.startDate, "startDate", setValue);
              onChange(item.selection.endDate, "expectedEndDate", setValue);

              setState([item.selection]);
            }}
            moveRangeOnFirstSelection={false}
            ranges={state}
          />
        </Box>
        <Button
          variant="contained"
          className="margin"
          style={{ width: "80px", alignSelf: "flex-end" }}
        >
          {type === "edit" ? "Update" : "Create"}
        </Button>
      </form>
    </div>
  );
};
