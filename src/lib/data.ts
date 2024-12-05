const locales = [
  "en-US",
  "en-GB",
  "es-ES",
  "es-419",
  "fr",
  "it",
  "nl",
  "pl",
  "pt-BR",
  "ro",
  "fi",
  "sv-SE",
  "vi",
  "tr",
  "cs",
  "el",
  "bg",
  "ru",
  "uk",
  "hi",
  "th",
  "zh-CN",
  "ja",
  "zh-TW",
  "ko",
]

const ansiColors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  underscore: "\x1b[4m",
  blink: "\x1b[5m",
  reverse: "\x1b[7m",
  hidden: "\x1b[8m",
  black: "\x1b[30m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
  bgBlack: "\x1b[40m",
  bgRed: "\x1b[41m",
  bgGreen: "\x1b[42m",
  bgYellow: "\x1b[43m",
  bgBlue: "\x1b[44m",
  bgMagenta: "\x1b[45m",
  bgCyan: "\x1b[46m",
  bgWhite: "\x1b[47m",
}

const categoryIds = [
  -1, // All
  0, // General
  10, // Travel & Food
  15, // Esports
  30, // LFG
  32, // Theorycraft
  36, // Business
  39, // Fandom
  43, // Emoji
  18, // Books
  23, // Podcasts
  28, // Investing
  7, // Sports
  13, // Other
  2, // Music
  3, // Entertainment
  4, // Creative Arts
  6, // Education
  9, // Relationships & Identity
  11, // Fitness & Health
  12, // Finance
  45, // Mobile
  16, // Anime & Manga
  17, // Movies & TV
  19, // Art
  20, // Writing
  22, // Programming
  25, // Memes
  27, // Cryptocurrency
  31, // Customer Support
  33, // Events
  34, // Roleplay
  37, // Local Group
  38, // Collaboration
  40, // Wiki & Guide
  42, // Subreddit
  1, // Gaming
  5, // Science & Tech
  8, // Fashion & Beauty
  14, // General Chatting
  21, // Crafts, DIY, & Making
  48, // Game Developer
  49, // Bots
  24, // Tabletop Games
  26, // News & Current Events
  29, // Studying & Teaching
  35, // Content Creator
  44, // Comics & Cartoons
  46, // Console
  47, // Charity & Nonprofit
]

export { locales, ansiColors, categoryIds }
