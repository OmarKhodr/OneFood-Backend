import express from "express";

const app = express();
const port = process.env.PORT ?? "3000";

app.get("/", (req, res) => {
  res.send("Hello, World! Potato");
  console.log("Response sent");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
