import { readdir } from "node:fs/promises";
import { join } from "node:path";
import Bun from "bun";
import Logger from "./lib/logger";

const dataFolder = join(__dirname, "..", "data");
const invitesFile = join(dataFolder, "invites.txt");

async function getUniqueInvites() {
  const files = await readdir(dataFolder);
  const invites = new Map<string, any>();

  for (const file of files) {
    if (!file.endsWith(".json")) continue;

    const filePath = join(dataFolder, file);
    try {
      const content = await Bun.file(filePath).json();

      for (const invite of content) {
        if (invite.vanity_url_code && !/\d+$/.test(invite.vanity_url_code)) {
          if (!invites.has(invite.vanity_url_code)) {
            invites.set(invite.vanity_url_code, invite);
          }
        }
      }
    } catch (error) {
      Logger.error(`Error processing file ${filePath}: ${error}`);
    }
  }

  const sortedInvites = Array.from(invites.values()).sort(
    (a, b) => b.approximate_member_count - a.approximate_member_count,
  );

  return sortedInvites.map((invite) => invite.vanity_url_code);
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
