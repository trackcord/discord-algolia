import readline from "node:readline";
import Bun from "bun";

async function askForQuery() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise<string>((resolve) => {
    rl.question("Enter a query to search for guilds: ", (query) => {
      rl.close();
      resolve(query);
    });
  });
}

async function getAndSaveGuilds(userQuery?: string, locale?: string) {
  const response = await fetch(
    "https://nktzz4aizu-dsn.algolia.net/1/indexes/prod_discoverable_guilds/query?x-algolia-agent=Algolia%20for%20JavaScript%20(4.1.0)%3B%20Browser", // there is also staging_discoverable_guilds but we don't got perms :(
    {
      headers: {
        "x-algolia-api-key": "aca0d7082e4e63af5ba5917d5e96bed0",
        "x-algolia-application-id": "NKTZZ4AIZU",
      },
      body: JSON.stringify({
        query: userQuery || "",
        optionalFilters: [`preferred_locale: ${locale || ""}`],
        hitsPerPage: 1000, // max
      }),
      method: "POST",
    },
  );

  const data = await response.json();

  if (data.hits.length) {
    const fileName = `data/${locale || "all"}.json`;

    try {
      await Bun.write(fileName, JSON.stringify(data.hits, null, 2));
      console.log(`Saved guilds for locale: ${locale || "all"} to ${fileName}`);
    } catch (error) {
      console.error(
        `Error saving guilds for locale: ${locale || "all"} to ${fileName}: ${error}`,
      );
    }
  } else {
    console.error(`No guilds found for locale: ${locale || "all"}`);
  }
}

export { askForQuery, getAndSaveGuilds };
