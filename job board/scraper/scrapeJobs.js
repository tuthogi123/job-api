const axios = require("axios");
const cheerio = require("cheerio");

const scrapeJobs = async () => {
  try {
    const url = "https://weworkremotely.com/categories/remote-programming-jobs";
    console.log("Fetching jobs from We Work Remotely...");

    const { data } = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });

    const $ = cheerio.load(data);
    let jobs = [];

    $(".jobs article ul li").each((index, element) => {
      const title = $(element).find(".title").text().trim();
      const company = $(element).find(".company").text().trim();
      const location = $(element).find(".region").text().trim();
      const link =
        "https://weworkremotely.com" + $(element).find("a").attr("href");

      if (title && company) {
        jobs.push({ title, company, location, link });
      }
    });

    console.log("✅ Jobs found:", jobs);
    return jobs;
  } catch (error) {
    console.error("❌ Error scraping jobs:", error.message);
  }
};

// Run scraper
scrapeJobs();
