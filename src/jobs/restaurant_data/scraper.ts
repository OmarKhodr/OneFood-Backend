import "axios";

// TODO: Pass database instance when inserting scraped data
export async function scrapeDelierooData() {
  console.log("Scraper job started");
  // Fetch robots.txt file from deliveroo.ae
  try {
    const response = await fetch("https://deliveroo.ae/robots.txt");
    const data = await response.text();
    console.log("Fetched robots.txt content:");
    console.log(data);
  } catch (error) {
    console.error("Error fetching robots.txt:", error);
  }
}
