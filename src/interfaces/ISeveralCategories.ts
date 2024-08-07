export interface IRequestSeveralCategories {
  token: string;
  locale?: string;
  limit?: number;
  offset?: number;
}

export interface ISeveralCategories {
  categories: Categories
}

export interface Categories {
  href: string
  items: ISeveralCategoriesItem[]
  limit: number
  next: string
  offset: number
  previous: any
  total: number
}

export interface ISeveralCategoriesItem {
  href: string
  id: string
  icons: Icon[]
  name: string
  background?: string;
}

export interface Icon {
  height: number
  url: string
  width: number
}
