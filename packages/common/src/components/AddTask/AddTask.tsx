import { Button, TextField, Dialog, Container, Slider } from "@mui/material";
import { AddCircleRounded } from "@mui/icons-material";
import { useState } from "react";

function TaskInputs() {
  const [hours, setHours] = useState<number>(1);
  const [mins, setMins] = useState<number>(5);

  return (
    <Container>
      <TextField variant="outlined" label="Task Title" required />
      <p>Hours</p>
      <Slider
        aria-label="Hours"
        valueLabelDisplay="auto"
        step={1}
        marks
        defaultValue={1}
        min={0}
        max={5}
        onChange={(event, value) => {
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
        onChange={(event, value) => {
          setMins(value as number);
        }}
      />
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
