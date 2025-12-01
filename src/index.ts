import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import { restaurants } from "./db/schema.js";
import express from "express";

const app = express();

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in environment variables");
}

const db = drizzle(process.env.DATABASE_URL);

app.get("/", (req, res) => {
  res.send("Hello, World! Potato");
  console.log("Response sent");
});

app.post("/restaurants", express.json(), async (req, res) => {
  const { name, address, description, imageUrl } = req.body;
  if (!name || !address || !description || !imageUrl) {
    res.status(400).send({ error: "Missing required fields" });
    return;
  }
  const [newRestaurant] = await db
    .insert(restaurants)
    .values({ name, address, description, imageUrl })
    .returning();
  res.status(201).send(newRestaurant);
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
