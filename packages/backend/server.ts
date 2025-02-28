import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";
import cookieparser from "cookie-parser";

const port = process.env.PORT;
const supabaseUrl = process.env.API_URL;
const supabaseKey = process.env.ANON_KEY;

const supabase = createClient(supabaseUrl!, supabaseKey!, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false,
  },
});
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

const app = express();
app.use(cors(corsOptions));
app.use(cookieparser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(port, () => {
  console.log("listening");
});

app.post("/signin", async (req, res) => {
  const data = await signin(req.body.email, req.body.password);
  if (data) {
    res.cookie("tokens", data, {
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    });
    res.json(data);
  } else {
    res.sendStatus(400);
  }
});

const signin = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (data.session) {
    return {
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
    };
  } else {
    console.log(error);
  }
};

app.post("/tasks", async (req, res) => {
  const { data: tasks, error: db_Error } = await supabase
    .from("tasks")
    .select("*");
  console.log(tasks);
  res.send(tasks);
});

app.post("/addtask", async (req, res) => {
  const { title, hours, mins, days } = req.body;

  const { data, error } = await supabase
    .from("tasks")
    .insert([
      {
        task_title: title,
        task_hours: hours,
        task_mins: mins,
        task_days: days,
      },
    ])
    .select("*");
  console.log(data);
});

app.post("/refresh", async (req, res) => {
  if (req.cookies.tokens) {
    const { access_token, refresh_token } = req.cookies.tokens;
    const { data, error: session_Error } = await supabase.auth.setSession({
      access_token,
      refresh_token,
    });

    res.send({
      access_token: data.session!.access_token,
      refresh_token: data.session!.refresh_token,
    });
  } else {
    res.sendStatus(400);
  }
});

app.post("/edittask", async (req, res) => {
  const { title, hours, mins, days, id } = req.body;

  const { data, error } = await supabase
    .from("tasks")
    .update([
      {
        task_title: title,
        task_hours: hours,
        task_mins: mins,
        task_days: days,
      },
    ])
    .eq("id", id)
    .select();
  console.log(data);
});
