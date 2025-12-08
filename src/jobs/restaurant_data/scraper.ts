import "axios";
import { err, ok, Result, unwrapOrThrow } from "#utils/result.js";
import fs from "fs";
import { homedir } from "os";
import path from "path";

const DELIVEROO_BASE_URL = "https://deliveroo.ae";

async function fetchRobotsTxt(url: string): Promise<Result<string>> {
  const response = await fetch(url);
  if (!response.ok) {
    return err(`Failed to fetch ${url}: ${response.statusText}`);
  }
  const text = await response.text();
  return ok(text);
}

interface Restaurant {
  title: string;
}

async function fetchDeliverooRestaurantData(): Promise<Result<Restaurant[]>> {
  const url = `${DELIVEROO_BASE_URL}/restaurants/dubai/dubai-business-bay?geohash=thrr3squys6w&collection=all-restaurants`;
  const allRestaurantsResponse = await fetch(url);
  if (!allRestaurantsResponse.ok) {
    return err(`Failed to fetch ${url}: ${allRestaurantsResponse.statusText}`);
  }
  console.log("Fetched restaurant HTML data");
  const content = await allRestaurantsResponse.text();
  const filePath = path.join(homedir(), "Downloads", "restaurants.txt");

  fs.writeFileSync(filePath, content, "utf8");
  console.log(`Restaurant data written to ${filePath}`);
  return ok(Array<Restaurant>());
}

// TODO: Pass database instance when inserting scraped data
export async function scrapeDelierooData() {
  console.log("Scraper job started");
  // Fetch robots.txt file from deliveroo.ae
  const robotsTxt = unwrapOrThrow(
    await fetchRobotsTxt(`${DELIVEROO_BASE_URL}/robots.txt`),
  );
  console.log("Fetched robots.txt:");
  console.log(robotsTxt);
}
