import { FormEvent, useContext, useState } from "react";
import { TextField, Button } from "@mui/material";
import { AuthContext } from "../../contexts";

export function SignUp() {
  const [credentials, setCredentials] = useState<{
    email: string;
    password: string;
  }>({ email: "", password: "" });

  const { setToken } = useContext(AuthContext);

  function signin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const token = async () => {
      const data = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify(credentials),
      });

      data.text().then(
        (value) => {
          setToken(value);
        },
        (error) => {
          console.log(error);
        }
      );
    };
    token().catch((error) => {
      console.log(error);
    });
  }

  return (
    <form onSubmit={signin}>
      <TextField
        name="email"
        value={credentials.email}
        onChange={(e) => {
          setCredentials({ ...credentials, email: e.target.value });
        }}
        variant="outlined"
      />
      <TextField
        name="password"
        value={credentials.password}
        onChange={(e) => {
          setCredentials({ ...credentials, password: e.target.value });
        }}
        variant="outlined"
      />
      <Button type="submit">submit</Button>
    </form>
  );
}
