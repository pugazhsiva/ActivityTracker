import express from "express";
import body from "body-parser";
import cors from "cors";

const port = 5000;

const app = express();
app.use(cors());

app.listen(port, () => {
  console.log("listening");
});

app.get("/home", (req, res) => {
  res.send("hello");
  console.log("sent");
});
