import { Accordion, AccordionSummary, Box, InputLabel } from "@mui/material";
import "chart.js/auto";
import { Line, Pie } from "react-chartjs-2";
import React, { useEffect, useState } from "react";
import { useTask } from "../Task/hooks/useTask";
import "./pieChart.css";
import Colors from "../../helper/colors";
import { useParams } from "react-router-dom";
import "../../css/common.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
const chartData = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Dataset 1",
      data: [12, 19, 3, 5, 2, 3, 7],
      borderColor: "red",
      fill: false,
    },
    {
      label: "Dataset 2",
      data: [2, 3, 20, 5, 1, 4, 12],
      borderColor: "blue",
      fill: false,
    },
  ],
};
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
      const tempLabels: string[] = [];
      const tempData: number[] = [];
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
    <Box className={"parentWrapper tertiary"}>
      <Box className={"contentWrapper"}>
        <Box className={"headerWrapper"}>
          <h3>Project status for {currentProject?.name}</h3>
        </Box>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <h4 className="font-bold">Tasks Overview</h4>
          </AccordionSummary>
          <Box className={"chartWrapper "}>
            <Pie data={data} options={options} />
          </Box>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <h4 className="font-bold">Plans Overview</h4>
          </AccordionSummary>
          <Box className={"chartWrapper "}>
            <Line data={chartData} options={options} />
          </Box>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <h4 className="font-bold">User Overview</h4>
          </AccordionSummary>
          <Box className={"chartWrapper "}>
            <Line data={chartData} options={options} />
          </Box>
        </Accordion>
      </Box>
    </Box>
  );
};

export default PieChart;
