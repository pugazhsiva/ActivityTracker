import { Check, Circle } from "@mui/icons-material";
import "./Task.css";
import { useState, useRef } from "react";
import { Button, MenuItem, Select } from "@mui/material";

function TaskProgress() {
  const [done, setDone] = useState(false);

  return (
    <div className="taskProgress">
      {done ? <Check> </Check> : <Circle></Circle>}
      <Button onClick={() => setDone(!done)}>{done ? "Unmark" : "Mark"}</Button>
    </div>
  );
}

function TaskTimer() {
  const intervalRef = useRef(0);

  const [countdown, setCountdown] = useState("00:00:00");

  const getTimeRemaining = (startTime: Date) => {
    const total = startTime.getTime() - Date.now();
    if (total >= 0) {
      const seconds = Math.floor((total / 1000) % 60);
      const minutes = Math.floor((total / 1000 / 60) % 60);
      const hours = Math.floor((total / 1000 / 60 / 60) % 24);
      setCountdown(
        (hours > 9 ? hours : "0" + hours) +
          ":" +
          (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    } else {
      clearTimer();
    }
  };

  const startTimer = () => {
    const startTime = new Date();
    const timeNum = time.split(",").map((item) => Number(item));
    startTime.setHours(
      startTime.getHours() + timeNum[0],
      startTime.getMinutes() + timeNum[1],
      startTime.getSeconds() + timeNum[2]
    );
    intervalRef.current = setInterval(() => {
      getTimeRemaining(startTime);
    }, 1000);
  };

  const clearTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      setCountdown("00:00:00");
    }
  };

  const [time, setTime] = useState<string>("0,5,0");
  return (
    <>
      <div>
        <h2>{countdown}</h2>
      </div>
      <div>
        <Select
          value={time}
          onChange={(event) => {
            clearTimer();
            setTime(event.target.value);
          }}
        >
          <MenuItem value={"0,5,0"}>5 mins</MenuItem>
          <MenuItem value={"0,15,0"}>15 mins</MenuItem>
          <MenuItem value={"0,30,0"}>30 mins</MenuItem>
          <MenuItem value={"1,0,0"}>1 hour</MenuItem>
        </Select>
      </div>
      <Button
        onClick={() => {
          if (intervalRef) {
            clearTimer();
          }
          startTimer();
        }}
      >
        Start
      </Button>
      <Button onClick={clearTimer}>Stop</Button>
    </>
  );
}

export default function Task() {
  return (
    <div className="task">
      <p className="taskTitle">Task</p>
      <TaskProgress />
      <TaskTimer />
    </div>
  );
}
