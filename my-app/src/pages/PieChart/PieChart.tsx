import { Box } from "@mui/material";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import React, { useEffect, useState } from "react";
import { useTask } from "../Task/hooks/useTask";
import "./pieChart.css";
import Colors from "../../helper/colors";
import { useParams } from "react-router-dom";

const PieChart = ({ id, projectName, closeHandler }: any) => {
  const [pieData, setPieData] = useState<number[]>([]);
  const [pieLabels, setPieLabels] = useState<string[]>([]);

  const params = useParams();
  const {
    getTasks,
    tasks,
    column: columns,
    currentProject,
  } = useTask(params.id);

  useEffect(() => {
    getTasks(undefined, params.id);
  }, [params.id]);

  useEffect(() => {
    loadPieChartData();
  }, [tasks]);

  const loadPieChartData = () => {
    if (tasks) {
      let tempLabels: string[] = [];
      let tempData: number[] = [];
      columns.forEach((col) => {
        tempLabels.push(col?.label);
        tempData.push(tasks[col?.value]?.length);
      });
      setPieData(tempData);
      setPieLabels(tempLabels);
    }
  };

  const data = {
    labels: pieLabels,
    datasets: [
      {
        data: pieData,
        backgroundColor: Colors,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
      },
    },
  };

  return (
    <Box className={"parentWrapper"}>
      <Box className={"contentWrapper"}>
        <Box className={"headerWrapper"}>
          <h3>Project status for {currentProject?.name}</h3>
        </Box>
        <Box className={"chartWrapper"}>
          <Pie data={data} options={options} />
        </Box>
      </Box>
    </Box>
  );
};

export default PieChart;
