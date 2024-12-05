import { askForQuery, getAndSaveGuilds } from "./lib/utils";
import { locales, categoryIds } from "./lib/data";
import Logger from "./lib/logger";
import type { Search, SearchConfig } from "./types/search";



const parseArgs = (): Omit<SearchConfig, 'query'> => ({
  isGlobal: process.argv.includes("--global"),
  isCategory: process.argv.includes("--category")
});

const searchGuilds = async (config: SearchConfig): Promise<void> => {
  if (config.isGlobal) {
    await getAndSaveGuilds(config.query);
    return;
  }

  const searches: Search[] = config.isCategory
    ? categoryIds.flatMap(category => 
        locales.map(locale => ({ locale, category }))
      )
    : locales.map(locale => ({ locale }));

  await Promise.all(
    searches.map(params => 
      getAndSaveGuilds(
        config.query, 
        params.locale, 
        'category' in params ? params.category : undefined
      )
    )
  );
};

const main = async (): Promise<void> => {
  const startTime = Date.now();

  try {
    const args = parseArgs();
    const query = await askForQuery();
    await searchGuilds({ ...args, query });
    
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    Logger.info(`Search completed in ${duration}s`);
  } catch (error) {
    Logger.error(`Search failed: ${error}`);
    process.exit(1);
  }
};

main().catch(Logger.error);