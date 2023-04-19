import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useMemo } from "react";
import { TypoGraphyImage } from "../../../components/Common/TypoGraphyImage";
import { useTask } from "../hooks/useTask";
import { colors } from "../../../utils/Common";

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
          bgcolor: colors.primary,
          color: "white",
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: "bold", mr: 1 }}>
          Time left:
        </Typography>
        {daysLeft > 0 ? (
          <Typography variant="body2" sx={{ fcolor: "text.secondary" }}>
            {daysLeft} days, {hoursLeft} hours, and {minsLeft} minutes
          </Typography>
        ) : (
          <Typography variant="body2" sx={{ fcolor: "text.secondary" }}>
            Ended
          </Typography>
        )}
      </Typography>
    );
  }
  return <></>;
};
export const TaskHeader = ({
  id,
  plans,
  planId,
}: {
  id: string | undefined;
  plans: any[];
  planId: string | undefined;
}) => {
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

  console.log(
    "finding",
    plans.find((plan) => plan.status === "1")
  );
  const currentPlan = useMemo(() => {
    const planIndex = plans.findIndex((plan) => plan.status === "1");
    return plans.length > 0 && planIndex
      ? plans[planIndex].planName
      : "No Active Plan";
  }, [plans]);

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
        {currentProject?.members.map((value, index) => {
          return (
            <TypoGraphyImage
              onClick={() => onClick(value.username)}
              name={value.name}
              color={value.color}
              sx={index > 0 ? { marginLeft: "-16px" } : {}}
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
              <TextField label="Current Plan" value={currentPlan} disabled />
            </FormControl>
          </Box>
          {!planId && (
            <ShowDateDiff
              endDate={
                plans?.find((value) => value.id === filters.plan).endDate
              }
            />
          )}
        </>
      )}
    </Box>
  );
};
