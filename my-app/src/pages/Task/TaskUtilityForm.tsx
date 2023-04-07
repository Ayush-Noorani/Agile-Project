import React, { ChangeEvent, useEffect } from "react";
import {
  MenuItem,
  Stack,
  TextField,
  Button,
  CardContent,
  Chip,
  Paper,
  FormGroup,
  FormLabel,
  Container,
} from "@mui/material";
import { Typography } from "@mui/material";
import { FileUpload } from "@mui/icons-material";
import ReactQuill from "react-quill";
import { useParams } from "react-router";
import { useTask } from "./hooks/useTask";
import { useCommon } from "../../hooks/useCommon";
import { Priority } from "../../types/common";
import { TaskPriorityIcon } from "../../components/Common/TaskPriorityIcon";
import { usePlan } from "../Plan/hooks/usePlan";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

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
const TaskUtilityForm = ({
  taskId,
  closeModal,
}: {
  taskId?: string;
  closeModal: Function;
}) => {
  const { id: ProjectId } = useParams();
  const { members, searchUser } = useCommon();
  const { currentPlan, getPlans } = usePlan(ProjectId);
  const {
    getTasks,
    currentProject,
    handleDeleteForAdditionalFiles,
    handleFormDataUpdate,
    submitFormData,
    formData,
  } = useTask(ProjectId);

  useEffect(() => {
    if (taskId) {
      console.log("TaskId", taskId);
      getTasks(taskId, ProjectId);
    }
    getPlans({
      status: "1",
    });
  }, []);

  return (
    <Stack mx="10px" p="5px" spacing={2}>
      <Container
        sx={{
          display: "flex",
        }}
      >
        <Stack mx="10px" p="5px" spacing={2} width="550px">
          <TextField
            id="standard-basic"
            label="Task Name"
            variant="outlined"
            size="small"
            value={formData.taskName}
            InputLabelProps={{ shrink: true }}
            sx={{ width: "350px" }}
            onChange={(e) => {
              handleFormDataUpdate("taskName", e.target.value);
            }}
          />

          <TextField
            variant="outlined"
            label="Summary"
            size="small"
            InputLabelProps={{ shrink: true }}
            value={formData.summary}
            sx={{ width: "350px" }}
            multiline
            onChange={(e) => {
              handleFormDataUpdate("summary", e.target.value);
            }}
          />

          <TextField
            id="standard-basic"
            label="Status"
            variant="outlined"
            size="small"
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
          <Paper
            sx={{ backgroundColor: "rgba(0, 0, 0, 0.06)", height: "220px" }}
            elevation={0}
          >
            <ReactQuill
              style={{ height: "81%", borderRadius: "20px" }}
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

          {/* <Paper sx={{ backgroundColor: "rgba(0, 0, 0, 0.06)" }} elevation={0}>
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
      </Paper> */}
          <Stack direction="row" justifyContent="flex-end"></Stack>
        </Stack>
        <Stack mx="10px" p="5px" spacing={2}>
          <TextField
            id="standard-basic"
            label="Priority"
            variant="outlined"
            size="small"
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
                {value.icon}
              </MenuItem>
            ))}
          </TextField>
          <FormGroup
            sx={{
              width: "350px",
            }}
          >
            <FormLabel
              style={{
                margin: "5px",
              }}
            >
              Assigned To
            </FormLabel>
            <Select
              closeMenuOnSelect={false}
              placeholder="Assigned To"
              components={animatedComponents}
              defaultValue={formData.assignedTo.map((value) => ({
                label: value.username,
                value: value.id,
              }))}
              isMulti
              onChange={(e) => {
                handleFormDataUpdate(
                  "assignedTo",
                  e
                    .map((value) => value.value)
                    .map((item: any) =>
                      currentProject?.members.find(
                        (value: any) => value.id === item
                      )
                    )
                );
              }}
              options={currentProject?.members.map((value) => ({
                label: value.username,
                value: value.id,
              }))}
            />
          </FormGroup>
          <FormGroup
            sx={{
              width: "350px",
            }}
          >
            <FormLabel
              style={{
                margin: "5px",
              }}
            >
              Report To
            </FormLabel>
            <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              placeholder="Report To"
              //onChange={(e)=>{}}
              defaultValue={formData.reportTo.map((value) => ({
                label: value.username,
                value: value.id,
              }))}
              isMulti
              onChange={(e) => {
                handleFormDataUpdate(
                  "reportTo",
                  e
                    .map((value) => value.value)
                    .map((item: any) =>
                      currentProject?.members.find(
                        (value: any) => value.id === item
                      )
                    )
                );
              }}
              options={currentProject?.members.map((value) => ({
                label: value.username,
                value: value.id,
              }))}
            />
          </FormGroup>
        </Stack>
      </Container>
      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          disableElevation
          sx={{
            width: "100px",
            backgroundColor: "#3c37fd",
          }}
          onClick={() => {
            submitFormData(currentPlan.id);
            // closeModal();
          }}
        >
          Submit
        </Button>
      </Stack>
    </Stack>
  );
};

export { TaskUtilityForm };
