<<<<<<< HEAD
=======
import React, { ChangeEvent, ChangeEventHandler, useState } from "react";
import {
  MenuItem,
  Stack,
  TextField,
  Button,
  CardContent,
  Chip,
  Paper,
} from "@mui/material";
import { Typography } from "@mui/material";
import { FileUpload } from "@mui/icons-material";
import ReactQuill from "react-quill";
import { useParams } from "react-router";
import { axiosInstance } from "../../helper/axios";

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

type Task = {
  description: string;
  summary: string;
  taskName: string;
  assignedTo: string[];
  reportTo: string[];
  additionalFiles: File[];
  status: "toDo" | "inProgres";
};

const CreateTaskView = () => {
  const [formData, setFormData] = useState<Task>({
    description: "",
    summary: "",
    taskName: "",
    assignedTo: [],
    reportTo: [],
    additionalFiles: [],
    status: "toDo",
  });

  const { id } = useParams();

  const submitFormData = () => {
    console.log(formData);
    const submitData: any = new FormData();
    for (var key in formData) {
      submitData.append(key, formData[key as keyof Task]);
    }

    // submitData.append("data", JSON.stringify(formData));

    axiosInstance.post(`/task/create/${id}`, submitData).then(() => {
      console.log("sent data");
    });

    // axios.post("localhost:8080/task/create", submitData, {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // });
  };
  const handleDeleteForAdditionalFiles = (index: number) => {
    setFormData((prev) => {
      return {
        ...prev,
        additionalFiles: prev.additionalFiles.filter((file, i) => i != index),
      };
    });
  };

  const handleFormDataUpdate = (
    key: keyof Task,
    value: any,
    indexForArray?: number
  ) => {
    setFormData((prev) => {
      switch (key) {
        case "additionalFiles":
          const files: File[] = value ? Array.from(value) : [];
          return {
            ...prev,
            additionalFiles: prev.additionalFiles.concat(files),
          };

        default:
          return {
            ...prev,
            [key]: value,
          };
      }
    });
  };

  return (
    <Stack mx="10px" spacing={2} width="550px">
      <TextField
        id="standard-basic"
        label="Task Name"
        variant="filled"
        size="small"
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
        SelectProps={{ multiple: true }}
        value={formData.assignedTo}
        sx={{ width: "350px" }}
        onChange={(e) => {
          handleFormDataUpdate("assignedTo", e.target.value);
        }}
      >
        {names.map((name) => (
          <MenuItem key={name} value={name}>
            {name}
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
        SelectProps={{ multiple: true }}
        sx={{ width: "350px" }}
        value={formData.reportTo}
        onChange={(e) => {
          handleFormDataUpdate("reportTo", e.target.value);
        }}
      >
        {names.map((name) => (
          <MenuItem
            key={name}
            value={name}
            //   style={getStyles(name, personName, theme)}
          >
            {name}
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
          console.log(e.target.value);
          handleFormDataUpdate("status", e.target.value);
        }}
      >
        <MenuItem value="toDo">To Do</MenuItem>
        <MenuItem value="inProgres">In Progress</MenuItem>
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
            // console.log("quil update", e);
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
          {formData.additionalFiles.map((file, index) => {
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

export { CreateTaskView };
>>>>>>> adde2cb (Form now submits data to server)
