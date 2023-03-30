import React, {
  ChangeEvent,
  useEffect,
} from "react";
import {
  MenuItem,
  Stack,
  TextField,
  Button,
  CardContent,
  Chip,
  Paper,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { Typography } from "@mui/material";
import { FileUpload } from "@mui/icons-material";
import ReactQuill from "react-quill";
import { useParams } from "react-router";
import { useTask } from "./hooks/useTask";
import { useCommon } from "../../hooks/useCommon";
import { Priority } from "../../types/common";
import { TaskPriorityIcon } from "../../components/Common/TaskPriorityIcon";

type PriorityOptionsType = {
  taskType: string;
  value: Priority;
  icon: any;
};
const PriorityOptions: PriorityOptionsType[] = [
  {
    taskType: "Crictical",
    value: "critical",
    icon: <TaskPriorityIcon priority="critical" />,
  },
  {
    taskType: "Major",
    value: "major",
    icon: <TaskPriorityIcon priority="major" />,
  },
  {
    taskType: "Moderate",
    value: "moderate",
    icon: <TaskPriorityIcon priority="moderate" />,
  },
  {
    taskType: "Minor",
    value: "minor",
    icon: <TaskPriorityIcon priority="minor" />,
  },
];
const TaskUtility = ({ taskId }: { taskId?: string }) => {
  const { id: ProjectId } = useParams();
  const { members, searchUser } = useCommon();
  const {
    getTasks,
    handleDeleteForAdditionalFiles,
    handleFormDataUpdate,
    submitFormData,
    getExistingTaskData,
    formData,
  } = useTask(ProjectId);

  useEffect(() => {
    getTasks(taskId);
  }, []);

  console.log("TaskUtility", formData);

  return (
    <Stack mx="10px" spacing={2} width="550px">
      <TextField
        id="standard-basic"
        label="Task Name"
        variant="filled"
        size="small"
        value={formData.taskName}
        InputProps={{ disableUnderline: true }}
        InputLabelProps={{ shrink: true }}
        sx={{ width: "350px" }}
        onChange={(e) => {
          handleFormDataUpdate("taskName", e.target.value);
        }}
      />

      <TextField
        variant="filled"
        label="Summary"
        size="small"
        InputLabelProps={{ shrink: true }}
        InputProps={{ disableUnderline: true }}
        value={formData.summary}
        sx={{ width: "350px" }}
        multiline
        onChange={(e) => {
          handleFormDataUpdate("summary", e.target.value);
        }}
      />

      <TextField
        id="standard-basic"
        label="Assignee"
        variant="filled"
        size="small"
        InputProps={{ disableUnderline: true }}
        InputLabelProps={{ shrink: true }}
        select
        SelectProps={{
          multiple: true,
          renderValue: (selected: any) =>
            members
              .filter((member) => selected.indexOf(member.id) > -1)
              .map((member) => member.username)
              .join(", "),
        }}
        value={formData.assignedTo}
        sx={{ width: "350px" }}
        onChange={(e: any) => {
          handleFormDataUpdate("assignedTo", e.target.value);
        }}
      >
        {members.map((value, index) => (
          <MenuItem key={index} value={value.id}>
            <Checkbox checked={formData.assignedTo.indexOf(value.id) > -1} />
            <ListItemText primary={value.username} />
          </MenuItem>
        ))}
      </TextField>

      <TextField
        id="standard-basic"
        label="Reviewer"
        variant="filled"
        size="small"
        InputProps={{ disableUnderline: true }}
        InputLabelProps={{ shrink: true }}
        select
        SelectProps={{
          multiple: true,
          renderValue: (selected: any) =>
            members
              .filter((member) => selected.indexOf(member.id) > -1)
              .map((member) => member.username)
              .join(", "),
        }}
        sx={{ width: "350px" }}
        value={formData.reportTo}
        onChange={(e: any) => {
          handleFormDataUpdate("reportTo", e.target.value);
        }}
      >
        {members.map((value, index) => (
          <MenuItem key={index} value={value.id}>
            <Checkbox checked={formData.reportTo.indexOf(value.id) > -1} />
            <ListItemText primary={value.username} />
          </MenuItem>
        ))}
      </TextField>
      <TextField
        id="standard-basic"
        label="Priority"
        variant="filled"
        size="small"
        InputProps={{ disableUnderline: true }}
        InputLabelProps={{ shrink: true }}
        select
        sx={{ width: "150px" }}
        value={formData.priority}
        onChange={(e: any) => {
          handleFormDataUpdate("priority", e.target.value);
        }}
      >
        {PriorityOptions.map((value, index) => (
          <MenuItem
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "150px",
              alignItems: "center",
            }}
            key={index}
            value={value.value}
          >
            {value.icon} {value.taskType}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        id="standard-basic"
        label="Status"
        variant="filled"
        size="small"
        InputProps={{ disableUnderline: true }}
        InputLabelProps={{ shrink: true }}
        select
        sx={{ width: "350px" }}
        value={formData.status}
        placeholder="Select a Status"
        onChange={(e) => {
          handleFormDataUpdate("status", e.target.value);
        }}
      >
        <MenuItem value="toDo">To Do</MenuItem>
        <MenuItem value="inProgress">In Progress</MenuItem>
      </TextField>
      {/* need to find MUI them colors or soemthing here. For now this is the closest to natching the filled text input */}
      <Paper
        sx={{ backgroundColor: "rgba(0, 0, 0, 0.06)", height: "220px" }}
        elevation={0}
      >
        <ReactQuill
          style={{ height: "81%" }}
          theme="snow"
          value={formData.description}
          placeholder="Description"
          modules={{
            toolbar: [
              [{ header: [1, 2, false] }],
              ["bold", "italic", "underline"],
              ["image", "code-block"],
            ],
          }}
          onChange={(e: any) => {
            handleFormDataUpdate("description", e);
          }}
        />
      </Paper>

      <Paper sx={{ backgroundColor: "rgba(0, 0, 0, 0.06)" }} elevation={0}>
        <Typography
          variant="subtitle1"
          sx={{ fontSize: "12px" }}
          color="text.secondary"
          marginX="12px"
          marginTop="5px"
          gutterBottom
        >
          Upload Files
        </Typography>
        <CardContent>
          {formData?.additionalFiles &&
            formData?.additionalFiles.map((file, index) => {
              return (
                <Chip
                  variant="outlined"
                  label={file.name}
                  sx={{ marginRight: "5px", marginY: "5px" }}
                  onDelete={() => {
                    handleDeleteForAdditionalFiles(index);
                  }}
                />
              );
            })}
        </CardContent>

        <Button
          variant="outlined"
          component="label"
          color="primary"
          startIcon={<FileUpload />}
          sx={{ width: "auto", marginX: "12px", marginBottom: "10px" }}
        >
          Upload File
          <input
            type="file"
            hidden
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              handleFormDataUpdate("additionalFiles", e.target.files);
            }}
            value={[]}
            multiple
          />
        </Button>
      </Paper>
      <Stack direction="row" justifyContent="flex-end">
        <Button variant="text" sx={{ width: "100px" }} onClick={submitFormData}>
          Submit
        </Button>
      </Stack>
    </Stack>
  );
};

export { TaskUtility };
