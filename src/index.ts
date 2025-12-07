import { initDatabase } from "#db/init.js";
import { eq } from "drizzle-orm";
import express from "express";

import { restaurants } from "./db/schema.js";

const app = express();

const db = initDatabase();

app.get("/", (req, res) => {
  res.send("Hello, World! Potato");
  console.log("Response sent");
});

app.get("/restaurants", async (req, res) => {
  const allRestaurants = await db.select().from(restaurants);
  res.send(allRestaurants);
});

app.get("/restaurants/:id", async (req, res) => {
  const { id } = req.params;
  const restaurant = await db
    .select()
    .from(restaurants)
    .where(eq(restaurants.id, Number(id)))
    .limit(1);
  if (restaurant.length === 0) {
    res.status(404).send({ error: "Restaurant not found" });
  } else {
    res.send(restaurant[0]);
  }
});

const port = process.env.PORT ?? "3000";
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
