export interface IRequestSeveralAlbums {
  token: string;
  ids: string[];
}

export interface IRequestAlbumById {
  token: string;
  id: string | undefined;
}

export interface ISeveralAlbums {
  albums: IAlbum[]
}

export interface IAlbum {
  album_type: string
  artists: Artist[]
  available_markets: string[]
  copyrights: Copyright[]
  external_ids: ExternalIds
  external_urls: ExternalUrls2
  genres: any[]
  href: string
  id: string
  images: Image[]
  label: string
  name: string
  popularity: number
  release_date: string
  release_date_precision: string
  total_tracks: number
  tracks: Tracks
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

export interface Copyright {
  text: string
  type: string
}

export interface ExternalIds {
  upc: string
}

export interface ExternalUrls2 {
  spotify: string
}

export interface Image {
  height: number
  url: string
  width: number
}

export interface Tracks {
  href: string
  items: ITrackItem[]
  limit: number
  next: any
  offset: number
  previous: any
  total: number
}

export interface ITrackItem {
  artists: Artist2[]
  available_markets: string[]
  disc_number: number
  duration_ms: number
  explicit: boolean
  external_urls: ExternalUrls4
  href: string
  id: string
  is_local: boolean
  name: string
  preview_url: string
  track_number: number
  type: string
  uri: string
  index_number: number;
}

export interface Artist2 {
  external_urls: ExternalUrls3
  href: string
  id: string
  name: string
  type: string
  uri: string
}

export interface ExternalUrls3 {
  spotify: string
}

export interface ExternalUrls4 {
  spotify: string
}
