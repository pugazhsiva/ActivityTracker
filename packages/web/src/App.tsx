import { useState, useContext } from "react";
import { react } from "@activitytracker/common";
import viteLogo from "/vite.svg";
import "@/App.css";
import { Task } from "@activitytracker/common";

import AddTask from "@activitytracker/common/src/components";
import { SignUp } from "@activitytracker/common";
import { Button } from "@mui/material";
import { AuthContext } from "@activitytracker/common";

function App() {
  const [count, setCount] = useState(0);
  const [thing, setThing] = useState({});
  const { token } = useContext(AuthContext);

  const fetchTask = async () => {
    if (token) {
      const data = await fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: token }),
      });
      data.json().then(
        (value) => {
          setThing(value);
          console.log(thing);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  };

  return (
    <>
      <SignUp />
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={react} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Task />
      <AddTask />
      <Button
        onClick={() => {
          fetchTask().catch((error) => {
            console.log(error);
          });
        }}
      >
        Fetch Task
      </Button>
    </>
  );
}

export default App;
