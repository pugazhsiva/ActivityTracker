import { useState, useContext, useEffect } from "react";
import "@/App.css";
import { Task } from "@activitytracker/common";

import { AddTask } from "@activitytracker/common/src/components";

import { Button } from "@mui/material";
import { AuthContext } from "@activitytracker/common";
import { Link } from "react-router";

function App() {
  const { token } = useContext(AuthContext);
  const [tasksObject, setTaskObject] = useState<
    {
      created_at: string;
      id: number;
      task_days: string[];
      task_hours: number;
      task_mins: number;
      task_title: string;
      user_id: string | null;
    }[]
  >([]);
  useEffect(() => {
    fetchTask().catch((error) => {
      console.log(error);
    });
  }, [token]);

  const fetchTask = async () => {
    if (token) {
      const data = await fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ token: token }),
      });
      data.json().then(
        (data) => setTaskObject(data),
        (e) => {
          console.log(e);
        }
      );
    }
  };

  return (
    <>
      <AddTask />
      <>
        {tasksObject.map((task) => (
          <Task
            key={task.id}
            id={task.id}
            title={task.task_title}
            timer={{ hours: task.task_hours, mins: task.task_mins }}
            days={task.task_days}
          />
        ))}
      </>

      <Button to="/login" component={Link}>
        loga
      </Button>
    </>
  );
}

export default App;
