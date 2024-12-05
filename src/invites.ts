import { readdir } from "node:fs/promises";
import { join } from "node:path";
import Bun from "bun";
import Logger from "./lib/logger";
import type { DiscordInvite } from "./types/invites";

const CONFIG = {
  dataPath: join(__dirname, "..", "data"), // ./data/
  outputFile: join(__dirname, "..", "data", "invites.txt"), // ./data/invites.txt
  filePattern: ".json" // data/*.json
} as const;

const readJsonFile = async (path: string): Promise<DiscordInvite[]> => {
  try {
    return await Bun.file(path).json();
  } catch (error) {
    Logger.error(`Failed to read ${path}: ${error}`);
    return [];
  }
};

const writeInvites = async (invites: string[]): Promise<void> => {
  const content = invites.map(code => `https://discord.gg/${code}`).join("\n");
  await Bun.write(CONFIG.outputFile, content);
};

const extractUniqueInvites = async (): Promise<string[]> => {
  const files = await readdir(CONFIG.dataPath);
  const jsonFiles = files.filter(file => file.endsWith(CONFIG.filePattern));
  
  const invitesMap = new Map<string, DiscordInvite>();
  
  await Promise.all(
    jsonFiles.map(async file => {
      const invites = await readJsonFile(join(CONFIG.dataPath, file));
      invites.forEach(invite => {
        if (invite.vanity_url_code) {
          invitesMap.set(invite.vanity_url_code, invite);
        }
      });
    })
  );

  return Array.from(invitesMap.values())
    .sort((a, b) => b.approximate_member_count - a.approximate_member_count)
    .map(invite => invite.vanity_url_code);
};

const main = async (): Promise<void> => {
  const start = Date.now();
  
  try {
    const uniqueInvites = await extractUniqueInvites();
    await writeInvites(uniqueInvites);
    
    const duration = ((Date.now() - start) / 1000).toFixed(2);
    Logger.success(
      `Saved ${uniqueInvites.length} unique invites to ${CONFIG.outputFile} in ${duration}s`
    );
  } catch (error) {
    Logger.error(`Failed to process invites: ${error}`);
  }
};

main().catch(Logger.error);