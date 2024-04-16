import { readdir, readFile, writeFile } from "fs/promises";
import { join } from "path";

const dataFolder = join(__dirname, "data");
const invitesFile = join(__dirname, "invites.txt");

async function getUniqueInvites(): Promise<string[]> {
  const files = await readdir(dataFolder);
  const invites = new Set<string>();

  for (const file of files) {
    if (!file.endsWith(".json")) continue;

    const filePath = join(dataFolder, file);
    try {
      const content = await readFile(filePath, "utf-8");
      const json = JSON.parse(content);

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
  const inviteContent = uniqueInvites.join("\n");

  try {
    await writeFile(invitesFile, inviteContent);
    console.log("Invites saved to invites.txt");
  } catch (error) {
    console.error("Error writing invites file:", error);
  }
}

main().catch(console.error);
