import { readdir } from "node:fs/promises";
import { join } from "node:path";
import Bun from "bun";
import Logger from "./lib/logger";

const dataFolder = join(__dirname, "..", "data");
const invitesFile = join(dataFolder, "invites.txt");

async function getUniqueInvites() {
  const files = await readdir(dataFolder);
  const invites = new Set<string>();

  for (const file of files) {
    if (!file.endsWith(".json")) continue;

    const filePath = join(dataFolder, file);
    try {
      const content = await Bun.file(filePath).json();

      for (const invite of content) {
        if (invite.vanity_url_code && !/\d+$/.test(invite.vanity_url_code)) {
          invites.add(invite.vanity_url_code);
        }
      }
    } catch (error) {
      Logger.error(`Error processing file ${filePath}: ${error}`);
    }
  }

  return Array.from(invites);
}

async function main() {
  const uniqueInvites = await getUniqueInvites();
  const inviteContent = uniqueInvites
    .map((code) => `https://discord.gg/${code}`)
    .join("\n");

  try {
    await Bun.write(invitesFile, inviteContent);
    Logger.success(`Invites saved to ${invitesFile}`);
  } catch (error) {
    Logger.error(`Error saving invites: ${error}`);
  }
}

main().catch(Logger.error);
