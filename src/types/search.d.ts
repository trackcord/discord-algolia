export interface SearchConfig {
  query: string
  isGlobal: boolean
  isCategory: boolean
}

interface Search {
  locale: string
  category?: number
}
