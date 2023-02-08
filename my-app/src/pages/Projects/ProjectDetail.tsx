import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../css/project.css";
import { FormType, ProjectData } from "../../types/common";
import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { FormTextField, WeightLabel } from "../../components/Common/Common";
import { DateRange } from "react-date-range";
import { addDays } from "date-fns";
import { Delete } from "@mui/icons-material";
import { ListView } from "../../components/ListView";
import { useProject } from "./hooks/useProject";

interface ProjectDetailProps {}

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
  const { id } = useParams();

  const { members, value, updateState, fetchExistingData, fetchMembers } =
    useProject(id);
  const [state, setState] = useState<any[]>([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  useEffect(() => {
    fetchExistingData(id);
    fetchMembers();
  }, [fetchExistingData, fetchMembers, id]);

  return (
    <div className="create-view">
      <div style={{ position: "relative", width: "100%", marginBottom: "5px" }}>
        <img
          alt="img"
          src={
            value.img
              ? value.img
              : "https://images.unsplash.com/photo-1620121478247-ec786b9be2fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YmxvYnxlbnwwfHwwfHw%3D&w=1000&q=80"
          }
          height="200px"
          width="70%"
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
      <form className="row" style={{ justifyContent: "space-evenly" }}>
        <div className="form" style={{ width: "400px" }}>
          {form.map((item, index) => (
            <FormTextField
              id="filled-basic"
              label={item.label}
              sx={{ width: "400px" }}
              value={value[item.name as keyof ProjectData]}
              onChange={(e: { target: { value: any } }) =>
                updateState(e.target.value, item.name as keyof ProjectData)
              }
              variant="outlined"
              required
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
            renderInput={(params) => (
              <TextField {...params} label="Team Lead" />
            )}
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
              minDate={new Date()}
              editableDateInputs={true}
              startDatePlaceholder="Start Date"
              onChange={(item: any) => {
                updateState(item.selection.startDate, "startDate");

                updateState(item.selection.expectedEndDate, "expectedEndDate");

                setState([item.selection]);
              }}
              moveRangeOnFirstSelection={false}
              ranges={state}
            />
          </Box>
        </div>
        <div className="column member-section">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            className="margin"
            onChange={(e) => {}}
            sx={{ width: 400 }}
            renderInput={(params) => <TextField {...params} label="Members" />}
            options={[]}
          />

          <ListView
            data={value.members}
            action={[
              (id: any) => (
                <Button onClick={(id) => {}} color="error">
                  <Delete />
                </Button>
              ),
            ]}
          />
        </div>
      </form>
      <Button
        variant="contained"
        className="margin"
        style={{ width: "80px", alignSelf: "center" }}
      >
        {id !== "0" ? "Update" : "Create"}
      </Button>
    </div>
  );
};
