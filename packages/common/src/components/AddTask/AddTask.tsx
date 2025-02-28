import {
  Button,
  TextField,
  Dialog,
  Container,
  Slider,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { AddCircleRounded } from "@mui/icons-material";
import { useState } from "react";

const sendTask = async (
  title: string,
  hours: number,
  mins: number,
  days: string[]
) => {
  const response = await fetch("http://localhost:5000/addtask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      hours,
      mins,
      days,
    }),
  });
  if (response.ok) {
    console.log("Task added");
  }
};

const weekdays = [
  { name: "Sunday", value: 0 },
  { name: "Monday", value: 1 },
  { name: "Tuesday", value: 2 },
  { name: "Wednesday", value: 3 },
  { name: "Thursday", value: 4 },
  { name: "Friday", value: 5 },
  { name: "Saturday", value: 6 },
];

function TaskInputs() {
  const [title, setTitle] = useState<string>("");
  const [hours, setHours] = useState<number>(1);
  const [mins, setMins] = useState<number>(5);
  const [days, setDays] = useState<string[]>([
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]);

  return (
    <Container>
      <TextField
        variant="outlined"
        label="Task Title"
        value={title}
        required
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <p>Hours</p>
      <Slider
        aria-label="Hours"
        valueLabelDisplay="auto"
        step={1}
        marks
        defaultValue={1}
        min={0}
        max={5}
        onChange={(_, value) => {
          setHours(value as number);
        }}
      />
      <p>Mins</p>
      <Slider
        marks
        aria-label="Minutes"
        valueLabelDisplay="auto"
        step={5}
        defaultValue={5}
        min={0}
        max={60}
        onChange={(_, value) => {
          setMins(value as number);
        }}
      />
      <ToggleButtonGroup
        value={days}
        onChange={(e: React.MouseEvent<HTMLElement>, value: string[]) => {
          if (value.length) {
            setDays(value);
          }
        }}
      >
        {weekdays.map((days) => (
          <ToggleButton key={days.value} value={days.name}>
            {days.name}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <Button
        onClick={() => {
          sendTask(title, hours, mins, days).catch((e) => {
            console.log(e);
          });
        }}
      >
        Add Task
      </Button>
    </Container> //add dates  and sound upload
  );
}

export default function AddTask() {
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <>
      <Button
        onClick={() => {
          setVisible(true);
        }}
      >
        <AddCircleRounded />
      </Button>

      <Dialog
        open={visible}
        onClose={() => {
          setVisible(false);
        }}
      >
        <TaskInputs />
      </Dialog>
    </>
  );
}
