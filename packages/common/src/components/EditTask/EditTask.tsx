import { Check, Circle } from "@mui/icons-material";

import { useState, useRef, useContext } from "react";
import {
  Button,
  Slider,
  TextField,
  ToggleButtonGroup,
  ToggleButton,
  Dialog,
} from "@mui/material";

const weekdays = [
  { name: "Sunday", value: 0 },
  { name: "Monday", value: 1 },
  { name: "Tuesday", value: 2 },
  { name: "Wednesday", value: 3 },
  { name: "Thursday", value: 4 },
  { name: "Friday", value: 5 },
  { name: "Saturday", value: 6 },
];

const sendEdit = async (
  title: string,
  hours: number,
  mins: number,
  days: string[],
  id: number
) => {
  const response = await fetch("http://localhost:5000/edittask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      hours,
      mins,
      days,
      id,
    }),
  });
  if (response.ok) {
    console.log("Task added");
  }
};

export function TaskEditor(props: { id: number }) {
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
    <>
      <TextField
        variant="outlined"
        label="Task Title"
        value={title}
        required
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <div>
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
      </div>
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
          sendEdit(title, hours, mins, days, props.id).catch((e) => {
            console.log(e);
          });
        }}
      >
        Add Task
      </Button>
    </>
  );
}

export default function EditTask(props: { id: number }) {
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <>
      <Button
        onClick={() => {
          setVisible(true);
        }}
      >
        <Check />
      </Button>

      <Dialog
        open={visible}
        onClose={() => {
          setVisible(false);
        }}
      >
        <TaskEditor id={props.id} />
      </Dialog>
    </>
  );
}
