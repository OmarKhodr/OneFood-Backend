import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const restaurants = pgTable("restaurants", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 256 }).notNull(),
  address: varchar("address", { length: 512 }).notNull(),
  description: varchar("description", { length: 1024 }).notNull(),
  imageUrl: varchar("image_url", { length: 512 }).notNull(),
});
