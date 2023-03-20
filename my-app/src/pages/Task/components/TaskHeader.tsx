import {
  Avatar,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React from "react";
import { TypoGraphyImage } from "../../../components/Common/TypoGraphyImage";
import { formatDateTime } from "../../../utils/Common";
import { useTask } from "../hooks/useTask";

export const ShowDateDiff = ({ endDate }: any) => {
  console.log(endDate);
  if (endDate) {
    const startDate = new Date();
    endDate = new Date(endDate);
    const timeDiffMs = endDate.getTime() - startDate.getTime();

    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;

    const daysLeft = Math.floor(timeDiffMs / msPerDay);
    const hoursLeft = Math.floor((timeDiffMs % msPerDay) / msPerHour);
    const minsLeft = Math.floor((timeDiffMs % msPerHour) / msPerMinute);
    return (
      <Typography
        component="div"
        sx={{
          display: "inline-flex",
          alignItems: "center",
          p: 1,
          borderRadius: 1,
          bgcolor: "background.default",
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: "bold", mr: 1 }}>
          Time left:
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontStyle: "italic", color: "text.secondary" }}
        >
          {daysLeft} days, {hoursLeft} hours, and {minsLeft} minutes
        </Typography>
      </Typography>
    );
  }
  return <></>;
};
export const TaskHeader = ({ id, plans }: { id: string; plans: any[] }) => {
  const { currentProject, setFilters, filters } = useTask(id);
  const onClick = (id: string) => {
    if (filters?.id && filters?.id.includes(id)) {
      setFilters({
        id: filters?.id.filter((value: string) => value !== id),
      });
    } else {
      setFilters({
        id: filters?.id ? [...filters?.id, id] : [id],
      });
    }
  };

  const setPlanFilter = (plan: string) => {
    setFilters({
      plan,
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "90%",
        padding: "5px",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        {currentProject?.members.map((value) => {
          return (
            <TypoGraphyImage
              onClick={() => onClick(value.username)}
              name={value.name}
              color={value.color}
              isSelected={filters?.id && filters?.id.includes(value.username)}
              url={value.img}
            />
          );
        })}
      </Box>
      {plans.length > 0 && (
        <>
          <Box
            sx={{
              alignSelf: "center",
              width: "20%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <FormControl
              sx={{
                alignSelf: "center",
                width: "70%",
              }}
            >
              <InputLabel id="planName-label">Current Plan</InputLabel>
              <Select
                labelId="planName-label"
                id="planName"
                name="planName"
                label="Plan Name"
                value={filters.plan}
                defaultChecked={filters.plan}
                defaultValue={filters.plan}
                onChange={(e) => setPlanFilter(e.target.value)}
              >
                {plans.map((plan) => (
                  <MenuItem value={plan.id}>{plan.planName}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <ShowDateDiff
            endDate={plans?.find((value) => value.id === filters.plan).endDate}
          />
        </>
      )}
    </Box>
  );
};
