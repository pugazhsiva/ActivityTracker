import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

const port = process.env.PORT;
const supabaseUrl = process.env.API_URL;
const supabaseKey = process.env.SERVICE_KEY;

const supabase = createClient(supabaseUrl!, supabaseKey!, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false,
  },
});

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(port, () => {
  console.log("listening");
});

app.get("/home", (req, res) => {
  res.send("hello");
  console.log("sent");
});

app.get("/", async (req, res) => {
  let { data, error } = await supabase.from("tasks").select("task_title");

  res.send(data);
});

app.post("/signup", async (req, res) => {
  const data = await signin(req.body.email, req.body.password);
  res.send(data);
});

const signin = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (data) {
    return data.session?.access_token;
  } else {
    console.log(error);
  }
};

app.post("/tasks", async (req, res) => {
  const {
    data: { user },
  } = await supabase.auth.getUser(req.body.token);

  let { data: tasks, error } = await supabase.from("tasks").select("*");
  console.log(user);
  console.log(tasks);
});
