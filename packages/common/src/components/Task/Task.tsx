import { Check, Circle } from "@mui/icons-material";
import "./Task.css";
import { useState, useRef, useContext } from "react";
import { Button, Slider } from "@mui/material";
import { sailormoon } from "../../assets";
import { useWithSound } from "../../hooks";
import { TaskContext } from "../../contexts";
import EditTask from "../EditTask/EditTask";

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
export type TaskTimerProps = { hours: number; mins: number };

function TaskTimer(props: TaskTimerProps) {
  const [hours, setHours] = useState<number>(props.hours);
  const [mins, setMins] = useState<number>(props.mins);
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

  const startTimer = (hours: number, mins: number, secs: number) => {
    const startTime = new Date();

    startTime.setHours(
      startTime.getHours() + hours,
      startTime.getMinutes() + mins,
      startTime.getSeconds() + secs
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

  return (
    <>
      <div>
        <h2>{countdown}</h2>
      </div>
      <Button
        onClick={() => {
          if (intervalRef) {
            clearTimer();
          }
          startTimer(hours, mins, 0);
        }}
      >
        Start
      </Button>
      <Button onClick={clearTimer}>Stop</Button>
    </>
  );
}

export type TaskProps = {
  title: string;
  timer: TaskTimerProps;
  days: string[];
  id: number;
};

export function Task(props: TaskProps) {
  const [completed, setCompleted] = useState<boolean>(false);

  return (
    //add task edit function
    <TaskContext value={{ completed, setCompleted }}>
      <div className="task">
        <p className="taskTitle">{props.title}</p>
        <TaskProgress />
        <TaskTimer {...props.timer} />
        <EditTask id={props.id} />
      </div>
    </TaskContext>
  );
}
