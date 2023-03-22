import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "../../css/project.css";
import { FormType, Member, ProjectData } from "../../types/common";
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Fab,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { FormTextField, WeightLabel } from "../../components/Common/Common";
import { DateRange } from "react-date-range";
import { addDays } from "date-fns";
import { Add, Delete } from "@mui/icons-material";
import { ListView } from "../../components/ListView";
import { useProject } from "./hooks/useProject";
import { baseURL } from "../../helper/axios";
import { useCommon } from "../../hooks/useCommon";
import { TypoGraphyImage } from "../../components/Common/TypoGraphyImage";

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
  const fileRef = useRef<any>(null);
  const autoCompplete = useRef<any>(null);
  const reader = new FileReader();
  const { members, searchUser } = useCommon();
  const { value, updateState, fetchExistingData, fetchMembers, submitData } =
    useProject(id);
  const [state, setState] = useState<any[]>([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  const [image, setImage] = useState<string>("");
  useEffect(() => {
    if (id !== "create") {
      fetchExistingData(id);
      fetchMembers();
    }
  }, []);

  const handleImageUpload = (e: any) => {
    updateState(e.target.files[0], "img");

    reader.readAsDataURL(e.target.files[0] as File);
    reader.addEventListener("load", () => {
      setImage(reader.result as string);
    });
  };

  return (
    <div className="create-view" style={{ marginBottom: "50px" }}>
      <div style={{ position: "relative", width: "50%", marginBottom: "5px" }}>
        <img
          alt="img"
          src={
            image.length > 0
              ? image
              : value.img
              ? `${baseURL}/image/project/${id}.png`
              : "https://images.unsplash.com/photo-1620121478247-ec786b9be2fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YmxvYnxlbnwwfHwwfHw%3D&w=1000&q=80"
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
      <input type="file" onChange={handleImageUpload} ref={fileRef} />
      <form className="row" style={{ justifyContent: "space-evenly" }}>
        <div className="form" style={{ width: "400px" }}>
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
            renderInput={(params) => <TextField {...params} label="Category" />}
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
        </div>
      </form>
      <Button
        variant="contained"
        className="margin"
        onClick={submitData}
        style={{ width: "80px", alignSelf: "center" }}
      >
        {id !== "0" ? "Update" : "Create"}
      </Button>
    </div>
  );
};
