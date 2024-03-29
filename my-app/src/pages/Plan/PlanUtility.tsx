import React, { useEffect, useState } from "react";
import { DateRangePicker, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { onChange } from "../../utils/Common";
import project from "../../redux/reducers/project";
import { useProject } from "../Projects/hooks/useProject";
import { usePlan } from "./hooks/usePlan";
import { useParams } from "react-router-dom";

interface PlanUtilityProps {
  setOpen: (open: boolean) => void;
  open: boolean;
  closeModal: () => void;
}

export const PlanUtility = ({
  setOpen,
  open,
  closeModal,
}: PlanUtilityProps) => {
  const { id } = useParams();
  const { form, setForm, createPlan } = usePlan(id);
  const { projects, fetchAllProjects } = useProject();

  useEffect(() => {
    fetchAllProjects();
    onChange(id, "project", setForm);
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
      const value: any = ranges?.selection;
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
    closeModal();
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
          label="Plan Name"
          value={form.planName}
          onChange={(e) => onChange(e.target.value, "planName", setForm)}
        />

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
