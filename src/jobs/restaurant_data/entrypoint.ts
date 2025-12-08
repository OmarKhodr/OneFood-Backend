// TODO: Implement worker job.

import { scrapeDelierooData } from "#jobs/restaurant_data/scraper.js";

async function startJob() {
  // TODO: Initialize database and pass it to scraper
  await scrapeDelierooData();
}

startJob()
  .then(() => {
    console.log("Worker job completed");
  })
  .catch((error: unknown) => {
    console.error("Error in worker job:", error);
  });
