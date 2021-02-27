export interface PaginationHome{
  offset: number;
  check: boolean;
}

export interface Url {
  type: string;
  url: string;
};
export interface Thumbnail {
  path: string;
  extension: string;
};

export interface Items {
  resourceURI: string;
  name: string;
}
export interface Comics {
  available: number,
  returned: number,
  collectionURI: string,
  items: Items[];
}

export interface ItemsStorie {
  resourceURI: string,
  name: string,
  type: string
}
export interface Stories {
  available: number,
  returned: number,
  collectionURI: string,
  items: ItemsStorie[];
}

export interface ItemsEvent {
  resourceURI: string;
  name: string;
}
export interface Events {
  available: number;
  returned: number;
  collectionURI: string;
  items: ItemsEvent[];
}

export interface ItemSeries {
  resourceURI: string,
  name: string
}
export interface Series {
  available: number,
  returned: number,
  collectionURI: string,
  items: ItemSeries[];
}
export interface ResultsDTO {
  id: number,
  name: string,
  description: string,
  modified: Date | string,
  resourceURI: string,
  urls: Url[];
  thumbnail: Thumbnail;
  comics: Comics;
  stories: Stories;
  events: Events;
  series: Series;
}
