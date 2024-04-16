import fs from "fs/promises";
import { writeFile } from "fs/promises";

const locales = [
  "bg",
  "cs",
  "da",
  "de",
  "el",
  "en-GB",
  "en-US",
  "es-ES",
  "es-419",
  "fi",
  "fr",
  "hr",
  "hu",
  "it",
  "ja",
  "ko",
  "lt",
  "nl",
  "no",
  "pl",
  "pt-BR",
  "ro",
  "ru",
  "sv-SE",
  "th",
  "tr",
  "uk",
  "vi",
  "zh-CN",
  "zh-TW",
  "hi",
];

const savedLocales = new Set();

async function getAndSaveGuilds(locale: string) {
  const response = await fetch(
    "https://nktzz4aizu-dsn.algolia.net/1/indexes/prod_discoverable_guilds/query?x-algolia-agent=Algolia%20for%20JavaScript%20(4.1.0)%3B%20Browser",
    {
      headers: {
        "x-algolia-api-key": "aca0d7082e4e63af5ba5917d5e96bed0",
        "x-algolia-application-id": "NKTZZ4AIZU",
      },
      body: JSON.stringify({
        query: "pfps",
        optionalFilters: [`preferred_locale: ${locale}`],
        hitsPerPage: 1000,
      }),
      method: "POST",
    },
  );

  const data = await response.json();

  if (data.hits.length && !savedLocales.has(locale)) {
    const fileName = `data/${locale}.json`;

    try {
      await writeFile(fileName, JSON.stringify(data.hits, null, 2));
      savedLocales.add(locale);
      console.log(`Saved guilds for locale: ${locale} to ${fileName}`);
    } catch (error) {
      console.error(`Error saving guilds for locale: ${locale}`, error);
    }
  } else if (!data.hits.length) {
    const region = locale.split("-")[1];
    if (region) {
      await getAndSaveGuilds(region);
    } else {
      console.error(`No guilds found for locale: ${locale}`);
    }
  }
}

locales.forEach(async (locale) => await getAndSaveGuilds(locale));
