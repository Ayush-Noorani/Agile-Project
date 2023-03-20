import { Box } from "@mui/material";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import React, { useEffect, useState } from "react";
import { useTask } from "../../pages/Task/hooks/useTask";
import "./pieChartCss.css";
import Colors from "../../helper/colors";

const PieChart = ({ id, projectName, closeHandler }: any) => {
  const [pieData, setPieData] = useState<number[]>([]);
  const [pieLabels, setPieLabels] = useState<string[]>([]);

  const { getTasks, tasks, columns } = useTask(id);
  console.log("T: ", tasks);

  useEffect(() => {
    getTasks();
    loadPieChartData();
  }, [id]);

  const loadPieChartData = () => {
    if (Object.values(tasks).length > 0) {
      let tempLabels: string[] = [];
      let tempData: number[] = [];
      columns.forEach((col) => {
        console.log("COL: ", col, tasks[col?.value]?.length);
        tempLabels.push(col?.label);
        tempData.push(tasks[col?.value]?.length);
      });
      console.log("TEMP: ", tempData);
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

  const closeModal = () => {
    if (id) {
      closeHandler(undefined);
    }
  };

  const options = {
    plugins: {
      title: {
        display: true,
      },
    },
  };

  return (
    <Box visibility={id ? "visible" : "hidden"} className={"parentWrapper"}>
      <Box className={"contentWrapper"}>
        <Box className={"headerWrapper"}>
          <h3>Project status for {projectName}</h3>
          <button onClick={closeModal} className={"closeButton"}>
            Close
          </button>
        </Box>
        <Box className={"chartWrapper"}>
          <Pie data={data} options={options} />
        </Box>
      </Box>
    </Box>
  );
};

export default PieChart;
