import { Check, Circle } from "@mui/icons-material";
import "./Task.css";
import { useState, useRef, useContext } from "react";
import { Button, MenuItem, Select } from "@mui/material";
import sailormoon from "@assets/sailormoon.mp3";
import useWithSound from "@hooks/soundHook";
import { TaskContext } from "@/Contexts";

function TaskProgress() {
  const { completed, setCompleted } = useContext(TaskContext);

  return (
    <div className="taskProgress">
      {completed ? <Check> </Check> : <Circle></Circle>}
      <Button onClick={() => setCompleted(!completed)}>
        {completed ? "Unmark" : "Mark"}
      </Button>
    </div>
  );
}

function TaskTimer() {
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const { setCompleted } = useContext(TaskContext);

  const { playsound } = useWithSound(sailormoon);
  const [countdown, setCountdown] = useState("00:00:00");

  const getTimeRemaining = (startTime: Date) => {
    const total = startTime.getTime() - Date.now();
    if (total > 0) {
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
      playsound();
      setCompleted(true);
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
    }, 100);
  };

  const clearTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      setCountdown("00:00:00");
    }
  };

  const [time, setTime] = useState<string>("0,0,10");
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
            setCompleted(false);
            setTime(event.target.value);
          }}
        >
          <MenuItem value={"0,0,10"}>10 seconds</MenuItem>
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
  const [completed, setCompleted] = useState<boolean>(false);

  return (
    <TaskContext.Provider value={{ completed, setCompleted }}>
      <div className="task">
        <p className="taskTitle">Task</p>
        <TaskProgress />
        <TaskTimer />
      </div>
    </TaskContext.Provider>
  );
}
