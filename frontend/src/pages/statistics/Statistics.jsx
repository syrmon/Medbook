import React, { useState } from "react";
import styles from "./styles.module.css";
import { useGetStatisticsQuery } from "state/api";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LineChart } from "@mui/x-charts/LineChart";
import {
  dateOptimizer,
  monthOptimizer,
  yearOptimizer,
} from "components/tools/timeOptimizer";

const Statistics = () => {
  const [selectedDate, setSelectedDate] = useState({
    date: "",
    filter: "",
  });
  const { data, isLoading } = useGetStatisticsQuery(selectedDate);

  const setDate = (data, filter) => {
    let date;
    if (filter === "day") {
      date = dateOptimizer(data);
    } else if (filter === "month") {
      date = monthOptimizer(data);
    } else if (filter === "year") {
      date = yearOptimizer(data);
    }
    setSelectedDate({
      date,
      filter,
    });
  };

  const amountData = [1];
  const outcomeData = [2];
  const incomeData = [];
  const xLabels = ["test"];

  data &&
    data.filterStats &&
    data.filterStats.map((d) => {
      amountData.push(d.totalAmount);
      outcomeData.push(d.totalOutcome);
      incomeData.push(d.totalIncome);
      xLabels.push(d.dateIdentifier);
    });

  console.log(amountData);

  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.selectorContainer}`}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            variant="standard"
            format="MM-YYYY"
            label="ay"
            views={["month", "year"]}
            onChange={(a) => setDate(a, "month")}
          />
          <DatePicker
            variant="standard"
            format="YYYY"
            label="il"
            views={["year"]}
            onChange={(a) => setDate(a, "year")}
          />
        </LocalizationProvider>
      </div>
      <div className={`${styles.totalReceipe}`}>
        <h4>Toplam Qebz sayi: </h4>
      </div>

      <div className={`${styles.detailsContainer}`}>
        <LineChart
          width={400}
          height={300}
          series={[
            { data: amountData, label: "Qazanclar", color: "green" },
            { data: outcomeData, label: "Xercler", color: "red" },
          ]}
          sx={{
            ".css-1k2u9zb-MuiChartsAxis-root .MuiChartsAxis-tickLabel": {
              fontSize: "6px!important",
            },
            ".MuiLineElement-root": {
              strokeWidth: 2,
            },
            ".MuiMarkElement-root": {
              stroke: "#8884d8",
              scale: "0",
              fill: "#fff",
              strokeWidth: 2,
            },
          }}
          xAxis={[{ scaleType: "point", data: xLabels }]}
        />
      </div>
      <div className={`${styles.totalDetailsContainer}`}>
        <h4>
          Toplam Qazanc: <span>{data && data.results.totalAmount} AZN</span>
        </h4>
        <h4>
          Toplam Rasxod: <span>{data && data.results.totalOutcome} AZN</span>
        </h4>
      </div>
      <div className={`${styles.totalIncomeContainer}`}>
        <h4>Toplam Gelir: {data && data.results.totalIncome}</h4>
      </div>
    </div>
  );
};

export default Statistics;
