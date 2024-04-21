import { askForQuery, getAndSaveGuilds } from "./lib/utils.ts";
import { locales, categoryIds } from "./lib/data.ts";
import Logger from "./lib/logger.ts";

const userQuery = await askForQuery();

const isGlobal = process.argv.includes("--global");
const isCategory = process.argv.includes("--category");
const start = Date.now();

if (isGlobal) {
  await getAndSaveGuilds(userQuery);
} else {
  if (isCategory) {
    for (const category of categoryIds) {
      for (const locale of locales) {
        await getAndSaveGuilds(userQuery, locale, category);
      }
    }
  } else {
    for (const locale of locales) {
      await getAndSaveGuilds(userQuery, locale);
    }
  }
}

Logger.success(`Finished in ${Date.now() - start}ms`);
