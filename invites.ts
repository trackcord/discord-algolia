import { readdir } from "node:fs/promises";
import { join } from "node:path";
import Bun from "bun";

const dataFolder = join(__dirname, "data");
const invitesFile = join(__dirname, "invites.txt");

async function getUniqueInvites() {
  const files = await readdir(dataFolder);
  const invites = new Set<string>();

  for (const file of files) {
    if (!file.endsWith(".json")) continue;

    const filePath = join(dataFolder, file);
    try {
      const content = Bun.file(filePath).text();
      const json = JSON.parse(await content);

      for (const invite of json) {
        if (invite.vanity_url_code) {
          invites.add(invite.vanity_url_code);
        }
      }
    } catch (error) {
      console.error(`Error processing file ${filePath}:`, error);
    }
  }

  return Array.from(invites);
}

async function main() {
  const uniqueInvites = await getUniqueInvites();
  // each should be like https://discord.gg/invitecode and new line
  const inviteContent = uniqueInvites.map((invite) => `https://discord.gg/${invite}\n`).join("");

  try {
    await Bun.write(invitesFile, inviteContent);
    console.log("Invites saved to invites.txt");
  } catch (error) {
    console.error("Error writing invites file:", error);
  }
}

main().catch(console.error);
