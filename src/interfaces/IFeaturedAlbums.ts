export interface IRequestFeaturedAlbums {
  limit?: number;
  offset?: number;
  token: string;
}

export interface IFeaturedAlbumsList {
  albums: IFeaturedAlbums;
}

export interface IFeaturedAlbums {
  href: string
  items: IFeaturedAlbumItem[]
  limit: number
  next: string
  offset: number
  previous: any
  total: number
}

export interface IFeaturedAlbumItem {
  album_type: string
  artists: Artist[]
  available_markets: string[]
  external_urls: ExternalUrls2
  href: string
  id: string
  images: Image[]
  name: string
  release_date: string
  release_date_precision: string
  total_tracks: number
  type: string
  uri: string
}

export interface Artist {
  external_urls: ExternalUrls
  href: string
  id: string
  name: string
  type: string
  uri: string
}

export interface ExternalUrls {
  spotify: string
}

export interface ExternalUrls2 {
  spotify: string
}

export interface Image {
  height: number
  url: string
  width: number
}
