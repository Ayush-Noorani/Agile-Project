import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import { Delete } from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { CustomFormControl } from "../../components/Common/CustomFormControl";
import { ListView } from "../../components/ListView";
import { onChange } from "../../utils/Common";

const fields = [
  {
    label: "Task Name",
    type: "text",
    name: "Task Name",
    helperText: "Enter your task name",
  },
  {
    label: "Summary",
    type: "text",
    name: "summary",
    helperText: "Enter your task Summary",
  },
];
type Task = {
  description: string;
  summary: string;
  taskName: string;
  assignedTo: string[];
  reportTo: string[];
  status: "toDo" | "inProgres";
};
export const TaskForm = () => {
  const [value, setValue] = useState<Task>({
    description: "",
    summary: "",
    taskName: "",
    assignedTo: [],
    reportTo: [],
    status: "toDo",
  });

  const onUpdate = (id: string, value: string) => onChange(value, id, setValue);

  return (
    //create row with two divisions for forms
    <Container
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {fields.map((field) => (
          <CustomFormControl
            {...field}
            value={value[field.name as keyof Task] as string}
            onChange={onUpdate}
          />
        ))}
        <FormControl
          style={{
            width: "80%",
            marginTop: "20px",
          }}
          fullWidth
        >
          <InputLabel id="demo-simple-select-label">Description</InputLabel>

          <ReactQuill
            style={{
              marginTop: "50px",
              height: "200px",
            }}
            theme="snow"
            value={value.description}
            placeholder="Description"
            onChange={(e: any) => onChange(e, "description", setValue)}
          />
        </FormControl>

        <FormControl style={{ width: "30%", marginTop: "80px" }} fullWidth>
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={value.status}
            label="Age"
            onChange={(e) => onChange(e.target.value, "status", setValue)}
          >
            <MenuItem color="orange" value={"toDo"}>
              To Do
            </MenuItem>
            <MenuItem color="green" value={"inProgress"}>
              In Progress
            </MenuItem>
          </Select>
        </FormControl>
      </Container>

      <Container
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          className="column member-section"
          style={{
            height: "20%",
          }}
        >
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            className="margin"
            onChange={(e) => {}}
            sx={{ width: 200 }}
            renderInput={(params) => (
              <TextField {...params} label="Assigned to" />
            )}
            options={[]}
          />

          <ListView
            data={value.assignedTo}
            action={[
              (id: any) => (
                <Button onClick={(id) => {}} color="error">
                  <Delete />
                </Button>
              ),
            ]}
          />
        </div>
        <div
          className="column member-section"
          style={{
            height: "20%",
          }}
        >
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            className="margin"
            onChange={(e) => {}}
            sx={{ width: 200 }}
            renderInput={(params) => (
              <TextField {...params} label="Report to" />
            )}
            options={[]}
          />

          <ListView
            data={value.reportTo}
            action={[
              (id: any) => (
                <Button onClick={(id) => {}} color="error">
                  <Delete />
                </Button>
              ),
            ]}
          />
        </div>
      </Container>
    </Container>
  );
};
