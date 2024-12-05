import readline from "node:readline"

import Bun from "bun"
import Logger from "./logger"

async function askForQuery() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  return new Promise<string>((resolve: (value: string) => void) => {
    rl.question("Enter a query to search for guilds: ", (answer) => {
      resolve(answer)
      rl.close()
    })
  })
}

async function getAndSaveGuilds(
  userQuery?: string,
  locale?: string,
  category?: number
) {
  const response = await fetch(
    "https://nktzz4aizu-dsn.algolia.net/1/indexes/prod_discoverable_guilds/query?x-algolia-agent=Algolia%20for%20JavaScript%20(4.23.3)%3B%20Browser",
    {
      headers: {
        "x-algolia-api-key": "aca0d7082e4e63af5ba5917d5e96bed0",
        "x-algolia-application-id": "NKTZZ4AIZU",
      },
      body: JSON.stringify({
        query: userQuery || "",
        optionalFilters: [`preferred_locale: ${locale || "en-US"}`],
        hitsPerPage: 1000,
        filters: `approximate_presence_count>0 ${
          category ? `AND categories.id:${category}` : ""
        }`,
      }),
      method: "POST",
    }
  )

  const data = await response.json()

  const fileName = `data/${userQuery || "all"}${
    locale ? `-${locale}` : ""
  }${category ? `-${category}` : ""}.json`

  try {
    await Bun.write(fileName, JSON.stringify(data.hits, null, 2))
    Logger.success(
      `Successfully saved ${data.hits.length} guilds to ${fileName} file`
    )
  } catch (error) {
    Logger.error(
      `An error occurred while saving the guilds to ${fileName} file`
    )
  }
}

export { askForQuery, getAndSaveGuilds }
