import React from "react";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { makeStyles, styled, withStyles } from "@mui/styles";

import "./App.css";
const useStyles = makeStyles((theme) => ({
  customDatePicker: {
    "& .Mui-selected": {
      backgroundColor: "#1976d2",
      color: "#fff",
      fontWeight: 500,
      transition: "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    },
  },
}));

const CustomDatePicker = withStyles((theme) => ({
  selected: {
    backgroundColor: "#1976d2",
    color: "#fff",
    fontWeight: 500,
    transition: "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  },
}))(DatePicker);
dayjs.extend(customParseFormat);

function App() {
  const classes = useStyles();
  const [startDate, setStartDate] = React.useState<Dayjs | null>(
    dayjs("DD-MM-YYYY")
  );
  const [endDate, setEndDate] = React.useState<Dayjs | null>(
    dayjs("DD-MM-YYYY")
  );

  const handleStartDateChange = (newStartDate: Dayjs | null) => {
    if (!endDate || !newStartDate || !newStartDate.isAfter(endDate, "day")) {
      setStartDate(newStartDate);
      if (newStartDate && endDate && newStartDate.isAfter(endDate, "day")) {
        setEndDate(null);
      }
    } else {
      setEndDate(null);
    }
  };

  const handleEndDateChange = (newEndDate: Dayjs | null) => {
    if (!startDate || (newEndDate && !newEndDate.isBefore(startDate, "day"))) {
      setEndDate(newEndDate);
      if (startDate && newEndDate && newEndDate.isBefore(startDate, "day")) {
        setStartDate(null);
      }
    } else {
      setEndDate(newEndDate);
      setStartDate(null);
    }
  };

  return (
    <div className="App-header">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker", "DatePicker"]}>
          <DatePicker
            className="custom-datepicker-root"
            label="Start Date"
            value={startDate}
            onChange={handleStartDateChange as any}
            format="DD-MM-YYYY"
          />
          <DatePicker
            className="custom-datepicker-root"
            label="End Date"
            value={endDate}
            onChange={handleEndDateChange as any}
            format="DD-MM-YYYY"
          />
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
}

export default App;
