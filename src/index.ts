import { askForQuery, getAndSaveGuilds } from "./lib/utils.ts";
import locales from "./lib/data.ts";

const userQuery = await askForQuery();

const isGlobal = process.argv.includes("--global");

if (isGlobal) {
  await getAndSaveGuilds(userQuery);
} else {
  for (const locale of locales) {
    await getAndSaveGuilds(userQuery, locale);
  }
}
