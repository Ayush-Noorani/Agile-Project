import React, { useEffect, useState } from "react";
import { DateRangePicker, DateRange, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useBackLog } from "./hooks/useBackLog";
import { onChange } from "../../utils/Common";
import project from "../../store/reducers/project";
import { useProject } from "../Projects/hooks/useProject";

interface BackLogUtilityProps {
  setOpen: (open: boolean) => void;
  open: boolean;
}

export const BackLogUtility = ({ setOpen, open }: BackLogUtilityProps) => {
  const { form, setForm, createPlan } = useBackLog();
  const { projects, fetchAllProjects } = useProject();
  useEffect(() => {
    fetchAllProjects();
  }, []);
  const [dateRange, setDateRange] = useState<
    {
      startDate: Date;
      endDate: Date;
      key: string;
    }[]
  >([
    {
      startDate: form.startDate,
      endDate: form.endDate,
      key: "selection",
    },
  ]);
  const [projectName, setProjectName] = useState<string>("");

  const handleDateChange = (ranges: RangeKeyDict) => {
    console.log(ranges);
    if (ranges) {
      let value: any = ranges?.selection;
      setDateRange([value]);
      onChange(value.startDate, "startDate", setForm);

      onChange(value.endDate, "endDate", setForm);
    }
  };

  const handleProjectNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProjectName(event.target.value);
  };

  const handleSubmit = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleDialogSubmit = () => {
    createPlan();
    setOpen(false);
  };
  console.log(projects);
  return (
    <Dialog open={open} onClose={handleDialogClose}>
      <DialogTitle>Make a Plan</DialogTitle>
      <DialogContent
        sx={{
          padding: "35px",
          display: "flex",
          flexDirection: "column",
          height: "60vh",
          justifyContent: "space-between",
        }}
      >
        <TextField
          label="Project Name"
          value={form.planName}
          onChange={(e) => onChange(e.target.value, "planName", setForm)}
        />
        <FormControl fullWidth>
          <InputLabel id="projectname-label">Select a Project</InputLabel>
          <Select
            labelId="projectname-label"
            id="projectname"
            name="projectname"
            label="Project Name"
            value={project}
            onChange={(e) => onChange(e.target.value, "project", setForm)}
          >
            {projects.map((project) => (
              <MenuItem value={project.id}>{project.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <DateRangePicker ranges={dateRange} onChange={handleDateChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)} color="primary">
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleDialogSubmit}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
