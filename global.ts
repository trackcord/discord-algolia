import { writeFile } from "fs/promises";

async function getAndSaveGuilds() {
  const response = await fetch(
    "https://nktzz4aizu-dsn.algolia.net/1/indexes/prod_discoverable_guilds/query?x-algolia-agent=Algolia%20for%20JavaScript%20(4.1.0)%3B%20Browser",
    {
      headers: {
        "x-algolia-api-key": "aca0d7082e4e63af5ba5917d5e96bed0",
        "x-algolia-application-id": "NKTZZ4AIZU",
      },
      body: JSON.stringify({
        query: "pfps",
        hitsPerPage: 1000,
      }),
      method: "POST",
    },
  );

  const data = await response.json();

  if (data.hits.length) {
    try {
      await writeFile("data/global.json", JSON.stringify(data.hits, null, 2));
      console.log(`Saved guilds to data/global.json`);
    } catch (error) {
      console.error(`Error saving guilds`, error);
    }
  } else {
    console.error(`No guilds found`);
  }
}

getAndSaveGuilds().catch(console.error);
