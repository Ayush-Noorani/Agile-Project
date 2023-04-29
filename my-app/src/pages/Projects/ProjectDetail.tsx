import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "../../css/project.css";
import { FormType, Member, ProjectData } from "../../types/common";
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  Fab,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FormTextField, WeightLabel } from "../../components/Common/Common";
import { addDays } from "date-fns";
import { DateRangePicker } from "@adobe/react-spectrum";
import { Add, Delete } from "@mui/icons-material";
import { ListView } from "../../components/ListView";
import { useProject } from "./hooks/useProject";
import { useCommon } from "../../hooks/useCommon";
import { TypoGraphyImage } from "../../components/Common/TypoGraphyImage";
import Compressor from "compressorjs";
import { defaultTheme, Provider } from "@adobe/react-spectrum";
import { parseDate } from "@internationalized/date";
import { ColumnForm } from "../Task/components/ColumnForm";
import { useUser } from "../../hooks/useUser";

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

export const ProjectDetail = () => {
  const { id } = useParams();
  const fileRef = useRef<any>(null);
  const autoCompplete = useRef<any>(null);
  const reader = new FileReader();
  const { members, searchUser } = useCommon();
  const { user } = useUser();
  const { navigate } = useCommon();
  const { value, updateState, fetchExistingData, submitData } = useProject(id);
  const [state, setState] = useState<any[]>([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  const [image, setImage] = useState<string>("");
  useEffect(() => {
    searchUser("");
    if (id !== "create") {
      fetchExistingData(id);
    }
  }, []);

  const handleImageUpload = (e: any) => {
    new Compressor(e.target.files[0], {
      quality: 0.3,
      success: (compressedResult) => {
        console.log(compressedResult);
        updateState(compressedResult, "img");
      },
    });
    reader.readAsDataURL(e.target.files[0] as File);
    reader.addEventListener("load", () => {
      setImage(reader.result as string);
    });
  };
  const [openColumn, setOpenColumn] = useState(false);

  console.log("pid", id);

  return (
    <Provider
      theme={{
        ...defaultTheme,
      }}
      colorScheme="light"
    >
      <div
        className="create-view tertiary "
        style={{ marginBottom: "90px", overflow: "auto" }}
      >
        <div
          style={{ position: "relative", width: "50%", marginBottom: "5px" }}
        >
          <img
            alt="img"
            src={
              "https://images.unsplash.com/photo-1620121478247-ec786b9be2fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YmxvYnxlbnwwfHwwfHw%3D&w=1000&q=80"
            }
            height="200px"
            width="100%"
            style={{ borderRadius: "10px", zIndex: 0 }}
            className="box-shadow"
          />
          <Fab
            variant="circular"
            color="primary"
            size="small"
            onClick={() => fileRef.current.click()}
            style={{
              zIndex: 1,

              position: "absolute",
              bottom: "10px",
              right: "10px",
            }}
          >
            <Add />
          </Fab>
        </div>
        <input
          style={{
            display: "none",
          }}
          type="file"
          onChange={handleImageUpload}
          ref={fileRef}
        />
        <Stack direction="row" justifyContent={"space-around"} spacing={3}>
          <Stack spacing={3} className="form" style={{ width: "400px" }}>
            {form.map((item, index) => (
              <FormTextField
                id="filled-basic"
                label={item.label}
                sx={{ width: "400px" }}
                value={value[item.name as keyof ProjectData]}
                defaultValue={value[item.name as keyof ProjectData]}
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
              renderInput={(params) => (
                <TextField {...params} label="Category" />
              )}
              options={[]}
            />
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              className="margin"
              ref={autoCompplete}
              onChange={(e, newValue) => {
                if (newValue && newValue.id) {
                  updateState([...value.members, newValue], "lead");
                  autoCompplete.current.value = "";
                }
              }}
              sx={{ width: 400 }}
              autoHighlight
              renderInput={(params) => (
                <TextField
                  onChange={(e) => searchUser(e.target.value)}
                  {...params}
                  label="Team Lead"
                />
              )}
              options={members.map((value, key) => ({
                ...value,
                label: value.username,
                value: value.id,
                color: value.color,
              }))}
              getOptionLabel={(option) => option.label}
              renderOption={(props, option) => (
                <Box
                  component="li"
                  {...props}
                  className="row"
                  sx={{ alignItems: "center" }}
                >
                  <TypoGraphyImage color={option.color} name={option.label} />
                  <ListItemText primary={option.label} />
                </Box>
              )}
            />

            <Box
              className="margin"
              style={{
                display: "flex",
                flexDirection: "column",
                width: "350px",
                height: "200px",
              }}
            >
              <WeightLabel weight={600}>
                Project start - expected end date
              </WeightLabel>
              {/* <DateRange
              minDate={new Date()}
              editableDateInputs={true}
              startDatePlaceholder="Start Date"
              onChange={(item: any) => {
                updateState(item.selection.startDate, "startDate");

                updateState(item.selection.expectedEndDate, "endDate");

                setState([item.selection]);
              }}
              moveRangeOnFirstSelection={false}
              ranges={state}
            /> */}
              <DateRangePicker
                defaultValue={{
                  //@ts-ignore
                  startDate:
                    typeof value.startDate === "string"
                      ? parseDate(value.startDate.split("T")[0])
                      : value.startDate,
                  endDate:
                    typeof value.endDate === "string"
                      ? parseDate(value.endDate.split("T")[0])
                      : value.endDate,
                }}
                onChange={(value) => {
                  updateState(value.start.toDate("Asia/Kolkata"), "startDate");

                  updateState(value.end.toDate("Asia/Kolkata"), "endDate");
                }}
              />
            </Box>
          </Stack>
          <Dialog open={openColumn} onClose={() => setOpenColumn(false)}>
            <ColumnForm id={id} onClose={() => setOpenColumn(false)} />
          </Dialog>
          <Stack className="column member-section">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              className="margin"
              ref={autoCompplete}
              onSelect={(e) => console.log(e)}
              onChange={(e, newValue) => {
                if (newValue && newValue.id) {
                  updateState([...value.members, newValue], "members");
                  autoCompplete.current.value = "";
                }
              }}
              sx={{ width: 400 }}
              autoHighlight
              renderInput={(params) => (
                <TextField
                  onChange={(e) => searchUser(e.target.value)}
                  {...params}
                  label="Members"
                />
              )}
              options={members
                .filter((item, key) => {
                  return !value.members.find((v) => v.id === item.id);
                })
                .map((value, key) => ({
                  ...value,
                  label: value.username,
                  value: value.id,
                }))}
              getOptionLabel={(option) => option.label}
              renderOption={(props, option) => (
                <Box
                  component="li"
                  {...props}
                  className="row"
                  sx={{ alignItems: "center" }}
                >
                  <TypoGraphyImage color={option.color} name={option.label} />
                  <Typography sx={{ marginLeft: "10px" }}>
                    {option.label}
                  </Typography>
                </Box>
              )}
            />

            {(value.members as Member[]) ? (
              <ListView
                data={value.members}
                action={[
                  (id: any) => (
                    <Button
                      onClick={() => {
                        updateState(
                          value.members.filter((item) => item.id !== id),
                          "members"
                        );
                      }}
                      color="error"
                    >
                      <Delete />
                    </Button>
                  ),
                ]}
              />
            ) : (
              <></>
            )}
          </Stack>
        </Stack>

        {(user.roles.includes("admin") ||
          user.roles.includes("lead") ||
          user.roles.includes("manager")) && (
          <Stack
            style={{
              position: "absolute",
              bottom: "10px",
              right: "10px",
            }}
            direction="row"
            spacing={2}
          >
            <Button
              variant="contained"
              className="margin"
              onClick={() => setOpenColumn(true)}
              style={{
                width: "80px",
                alignSelf: "center",
              }}
            >
              Columns
            </Button>

            <Button
              variant="contained"
              className="margin"
              onClick={() => {
                submitData();
                navigate("/projects");
              }}
              style={{
                width: "80px",
                alignSelf: "center",
              }}
            >
              {id ? "Update" : "Create"}
            </Button>
          </Stack>
        )}
      </div>
    </Provider>
  );
};
